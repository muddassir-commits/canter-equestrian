import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  rating: number;
  max?: number;
  size?: number;
  className?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  max = 5,
  size = 16,
  className,
}) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.25 && rating % 1 <= 0.75;
  const roundFull = rating % 1 > 0.75;
  const finalFullStars = roundFull ? fullStars + 1 : fullStars;

  for (let i = 1; i <= max; i++) {
    if (i <= finalFullStars) {
      stars.push(
        <Star
          key={i}
          size={size}
          fill="var(--color-gold)"
          stroke="var(--color-gold)"
          className="star-full"
        />
      );
    } else if (i === finalFullStars + 1 && hasHalfStar && !roundFull) {
      stars.push(
        <div key={i} style={{ position: 'relative', display: 'inline-block', width: size, height: size }}>
          <Star
            size={size}
            stroke="var(--color-cream-dark)"
            fill="transparent"
            style={{ position: 'absolute', top: 0, left: 0 }}
          />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '50%', overflow: 'hidden' }}>
            <Star
              size={size}
              fill="var(--color-gold)"
              stroke="var(--color-gold)"
            />
          </div>
        </div>
      );
    } else {
      stars.push(
        <Star
          key={i}
          size={size}
          stroke="var(--color-cream-dark)"
          fill="transparent"
        />
      );
    }
  }

  return (
    <div className={cn("star-rating", className)} style={{ display: 'inline-flex', gap: '3px', alignItems: 'center' }}>
      {stars}
    </div>
  );
};
