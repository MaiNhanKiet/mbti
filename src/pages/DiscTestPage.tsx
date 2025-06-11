// src/pages/DiscTestPage.tsx
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { 
    Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { 
    Loader2, RefreshCcw, AlertTriangle, FileQuestion, Check, Sparkles, 
    ThumbsUp, ThumbsDown, ChevronRight, ChevronLeft, PieChart as DiscIcon, Info
} from 'lucide-react'; // All these will now be used
import { getDiscQuestions } from '@/data/discQuestions';
import type { DiscQuestionSet, DiscOption, DiscDimension } from '@/data/discQuestions';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface DiscAnswer {
  most: DiscOption | null;
  least: DiscOption | null;
}
type DiscAnswers = Record<number, DiscAnswer>;
type AnimationAction = 'next' | 'prev';

const DiscTestPage: React.FC = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<DiscQuestionSet[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<DiscAnswers>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [animateOutDirection, setAnimateOutDirection] = useState<AnimationAction | null>(null);
  const lastActionRef = useRef<AnimationAction | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);

  const loadQuestionsAndReset = useCallback(() => {
    setIsLoading(true); setError(null); setAnswers({}); setCurrentQuestionIndex(0);
    setAnimateOutDirection(null); lastActionRef.current = null;
    try {
      const allQuestions = getDiscQuestions(); 
      setQuestions(allQuestions);
      if (allQuestions.length === 0) {
        setError("No DISC questions could be loaded. Please try again later.");
      }
    } catch (e) {
      setError("Failed to load DISC questions due to an unexpected error.");
      console.error("Error loading DISC questions:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadQuestionsAndReset();
  }, [loadQuestionsAndReset]);

  const currentQuestionSet = useMemo(() => questions[currentQuestionIndex] || null, [questions, currentQuestionIndex]);
  const currentAnswersForSet = useMemo(() => currentQuestionSet ? answers[currentQuestionSet.id] || { most: null, least: null } : { most: null, least: null }, [currentQuestionSet, answers]);

  const handleSelect = useCallback((questionId: number, option: DiscOption, type: 'most' | 'least') => {
    setAnswers(prev => {
      const existingSelections = prev[questionId] || { most: null, least: null };
      let newMost = existingSelections.most;
      let newLeast = existingSelections.least;
      if (type === 'most') {
        newMost = (existingSelections.most?.text === option.text) ? null : option; 
        if (newMost && existingSelections.least?.text === option.text) newLeast = null; 
      } else { 
        newLeast = (existingSelections.least?.text === option.text) ? null : option; 
        if (newLeast && existingSelections.most?.text === option.text) newMost = null; 
      }
      return { ...prev, [questionId]: { most: newMost, least: newLeast } };
    });
  }, []);

  const calculateDiscResultAndNavigate = useCallback(() => {
    const allAnsweredCount = Object.values(answers).filter(ans => ans.most && ans.least).length;
    if (allAnsweredCount !== questions.length && questions.length > 0) {
      alert("Please select one 'Most' and one 'Least' for every question set before finishing.");
      return;
    }
    const scores: Record<DiscDimension, number> = { D: 0, I: 0, S: 0, C: 0 };
    Object.values(answers).forEach(answerSet => { if (answerSet.most) scores[answerSet.most.mostDimension]++; });
    const sortedScores = (Object.entries(scores) as [DiscDimension, number][]).sort(([,a],[,b])=>b-a);
    let profileString = sortedScores[0]?.[0] || "Balanced"; 
    if (sortedScores[1] && sortedScores[0][1]>0 && sortedScores[1][1]>0 && (sortedScores[0][1]-sortedScores[1][1]<=2)) profileString += `-${sortedScores[1][0]}`;
    navigate(`/disc/results/${profileString}`, { state: { scores, userAnswers: answers, totalQuestionsPerType: questions.length } });
  }, [answers, questions, navigate]);

  const triggerQuestionChange = (action: AnimationAction) => {
    lastActionRef.current = action; setAnimateOutDirection(action);
    setTimeout(() => {
      if (action === 'next') { if (currentQuestionIndex < questions.length - 1) setCurrentQuestionIndex(p => p + 1); }
      else if (action === 'prev') { if (currentQuestionIndex > 0) setCurrentQuestionIndex(p => p - 1); }
      setAnimateOutDirection(null); 
    }, 350); 
  };
  
  const handleNextOrFinish = () => {
    if (!currentAnswersForSet?.most || !currentAnswersForSet?.least) { alert("Please select one 'Most' and one 'Least' descriptor for this set."); return; }
    if (currentQuestionIndex < questions.length - 1) triggerQuestionChange('next'); else calculateDiscResultAndNavigate();
  };
  const handlePreviousQuestion = () => { if (currentQuestionIndex > 0) triggerQuestionChange('prev'); };

  const progressPercentage = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;
  const cardAnimationClass = useMemo(() => {
    if (animateOutDirection === 'next') return 'animate-slide-out-left';
    if (animateOutDirection === 'prev') return 'animate-slide-out-right';
    if (lastActionRef.current === 'next') return 'animate-slide-in-right';
    if (lastActionRef.current === 'prev') return 'animate-slide-in-left';
    return 'animate-fade-in';
  }, [animateOutDirection]);

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-emerald-950 to-green-950 text-slate-100 p-4">
        <Loader2 className="h-20 w-20 animate-spin text-emerald-400" />
        <p className="mt-8 text-2xl font-semibold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-400">
          Preparing DISC Assessment...
        </p>
      </div>
    );
  }

  // --- Error State ---
  if (error) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-emerald-950 to-green-950 text-slate-100 p-6 text-center">
        <AlertTriangle className="h-24 w-24 mb-8 text-red-400 animate-pulse" /> {/* Used AlertTriangle */}
        <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">An Error Occurred</h2>
        <p className="text-xl text-slate-300 mb-10 max-w-lg">{error}</p>
        <Button onClick={loadQuestionsAndReset} size="lg" className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-xl px-10 py-4 rounded-lg shadow-lg hover:shadow-emerald-500/50 transform hover:scale-105 transition-all">
          <RefreshCcw className="mr-3 h-6 w-6" /> Try Again {/* Used RefreshCcw */}
        </Button>
      </div>
    );
  }
  
  // --- No Questions Loaded State (but no explicit error string) ---
  if (!isLoading && questions.length === 0) { 
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-emerald-950 to-green-950 text-slate-100 p-6 text-center">
        <FileQuestion className="h-24 w-24 mb-8 text-slate-500" /> {/* Used FileQuestion */}
        <h2 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-green-400">No Questions Available</h2>
        <p className="text-xl text-slate-300 mb-10 max-w-lg">It seems we couldn't load any questions for the DISC test at this moment.</p>
        <Button onClick={loadQuestionsAndReset} size="lg" className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-xl px-10 py-4 rounded-lg shadow-lg hover:shadow-emerald-500/50 transform hover:scale-105 transition-all">
          <RefreshCcw className="mr-3 h-6 w-6" /> Try Reloading {/* Used RefreshCcw */}
        </Button>
      </div>
    );
  }
  
  // --- Current Question Set not available (should be rare if above logic is correct) ---
  if (!currentQuestionSet) { 
      return (
          <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-emerald-950 to-green-950 text-slate-100 p-4">
              <Loader2 className="h-12 w-12 animate-spin text-emerald-400" /> {/* Used Loader2 */}
              <p className="mt-4">Loading current question data...</p>
          </div>
      );
  }

  const handleInstructionsClose = () => {
    setShowInstructions(false);
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-950 text-slate-50 overflow-hidden
                   bg-cover bg-center bg-no-repeat"
         style={{backgroundImage: "url('/images/backgrounds/abstract-green-geo.jpg')"}}
    >
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm z-0"></div>

      <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
        <DialogContent className="bg-slate-800/95 backdrop-blur-lg border-slate-700 text-slate-100 max-w-lg shadow-2xl rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-emerald-300 flex items-center">
              <Info className="h-7 w-7 mr-3 text-emerald-400" />
              Hướng Dẫn Làm Bài Test DISC
            </DialogTitle>
            <DialogDescription className="text-slate-300 pt-2 text-left text-base">
              Chào mừng bạn đến với bài đánh giá DISC!
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-3 text-slate-200 text-sm sm:text-base leading-relaxed custom-scrollbar max-h-[60vh] overflow-y-auto pr-3">
            <p>Hãy tưởng tượng bạn đang ở <strong className="text-emerald-400">nơi làm việc</strong> và các lựa chọn mô tả đặc điểm của bạn trong môi trường đó.</p>
            <p>Trong mỗi nhóm gồm 4 cụm từ, hãy <strong className="text-yellow-300">CHỌN DUY NHẤT 2 CỤM TỪ</strong> theo nguyên tắc sau:</p>
            <ul className="list-none space-y-3 mt-3 pl-1">
              <li className="flex items-start"><ThumbsUp className="h-6 w-6 text-green-400 mr-3 mt-1 shrink-0" /><div>Cụm từ nào <strong className="text-green-300">GIỐNG BẠN NHẤT</strong> khi làm việc? <br/> <span className="text-xs text-slate-400">(Nhấn nút "Most" tương ứng)</span></div></li>
              <li className="flex items-start"><ThumbsDown className="h-6 w-6 text-red-400 mr-3 mt-1 shrink-0" /><div>Cụm từ nào <strong className="text-red-300">ÍT GIỐNG BẠN NHẤT</strong> khi làm việc? <br/> <span className="text-xs text-slate-400">(Nhấn nút "Least" tương ứng)</span></div></li>
            </ul>
            <p className="font-semibold text-slate-100 pt-2">Quan trọng: Mỗi cụm từ chỉ có thể được chọn là MOST hoặc LEAST, không thể là cả hai.</p>
            <p className="text-sky-300">Để đảm bảo kết quả phản ánh đúng nhất, vui lòng hoàn thành tất cả {questions.length} nhóm từ này trong khoảng 7-10 phút.</p>
          </div>
          <DialogFooter className="sm:justify-center pt-5">
            <Button onClick={handleInstructionsClose} className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold px-8 py-3 text-lg rounded-md"><Check className="mr-2 h-5 w-5"/> Đã hiểu, bắt đầu!</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <header className="w-full py-5 px-4 sm:px-8 sticky top-0 z-20 bg-slate-950/80 backdrop-blur-lg shadow-2xl shadow-black/40 border-b border-slate-800/50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
            <div className="flex items-center">
                <DiscIcon className="h-9 w-9 text-emerald-400 mr-3 drop-shadow-lg" />
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-green-300 to-lime-300">
                    DISC Behavioral Assessment
                </h1>
            </div>
            <div className="text-right flex flex-col items-end">
                <p className="text-xs sm:text-sm text-slate-300 mb-0.5">
                    Set <span className="font-bold text-slate-50 text-sm sm:text-base">{currentQuestionIndex + 1}</span> / {questions.length}
                </p>
                <Progress 
                    value={progressPercentage} 
                    className="w-28 sm:w-36 h-2.5 bg-slate-700/50 rounded-full overflow-hidden shadow-inner shadow-black/30
                               [&_[role='progressbar']]:bg-gradient-to-r 
                               [&_[role='progressbar']]:from-emerald-400 
                               [&_[role='progressbar']]:to-green-500
                               [&_[role='progressbar']]:transition-all 
                               [&_[role='progressbar']]:duration-500 
                               [&_[role='progressbar']]:ease-out"
                />
            </div>
        </div>
      </header>

      <main className="flex-grow w-full max-w-4xl xl:max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 flex flex-col items-center justify-center -mt-5">
        <Card 
            key={`disc-q-card-${currentQuestionSet.id}`}
            className={`w-full bg-slate-800/70 border-2 border-slate-700/70 
                        shadow-2xl shadow-emerald-900/50 backdrop-blur-xl rounded-2xl 
                        relative ${cardAnimationClass}
                        flex flex-col justify-between min-h-[600px] sm:min-h-[650px] md:min-h-[700px] max-h-[830px]`}
        >
            <div className="absolute w-full -top-px left-0 h-2 bg-gradient-to-r from-emerald-500 via-green-400 to-lime-400 animate-pulse-fast rounded-t-3xl"></div>
            <div>
                <CardHeader className="p-6 py-8 sm:p-10 text-center">
                    <div className="mb-6 flex justify-center items-center space-x-3">
                        <Sparkles className="h-8 w-8 text-yellow-400/80" />
                        <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-200 leading-tight tracking-tight">
                            Choose Your Descriptors
                        </CardTitle>
                        <Sparkles className="h-8 w-8 text-yellow-400/80" />
                    </div>
                    <CardDescription className="text-slate-200 text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
                        From the set below, pick one descriptor that is <strong className="text-green-300 font-semibold px-1 py-0.5 rounded bg-green-600/30">MOST</strong> like you,
                        and one that is <strong className="text-red-300 font-semibold px-1 py-0.5 rounded bg-red-600/30">LEAST</strong> like you in a work context.
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 md:p-8 -mt-7">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6">
                        {currentQuestionSet.options.map((option) => {
                            const isMostSelected = currentAnswersForSet?.most?.text === option.text;
                            const isLeastSelected = currentAnswersForSet?.least?.text === option.text;
                            
                            const isButtonDisabled = (type: 'most' | 'least') => {
                                if (type === 'most' && isLeastSelected) return true;
                                if (type === 'least' && isMostSelected) return true;
                                return false;
                            };

                            return (
                                <div 
                                    key={option.text} 
                                    className={cn(
                                        "p-6 rounded-xl border-2 transition-all duration-300 ease-in-out cursor-default min-h-[150px] sm:min-h-[170px] flex flex-col justify-between items-center text-center transform hover:scale-[1.02] hover:shadow-2xl",
                                        isMostSelected ? "bg-green-500/25 border-green-400 ring-4 ring-green-300/70 shadow-xl shadow-green-500/30" :
                                        isLeastSelected ? "bg-red-500/25 border-red-400 ring-4 ring-red-300/70 shadow-xl shadow-red-500/30" :
                                        "bg-slate-700/60 border-slate-600 hover:border-slate-400 hover:bg-slate-700/80"
                                    )}
                                >
                                    <p className="text-xl md:text-2xl font-semibold text-slate-50 mb-4 flex-grow flex items-center justify-center px-2">{option.text}</p>
                                    <div className="flex space-x-3 w-full justify-around mt-auto pt-4 border-t border-slate-600/40">
                                        <Button
                                            size="default" 
                                            variant="ghost" 
                                            onClick={() => handleSelect(currentQuestionSet.id, option, 'most')}
                                            disabled={isButtonDisabled('most')}
                                            className={cn(
                                                "flex-1 font-semibold rounded-md px-4 py-2.5 transition-all text-sm sm:text-base", // Increased py
                                                "border-2 border-transparent",
                                                isMostSelected 
                                                    ? "bg-green-500 text-white shadow-md hover:bg-green-600 border-green-300" 
                                                    : `text-green-300 hover:bg-green-500/20 hover:text-green-200 border-green-500/50 disabled:opacity-40 disabled:hover:bg-transparent disabled:text-green-500/50`,
                                                isLeastSelected && "opacity-30 cursor-not-allowed"
                                            )}
                                        >
                                            <ThumbsUp className="mr-2 h-5 w-5"/> Most
                                        </Button>
                                        <Button
                                            size="default"
                                            variant="ghost" 
                                            onClick={() => handleSelect(currentQuestionSet.id, option, 'least')}
                                            disabled={isButtonDisabled('least')}
                                            className={cn(
                                                "flex-1 font-semibold rounded-md px-4 py-2.5 transition-all text-sm sm:text-base", // Increased py
                                                "border-2 border-transparent",
                                                isLeastSelected 
                                                    ? "bg-red-500 text-white shadow-md hover:bg-red-600 border-red-300" 
                                                    : `text-red-300 hover:bg-red-500/20 hover:text-red-200 border-red-500/50 disabled:opacity-40 disabled:hover:bg-transparent disabled:text-red-500/50`,
                                                isMostSelected && "opacity-30 cursor-not-allowed"
                                            )}
                                        >
                                            <ThumbsDown className="mr-2 h-5 w-5"/> Least
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </div>
            <CardFooter className="sm:p-8 border-t-2 border-slate-700/50 -mt-4">
                 <div className="w-full flex justify-between items-center -mb-7">
                    <Button
                        onClick={handlePreviousQuestion}
                        variant="outline"
                        size="lg"
                        className="border-emerald-500/50 text-emerald-600 hover:bg-emerald-500/20 hover:text-emerald-200 hover:border-emerald-400
                                disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-emerald-300/50
                                py-3.5 px-8 text-lg rounded-lg shadow-md hover:shadow-emerald-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
                        disabled={currentQuestionIndex === 0 || !!animateOutDirection}
                    >
                        <ChevronLeft className="mr-2 h-5 w-5" />
                        Back
                    </Button>
                    <Button
                        onClick={handleNextOrFinish}
                        size="lg"
                        className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700
                                text-white font-bold group py-3.5 px-8 text-lg rounded-lg shadow-xl hover:shadow-green-500/50
                                disabled:opacity-60 disabled:cursor-not-allowed
                                transition-all duration-300 transform hover:scale-105 active:scale-95"
                        disabled={!currentAnswersForSet?.most || !currentAnswersForSet?.least || !!animateOutDirection}
                    >
                        {currentQuestionIndex === questions.length - 1 ? 'Finish & See Profile' : 'Next Set'}
                        <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>
            </CardFooter>
        </Card>
        <footer className="absolute w-full py-8 px-4 sm:px-8 text-center pb-5 bottom-0">
          <p className="text-xs text-slate-500/80">
            Choose one "Most" and one "Least" for each set of descriptors. Your intuitive choices are often the most accurate.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default DiscTestPage;