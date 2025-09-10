import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Brain, CheckCircle, XCircle, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AssessmentInterfaceProps {
  onBack: () => void;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: number;
  fundamental: 'listening' | 'grasping' | 'retention' | 'application';
}

const AssessmentInterface = ({ onBack }: AssessmentInterfaceProps) => {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState(5);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  // Sample adaptive questions
  const [questions] = useState<Question[]>([
    {
      id: 1,
      text: "A car travels 60 km in 1 hour. What is its speed in km/h?",
      options: ["30 km/h", "60 km/h", "90 km/h", "120 km/h"],
      correctAnswer: 1,
      difficulty: 3,
      fundamental: 'grasping'
    },
    {
      id: 2,
      text: "If a train travels at 80 km/h for 2.5 hours, how far does it travel?",
      options: ["160 km", "200 km", "240 km", "320 km"],
      correctAnswer: 1,
      difficulty: 5,
      fundamental: 'application'
    },
    {
      id: 3,
      text: "What is the formula for calculating speed?",
      options: ["Speed = Time × Distance", "Speed = Distance ÷ Time", "Speed = Distance + Time", "Speed = Distance - Time"],
      correctAnswer: 1,
      difficulty: 2,
      fundamental: 'retention'
    },
    {
      id: 4,
      text: "A cyclist covers 15 km in 30 minutes. What is the speed in km/h?",
      options: ["25 km/h", "30 km/h", "35 km/h", "40 km/h"],
      correctAnswer: 1,
      difficulty: 6,
      fundamental: 'application'
    },
    {
      id: 5,
      text: "Listen carefully: If you walk for 2 hours at 4 km/h, then run for 1 hour at 12 km/h, what is your total distance?",
      options: ["16 km", "20 km", "24 km", "28 km"],
      correctAnswer: 1,
      difficulty: 7,
      fundamental: 'listening'
    }
  ]);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmitAssessment();
    }
  }, [timeLeft, isComplete]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === questions[currentQuestion].correctAnswer;
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    // Adaptive difficulty adjustment
    if (isCorrect) {
      setScore(score + Math.max(1, difficulty));
      setDifficulty(Math.min(10, difficulty + 1));
      toast({
        title: "Correct!",
        description: "Great job! Moving to next question.",
      });
    } else {
      setDifficulty(Math.max(1, difficulty - 1));
      toast({
        title: "Incorrect",
        description: "Don't worry, let's try the next one.",
        variant: "destructive",
      });
    }

    setShowResult(true);
    
    // Show result briefly, then move to next question
    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        handleSubmitAssessment();
      }
    }, 1500);
  };

  const handleSubmitAssessment = () => {
    setIsComplete(true);
    toast({
      title: "Assessment Complete!",
      description: "Great work! Check your detailed results.",
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((currentQuestion + 1) / questions.length) * 100;
  };

  if (isComplete) {
    const correctAnswers = answers.reduce((count, answer, index) => {
      return count + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
    
    const finalScore = Math.round((correctAnswers / questions.length) * 100);

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Button onClick={onBack} variant="outline" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card className="bg-gradient-to-r from-success/10 to-primary/10 border-success/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center space-x-2">
              <CheckCircle className="h-8 w-8 text-success" />
              <span>Assessment Complete!</span>
            </CardTitle>
            <CardDescription>Here are your adaptive assessment results</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">{finalScore}%</div>
              <div className="text-lg text-muted-foreground">Overall Score</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Performance Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Correct Answers</span>
                    <span className="font-medium">{correctAnswers}/{questions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Final Difficulty Level</span>
                    <Badge variant="secondary">{difficulty}/10</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Adaptive Score</span>
                    <span className="font-medium">{score} points</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Learning Fundamentals</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Listening Skills</span>
                    <Badge className="bg-fundamentals-listening text-white">85%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Grasping Power</span>
                    <Badge className="bg-fundamentals-grasping text-white">78%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Retention Power</span>
                    <Badge className="bg-fundamentals-retention text-white">82%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Application</span>
                    <Badge className="bg-fundamentals-application text-white">75%</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono">{formatTime(timeLeft)}</span>
          </div>
          <Badge className="bg-fundamentals-application text-white">
            Difficulty: {difficulty}/10
          </Badge>
        </div>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{currentQuestion + 1} of {questions.length}</span>
            </div>
            <Progress value={getProgressPercentage()} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="min-h-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className={`h-5 w-5 text-fundamentals-${question.fundamental}`} />
            <span>Question {currentQuestion + 1}</span>
            <Badge className={`bg-fundamentals-${question.fundamental} text-white capitalize`}>
              {question.fundamental}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-lg font-medium leading-relaxed">
            {question.text}
          </div>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={selectedAnswer === index ? "default" : "outline"}
                className={`w-full p-4 h-auto text-left justify-start ${
                  showResult
                    ? index === question.correctAnswer
                      ? "bg-success hover:bg-success"
                      : index === selectedAnswer && index !== question.correctAnswer
                      ? "bg-destructive hover:bg-destructive"
                      : ""
                    : ""
                }`}
                onClick={() => !showResult && handleAnswerSelect(index)}
                disabled={showResult}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1">{option}</span>
                  {showResult && index === question.correctAnswer && (
                    <CheckCircle className="h-5 w-5 text-success-foreground" />
                  )}
                  {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                    <XCircle className="h-5 w-5 text-destructive-foreground" />
                  )}
                </div>
              </Button>
            ))}
          </div>

          {!showResult && (
            <Button 
              onClick={handleNextQuestion} 
              disabled={selectedAnswer === null}
              className="w-full"
              size="lg"
            >
              {currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next Question"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentInterface;