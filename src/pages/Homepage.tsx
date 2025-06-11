// src/pages/HomePage.tsx
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import * as Lucide from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import AnimatedStars from '@/components/AnimatedStars';

// Reusable AnimatedSection component (can be moved to a shared components folder)
const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string; delay?: string }> = ({ children, className, delay = 'delay-0' }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1, rootMargin: '-50px 0px' });
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out ${delay} ${className ?? ''} ${inView ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}>
      {children}
    </div>
  );
};

interface TestInfo {
  id: string;
  name: string;
  tagline: string;
  description: string;
  path: string;
  icon: React.ElementType;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string; // e.g., 'sky-500' for shadows/hovers
}

const availableTests: TestInfo[] = [
  {
    id: 'mbti',
    name: 'MBTI Framework',
    tagline: 'Uncover your 16-type personality profile.',
    description: 'Explore your psychological preferences in how you perceive the world and make decisions, based on Carl Jung\'s theory.',
    path: '/mbti',
    icon: Lucide.Users,
    gradientFrom: 'from-sky-600',
    gradientTo: 'to-cyan-500',
    accentColor: 'cyan-500',
  },
  {
    id: 'disc',
    name: 'DISC Assessment',
    tagline: 'Understand your behavioral style.',
    description: 'Discover your Dominance, Influence, Steadiness, and Conscientiousness to improve communication and teamwork.',
    path: '/disc',
    icon: Lucide.PieChart,
    gradientFrom: 'from-emerald-600',
    gradientTo: 'to-green-500',
    accentColor: 'green-500',
  },
  // Example: Add a Values Test
  {
    id: 'values',
    name: 'Core Values Identifier',
    tagline: 'Discover what truly drives you.',
    description: 'Clarify your fundamental personal values to align your actions with your deepest motivations and find greater purpose.',
    path: '/values', // Create this page later
    icon: Lucide.Gem,
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-yellow-500',
    accentColor: 'yellow-500',
  },
];

const HomePage: React.FC = () => {
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

  const benefits = [
    { icon: Lucide.UserCheck, title: "Enhanced Self-Awareness", description: "Gain deeper clarity on your strengths, weaknesses, and motivations." },
    { icon: Lucide.MessageSquareHeart, title: "Improved Relationships", description: "Understand others better and foster more meaningful connections." },
    { icon: Lucide.Briefcase, title: "Informed Career Paths", description: "Align your work with your natural talents and preferences for greater fulfillment." },
    { icon: Lucide.TrendingUp, title: "Personal Growth", description: "Identify areas for development and unlock your full potential." },
  ];

  return (
    <div ref={mainContainerRef} className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-sky-500 selection:text-white spotlight-container relative isolate">
      {" "}
      <AnimatedStars count={50} />
      <div className="relative z-10">
        {/* Hero Section */}
        <header className="min-w-full relative container mx-auto px-4 sm:px-6 py-28 sm:py-36 text-center overflow-hidden min-h-screen flex flex-col justify-center items-center">
          <div className="absolute inset-0 -z-10"> {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-sky-500/20 rounded-full filter blur-3xl opacity-70 animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-cyan-500/20 rounded-full filter blur-3xl opacity-70 animate-pulse-slower animation-delay-2000"></div>
          </div>
          
          <AnimatedSection delay="delay-0" className="mb-8">
            <Lucide.Compass size={80} className="mx-auto text-sky-400 drop-shadow-[0_0_25px_theme(colors.sky.500)] animate-float" />
            {/* Add animate-float keyframes to your CSS if desired */}
          </AnimatedSection>
          
          <AnimatedSection delay="delay-200">
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black mb-6 tracking-tighter leading-tight">
              Navigate Your <br className="sm:hidden"/>
              <span className="animate-text-gradient bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300">
                Inner Universe
              </span>
            </h1>
          </AnimatedSection>
          
          <AnimatedSection delay="delay-400">
            <p className="text-xl sm:text-2xl lg:text-3xl text-slate-300 max-w-4xl mx-auto mb-12 leading-relaxed font-light">
              Uncover the unique patterns of your mind. Our insightful assessments are gateways to profound self-discovery and personal evolution.
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay="delay-600">
            <Button
                size="lg"
                onClick={() => document.getElementById('available-tests')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-bold py-4 px-12 rounded-lg text-xl sm:text-2xl group transition-all duration-300 ease-in-out 
                           shadow-2xl shadow-sky-500/30 hover:shadow-sky-500/50 transform hover:scale-105 active:scale-95"
            >
                Begin Exploration
                <Lucide.Sparkles className="ml-3 h-6 w-6 opacity-80 group-hover:opacity-100 group-hover:scale-125 transition-all duration-300" />
            </Button>
          </AnimatedSection>
           <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce opacity-70">
            <Lucide.Mouse className="w-7 h-7 text-slate-500" />
            <Lucide.ArrowDown className="w-5 h-5 text-slate-500 -mt-1 mx-auto" />
          </div>
        </header>

        {/* Available Tests Section */}
        <section id="available-tests" className="py-20 sm:py-28 bg-slate-900/80 backdrop-blur-xl border-t border-b border-slate-800">
          <AnimatedSection className="container mx-auto px-4 sm:px-6">
            <div className="max-w-6xl mx-auto text-center">
              <Lucide.ListChecks size={60} className="mx-auto mb-8 text-cyan-400 drop-shadow-[0_0_15px_theme(colors.cyan.500)]" />
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-sky-300 tracking-tight">Chart Your Course</h2>
              <p className="text-slate-300 mb-16 sm:mb-20 text-xl sm:text-2xl leading-relaxed max-w-3xl mx-auto">
                Each assessment offers a unique lens to view your strengths, preferences, and interaction styles.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {availableTests.map((test, index) => (
                  <AnimatedSection key={test.id} delay={`delay-${index * 100}`}>
                    <Card className={`glowing-card-container relative h-full flex flex-col bg-slate-800/60 border-2 border-slate-700/50 shadow-xl hover:border-transparent transition-all duration-300 rounded-2xl overflow-hidden group transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-${test.accentColor}/30`}>
                      <div className={`absolute inset-0 glowing-card-border-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl z-0 bg-gradient-to-br ${test.gradientFrom} ${test.gradientTo}`}></div> {/* Gradient Border on hover */}
                      
                      <div className="relative z-10 flex flex-col h-full">
                        <CardHeader className={`p-6 sm:p-8 border-b border-slate-700/50 bg-gradient-to-br ${test.gradientFrom} ${test.gradientTo} bg-opacity-10 group-hover:bg-opacity-20 transition-all`}>
                          <div className="flex items-center mb-3">
                            <test.icon className={`h-12 w-12 text-white/90 mr-5 drop-shadow-lg`} />
                            <CardTitle className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{test.name}</CardTitle>
                          </div>
                          <CardDescription className="text-slate-200/80 text-md italic">{test.tagline}</CardDescription>
                        </CardHeader>
                        <CardContent className="p-6 sm:p-8 flex-grow">
                          <p className="text-slate-300 leading-relaxed text-md">{test.description}</p>
                        </CardContent>
                        <CardFooter className="p-6 mt-auto border-t border-slate-700/50">
                          <Button 
                            asChild 
                            size="lg" 
                            className={`w-full font-semibold text-lg bg-gradient-to-r ${test.gradientFrom} ${test.gradientTo} hover:brightness-125 text-white transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-md`}
                          >
                            <Link to={test.path}>
                              Explore {test.id.toUpperCase()} <Lucide.ChevronRightCircle className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </div>
                    </Card>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </section>
        
        {/* Why Self-Discovery Section */}
        <section className="py-20 sm:py-28">
          <AnimatedSection className="container mx-auto px-4 sm:px-6">
              <div className="max-w-5xl mx-auto text-center">
                  <Lucide.ScanHeart size={60} className="mx-auto mb-8 text-sky-400 drop-shadow-[0_0_15px_theme(colors.sky.500)]" />
                  <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-sky-300 tracking-tight">The Journey Within Matters</h2>
                  <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed mb-16 sm:mb-20 max-w-3xl mx-auto">
                      Understanding your inner landscape empowers you to navigate life with greater purpose, clarity, and connection.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <AnimatedSection key={benefit.title} delay={`delay-${index * 100}`}>
                            <div className="benefit-card p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 h-full flex flex-col items-center text-center transition-all duration-300 hover:bg-slate-800 hover:border-sky-500/50 hover:shadow-2xl hover:shadow-sky-700/20 transform hover:-translate-y-2">
                                <benefit.icon className="benefit-icon h-12 w-12 mb-5 text-sky-400 transition-all duration-300" />
                                <h3 className="benefit-title text-xl font-semibold text-slate-100 mb-2 transition-colors duration-300">{benefit.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{benefit.description}</p>
                            </div>
                        </AnimatedSection>
                    ))}
                  </div>
              </div>
          </AnimatedSection>
        </section>

        {/* How It Works Section (Example) */}
        <section className="py-20 sm:py-24 bg-slate-900/70 backdrop-blur-lg border-t border-slate-800">
          <AnimatedSection className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto text-center">
              <Lucide.Workflow size={52} className="mx-auto mb-8 text-cyan-400 drop-shadow-[0_0_10px_theme(colors.cyan.500)]" />
              <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-sky-300 tracking-tight">Your Path to Insight</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 relative">
                {/* Connecting lines (decorative) */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2">
                    <svg width="100%" height="100%" className="overflow-visible">
                        <line x1="16.66%" y1="0" x2="50%" y2="0" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="8 4"/>
                        <line x1="50%" y1="0" x2="83.33%" y2="0" stroke="url(#lineGradient)" strokeWidth="2" strokeDasharray="8 4"/>
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#0ea5e9" />
                            <stop offset="100%" stopColor="#14b8a6" />
                            </linearGradient>
                        </defs>
                    </svg>
                </div>

                {[
                  { icon: Lucide.SquareMousePointer, title: "Choose Your Test", description: "Select an assessment that piques your curiosity or addresses your current focus." },
                  { icon: Lucide.Edit3, title: "Answer Thoughtfully", description: "Respond honestly based on your typical preferences and behaviors for accurate insights." },
                  { icon: Lucide.BarChartBig, title: "Receive Your Profile", description: "Get a detailed report anveling key aspects of your personality or behavioral style." },
                ].map((step, index) => (
                  <AnimatedSection key={step.title} delay={`delay-${index * 150}`} className="relative z-10">
                    <div className="p-6 bg-slate-800 rounded-xl border border-slate-700 text-center h-full flex flex-col items-center">
                      <div className={`mb-5 p-4 rounded-full bg-gradient-to-br ${index === 0 ? 'from-sky-500 to-cyan-500' : index === 1 ? 'from-cyan-500 to-teal-500' : 'from-teal-500 to-emerald-500'} text-white shadow-lg`}>
                        <step.icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-100 mb-2">{step.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </section>


        <footer className="py-16 text-center border-t border-slate-700/50">
          <Lucide.Send className="mx-auto h-10 w-10 text-sky-400 mb-6" />
          <h3 className="text-3xl font-bold text-slate-100 mb-3">Ready to Begin?</h3>
          <p className="text-slate-400 mb-8 max-w-md mx-auto">
            Your journey of self-discovery starts with a single step. Choose a test and unlock a new perspective.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-bold py-4 px-12 rounded-lg text-xl group transition-all duration-300 ease-in-out shadow-xl hover:shadow-sky-500/50 transform hover:scale-105 active:scale-95" onClick={() => document.getElementById('available-tests')?.scrollIntoView({ behavior: 'smooth' })}>
            Explore Tests
          </Button>
          <div className="mt-12 text-slate-400">© {new Date().getFullYear()} Inner Compass Navigations. All rights reserved.</div>
          <p className="text-xs text-slate-500 mt-2">
            Assessments are for informational purposes and self-exploration. Not a substitute for professional advice.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default HomePage;