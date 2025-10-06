import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, BookOpen, Target, Shuffle, TrendingUp, Play } from "lucide-react";

interface PracticeModeProps {
  onBack: () => void;
}

const PracticeMode = ({ onBack }: PracticeModeProps) => {
  const [selectedMode, setSelectedMode] = useState<'adaptive' | 'custom' | 'mixed' | null>(null);
  const [difficulty, setDifficulty] = useState([5]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const subjects = [
    { name: "Mathematics", topics: ["Algebra", "Time & Distance", "Geometry", "Fractions"], color: "bg-blue-500" },
    { name: "Science", topics: ["Forces & Motion", "Light & Sound", "Matter", "Living Things"], color: "bg-green-500" },
    { name: "English", topics: ["Grammar", "Reading Comprehension", "Writing", "Vocabulary"], color: "bg-purple-500" },
    { name: "Social Studies", topics: ["History", "Geography", "Civics", "Economics"], color: "bg-orange-500" }
  ];

  const practiceStrengths = [
    { fundamental: "Attention Consistency", weakness: "Medium", color: "fundamentals-attention-consistency", improvement: "+12%" },
    { fundamental: "Grasping Power", weakness: "Low", color: "fundamentals-grasping", improvement: "+8%" },
    { fundamental: "Retention Power", weakness: "High", color: "fundamentals-retention", improvement: "+5%" },
    { fundamental: "Practice Application", weakness: "Medium", color: "fundamentals-application", improvement: "+15%" }
  ];

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleStartPractice = () => {
    // In a real app, this would start the practice session
    console.log("Starting practice with:", { selectedMode, difficulty: difficulty[0], selectedSubjects });
  };

  if (selectedMode) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Button onClick={() => setSelectedMode(null)} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Practice Options
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Customize Your Practice Session</CardTitle>
            <CardDescription>Set up your personalized practice preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Difficulty Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Difficulty Level</h4>
                <Badge variant="secondary">Level {difficulty[0]}/10</Badge>
              </div>
              <Slider
                value={difficulty}
                onValueChange={setDifficulty}
                max={10}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Advanced</span>
              </div>
            </div>

            {/* Subject Selection */}
            <div className="space-y-4">
              <h4 className="font-medium">Select Subjects</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {subjects.map((subject, index) => (
                  <Button
                    key={index}
                    variant={selectedSubjects.includes(subject.name) ? "default" : "outline"}
                    className="h-auto p-4 justify-start"
                    onClick={() => handleSubjectToggle(subject.name)}
                  >
                    <div className={`w-4 h-4 rounded ${subject.color} mr-3`} />
                    <div className="text-left">
                      <div className="font-medium">{subject.name}</div>
                      <div className="text-xs opacity-70">{subject.topics.length} topics available</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Start Practice Button */}
            <Button 
              onClick={handleStartPractice} 
              size="lg" 
              className="w-full"
              disabled={selectedSubjects.length === 0}
            >
              <Play className="h-5 w-5 mr-2" />
              Start Practice Session
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Button onClick={onBack} variant="outline">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Button>

      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold">Practice Mode</h2>
        <p className="text-muted-foreground mt-2">Choose your practice approach and start improving</p>
      </div>

      {/* Recommended Areas for Improvement */}
      <Card className="bg-gradient-to-r from-warning/10 to-warning/5 border-warning/20">
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-warning" />
            Recommended Focus Areas
          </CardTitle>
          <CardDescription>Based on your recent assessment performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {practiceStrengths.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full bg-${item.color}`} />
                  <div>
                    <div className="font-medium text-sm">{item.fundamental}</div>
                    <div className="text-xs text-muted-foreground">Weakness: {item.weakness}</div>
                  </div>
                </div>
                <Badge className="bg-success text-success-foreground">
                  {item.improvement}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Practice Mode Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Adaptive Practice */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedMode('adaptive')}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Target className="h-5 w-5 mr-2 text-primary" />
              Adaptive Practice
            </CardTitle>
            <CardDescription>AI adjusts difficulty based on your performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Personalization</span>
                <Badge className="bg-primary text-primary-foreground">High</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Duration</span>
                <span className="text-muted-foreground">15-30 min</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Focus</span>
                <span className="text-muted-foreground">Weak areas</span>
              </div>
              <Button className="w-full mt-4">
                <Play className="h-4 w-4 mr-2" />
                Start Adaptive
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Custom Practice */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedMode('custom')}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-success" />
              Custom Practice
            </CardTitle>
            <CardDescription>Choose your own difficulty and topics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Control</span>
                <Badge className="bg-success text-success-foreground">Full</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Duration</span>
                <span className="text-muted-foreground">Flexible</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Focus</span>
                <span className="text-muted-foreground">Your choice</span>
              </div>
              <Button variant="outline" className="w-full mt-4">
                <BookOpen className="h-4 w-4 mr-2" />
                Customize
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Mixed Practice */}
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedMode('mixed')}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Shuffle className="h-5 w-5 mr-2 text-warning" />
              Mixed Practice
            </CardTitle>
            <CardDescription>Questions from multiple chapters and topics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Variety</span>
                <Badge className="bg-warning text-warning-foreground">High</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Duration</span>
                <span className="text-muted-foreground">20-40 min</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Focus</span>
                <span className="text-muted-foreground">Comprehensive</span>
              </div>
              <Button variant="outline" className="w-full mt-4 border-warning text-warning hover:bg-warning hover:text-warning-foreground">
                <Shuffle className="h-4 w-4 mr-2" />
                Start Mixed
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PracticeMode;