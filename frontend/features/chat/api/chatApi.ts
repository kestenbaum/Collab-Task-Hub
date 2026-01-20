import { api } from '@/shared/api/axios';
import { ChatMessage, EditMessageDto } from '../types';

export const chatApi = {
  // Get messages for a project
  async getMessages(
    projectId: string,
    limit: number = 200,
    before?: string,
  ): Promise<ChatMessage[]> {
    const params = new URLSearchParams({ limit: limit.toString() });
    if (before) {
      params.append('before', before);
    }
    const response = await api.get(`/chat/projects/${projectId}/messages?${params}`);
    return response.data;
  },

  // Edit a message
  async editMessage(messageId: string, content: string): Promise<ChatMessage> {
    const response = await api.patch(`/chat/messages/${messageId}`, { content });
    return response.data;
  },

  // Delete a message
  async deleteMessage(messageId: string): Promise<ChatMessage> {
    const response = await api.delete(`/chat/messages/${messageId}`);
    return response.data;
  },
};
