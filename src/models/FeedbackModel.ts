// Model - Data structure and business logic
export interface Feedback {
  id: string;
  studentName: string;
  studentEmail: string;
  category: 'course' | 'teacher' | 'facility';
  subject: string;
  rating: number;
  comments: string;
  timestamp: string;
  semester: string;
}

export interface FeedbackStats {
  totalFeedbacks: number;
  averageRating: number;
  categoryBreakdown: Record<string, number>;
  ratingDistribution: Record<number, number>;
  recentFeedbacks: Feedback[];
}

export class FeedbackModel {
  private static readonly STORAGE_KEY = 'student_feedback_data';

  static getAllFeedbacks(): Feedback[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : this.getInitialData();
  }

  static saveFeedback(feedback: Omit<Feedback, 'id' | 'timestamp'>): Feedback {
    const newFeedback: Feedback = {
      ...feedback,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };

    const existingFeedbacks = this.getAllFeedbacks();
    const updatedFeedbacks = [...existingFeedbacks, newFeedback];
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedFeedbacks));
    return newFeedback;
  }

  static getStats(): FeedbackStats {
    const feedbacks = this.getAllFeedbacks();
    
    const totalFeedbacks = feedbacks.length;
    const averageRating = feedbacks.length > 0 
      ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length 
      : 0;

    const categoryBreakdown = feedbacks.reduce((acc, f) => {
      acc[f.category] = (acc[f.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const ratingDistribution = feedbacks.reduce((acc, f) => {
      acc[f.rating] = (acc[f.rating] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

    const recentFeedbacks = feedbacks
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 5);

    return {
      totalFeedbacks,
      averageRating,
      categoryBreakdown,
      ratingDistribution,
      recentFeedbacks,
    };
  }

  private static getInitialData(): Feedback[] {
    const initialData: Feedback[] = [
      {
        id: '1',
        studentName: 'Alex Johnson',
        studentEmail: 'alex.johnson@university.edu',
        category: 'course',
        subject: 'Computer Science Fundamentals',
        rating: 5,
        comments: 'Excellent course! The professor explained complex concepts very clearly.',
        timestamp: '2024-01-15T10:30:00Z',
        semester: 'Fall 2024'
      },
      {
        id: '2',
        studentName: 'Sarah Chen',
        studentEmail: 'sarah.chen@university.edu',
        category: 'teacher',
        subject: 'Dr. Smith - Advanced Mathematics',
        rating: 4,
        comments: 'Great teaching style, but could use more office hours.',
        timestamp: '2024-01-14T14:20:00Z',
        semester: 'Fall 2024'
      },
      {
        id: '3',
        studentName: 'Michael Brown',
        studentEmail: 'michael.brown@university.edu',
        category: 'facility',
        subject: 'Engineering Lab Equipment',
        rating: 3,
        comments: 'Lab equipment is decent but some machines need maintenance.',
        timestamp: '2024-01-13T09:15:00Z',
        semester: 'Fall 2024'
      },
      {
        id: '4',
        studentName: 'Emma Davis',
        studentEmail: 'emma.davis@university.edu',
        category: 'course',
        subject: 'Data Structures and Algorithms',
        rating: 5,
        comments: 'Challenging but rewarding course. Assignments were well-designed.',
        timestamp: '2024-01-12T16:45:00Z',
        semester: 'Fall 2024'
      },
      {
        id: '5',
        studentName: 'James Wilson',
        studentEmail: 'james.wilson@university.edu',
        category: 'facility',
        subject: 'Library Study Spaces',
        rating: 4,
        comments: 'Good study environment, could use more power outlets.',
        timestamp: '2024-01-11T11:30:00Z',
        semester: 'Fall 2024'
      }
    ];

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
}