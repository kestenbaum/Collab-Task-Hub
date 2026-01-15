import React, { FC } from 'react';
import { TabsContentProps } from '@/features/tabs/types';

const TabsContent: FC<TabsContentProps> = ({ content, activeContentIndex }) => {
  return (
    <div id="tab-content" className="p-8 min-h-[300px]">
      <h2 className="text-xl font-bold mb-4">{content[activeContentIndex].label}</h2>
      <ul className="space-y-3">
        {content[activeContentIndex].data.map((item) => (
          <li key={item} className="p-4 bg-gray-50 rounded-lg border border-gray-100 text-gray-600">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TabsContent;
