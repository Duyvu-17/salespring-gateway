
import React from 'react';
import { 
  Twitter, 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin, 
  Share2, 
  MessageCircle
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

interface SocialPlatform {
  name: string;
  icon: React.ReactNode;
  color: string;
  url: string;
}

interface SocialMediaIntegrationProps {
  productUrl?: string;
  productName?: string;
  productImage?: string;
}

export const SocialMediaIntegration: React.FC<SocialMediaIntegrationProps> = ({ 
  productUrl = window.location.href,
  productName = "Check out this amazing product!",
  productImage = "/placeholder.svg"
}) => {
  const { toast } = useToast();
  
  const socialPlatforms: SocialPlatform[] = [
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      color: "bg-[#1877f2] hover:bg-[#1877f2]/90",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-5 w-5" />,
      color: "bg-[#1da1f2] hover:bg-[#1da1f2]/90",
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(productName)}&url=${encodeURIComponent(productUrl)}`
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-5 w-5" />,
      color: "bg-[#0077b5] hover:bg-[#0077b5]/90",
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(productUrl)}`
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-5 w-5" />,
      color: "bg-gradient-to-r from-[#fd5949] to-[#d6249f] hover:opacity-90",
      url: "#" // Instagram doesn't support direct sharing links
    },
  ];
  
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          text: "Check out this product I found!",
          url: productUrl,
        });
        toast({
          title: "Shared Successfully",
          description: "Content was shared via your device's share function",
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      toast({
        title: "Share Not Supported",
        description: "Your browser doesn't support the Web Share API",
        variant: "destructive",
      });
    }
  };
  
  const handleSocialShare = (platform: SocialPlatform) => {
    if (platform.name === "Instagram") {
      toast({
        title: "Instagram Sharing",
        description: "Instagram doesn't support direct sharing. Consider taking a screenshot and sharing it on your Instagram.",
      });
      return;
    }
    
    window.open(platform.url, "_blank", "width=600,height=400");
    
    toast({
      title: `Shared on ${platform.name}`,
      description: `Content is being shared on ${platform.name}`,
    });
  };
  
  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(productUrl).then(() => {
      toast({
        title: "Link Copied",
        description: "Link copied to clipboard",
      });
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Share2 className="h-5 w-5" />
          Share & Connect
        </CardTitle>
        <CardDescription>
          Share this content on your favorite social platforms
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          {socialPlatforms.map((platform) => (
            <Button
              key={platform.name}
              variant="outline"
              className={`flex items-center gap-2 text-white ${platform.color}`}
              onClick={() => handleSocialShare(platform)}
            >
              {platform.icon}
              <span>{platform.name}</span>
            </Button>
          ))}
          
          {navigator.share && (
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleShare}
            >
              <Share2 className="h-5 w-5" />
              <span>Native Share</span>
            </Button>
          )}
        </div>
        
        <Separator />
        
        <div className="flex items-center gap-2">
          <div className="border rounded-md px-3 py-2 flex-1 bg-muted/30 text-sm overflow-hidden">
            <p className="truncate">{productUrl}</p>
          </div>
          <Button variant="outline" onClick={copyLinkToClipboard}>
            Copy Link
          </Button>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium">Follow Our Social Channels</h3>
          <div className="flex gap-3">
            <a href="#facebook" className="hover:text-[#1877f2] transition-colors">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#twitter" className="hover:text-[#1da1f2] transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#instagram" className="hover:text-[#e4405f] transition-colors">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#youtube" className="hover:text-[#ff0000] transition-colors">
              <Youtube className="h-6 w-6" />
            </a>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-center w-full">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => window.open("#contact", "_self")}
          >
            <MessageCircle className="h-4 w-4" />
            Contact Us
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
