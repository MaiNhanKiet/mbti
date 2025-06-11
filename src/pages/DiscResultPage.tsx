// src/pages/DiscResultsPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    Home, RotateCcw, ShieldAlert, BarChartHorizontalBig, TrendingUp, TrendingDown, 
    MessageSquareText, CheckCircle, Loader2, Award as AwardIcon
} from 'lucide-react'; 
import * as LucideReact from 'lucide-react'; 

import { discStylesData } from '@/data/discStyles'; 
import type { DiscStyleInfo } from '@/data/discStyles';
import type { DiscDimension } from '@/data/discQuestions';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils'; // Assuming you have this from ShadCN

// Reusable AnimatedSection component
const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string; delay?: string }> = ({ children, className, delay = 'delay-0' }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: '-100px 0px' });
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${delay} ${className ?? ''} ${inView ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-10 blur-sm'}`}>
      {children}
    </div>
  );
};

// Helper to get style details
const getStyleDetails = (styleId: DiscDimension): DiscStyleInfo | undefined => {
  return discStylesData.find(s => s.id === styleId);
};

interface ScoreBarProps {
  score: number;
  maxScore: number; 
  styleInfo?: DiscStyleInfo;
}

const ScoreBar: React.FC<ScoreBarProps> = ({ score, maxScore, styleInfo }) => {
  const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0;
  const StyleIcon = styleInfo?.icon || LucideReact.HelpCircle;

  return (
    <div className="mb-5 group">
      <div className="flex justify-between items-center mb-1.5">
        <div className="flex items-center">
          <StyleIcon className={cn('w-5 h-5 mr-2.5 transition-colors duration-300', styleInfo?.textColorClass, 'group-hover:' + styleInfo?.lightTextColorClass)} />
          <span className={cn('text-md font-semibold transition-colors duration-300', styleInfo?.textColorClass, 'group-hover:' + styleInfo?.lightTextColorClass)}>{styleInfo?.name || 'Unknown'}</span>
        </div>
        <span className={cn('text-sm font-bold transition-colors duration-300', styleInfo?.lightTextColorClass, 'group-hover:' + styleInfo?.textColorClass)}>{score} / {maxScore}</span>
      </div>
      <div className={`h-4 w-full bg-slate-700/60 rounded-full overflow-hidden shadow-inner relative`}>
        <div
          style={{ width: `${percentage}%` }}
          className={`h-full rounded-full bg-gradient-to-r ${styleInfo?.gradientFromClass} ${styleInfo?.gradientToClass} transition-all duration-1000 ease-out`}
        />
      </div>
    </div>
  );
};

// Reusable Section Card for consistent styling - with iconColorClass added
const SectionCard: React.FC<{title: string; icon: React.ElementType; children: React.ReactNode; className?: string; titleColorClass?: string; iconColorClass?: string}> = 
({ title, icon: Icon, children, className, titleColorClass = "text-emerald-300", iconColorClass }) => (
    <AnimatedSection className={`mb-10 sm:mb-12 ${className}`}>
        <Card className="bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
            <CardHeader className="border-b border-slate-700/50 p-6 bg-slate-800/40">
                <CardTitle className={`text-2xl sm:text-3xl font-bold flex items-center ${titleColorClass}`}>
                    <Icon className={`h-7 w-7 sm:h-8 sm:w-8 mr-4 shrink-0 ${iconColorClass || titleColorClass.replace('text-','text-').replace(/-\d+$/, '-400')}`} />
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 text-slate-200/90 text-md sm:text-lg leading-relaxed space-y-4">
                {children}
            </CardContent>
        </Card>
    </AnimatedSection>
);


