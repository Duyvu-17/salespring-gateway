import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "recharts";

import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { useTheme } from "@/context/ThemeContext";
export const Appearance = () => {
  const { theme, setTheme } = useTheme();
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as "light" | "dark" | "purple" | "ocean");
    toast({
      title: "Theme updated",
      description: `Theme changed to ${newTheme}`,
    });
  };

  return (
    <>
      <div className="space-y-6 animate-fadeIn">
        <Card>
          <CardHeader>
            <CardTitle>Appearance Settings</CardTitle>
            <CardDescription>
              Customize the look and feel of the application
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                {/* <RadioGroup
                  defaultValue={theme}
                  onValueChange={handleThemeChange}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-4 relative transition-all hover:shadow-md">
                    <RadioGroupItem value="light" id="theme-light" />
                    <Label
                      name="theme-light"
                      className="flex items-center cursor-pointer w-full"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 mr-3 shadow-md"></div>
                      <div>
                        <p className="font-medium">Light Theme</p>
                        <p className="text-sm text-muted-foreground">
                          Clean, bright appearance
                        </p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 border rounded-lg p-4 relative transition-all hover:shadow-md">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <Label
                      name="theme-dark"
                      className="flex items-center cursor-pointer w-full"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 mr-3 shadow-md"></div>
                      <div>
                        <p className="font-medium">Dark Theme</p>
                        <p className="text-sm text-muted-foreground">
                          Easy on the eyes
                        </p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 border rounded-lg p-4 relative transition-all hover:shadow-md">
                    <RadioGroupItem value="purple" id="theme-purple" />
                    <Label
                      name="theme-purple"
                      className="flex items-center cursor-pointer w-full"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-700 mr-3 shadow-md"></div>
                      <div>
                        <p className="font-medium">Purple Theme</p>
                        <p className="text-sm text-muted-foreground">
                          Rich purple gradients
                        </p>
                      </div>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 border rounded-lg p-4 relative transition-all hover:shadow-md">
                    <RadioGroupItem value="ocean" id="theme-ocean" />
                    <Label
                      name="theme-ocean"
                      className="flex items-center cursor-pointer w-full"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 mr-3 shadow-md"></div>
                      <div>
                        <p className="font-medium">Ocean Theme</p>
                        <p className="text-sm text-muted-foreground">
                          Calming blue tones
                        </p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup> */}
                <div className="mt-4 p-4 border rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant={theme === "light" ? "default" : "outline"}
                      className="justify-center"
                      onClick={() => setTheme("light")}
                    >
                      Light
                    </Button>
                    <Button
                      variant={theme === "dark" ? "default" : "outline"}
                      className="justify-center"
                      onClick={() => setTheme("dark")}
                    >
                      Dark
                    </Button>
                    <Button
                      variant={theme === "purple" ? "default" : "outline"}
                      className="justify-center"
                      onClick={() => setTheme("purple")}
                    >
                      Purple
                    </Button>
                    <Button
                      variant={theme === "ocean" ? "default" : "outline"}
                      className="justify-center"
                      onClick={() => setTheme("ocean")}
                    >
                      Ocean
                    </Button>
                  </div>
                </div>

                <div className="mt-8 p-6 border rounded-lg bg-muted/20">
                  <h3 className="font-medium mb-4">Theme Preview</h3>
                  <div
                    className={`p-6 rounded-lg theme-${theme} border shadow-sm bg-card transition-colors`}
                  >
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                      <div>
                        <h3 className="text-lg font-medium">Sample Header</h3>
                        <p className="text-muted-foreground">
                          This is how content will appear
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Cancel
                        </Button>
                        <Button size="sm" variant="default">
                          Save
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="border p-4 rounded-lg bg-muted/20">
                        Card 1
                      </div>
                      <div className="border p-4 rounded-lg bg-muted/20">
                        Card 2
                      </div>
                      <div className="border p-4 rounded-lg bg-muted/20">
                        Card 3
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Appearance;
