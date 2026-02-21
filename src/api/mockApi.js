// Mock Data
export const FEEDBACK_TAGS = {
  driver: [
    { id: "rash-driving", label: "Rash Driving", category: "driver" },
    { id: "very-polite", label: "Very Polite", category: "driver" },
    { id: "late", label: "Late", category: "driver" },
    { id: "safe-driving", label: "Safe Driving", category: "driver" },
    { id: "professional", label: "Professional", category: "driver" },
    { id: "rude", label: "Rude", category: "driver" },
  ],
  trip: [
    { id: "comfortable", label: "Comfortable", category: "trip" },
    { id: "on-time", label: "On Time", category: "trip" },
    { id: "clean-vehicle", label: "Clean Vehicle", category: "trip" },
    { id: "bumpy-ride", label: "Bumpy Ride", category: "trip" },
    { id: "delayed", label: "Delayed", category: "trip" },
  ],
  app: [
    { id: "slow", label: "Slow", category: "app" },
    { id: "buggy", label: "Buggy", category: "app" },
    { id: "easy-to-use", label: "Easy to Use", category: "app" },
    { id: "confusing", label: "Confusing", category: "app" },
    { id: "helpful", label: "Helpful", category: "app" },
  ],
  marshal: [
    { id: "marshal-helpful", label: "Helpful", category: "marshal" },
    { id: "marshal-rude", label: "Rude", category: "marshal" },
    { id: "marshal-professional", label: "Professional", category: "marshal" },
    { id: "unavailable", label: "Unavailable", category: "marshal" },
  ],
};

const driverNames = [
  "Rajesh Kumar",
  "Amit Singh",
  "Vijay Sharma",
  "Suresh Patel",
  "Ramesh Gupta",
  "Mahesh Reddy",
  "Anil Verma",
  "Prakash Rao",
  "Dinesh Nair",
  "Sunil Joshi",
];

// Generate mock drivers
export const mockDrivers = Array.from({ length: 50 }, (_, i) => {
  const avgScore = 1 + Math.random() * 4;
  const lastWeekScore = 1 + Math.random() * 4;
  const trend = ((avgScore - lastWeekScore) / lastWeekScore) * 100;

  let status = "excellent";
  if (avgScore >= 4.0) status = "excellent";
  else if (avgScore >= 3.0) status = "good";
  else if (avgScore >= 2.5) status = "warning";
  else status = "alert";

  return {
    id: `DRV${String(i + 1).padStart(4, "0")}`,
    name:
      driverNames[i % driverNames.length] +
      (i >= 10 ? ` ${Math.floor(i / 10)}` : ""),
    totalTrips: Math.floor(50 + Math.random() * 500),
    averageScore: parseFloat(avgScore.toFixed(2)),
    lastWeekScore: parseFloat(lastWeekScore.toFixed(2)),
    trend: parseFloat(trend.toFixed(1)),
    status,
  };
});

// Generate mock feedback
export const mockFeedback = Array.from({ length: 200 }, (_, i) => {
  const entityTypes = ["driver", "trip", "app", "marshal"];
  const entityType =
    entityTypes[Math.floor(Math.random() * entityTypes.length)];
  const rating = Math.floor(1 + Math.random() * 5);

  let sentiment;
  if (rating >= 4) sentiment = "positive";
  else if (rating >= 3) sentiment = "neutral";
  else sentiment = "negative";

  const driver = mockDrivers[Math.floor(Math.random() * mockDrivers.length)];
  const tags = FEEDBACK_TAGS[entityType];
  const selectedTags = tags
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(1 + Math.random() * 3))
    .map((t) => t.id);

  return {
    id: `FB${String(i + 1).padStart(6, "0")}`,
    entityType,
    sentiment,
    rating,
    tags: selectedTags,
    text: `Sample feedback text for ${entityType}. This is feedback ${i + 1}.`,
    driverId: entityType === "driver" ? driver.id : undefined,
    driverName: entityType === "driver" ? driver.name : undefined,
    timestamp: new Date(
      Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
    ).toISOString(),
  };
});

// Mock API Functions
export const mockApi = {
  getConfig: async () => {
    await delay(300);
    return {
      driverFeedback: true,
      tripFeedback: true,
      appFeedback: false,
      marshalFeedback: true,
    };
  },

  getDrivers: async () => {
    await delay(500);
    return mockDrivers;
  },

  getFeedback: async () => {
    await delay(500);
    return mockFeedback;
  },

  getDriverDetail: async (driverId) => {
    await delay(400);
    const driver = mockDrivers.find((d) => d.id === driverId);
    if (!driver) throw new Error("Driver not found");

    const driverFeedback = mockFeedback.filter((f) => f.driverId === driverId);

    // Generate sentiment trend (last 30 days)
    const sentimentTrend = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      score: parseFloat((2 + Math.random() * 3).toFixed(2)),
    }));

    // Calculate tag frequency
    const tagCounts = {};
    driverFeedback.forEach((f) => {
      f.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    const tagFrequency = Object.entries(tagCounts)
      .map(([tag, count]) => ({
        tag: FEEDBACK_TAGS.driver.find((t) => t.id === tag)?.label || tag,
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      ...driver,
      feedbackHistory: driverFeedback,
      sentimentTrend,
      tagFrequency,
    };
  },

  getAlerts: async () => {
    await delay(300);
    return mockDrivers
      .filter((d) => d.status === "alert")
      .slice(0, 5)
      .map((d, i) => ({
        id: `ALERT${String(i + 1).padStart(4, "0")}`,
        driverId: d.id,
        driverName: d.name,
        averageScore: d.averageScore,
        timestamp: new Date(
          Date.now() - Math.random() * 24 * 60 * 60 * 1000,
        ).toISOString(),
        read: Math.random() > 0.5,
      }));
  },

  getSentimentSummary: async () => {
    await delay(300);
    const positive = mockFeedback.filter(
      (f) => f.sentiment === "positive",
    ).length;
    const neutral = mockFeedback.filter(
      (f) => f.sentiment === "neutral",
    ).length;
    const negative = mockFeedback.filter(
      (f) => f.sentiment === "negative",
    ).length;
    const total = mockFeedback.length;

    const totalScore = mockFeedback.reduce((sum, f) => sum + f.rating, 0);
    const averageScore = parseFloat((totalScore / total).toFixed(2));

    const driversAboveThreshold = mockDrivers.filter(
      (d) => d.averageScore >= 4.0,
    ).length;
    const driversBelowThreshold = mockDrivers.filter(
      (d) => d.averageScore < 2.5,
    ).length;

    return {
      total,
      positive,
      neutral,
      negative,
      averageScore,
      driversAboveThreshold,
      driversBelowThreshold,
    };
  },

  submitFeedback: async (data) => {
    await delay(800);
    // Simulate success
    console.log("Feedback submitted:", data);
  },
};

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
