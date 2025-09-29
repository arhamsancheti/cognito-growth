import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Brain, CheckCircle, XCircle, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { percentageQuestions, getDifficultyLevel, getDifficultyName, getRandomQuestionByDifficulty, Question } from '@/data/questions';

interface AssessmentInterfaceProps {
  onBack: () => void;
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

  // Current question from the adaptive selection
  const [currentQuestionData, setCurrentQuestionData] = useState<Question | null>(null);
  const [usedQuestions, setUsedQuestions] = useState<number[]>([]);
  const totalQuestions = 10;

  // Initialize first question
  useEffect(() => {
    const firstQuestion = getRandomQuestionByDifficulty(getDifficultyName(difficulty));
    if (firstQuestion) {
      setCurrentQuestionData(firstQuestion);
      setUsedQuestions([firstQuestion.id]);
    }
  }, []);

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
    if (selectedAnswer === null || !currentQuestionData) return;

    // Convert letter answer to index (a=0, b=1, c=2, d=3)
    const correctAnswerIndex = currentQuestionData.answer.charCodeAt(0) - 97;
    const isCorrect = selectedAnswer === correctAnswerIndex;
    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    // Adaptive difficulty adjustment based on difficulty levels
    let newDifficulty = difficulty;
    if (isCorrect) {
      setScore(score + Math.max(1, difficulty));
      newDifficulty = Math.min(4, difficulty + 1); // Max difficulty level 4
      toast({
        title: "Correct!",
        description: "Great job! Moving to next question.",
      });
    } else {
      newDifficulty = Math.max(1, difficulty - 1); // Min difficulty level 1
      toast({
        title: "Incorrect",
        description: "Don't worry, let's try the next one.",
        variant: "destructive",
      });
    }
    
    setDifficulty(newDifficulty);
    setShowResult(true);
    
    // Show result briefly, then move to next question
    setTimeout(() => {
      setShowResult(false);
      setSelectedAnswer(null);
      
      if (currentQuestion < totalQuestions - 1) {
        // Get next question with new difficulty
        const nextQuestion = getNextQuestion(newDifficulty);
        if (nextQuestion) {
          setCurrentQuestionData(nextQuestion);
          setUsedQuestions([...usedQuestions, nextQuestion.id]);
          setCurrentQuestion(currentQuestion + 1);
        } else {
          handleSubmitAssessment();
        }
      } else {
        handleSubmitAssessment();
      }
    }, 1500);
  };

  const getNextQuestion = (difficultyLevel: number): Question | null => {
    const difficultyName = getDifficultyName(difficultyLevel);
    const availableQuestions = percentageQuestions.filter(q => 
      q.difficulty === difficultyName && !usedQuestions.includes(q.id)
    );
    
    if (availableQuestions.length === 0) {
      // Try adjacent difficulty levels if no questions available
      const adjacentDifficulties = [
        getDifficultyName(Math.max(1, difficultyLevel - 1)),
        getDifficultyName(Math.min(4, difficultyLevel + 1))
      ];
      
      for (const adjDiff of adjacentDifficulties) {
        const adjQuestions = percentageQuestions.filter(q => 
          q.difficulty === adjDiff && !usedQuestions.includes(q.id)
        );
        if (adjQuestions.length > 0) {
          return adjQuestions[Math.floor(Math.random() * adjQuestions.length)];
        }
      }
      return null;
    }
    
    return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
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
    return ((currentQuestion + 1) / totalQuestions) * 100;
  };

  if (isComplete) {
    const finalScore = Math.round((score / totalQuestions) * 100);

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
                    <span>Questions Completed</span>
                    <span className="font-medium">{currentQuestion + 1}/{totalQuestions}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Final Difficulty Level</span>
                    <Badge variant="secondary">{getDifficultyName(difficulty)}</Badge>
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

  if (!currentQuestionData) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <Card>
          <CardContent className="pt-6 text-center">
            <div>Loading assessment...</div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between stagger-children">
        <Button onClick={onBack} variant="outline" className="btn-3d morph-shape">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        
        <div className="flex items-center space-x-6">
          <div className="glass-card px-4 py-2 rounded-lg flex items-center space-x-3">
            <Clock className="h-5 w-5 text-primary" />
            <span className="font-mono text-lg font-bold">{formatTime(timeLeft)}</span>
          </div>
          <Badge className="px-4 py-2 text-sm font-medium gradient-text bg-gradient-to-r from-primary/10 to-primary/20 border border-primary/30">
            Difficulty: {getDifficultyName(difficulty)}
          </Badge>
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      <Card className="glass-card">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between text-sm font-medium">
              <span className="gradient-text">Assessment Progress</span>
              <span className="text-primary font-bold">{currentQuestion + 1} of {totalQuestions}</span>
            </div>
            <div className="relative">
              <Progress value={getProgressPercentage()} className="h-3 bg-muted/50" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-success/20 rounded-full opacity-50"></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Question Card */}
      <Card className="glass-card min-h-[500px] overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full"></div>
        <CardHeader className="relative z-10">
          <CardTitle className="flex items-center space-x-3 text-xl">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-hover">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="gradient-text">Question {currentQuestion + 1}</span>
            <Badge className="px-3 py-1 bg-gradient-to-r from-success to-success-glow text-white border-0">
              {currentQuestionData.tags[0]}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8 relative z-10">
          <div className="p-6 glass-card rounded-xl">
            <div className="text-xl font-medium leading-relaxed text-foreground">
              {currentQuestionData.question_text}
            </div>
          </div>

          <div className="space-y-4 stagger-children">
            {[
              currentQuestionData.option_a,
              currentQuestionData.option_b,
              currentQuestionData.option_c,
              currentQuestionData.option_d
            ].map((option, index) => {
              const correctAnswerIndex = currentQuestionData.answer.charCodeAt(0) - 97;
              return (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? "default" : "outline"}
                  className={`w-full p-6 h-auto text-left justify-start glass-card morph-shape transition-all duration-300 ${
                    selectedAnswer === index ? 'transform scale-[1.02] btn-3d' : 'hover:scale-[1.01]'
                  } ${
                    showResult
                      ? index === correctAnswerIndex
                        ? "bg-gradient-to-r from-success to-success-glow text-white border-success success-glow"
                        : index === selectedAnswer && index !== correctAnswerIndex
                        ? "bg-gradient-to-r from-destructive to-destructive/80 text-white border-destructive"
                        : "opacity-60"
                      : ""
                  }`}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <div className="flex items-center space-x-4 w-full">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all ${
                      selectedAnswer === index ? 'bg-white text-primary' : 'border-primary/50'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="flex-1 font-medium">{option}</span>
                    {showResult && index === correctAnswerIndex && (
                      <CheckCircle className="h-6 w-6 text-white" />
                    )}
                    {showResult && index === selectedAnswer && index !== correctAnswerIndex && (
                      <XCircle className="h-6 w-6 text-white" />
                    )}
                  </div>
                </Button>
              );
            })}
          </div>

          {!showResult && (
            <Button 
              onClick={handleNextQuestion} 
              disabled={selectedAnswer === null}
              className="w-full h-14 text-lg font-semibold btn-3d bg-gradient-to-r from-primary to-primary-hover"
              size="lg"
            >
              {currentQuestion === totalQuestions - 1 ? "🎯 Complete Assessment" : "Next Question →"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentInterface;