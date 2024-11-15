'use client';
import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';
import styled from 'styled-components';

const StyledBotaoUpload = styled.button`
  margin: 0;
`

interface AvatarUploaderProps {
  onUploadSuccess: (url: string) => void;
}

export function AvatarUploader({ onUploadSuccess }: AvatarUploaderProps) {
  const [loading, setLoading] = useState(false);

  const handleUpload = async (open: Function) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    const response = await fetch('/api/sign-cloudinary-params', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paramsToSign: { timestamp, upload_preset: uploadPreset } })
    });

    const { signature } = await response.json();

    const widgetOptions = {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      uploadPreset: uploadPreset,
      cropping: true,
      multiple: false,
      apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      signature,
      timestamp,
    };

    setLoading(true);
    open(widgetOptions);
  };

  return (
    <CldUploadWidget
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={(result) => {
        if (typeof result.info === 'object' && 'secure_url' in result.info) {
          onUploadSuccess(result.info.secure_url);
        }
        setLoading(false);
      }}
      options={{
        singleUploadAutoClose: true,
      }}
    >
      {({ open }) => (
        <StyledBotaoUpload
          type="button"
          onClick={() => handleUpload(open)}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload Foto de Perfil'}
        </StyledBotaoUpload>
      )}
    </CldUploadWidget>
  );
}
