import type { AxiosProgressEvent } from 'axios';
import api from './api';

export const uploadCV = (
  file: File,
  onProgress?: (event: AxiosProgressEvent) => void
) => {
  const formData = new FormData();
  formData.append('file', file);

  return api.post('/resume/import', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: onProgress,
  });
};
