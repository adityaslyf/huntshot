import { useRef } from 'react';
import { FileIcon, X as XIcon, FileText as FileTextIcon, File as FileTypeIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { showToast } from '@/lib/toast-utils';

interface FileUploadProps {
  onFilesChange: (files: File[]) => void;
  files: File[];
  maxFiles?: number;
  maxSize?: number; // in MB
  allowedTypes?: string[];
}

export function FileUpload({
  onFilesChange,
  files,
  maxFiles = 5,
  maxSize = 5, // 5MB
  allowedTypes = [
    'application/pdf', 
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ]
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    if (files.length + fileList.length > maxFiles) {
      showToast.error(`You can only upload a maximum of ${maxFiles} files`);
      return;
    }

    const newFiles: File[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      
      // Check file type
      if (!allowedTypes.includes(file.type)) {
        showToast.error(`File type ${file.type} is not supported`);
        continue;
      }
      
      // Check file size
      if (file.size > maxSize * 1024 * 1024) {
        showToast.error(`File ${file.name} exceeds the maximum size of ${maxSize}MB`);
        continue;
      }
      
      newFiles.push(file);
    }

    onFilesChange([...files, ...newFiles]);
    
    // Reset the input so the same file can be selected again if needed
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onFilesChange(newFiles);
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) {
      return <FileIcon className="h-4 w-4 text-red-500" />;
    } else if (fileType.includes('word') || fileType.includes('document')) {
      return <FileTextIcon className="h-4 w-4 text-blue-500" />;
    } else {
      return <FileTypeIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col">
        <input
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          accept={allowedTypes.join(',')}
          multiple={maxFiles > 1}
          className="hidden"
          id="file-upload"
        />
        
        <div className="flex flex-wrap gap-2 mb-2">
          {files.map((file, index) => (
            <div 
              key={`${file.name}-${index}`}
              className="flex items-center gap-2 bg-secondary/50 text-secondary-foreground px-3 py-1.5 rounded-md text-sm group"
            >
              {getFileIcon(file.type)}
              <span className="truncate max-w-[150px]">{file.name}</span>
              <span className="text-xs text-muted-foreground">({formatFileSize(file.size)})</span>
              <button 
                onClick={() => handleRemoveFile(index)}
                className="text-muted-foreground hover:text-destructive transition-colors"
                type="button"
              >
                <XIcon className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
        
        <div className={cn(
          "border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-accent/50 transition-colors",
          files.length >= maxFiles ? "opacity-50 cursor-not-allowed" : ""
        )}>
          <label 
            htmlFor="file-upload"
            className={cn(
              "flex flex-col items-center justify-center cursor-pointer",
              files.length >= maxFiles ? "cursor-not-allowed" : ""
            )}
          >
            <FileIcon className="h-6 w-6 mb-2 text-muted-foreground" />
            <p className="text-sm font-medium">
              {files.length === 0 ? (
                "Drag files here or click to browse"
              ) : files.length >= maxFiles ? (
                `Maximum ${maxFiles} files reached`
              ) : (
                `${files.length} file(s) selected, add more?`
              )}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Supports PDF, DOC, DOCX, TXT (max {maxSize}MB)
            </p>
          </label>
        </div>
      </div>
    </div>
  );
} 