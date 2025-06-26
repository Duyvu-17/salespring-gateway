import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shirt,
  Laptop,
  Home,
  Gamepad2,
  Car,
  Gift,
  Tag,
  TrendingUp,
  Percent,
  Flame,
} from "lucide-react";
import { fetchCategories } from "@/store/slices/categorySlice";
import type { RootState, AppDispatch } from "@/store";

export const MainNavigationMenu = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length]);

  const categoryIcons = {
    "Điện thoại": Laptop,
    Laptop: Laptop,
    "Phụ kiện": Gift,
    // ...bổ sung mapping nếu muốn
  };

  const quickLinks = [
    { name: "Sản phẩm mới", href: "/search?type=new", icon: TrendingUp },
    { name: "Sản phẩm hot", href: "/search?type=hot", icon: Flame },
    { name: "Đang giảm giá", href: "/search?type=sale", icon: Percent },
  ];

  return (
    <div className="hidden lg:flex">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-sm font-medium">
              Categories
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid w-[600px] grid-cols-2 gap-4 p-6">
                <div>
                  <h4 className="text-sm font-medium mb-4 text-muted-foreground">
                    Shop by Category
                  </h4>
                  <div className="space-y-2">
                    {categories?.map((category) => {
                      const IconComponent =
                        categoryIcons[category.name] || Laptop;
                      return (
                        <NavigationMenuLink key={category.id} asChild>
                          <Link
                            to={`/search?category=${encodeURIComponent(
                              category.slug
                            )}`}
                            className="flex items-center space-x-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            {IconComponent && (
                              <IconComponent className="h-4 w-4 text-primary" />
                            )}
                            <span className="text-sm font-medium">
                              {category.name}
                            </span>
                          </Link>
                        </NavigationMenuLink>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-4 text-muted-foreground">
                    Quick Links
                  </h4>
                  <div className="space-y-2">
                    {quickLinks.map((link) => (
                      <NavigationMenuLink key={link.name} asChild>
                        <Link
                          to={link.href}
                          className="flex items-center space-x-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <link.icon className="h-4 w-4 text-primary" />
                          <span className="text-sm font-medium">
                            {link.name}
                          </span>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger className="text-sm font-medium">
              Customer Care
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[400px] p-6">
                <div className="space-y-3">
                  <NavigationMenuLink asChild>
                    <Link
                      to="/faq"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">
                        FAQ
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Find answers to frequently asked questions
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/returns"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">
                        Returns & Exchanges
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        30-day return policy with free exchanges
                      </p>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/customer-service"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    >
                      <div className="text-sm font-medium leading-none">
                        Customer Service
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        Get help from our support team
                      </p>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link to="/trending-products">
              <Button variant="ghost" className="text-sm font-medium">
                Trending
                <Badge variant="secondary" className="ml-2">
                  Hot
                </Badge>
              </Button>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
