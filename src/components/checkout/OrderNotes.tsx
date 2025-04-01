
import { useState } from "react";
import { StickyNote } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface OrderNotesProps {
  onNotesChange: (notes: string) => void;
}

export const OrderNotes = ({ onNotesChange }: OrderNotesProps) => {
  const [notes, setNotes] = useState("");
  
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
    onNotesChange(e.target.value);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <StickyNote className="h-5 w-5 text-primary" />
          Order Notes
        </CardTitle>
        <CardDescription>Add special instructions for your order</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="order-notes">Special instructions (Optional)</Label>
          <Textarea
            id="order-notes"
            placeholder="Add any special delivery instructions, notes for the seller, or delivery preferences"
            className="min-h-[100px]"
            value={notes}
            onChange={handleNotesChange}
          />
          <p className="text-xs text-muted-foreground text-right">
            {notes.length}/500 characters
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderNotes;
