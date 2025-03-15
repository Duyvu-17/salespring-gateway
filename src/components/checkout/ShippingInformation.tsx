
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { MapPin, Edit2, Plus } from "lucide-react";

const ShippingInformation = () => {
  const [showAddressDialog, setShowAddressDialog] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("default");
  const [newAddress, setNewAddress] = useState({
    name: "",
    street: "",
    district: "",
    city: "",
    country: "Vietnam",
    postalCode: "",
    phone: ""
  });
  
  const [savedAddresses, setSavedAddresses] = useState([
    {
      id: "default",
      name: "Thanh Nguyen",
      street: "123 Nguyen Hue Street",
      district: "District 1",
      city: "Ho Chi Minh City",
      country: "Vietnam",
      postalCode: "70000",
      phone: "+84 123 456 789"
    },
    {
      id: "office",
      name: "Thanh Nguyen (Office)",
      street: "456 Le Loi Street",
      district: "District 3",
      city: "Ho Chi Minh City",
      country: "Vietnam",
      postalCode: "70000",
      phone: "+84 987 654 321"
    }
  ]);
  
  const handleNewAddressSave = () => {
    // Validate form
    if (!newAddress.name || !newAddress.street || !newAddress.city || !newAddress.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
      });
      return;
    }
    
    const addressId = `address_${Date.now()}`;
    
    // Add new address
    setSavedAddresses([...savedAddresses, { id: addressId, ...newAddress }]);
    setSelectedAddress(addressId);
    
    toast({
      title: "Address added",
      description: "Your new shipping address has been saved.",
    });
    
    setShowAddressDialog(false);
    
    // Reset form
    setNewAddress({
      name: "",
      street: "",
      district: "",
      city: "",
      country: "Vietnam",
      postalCode: "",
      phone: ""
    });
  };
  
  const currentAddress = savedAddresses.find(a => a.id === selectedAddress) || savedAddresses[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
        <CardDescription>Your items will be shipped to this address</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Current selected address */}
          <div className="flex justify-between items-start border p-4 rounded-lg">
            <div className="flex gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{currentAddress.name}</p>
                <p className="text-sm text-muted-foreground">{currentAddress.street}</p>
                <p className="text-sm text-muted-foreground">{currentAddress.district}, {currentAddress.city}</p>
                <p className="text-sm text-muted-foreground">{currentAddress.country}, {currentAddress.postalCode}</p>
                <p className="text-sm text-muted-foreground">{currentAddress.phone}</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowAddressDialog(true)}
            >
              <Edit2 className="h-4 w-4 mr-2" />
              Change
            </Button>
          </div>
        </div>
        
        {/* Address selection dialog */}
        <Dialog open={showAddressDialog} onOpenChange={setShowAddressDialog}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Select Shipping Address</DialogTitle>
              <DialogDescription>
                Choose from your saved addresses or add a new one
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <RadioGroup 
                value={selectedAddress} 
                onValueChange={setSelectedAddress}
                className="space-y-3"
              >
                {savedAddresses.map(address => (
                  <div key={address.id} className="flex items-start space-x-2 border p-4 rounded-lg hover:bg-muted/20">
                    <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                    <div className="flex-1">
                      <Label 
                        htmlFor={address.id} 
                        className="flex flex-col space-y-1 cursor-pointer"
                      >
                        <span className="font-medium">{address.name}</span>
                        <span className="text-sm text-muted-foreground">{address.street}</span>
                        <span className="text-sm text-muted-foreground">{address.district}, {address.city}</span>
                        <span className="text-sm text-muted-foreground">{address.country}, {address.postalCode}</span>
                        <span className="text-sm text-muted-foreground">{address.phone}</span>
                      </Label>
                    </div>
                  </div>
                ))}
                
                <div className="border border-dashed p-4 rounded-lg hover:bg-muted/20">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-center py-6"
                    onClick={() => {
                      setNewAddress({
                        name: "",
                        street: "",
                        district: "",
                        city: "",
                        country: "Vietnam",
                        postalCode: "",
                        phone: ""
                      });
                      
                      // This will cause the dialog content to change to the add address form
                      setSelectedAddress("new");
                    }}
                  >
                    <Plus className="h-5 w-5 mr-2" />
                    Add New Address
                  </Button>
                </div>
              </RadioGroup>
              
              {/* Add new address form */}
              {selectedAddress === "new" && (
                <div className="mt-6 border p-4 rounded-lg space-y-4">
                  <h3 className="font-medium">Add New Address</h3>
                  
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={newAddress.name}
                      onChange={(e) => setNewAddress({...newAddress, name: e.target.value})}
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="street">Street Address</Label>
                    <Input 
                      id="street" 
                      value={newAddress.street}
                      onChange={(e) => setNewAddress({...newAddress, street: e.target.value})}
                      placeholder="Street name and number"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="district">District</Label>
                      <Input 
                        id="district" 
                        value={newAddress.district}
                        onChange={(e) => setNewAddress({...newAddress, district: e.target.value})}
                        placeholder="District or ward"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        value={newAddress.city}
                        onChange={(e) => setNewAddress({...newAddress, city: e.target.value})}
                        placeholder="City or province"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input 
                        id="country" 
                        value={newAddress.country}
                        onChange={(e) => setNewAddress({...newAddress, country: e.target.value})}
                        placeholder="Country"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input 
                        id="postalCode" 
                        value={newAddress.postalCode}
                        onChange={(e) => setNewAddress({...newAddress, postalCode: e.target.value})}
                        placeholder="Postal or zip code"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={newAddress.phone}
                      onChange={(e) => setNewAddress({...newAddress, phone: e.target.value})}
                      placeholder="Phone number with country code"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleNewAddressSave} 
                    className="w-full mt-4"
                  >
                    Save Address
                  </Button>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddressDialog(false)}>
                Cancel
              </Button>
              {selectedAddress !== "new" && (
                <Button onClick={() => {
                  toast({
                    title: "Address updated",
                    description: "Your shipping address has been updated.",
                  });
                  setShowAddressDialog(false);
                }}>
                  Confirm Address
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ShippingInformation;
