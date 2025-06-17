
import { useState } from "react";

export const useInputState = () => {
  const [userMessage, setUserMessage] = useState("");
  const [activeInput, setActiveInput] = useState<"text" | "image">("text");
  const [imageUrl, setImageUrl] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      return true; // Indicate that send should be triggered
    }
    return false;
  };

  return {
    userMessage,
    setUserMessage,
    activeInput,
    setActiveInput,
    imageUrl,
    setImageUrl,
    handleKeyDown,
  };
};
