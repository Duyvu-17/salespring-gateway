
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { UserRound, Camera, UploadCloud, Trash2 } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface AvatarChangerProps {
  currentAvatar?: string;
  username?: string;
  onAvatarChange?: (avatarUrl: string | null) => void;
}

const AvatarChanger = ({ 
  currentAvatar, 
  username = 'User', 
  onAvatarChange 
}: AvatarChangerProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(currentAvatar || null);
  const [isOpen, setIsOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const { toast } = useToast();

  // Get initials from username
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const handleUrlSubmit = () => {
    if (!inputUrl.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    // Basic URL validation
    try {
      new URL(inputUrl);
    } catch (e) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    // Test if image loads correctly
    const img = new Image();
    img.onload = () => {
      setAvatarUrl(inputUrl);
      if (onAvatarChange) onAvatarChange(inputUrl);
      
      toast({
        title: "Success",
        description: "Avatar updated successfully",
      });
      
      setIsOpen(false);
      setInputUrl('');
    };
    
    img.onerror = () => {
      toast({
        title: "Error",
        description: "Could not load image from URL",
        variant: "destructive",
      });
    };
    
    img.src = inputUrl;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Error",
        description: "Please upload an image file",
        variant: "destructive",
      });
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Image size should be less than 5MB",
        variant: "destructive",
      });
      return;
    }

    // Create object URL for preview
    const objectUrl = URL.createObjectURL(file);
    setAvatarUrl(objectUrl);
    
    if (onAvatarChange) onAvatarChange(objectUrl);
    
    toast({
      title: "Success",
      description: "Avatar updated successfully",
    });
    
    setIsOpen(false);

    // In a real app, you would upload the file to a server here
    // and then set the returned URL as the avatar URL
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl(null);
    if (onAvatarChange) onAvatarChange(null);
    
    toast({
      title: "Success",
      description: "Avatar removed",
    });
    
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <div className="relative group cursor-pointer">
            <Avatar className="h-24 w-24 border-4 border-background group-hover:border-primary transition-colors">
              <AvatarImage src={avatarUrl || undefined} alt={username} />
              <AvatarFallback className="text-lg">
                {username ? getInitials(username) : <UserRound className="h-8 w-8" />}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="h-8 w-8 text-white" />
            </div>
          </div>
        </DialogTrigger>
        
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change your avatar</DialogTitle>
            <DialogDescription>
              Upload a new avatar or enter an image URL
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex justify-center my-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src={avatarUrl || undefined} alt={username} />
              <AvatarFallback className="text-2xl">
                {username ? getInitials(username) : <UserRound className="h-12 w-12" />}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="avatar-url" className="text-sm font-medium">
                Image URL
              </label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="avatar-url"
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                />
                <Button onClick={handleUrlSubmit}>
                  Set
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="avatar-upload" className="text-sm font-medium">
                Upload from your device
              </label>
              <label htmlFor="avatar-upload" className="cursor-pointer">
                <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center hover:border-primary transition-colors">
                  <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Drag & drop or click to upload
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PNG, JPG or GIF (max 5MB)
                  </p>
                </div>
                <Input
                  id="avatar-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>
          
          <DialogFooter className="flex justify-between items-center">
            {avatarUrl && (
              <Button 
                variant="destructive" 
                onClick={handleRemoveAvatar}
                type="button"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove Avatar
              </Button>
            )}
            <Button
              onClick={() => setIsOpen(false)}
              type="button"
              variant="outline"
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="text-center">
        <h3 className="font-semibold">{username}</h3>
        <p className="text-sm text-muted-foreground">
          Click on the avatar to change it
        </p>
      </div>
    </div>
  );
};

export default AvatarChanger;
