
import { useState, useEffect, useRef } from 'react';

export function useLazyLoad<T>(
  items: T[], 
  initialCount: number = 6, 
  loadMoreCount: number = 3
): {
  visibleItems: T[];
  loadingRef: React.RefObject<HTMLDivElement>;
  hasMore: boolean;
  isLoading: boolean;
} {
  const [visibleItems, setVisibleItems] = useState<T[]>(items.slice(0, initialCount));
  const [hasMore, setHasMore] = useState<boolean>(items.length > initialCount);
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    // Reset when items change
    setVisibleItems(items.slice(0, initialCount));
    setHasMore(items.length > initialCount);
  }, [items, initialCount]);
  
  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasMore && !isLoading) {
        setIsLoading(true);
        
        // Simulate network delay for smoother UX
        setTimeout(() => {
          setVisibleItems(prev => [
            ...prev,
            ...items.slice(prev.length, prev.length + loadMoreCount)
          ]);
          
          setHasMore(prev => items.length > visibleItems.length + loadMoreCount);
          setIsLoading(false);
        }, 300);
      }
    }, options);
    
    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [items, hasMore, visibleItems.length, loadMoreCount, isLoading]);
  
  return { visibleItems, loadingRef, hasMore, isLoading };
}
