export type EntityType = 'driver' | 'trip' | 'app' | 'marshal';

export type SentimentType = 'positive' | 'neutral' | 'negative';

export interface FeatureFlags {
  driverFeedback: boolean;
  tripFeedback: boolean;
  appFeedback: boolean;
  marshalFeedback: boolean;
}

export interface FeedbackTag {
  id: string;
  label: string;
  category: EntityType;
}

export interface FeedbackItem {
  entityType: EntityType;
  rating: number;
  tags: string[];
  text: string;
}

export interface FeedbackSubmission {
  feedbackItems: FeedbackItem[];
  tripId: string;
  driverId?: string;
  timestamp: string;
}

export interface Driver {
  id: string;
  name: string;
  totalTrips: number;
  averageScore: number;
  trend: number;
  lastWeekScore: number;
  status: 'excellent' | 'good' | 'warning' | 'alert';
}

export interface Feedback {
  id: string;
  entityType: EntityType;
  sentiment: SentimentType;
  rating: number;
  tags: string[];
  text: string;
  driverId?: string;
  driverName?: string;
  timestamp: string;
}

export interface DriverDetail extends Driver {
  feedbackHistory: Feedback[];
  sentimentTrend: {
    date: string;
    score: number;
  }[];
  tagFrequency: {
    tag: string;
    count: number;
  }[];
}

export interface Alert {
  id: string;
  driverId: string;
  driverName: string;
  averageScore: number;
  timestamp: string;
  read: boolean;
}

export interface SentimentSummary {
  total: number;
  positive: number;
  neutral: number;
  negative: number;
  averageScore: number;
  driversAboveThreshold: number;
  driversBelowThreshold: number;
}

export type DateRange = 'today' | '7d' | '30d';

export interface FilterState {
  entityType: EntityType | 'all';
  sentiment: SentimentType | 'all';
  driverId: string;
  dateRange: DateRange;
  searchText: string;
  scoreRange: [number, number];
}
