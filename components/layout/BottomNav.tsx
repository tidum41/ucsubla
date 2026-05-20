'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '../common/Icon';
import { useMessages } from '@/lib/MessagesContext';

export default function BottomNav() {
  const pathname = usePathname();
  const { conversations } = useMessages();
  const hasUnread = conversations.some(c => (c.unreadCount ?? 0) > 0);

  const navItems = [
    { name: 'Home', icon: 'house', iconActive: 'house', path: '/' },
    { name: 'Saved', icon: 'bookmark', iconActive: 'bookmark', path: '/bookmarks' },
    { name: 'Chat', icon: 'message', iconActive: 'message.fill', path: '/messages' },
    { name: 'Profile', icon: 'person', iconActive: 'person', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-[12px] border-t border-borderLight shadow-elevated z-50">
      <div className="flex items-center justify-between px-6 py-3 pb-safe app-container">
        {navItems.map((item) => {
          const isActive = item.path === '/'
            ? pathname === '/' || pathname.startsWith('/listing/new')
            : pathname === item.path;
          const showUnread = item.path === '/messages' && hasUnread && !isActive;
          return (
            <Link
              key={item.path}
              href={item.path}
              className="flex flex-col items-center justify-center gap-1 min-h-[44px] min-w-[44px]"
            >
              <div className="relative">
                <Icon
                  name={isActive ? item.iconActive : item.icon}
                  size={24}
                  className={isActive ? 'text-uclaBlue' : 'text-lightSlate'}
                  strokeWidth={2}
                />
                {showUnread && (
                  <span className="absolute -top-[3px] -right-[3px] w-[7px] h-[7px] rounded-full bg-uclaBlue" />
                )}
              </div>
              <span
                className={`text-[10px] leading-[15px] font-medium ${
                  isActive ? 'text-uclaBlue' : 'text-lightSlate'
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
