import React, { ChangeEvent, useState } from "react";
import { Button, Avatar, Box } from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

interface PictureUploadProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDiscard: () => void;
  required?: boolean;
  error?: boolean;
}

const Input = styled('input')({
  display: 'none',
});

const PictureUpload: React.FC<PictureUploadProps> = ({
  onChange,
  onDiscard,
  required,
  error: boolean,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImagePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        e.target.value = '';
        return;
      }
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handleDiscard = () => {
    setPreviewUrl(null);
    if (onDiscard) {
      onDiscard();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: 256, height: 256, p: 2, bgcolor: 'grey.100', borderRadius: 'borderRadius', position: 'relative' }}>

      {previewUrl ? (
        <>
          <Avatar src={previewUrl} alt="Preview" sx={{ width: 192, height: 192 }} />
          <Button onClick={handleDiscard} sx={{ position: 'absolute', top: 8, right: 8, color: 'red' }}>
            <CloseIcon />
          </Button>
        </>
      ) : (
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={(e) => {
              handleImagePreview(e);
              onChange(e);
            }}
          />
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <PhotoLibraryIcon sx={{ fontSize: 48, color: 'primary.main' }} />
            <Box sx={{ mt: 1, color: 'text.primary' }}>Click to select an image</Box>
          </Box>
        </label>
      )}
    </Box>
  );
};

export default PictureUpload;
