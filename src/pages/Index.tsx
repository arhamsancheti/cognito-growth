import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Brain, Target, Headphones, Trophy, BarChart3, Users, Settings, Calendar, Award } from "lucide-react";
import AssessmentInterface from "@/components/AssessmentInterface";
import LearningDashboard from "@/components/LearningDashboard";
import PracticeMode from "@/components/PracticeMode";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import TeacherDashboard from "@/components/TeacherDashboard";
import StudentSettings from "@/components/StudentSettings";
import StudyPlan from "@/components/StudyPlan";

const Index = () => {
  const [activeSection, setActiveSection] = useState<'dashboard' | 'assessment' | 'practice' | 'analytics' | 'teacher' | 'settings' | 'studyplan'>('dashboard');
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
      case 'analytics':
        return <AnalyticsDashboard onBack={() => setActiveSection('dashboard')} />;
      case 'teacher':
        return <TeacherDashboard onBack={() => setActiveSection('dashboard')} />;
      case 'settings':
        return <StudentSettings onBack={() => setActiveSection('dashboard')} />;
      case 'studyplan':
        return <StudyPlan onBack={() => setActiveSection('dashboard')} />;
      default:
        return <LearningDashboard student={studentProfile} onStartAssessment={() => setActiveSection('assessment')} onStartPractice={() => setActiveSection('practice')} />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-mesh opacity-40"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl float-animation"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-success/10 rounded-full blur-3xl float-animation" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-warning/10 rounded-full blur-3xl float-animation" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Header */}
      <header className="relative border-b backdrop-blur-lg glass-card border-0 rounded-none">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl btn-3d bg-gradient-to-br from-primary to-primary-hover">
                <Brain className="h-7 w-7 text-white" />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/20 to-transparent"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">AdaptiLearn AI</h1>
                <p className="text-sm text-muted-foreground font-medium">Next-Generation Adaptive Learning</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 stagger-children">
              <Button
                variant={activeSection === 'dashboard' ? 'default' : 'outline'}
                className={`btn-3d morph-shape ${activeSection === 'dashboard' ? 'pulse-glow' : ''}`}
                size="sm"
                onClick={() => setActiveSection('dashboard')}
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant={activeSection === 'assessment' ? 'default' : 'outline'}
                className={`btn-3d morph-shape ${activeSection === 'assessment' ? 'pulse-glow' : ''}`}
                size="sm"
                onClick={() => setActiveSection('assessment')}
              >
                <Target className="h-4 w-4 mr-2" />
                Assessment
              </Button>
              <Button
                variant={activeSection === 'practice' ? 'default' : 'outline'}
                className={`btn-3d morph-shape ${activeSection === 'practice' ? 'pulse-glow' : ''}`}
                size="sm"
                onClick={() => setActiveSection('practice')}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Practice
              </Button>
              <Button
                variant={activeSection === 'analytics' ? 'default' : 'outline'}
                className={`btn-3d morph-shape ${activeSection === 'analytics' ? 'pulse-glow' : ''}`}
                size="sm"
                onClick={() => setActiveSection('analytics')}
              >
                <Trophy className="h-4 w-4 mr-2" />
                Analytics
              </Button>
              <Button
                variant={activeSection === 'studyplan' ? 'default' : 'outline'}
                className={`btn-3d morph-shape ${activeSection === 'studyplan' ? 'pulse-glow' : ''}`}
                size="sm"
                onClick={() => setActiveSection('studyplan')}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Study Plan
              </Button>
              <Button
                variant={activeSection === 'teacher' ? 'default' : 'outline'}
                className={`btn-3d morph-shape ${activeSection === 'teacher' ? 'pulse-glow' : ''}`}
                size="sm"
                onClick={() => setActiveSection('teacher')}
              >
                <Users className="h-4 w-4 mr-2" />
                Teacher
              </Button>
              <Button
                variant={activeSection === 'settings' ? 'default' : 'outline'}
                className={`btn-3d morph-shape ${activeSection === 'settings' ? 'pulse-glow' : ''}`}
                size="sm"
                onClick={() => setActiveSection('settings')}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8 relative">
        <div className="slide-in-up">
          {renderActiveSection()}
        </div>
      </main>
    </div>
  );
};

export default Index;