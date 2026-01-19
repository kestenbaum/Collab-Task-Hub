import { create } from 'zustand';
import { TabItemProps } from '@/features/tabs/types';
import Board from '@/features/board/Board';
import Chat from '@/features/chat/components/Chat';
import UserList from '@/features/user/components/UserList';
import TaskList from '@/features/task/components/TaskList';

interface StoreProps {
  tabs: TabItemProps[];
  activeTabIndex: number;
  setActiveIndex: (index: number) => void;
}

export const useStoreTabs = create<StoreProps>((set) => ({
  tabs: [
    { id: 'tasks', label: 'Tasks', component: TaskList },
    { id: 'board', label: 'Board', component: Board },
    { id: 'chat', label: 'Chat', component: Chat },
    { id: 'users', label: 'Users', component: UserList },
  ],

  activeTabIndex: 0,
  setActiveIndex: (index) => set({ activeTabIndex: index }),
}));
