// Type definitions converted to JSDoc comments for reference

/**
 * @typedef {'driver' | 'trip' | 'app' | 'marshal'} EntityType
 */

/**
 * @typedef {'positive' | 'neutral' | 'negative'} SentimentType
 */

/**
 * @typedef {Object} FeatureFlags
 * @property {boolean} driverFeedback
 * @property {boolean} tripFeedback
 * @property {boolean} appFeedback
 * @property {boolean} marshalFeedback
 */

/**
 * @typedef {Object} FeedbackTag
 * @property {string} id
 * @property {string} label
 * @property {EntityType} category
 */

/**
 * @typedef {Object} FeedbackItem
 * @property {EntityType} entityType
 * @property {number} rating
 * @property {string[]} tags
 * @property {string} text
 */

/**
 * @typedef {Object} FeedbackSubmission
 * @property {FeedbackItem[]} feedbackItems
 * @property {string} tripId
 * @property {string} [driverId]
 * @property {string} timestamp
 */

/**
 * @typedef {Object} Driver
 * @property {string} id
 * @property {string} name
 * @property {number} totalTrips
 * @property {number} averageScore
 * @property {number} trend
 * @property {number} lastWeekScore
 * @property {'excellent' | 'good' | 'warning' | 'alert'} status
 */

/**
 * @typedef {Object} Feedback
 * @property {string} id
 * @property {EntityType} entityType
 * @property {SentimentType} sentiment
 * @property {number} rating
 * @property {string[]} tags
 * @property {string} text
 * @property {string} [driverId]
 * @property {string} [driverName]
 * @property {string} timestamp
 */

/**
 * @typedef {Object} DriverDetail
 * @property {string} id
 * @property {string} name
 * @property {number} totalTrips
 * @property {number} averageScore
 * @property {number} trend
 * @property {number} lastWeekScore
 * @property {'excellent' | 'good' | 'warning' | 'alert'} status
 * @property {Feedback[]} feedbackHistory
 * @property {Array<{date: string, score: number}>} sentimentTrend
 * @property {Array<{tag: string, count: number}>} tagFrequency
 */

/**
 * @typedef {Object} Alert
 * @property {string} id
 * @property {string} driverId
 * @property {string} driverName
 * @property {number} averageScore
 * @property {string} timestamp
 * @property {boolean} read
 */

/**
 * @typedef {Object} SentimentSummary
 * @property {number} total
 * @property {number} positive
 * @property {number} neutral
 * @property {number} negative
 * @property {number} averageScore
 * @property {number} driversAboveThreshold
 * @property {number} driversBelowThreshold
 */

/**
 * @typedef {'today' | '7d' | '30d'} DateRange
 */

/**
 * @typedef {Object} FilterState
 * @property {EntityType | 'all'} entityType
 * @property {SentimentType | 'all'} sentiment
 * @property {string} driverId
 * @property {DateRange} dateRange
 * @property {string} searchText
 * @property {[number, number]} scoreRange
 */

export {};