const DiscResultsPage: React.FC = () => {
  const { discProfile } = useParams<{ discProfile: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [primaryStyle, setPrimaryStyle] = useState<DiscStyleInfo | null>(null);
  const [secondaryStyle, setSecondaryStyle] = useState<DiscStyleInfo | null>(null);
  const [allScores, setAllScores] = useState<Record<DiscDimension, number> | null>(null);
  const [maxPossibleScore, setMaxPossibleScore] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (location.state?.scores && location.state?.totalQuestionsPerType !== undefined) {
      const scores = location.state.scores as Record<DiscDimension, number>;
      const totalSets = location.state.totalQuestionsPerType as number; 
      
      setAllScores(scores);
      setMaxPossibleScore(totalSets); 

      if (discProfile) {
        const profileIds = discProfile.split('-') as DiscDimension[];
        const primary = getStyleDetails(profileIds[0]);
        
        if (primary) {
            setPrimaryStyle(primary);
            document.title = `Your DISC Profile: ${primary.name} (${primary.id})`;
            if (profileIds[1]) {
                const secondary = getStyleDetails(profileIds[1]);
                setSecondaryStyle(secondary || null);
                if (secondary) document.title = `Your DISC Profile: ${primary.name}/${secondary.name} (${primary.id}/${profileIds[1]})`;
            } else setSecondaryStyle(null);
        } else {
            console.error("Primary DISC style details not found for:", profileIds[0]);
            setPrimaryStyle(null);
            document.title = 'DISC Result Error';
        }
      } else {
        setPrimaryStyle(null); 
        document.title = 'DISC Result';
      }
    } else {
      console.warn("State with DISC scores or totalQuestionsPerType not found. This might happen on direct navigation/refresh.");
      setPrimaryStyle(null); 
    }
    setIsLoading(false);
    return () => { document.title = 'DISC Assessment'; };
  }, [discProfile, location.state, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-emerald-950 to-green-950 text-slate-100 p-4">
        <Loader2 className="h-20 w-20 animate-spin text-emerald-400" />
        <p className="mt-8 text-2xl font-semibold tracking-wide">Loading Your DISC Profile...</p>
      </div>
    );
  }

  if (!primaryStyle || !allScores) { 
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-emerald-950 to-green-950 text-slate-100 p-6 text-center">
        <ShieldAlert size={80} className="text-red-400 mb-8 animate-pulse" />
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">Profile Data Incomplete</h1>
        <p className="text-xl text-slate-300 mb-10 max-w-md">
          We couldn't load all the necessary information to display your DISC profile. This might happen if you navigated here directly or an error occurred.
        </p>
        <Button onClick={() => navigate('/disc')} size="lg" className="bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xl px-10 py-4 rounded-lg">
          Go to DISC Landing
        </Button>
      </div>
    );
  }
  
  const pStyle = primaryStyle; // Assertion is safe due to the check above
  const PrimaryIcon = pStyle.icon;
  const profileTitleText = secondaryStyle ? `${pStyle.name} / ${secondaryStyle.name} (${pStyle.id}${secondaryStyle.id})` : `${pStyle.name} (${pStyle.id})`;
  const pageBgGradient = `bg-gradient-to-br from-slate-950 via-${pStyle.textColorClass.split('-')[1]}-950/80 to-slate-950`;

  return (
    <div className={`min-h-screen text-slate-100 antialiased py-16 sm:py-20 px-4 overflow-x-hidden ${pageBgGradient}`}>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className={`absolute -top-1/2 -left-1/4 w-3/4 h-3/4 ${pStyle.gradientFromClass.replace('from-','bg-')}/10 rounded-full filter blur-3xl opacity-50 animate-pulse-slower`}></div>
        <div className={`absolute -bottom-1/2 -right-1/4 w-3/4 h-3/4 ${pStyle.gradientToClass.replace('to-','bg-')}/10 rounded-full filter blur-3xl opacity-50 animate-pulse-slow animation-delay-2000`}></div>
      </div>

      <div className="container mx-auto max-w-4xl xl:max-w-5xl">
        <AnimatedSection>
          <Card className="bg-slate-800/70 border-2 border-slate-700/60 shadow-2xl shadow-emerald-900/60 backdrop-blur-2xl rounded-3xl overflow-hidden">
            <CardHeader className="text-center border-b-2 border-slate-700/50 pb-10 pt-12 px-6 bg-slate-900/40 relative">
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${pStyle.gradientFromClass} ${pStyle.gradientToClass} animate-pulse-fast`}></div>
              <div className={`p-4 inline-block rounded-full bg-gradient-to-br ${pStyle.gradientFromClass} ${pStyle.gradientToClass} mb-6 shadow-xl border-4 border-slate-700`}>
                <PrimaryIcon className="h-20 w-20 sm:h-24 sm:w-24 text-white drop-shadow-lg" />
              </div>
              <p className={`text-lg font-semibold ${pStyle.lightTextColorClass} uppercase tracking-widest mb-2`}>Your DISC Behavioral Profile</p>
              <CardTitle className="text-4xl sm:text-5xl lg:text-6xl font-black my-1">
                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${pStyle.gradientFromClass} ${pStyle.gradientToClass}`}>
                  {profileTitleText}
                </span>
              </CardTitle>
              <CardDescription className={`text-2xl sm:text-3xl font-bold text-slate-200`}>{pStyle.adjective}{secondaryStyle ? ` & ${secondaryStyle.adjective}` : ''}</CardDescription>
            </CardHeader>

            <CardContent className="pt-10 sm:pt-12 px-4 sm:px-6 md:px-8 space-y-12">
              {/* Score Visualization Section - ADDED a null check for allScores */}
              <SectionCard 
                title="Your Score Spectrum" 
                icon={BarChartHorizontalBig} 
                titleColorClass={pStyle.lightTextColorClass}
              >
                {allScores && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-2">
                        {(['D', 'I', 'S', 'C'] as DiscDimension[]).map(dim => {
                            const styleInfoForBar = getStyleDetails(dim);
                            return (
                            <ScoreBar 
                                key={dim}
                                score={allScores[dim]} // Now safe to access
                                maxScore={maxPossibleScore}
                                styleInfo={styleInfoForBar}
                            />
                            );
                        })}
                        </div>
                        <p className="text-xs text-slate-400 mt-6 text-center italic">
                            Scores indicate tendencies based on your "Most Like Me" selections. Max score for each dimension is {maxPossibleScore}.
                        </p>
                    </>
                )}
              </SectionCard>
              
              <SectionCard 
                title={`Understanding: ${pStyle.name} (${pStyle.id})`} 
                icon={pStyle.icon} 
                titleColorClass={pStyle.textColorClass}
              >
                <p className="mb-5">{pStyle.description}</p>
                <p><strong className={`font-semibold ${pStyle.lightTextColorClass}`}>Core Focus:</strong> {pStyle.focusesOn}</p>
                <h4 className={`text-xl font-semibold mt-6 mb-3 ${pStyle.lightTextColorClass}`}>Key Traits:</h4>
                <div className="flex flex-wrap gap-2.5">
                    {pStyle.keywords.map(kw => 
                        <Badge key={kw} variant="outline" className={`border-opacity-70 bg-opacity-20 px-3 py-1.5 text-sm font-medium rounded-md ${pStyle.badgeBorderColor} ${pStyle.badgeBgColor} ${pStyle.badgeTextColor}`}>
                            {kw}
                        </Badge>
                    )}
                </div>
              </SectionCard>

              {secondaryStyle && (
                 <SectionCard 
                    title={`Secondary Influence: ${secondaryStyle.name} (${secondaryStyle.id})`} 
                    icon={secondaryStyle.icon} 
                    titleColorClass={secondaryStyle.textColorClass}
                >
                    <p className="mb-5">{secondaryStyle.description}</p>
                    <p><strong className={`font-semibold ${secondaryStyle.lightTextColorClass}`}>Core Focus:</strong> {secondaryStyle.focusesOn}</p>
                    <h4 className={`text-xl font-semibold mt-6 mb-3 ${secondaryStyle.lightTextColorClass}`}>Key Characteristics:</h4>
                    <div className="flex flex-wrap gap-2.5">
                        {secondaryStyle.keywords.map(kw => 
                            <Badge key={kw} variant="outline" className={`border-opacity-70 bg-opacity-20 px-3 py-1.5 text-sm font-medium rounded-md ${secondaryStyle.badgeBorderColor} ${secondaryStyle.badgeBgColor} ${secondaryStyle.badgeTextColor}`}>
                                {kw}
                            </Badge>
                        )}
                    </div>
                </SectionCard>
              )}

              {(pStyle.strengths || secondaryStyle?.strengths) && (
                <SectionCard title="Your Potential Strengths" icon={TrendingUp} titleColorClass="text-green-300" iconColorClass="text-green-400">
                    <ul className="list-none space-y-3.5">
                        {pStyle.strengths?.map((s, i) => <li key={`prim_s_${i}`} className="flex items-start text-lg"><AwardIcon className="h-6 w-6 mr-3 text-green-400 shrink-0 mt-1"/>{s}</li>)}
                        {secondaryStyle?.strengths?.slice(0, 2).map((s, i) => <li key={`sec_s_${i}`} className="flex items-start text-lg opacity-80"><AwardIcon className="h-6 w-6 mr-3 text-green-400 shrink-0 mt-1"/>(From {secondaryStyle.id}) {s}</li>)}
                    </ul>
                </SectionCard>
              )}

              {(pStyle.challenges || secondaryStyle?.challenges) && (
                <SectionCard title="Areas for Awareness" icon={TrendingDown} titleColorClass="text-red-300" iconColorClass="text-red-400">
                    <ul className="list-none space-y-3.5">
                        {pStyle.challenges?.map((c, i) => <li key={`prim_c_${i}`} className="flex items-start text-lg"><ShieldAlert className="h-6 w-6 mr-3 text-red-400 shrink-0 mt-1"/>{c}</li>)}
                        {secondaryStyle?.challenges?.slice(0, 2).map((c, i) => <li key={`sec_c_${i}`} className="flex items-start text-lg opacity-80"><ShieldAlert className="h-6 w-6 mr-3 text-red-400 shrink-0 mt-1"/>(From {secondaryStyle.id}) {c}</li>)}
                    </ul>
                </SectionCard>
              )}
              
              {(pStyle.communicationTips) && (
                <SectionCard title={`Communication Insights`} icon={MessageSquareText} titleColorClass="text-sky-300" iconColorClass="text-sky-400">
                     <p className="mb-4 text-slate-300">Tips for leveraging your <strong className={pStyle.textColorClass}>{pStyle.name}</strong> style:</p>
                    <ul className="list-none space-y-3.5">
                        {pStyle.communicationTips.map((tip, i) => <li key={`comm_tip_${i}`} className="flex items-start text-lg"><CheckCircle className="h-6 w-6 mr-3 text-sky-400 shrink-0 mt-1"/>{tip}</li>)}
                         {secondaryStyle?.communicationTips && (
                            <>
                                <p className="mt-6 mb-2 text-slate-300 font-semibold">Considering your <strong className={secondaryStyle.textColorClass}>{secondaryStyle.name}</strong> influence:</p>
                                <ul className="list-none space-y-3.5 opacity-80">
                                {secondaryStyle.communicationTips.slice(0,2).map((tip, i) => <li key={`sec_comm_tip_${i}`} className="flex items-start text-lg "><CheckCircle className="h-6 w-6 mr-3 text-sky-400 shrink-0 mt-1"/>{tip}</li>)}
                                </ul>
                            </>
                        )}
                    </ul>
                </SectionCard>
              )}

              <CardFooter className="pt-12 pb-4 border-t-2 border-slate-700/50 flex flex-col sm:flex-row justify-center items-center gap-6">
                <Button onClick={() => navigate('/disc/test')} size="lg" className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white text-lg font-semibold group py-3.5 px-8 rounded-lg shadow-lg hover:shadow-emerald-500/50 transform hover:scale-105 transition-all duration-300">
                  <RotateCcw className="mr-2.5 h-5 w-5 group-hover:rotate-[120deg] transition-transform duration-300" /> Retake DISC Test
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-emerald-500/80 text-emerald-600 hover:bg-emerald-700/40 hover:text-emerald-100 hover:border-emerald-400 text-lg font-semibold py-3.5 px-8 rounded-lg shadow-md hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105">
                  <Link to="/">
                    <Home className="mr-2.5 h-5 w-5" /> Back to Homepage
                  </Link>
                </Button>
              </CardFooter>
              <p className="text-xs text-slate-500/80 mt-10 text-center px-4">
                  This DISC profile offers insights based on your responses. Personality is multifaceted; this tool provides one perspective for growth and understanding.
              </p>
            </CardContent>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default DiscResultsPage;