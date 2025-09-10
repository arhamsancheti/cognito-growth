import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Headphones, Brain, BookOpen, Target, TrendingUp, Calendar, Award } from "lucide-react";

interface StudentProfile {
  name: string;
  grade: string;
  overallScore: number;
  fundamentals: {
    listening: number;
    grasping: number;
    retention: number;
    application: number;
  };
  recentAssessments: Array<{
    subject: string;
    topic: string;
    score: number;
    date: string;
  }>;
}

interface LearningDashboardProps {
  student: StudentProfile;
  onStartAssessment: () => void;
  onStartPractice: () => void;
}

const LearningDashboard = ({ student, onStartAssessment, onStartPractice }: LearningDashboardProps) => {
  const fundamentalsData = [
    { name: "Listening Skills", icon: Headphones, value: student.fundamentals.listening, color: "fundamentals-listening", description: "Concentration during lessons" },
    { name: "Grasping Power", icon: Brain, value: student.fundamentals.grasping, color: "fundamentals-grasping", description: "Comprehension ability" },
    { name: "Retention Power", icon: BookOpen, value: student.fundamentals.retention, color: "fundamentals-retention", description: "Memory during revision" },
    { name: "Practice Application", icon: Target, value: student.fundamentals.application, color: "fundamentals-application", description: "Applying concepts" }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-success";
    if (score >= 60) return "bg-warning";
    return "bg-destructive";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return <Badge className="bg-success text-success-foreground">Excellent</Badge>;
    if (score >= 60) return <Badge className="bg-warning text-warning-foreground">Good</Badge>;
    return <Badge variant="destructive">Needs Improvement</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground">Welcome back, {student.name}!</h2>
        <p className="text-muted-foreground mt-2">{student.grade} • Let's continue your learning journey</p>
      </div>

      {/* Overall Progress Card */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center space-x-2">
            <Award className="h-6 w-6 text-primary" />
            <span>Overall Learning Score</span>
          </CardTitle>
          <CardDescription>Your comprehensive learning performance</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-4xl font-bold text-primary">{student.overallScore}%</div>
          <Progress value={student.overallScore} className="h-3" />
          {getScoreBadge(student.overallScore)}
        </CardContent>
      </Card>

      {/* Learning Fundamentals Grid */}
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <TrendingUp className="h-5 w-5 mr-2 text-primary" />
          Learning Fundamentals Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {fundamentalsData.map((fundamental, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-2">
                  <div className={`p-2 rounded-lg bg-${fundamental.color}/10`}>
                    <fundamental.icon className={`h-5 w-5 text-${fundamental.color}`} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-sm">{fundamental.name}</CardTitle>
                    <CardDescription className="text-xs">{fundamental.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">{fundamental.value}%</span>
                    {getScoreBadge(fundamental.value)}
                  </div>
                  <Progress value={fundamental.value} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Assessments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary" />
            Recent Assessments
          </CardTitle>
          <CardDescription>Your latest assessment results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {student.recentAssessments.map((assessment, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{assessment.subject}</h4>
                  <p className="text-sm text-muted-foreground">{assessment.topic}</p>
                  <p className="text-xs text-muted-foreground mt-1">{assessment.date}</p>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-lg font-bold">{assessment.score}%</div>
                  {getScoreBadge(assessment.score)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button onClick={onStartAssessment} size="lg" className="h-16">
          <Target className="h-6 w-6 mr-3" />
          <div className="text-left">
            <div className="font-semibold">Start New Assessment</div>
            <div className="text-sm opacity-90">Adaptive difficulty testing</div>
          </div>
        </Button>
        <Button onClick={onStartPractice} variant="outline" size="lg" className="h-16">
          <BookOpen className="h-6 w-6 mr-3" />
          <div className="text-left">
            <div className="font-semibold">Practice Mode</div>
            <div className="text-sm opacity-70">Personalized practice sessions</div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default LearningDashboard;