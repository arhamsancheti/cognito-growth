import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Calendar as CalendarIcon, Clock, Target, BookOpen, CheckCircle, AlertCircle, TrendingUp, Zap } from "lucide-react";

interface StudyPlanProps {
  onBack: () => void;
}

const StudyPlan = ({ onBack }: StudyPlanProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const weeklyGoals = {
    totalMinutes: 180,
    completedMinutes: 125,
    streak: 5,
    targetSessions: 7,
    completedSessions: 5
  };

  const todaysPlan = [
    {
      id: "1",
      subject: "Mathematics",
      topic: "Linear Equations",
      type: "Practice",
      duration: 20,
      difficulty: "Medium",
      priority: "high",
      completed: false,
      estimatedScore: 85
    },
    {
      id: "2",
      subject: "Science",
      topic: "Photosynthesis",
      type: "Assessment",
      duration: 15,
      difficulty: "Easy",
      priority: "medium",
      completed: true,
      estimatedScore: 92
    },
    {
      id: "3",
      subject: "English",
      topic: "Grammar Review",
      type: "Practice",
      duration: 10,
      difficulty: "Easy",
      priority: "low",
      completed: false,
      estimatedScore: 88
    },
    {
      id: "4",
      subject: "Social Studies",
      topic: "World War II",
      type: "Study",
      duration: 25,
      difficulty: "Hard",
      priority: "high",
      completed: false,
      estimatedScore: 75
    }
  ];

  const upcomingMilestones = [
    {
      title: "Mathematics Unit Test",
      date: "Dec 15, 2024",
      subject: "Mathematics",
      preparedness: 78,
      daysLeft: 5,
      status: "on-track"
    },
    {
      title: "Science Project Due",
      date: "Dec 20, 2024",
      subject: "Science",
      preparedness: 45,
      daysLeft: 10,
      status: "behind"
    },
    {
      title: "English Essay Submission",
      date: "Dec 12, 2024",
      subject: "English",
      preparedness: 90,
      daysLeft: 2,
      status: "ahead"
    }
  ];

  const weekProgress = [
    { day: "Mon", completed: true, minutes: 25 },
    { day: "Tue", completed: true, minutes: 30 },
    { day: "Wed", completed: true, minutes: 20 },
    { day: "Thu", completed: true, minutes: 35 },
    { day: "Fri", completed: true, minutes: 15 },
    { day: "Sat", completed: false, minutes: 0 },
    { day: "Sun", completed: false, minutes: 0 }
  ];

  const handleTaskToggle = (taskId: string) => {
    setCompletedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-warning text-warning-foreground";
      case "low": return "bg-success text-success-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ahead": return "bg-success text-success-foreground";
      case "on-track": return "bg-primary text-primary-foreground";
      case "behind": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Button onClick={onBack} variant="outline">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold">AI-Powered Study Plan</h2>
        <p className="text-muted-foreground mt-2">Personalized learning schedule based on your progress</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Plan */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                Weekly Progress
              </CardTitle>
              <CardDescription>Your learning consistency this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{weeklyGoals.streak}</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{weeklyGoals.completedSessions}/{weeklyGoals.targetSessions}</div>
                  <div className="text-xs text-muted-foreground">Sessions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">{weeklyGoals.completedMinutes}</div>
                  <div className="text-xs text-muted-foreground">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">
                    {Math.round((weeklyGoals.completedMinutes / weeklyGoals.totalMinutes) * 100)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Goal Progress</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Weekly Goal: {weeklyGoals.totalMinutes} minutes</span>
                  <span>{weeklyGoals.completedMinutes}/{weeklyGoals.totalMinutes} min</span>
                </div>
                <Progress value={(weeklyGoals.completedMinutes / weeklyGoals.totalMinutes) * 100} className="h-3" />
              </div>

              <div className="flex justify-between mt-4">
                {weekProgress.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                      day.completed ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      {day.completed ? <CheckCircle className="h-4 w-4" /> : day.day}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">{day.minutes}m</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
                  Today's Learning Plan
                </div>
                <Badge className="bg-primary text-primary-foreground">
                  {todaysPlan.filter(task => completedTasks.includes(task.id) || task.completed).length}/{todaysPlan.length} completed
                </Badge>
              </CardTitle>
              <CardDescription>AI-recommended tasks based on your learning gaps</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaysPlan.map((task) => {
                  const isCompleted = completedTasks.includes(task.id) || task.completed;
                  return (
                    <div key={task.id} className={`p-4 border rounded-lg ${isCompleted ? 'bg-muted/50' : ''}`}>
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          checked={isCompleted}
                          onCheckedChange={() => handleTaskToggle(task.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className={`font-medium ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                              {task.subject}: {task.topic}
                            </h4>
                            <div className="flex items-center space-x-2">
                              <Badge className={getPriorityColor(task.priority)} variant="secondary">
                                {task.priority}
                              </Badge>
                              <Badge variant="outline">{task.type}</Badge>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {task.duration} min
                            </div>
                            <div className="flex items-center">
                              <Target className="h-3 w-3 mr-1" />
                              {task.difficulty}
                            </div>
                            <div className="flex items-center">
                              <Zap className="h-3 w-3 mr-1" />
                              Est. Score: {task.estimatedScore}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-primary" />
                Upcoming Milestones
              </CardTitle>
              <CardDescription>Important deadlines and assessments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingMilestones.map((milestone, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{milestone.title}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(milestone.status)}>
                          {milestone.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{milestone.daysLeft} days</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Preparedness</span>
                        <span>{milestone.preparedness}%</span>
                      </div>
                      <Progress value={milestone.preparedness} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 text-sm">
                      <span className="text-muted-foreground">{milestone.date}</span>
                      <Button variant="outline" size="sm">
                        <BookOpen className="h-3 w-3 mr-1" />
                        Study Plan
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Study Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border-0"
              />
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Study Time</span>
                <span className="font-medium">12.5 hours</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Assessments Completed</span>
                <span className="font-medium">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average Score</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Current Streak</span>
                <span className="font-medium">{weeklyGoals.streak} days</span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Start Study Session
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Target className="h-4 w-4 mr-2" />
                Quick Assessment
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Schedule Review
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudyPlan;