import { create } from 'zustand';
import { ChatStore, ChatMessage } from '../types';
import { chatApi } from '../api/chatApi';

export const useStoreChat = create<ChatStore>((set, get) => ({
  messages: [],
  isLoading: false,
  error: null,
  typingUsers: new Map(),

  clearError: () => set({ error: null }),

  loadMessages: async (projectId: string, limit = 200, before?: string) => {
    set({ isLoading: true, error: null });
    try {
      const messages = await chatApi.getMessages(projectId, limit, before);

      // If "before" is provided, we're loading older messages, prepend them
      if (before) {
        set({ messages: [...messages, ...get().messages] });
      } else {
        set({ messages });
      }
    } catch (e: any) {
      const errorMessage = e?.response?.data?.message || e?.message || 'Failed to load messages';
      console.error('[Chat] Failed to load messages:', {
        status: e?.response?.status,
        message: errorMessage,
        url: e?.config?.url,
        projectId,
      });
      set({ error: errorMessage });
      throw e;
    } finally {
      set({ isLoading: false });
    }
  },

  addMessage: (message: ChatMessage) => {
    const messages = get().messages;
    // Check if message already exists (to avoid duplicates)
    if (!messages.find((m) => m.id === message.id)) {
      set({ messages: [...messages, message] });
    }
  },

  updateMessage: (message: ChatMessage) => {
    set({
      messages: get().messages.map((m) => (m.id === message.id ? message : m)),
    });
  },

  removeMessage: (messageId: string) => {
    set({
      messages: get().messages.filter((m) => m.id !== messageId),
    });
  },

  editMessage: async (messageId: string, content: string) => {
    set({ isLoading: true, error: null });
    try {
      const updatedMessage = await chatApi.editMessage(messageId, content);
      get().updateMessage(updatedMessage);
    } catch (e) {
      set({
        error: e instanceof Error ? e.message : 'Failed to edit message',
      });
      throw e;
    } finally {
      set({ isLoading: false });
    }
  },

  deleteMessage: async (messageId: string) => {
    set({ isLoading: true, error: null });
    try {
      const deletedMessage = await chatApi.deleteMessage(messageId);
      get().updateMessage(deletedMessage);
    } catch (e) {
      set({
        error: e instanceof Error ? e.message : 'Failed to delete message',
      });
      throw e;
    } finally {
      set({ isLoading: false });
    }
  },

  setTypingUser: (userId: string, userName: string) => {
    const typingUsers = new Map(get().typingUsers);
    typingUsers.set(userId, userName);
    set({ typingUsers });
  },

  removeTypingUser: (userId: string) => {
    const typingUsers = new Map(get().typingUsers);
    typingUsers.delete(userId);
    set({ typingUsers });
  },

  clearMessages: () => {
    set({ messages: [], typingUsers: new Map() });
  },
}));
