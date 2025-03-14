
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { AvatarChanger } from "@/components/user/AvatarChanger";

export const ProfileTab = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567"
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully."
    });
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data
    setProfileData({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567"
    });
  };
  
  return (
    <>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>Manage your personal information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex flex-col items-center space-y-4">
          <AvatarChanger />
          <div className="text-center">
            <h3 className="text-lg font-semibold">{profileData.firstName} {profileData.lastName}</h3>
            <p className="text-sm text-muted-foreground">Member since Jan 2022</p>
          </div>
        </div>
        
        <Separator />
        
        <div className="grid gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName"
                name="firstName"
                value={profileData.firstName}
                onChange={handleChange}
                readOnly={!isEditing}
                className={!isEditing ? "bg-muted" : ""}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName"
                name="lastName"
                value={profileData.lastName}
                onChange={handleChange}
                readOnly={!isEditing}
                className={!isEditing ? "bg-muted" : ""}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email"
              name="email"
              type="email"
              value={profileData.email}
              onChange={handleChange}
              readOnly={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              readOnly={!isEditing}
              className={!isEditing ? "bg-muted" : ""}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {isEditing ? (
          <>
            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </>
        ) : (
          <>
            <Button variant="outline">Change Password</Button>
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          </>
        )}
      </CardFooter>
    </>
  );
};
