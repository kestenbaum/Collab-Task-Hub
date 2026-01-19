import React, { FC } from 'react';
import { TabsContentProps } from '@/features/tabs/types';
import { useStoreTabs } from '@/features/tabs/store/use-store-tabs';

const TabsContent: FC<TabsContentProps> = ({ content, activeContentIndex }) => {
  const { tabs, activeTabIndex } = useStoreTabs();
  const activeTab = tabs[activeTabIndex];

  if (!activeTab) return null;
  const CurrentComponents = activeTab.component;
  return (
    <div id="tab-content" className="p-8 min-h-75">
      <h2 className="text-xl font-bold mb-4">{content[activeContentIndex].label}</h2>
      <CurrentComponents />
    </div>
  );
};

export default TabsContent;
