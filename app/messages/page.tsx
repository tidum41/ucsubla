'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Icon from '@/components/common/Icon';
import BottomNav from '@/components/layout/BottomNav';
import { mockListings, mockUser } from '@/lib/mockData';
import { useMessages } from '@/lib/MessagesContext';
import { formatTimestamp } from '@/lib/utils';
import type { Message } from '@/lib/types';

const PETER_PARKER_AVATAR = '/peter-parker.webp';

export default function MessagesPage() {
  const router = useRouter();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { conversations, messages, pendingConvId, addMessage, updateConversationLastMessage, markConversationRead, setPendingConvId } = useMessages();

  // Auto-open pending conversation (from compose modal on listing page)
  useEffect(() => {
    if (pendingConvId) {
      setSelectedConversationId(pendingConvId);
      setPendingConvId(null);
    }
  }, [pendingConvId]);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 350);
    return () => clearTimeout(t);
  }, []);

  const selectedConversation = conversations.find((c) => c.id === selectedConversationId);
  const conversationMessages = messages.filter((m) => m.conversationId === selectedConversationId);

  useEffect(() => {
    if (selectedConversationId) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversationMessages.length, selectedConversationId]);

  const openConversation = (convId: string) => {
    markConversationRead(convId);
    setSelectedConversationId(convId);
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedConversationId) return;
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: selectedConversationId,
      senderId: mockUser.id,
      text: messageText.trim(),
      timestamp: new Date().toISOString(),
      read: true,
    };

    addMessage(newMessage);
    updateConversationLastMessage(selectedConversationId, newMessage);
    setMessageText('');
  };

  const formatMessageDate = (timestamp: string) => {
    const d = new Date(timestamp);
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  };

  // Conversation List View
  if (!selectedConversationId) {
    return (
      <>
        <div className="blurHeader app-container">
          <div className="blurHeaderContent">
            <h1 className="text-h1 text-darkSlate">Chat</h1>
          </div>
        </div>

        <div className="min-h-screen pb-20 bg-background app-container">
          <div className="h-[52px]" style={{ marginTop: 'env(safe-area-inset-top)' }} />

          <div className="px-5 pt-4">
            {!isLoaded ? (
              <div className="space-y-2">
                {[0, 1].map(i => (
                  <div key={i} className="card p-4">
                    <div className="flex gap-3 items-center">
                      <div className="skeleton-shimmer w-12 h-12 rounded-full flex-shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="skeleton-shimmer h-4 w-40 rounded-md" />
                        <div className="skeleton-shimmer h-3 w-56 rounded-md" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : conversations.length > 0 ? (
              <div className="space-y-2">
                {conversations.map((conversation) => {
                  const listing = mockListings.find((l) => l.id === conversation.listingId);
                  const hasUnread = conversation.unreadCount > 0;

                  return (
                    <button
                      key={conversation.id}
                      onClick={() => openConversation(conversation.id)}
                      className="w-full card shadow-card p-4 active:bg-gray-50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        {/* Unread dot — sits flush left of avatar */}
                        <div className="w-[6px] flex-shrink-0 flex items-center justify-center">
                          {hasUnread && (
                            <span className="w-[6px] h-[6px] rounded-full bg-uclaBlue" />
                          )}
                        </div>

                        {/* Peter Parker avatar */}
                        <img
                          src={PETER_PARKER_AVATAR}
                          alt="Peter Parker"
                          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                        />

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-0.5">
                            <h3 className={`text-h3 truncate ${hasUnread ? 'font-bold text-darkSlate' : 'font-semibold text-darkSlate'}`}>
                              {listing?.address || 'Unknown Listing'}
                            </h3>
                            <span className={`text-small flex-shrink-0 ${hasUnread ? 'text-uclaBlue font-medium' : 'text-slateGray'}`}>
                              {formatTimestamp(conversation.lastMessage.timestamp)}
                            </span>
                          </div>
                          <p className={`text-small truncate ${hasUnread ? 'text-darkSlate font-medium' : 'text-slateGray'}`}>
                            {conversation.lastMessage.text}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center px-8">
                <div className="w-16 h-16 rounded-full bg-uclaBlue/10 flex items-center justify-center mb-4">
                  <Icon name="message" size={28} className="text-uclaBlue" />
                </div>
                <h3 className="text-h2 text-darkSlate mb-1">No messages yet</h3>
                <p className="text-body text-slateGray">
                  Start a conversation by tapping Message on any listing
                </p>
              </div>
            )}
          </div>
        </div>
        <BottomNav />
      </>
    );
  }

  // Chat View
  const listing = mockListings.find((l) => l.id === selectedConversation?.listingId);
  const listerName = 'Peter Parker';
  const listerVerified = true;

  const firstMessageDate = conversationMessages.length > 0
    ? formatMessageDate(conversationMessages[0].timestamp)
    : null;

  return (
    <>
    <div className="flex flex-col bg-background app-container" style={{ height: '100dvh' }}>
      {/* Chat Header */}
      <div className="blurHeaderWithNav app-container">
        <div className="blurHeaderWithNavContent">
          <button
            onClick={() => setSelectedConversationId(null)}
            className="p-3 active:bg-gray-100 rounded-full transition-colors -ml-1.5"
            aria-label="Back to messages"
          >
            <Icon name="chevron.left" size={24} className="text-darkSlate" />
          </button>

          {/* Center: avatar + listing address (tappable) + lister name */}
          <Link
            href={listing ? `/listing/${listing.id}` : '#'}
            className="flex items-center gap-3 flex-1 min-w-0 active:opacity-70 transition-opacity"
          >
            <img
              src={PETER_PARKER_AVATAR}
              alt="Peter Parker"
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h2 className="text-h3 text-darkSlate truncate">
                {listing?.address || 'Unknown Listing'}
              </h2>
              <div className="flex items-center gap-1">
                <p className="text-small text-slateGray truncate">
                  {listerName}
                </p>
                {listerVerified && (
                  <Icon name="checkmark.seal.fill" size={14} className="text-slateGray flex-shrink-0" />
                )}
              </div>
            </div>
          </Link>

          {/* View listing button */}
          {listing && (
            <Link
              href={`/listing/${listing.id}`}
              className="p-2.5 active:bg-gray-100 rounded-full transition-colors flex-shrink-0"
              aria-label="View listing"
            >
              <Icon name="house" size={20} className="text-slateGray" />
            </Link>
          )}
        </div>
      </div>

      {/* Spacer for fixed nav */}
      <div className="h-[60px]" style={{ marginTop: 'env(safe-area-inset-top)' }} />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-6 pb-36 space-y-4">
        {/* Date label */}
        {firstMessageDate && (
          <div className="flex justify-center mb-2">
            <span className="text-tiny text-lightSlate tracking-wide">{firstMessageDate}</span>
          </div>
        )}

        {conversationMessages.map((message) => {
          const isSentByMe = message.senderId === mockUser.id;
          const timeStr = new Date(message.timestamp).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
          });

          return (
            <div
              key={message.id}
              className={`flex flex-col ${isSentByMe ? 'items-end' : 'items-start'}`}
            >
              {!isSentByMe && (
                <span className="text-xs text-slateGray mb-1 px-1">
                  {listerName} · {timeStr}
                </span>
              )}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                  isSentByMe
                    ? 'bg-uclaBlue text-white'
                    : 'bg-white text-darkSlate'
                }`}
              >
                <p className="text-body">{message.text}</p>
                {isSentByMe && (
                  <span className="text-xs mt-1 block text-white/70">
                    {timeStr}
                  </span>
                )}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="fixed bottom-20 left-0 right-0 px-4 py-3 bg-background/90 backdrop-blur-sm app-container z-30">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 bg-white border border-border rounded-full px-4 py-2.5 text-body text-darkSlate placeholder:text-lightSlate focus:outline-none focus:ring-0"
          />
          <button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            className={`rounded-full p-2.5 transition-colors flex-shrink-0 border ${
              messageText.trim()
                ? 'bg-uclaBlue border-transparent active:bg-[#25579e]'
                : 'bg-transparent border-border'
            }`}
            aria-label="Send message"
          >
            <Icon
              name="paperplane"
              size={18}
              className={messageText.trim() ? 'text-white' : 'text-lightSlate'}
            />
          </button>
        </div>
      </div>

    </div>
    <BottomNav />
    </>
  );
}
