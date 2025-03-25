import { Home, Briefcase } from "lucide-react";

export const AddressTypeIcon = ({ type }: { type: 'home' | 'office' }) => {
  return type === "office" ? (
    <Briefcase className="h-4 w-4 text-primary" />
  ) : (
    <Home className="h-4 w-4 text-primary" />
  );
};