import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { mockApi } from './mockApi';
import { FeedbackSubmission } from '../types';
import { useAppStore } from '../stores/appStore';

export const useConfig = () => {
  return useQuery({
    queryKey: ['config'],
    queryFn: mockApi.getConfig,
  });
};

export const useDrivers = () => {
  return useQuery({
    queryKey: ['drivers'],
    queryFn: mockApi.getDrivers,
  });
};

export const useFeedback = () => {
  return useQuery({
    queryKey: ['feedback'],
    queryFn: mockApi.getFeedback,
    refetchInterval: 30000, // Refetch every 30 seconds for "real-time" updates
  });
};

export const useDriverDetail = (driverId: string) => {
  return useQuery({
    queryKey: ['driver', driverId],
    queryFn: () => mockApi.getDriverDetail(driverId),
    enabled: !!driverId,
  });
};

export const useAlerts = () => {
  return useQuery({
    queryKey: ['alerts'],
    queryFn: mockApi.getAlerts,
    refetchInterval: 60000, // Refetch every minute
  });
};

export const useSentimentSummary = () => {
  return useQuery({
    queryKey: ['sentimentSummary'],
    queryFn: mockApi.getSentimentSummary,
    refetchInterval: 30000,
  });
};

export const useSubmitFeedback = () => {
  const queryClient = useQueryClient();
  const addToast = useAppStore((state) => state.addToast);

  return useMutation({
    mutationFn: (data: FeedbackSubmission) => mockApi.submitFeedback(data),
    onSuccess: () => {
      addToast('Feedback submitted successfully!', 'success');
      queryClient.invalidateQueries({ queryKey: ['feedback'] });
      queryClient.invalidateQueries({ queryKey: ['drivers'] });
      queryClient.invalidateQueries({ queryKey: ['sentimentSummary'] });
    },
    onError: () => {
      addToast('Failed to submit feedback. Please try again.', 'error');
    },
  });
};
