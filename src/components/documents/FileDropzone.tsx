import React, { useState, useRef } from 'react';
import { FileIcon, Upload, X, FileText, FileImage } from 'lucide-react';
import { formatBytes } from '@/lib/utils';

interface FileDropzoneProps {
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
  disabled?: boolean;
}

export function FileDropzone({ 
  selectedFile, 
  setSelectedFile, 
  disabled = false 
}: FileDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleClearSelectedFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getFileIcon = () => {
    if (!selectedFile) return null;
    
    const fileName = selectedFile.name.toLowerCase();
    
    if (fileName.endsWith('.pdf')) {
      return <FileText className="h-16 w-16 text-red-500" />;
    } else if (fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.png')) {
      return <FileImage className="h-16 w-16 text-blue-500" />;
    } else if (fileName.endsWith('.doc') || fileName.endsWith('.docx')) {
      return <FileText className="h-16 w-16 text-teal-500" />;
    }
    
    return <FileIcon className="h-16 w-16 text-primary" />;
  };

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-8 transition-all text-center cursor-pointer
        ${dragActive 
          ? "border-primary bg-primary/5" 
          : selectedFile 
            ? "border-green-400 bg-green-400/5" 
            : "border-muted-foreground/25 hover:border-muted-foreground/50"
        }
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}`
      }
      onDragEnter={!disabled ? handleDrag : undefined}
      onDragLeave={!disabled ? handleDrag : undefined}
      onDragOver={!disabled ? handleDrag : undefined}
      onDrop={!disabled ? handleDrop : undefined}
      onClick={() => !disabled && fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
        disabled={disabled}
      />
      
      {selectedFile ? (
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            {getFileIcon()}
            <button 
              type="button"
              className="absolute -top-2 -right-2 rounded-full bg-destructive text-destructive-foreground p-1 shadow-lg"
              onClick={handleClearSelectedFile}
              disabled={disabled}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <p className="text-base font-medium mt-2">{selectedFile.name}</p>
          <p className="text-sm text-muted-foreground">{formatBytes(selectedFile.size)}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full bg-primary/10 p-4 mb-2">
            <Upload className="h-8 w-8 text-primary" />
          </div>
          <p className="text-base font-medium">Drag and drop your document here</p>
          <p className="text-sm text-muted-foreground">
            or click to browse your files
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Supported formats: PDF, DOC, DOCX, JPG, JPEG, PNG
          </p>
        </div>
      )}
    </div>
  );
}
