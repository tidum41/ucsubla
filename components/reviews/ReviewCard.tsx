'use client';

import { useState } from 'react';
import { formatTimestamp } from '@/lib/utils';
import type { Review } from '@/lib/types';

interface ReviewCardProps {
  review: Review;
}

function RedditLogo() {
  return (
    <img src="/icons/Reddit_Logo.png" alt="Reddit" width={24} height={24} className="rounded-full" />
  );
}

function BruinwalkLogo() {
  return (
    <img src="/icons/favicon.png" alt="Bruinwalk" width={22} height={22} />
  );
}

function YelpLogo() {
  return (
    <img src="/icons/Yelp-Logo.png" alt="Yelp" width={26} height={26} />
  );
}

function SourceLogo({ source }: { source: Review['source'] }) {
  if (source === 'reddit') return <RedditLogo />;
  if (source === 'yelp') return <YelpLogo />;
  return <BruinwalkLogo />;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 100;
  const shouldTruncate = review.text.length > maxLength;
  const displayText = isExpanded || !shouldTruncate
    ? review.text
    : `${review.text.substring(0, maxLength)}...`;

  const sourceLabel =
    review.source === 'reddit' ? 'Reddit' :
    review.source === 'yelp' ? 'Yelp' :
    'Bruinwalk';

  return (
    <div className="card shadow-minimal p-4">
      {/* Source header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <SourceLogo source={review.source} />
          <div className="flex flex-col">
            <span className="text-small text-darkSlate font-medium">
              {review.sourceName}
            </span>
            <a
              href={review.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-tiny text-uclaBlue hover:underline"
            >
              View on {sourceLabel}
            </a>
          </div>
        </div>
        <span className="text-small text-slateGray">
          {formatTimestamp(review.timestamp)}
        </span>
      </div>

      {/* Review text */}
      <p className="text-body text-slateGray leading-relaxed">
        &quot;{displayText}&quot;
      </p>

      {/* Read more button */}
      {shouldTruncate && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-small text-uclaBlue font-medium mt-2 hover:underline"
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
}
