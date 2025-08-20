// Controller - Business logic and state management
import { FeedbackModel, Feedback, FeedbackStats } from '../models/FeedbackModel';

export class FeedbackController {
  static submitFeedback(feedbackData: {
    studentName: string;
    studentEmail: string;
    category: 'course' | 'teacher' | 'facility';
    subject: string;
    rating: number;
    comments: string;
    semester: string;
  }): Promise<Feedback> {
    return new Promise((resolve, reject) => {
      try {
        // Validate input data
        if (!feedbackData.studentName.trim()) {
          throw new Error('Student name is required');
        }
        if (!feedbackData.studentEmail.trim()) {
          throw new Error('Student email is required');
        }
        if (!feedbackData.subject.trim()) {
          throw new Error('Subject is required');
        }
        if (feedbackData.rating < 1 || feedbackData.rating > 5) {
          throw new Error('Rating must be between 1 and 5');
        }

        // Save feedback
        const savedFeedback = FeedbackModel.saveFeedback(feedbackData);
        
        // Simulate async operation
        setTimeout(() => {
          resolve(savedFeedback);
        }, 500);
        
      } catch (error) {
        reject(error);
      }
    });
  }

  static getFeedbackStats(): Promise<FeedbackStats> {
    return new Promise((resolve) => {
      // Simulate async operation
      setTimeout(() => {
        const stats = FeedbackModel.getStats();
        resolve(stats);
      }, 300);
    });
  }

  static getAllFeedbacks(): Promise<Feedback[]> {
    return new Promise((resolve) => {
      // Simulate async operation
      setTimeout(() => {
        const feedbacks = FeedbackModel.getAllFeedbacks();
        resolve(feedbacks);
      }, 200);
    });
  }

  static getChartData() {
    const stats = FeedbackModel.getStats();
    
    // Category breakdown chart data
    const categoryData = Object.entries(stats.categoryBreakdown).map(([category, count]) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: count,
      percentage: Math.round((count / stats.totalFeedbacks) * 100)
    }));

    // Rating distribution chart data
    const ratingData = Array.from({ length: 5 }, (_, i) => ({
      rating: i + 1,
      count: stats.ratingDistribution[i + 1] || 0,
      percentage: Math.round(((stats.ratingDistribution[i + 1] || 0) / stats.totalFeedbacks) * 100)
    }));

    // Recent feedback trends (last 7 days)
    const feedbacks = FeedbackModel.getAllFeedbacks();
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const trendData = last7Days.map(date => {
      const dayFeedbacks = feedbacks.filter(f => 
        f.timestamp.split('T')[0] === date
      );
      return {
        date: new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        count: dayFeedbacks.length,
        averageRating: dayFeedbacks.length > 0 
          ? dayFeedbacks.reduce((sum, f) => sum + f.rating, 0) / dayFeedbacks.length 
          : 0
      };
    });

    return {
      categoryData,
      ratingData,
      trendData,
      stats
    };
  }
}