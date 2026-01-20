'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useStoreChat } from '../store/use-store-chat';
import { useStoreAuth } from '@/features/auth/store/use-store-auth';
import { useProjects } from '@/features/project/hooks/useProject';
import { useChatWebSocket } from '../hooks/useChatWebSocket';
import { MessageItem } from './MessageItem';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { Loader } from '@/shared/ui';

const Chat: React.FC = () => {
  const { user } = useStoreAuth();
  const { selectedProject } = useProjects();
  const projectId = selectedProject?.id || null;

  console.log('[CHAT] Component rendered', { projectId, selectedProject: selectedProject?.title });

  const {
    messages,
    isLoading,
    error,
    typingUsers,
    loadMessages,
    clearMessages,
    editMessage,
    deleteMessage,
  } = useStoreChat();

  const { isConnected, sendMessage, setTyping } = useChatWebSocket(projectId);

  console.log('[CHAT] WebSocket status', { isConnected, projectId });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [hasLoadedInitial, setHasLoadedInitial] = useState(false);

  // Load initial messages
  useEffect(() => {
    console.log('[CHAT] Load messages effect', { projectId, hasLoadedInitial });
    if (projectId && !hasLoadedInitial) {
      loadMessages(projectId)
        .then(() => {
          console.log('[CHAT] Messages loaded successfully');
          setHasLoadedInitial(true);
        })
        .catch((error) => {
          console.error('[CHAT] Failed to load messages:', error);
        });
    }

    return () => {
      clearMessages();
      setHasLoadedInitial(false);
    };
  }, [projectId, loadMessages, clearMessages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, autoScroll]);

  // Handle scroll to detect if user has scrolled up
  const handleScroll = () => {
    if (messagesContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
      setAutoScroll(isAtBottom);
    }
  };

  const handleSendMessage = (content: string) => {
    if (isConnected && projectId) {
      sendMessage(content, projectId);
    }
  };

  const handleEditMessage = async (messageId: string, content: string) => {
    try {
      await editMessage(messageId, content);
    } catch (error) {
      console.error('Failed to edit message:', error);
    }
  };

  const handleDeleteMessage = async (messageId: string) => {
    if (confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteMessage(messageId);
      } catch (error) {
        console.error('Failed to delete message:', error);
      }
    }
  };

  const handleTyping = (isTyping: boolean) => {
    if (projectId) {
      setTyping(projectId, isTyping);
    }
  };

  const loadOlderMessages = async () => {
    if (messages.length > 0 && projectId) {
      const oldestMessage = messages[0];
      try {
        await loadMessages(projectId, 50, oldestMessage.createdAt);
      } catch (error) {
        console.error('Failed to load older messages:', error);
      }
    }
  };

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Please log in to access chat</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="border-b bg-gray-50 px-4 py-3 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Project Chat</h2>
          <p className="text-xs text-gray-500">
            {isConnected ? (
              <span className="text-green-600">● Connected</span>
            ) : (
              <span className="text-red-600">● Disconnected</span>
            )}
          </p>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-3 mx-4 mt-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Messages Container */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-1"
      >
        {/* Load More Button */}
        {messages.length >= 50 && (
          <div className="text-center mb-4">
            <button
              onClick={loadOlderMessages}
              disabled={isLoading}
              className="text-sm text-blue-600 hover:text-blue-800 underline disabled:text-gray-400"
            >
              Load older messages
            </button>
          </div>
        )}

        {/* Loading Indicator */}
        {isLoading && messages.length === 0 && (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="text-gray-400 mb-2">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">No messages yet</p>
            <p className="text-gray-400 text-sm">Be the first to send a message!</p>
          </div>
        )}

        {/* Messages */}
        {messages.map((message: any) => (
          <MessageItem
            key={message.id}
            message={message}
            onEdit={handleEditMessage}
            onDelete={handleDeleteMessage}
          />
        ))}

        {/* Typing Indicator */}
        <TypingIndicator typingUsers={typingUsers} currentUserId={user.id} />

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Scroll to Bottom Button */}
      {!autoScroll && (
        <button
          onClick={() => {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
            setAutoScroll(true);
          }}
          className="absolute bottom-24 right-8 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      )}

      {/* Input */}
      <ChatInput
        onSendMessage={handleSendMessage}
        onTyping={handleTyping}
        disabled={!isConnected}
      />
    </div>
  );
};

export default Chat;
