import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { uploadCV } from '@/api/resumeService';
import { Button } from '@/components/ui/button.tsx';
import { Progress } from '@/components/ui/progress.tsx';
import UploadCloud from '@/assets/upload/upload-cloud.svg';
import FolderIcon from '@/assets/upload/pdf-file.svg';
import { cn } from '@/lib/utils.ts';
import { Link } from 'react-router';
import { Loader2 } from 'lucide-react';
import type { AxiosResponse } from 'axios';

interface UploadResponse {
  person_id: string;
}

const UploadCV = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { mutate, isPending, isError, isSuccess, error } = useMutation({
    mutationFn: (file: File) =>
      uploadCV(file, (progressEvent) => {
        if (progressEvent?.loaded && progressEvent?.total) {
          const percent = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(percent);
        }
      }),
    onSuccess: (res: AxiosResponse<UploadResponse>) => {
      console.log('Upload successful:', res.data);
      localStorage.setItem('resume_id', res.data.person_id);
    },
    onError: (error: Error) => {
      console.error('Upload failed:', error);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file size
    if (selectedFile.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB');
      return;
    }

    if (!selectedFile.name.toLowerCase().endsWith('.pdf')) {
      alert('Please upload a PDF file');
      return;
    }

    setFile(selectedFile);
    setUploadProgress(0);

    mutate(selectedFile);
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
                accept=".pdf"
              />
            </label>
          ) : (
            <div className="flex flex-row items-center mt-8 w-full border-2 border-primary/20 rounded-sm p-4">
              <img alt="folder-icon" src={FolderIcon} />
              <div className="ml-4 w-full">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-md font-medium truncate max-w-md">
                    {file.name}
                  </span>
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
                <Progress value={uploadProgress} className="w-full" />
              </div>
            </div>
          )}

          {isError && (
            <div className="flex items-center justify-between bg-destructive/10 text-destructive rounded-sm mt-3 p-4">
              <p className="text-sm">{error.message}</p>
              <Button
                onClick={() => file && mutate(file)}
                className="px-20 py-5"
                size="lg"
              >
                Retry
              </Button>
            </div>
          )}

          {isSuccess && (
            <div className="flex items-center justify-between bg-primary/10 rounded-sm mt-3 h-20">
              <p className="ml-5">CV Analysis Complete!</p>
              <div className="cursor-pointer justify-self-end text-md mr-5 text-primary">
                <Button asChild className="px-20 py-5" size="lg">
                  <Link to="/quiz">Continue</Link>
                </Button>
              </div>
            </div>
          )}

          {isPending && uploadProgress === 100 && (
            <div className="flex items-center bg-primary/10 rounded-sm mt-3 h-20">
              <Loader2 className="text-primary font-bold mr-5 ml-5 size-8 animate-spin" />
              <p>Analyzing your CV</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UploadCV;
