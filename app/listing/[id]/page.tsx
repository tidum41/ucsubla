'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Bookmark as BookmarkIcon } from 'lucide-react';
import Icon from '@/components/common/Icon';
import ImageCarousel from '@/components/listings/ImageCarousel';
import ReviewCard from '@/components/reviews/ReviewCard';
import BottomNav from '@/components/layout/BottomNav';
import { mockListings, mockReviews, mockUser } from '@/lib/mockData';
import { useBookmarks } from '@/lib/BookmarkContext';
import { formatPrice, formatDateRange, formatTimestamp } from '@/lib/utils';
import type { Listing } from '@/lib/types';

export default function ListingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const listingId = params.id as string;
  const { bookmarkedIds, toggleBookmark } = useBookmarks();

  const [listing, setListing] = useState<Listing | null>(null);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [composeText, setComposeText] = useState('');
  const [sendSuccess, setSendSuccess] = useState(false);
  const [modalDragY, setModalDragY] = useState(0);
  const [modalDragStart, setModalDragStart] = useState<number | null>(null);
  const COMPOSE_MAX = 500;

  const handleBack = () => router.back();

  useEffect(() => {
    let foundListing = mockListings.find((l) => l.id === listingId);
    if (!foundListing) {
      const userListings = JSON.parse(localStorage.getItem('user-listings') || '[]');
      foundListing = userListings.find((l: Listing) => l.id === listingId);
    }
    setListing(foundListing || null);
  }, [listingId]);

  const reviews = mockReviews.filter((r) => r.listingId === listingId);
  const isBookmarked = bookmarkedIds.includes(listingId);

  const handleShare = async () => {
    if (!listing) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: listing.title,
          text: `${listing.title} · ${formatPrice(listing.price)}/mo`,
          url: window.location.href,
        });
      } catch {
        // User cancelled
      }
    }
  };

  const handleSendMessage = () => {
    if (!composeText.trim() || !listing) return;

    const convId = `conv-${Date.now()}`;
    const msgId = `msg-${Date.now()}`;
    const now = new Date().toISOString();

    const newMessage = {
      id: msgId,
      conversationId: convId,
      senderId: mockUser.id,
      text: composeText.trim(),
      timestamp: now,
      read: true,
    };

    const newConversation = {
      id: convId,
      listingId: listing.id,
      participants: [mockUser.id, 'peter-parker'],
      lastMessage: newMessage,
      unreadCount: 0,
    };

    const existingConvos = JSON.parse(localStorage.getItem('uc-conversations') || '[]');
    const existingMsgs = JSON.parse(localStorage.getItem('uc-messages') || '[]');
    localStorage.setItem('uc-chat-version', '6'); // prevent messages page from wiping this on first visit
    localStorage.setItem('uc-conversations', JSON.stringify([...existingConvos, newConversation]));
    localStorage.setItem('uc-messages', JSON.stringify([...existingMsgs, newMessage]));

    setSendSuccess(true);
    setTimeout(() => {
      setShowComposeModal(false);
      setComposeText('');
      setSendSuccess(false);
      router.push('/messages');
    }, 900);
  };

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-body text-slateGray">Listing not found</p>
      </div>
    );
  }

  const amenityList = [
    { key: 'roommatePreference', label: listing.roommatePreference.charAt(0).toUpperCase() + listing.roommatePreference.slice(1), show: true },
    { key: 'furnished', label: 'Furnished', show: listing.amenities.furnished },
    { key: 'internet', label: 'Internet', show: listing.amenities.internet },
    { key: 'ac', label: 'AC', show: listing.amenities.ac },
    { key: 'fridge', label: 'Fridge', show: listing.amenities.fridge },
    { key: 'microwave', label: 'Microwave', show: listing.amenities.microwave },
    { key: 'laundryOnSite', label: 'On-Site Laundry', show: listing.amenities.laundryOnSite },
    { key: 'laundryInUnit', label: 'In-Unit Laundry', show: listing.amenities.laundryInUnit },
    { key: 'fitnessCenter', label: 'Fitness Center', show: listing.amenities.fitnessCenter },
    { key: 'parking', label: listing.amenities.parking ? `${listing.amenities.parking.charAt(0).toUpperCase() + listing.amenities.parking.slice(1)} Parking` : '', show: !!listing.amenities.parking && listing.amenities.parking !== 'street' },
  ].filter((item) => item.show);

  return (
    <>
    <div className={`min-h-screen pb-20 bg-background app-container transition-[filter] duration-200 ${showComposeModal ? 'blur-sm' : ''}`}>
      {/* Top Navigation */}
      <div className="blurHeaderWithNav app-container">
        <div className="blurHeaderWithNavContent">
          <button
            onClick={handleBack}
            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <Icon name="chevron.left" size={24} className="text-darkSlate" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Share listing"
            >
              <Icon name="square.and.arrow.up" size={22} className="text-darkSlate" strokeWidth={1.5} />
            </button>
            <button
              onClick={() => toggleBookmark(listingId)}
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            >
              <BookmarkIcon
                size={22}
                className={isBookmarked ? 'text-uclaBlue' : 'text-darkSlate'}
                fill={isBookmarked ? 'currentColor' : 'none'}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for fixed nav */}
      <div className="h-[60px]" style={{ marginTop: 'env(safe-area-inset-top)' }} />

      <ImageCarousel images={listing.images} alt={listing.title} />

      <div className="px-5 pt-4 pb-24">
        <div className="mb-6">
          <h1 className="text-[20px] leading-[28px] font-medium text-darkSlate mb-2">
            {listing.title}
          </h1>
          <div className="flex items-baseline gap-2">
            <span className="text-[20px] leading-7 font-medium text-uclaBlue">
              {formatPrice(listing.price)}
            </span>
            <span className="text-body text-slateGray">/mo</span>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-0.5">
            <Icon name="location.fill" size={16} className="text-slateGray" />
            <span className="text-body text-slateGray">
              {listing.address} • {listing.distanceFromCampus} miles from campus
            </span>
          </div>
          {listing.verifiedUCLA && (
            <div className="flex items-center gap-0.5">
              <Icon name="checkmark.seal.fill" size={16} className="text-slateGray" />
              <span className="text-body text-slateGray">Verified UCLA Student</span>
            </div>
          )}
          <p className="text-small text-lightSlate">Posted {formatTimestamp(listing.createdAt)}</p>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-6">
          <div className="bg-tagBg border border-borderLight rounded-md px-3 py-[7px] flex items-center gap-1.5">
            <Icon name="bed.double.fill" size={18} className="text-uclaBlue" />
            <span className="text-body text-darkSlate capitalize" style={{ fontWeight: 440 }}>
              {listing.roomType === 'triple+' ? 'Triple+' : listing.roomType}
            </span>
          </div>
          <div className="bg-tagBg border border-borderLight rounded-md px-3 py-[7px] flex items-center gap-1.5">
            <Icon name="shower.fill" size={18} className="text-uclaBlue" />
            <span className="text-body text-darkSlate capitalize" style={{ fontWeight: 440 }}>
              {listing.bathroomType}
            </span>
          </div>
          <div className="bg-tagBg border border-borderLight rounded-md px-3 py-[7px] flex items-center gap-1.5">
            <Icon name="calendar" size={18} className="text-uclaBlue" />
            <span className="text-body text-darkSlate" style={{ fontWeight: 440 }}>
              {formatDateRange(listing.moveInDate, listing.moveOutDate)}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-h2 font-semibold text-darkSlate mb-4">The Space</h2>
          <div className="flex flex-wrap gap-2">
            {amenityList.map((amenity) => (
              <div key={amenity.key} className="bg-white border border-gray-300 rounded-xl px-4 py-2.5 flex items-center gap-2">
                <span className="text-body text-darkSlate">{amenity.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-h2 font-semibold text-darkSlate mb-3">About</h2>
          <p className="text-body text-slateGray leading-relaxed">{listing.description}</p>
        </div>

        {reviews.length > 0 && (
          <div>
            <h2 className="text-h2 font-semibold text-darkSlate mb-4">Community Insights</h2>
            <div className="space-y-3">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Message Button */}
      <div className="fixed bottom-20 left-0 right-0 px-6 py-4 app-container">
        <button
          onClick={() => setShowComposeModal(true)}
          className="w-full btn-primary shadow-elevated flex items-center justify-center gap-2"
        >
          <Icon name="paperplane" size={18} className="text-white" />
          <span>Message</span>
        </button>
      </div>

      <BottomNav />
    </div>

    {/* Compose Modal — floating window */}
    {showComposeModal && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center px-5"
        style={{ background: 'rgba(0,0,0,0.4)' }}
        onClick={(e) => { if (e.target === e.currentTarget) { setShowComposeModal(false); setComposeText(''); } }}
      >
        <div
          className="w-full max-w-[390px] bg-white rounded-2xl shadow-elevated overflow-hidden transition-transform duration-150"
          style={{ transform: `translateY(${modalDragY}px)` }}
          onTouchStart={(e) => setModalDragStart(e.touches[0].clientY)}
          onTouchMove={(e) => {
            if (modalDragStart === null) return;
            const delta = e.touches[0].clientY - modalDragStart;
            if (delta > 0) setModalDragY(delta);
          }}
          onTouchEnd={() => {
            if (modalDragY > 80) { setShowComposeModal(false); setComposeText(''); }
            setModalDragY(0);
            setModalDragStart(null);
          }}
        >
          {/* Header */}
          <div className="px-5 pt-5 pb-4 border-b border-borderLight">
            <div className="flex items-center gap-3">
              <img
                src="/peter-parker.webp"
                alt="Peter Parker"
                className="w-10 h-10 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-h3 text-darkSlate font-medium">Peter Parker</p>
                <p className="text-small text-slateGray truncate">{listing.address}</p>
              </div>
              <button
                onClick={() => { setShowComposeModal(false); setComposeText(''); }}
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Icon name="xmark" size={18} className="text-slateGray" />
              </button>
            </div>
          </div>

          {/* Compose area */}
          <div className="px-5 py-4">
            <textarea
              autoFocus
              value={composeText}
              onChange={(e) => setComposeText(e.target.value.slice(0, COMPOSE_MAX))}
              onKeyDown={(e) => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSendMessage(); }}
              placeholder="Ask for more info..."
              rows={4}
              className="w-full bg-[#F8FAFC] border border-borderLight rounded-xl px-4 py-3 text-darkSlate placeholder:text-lightSlate focus:outline-none focus:ring-1 focus:ring-uclaBlue resize-none"
              style={{ fontSize: '16px', lineHeight: '1.5' }}
            />
            <p className="text-right text-small text-lightSlate mt-1">
              {composeText.length} / {COMPOSE_MAX}
            </p>
          </div>

          {/* Actions */}
          <div className="px-5 pb-5 flex gap-3">
            <button
              onClick={() => { setShowComposeModal(false); setComposeText(''); }}
              className="flex-1 py-3 rounded-[18px] border border-gray-200 text-body text-slateGray font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSendMessage}
              disabled={!composeText.trim() || sendSuccess}
              className="flex-1 py-3 rounded-[18px] bg-uclaBlue text-white text-body font-medium flex items-center justify-center gap-2 disabled:opacity-40 hover:bg-[#25579e] transition-colors"
            >
              {sendSuccess ? (
                <>
                  <Icon name="checkmark.seal.fill" size={16} className="text-white" />
                  <span>Sent!</span>
                </>
              ) : (
                <>
                  <Icon name="paperplane" size={16} className="text-white" />
                  <span>Send</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}
