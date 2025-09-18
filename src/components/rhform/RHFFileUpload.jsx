import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { FileInput, Label } from 'flowbite-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default function RHFFileUpload({ name, control, rules, onUploadSuccess, uploadPath = '/api/upload/product' }) {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const mutation = useMutation({
    mutationFn: (file) => {
      const formData = new FormData();
      formData.append('image', file);

      return axios
        .post(uploadPath, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => res.data);
    },
    onSuccess: (data) => {
      setUploadedUrl(data.data?.url);
      if (onUploadSuccess) {
        onUploadSuccess(data.data);
      }
    },
    onError: (err) => {
      console.error('Upload error', err);
    },
    onSettled: () => {
      setUploading(false);
    },
  });

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          <Label htmlFor={name} className="text-lighter">
            Upload Image
          </Label>
          <FileInput
            id={name}
            onChange={(e) => {
              const file = e.target.files && e.target.files[0];
              if (file) {
                setUploading(true);
                mutation.mutate(file);
              }
            }}
          />
          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          {uploadedUrl && (
            <div className="text-sm text-green-600">
              Uploaded:{' '}
              <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">
                {uploadedUrl}
              </a>
            </div>
          )}
          {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
        </div>
      )}
    />
  );
}
