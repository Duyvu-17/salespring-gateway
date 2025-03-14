import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { useTheme } from "@/context/ThemeContext";
export const Appearance = () => {
  const { theme, setTheme } = useTheme();
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
