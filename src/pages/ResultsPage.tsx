// src/pages/ResultsPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { findMbtiTypeDetails } from '@/data/mbtiTypes';
import type { MbtiTypeInfo } from '@/data/mbtiTypes'; // Ensure this has avatarSvgFilename if you added it
import type { MbtiDimensionValue } from '@/data/mbtiQuestions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    Home, RotateCcw, Users, Brain, ShieldAlert, Briefcase, Star, 
    BarChart3, TrendingUp, TrendingDown, Zap, Lightbulb, Heart, Coffee, Settings, MapPin, FileText, BookUser, Target, Sparkles as SparklesIcon, Loader2, CheckCircle
} from 'lucide-react';

// ... (DichotomyStrengthDisplay component remains the same as the last version with FIXED backgrounds)
interface DichotomyStrengthProps {
  label: string;
  preference1: { name: string; value: MbtiDimensionValue; score: number; icon: React.ElementType };
  preference2: { name: string; value: MbtiDimensionValue; score: number; icon: React.ElementType };
  totalQuestions: number;
  gradientFrom: string; 
  gradientTo: string;   
}

const DichotomyStrengthDisplay: React.FC<DichotomyStrengthProps> = ({
  label, preference1, preference2, totalQuestions, gradientFrom, gradientTo
}) => {
  if (totalQuestions === 0) return null;

  const totalScore = preference1.score + preference2.score;
  const effectiveTotal = totalScore > 0 ? totalScore : 1; 
  const percent1 = (preference1.score / effectiveTotal) * 100;
  const percent2 = (preference2.score / effectiveTotal) * 100;
  const strengthRaw = Math.abs(preference1.score - preference2.score);
  let clarity = "Balanced";
  const diffPercentage = (strengthRaw / totalQuestions) * 100; 
  if (diffPercentage > 60) clarity = "Very Strong"; 
  else if (diffPercentage > 30) clarity = "Clear"; 
  else if (diffPercentage > 10) clarity = "Slight";  
  const PreferenceIcon1 = preference1.icon;
  const PreferenceIcon2 = preference2.icon;
  const dominantSide = preference1.score >= preference2.score ? preference1 : preference2;
    
  const fixedClarityBadgeBgClass = "bg-slate-700/70"; 
  const fixedClarityBadgeBorderClass = "border-slate-500/80"; 
  const fixedPreferenceDivBgClass = "bg-slate-600/60"; 
  const fixedIconColorClass = "text-slate-200"; 
  const fixedPreferenceNameTextColor = "text-slate-50"; 

  return (
    <div className="mb-8 p-5 bg-slate-800/70 rounded-xl border border-slate-700/60 shadow-lg transition-all duration-300 hover:shadow-blue-600/30 hover:border-blue-500/60 transform hover:-translate-y-1">
      <div className="flex justify-between items-center mb-3">
        <h4 className="text-lg font-semibold text-slate-200">{label}</h4>
        <span 
            className={`text-xs font-bold px-2.5 py-1 rounded-full shadow-sm border text-slate-100 ${fixedClarityBadgeBgClass} ${fixedClarityBadgeBorderClass}`}
        >
            {clarity} ({dominantSide.name})
        </span>
      </div>
      <div className="flex items-center space-x-3 mb-3">
        <div className={`flex items-center p-2 rounded-md ${fixedPreferenceDivBgClass} min-w-[120px] justify-center shadow-sm`}>
            <PreferenceIcon1 className={`h-5 w-5 mr-1.5 ${fixedIconColorClass}`} />
            <span className={`font-medium ${fixedPreferenceNameTextColor}`}>{preference1.name} ({preference1.score})</span> 
        </div>
        <div className="text-slate-500 font-bold text-sm">VS</div>
        <div className={`flex items-center p-2 rounded-md ${fixedPreferenceDivBgClass} min-w-[120px] justify-center shadow-sm`}>
            <PreferenceIcon2 className={`h-5 w-5 mr-1.5 ${fixedIconColorClass}`} />
            <span className={`font-medium ${fixedPreferenceNameTextColor}`}>{preference2.name} ({preference2.score})</span> 
        </div>
      </div>
      <div className="w-full h-5 bg-slate-700/80 rounded-full overflow-hidden flex relative shadow-inner">
        <div 
            style={{ width: `${percent1}%` }} 
            className={`h-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-r ${gradientFrom} ${gradientTo.replace('to-','via-')} transition-all duration-700 ease-out`}
        >
           {percent1 > 15 && `${Math.round(percent1)}%`}
        </div>
        <div 
            style={{ width: `${percent2}%` }} 
            className={`h-full flex items-center justify-center text-xs font-bold text-white bg-gradient-to-l ${gradientTo} ${gradientFrom.replace('from-','via-')} opacity-70 transition-all duration-700 ease-out`}
        >
            {percent2 > 15 && `${Math.round(percent2)}%`}
        </div>
        {Math.abs(percent1 - percent2) < 5 && (
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-400/50 transform -translate-x-1/2"></div>
        )}
      </div>
    </div>
  );
};


