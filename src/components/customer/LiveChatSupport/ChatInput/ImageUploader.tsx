
import React, { useRef } from 'react';
import { Image } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ImageUploaderProps {
  onImageSelect: (imageUrl: string) => void;
  isDesktop?: boolean;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
  isDesktop = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onImageSelect(event.target.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant={isDesktop ? "ghost" : "outline"}
            size="icon" 
            className={`h-${isDesktop ? '8' : '9'} w-${isDesktop ? '8' : '9'}`}
            onClick={triggerFileInput}
          >
            <Image className={`h-${isDesktop ? '4' : '4'} w-${isDesktop ? '4' : '4'}`} />
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>Add an image</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
