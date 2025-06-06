// src/pages/MbtiTestPage.tsx
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'; // CardFooter used for buttons
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from "@/components/ui/progress";
import { 
    Loader2, RefreshCcw, ChevronRight, ChevronLeft, 
    AlertTriangle, FileQuestion, Lightbulb, Quote, Brain as BrainIcon, Check // Added Check back for radio button
} from 'lucide-react';
import { getShuffledQuestions } from '@/data/mbtiQuestions';
import type { MbtiQuestion, MbtiDimensionValue } from '@/data/mbtiQuestions';
import { useNavigate } from 'react-router-dom';

type Answers = Record<number, MbtiDimensionValue>;
type AnimationAction = 'next' | 'prev';

const inspirationalQuotes = [
    "Knowing yourself is the beginning of all wisdom. - Aristotle",
    "The only journey is the one within. - Rainer Maria Rilke",
    "To find yourself, think for yourself. - Socrates",
    "Understanding your personality can unlock new paths to growth.",
    "Every answer brings you closer to a deeper self-understanding."
];

const MbtiTestPage: React.FC = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<MbtiQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [animateOutDirection, setAnimateOutDirection] = useState<AnimationAction | null>(null);
  const lastActionRef = useRef<AnimationAction | null>(null);
  const [currentQuote, setCurrentQuote] = useState(inspirationalQuotes[0]);

  const loadQuestionsAndReset = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setAnswers({});
    setCurrentQuestionIndex(0);
    setAnimateOutDirection(null);
    lastActionRef.current = null;
    try {
      const shuffledQuestions = getShuffledQuestions();
      setQuestions(shuffledQuestions);
      if (shuffledQuestions.length === 0) {
        setError("No questions could be loaded. Please try again.");
      }
    } catch (e) {
      setError("Failed to load questions due to an error.");
      console.error("Error loading questions:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQuestionsAndReset();
  }, [loadQuestionsAndReset]);
  
  useEffect(() => {
    if (questions.length > 0) {
        const quoteIndex = Math.floor(currentQuestionIndex / 5) % inspirationalQuotes.length;
        setCurrentQuote(inspirationalQuotes[quoteIndex]);
    }
  }, [currentQuestionIndex, questions.length]);


  const currentQuestion = useMemo(() => questions[currentQuestionIndex] || null, [questions, currentQuestionIndex]);

  const handleAnswerSelect = useCallback((questionId: number, value: MbtiDimensionValue) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
            triggerQuestionChange('next');
        }
    }, 300);

  }, [currentQuestionIndex, questions.length]); // Added dependencies (triggerQuestionChange not needed as it's stable)

  const selectedAnswerForCurrentQuestion = useMemo(() => {
    return currentQuestion ? answers[currentQuestion.id] : undefined;
  }, [currentQuestion, answers]);

  const calculateMbtiResultAndNavigate = useCallback(() => {
    if (Object.keys(answers).length !== questions.length && questions.length > 0) {
      console.error("Attempted to calculate results before all questions were answered.");
      alert("Please answer all questions before finishing the test.");
      return;
    }
    const counts: Record<MbtiDimensionValue, number> = { E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0 };
    Object.values(answers).forEach(val => { if(counts[val] !== undefined) counts[val]++; });
    let resultType = "";
    resultType += counts.E >= counts.I ? 'E' : 'I';
    resultType += counts.S >= counts.N ? 'S' : 'N';
    resultType += counts.T >= counts.F ? 'T' : 'F';
    resultType += counts.J >= counts.P ? 'J' : 'P';
    const questionsPerDimension = {
      EI: questions.filter(q=>q.options.some(o=>o.value==='E'||o.value==='I')).length,
      SN: questions.filter(q=>q.options.some(o=>o.value==='S'||o.value==='N')).length,
      TF: questions.filter(q=>q.options.some(o=>o.value==='T'||o.value==='F')).length,
      JP: questions.filter(q=>q.options.some(o=>o.value==='J'||o.value==='P')).length,
    };
    navigate(`/results/${resultType}`, { state: { counts, questionsPerDimension, userAnswers: answers } });
  }, [answers, questions, navigate]);

  const triggerQuestionChange = (action: AnimationAction) => {
    lastActionRef.current = action;
    setAnimateOutDirection(action);

    setTimeout(() => {
      if (action === 'next') {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // This case is handled by handleNextOrFinish calling calculateMbtiResultAndNavigate directly
        }
      } else if (action === 'prev') {
        if (currentQuestionIndex > 0) {
          setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
      }
      setAnimateOutDirection(null);
    }, 350); 
  };

  const handleNextOrFinish = () => {
    if (!selectedAnswerForCurrentQuestion) {
        alert("Please select an answer."); 
        return;
    }
    if (currentQuestionIndex < questions.length - 1) {
        triggerQuestionChange('next');
    } else {
        calculateMbtiResultAndNavigate();
    }
  };
  
  const handlePreviousQuestion = () => triggerQuestionChange('prev');

  const progressPercentage = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  const cardAnimationClass = useMemo(() => {
    if (animateOutDirection === 'next') return 'animate-slide-out-left';
    if (animateOutDirection === 'prev') return 'animate-slide-out-right';
    if (lastActionRef.current === 'next') return 'animate-slide-in-right';
    if (lastActionRef.current === 'prev') return 'animate-slide-in-left';
    return 'animate-fade-in';
  }, [animateOutDirection, currentQuestionIndex]);


  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-sky-950 text-slate-100 p-4">
        <Loader2 className="h-20 w-20 animate-spin text-sky-400" />
        <p className="mt-8 text-2xl font-semibold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-400">
          Preparing Your Test...
        </p>
      </div>
    );
  }

  if (error || (!isLoading && !currentQuestion && questions.length > 0)) {
    const Icon = error ? AlertTriangle : FileQuestion;
    const title = error ? "An Unexpected Detour" : "The Path is Unclear";
    const message = error || "We couldn't load the questions for the test. Please try again.";
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-sky-950 text-slate-100 p-6 text-center">
        <Icon className={`h-24 w-24 mb-8 ${error ? 'text-red-400' : 'text-slate-500'}`} />
        <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-400">{title}</h2>
        <p className="text-xl text-slate-300 mb-10 max-w-lg">{message}</p>
        <Button onClick={loadQuestionsAndReset} size="lg" className="bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white text-xl px-10 py-4 rounded-lg shadow-lg hover:shadow-sky-500/50 transform hover:scale-105 transition-all">
          <RefreshCcw className="mr-3 h-6 w-6" /> Retry
        </Button>
      </div>
    );
  }
  if (!isLoading && questions.length === 0 && !error) { 
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-sky-950 text-slate-100 p-6 text-center">
        <FileQuestion className="h-24 w-24 mb-8 text-slate-500" />
        <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-cyan-400">No Questions Available</h2>
        <p className="text-xl text-slate-300 mb-10 max-w-lg">It seems we couldn't load any questions for the test at this moment.</p>
        <Button onClick={loadQuestionsAndReset} size="lg" className="bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-700 hover:to-cyan-700 text-white text-xl px-10 py-4 rounded-lg shadow-lg hover:shadow-sky-500/50 transform hover:scale-105 transition-all">
          <RefreshCcw className="mr-3 h-6 w-6" /> Try Reloading
        </Button>
      </div>
    );
  }
  if (!currentQuestion) { 
      return (
          <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-blue-950 to-sky-950 text-slate-100 p-4">
              <p>Loading question data...</p> {/* Should be brief if ever shown */}
          </div>
      );
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden
                   bg-[radial-gradient(circle_at_center_1px,rgba(255,255,255,0.03)_1px,transparent_0)] [background-size:32px_32px]">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/90 to-sky-950/80 opacity-90 -z-10"></div>
      
      <header className="w-full py-6 px-4 sm:px-8 text-center sticky top-0 z-20 bg-slate-950/80 backdrop-blur-md shadow-lg">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
                <BrainIcon className="h-8 w-8 text-cyan-400 mr-3" />
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300">
                    Personality Discovery
                </h1>
            </div>
            <div className="text-right">
                <p className="text-xs sm:text-sm text-slate-400">
                    Question <span className="font-bold text-slate-200">{currentQuestionIndex + 1}</span> of <span className="font-bold text-slate-200">{questions.length}</span>
                </p>
                <Progress 
                    value={progressPercentage} 
                    className="w-32 sm:w-40 h-1.5 mt-1 bg-slate-500/80 rounded-full overflow-hidden"
                />
            </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 flex flex-col lg:flex-row gap-8 xl:gap-12 items-start">
        <aside className="hidden lg:block w-full lg:w-1/3 xl:w-1/4 space-y-8 sticky top-32">
          <Card className="bg-slate-800/50 border border-slate-700/50 backdrop-blur-md shadow-xl">
            <CardHeader>
              <CardTitle className="text-xl text-sky-300 flex items-center">
                <Lightbulb className="h-6 w-6 mr-2 text-yellow-400" />
                A Moment of Insight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <blockquote className="text-slate-300 italic border-l-4 border-sky-500 pl-4 py-2">
                <Quote className="h-5 w-5 text-slate-500 inline -mt-1 mr-1" />
                {currentQuote}
              </blockquote>
            </CardContent>
          </Card>
          <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-700/40 text-center">
            <p className="text-sm text-slate-400">Your progress is saved automatically. Feel free to reflect on each choice.</p>
          </div>
        </aside>

        <div className="w-full lg:w-2/3 xl:w-3/4 flex-grow flex flex-col items-center">
          <Card 
            key={`q-card-${currentQuestion.id}`}
            className={`w-full max-w-2xl xl:max-w-3xl bg-slate-800/70 border-2 border-slate-700/70 
                        shadow-2xl shadow-sky-900/50 backdrop-blur-xl rounded-2xl 
                        relative min-h-[450px] sm:min-h-[500px] ${cardAnimationClass}
                        flex flex-col justify-between`}
          >
            <div> 
              <CardHeader className="p-6 sm:p-8 border-b border-slate-700/50">
                <div className="min-h-[6rem] sm:min-h-[7rem] max-h-[12rem] sm:max-h-[14rem] overflow-y-auto pr-2 custom-scrollbar">
                  <CardTitle className="text-2xl sm:text-3xl font-semibold text-slate-50 leading-snug sm:leading-normal tracking-tight">
                    {currentQuestion.text}
                  </CardTitle>
                </div>
                <CardDescription className="mt-4 text-slate-400 text-sm sm:text-base">
                  Choose the option that feels most natural to you.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 sm:p-8">
                <RadioGroup
                  key={`rg-${currentQuestion.id}`} 
                  value={selectedAnswerForCurrentQuestion || ''}
                  onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value as MbtiDimensionValue)}
                  className="space-y-4 sm:space-y-5"
                >
                  {currentQuestion.options.map((option, index) => (
                    <Label
                      key={`option-label-${currentQuestion.id}-${index}`}
                      htmlFor={`option-item-${currentQuestion.id}-${index}`}
                      className={`group relative flex items-center p-4 sm:p-5 rounded-xl border-2  cursor-pointer 
                                  transition-all duration-300 ease-in-out transform hover:scale-[1.02]
                                  ${selectedAnswerForCurrentQuestion === option.value 
                                      ? 'border-sky-400 bg-sky-500/20 shadow-lg shadow-sky-500/20 ring-2 ring-sky-400' 
                                      : 'border-slate-600 bg-slate-700/40 hover:border-sky-500 hover:bg-slate-600/60'}`}
                    >
                      <RadioGroupItem
                        value={option.value}
                        id={`option-item-${currentQuestion.id}-${index}`}
                        className="absolute opacity-0 w-0 h-0 peer"
                      />
                      <div className="flex-1 text-base sm:text-lg text-slate-100 leading-relaxed pr-10">{option.text}</div>
                      <div className={`h-6 w-6 sm:h-7 sm:w-7 rounded-full border-2 flex items-center justify-center flex-shrink-0
                                      transition-all duration-300
                                      ${selectedAnswerForCurrentQuestion === option.value 
                                          ? 'border-sky-300 bg-sky-500' 
                                          : 'border-slate-500 bg-slate-600 group-hover:border-sky-400'}`}>
                        {selectedAnswerForCurrentQuestion === option.value && <Check className="h-4 w-4 text-white" />}
                      </div>
                    </Label>
                  ))}
                </RadioGroup>
              </CardContent>
            </div>

            <CardFooter className="p-6 sm:p-8 border-t border-slate-700/50 mt-auto">
                <div className="w-full flex justify-between items-center">
                    <Button
                        onClick={handlePreviousQuestion}
                        variant="outline"
                        size="lg"
                        className="border-sky-500/40 text-sky-300 hover:bg-sky-500/10 hover:text-sky-200 hover:border-sky-500/70
                                disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent
                                py-3 px-6 text-base sm:text-lg rounded-lg shadow-md"
                        disabled={currentQuestionIndex === 0 || !!animateOutDirection}
                    >
                        <ChevronLeft className="mr-2 h-5 w-5" />
                        Back
                    </Button>
                    <Button
                        onClick={handleNextOrFinish}
                        size="lg"
                        className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600
                                text-white font-bold group py-3 px-6 text-base sm:text-lg rounded-lg shadow-lg hover:shadow-cyan-500/50
                                disabled:opacity-50 disabled:cursor-not-allowed
                                transition-all duration-300 transform hover:scale-105"
                        disabled={!selectedAnswerForCurrentQuestion || !!animateOutDirection}
                    >
                        {currentQuestionIndex === questions.length - 1 ? 'Finish & See Results' : 'Next'}
                        <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                </div>
            </CardFooter>
          </Card>
        </div>
      </main>

      <footer className="w-full py-6 px-4 sm:px-8 text-center">
        <p className="text-xs text-slate-500/80">
          This journey is about self-reflection. Your honest answers pave the way to genuine insight.
        </p>
      </footer>
    </div>
  );
};

export default MbtiTestPage;