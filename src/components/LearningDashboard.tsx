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
    <div className="space-y-8 stagger-children">
      {/* Welcome Header with 3D Effect */}
      <div className="text-center relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-success/5 rounded-3xl blur-3xl"></div>
        <div className="relative glass-card p-8 rounded-3xl">
          <h2 className="text-4xl font-bold gradient-text mb-2">Welcome back, {student.name}! 🚀</h2>
          <p className="text-muted-foreground text-lg">{student.grade} • Let's continue your AI-powered learning journey</p>
        </div>
      </div>

      {/* Overall Progress Card with Enhanced Design */}
      <Card className="glass-card relative overflow-hidden pulse-glow">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/20 to-transparent rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-success/20 to-transparent rounded-tr-full"></div>
        <CardHeader className="text-center relative z-10">
          <CardTitle className="flex items-center justify-center space-x-3 text-2xl">
            <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary-hover float-animation">
              <Award className="h-8 w-8 text-white" />
            </div>
            <span className="gradient-text">Overall Learning Score</span>
          </CardTitle>
          <CardDescription className="text-lg">Your comprehensive AI-analyzed performance</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-6 relative z-10">
          <div className="text-6xl font-bold gradient-text">{student.overallScore}%</div>
          <div className="relative">
            <Progress value={student.overallScore} className="h-4 bg-muted/30" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-success/30 rounded-full opacity-70"></div>
          </div>
          <div className="transform scale-110">
            {getScoreBadge(student.overallScore)}
          </div>
        </CardContent>
      </Card>

      {/* Learning Fundamentals Grid with Enhanced Cards */}
      <div>
        <h3 className="text-2xl font-bold mb-6 flex items-center gradient-text">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-hover mr-3">
            <TrendingUp className="h-6 w-6 text-white" />
          </div>
          AI Learning Fundamentals Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fundamentalsData.map((fundamental, index) => (
            <Card key={index} className="glass-card morph-shape hover:pulse-glow">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-xl bg-gradient-to-br from-${fundamental.color} to-${fundamental.color}/80 float-animation`} style={{animationDelay: `${index * 0.5}s`}}>
                    <fundamental.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base font-bold">{fundamental.name}</CardTitle>
                    <CardDescription className="text-sm">{fundamental.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold gradient-text">{fundamental.value}%</span>
                    <div className="transform scale-90">
                      {getScoreBadge(fundamental.value)}
                    </div>
                  </div>
                  <div className="relative">
                    <Progress value={fundamental.value} className="h-3" />
                    <div className={`absolute inset-0 bg-gradient-to-r from-${fundamental.color}/30 to-${fundamental.color}/10 rounded-full opacity-70`}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Assessments with Modern Design */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-hover mr-3">
              <Calendar className="h-6 w-6 text-white" />
            </div>
            <span className="gradient-text">Recent AI Assessments</span>
          </CardTitle>
          <CardDescription className="text-base">Your latest adaptive assessment results</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {student.recentAssessments.map((assessment, index) => (
              <div key={index} className="glass-card p-6 rounded-xl morph-shape hover:scale-[1.02] transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{assessment.subject}</h4>
                    <p className="text-base text-muted-foreground font-medium">{assessment.topic}</p>
                    <p className="text-sm text-muted-foreground mt-2 font-mono">{assessment.date}</p>
                  </div>
                  <div className="text-right space-y-2">
                    <div className="text-2xl font-bold gradient-text">{assessment.score}%</div>
                    {getScoreBadge(assessment.score)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Button 
          onClick={onStartAssessment} 
          size="lg" 
          className="h-20 btn-3d bg-gradient-to-r from-primary to-primary-hover text-white"
        >
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-lg bg-white/20">
              <Target className="h-8 w-8" />
            </div>
            <div className="text-left">
              <div className="font-bold text-lg">🎯 Start AI Assessment</div>
              <div className="text-sm opacity-90">Adaptive difficulty testing</div>
            </div>
          </div>
        </Button>
        <Button 
          onClick={onStartPractice} 
          variant="outline" 
          size="lg" 
          className="h-20 btn-3d glass-card border-primary/30"
        >
          <div className="flex items-center space-x-4">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <div className="text-left">
              <div className="font-bold text-lg gradient-text">📚 Practice Mode</div>
              <div className="text-sm text-muted-foreground">Personalized practice sessions</div>
            </div>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default LearningDashboard;