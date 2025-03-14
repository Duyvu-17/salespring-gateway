
import { useState } from "react";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2, Check } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const AddressesTab = () => {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      line1: "123 Main Street",
      line2: "Apt 4B",
      city: "New York",
      state: "NY",
      postal: "10001",
      country: "United States",
      isDefault: true
    },
    {
      id: 2,
      name: "Work",
      line1: "456 Business Ave",
      line2: "Suite 300",
      city: "San Francisco",
      state: "CA",
      postal: "94103",
      country: "United States",
      isDefault: false
    }
  ]);
  
  const [isOpen, setIsOpen] = useState(false);
  const [currentAddress, setCurrentAddress] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleOpenAddNew = () => {
    setCurrentAddress({
      id: Date.now(),
      name: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      postal: "",
      country: "",
      isDefault: false
    });
    setIsEditing(false);
    setIsOpen(true);
  };
  
  const handleOpenEdit = (address: any) => {
    setCurrentAddress(address);
    setIsEditing(true);
    setIsOpen(true);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentAddress((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    if (isEditing) {
      setAddresses(addresses.map(a => a.id === currentAddress.id ? currentAddress : a));
      toast({
        title: "Address updated",
        description: "Your address has been updated successfully."
      });
    } else {
      setAddresses([...addresses, currentAddress]);
      toast({
        title: "Address added",
        description: "Your new address has been added successfully."
      });
    }
    setIsOpen(false);
  };
  
  const handleDelete = (id: number) => {
    setAddresses(addresses.filter(a => a.id !== id));
    toast({
      title: "Address removed",
      description: "Your address has been removed successfully."
    });
  };
  
  const handleSetDefault = (id: number) => {
    setAddresses(addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    })));
    toast({
      title: "Default address updated",
      description: "Your default address has been updated successfully."
    });
  };
  
  return (
    <>
      <CardHeader>
        <CardTitle>Shipping Addresses</CardTitle>
        <CardDescription>Manage your shipping addresses</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={handleOpenAddNew}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New Address
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <div key={address.id} className="border rounded-lg p-4 relative">
                {address.isDefault && (
                  <Badge className="absolute top-2 right-2 bg-green-500">
                    Default
                  </Badge>
                )}
                <div className="space-y-2">
                  <h3 className="font-medium">{address.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    <p>{address.line1}</p>
                    {address.line2 && <p>{address.line2}</p>}
                    <p>{address.city}, {address.state} {address.postal}</p>
                    <p>{address.country}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleOpenEdit(address)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDelete(address.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                  {!address.isDefault && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Set Default
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Address" : "Add New Address"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Update your address information below" : "Fill in the address information below"}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Address Name</Label>
              <Input 
                id="name"
                name="name"
                value={currentAddress?.name || ""}
                onChange={handleChange}
                placeholder="Home, Work, etc."
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="line1">Address Line 1</Label>
              <Input 
                id="line1"
                name="line1"
                value={currentAddress?.line1 || ""}
                onChange={handleChange}
                placeholder="Street address"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="line2">Address Line 2 (Optional)</Label>
              <Input 
                id="line2"
                name="line2"
                value={currentAddress?.line2 || ""}
                onChange={handleChange}
                placeholder="Apartment, suite, etc."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city"
                  name="city"
                  value={currentAddress?.city || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State/Province</Label>
                <Input 
                  id="state"
                  name="state"
                  value={currentAddress?.state || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postal">Postal Code</Label>
                <Input 
                  id="postal"
                  name="postal"
                  value={currentAddress?.postal || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input 
                  id="country"
                  name="country"
                  value={currentAddress?.country || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{isEditing ? "Update Address" : "Add Address"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

// Define Badge component here since we need it
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${className}`}>
      {children}
    </span>
  );
};
