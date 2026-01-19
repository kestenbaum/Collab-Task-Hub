import React from 'react';

export interface TabsProps {
  projectId: string;
}

export interface TabsHeaderProps {
  children: React.ReactNode;
}

export interface TabItemProps {
  id: string;
  label: string;
  data: string[];
}

export interface TabsContentProps {
  projectId: string;
  content: TabItemProps[];
  activeContentIndex: number;
}

export interface TabsMenuState extends TabsContentProps {
  setActiveContentIndex: (index: number) => void;
}
