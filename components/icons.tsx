import React from 'react';

export const UploadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
  </svg>
);

export const DownloadIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const ArrowPathIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0c3.221-3.221 3.221-8.456 0-11.667a8.25 8.25 0 0 0-11.667 0L2.985 14.654Z" />
  </svg>
);

export const GitHubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
  </svg>
);

export const LinkedInIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const HdfcBankLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="40" height="40" x="5" y="5" fill="#004C97"/>
    <rect width="16" height="16" x="17" y="17" fill="white"/>
    <path d="M5,5 h40 v40 h-40 z M10,10 v30 h30 v-30 z" fill="#E4002B"/>
    <rect width="16" height="16" x="17" y="17" fill="#004C97"/>
    <text x="55" y="32" fontFamily="Arial, sans-serif" fontSize="24" fill="white" fontWeight="bold">HDFC BANK</text>
  </svg>
);

export const SbiBankLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="20" cy="20" r="18" fill="#35A8E0"/>
    <circle cx="20" cy="20" r="8" fill="white"/>
    <path d="M19 20 a1,1 0 0,0 2,0 M17 20 h6" stroke="white" strokeWidth="2.5"/>
    <text x="45" y="28" fontFamily="Arial, sans-serif" fontSize="24" fill="white" fontWeight="bold">SBI</text>
  </svg>
);

export const IciciBankLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg" {...props}>
    <style>{`.icici-i{fill:#EA6F23;}`}</style>
    <path className="icici-i" d="M53.1,29.6c0-2.3-0.9-4-2.4-5.2c-1.5-1.2-3.6-1.9-6.2-1.9c-2.8,0-5.1,0.7-6.8,2c-1.7,1.3-2.6,3.2-2.6,5.6 c0,2.5,0.9,4.4,2.6,5.7c1.7,1.3,4,2,6.8,2c2.6,0,4.7-0.6,6.2-1.8C52.2,33.8,53.1,32,53.1,29.6z M38.4,29.8 c0.3-3.6,2.5-5.5,6.7-5.5c4,0,6.1,1.9,6.1,5.4c0,3.6-2.2,5.5-6.1,5.5C40.9,35.2,38.2,33.3,38.4,29.8z"/>
    <text x="58" y="33" fontFamily="Arial, sans-serif" fontSize="20" fill="white" fontWeight="bold">ICICI Bank</text>
  </svg>
);

export const AxisBankLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 200 60" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M50 5 L65 30 L50 55 L35 30 Z" fill="#8C2B7A"/>
    <text x="75" y="40" fontFamily="Arial, sans-serif" fontSize="24" fill="white" fontWeight="bold">AXIS BANK</text>
  </svg>
);

export const KotakBankLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx="25" cy="25" r="20" fill="#004C97"/>
    <path d="M15,25 a15,10 0 1,0 20,0 a15,10 0 1,0 -20,0" fill="none" stroke="white" strokeWidth="3"/>
    <text x="55" y="33" fontFamily="Arial, sans-serif" fontSize="20" fill="white" fontWeight="bold">Kotak</text>
  </svg>
);