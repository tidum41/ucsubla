'use client';

import { createContext, useContext, useState } from 'react';
import type { Message, Conversation } from './types';
import { mockConversations, mockMessages } from './mockData';

interface MessagesContextValue {
  conversations: Conversation[];
  messages: Message[];
  pendingConvId: string | null;
  addConversation: (conv: Conversation) => void;
  addMessage: (msg: Message) => void;
  updateConversationLastMessage: (convId: string, msg: Message) => void;
  markConversationRead: (convId: string) => void;
  setPendingConvId: (id: string | null) => void;
}

const MessagesContext = createContext<MessagesContextValue | null>(null);

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [pendingConvId, setPendingConvId] = useState<string | null>(null);

  const addConversation = (conv: Conversation) => {
    setConversations(prev => [...prev, conv]);
  };

  const addMessage = (msg: Message) => {
    setMessages(prev => [...prev, msg]);
  };

  const updateConversationLastMessage = (convId: string, msg: Message) => {
    setConversations(prev =>
      prev.map(c => c.id === convId ? { ...c, lastMessage: msg } : c)
    );
  };

  const markConversationRead = (convId: string) => {
    setConversations(prev =>
      prev.map(c => c.id === convId ? { ...c, unreadCount: 0 } : c)
    );
  };

  return (
    <MessagesContext.Provider value={{
      conversations, messages, pendingConvId,
      addConversation, addMessage, updateConversationLastMessage,
      markConversationRead, setPendingConvId,
    }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages(): MessagesContextValue {
  const ctx = useContext(MessagesContext);
  if (!ctx) throw new Error('useMessages must be used within MessagesProvider');
  return ctx;
}
