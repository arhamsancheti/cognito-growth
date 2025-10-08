import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Brain, CheckCircle, XCircle, BarChart3, Lightbulb } from "lucide-react";
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
  const [hintLevel, setHintLevel] = useState(0); // 0 = no hint, 1 = small hint, 2 = solution shown
  const [totalHintsUsed, setTotalHintsUsed] = useState(0);

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

  const handleHintClick = () => {
    if (hintLevel < 2) {
      setHintLevel(hintLevel + 1);
      setTotalHintsUsed(totalHintsUsed + 1);
      toast({
        title: hintLevel === 0 ? "Hint Revealed" : "Solution Revealed",
        description: hintLevel === 0 ? "Check below the question for a hint!" : "The full solution is now visible.",
      });
    }
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
      setHintLevel(0); // Reset hint level for next question
      
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
                  <div className="flex justify-between">
                    <span>Hints Used</span>
                    <span className="font-medium">{totalHintsUsed}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Learning Fundamentals</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Attention Consistency</span>
                    <Badge className="bg-fundamentals-attention-consistency text-white">85%</Badge>
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
            Difficulty: {getDifficultyName(difficulty)}
          </Badge>
        </div>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{currentQuestion + 1} of {totalQuestions}</span>
            </div>
            <Progress value={getProgressPercentage()} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Question Card */}
      <Card className="min-h-[400px]">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <span>Question {currentQuestion + 1}</span>
            <Badge className="bg-primary text-white">
              {currentQuestionData.tags[0]}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-lg font-medium leading-relaxed">
            {currentQuestionData.question_text}
          </div>

          {!showResult && (
            <Button
              onClick={handleHintClick}
              variant="outline"
              size="sm"
              disabled={hintLevel >= 2}
              className="w-full sm:w-auto"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              {hintLevel === 0 ? "Get Hint" : hintLevel === 1 ? "Show Solution" : "Solution Shown"}
            </Button>
          )}

          {hintLevel > 0 && !showResult && (
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg space-y-2">
              <div className="flex items-start space-x-2">
                <Lightbulb className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">
                    {hintLevel === 1 ? "Hint:" : "Solution:"}
                  </p>
                  <p className="text-sm mt-1">
                    {hintLevel === 1 
                      ? currentQuestionData.hint 
                      : currentQuestionData.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {showResult && !selectedAnswer && selectedAnswer !== 0 && (
            <div className="p-4 bg-muted border border-border rounded-lg">
              <p className="font-semibold text-sm mb-2">Solution:</p>
              <p className="text-sm">{currentQuestionData.explanation}</p>
            </div>
          )}

          <div className="space-y-3">
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
                  className={`w-full p-4 h-auto text-left justify-start ${
                    showResult
                      ? index === correctAnswerIndex
                        ? "bg-success hover:bg-success text-white"
                        : index === selectedAnswer && index !== correctAnswerIndex
                        ? "bg-destructive hover:bg-destructive text-white"
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
                    {showResult && index === correctAnswerIndex && (
                      <CheckCircle className="h-5 w-5" />
                    )}
                    {showResult && index === selectedAnswer && index !== correctAnswerIndex && (
                      <XCircle className="h-5 w-5" />
                    )}
                  </div>
                </Button>
              );
            })}
          </div>

          {showResult && selectedAnswer !== null && selectedAnswer !== currentQuestionData.answer.charCodeAt(0) - 97 && (
            <div className="p-4 bg-muted border border-border rounded-lg">
              <p className="font-semibold text-sm mb-2">Solution:</p>
              <p className="text-sm">{currentQuestionData.explanation}</p>
            </div>
          )}

          {!showResult && (
            <Button 
              onClick={handleNextQuestion} 
              disabled={selectedAnswer === null}
              className="w-full"
              size="lg"
            >
              {currentQuestion === totalQuestions - 1 ? "Complete Assessment" : "Next Question"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentInterface;