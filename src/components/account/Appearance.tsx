import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { setTheme, ThemeType } from "@/store/slices/themeSlice";

export const Appearance = () => {
  // const { theme, setTheme } = useTheme();
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  const handleThemeChange = (newTheme: string) => {
    dispatch(setTheme(newTheme as ThemeType));
    toast.success(`Theme changed to ${newTheme}`);
  };

  const themes = [
    { id: "light", name: "Light" },
    { id: "dark", name: "Dark" },
    { id: "purple", name: "Purple" },
    { id: "ocean", name: "Ocean" },
    { id: "sunset", name: "Sunset" },
    { id: "forest", name: "Forest" },
    { id: "midnight", name: "Midnight" },
    { id: "coffee", name: "Coffee" },
  ];

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
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {themes.map((t) => (
                      <Button
                        key={t.id}
                        variant={theme === t.id ? "default" : "outline"}
                        className="justify-center"
                        onClick={() => handleThemeChange(t.id)}
                      >
                        <span
                          className={`mr-2 rounded-full w-3 h-3 inline-block theme-dot bg-primary`}
                        ></span>
                        {t.name}
                        {theme === t.id && <Check className="ml-2 h-4 w-4" />}
                      </Button>
                    ))}
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
