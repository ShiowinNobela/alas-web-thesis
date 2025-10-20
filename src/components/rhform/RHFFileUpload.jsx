import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { FileInput, Label } from 'flowbite-react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

export default function RHFFileUpload({ name, control, rules, onUploadSuccess, uploadPath = '/api/upload/product' }) {
  const [uploading, setUploading] = useState(false);

  const mutation = useMutation({
    mutationFn: (file) => {
      const formData = new FormData();
      formData.append('image', file);

      return axios
        .post(uploadPath, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => res.data);
    },
    onSuccess: (data, variables, context) => {
      if (onUploadSuccess) onUploadSuccess(data.data);
    },
    onSettled: () => setUploading(false),
    onError: (err) => console.error('Upload error', err),
  });

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-2">
          <Label htmlFor={name}>Upload Image</Label>
          <FileInput
            id={name}
            onChange={(e) => {
              const file = e.target.files && e.target.files[0];
              if (file) {
                setUploading(true);
                mutation.mutate(file, {
                  onSuccess: (data) => field.onChange(data.data?.url),
                });
              }
            }}
          />
          {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
          {field.value && (
            <div className="text-sm text-green-600">
              Uploaded:{' '}
              <a href={field.value} target="_blank" rel="noopener noreferrer" className="line-clamp-1">
                {field.value}
              </a>
            </div>
          )}
          {fieldState.error && <p className="text-error text-sm">{fieldState.error.message}</p>}
        </div>
      )}
    />
  );
}
