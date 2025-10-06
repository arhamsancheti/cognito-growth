import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, TrendingUp, Calendar, Award, Target, BookOpen, BarChart3, Trophy, Star, Zap } from "lucide-react";

interface AnalyticsDashboardProps {
  onBack: () => void;
}

const AnalyticsDashboard = ({ onBack }: AnalyticsDashboardProps) => {
  const weeklyProgress = [
    { week: "Week 1", attentionConsistency: 65, grasping: 70, retention: 60, application: 55 },
    { week: "Week 2", attentionConsistency: 72, grasping: 75, retention: 68, application: 62 },
    { week: "Week 3", attentionConsistency: 78, grasping: 80, retention: 75, application: 70 },
    { week: "Week 4", attentionConsistency: 82, grasping: 85, retention: 80, application: 75 }
  ];

  const achievements = [
    { title: "Quick Learner", description: "Completed 10 adaptive sessions", icon: Zap, earned: true, date: "2024-01-15" },
    { title: "Perfect Score", description: "Scored 100% in Mathematics", icon: Star, earned: true, date: "2024-01-12" },
    { title: "Consistency Champion", description: "Practiced 7 days in a row", icon: Trophy, earned: false, progress: 5 },
    { title: "Subject Master", description: "Master all 4 core subjects", icon: Award, earned: false, progress: 75 }
  ];

  const subjectPerformance = [
    { subject: "Mathematics", current: 85, previous: 78, trend: "up", sessions: 24, avgTime: "12 min" },
    { subject: "Science", current: 78, previous: 72, trend: "up", sessions: 18, avgTime: "15 min" },
    { subject: "English", current: 92, previous: 88, trend: "up", sessions: 20, avgTime: "10 min" },
    { subject: "Social Studies", current: 74, previous: 80, trend: "down", sessions: 15, avgTime: "18 min" }
  ];

  const learningInsights = [
    {
      type: "strength",
      title: "English Excellence",
      description: "You consistently perform best in English with 92% average score",
      action: "Consider helping peers or taking advanced challenges"
    },
    {
      type: "improvement",
      title: "Social Studies Focus Needed",
      description: "6-point drop in performance suggests reviewing fundamentals",
      action: "Schedule extra practice sessions this week"
    },
    {
      type: "pattern",
      title: "Morning Performance Peak",
      description: "Your scores are 15% higher in morning practice sessions",
      action: "Try scheduling important assessments in the morning"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Button onClick={onBack} variant="outline">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold">Learning Analytics</h2>
        <p className="text-muted-foreground mt-2">Deep insights into your learning journey</p>
      </div>

      <Tabs defaultValue="progress" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="progress">Progress Trends</TabsTrigger>
          <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-6">
          {/* Weekly Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Learning Fundamentals Progress
              </CardTitle>
              <CardDescription>Your improvement over the last 4 weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {weeklyProgress.map((week, index) => (
                  <div key={index} className="space-y-3">
                    <h4 className="font-medium flex items-center justify-between">
                      <span>{week.week}</span>
                      <Badge variant="outline">{Math.round((week.attentionConsistency + week.grasping + week.retention + week.application) / 4)}% avg</Badge>
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Attention Consistency</span>
                          <span>{week.attentionConsistency}%</span>
                        </div>
                        <Progress value={week.attentionConsistency} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Grasping</span>
                          <span>{week.grasping}%</span>
                        </div>
                        <Progress value={week.grasping} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Retention</span>
                          <span>{week.retention}%</span>
                        </div>
                        <Progress value={week.retention} className="h-2" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Application</span>
                          <span>{week.application}%</span>
                        </div>
                        <Progress value={week.application} className="h-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjectPerformance.map((subject, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    {subject.subject}
                    <Badge className={subject.trend === 'up' ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'}>
                      {subject.trend === 'up' ? '↗' : '↘'} {Math.abs(subject.current - subject.previous)}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Current Score</span>
                    <span className="text-2xl font-bold text-primary">{subject.current}%</span>
                  </div>
                  <Progress value={subject.current} className="h-3" />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Sessions</div>
                      <div className="font-medium">{subject.sessions}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Avg Time</div>
                      <div className="font-medium">{subject.avgTime}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <Card key={index} className={achievement.earned ? 'bg-primary/5 border-primary/20' : 'opacity-75'}>
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-full ${achievement.earned ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                      <achievement.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{achievement.title}</CardTitle>
                      <CardDescription>{achievement.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {achievement.earned ? (
                    <div className="flex items-center justify-between">
                      <Badge className="bg-success text-success-foreground">
                        <Trophy className="h-3 w-3 mr-1" />
                        Earned
                      </Badge>
                      <span className="text-sm text-muted-foreground">{achievement.date}</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <Progress value={achievement.progress} className="h-2" />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="space-y-4">
            {learningInsights.map((insight, index) => (
              <Card key={index} className={
                insight.type === 'strength' ? 'bg-success/5 border-success/20' :
                insight.type === 'improvement' ? 'bg-warning/5 border-warning/20' :
                'bg-primary/5 border-primary/20'
              }>
                <CardHeader>
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${
                      insight.type === 'strength' ? 'bg-success/10' :
                      insight.type === 'improvement' ? 'bg-warning/10' :
                      'bg-primary/10'
                    }`}>
                      {insight.type === 'strength' && <Star className="h-5 w-5 text-success" />}
                      {insight.type === 'improvement' && <Target className="h-5 w-5 text-warning" />}
                      {insight.type === 'pattern' && <BarChart3 className="h-5 w-5 text-primary" />}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                      <CardDescription className="mt-1">{insight.description}</CardDescription>
                      <div className="mt-3 p-3 bg-background rounded-lg">
                        <div className="text-sm font-medium text-foreground">Recommended Action:</div>
                        <div className="text-sm text-muted-foreground mt-1">{insight.action}</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;