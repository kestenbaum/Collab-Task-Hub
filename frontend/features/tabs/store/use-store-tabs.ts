import { create } from 'zustand';
import { TabItemProps } from '@/features/tabs/types';

interface StoreProps {
  tabs: TabItemProps[];
  activeTabIndex: number;
  setActiveIndex: (index: number) => void;
}

export const useStoreTabs = create<StoreProps>((set) => ({
  tabs: [
    { id: 'tasks', label: 'Tasks', data: ['Task 1', 'Task 2'] },
    { id: 'board', label: 'Board', data: ['In Progress', 'Done'] },
    { id: 'chat', label: 'Chat', data: ['General Chat'] },
    { id: 'users', label: 'Users', data: ['Admin', 'User 1'] },
  ],

  activeTabIndex: 0,
  setActiveIndex: (index) => set({ activeTabIndex: index }),
}));
