// src/pages/DiscLandingPage.tsx
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Badge } from '@/components/ui/badge';
import AnimatedStars from '@/components/AnimatedStars';

const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string; delay?: string }> = ({ children, className, delay = 'delay-0' }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: '-50px 0px' });
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${delay} ${className ?? ''} ${inView ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-10 blur-sm'}`}>
      {children}
    </div>
  );
};

interface DiscStyleInfo {
  id: 'D' | 'I' | 'S' | 'C';
  name: string;
  adjective: string;
  keywords: string[];
  description: string;
  shortSummary: string; 
  focusesOn: string;
  icon: React.ElementType;
  textColor: string;
  lightTextColor: string;
  darkBgColor: string; 
  badgeBorderColor: string;
  badgeBgColor: string;
  badgeTextColor: string;
  gradientFrom: string;
  gradientTo: string;
  hoverShadowColor: string;
  outerBorderColor: string; 
}

const discStylesData: DiscStyleInfo[] = [
  { 
    id: 'D', name: 'Dominance', adjective: "Direct & Driven", 
    keywords: ['Assertive', 'Results-Oriented', 'Decisive', 'Problem-Solver', 'Competitive', 'Risk-Taker'], 
    shortSummary: 'Emphasis on achieving results, taking action, and overcoming opposition.',
    description: 'Individuals high in Dominance are characterized by their confidence, assertiveness, and focus on bottom-line results. They are quick to act, enjoy challenges, and are motivated by winning and achieving their goals. They can be direct and demanding.', 
    focusesOn: 'Accomplishing tasks, achieving goals, exercising authority, and overcoming challenges.', 
    icon: Lucide.Target, 
    textColor: 'text-red-400', lightTextColor: 'text-red-300', darkBgColor: 'bg-red-950/40',
    badgeBorderColor: 'border-red-600/50', badgeBgColor: 'bg-red-800/30', badgeTextColor: 'text-red-200',
    gradientFrom: 'from-red-500', gradientTo: 'to-orange-500', 
    hoverShadowColor: 'hover:shadow-red-500/30', outerBorderColor: 'border-red-500/60'
  },
  { 
    id: 'I', name: 'Influence', adjective: "Inspiring & Sociable", 
    keywords: ['Optimistic', 'Enthusiastic', 'Persuasive', 'Talkative', 'Collaborative', 'Trusting'], 
    shortSummary: 'Focuses on persuasion, interaction, and enthusiasm.',
    description: 'Those with an Influence style are typically outgoing, enthusiastic, and optimistic. They enjoy being around people, thrive on social interaction, and are skilled at persuading and motivating others. They value recognition and positive relationships.', 
    focusesOn: 'Persuading others, building connections, expressing enthusiasm, and creating a positive atmosphere.', 
    icon: Lucide.Megaphone, 
    textColor: 'text-yellow-400', lightTextColor: 'text-yellow-300', darkBgColor: 'bg-yellow-950/40',
    badgeBorderColor: 'border-yellow-600/50', badgeBgColor: 'bg-yellow-800/30', badgeTextColor: 'text-yellow-200',
    gradientFrom: 'from-amber-400', gradientTo: 'to-yellow-400', 
    hoverShadowColor: 'hover:shadow-yellow-500/30', outerBorderColor: 'border-yellow-500/60'
  },
  { 
    id: 'S', name: 'Steadiness', adjective: "Supportive & Stable", 
    keywords: ['Patient', 'Cooperative', 'Reliable', 'Calm', 'Good Listener', 'Team Player', 'Predictable'], 
    shortSummary: 'Values cooperation, sincerity, dependability, and providing support.',
    description: 'The Steadiness style is marked by a calm, patient, and supportive demeanor. These individuals value stability, harmony, and loyalty. They are often excellent team players, good listeners, and prefer a predictable and cooperative environment.', 
    focusesOn: 'Providing support, maintaining stability, ensuring collaboration, and fostering sincere relationships.', 
    icon: Lucide.Users2, 
    textColor: 'text-green-400', lightTextColor: 'text-green-300', darkBgColor: 'bg-green-950/40',
    badgeBorderColor: 'border-green-600/50', badgeBgColor: 'bg-green-800/30', badgeTextColor: 'text-green-200',
    gradientFrom: 'from-emerald-500', gradientTo: 'to-green-500', 
    hoverShadowColor: 'hover:shadow-green-500/30', outerBorderColor: 'border-green-500/60'
  },
  { 
    id: 'C', name: 'Conscientiousness', adjective: "Cautious & Correct", 
    keywords: ['Analytical', 'Precise', 'Systematic', 'Quality-Focused', 'Detail-Oriented', 'Orderly', 'Diplomatic'], 
    shortSummary: 'Prioritizes quality, accuracy, expertise, and competency.',
    description: 'Individuals with a Conscientious style prioritize accuracy, quality, and details. They are typically analytical, systematic, and prefer to work with established procedures and standards. They are thorough and value being correct and well-informed.', 
    focusesOn: 'Ensuring accuracy, maintaining quality standards, challenging assumptions, and systematic approaches.', 
    icon: Lucide.Scaling, 
    textColor: 'text-blue-400', lightTextColor: 'text-blue-300', darkBgColor: 'bg-blue-950/40',
    badgeBorderColor: 'border-blue-600/50', badgeBgColor: 'bg-blue-800/30', badgeTextColor: 'text-blue-200',
    gradientFrom: 'from-sky-500', gradientTo: 'to-blue-500', 
    hoverShadowColor: 'hover:shadow-blue-500/30', outerBorderColor: 'border-blue-500/60'
  },
];

const DiscLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const mainContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mainEl = mainContainerRef.current;
    if (!mainEl) return;
    const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const rect = mainEl.getBoundingClientRect();
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        mainEl.style.setProperty('--spotlight-x', `${x}px`);
        mainEl.style.setProperty('--spotlight-y', `${y}px`);
    };
    mainEl.addEventListener('mousemove', handleMouseMove);
    return () => mainEl.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleStartDiscTest = () => {
    navigate('/disc/test'); 
  };

  return (
    <div ref={mainContainerRef} className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500 selection:text-white spotlight-container relative isolate">
      {" "}
      <AnimatedStars count={50} />
      <div className="relative z-10"> 
        <header className="relative container mx-auto px-4 sm:px-6 py-28 sm:py-36 text-center overflow-hidden min-h-screen flex flex-col justify-center items-center">
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 left-0 w-72 h-72 bg-emerald-600/10 rounded-full filter blur-3xl opacity-50 animate-pulse-slower"></div>
              <div className="absolute bottom-0 right-0 w-72 h-72 bg-green-500/10 rounded-full filter blur-3xl opacity-50 animate-pulse-slow animation-delay-2000"></div>
            </div>
            <AnimatedSection delay="delay-0" className="mb-8">
              <Lucide.PieChart size={80} className="mx-auto text-emerald-400 drop-shadow-[0_0_25px_theme(colors.emerald.500)] animate-float" />
            </AnimatedSection>
            <AnimatedSection delay="delay-200">
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-6 tracking-tighter leading-tight">
                Map Your <br className="sm:hidden"/>
                <span className="animate-text-gradient bg-gradient-to-r from-emerald-400 via-green-400 to-lime-300">
                  Behavioral Style
                </span>
              </h1>
            </AnimatedSection>
            <AnimatedSection delay="delay-400">
              <p className="text-xl sm:text-2xl lg:text-3xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
                The DISC assessment illuminates your natural tendencies in communication and action, empowering you to build stronger relationships and achieve greater effectiveness.
              </p>
            </AnimatedSection>
            <AnimatedSection delay="delay-600">
              <Button size="lg" onClick={handleStartDiscTest} className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold py-4 px-12 rounded-lg text-xl sm:text-2xl group transition-all duration-300 ease-in-out shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transform hover:scale-105 active:scale-95">
                Discover Your DISC Profile
                <Lucide.ChevronRightCircle className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </AnimatedSection>
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-70">
              <Lucide.Mouse className="w-7 h-7 text-slate-500" />
              <Lucide.ArrowDown className="w-5 h-5 text-slate-500 -mt-1 mx-auto" />
            </div>
        </header>

        <section id="what-is-disc" className="py-20 sm:py-24 bg-slate-900/70 backdrop-blur-xl border-t border-b border-slate-800 min-h-screen">
          <AnimatedSection className="container mx-auto px-4 sm:px-6">
            <div className="max-w-7xl mx-auto text-center">
              <Lucide.ClipboardList size={60} className="mx-auto mb-8 text-green-400 drop-shadow-[0_0_15px_theme(colors.green.500)]" />
              <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-emerald-300 tracking-tight">Decoding the DISC Model</h2>
              <p className="text-slate-300 mb-12 sm:mb-16 md:mb-27 text-xl sm:text-2xl leading-relaxed max-w-3xl mx-auto">
                DISC is a renowned behavioral model that centers on four primary traits, providing a framework for understanding how people approach their work and interactions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-18">
                {discStylesData.map((style, index) => (
                  <AnimatedSection key={style.id} delay={`delay-${index * 100}`}>
                    <Card className={`h-full min-w-[270px] flex flex-col text-center rounded-xl border-2 ${style.outerBorderColor} ${style.darkBgColor} shadow-lg hover:shadow-xl ${style.hoverShadowColor} transition-all duration-300 transform hover:-translate-y-1.5`}>
                      <div className={`p-3.5 rounded-full bg-gradient-to-br ${style.gradientFrom} ${style.gradientTo} text-white inline-block mb-1 shadow-lg mx-auto -mt-8 relative z-10 border-4 border-slate-800/70`}>
                          <style.icon className="h-10 w-10" />
                      </div>
                      <CardHeader className="items-center pt-2 pb-3">
                          <CardTitle className={`text-2xl font-extrabold ${style.textColor}`}>{style.id} - {style.name}</CardTitle>
                          <CardDescription className={`mt-1.5 text-md font-semibold ${style.lightTextColor}`}>{style.adjective}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow px-5 pt-0 pb-6">
                          <p className="text-slate-300 text-sm leading-normal">{style.shortSummary}</p>
                      </CardContent>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </section>

        <section id="disc-styles-detailed" className="py-20 sm:py-28">
          <AnimatedSection className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16 sm:mb-20">
              <Lucide.UsersRound size={60} className="mx-auto mb-8 text-emerald-400 drop-shadow-[0_0_15px_theme(colors.emerald.500)]" />
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-emerald-300 tracking-tight">The Four Core Behavioral Styles</h2>
              <p className="text-slate-300 max-w-3xl mx-auto text-xl sm:text-2xl leading-relaxed">
                Each style brings unique strengths and perspectives. Most individuals exhibit a blend, often with one or two dominant styles that shape their approach to life and work.
              </p>
            </div>
            <div className="space-y-16">
              {discStylesData.map((style, index) => (
                <AnimatedSection key={style.id} className="group" delay={`delay-${index * 100}`}>
                  <Card 
                    className={`pt-0 pb-0 overflow-hidden rounded-2xl border-2 ${style.outerBorderColor} bg-slate-800/60 shadow-xl 
                               transition-all duration-300 
                               md:grid md:grid-cols-12 md:gap-0  
                               ${style.hoverShadowColor} hover:border-${style.textColor.replace('text-','').replace(/-\d+$/, '-500')}`}
                  >
                    {/* Themed Visual Side */}
                    <div 
                      className={`md:col-span-5 p-8 sm:p-10 flex flex-col items-center justify-center 
                                 bg-gradient-to-br ${style.gradientFrom} ${style.gradientTo} text-white 
                                 rounded-t-xl md:rounded-t-none 
                                 ${index % 2 !== 0 ? 'md:order-last md:rounded-l-none md:rounded-r-2xl' : 'md:rounded-r-none md:rounded-l-2xl'}`} 
                                 // Use order for alternating and adjust rounding
                    >
                      <style.icon className="h-24 w-24 sm:h-28 sm:w-28 mb-5 opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" />
                      <h3 className="text-5xl sm:text-6xl font-black text-center">{style.id}</h3>
                      <p className="text-2xl sm:text-3xl font-bold text-center mt-1">{style.name}</p>
                      <p className="text-center text-lg mt-3 opacity-90">{style.adjective}</p>
                    </div>
                    
                    {/* Content Side using Card sub-components */}
                    <div 
                        className={`md:col-span-7 flex flex-col ${index % 2 !== 0 ? 'md:order-first' : ''}`} // Use order for alternating
                    > 
                        <CardHeader className="p-6 sm:p-8">
                            <CardTitle className={`text-3xl font-semibold ${style.textColor}`}>{style.name} Deep Dive</CardTitle>
                            <CardDescription className="text-slate-400 mt-2 text-lg">Core Focus: {style.focusesOn}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 sm:p-8 pt-0 flex-grow"> 
                            <p className="text-slate-200/90 mb-6 text-md sm:text-lg leading-relaxed">{style.description}</p>
                            <h5 className={`text-xl font-semibold mb-3 mt-5 ${style.lightTextColor}`}>Observed Traits & Keywords:</h5>
                            <div className="flex flex-wrap gap-2.5">
                                {style.keywords.map(keyword => (
                                <Badge key={keyword} variant="outline" 
                                      className={`border-opacity-70 bg-opacity-20 px-3 py-1.5 text-sm font-medium rounded-md
                                                 ${style.badgeBorderColor} 
                                                 ${style.badgeBgColor}
                                                 ${style.badgeTextColor}`}>
                                    {keyword}
                                </Badge>
                                ))}
                            </div>
                        </CardContent>
                        <CardFooter className="p-6 sm:p-8 mt-auto border-t border-slate-700/50"> 
                           <p className="text-sm text-slate-500 italic">Understanding the {style.name} style helps in predicting responses and adapting communication.</p>
                        </CardFooter>
                    </div>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </section>
        
        <section id="take-disc-test-cta" className="py-20 sm:py-24 bg-slate-900/80 backdrop-blur-xl border-t border-slate-800">
            <AnimatedSection className="container mx-auto px-6 text-center">
            <Lucide.ClipboardEdit size={60} className="mx-auto mb-8 text-green-400 drop-shadow-[0_0_15px_theme(colors.green.500)]" />
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-emerald-300 tracking-tight">Ready to Gain Clarity?</h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-12 text-xl sm:text-2xl leading-relaxed">
              Take our concise DISC assessment to gain valuable insights into your behavioral preferences and how you can leverage them for success.
            </p>
            <Button size="lg" onClick={handleStartDiscTest} className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold py-4 px-12 rounded-lg text-xl sm:text-2xl group transition-all duration-300 ease-in-out shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transform hover:scale-105 active:scale-95">
              Start DISC Assessment
              <Lucide.Rocket className="ml-3 h-6 w-6 group-hover:rotate-[15deg] transition-transform duration-300" />
            </Button>
          </AnimatedSection>
        </section>

        <footer className="py-16 text-center border-t-2 border-slate-800 bg-slate-900">
            <p className="text-slate-400">© {new Date().getFullYear()} Inner Compass Navigations. All rights reserved.</p>
            <p className="text-xs text-slate-500 mt-2">
            DISC and other assessments are tools for self-awareness and development, not definitive labels.
            </p>
        </footer>
      </div>
    </div>
  );
};

export default DiscLandingPage;