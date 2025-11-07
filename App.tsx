import React, { useState, useRef, useEffect } from 'react';
import { StatementData } from './types';
import { parseStatementPdf } from './services/geminiService';
import FileUpload from './components/FileUpload';
import StatementDisplay from './components/StatementDisplay';
import Spinner from './components/Spinner';
import { 
  ArrowPathIcon, 
  GitHubIcon, 
  LinkedInIcon, 
  CheckIcon
} from './components/icons';

const howItWorksSteps = [
    { title: "Upload Securely", description: "Drag and drop or select your PDF statement. Your files are processed in-memory and never stored." },
    { title: "AI-Powered Extraction", description: "Our advanced AI, powered by Gemini, reads and understands the statement structure in seconds." },
    { title: "View & Download", description: "Review the extracted data in a clean format and download it as a JSON file for your records." },
];

function App() {
  const [statementData, setStatementData] = useState<StatementData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMessageSent, setIsMessageSent] = useState(false);

  const uploadSectionRef = useRef<HTMLElement>(null);
  const howItWorksSectionRef = useRef<HTMLElement>(null);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);
    setStatementData(null);
    setFileName(file.name);

    try {
      const data = await parseStatementPdf(file);
      setStatementData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStatementData(null);
    setIsLoading(false);
    setError(null);
    setFileName(null);
  };
  
  const scrollToUpload = () => {
    uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = () => {
    howItWorksSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMessageSent(true);
    setTimeout(() => {
        setIsModalOpen(false);
        setIsMessageSent(false); 
    }, 2000);
  };

  const renderParserContent = () => {
    if (isLoading) {
      return (
        <div className="text-center">
          <Spinner />
          <p className="mt-4 text-slate-400">
            Analyzing your statement...
            <br />
            This might take a moment.
          </p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center max-w-md mx-auto">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 mx-auto px-4 py-2 bg-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
             <ArrowPathIcon className="w-5 h-5" />
            Try Again
          </button>
        </div>
      );
    }
    if (statementData && fileName) {
      return (
        <div className="w-full">
          <StatementDisplay data={statementData} fileName={fileName} />
           <div className="mt-8 text-center">
             <button
                onClick={handleReset}
                className="flex items-center gap-2 mx-auto px-4 py-2 bg-slate-700 text-slate-300 font-semibold rounded-lg hover:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900"
             >
               <ArrowPathIcon className="w-5 h-5" />
               Parse Another Statement
             </button>
           </div>
        </div>
      );
    }
    return <FileUpload onFileUpload={handleFileUpload} />;
  };

  return (
    <>
      <header className="sticky top-0 bg-slate-900/80 backdrop-blur-lg z-50 border-b border-slate-800">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-white">CrediScan</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-medium">
            <button onClick={scrollToTop} className="text-slate-300 hover:text-cyan-400 transition-colors">Home</button>
            <button onClick={scrollToUpload} className="text-slate-300 hover:text-cyan-400 transition-colors">Upload</button>
            <button onClick={scrollToHowItWorks} className="text-slate-300 hover:text-cyan-400 transition-colors">How it Works</button>
            <button onClick={() => setIsModalOpen(true)} className="text-slate-300 hover:text-cyan-400 transition-colors">Contact</button>
          </div>
          <button onClick={scrollToUpload} className="md:hidden px-4 py-2 bg-cyan-500 text-slate-900 font-semibold rounded-lg hover:bg-cyan-400 transition-colors text-sm">
            Get Started
          </button>
        </nav>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Hero Section */}
        <section className="text-center my-16">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-500 mb-4">
            Unlock Your Financial Data
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
            CrediScan uses AI to instantly parse your PDF credit card statements, turning complex documents into clean, structured data you can actually use.
          </p>
          <button onClick={scrollToUpload} className="mt-8 px-8 py-3 bg-gradient-to-r from-cyan-500 to-sky-600 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity text-lg">
            Scan My Statement
          </button>
        </section>

        {/* Parser Section */}
        <section ref={uploadSectionRef} id="upload" className="my-16 scroll-mt-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="lg:sticky lg:top-24">
                    <h2 className="text-3xl font-bold text-white mb-2">Statement Parser</h2>
                    <p className="text-slate-400 mb-6">Upload your statement to get started. We support encrypted and multi-page documents from all major Indian banks.</p>
                     <ul className="space-y-3 text-slate-300">
                        <li className="flex items-center gap-3"><svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>Secure & Private</span></li>
                        <li className="flex items-center gap-3"><svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>Fast & Accurate</span></li>
                        <li className="flex items-center gap-3"><svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>Developer Friendly JSON Output</span></li>
                     </ul>
                </div>
                <div className="bg-slate-800 p-4 sm:p-8 rounded-xl shadow-2xl border border-slate-700 min-h-[24rem] flex items-center justify-center">
                    {renderParserContent()}
                </div>
            </div>
        </section>

        {/* How It Works Section */}
        <section ref={howItWorksSectionRef} id="how-it-works" className="my-24 scroll-mt-24">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white">How It Works</h2>
                <p className="text-slate-400 mt-2 mb-12 max-w-2xl mx-auto">A simple, three-step process to digitize your financial statements.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {howItWorksSteps.map((step, index) => (
                    <div key={step.title} className="bg-slate-800/50 p-6 rounded-lg border border-slate-700 text-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-slate-700 text-cyan-400 font-bold text-lg rounded-full mx-auto mb-4">{index + 1}</div>
                        <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                        <p className="text-slate-400 text-sm">{step.description}</p>
                    </div>
                ))}
            </div>
        </section>
      </main>

      <footer className="bg-slate-900 border-t border-slate-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 sm:mb-0">
               <p className="text-slate-500 text-sm">2025 CrediScan by Vivek Valanj</p>
            </div>
            <div className="flex items-center gap-6">
               <a href="https://github.com/vivekvalanj" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-slate-500 hover:text-cyan-400 transition-colors"><GitHubIcon className="w-6 h-6" /></a>
               <a href="https://www.linkedin.com/in/vivek-valanj-159b2125a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-500 hover:text-cyan-400 transition-colors"><LinkedInIcon className="w-6 h-6" /></a>
            </div>
          </div>
      </footer>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fade-in" onClick={() => setIsModalOpen(false)}>
            <div className="bg-slate-800 rounded-lg p-8 w-full max-w-md shadow-2xl border border-slate-700 m-4" onClick={(e) => e.stopPropagation()}>
                {!isMessageSent ? (
                    <form onSubmit={handleFormSubmit}>
                        <h2 className="text-2xl font-bold text-white mb-2">Contact Us</h2>
                        <p className="text-slate-400 mb-6">Have a question or complaint? Send us a message. For direct queries, email us at <a href="mailto:v.valanj@gmail.com" className="text-cyan-400 hover:underline">v.valanj@gmail.com</a>.</p>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Your Message</label>
                            <textarea id="message" name="message" rows={4} required className="w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-slate-200 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition"></textarea>
                        </div>
                        <div className="flex justify-end">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-300 rounded-md hover:bg-slate-700 transition-colors mr-2">Cancel</button>
                            <button type="submit" className="px-4 py-2 text-sm font-medium text-slate-900 bg-cyan-500 rounded-md hover:bg-cyan-400 transition-colors">Send Message</button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center py-8">
                        <CheckIcon className="w-16 h-16 text-green-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white">Message Sent!</h3>
                        <p className="text-slate-400 mt-2">Thanks for reaching out. We'll get back to you shortly.</p>
                    </div>
                )}
            </div>
        </div>
      )}
    </>
  );
}

export default App;