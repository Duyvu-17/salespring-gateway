import {
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
  LogOut,
  RefreshCw,
  Shield,
  Trash,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@radix-ui/react-switch";
import { Separator } from "@radix-ui/react-separator";
import { Input } from "../ui/input";
import { Label } from "recharts";
import { useState } from "react";
import { toast } from "sonner";

export const Security = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    loginAlerts: true,
    passwordChanges: true,
  });

  const handleSecuritySettingToggle = (key: keyof typeof securitySettings) => {
    setSecuritySettings({
      ...securitySettings,
      [key]: !securitySettings[key],
    });
    toast("Security settings updated", {
      description: `${key} ${!securitySettings[key] ? "enabled" : "disabled"}`,
    });
  };
  
  const handleEnableTwoFactor = () => {
    setSecuritySettings({
      ...securitySettings,
      twoFactorEnabled: true,
    });
    toast("Two-factor authentication enabled", {
      description: "Your account is now more secure",
    });
  };
  
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Error", {
        description: "New passwords don't match",
      });
      return;
    }
    toast("Password updated", {
      description: "Your password has been updated successfully",
    });
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  
  return (
    <>
      <div className="space-y-6 animate-fadeIn">
        <Card>
          <CardHeader>
            <CardTitle>Password Management</CardTitle>
            <CardDescription>
              Update and secure your account password
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label name="current-password">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label name="new-password">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label name="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="bg-muted/30 p-3 rounded text-sm space-y-1">
                <p className="font-medium">Password Requirements:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>At least 8 characters long</li>
                  <li>Include at least one uppercase letter</li>
                  <li>Include at least one number</li>
                  <li>Include at least one special character</li>
                </ul>
              </div>

              <Button type="submit" className="w-full sm:w-auto">
                <RefreshCw className="mr-2 h-4 w-4" />
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Two-Factor Authentication</CardTitle>
            <CardDescription>
              Add an extra layer of security to your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">Two-Factor Authentication (2FA)</h3>
                <p className="text-sm text-muted-foreground">
                  Protect your account with an additional verification step each
                  time you sign in.
                </p>
              </div>
              <Switch
                checked={securitySettings.twoFactorEnabled}
                onCheckedChange={() =>
                  handleSecuritySettingToggle("twoFactorEnabled")
                }
              />
            </div>

            {!securitySettings.twoFactorEnabled && (
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-primary" />
                  Enhance Your Account Security
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Two-factor authentication adds an extra layer of security to
                  your account by requiring access to your phone in addition to
                  your password.
                </p>
                <Button onClick={handleEnableTwoFactor} className="mt-3">
                  Set Up 2FA
                </Button>
              </div>
            )}

            {securitySettings.twoFactorEnabled && (
              <div className="bg-muted/30 p-4 rounded-lg">
                <h4 className="font-medium flex items-center text-green-600 dark:text-green-500">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Two-factor authentication is enabled
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Your account is now protected with two-factor authentication.
                </p>
                <div className="mt-3 flex gap-2">
                  <Button variant="outline" size="sm">
                    Setup Backup Codes
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive"
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Disable 2FA
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Security Notifications</CardTitle>
            <CardDescription>
              Control your security-related notifications
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex justify-between items-start py-2">
              <div>
                <h3 className="font-medium">Login Alerts</h3>
                <p className="text-sm text-muted-foreground">
                  Receive notifications when someone logs into your account
                </p>
              </div>
              <Switch
                checked={securitySettings.loginAlerts}
                onCheckedChange={() =>
                  handleSecuritySettingToggle("loginAlerts")
                }
              />
            </div>

            <Separator />

            <div className="flex justify-between items-start py-2">
              <div>
                <h3 className="font-medium">Password Change Alerts</h3>
                <p className="text-sm text-muted-foreground">
                  Get notified when your password is changed
                </p>
              </div>
              <Switch
                checked={securitySettings.passwordChanges}
                onCheckedChange={() =>
                  handleSecuritySettingToggle("passwordChanges")
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Device Management</CardTitle>
            <CardDescription>
              Manage devices that are logged into your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-start p-4 border rounded-lg bg-primary/5">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">Current Device</p>
                    <p className="text-sm text-muted-foreground">
                      MacBook Pro • Los Angeles, CA • Active now
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium">iPhone 13</p>
                    <p className="text-sm text-muted-foreground">
                      Los Angeles, CA • Last active 2 hours ago
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive border-destructive hover:bg-destructive/10"
                >
                  Log Out
                </Button>
              </div>

              <div className="flex justify-between items-center p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-amber-500" />
                  <div>
                    <p className="font-medium">Windows PC</p>
                    <p className="text-sm text-muted-foreground">
                      New York, NY • Last active 5 days ago
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive border-destructive hover:bg-destructive/10"
                >
                  Log Out
                </Button>
              </div>
            </div>

            <Button
              variant="outline"
              className="text-destructive border-destructive hover:bg-destructive/10 mt-2"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out From All Devices
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Security;
