import React from 'react';

export interface TabsHeaderProps {
  children: React.ReactNode;
}

export interface TabItemProps {
  id: string;
  label: string;
  data: string[];
}

export interface TabsContentProps {
  content: TabItemProps[];
  activeContentIndex: number;
}

export interface TabsMenuState extends TabsContentProps {
  setActiveContentIndex: (index: number) => void;
}