const ResultsPage: React.FC = () => {
  // ... (useState, useEffect, other logic from before - no changes needed here for the avatar itself)
  const { mbtiType } = useParams<{ mbtiType: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [typeDetails, setTypeDetails] = useState<MbtiTypeInfo | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(true);

  const counts = location.state?.counts as Record<MbtiDimensionValue, number> | undefined;
  const questionsPerDimension = location.state?.questionsPerDimension as Record<string, number> | undefined;

  useEffect(() => {
    setIsLoading(true);
    if (mbtiType) {
      const details = findMbtiTypeDetails(mbtiType);
      setTypeDetails(details);
       if (details) {
        document.title = `Your Result: ${details.type} - ${details.nickname}`;
      } else {
        document.title = 'Result Not Found';
      }
    } else {
        setTypeDetails(undefined); 
    }
    setIsLoading(false);
    return () => { document.title = 'MBTI Test'; };
  }, [mbtiType]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-slate-100 p-4 overflow-hidden">
        <Loader2 className="h-20 w-20 animate-spin text-sky-400" />
        <p className="mt-8 text-2xl font-semibold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-400">
          Analyzing Your Insights...
        </p>
      </div>
    );
  }

  if (typeDetails === null || typeDetails === undefined || !counts || !questionsPerDimension) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-slate-100 p-6 text-center overflow-hidden">
        <ShieldAlert size={80} className="text-red-400 mb-8 animate-pulse" />
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-orange-400">Result Not Available</h1>
        <p className="text-xl text-slate-300 mb-10 max-w-md">
          {typeDetails === null || typeDetails === undefined 
            ? `The personality type "${mbtiType || 'Unknown'}" is not recognized or data is missing.` 
            : "Essential information to display your results is missing."}
        </p>
        <Button onClick={() => navigate('/')} size="lg" className="bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white text-xl px-10 py-4 rounded-lg shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300">
          <Home className="mr-3 h-6 w-6" /> Go to Homepage
        </Button>
      </div>
    );
  }
  
  const sectionIconClass = "h-8 w-8 mr-4 shrink-0";
  const sectionTitleClass = "text-3xl font-bold mb-6 tracking-tight flex items-center";
  const badgeBaseClass = "px-3.5 py-1.5 text-sm font-medium rounded-md shadow-sm transition-all hover:scale-105";

  const personalGrowthFocus = typeDetails.weaknesses && typeDetails.weaknesses.length > 0 
    ? `A key area for growth as a ${typeDetails.type} can be to become more aware of '${typeDetails.weaknesses[0].toLowerCase()}'. Consider exploring strategies to [related positive action, e.g., 'practice patience in collaborative projects' or 'set realistic expectations for yourself and others'].`
    : `Embrace your unique strengths as a ${typeDetails.type} and continue exploring ways to leverage them in your daily life and interactions.`;

  // --- AVATAR LOGIC ---
  let avatarSrc = `https://avatar.vercel.sh/${typeDetails.id}?size=120&colors=0ea5e9,2563eb,4f46e5`; // Default Vercel avatar (sky, blue, indigo)
  if (typeDetails.avatarSvgFilename) {
    avatarSrc = `/mbti-avatars/${typeDetails.avatarSvgFilename}`;
  } else {
    // Fallback if avatarSvgFilename is not defined for a type, but you have an ID
    // This assumes your SVGs in public/mbti-avatars/ are named like "intj.svg"
    avatarSrc = `/mbti-avatars/${typeDetails.id}.svg`; 
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-slate-100 antialiased py-16 sm:py-20 px-4 overflow-x-hidden">
      {/* ... (background blobs) ... */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/4 w-3/4 h-3/4 bg-sky-700/20 rounded-full filter blur-3xl animate-pulse-slower opacity-50"></div>
        <div className="absolute -bottom-1/2 -right-1/4 w-3/4 h-3/4 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse-slow opacity-50"></div>
      </div>

      <div className="container mx-auto max-w-5xl xl:max-w-6xl">
        <Card className="bg-slate-800/70 border-2 border-blue-700/50 shadow-2xl shadow-blue-900/40 backdrop-blur-2xl rounded-3xl overflow-hidden">
          <CardHeader className="text-center border-b-2 border-blue-700/40 pb-10 pt-12 px-6 bg-gradient-to-br from-slate-800/60 to-slate-900/50 relative">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-500 animate-pulse-fast"></div>
            
            {/* --- UPDATED AVATAR IMAGE --- */}
            <img 
              src={avatarSrc} 
              alt={`${typeDetails.nickname} Symbol`}
              // Added p-1 and bg-slate-700 if SVGs have transparent backgrounds and need a backdrop
              // Adjust className if your SVGs are already well-styled with backgrounds
              className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-5 rounded-full border-4 border-sky-500/60 shadow-lg object-contain p-1 bg-slate-700/50" 
            />

            <p className="text-base font-semibold text-sky-300 uppercase tracking-widest mb-1">Your Unique Personality Profile</p>
            <CardTitle className="text-6xl sm:text-7xl font-black my-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-400">
                {typeDetails.type}
              </span>
            </CardTitle>
            <CardDescription className="text-2xl sm:text-3xl text-slate-200 font-bold">{typeDetails.nickname}</CardDescription>
            <p className="text-lg text-slate-300/90 mt-4 max-w-2xl mx-auto italic">{typeDetails.tagline}</p>
          </CardHeader>

          <CardContent className="pt-10 sm:pt-12 px-6 sm:px-10 md:px-12">
            {/* ... (Rest of the CardContent: Preference Spectrum, About, Strengths/Weaknesses, etc. - NO CHANGES HERE) ... */}
            <section className="mb-12 sm:mb-16">
              <h3 className={`${sectionTitleClass} text-sky-300 justify-center sm:justify-start`}>
                <BarChart3 className={`${sectionIconClass} text-sky-400`} /> Your Preference Spectrum
              </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <DichotomyStrengthDisplay
                  label="Energy Source"
                  preference1={{ name: "Extraversion", value: 'E', score: counts.E, icon: Zap }}
                  preference2={{ name: "Introversion", value: 'I', score: counts.I, icon: Coffee }}
                  totalQuestions={questionsPerDimension.EI || 0}
                  gradientFrom="from-blue-500" gradientTo="to-sky-400" 
                />
                <DichotomyStrengthDisplay
                  label="Information Processing"
                  preference1={{ name: "Sensing", value: 'S', score: counts.S, icon: MapPin }}
                  preference2={{ name: "Intuition", value: 'N', score: counts.N, icon: Lightbulb }}
                  totalQuestions={questionsPerDimension.SN || 0}
                  gradientFrom="from-cyan-500" gradientTo="to-teal-400"
                />
                <DichotomyStrengthDisplay
                  label="Decision Making"
                  preference1={{ name: "Thinking", value: 'T', score: counts.T, icon: Settings }}
                  preference2={{ name: "Feeling", value: 'F', score: counts.F, icon: Heart }}
                  totalQuestions={questionsPerDimension.TF || 0}
                  gradientFrom="from-indigo-500" gradientTo="to-violet-500" 
                />
                <DichotomyStrengthDisplay
                  label="Outer Life Approach"
                  preference1={{ name: "Judging", value: 'J', score: counts.J, icon: FileText }}
                  preference2={{ name: "Perceiving", value: 'P', score: counts.P, icon: BookUser }}
                  totalQuestions={questionsPerDimension.JP || 0}
                  gradientFrom="from-blue-600" gradientTo="to-sky-500" 
                />
              </div>
            </section>

            <section className="mb-12 sm:mb-16 p-6 sm:p-8 bg-slate-800/60 rounded-xl border border-slate-700/70 shadow-lg hover:shadow-sky-600/20 transition-shadow duration-300">
              <h3 className={`${sectionTitleClass} text-sky-300`}>
                <Brain className={`${sectionIconClass} text-sky-400`} /> Unveiling the {typeDetails.type} ({typeDetails.nickname})
              </h3>
              <div className="prose prose-lg prose-invert prose-p:text-slate-200/90 prose-strong:text-sky-200 max-w-none leading-relaxed whitespace-pre-line">{typeDetails.fullDescription}</div>
            </section>

            <div className="grid md:grid-cols-2 gap-x-10 gap-y-12 mb-12 sm:mb-16">
              <section className="p-6 bg-green-700/10 rounded-xl border border-green-600/40 shadow-md hover:shadow-green-600/30 transition-shadow duration-300">
                <h3 className={`${sectionTitleClass} text-green-300`}>
                  <TrendingUp className={`${sectionIconClass} text-green-400`} /> Core Strengths
                </h3>
                <ul className="space-y-3.5">
                  {typeDetails.strengths.map((strength, i) => (
                    <li key={i} className="flex items-start">
                        <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 mr-3 mt-0.5 sm:mt-1 shrink-0" />
                        <span className="text-slate-100 text-lg sm:text-xl">{strength}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="p-6 bg-red-700/10 rounded-xl border border-red-600/40 shadow-md hover:shadow-red-600/30 transition-shadow duration-300">
                <h3 className={`${sectionTitleClass} text-red-300`}>
                  <TrendingDown className={`${sectionIconClass} text-red-400`} /> Areas for Growth
                </h3>
                 <ul className="space-y-3.5">
                  {typeDetails.weaknesses.map((weakness, i) => (
                     <li key={i} className="flex items-start">
                        <ShieldAlert className="h-5 w-5 sm:h-6 sm:w-6 text-red-400 mr-3 mt-0.5 sm:mt-1 shrink-0" />
                        <span className="text-slate-100 text-lg sm:text-xl">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
            
            <section className="mb-12 sm:mb-16 p-6 sm:p-8 bg-gradient-to-tr from-sky-700/20 via-slate-800/60 to-blue-700/20 rounded-xl border-2 border-sky-500/50 shadow-xl hover:shadow-sky-500/40 transition-shadow duration-300 relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-32 h-32 text-sky-500/10 opacity-50">
                    <SparklesIcon className="w-full h-full" />
                </div>
                <h3 className={`${sectionTitleClass} text-sky-300 relative z-10`}>
                    <Target className={`${sectionIconClass} text-sky-400`} /> Personal Growth Focus
                </h3>
                <p className="text-slate-200 text-lg leading-relaxed relative z-10">
                    {personalGrowthFocus}
                </p>
            </section>

            <div className="grid md:grid-cols-2 gap-x-10 gap-y-12 mb-12 sm:mb-16">
                <section className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/70 shadow-lg hover:shadow-amber-500/20 transition-shadow duration-300">
                  <h3 className={`${sectionTitleClass} text-amber-300 !mb-4`}>
                    <Users className={`${sectionIconClass} text-amber-400`} /> Cognitive Blueprint
                  </h3>
                  <ul className="space-y-3 text-slate-200 text-lg sm:text-xl">
                    <li><strong className="font-semibold text-amber-200 block sm:inline">Dominant: </strong> {typeDetails.cognitiveFunctions.dominant}</li>
                    <li><strong className="font-semibold text-amber-200 block sm:inline">Auxiliary: </strong> {typeDetails.cognitiveFunctions.auxiliary}</li>
                    <li><strong className="font-semibold text-amber-200 block sm:inline">Tertiary: </strong> {typeDetails.cognitiveFunctions.tertiary}</li>
                    <li><strong className="font-semibold text-amber-200 block sm:inline">Inferior: </strong> {typeDetails.cognitiveFunctions.inferior}</li>
                  </ul>
                </section>

                {typeDetails.careerPaths && typeDetails.careerPaths.length > 0 && (
                  <section className="p-6 bg-slate-800/60 rounded-xl border border-slate-700/70 shadow-lg hover:shadow-cyan-500/20 transition-shadow duration-300">
                    <h3 className={`${sectionTitleClass} text-cyan-300`}>
                      <Briefcase className={`${sectionIconClass} text-cyan-400`} /> Thriving Environments
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {typeDetails.careerPaths.map((career, i) => (
                         <Badge key={i} variant="outline" className={`${badgeBaseClass} border-cyan-500/70 bg-cyan-500/20 text-cyan-200 hover:bg-cyan-500/30 text-base`}>
                          {career}
                        </Badge>
                      ))}
                    </div>
                  </section>
                )}
            </div>

            {typeDetails.famousExamples && typeDetails.famousExamples.length > 0 && (
              <section className="mb-12 sm:mb-16 text-center p-6 bg-slate-800/50 rounded-xl border border-slate-700/70 shadow-lg">
                <h3 className={`${sectionTitleClass} text-blue-300 justify-center`}>
                  <Star className={`${sectionIconClass} text-blue-400`} /> Notable Figures (Examples)
                </h3>
                <p className="text-slate-300 text-lg italic max-w-3xl mx-auto">
                  {typeDetails.famousExamples.join('  •  ')}
                </p>
              </section>
            )}

            <CardFooter className="pt-10 border-t-2 border-blue-700/40 flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-6">
              <Button 
                onClick={() => navigate('/test')} 
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white text-lg font-semibold group py-3.5 px-8 rounded-lg shadow-lg hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
              >
                <RotateCcw className="mr-2.5 h-5 w-5 group-hover:rotate-[120deg] transition-transform duration-300" /> Retake Test
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="w-full sm:w-auto border-sky-500/80 text-sky-300 hover:bg-sky-700/40 hover:text-sky-100 hover:border-sky-400 text-lg font-semibold py-3.5 px-8 rounded-lg shadow-md hover:shadow-sky-500/30 transition-all duration-300 transform hover:scale-105"
              >
                <Link to="/">
                  <Home className="mr-2.5 h-5 w-5" /> Back to Homepage
                </Link>
              </Button>
            </CardFooter>
             <p className="text-xs text-slate-500/90 mt-10 text-center px-4">
                This personality profile offers insights based on your responses. Remember, personality is dynamic and this is a tool for self-exploration, not a definitive label. <br/>
                MBTI is a registered trademark of The Myers & Briggs Foundation. This site is not affiliated with The Myers & Briggs Foundation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResultsPage;