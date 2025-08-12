import { Link } from 'react-router';
import UploadCloud from '@/assets/upload/upload-cloud.svg';
import React, { useState } from 'react';
import { Progress } from '@/components/ui/progress.tsx';
import FolderIcon from '@/assets/upload/pdf-file.svg';
import { cn } from '@/lib/utils.ts';
import { Button } from '@/components/ui/button.tsx';
import { Loader } from 'lucide-react';

const UploadCV = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [hasUploaded, setHasUploaded] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Reset states
      setError('');
      setUploadProgress(0);
      setHasUploaded(false);

      // Check file size (5MB limit)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      // Check file type - backend only accepts PDF
      if (!selectedFile.name.toLowerCase().endsWith('.pdf')) {
        setError('Please upload a PDF file');
        return;
      }

      setFile(selectedFile);

      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 5;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setHasUploaded(true);
          // Redirect after analysis
        }
        setUploadProgress(progress);
      }, 300); // every 0.3s
    }
  };

  return (
    <div className="min-h-screen flex flex-col px-4 md:px-8 lg:px-24">
      <main className="flex-1 flex flex-col items-center pt-16 gap-y-2">
        <h1 className="text-3xl font-semibold">Upload your CV</h1>

        <p className="max-w-[300px] text-md text-secondary font-normal text-center">
          Add your resume to get personalized job matches and application
          assistance
        </p>

        <div className="w-full max-w-2xl">
          {!file ? (
            <label
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center justify-center mt-8 w-full border-2 border-dashed border-border rounded-md py-16"
            >
              <img alt="upload" src={UploadCloud} className="w-12 h-12 mb-4" />
              <p className="text-secondary text-center max-w-[300px]">
                Acceptable file format is pdf. Please limit the file size to 5
                MB
              </p>
              <input
                onChange={handleFileChange}
                id="file-upload"
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx"
              />
            </label>
          ) : (
            <>
              <div className="flex flex-row items-center mt-8 w-full border-2 border-primary/20 rounded-sm p-4">
                <img alt="folder-icon" src={FolderIcon} />
                <div className="ml-4 w-full">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-full flex items-center justify-between space-x-2">
                      <span className="text-md font-medium truncate max-w-md">
                        {file.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <p
                          className={cn(
                            'text-sm',
                            uploadProgress === 100
                              ? 'text-primary font-bold'
                              : 'text-secondary'
                          )}
                        >
                          {uploadProgress}% Complete
                        </p>
                      </div>
                    </div>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              </div>

              {error && (
                <>
                  <div className="flex items-center justify-between bg-destructive/10 text-destructive rounded-sm mt-3 p-4">
                    <p className="text-sm">{error}</p>
                    <Button className="px-20 py-5 " size="lg">
                      Retry
                    </Button>
                  </div>
                </>
              )}

              {uploadProgress === 100 && !error && (
                <>
                  <div className="flex items-center bg-primary/10 rounded-sm mt-3 h-20">
                    {hasUploaded ? (
                      <p className="ml-5">CV Analysis Complete!</p>
                    ) : (
                      <>
                        <Loader className="text-primary mr-5 ml-5 h-5 w-5 animate-spin" />
                        <p>Analyzing your CV</p>
                      </>
                    )}
                  </div>

                  {hasUploaded && (
                    <div className="cursor-pointer justify-self-end mt-3 text-md text-primary">
                      <Button asChild className="px-20 py-5" size="lg">
                        <Link to="/quiz">Continue</Link>
                      </Button>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default UploadCV;
