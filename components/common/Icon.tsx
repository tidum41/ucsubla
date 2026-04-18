import React from 'react';
import {
  Search,
  SlidersHorizontal,
  Home,
  Bookmark,
  MessageCircle,
  User,
  Users,
  UsersRound,
  MapPin,
  BadgeCheck,
  Bed,
  ShowerHead,
  Calendar,
  Plus,
  GraduationCap,
  Forward,
  X,
  Armchair,
  ChevronLeft,
  ChevronRight,
  Send,
  Wifi,
  Wind,
  Refrigerator,
  Microwave,
  Waves,
  WashingMachine,
  Dumbbell,
  Flame,
  Accessibility,
  Car,
  Trees,
  Building2,
  type LucideIcon,
} from 'lucide-react';

// Icon name mapping (SF Symbols names to Lucide icons)
const iconMap: Record<string, LucideIcon> = {
  search: Search,
  'slider.horizontal.3': SlidersHorizontal,
  house: Home,
  bookmark: Bookmark,
  message: MessageCircle,
  'message.fill': MessageCircle,
  person: User,
  'person.2': Users,
  'person.3': UsersRound,
  'location.fill': MapPin,
  'checkmark.seal.fill': BadgeCheck,
  'bed.double.fill': Bed,
  'shower.fill': ShowerHead,
  calendar: Calendar,
  plus: Plus,
  'graduationcap.fill': GraduationCap,
  'square.and.arrow.up': Forward,
  xmark: X,
  'chair.fill': Armchair,
  'chevron.left': ChevronLeft,
  'chevron.right': ChevronRight,
  paperplane: Send,
  // Amenity icons
  wifi: Wifi,
  wind: Wind,
  refrigerator: Refrigerator,
  microwave: Microwave,
  waves: Waves,
  'washing-machine': WashingMachine,
  dumbbell: Dumbbell,
  flame: Flame,
  accessibility: Accessibility,
  car: Car,
  trees: Trees,
  building: Building2,
};

export interface IconProps {
  name: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
  fill?: string;
}

export default function Icon({ name, size = 24, className = '', strokeWidth = 2, fill }: IconProps) {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in icon map`);
    return null;
  }

  return (
    <IconComponent
      size={size}
      className={className}
      strokeWidth={strokeWidth}
      fill={fill}
    />
  );
}
