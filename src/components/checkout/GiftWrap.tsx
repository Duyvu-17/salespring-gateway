
import { useState } from "react";
import { Gift } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface GiftWrapProps {
  onGiftWrapChange: (isGiftWrap: boolean) => void;
  onGiftMessageChange: (message: string) => void;
}

export const GiftWrap = ({ onGiftWrapChange, onGiftMessageChange }: GiftWrapProps) => {
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  
  const handleGiftWrapToggle = (checked: boolean) => {
    setIsGiftWrap(checked);
    onGiftWrapChange(checked);
  };
  
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setGiftMessage(e.target.value);
    onGiftMessageChange(e.target.value);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-primary" />
          Gift Options
        </CardTitle>
        <CardDescription>Add gift wrapping or a personal message</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="gift-wrap">Gift wrap</Label>
              <p className="text-sm text-muted-foreground">Add beautiful gift wrapping (+$5.00)</p>
            </div>
            <Switch 
              id="gift-wrap"
              checked={isGiftWrap}
              onCheckedChange={handleGiftWrapToggle}
            />
          </div>
          
          {isGiftWrap && (
            <div className="space-y-2 animate-fade-in">
              <Label htmlFor="gift-message">Gift message</Label>
              <Textarea 
                id="gift-message"
                placeholder="Add a personal message to include with this gift (Optional)"
                className="min-h-[100px]"
                value={giftMessage}
                onChange={handleMessageChange}
              />
              <p className="text-xs text-muted-foreground text-right">
                {giftMessage.length}/200 characters
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GiftWrap;
