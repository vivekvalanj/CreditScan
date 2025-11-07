import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((file: File | null) => {
    setError(null);
    if (file) {
      if (file.type === 'application/pdf') {
        onFileUpload(file);
      } else {
        setError('Invalid file type. Please upload a PDF.');
      }
    }
  }, [onFileUpload]);

  const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full text-center">
      <label
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${
          isDragging ? 'border-cyan-400 bg-cyan-900/50' : 'border-slate-600 hover:border-slate-500 hover:bg-slate-700/50'
        }`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <UploadIcon className={`w-10 h-10 mb-3 transition-colors ${isDragging ? 'text-cyan-400' : 'text-slate-400'}`} />
          <p className="mb-2 text-sm text-slate-400">
            <span className="font-semibold text-cyan-400">Browse</span> or drag and drop
          </p>
          <p className="text-xs text-slate-500">PDF documents only</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" accept=".pdf" onChange={handleFileChange} />
      </label>
      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}
    </div>
  );
};

export default FileUpload;
