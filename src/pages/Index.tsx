import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FeedbackForm } from '@/components/FeedbackForm';
import { Dashboard } from '@/components/Dashboard';
import { 
  BarChart3, 
  MessageSquareText, 
  GraduationCap, 
  Users, 
  Star,
  TrendingUp
} from 'lucide-react';

const Index = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleFeedbackSubmit = () => {
    setRefreshTrigger(prev => prev + 1);
    setActiveTab('dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="bg-card shadow-soft border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-academic rounded-lg">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Student Voice</h1>
                <p className="text-sm text-muted-foreground">University Feedback System</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="hidden sm:flex">
                MVC Architecture
              </Badge>
              <Badge variant="outline" className="hidden sm:flex">
                React.js
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Share Your Academic Experience
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Help us improve education quality by sharing your feedback on courses, teaching methods, and campus facilities. Your voice matters!
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold text-primary">1,247</p>
              <p className="text-sm text-muted-foreground">Students</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                <MessageSquareText className="h-6 w-6 text-accent" />
              </div>
              <p className="text-2xl font-bold text-accent">856</p>
              <p className="text-sm text-muted-foreground">Feedback</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-6 w-6 text-warning" />
              </div>
              <p className="text-2xl font-bold text-warning">4.2</p>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </CardContent>
          </Card>
          <Card className="text-center shadow-soft">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <p className="text-2xl font-bold text-success">+23%</p>
              <p className="text-sm text-muted-foreground">This Month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex items-center gap-2">
              <MessageSquareText className="h-4 w-4" />
              Submit Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-0">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Feedback Analytics Dashboard
                </h3>
                <p className="text-muted-foreground">
                  Real-time insights from student feedback across all categories
                </p>
              </div>
              <Dashboard refreshTrigger={refreshTrigger} />
            </div>
          </TabsContent>

          <TabsContent value="feedback" className="mt-0">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Submit Your Feedback
                </h3>
                <p className="text-muted-foreground">
                  Share your thoughts about courses, teachers, or campus facilities
                </p>
              </div>
              <FeedbackForm onSubmitSuccess={handleFeedbackSubmit} />
            </div>
          </TabsContent>
        </Tabs>

        {/* Features Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-lg">
                <BarChart3 className="h-5 w-5 text-primary" />
                Real-time Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                View live feedback data with interactive charts and comprehensive analytics dashboard.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-lg">
                <MessageSquareText className="h-5 w-5 text-accent" />
                Easy Submission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Simple, intuitive forms for submitting feedback across multiple categories.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-success" />
                Trend Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Track feedback trends over time to identify patterns and improvements.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>Student Voice - University Feedback System | Built with React.js MVC Architecture</p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <Badge variant="outline" className="text-xs">React.js</Badge>
              <Badge variant="outline" className="text-xs">Chart.js</Badge>
              <Badge variant="outline" className="text-xs">localStorage</Badge>
              <Badge variant="outline" className="text-xs">MVC Pattern</Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;