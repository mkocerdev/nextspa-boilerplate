"use client";

import { createContext, useContext, ReactNode, useState } from "react";

interface PageHeaderContextType {
  pageTitle: ReactNode;
  rightContent: ReactNode;
  setPageTitle: (content: ReactNode) => void;
  setRightContent: (content: ReactNode) => void;
}

const PageHeaderContext = createContext<PageHeaderContextType | undefined>(
  undefined
);

export function PageHeaderProvider({ children }: { children: ReactNode }) {
  const [pageTitle, setPageTitle] = useState<ReactNode>(null);
  const [rightContent, setRightContent] = useState<ReactNode>(null);

  return (
    <PageHeaderContext.Provider
      value={{ pageTitle, rightContent, setPageTitle, setRightContent }}
    >
      {children}
    </PageHeaderContext.Provider>
  );
}

export function usePageHeader() {
  const context = useContext(PageHeaderContext);
  if (context === undefined) {
    throw new Error("usePageHeader must be used within a PageHeaderProvider");
  }
  return context;
}
