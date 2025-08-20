import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Send, User, Mail, BookOpen } from 'lucide-react';
import { FeedbackController } from '../controllers/FeedbackController';
import { useToast } from '@/hooks/use-toast';

interface FeedbackFormProps {
  onSubmitSuccess: () => void;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmitSuccess }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    studentName: '',
    studentEmail: '',
    category: '' as 'course' | 'teacher' | 'facility' | '',
    subject: '',
    rating: 0,
    comments: '',
    semester: 'Fall 2024'
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.category || formData.rating === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields including rating.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await FeedbackController.submitFeedback(formData as any);
      
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for your valuable feedback.",
        variant: "default"
      });

      // Reset form
      setFormData({
        studentName: '',
        studentEmail: '',
        category: '',
        subject: '',
        rating: 0,
        comments: '',
        semester: 'Fall 2024'
      });

      onSubmitSuccess();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-medium">
      <CardHeader className="bg-gradient-academic text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Send className="h-5 w-5" />
          Submit Your Feedback
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="studentName" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Student Name *
              </Label>
              <Input
                id="studentName"
                value={formData.studentName}
                onChange={(e) => handleInputChange('studentName', e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="studentEmail" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address *
              </Label>
              <Input
                id="studentEmail"
                type="email"
                value={formData.studentEmail}
                onChange={(e) => handleInputChange('studentEmail', e.target.value)}
                placeholder="your.email@university.edu"
                required
              />
            </div>
          </div>

          {/* Feedback Category */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Feedback Category *
            </Label>
            <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select feedback category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="course">Course Content & Structure</SelectItem>
                <SelectItem value="teacher">Teaching & Instruction</SelectItem>
                <SelectItem value="facility">Facilities & Resources</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label htmlFor="subject">
              Subject/Course Name *
            </Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              placeholder="e.g., Computer Science 101, Dr. Smith's Teaching Method, Library Resources"
              required
            />
          </div>

          {/* Rating */}
          <div className="space-y-2">
            <Label>Rating *</Label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingClick(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= formData.rating
                        ? 'text-warning fill-warning'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-sm text-muted-foreground">
                {formData.rating > 0 && `${formData.rating}/5`}
              </span>
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-2">
            <Label htmlFor="comments">
              Additional Comments
            </Label>
            <Textarea
              id="comments"
              value={formData.comments}
              onChange={(e) => handleInputChange('comments', e.target.value)}
              placeholder="Share your detailed feedback here..."
              rows={4}
            />
          </div>

          {/* Semester */}
          <div className="space-y-2">
            <Label>Semester</Label>
            <Select value={formData.semester} onValueChange={(value) => handleInputChange('semester', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Fall 2024">Fall 2024</SelectItem>
                <SelectItem value="Spring 2024">Spring 2024</SelectItem>
                <SelectItem value="Summer 2024">Summer 2024</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-gradient-academic hover:opacity-90 transition-opacity"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};