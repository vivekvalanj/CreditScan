import { GoogleGenAI, Type } from "@google/genai";
import { StatementData } from "../types";

// This declaration is necessary because we are loading PDF.js from a CDN.
declare const pdfjsLib: any;

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

async function convertPdfToImages(file: File): Promise<string[]> {
  const images: string[] = [];
  const fileReader = new FileReader();

  return new Promise((resolve, reject) => {
    fileReader.onload = async (event) => {
      if (!event.target?.result) {
        return reject(new Error("Failed to read file."));
      }

      try {
        const typedarray = new Uint8Array(event.target.result as ArrayBuffer);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          if (context) {
            await page.render({ canvasContext: context, viewport: viewport }).promise;
            images.push(canvas.toDataURL("image/jpeg").split(',')[1]);
          }
        }
        resolve(images);
      } catch (error) {
        reject(new Error("Failed to process PDF file. Ensure it is a valid PDF."));
      }
    };

    fileReader.onerror = () => reject(new Error("Error reading file."));
    fileReader.readAsArrayBuffer(file);
  });
}

const statementSchema = {
  type: Type.OBJECT,
  properties: {
    cardType: { type: Type.STRING, description: "The type or variant of the credit card, for example, 'HDFC Regalia' or 'SBI SimplyCLICK'." },
    cardHolderName: { type: Type.STRING, description: "Full name of the cardholder." },
    cardLastFourDigits: { type: Type.STRING, description: "The last 4 digits of the credit card number." },
    billingCycle: { type: Type.STRING, description: "The billing cycle period for the statement, for example, '02 Oct – 02 Nov 2025'." },
    paymentDueDate: { type: Type.STRING, description: "The date the payment is due (e.g., '12 Nov 2025')." },
    totalDues: { type: Type.NUMBER, description: "The total amount due." },
    transactions: {
      type: Type.ARRAY,
      description: "A list of all transactions on the statement.",
      items: {
        type: Type.OBJECT,
        properties: {
          date: { type: Type.STRING, description: "Date of the transaction (e.g., '05/10/2025')." },
          description: { type: Type.STRING, description: "Description of the transaction." },
          amount: { type: Type.NUMBER, description: "Amount of the transaction." },
        },
        required: ["date", "description", "amount"],
      },
    },
  },
  required: [
    "cardType",
    "cardHolderName",
    "cardLastFourDigits",
    "billingCycle",
    "paymentDueDate",
    "totalDues",
    "transactions",
  ],
};


export async function parseStatementPdf(file: File): Promise<StatementData> {
  const imageB64s = await convertPdfToImages(file);

  if (imageB64s.length === 0) {
    throw new Error("Could not extract any pages from the PDF.");
  }

  const imageParts = imageB64s.map(img => ({
    inlineData: {
      data: img,
      mimeType: "image/jpeg",
    },
  }));

  const prompt = `You are an expert financial assistant specialized in parsing credit card statements. Analyze the following statement image(s) and extract the required information precisely according to the provided JSON schema. Ensure all fields are populated accurately.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      // FIX: Use a single Content object for a single-turn request.
      contents: { parts: [{ text: prompt }, ...imageParts] },
      config: {
        responseMimeType: "application/json",
        responseSchema: statementSchema
      },
    });

    const parsedText = response.text.trim();
    return JSON.parse(parsedText);
  } catch (error) {
    console.error("AI API Error:", error);
    throw new Error("Failed to get a valid response from the AI model. The document might be unsupported or the API key may be invalid.");
  }
}
