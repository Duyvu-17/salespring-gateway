import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type RecentlyViewedItem = {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
};

interface RecentlyViewedContextType {
  recentlyViewed: RecentlyViewedItem[];
  addRecentlyViewed: (item: RecentlyViewedItem) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType>({
  recentlyViewed: [],
  addRecentlyViewed: () => {},
});

export const useRecentlyViewed = () => useContext(RecentlyViewedContext);

export const RecentlyViewedProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [recentlyViewed, setRecentlyViewed] = useState<RecentlyViewedItem[]>(
    []
  );

  useEffect(() => {
    const stored = localStorage.getItem("recentlyViewed");
    if (stored) setRecentlyViewed(JSON.parse(stored));
  }, []);

  const addRecentlyViewed = (item: RecentlyViewedItem) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((i) => i.id !== item.id);
      const newList = [item, ...filtered].slice(0, 4);
      localStorage.setItem("recentlyViewed", JSON.stringify(newList));
      return newList;
    });
  };

  return (
    <RecentlyViewedContext.Provider
      value={{ recentlyViewed, addRecentlyViewed }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
};
