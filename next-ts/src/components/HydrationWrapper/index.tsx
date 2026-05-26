"use client";

import { useEffect, useState } from "react";

interface HydrationWrapperProps {
  children: React.ReactNode;
}

const HydrationWrapper: React.FC<HydrationWrapperProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Intentional hydration gate pattern (article-aligned): render children only after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <>{children}</>;
};

export default HydrationWrapper;
