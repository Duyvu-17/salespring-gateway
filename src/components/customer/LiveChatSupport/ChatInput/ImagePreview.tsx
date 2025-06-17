
import React from 'react';
import { X } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ImagePreviewProps {
  imageUrl: string;
  onRemove: () => void;
  onSend: () => void;
  isDesktop?: boolean;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageUrl,
  onRemove,
  onSend,
  isDesktop = false
}) => {
  return (
    <div className={`space-y-${isDesktop ? '2' : '3'}`}>
      <div className={`relative ${isDesktop ? 'w-20 h-20' : 'w-28 h-28'} mb-${isDesktop ? '2' : '3'}`}>
        <img 
          src={imageUrl} 
          alt="Selected image" 
          className="w-full h-full object-cover rounded-lg border"
        />
        <Button
          variant="destructive"
          size="icon"
          className={`${isDesktop ? 'h-5 w-5' : 'h-6 w-6'} absolute ${isDesktop ? 'top-1 right-1' : 'top-1.5 right-1.5'} rounded-full shadow-md`}
          onClick={onRemove}
        >
          <X className={`h-${isDesktop ? '3' : '3.5'} w-${isDesktop ? '3' : '3.5'}`} />
        </Button>
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline"
          size={isDesktop ? "sm" : "default"}
          className={`flex-1 ${isDesktop ? 'h-9 text-sm' : 'h-10'}`}
          onClick={onRemove}
        >
          Change Image
        </Button>
        <Button 
          size={isDesktop ? "sm" : "default"}
          onClick={onSend} 
          disabled={!imageUrl}
          className={`flex-1 ${isDesktop ? 'h-9 text-sm' : 'h-10'}`}
        >
          Send{isDesktop ? '' : ' Image'}
        </Button>
      </div>
    </div>
  );
};
