import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Users, TrendingUp, Search, Filter, Download, AlertTriangle, CheckCircle, Clock, BookOpen, Target, Brain } from "lucide-react";

interface TeacherDashboardProps {
  onBack: () => void;
}

const TeacherDashboard = ({ onBack }: TeacherDashboardProps) => {
  const [selectedClass, setSelectedClass] = useState("8A");
  const [searchTerm, setSearchTerm] = useState("");

  const classStats = {
    totalStudents: 32,
    activeToday: 28,
    avgScore: 76,
    completedAssessments: 156,
    needsAttention: 5
  };

  const students = [
    {
      id: 1,
      name: "Priya Sharma",
      overallScore: 92,
      trend: "up",
      recentActivity: "2 hours ago",
      weakAreas: ["Application"],
      status: "excellent",
      fundamentals: { attentionConsistency: 95, grasping: 90, retention: 88, application: 85 }
    },
    {
      id: 2,
      name: "Rahul Patel",
      overallScore: 78,
      trend: "stable",
      recentActivity: "5 hours ago",
      weakAreas: ["Retention", "Attention Consistency"],
      status: "good",
      fundamentals: { attentionConsistency: 70, grasping: 85, retention: 72, application: 80 }
    },
    {
      id: 3,
      name: "Sanga Kumar",
      overallScore: 45,
      trend: "down",
      recentActivity: "1 day ago",
      weakAreas: ["Grasping", "Retention", "Application"],
      status: "attention",
      fundamentals: { attentionConsistency: 60, grasping: 40, retention: 35, application: 45 }
    },
    {
      id: 4,
      name: "Anita Singh",
      overallScore: 85,
      trend: "up",
      recentActivity: "30 min ago",
      weakAreas: ["Attention Consistency"],
      status: "excellent",
      fundamentals: { attentionConsistency: 75, grasping: 90, retention: 88, application: 87 }
    },
    {
      id: 5,
      name: "Ravi Gupta",
      overallScore: 62,
      trend: "up",
      recentActivity: "3 hours ago",
      weakAreas: ["Application", "Grasping"],
      status: "improving",
      fundamentals: { attentionConsistency: 70, grasping: 55, retention: 75, application: 48 }
    }
  ];

  const subjectAnalysis = [
    { subject: "Mathematics", classAvg: 74, topScore: 95, strugglingStudents: 8, completionRate: 92 },
    { subject: "Science", classAvg: 78, topScore: 98, strugglingStudents: 5, completionRate: 88 },
    { subject: "English", classAvg: 82, topScore: 96, strugglingStudents: 3, completionRate: 95 },
    { subject: "Social Studies", classAvg: 69, topScore: 89, strugglingStudents: 12, completionRate: 85 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "bg-success text-success-foreground";
      case "good": return "bg-primary text-primary-foreground";
      case "improving": return "bg-warning text-warning-foreground";
      case "attention": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return "↗️";
      case "down": return "↘️";
      default: return "➡️";
    }
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Main Dashboard
        </Button>
        
        <div className="flex items-center space-x-4">
          <Select value={selectedClass} onValueChange={setSelectedClass}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="8A">Class 8A</SelectItem>
              <SelectItem value="8B">Class 8B</SelectItem>
              <SelectItem value="8C">Class 8C</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold">Teacher Dashboard - Class {selectedClass}</h2>
        <p className="text-muted-foreground mt-2">Monitor student progress and identify learning gaps</p>
      </div>

      {/* Class Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">{classStats.totalStudents}</div>
                <div className="text-xs text-muted-foreground">Total Students</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-success" />
              <div>
                <div className="text-2xl font-bold">{classStats.activeToday}</div>
                <div className="text-xs text-muted-foreground">Active Today</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-warning" />
              <div>
                <div className="text-2xl font-bold">{classStats.avgScore}%</div>
                <div className="text-xs text-muted-foreground">Class Average</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <div>
                <div className="text-2xl font-bold">{classStats.completedAssessments}</div>
                <div className="text-xs text-muted-foreground">Assessments Done</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div>
                <div className="text-2xl font-bold">{classStats.needsAttention}</div>
                <div className="text-xs text-muted-foreground">Need Attention</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="students" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="students">Individual Students</TabsTrigger>
          <TabsTrigger value="subjects">Subject Analysis</TabsTrigger>
          <TabsTrigger value="insights">Learning Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-6">
          {/* Search and Filter */}
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          {/* Student List */}
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-4">
                        <h3 className="text-lg font-semibold">{student.name}</h3>
                        <Badge className={getStatusColor(student.status)}>
                          {student.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {getTrendIcon(student.trend)} {student.overallScore}%
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Attention Consistency</span>
                            <span>{student.fundamentals.attentionConsistency}%</span>
                          </div>
                          <Progress value={student.fundamentals.attentionConsistency} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Grasping</span>
                            <span>{student.fundamentals.grasping}%</span>
                          </div>
                          <Progress value={student.fundamentals.grasping} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Retention</span>
                            <span>{student.fundamentals.retention}%</span>
                          </div>
                          <Progress value={student.fundamentals.retention} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Application</span>
                            <span>{student.fundamentals.application}%</span>
                          </div>
                          <Progress value={student.fundamentals.application} className="h-2" />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="text-muted-foreground">
                            <Clock className="h-3 w-3 inline mr-1" />
                            {student.recentActivity}
                          </span>
                          <span className="text-muted-foreground">
                            Weak: {student.weakAreas.join(", ")}
                          </span>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="subjects" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {subjectAnalysis.map((subject, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{subject.subject}</CardTitle>
                  <CardDescription>Class performance overview</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground">Class Average</div>
                      <div className="text-2xl font-bold text-primary">{subject.classAvg}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Top Score</div>
                      <div className="text-2xl font-bold text-success">{subject.topScore}%</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Completion Rate</span>
                      <span>{subject.completionRate}%</span>
                    </div>
                    <Progress value={subject.completionRate} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {subject.strugglingStudents} students struggling
                    </span>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-warning/5 border-warning/20">
              <CardHeader>
                <CardTitle className="flex items-center text-warning">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Students Needing Attention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Sanga Kumar</span>
                    <Badge variant="destructive">Critical</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Ravi Gupta</span>
                    <Badge className="bg-warning text-warning-foreground">Improving</Badge>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Create Intervention Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-success/5 border-success/20">
              <CardHeader>
                <CardTitle className="flex items-center text-success">
                  <Target className="h-5 w-5 mr-2" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Priya Sharma</span>
                    <Badge className="bg-success text-success-foreground">92%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Anita Singh</span>
                    <Badge className="bg-success text-success-foreground">85%</Badge>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Assign Advanced Tasks
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-primary" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Focus on Social Studies</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Class average is 7% below target. Consider additional practice sessions for struggling concepts.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Attention Consistency Workshop</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    5 students show consistent attention challenges. A focused workshop could help improve focus and accuracy.
                  </p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium">Peer Learning Groups</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pair high performers with students needing support for collaborative learning opportunities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TeacherDashboard;