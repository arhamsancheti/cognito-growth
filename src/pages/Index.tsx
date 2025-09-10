import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Target, Headphones, Trophy, BarChart3, Users, Settings } from "lucide-react";
import AssessmentInterface from "@/components/AssessmentInterface";
import LearningDashboard from "@/components/LearningDashboard";
import PracticeMode from "@/components/PracticeMode";

const Index = () => {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'assessment' | 'practice'>('dashboard');
  const [studentProfile] = useState({
    name: "Alex Chen",
    grade: "8th Grade",
    overallScore: 76,
    fundamentals: {
      listening: 85,
      grasping: 72,
      retention: 68,
      application: 80
    },
    recentAssessments: [
      { subject: "Mathematics", topic: "Time & Distance", score: 85, date: "2024-01-15" },
      { subject: "Science", topic: "Forces & Motion", score: 72, date: "2024-01-12" },
      { subject: "Mathematics", topic: "Algebra", score: 90, date: "2024-01-10" }
    ]
  });

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'assessment':
        return <AssessmentInterface onBack={() => setActiveSection('dashboard')} />;
      case 'practice':
        return <PracticeMode onBack={() => setActiveSection('dashboard')} />;
      default:
        return <LearningDashboard student={studentProfile} onStartAssessment={() => setActiveSection('assessment')} onStartPractice={() => setActiveSection('practice')} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Brain className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-semibold">AdaptiLearn</h1>
                <p className="text-sm text-muted-foreground">Adaptive AI Learning Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant={activeSection === 'dashboard' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveSection('dashboard')}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant={activeSection === 'assessment' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveSection('assessment')}
              >
                <Target className="h-4 w-4 mr-2" />
                Assessment
              </Button>
              <Button
                variant={activeSection === 'practice' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveSection('practice')}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Practice
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {renderActiveSection()}
      </main>
    </div>
  );
};

export default Index;