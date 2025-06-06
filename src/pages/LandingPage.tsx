// src/pages/LandingPage.tsx
import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { mbtiTypesData } from '@/data/mbtiTypes';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import AnimatedStars from '@/components/AnimatedStars'; // <-- NEW IMPORT

import * as Lucide from 'lucide-react';

// ... (DynamicLucideIcon, AnimatedSection, typeGroups, groupColors, gradientFromToClasses remain the same)
interface DynamicLucideIconProps extends Lucide.LucideProps { name: keyof typeof Lucide; }
const DynamicLucideIcon: React.FC<DynamicLucideIconProps> = ({ name, ...props }) => {
  const PotentialIconComponent = Lucide[name];
  if (PotentialIconComponent && (typeof PotentialIconComponent === 'function' || (typeof PotentialIconComponent === 'object' && PotentialIconComponent !== null && '$$typeof' in PotentialIconComponent))) {
    const IconComponent = PotentialIconComponent as React.ElementType; return <IconComponent {...props} />;
  } else { return <Lucide.HelpCircle {...props} />; }
};

const AnimatedSection: React.FC<{ children: React.ReactNode; className?: string; delay?: string }> = ({ children, className, delay = 'delay-0' }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.1,
    rootMargin: '-50px 0px',
  });
  return (
    <div ref={ref} className={`transition-all duration-1000 ease-out ${delay} ${className ?? ''} ${inView ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-12 blur-sm'}`}>
      {children}
    </div>
  );
};

const typeGroups = {
  Analysts: ['INTJ', 'INTP', 'ENTJ', 'ENTP'],
  Diplomats: ['INFJ', 'INFP', 'ENFJ', 'ENFP'],
  Sentinels: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'],
  Explorers: ['ISTP', 'ISFP', 'ESTP', 'ESFP'],
};

interface GroupColorInfo {
    border: string;
    text: string;
    bg: string;
    icon: React.ElementType;
}

const groupColors: Record<string, GroupColorInfo> = {
    Analysts: { border: 'border-purple-500/70', text: 'text-purple-300', bg: 'bg-purple-950/30', icon: Lucide.BrainCog },
    Diplomats: { border: 'border-emerald-500/70', text: 'text-emerald-300', bg: 'bg-emerald-950/30', icon: Lucide.HeartHandshake },
    Sentinels: { border: 'border-amber-500/70', text: 'text-amber-300', bg: 'bg-amber-950/30', icon: Lucide.ShieldCheck },
    Explorers: { border: 'border-rose-500/70', text: 'text-rose-300', bg: 'bg-rose-950/30', icon: Lucide.Compass },
};


const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const mainContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mainEl = mainContainerRef.current;
    if (!mainEl) return;
    const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        // Spotlight relative to viewport for full page effect
        mainEl.style.setProperty('--spotlight-x', `${clientX}px`);
        mainEl.style.setProperty('--spotlight-y', `${clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove); 
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  useEffect(() => {
    const handleCardMouseMove = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLDivElement;
      const rect = target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      target.style.setProperty('--mouse-x', `${x}px`);
      target.style.setProperty('--mouse-y', `${y}px`);
    };
    const cards = document.querySelectorAll('.glowing-card-container, .glowing-card');
    cards.forEach(card => card.addEventListener('mousemove', handleCardMouseMove as EventListener));
    return () => {
      cards.forEach(card => card.removeEventListener('mousemove', handleCardMouseMove as EventListener));
    };
  }, []);


  const handleStartTest = () => navigate('/test');

  const dichotomyData = [
    { title: "Extraversion (E)", description: "Focus energy outwards, action-oriented.", icon: Lucide.SunMedium },
    { title: "Introversion (I)", description: "Focus energy inwards, thought-oriented.", icon: Lucide.Moon },
    { title: "Sensing (S)", description: "Perceive concrete, tangible information.", icon: Lucide.ScanEye },
    { title: "Intuition (N)", description: "Perceive patterns, future implications.", icon: Lucide.Sparkle },
    { title: "Thinking (T)", description: "Decide based on logic, objective analysis.", icon: Lucide.Cog },
    { title: "Feeling (F)", description: "Decide based on values, harmony, empathy.", icon: Lucide.Heart },
    { title: "Judging (J)", description: "Prefer structure, plans, decisiveness.", icon: Lucide.ListChecks },
    { title: "Perceiving (P)", description: "Prefer flexibility, spontaneity, openness.", icon: Lucide.Shuffle },
  ];

  return (
    // Main container for spotlight and pattern
    <div ref={mainContainerRef} className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-sky-500 selection:text-white spotlight-container relative isolate"> {/* Added relative and isolate */}
      
      {/* NEW: Animated Stars Background Component - Sits behind the spotlight */}
      <AnimatedStars count={50} /> 
      
      {/* Spotlight Pseudo-Element - this will be created by CSS applied to .spotlight-container */}
      {/* No actual div needed here for the spotlight itself, CSS handles it via ::before */}

      <div className="relative z-10"> {/* Content wrapper above spotlight and stars */}
      
        {/* HERO SECTION */}
        <header className="relative container mx-auto px-4 sm:px-6 flex flex-col justify-center items-center text-center min-h-screen pt-20 pb-16 sm:pt-28 sm:pb-20 overflow-hidden">
          {/* Content is constrained by `container` and `max-w-3xl` on the paragraph */}
          <AnimatedSection delay="delay-0" className="flex flex-col items-center">
            <Lucide.Brain size={80} className="mb-8 text-sky-300 animate-pulse drop-shadow-[0_0_20px_theme(colors.sky.500/0.7)]" /> {/* Slightly larger Brain */}
          </AnimatedSection>
          <AnimatedSection delay="delay-200" className="w-full">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tighter"> {/* Even Larger Title */}
              Discover Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-cyan-300 to-teal-300">True Self</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay="delay-400" className="w-full">
            <p className="text-lg sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Unlock profound insights into your personality with our MBTI-inspired assessment.
              Understand your preferences and how you interact with the world.
            </p>
          </AnimatedSection>
          <AnimatedSection delay="delay-600" className="w-full">
            <Button size="lg" className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-semibold py-4 px-10 rounded-lg text-xl sm:text-2xl group transition-all duration-300 ease-in-out shadow-xl hover:shadow-sky-500/50 transform hover:scale-105">
              Start The Test
              <Lucide.ArrowRight className="ml-3 h-6 w-6 sm:h-7 sm:w-7 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Button>
          </AnimatedSection>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-70">
            <Lucide.ChevronDown className="w-10 h-10 text-slate-600" />
          </div>
        </header>

        <section id="what-is-mbti" className="py-20 sm:py-24 bg-slate-900/70 backdrop-blur-lg">
          <AnimatedSection className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto text-center">
              <Lucide.Sparkles size={52} className="mx-auto mb-6 text-cyan-400 drop-shadow-[0_0_10px_theme(colors.cyan.500)]" />
              <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-sky-300 tracking-tight">The Four Dichotomies</h2>
              <p className="text-slate-300 mb-12 text-xl leading-relaxed">
                This framework explores your preferences across four key dimensions, each with two opposing poles:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                {dichotomyData.map((item, index) => {
                  const DichotomyIcon = item.icon;
                  return (
                    <AnimatedSection key={item.title} delay={`delay-${index * 100}`}>
                      <div className="glowing-card relative p-0.5 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl h-full group flex flex-col">
                        <div className="absolute inset-0 glowing-card-border-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl -z-10"></div>
                        <div className="relative z-10 flex flex-col items-center text-center p-6 bg-slate-800/90 rounded-lg border border-slate-700/70 h-full flex-grow">
                          <DichotomyIcon className="h-10 w-10 sm:h-12 sm:w-12 text-cyan-400 mb-4 shrink-0" />
                          <h3 className="font-semibold text-xl text-slate-100 mb-2">{item.title}</h3>
                          <p className="text-slate-400 text-sm flex-grow">{item.description}</p>
                        </div>
                      </div>
                    </AnimatedSection>
                  );
                })}
              </div>
              <AnimatedSection delay="delay-500">
                <p className="text-slate-300 mt-12 text-xl leading-relaxed">
                  Knowing your type can enhance self-awareness, guide career choices, improve relationships, and foster personal growth. It's a tool for understanding, not a label to limit.
                </p>
              </AnimatedSection>
            </div>
          </AnimatedSection>
        </section>

        {/* 16 ARCHETYPES SECTION */}
        <section id="mbti-types" className="py-20 sm:py-24">
          <div className="container mx-auto px-4">
            <AnimatedSection className="text-center mb-16 sm:mb-20">
              <Lucide.LayoutGrid size={52} className="mx-auto mb-6 text-sky-400 drop-shadow-[0_0_10px_theme(colors.sky.500)]" />
              <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-sky-300 tracking-tight">The 16 Archetypes</h2>
              <p className="text-slate-300 max-w-3xl mx-auto text-xl leading-relaxed">
                Each archetype offers a unique window into how individuals energize, perceive, decide, and live. Explore the diverse facets of human personality. Hover on a card to reveal more.
              </p>
            </AnimatedSection>

            {Object.entries(typeGroups).map(([groupName, typesInGroup], groupIndex) => {
              const GroupIcon = groupColors[groupName]?.icon || Lucide.HelpCircle; 
              const groupStyling = groupColors[groupName] || { border: 'border-slate-700', text: 'text-slate-300', bg: 'bg-slate-900/40' };

              return (
                <AnimatedSection key={groupName} className="mb-16" delay={`delay-${groupIndex * 150}`}>
                  <div className="flex items-center mb-8 px-2">
                    <GroupIcon className={`h-10 w-10 mr-4 ${groupStyling.text}`} />
                    <h3 className={`text-3xl font-bold ${groupStyling.text}`}>{groupName}</h3>
                    <div className={`flex-grow h-px ml-6 ${groupStyling.bg.replace('bg-','bg-opacity-30 ')}`}></div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {mbtiTypesData
                      .filter(mbtiType => typesInGroup.includes(mbtiType.type))
                      .map((mbtiType, typeIndex) => (
                        <AnimatedSection key={mbtiType.id} delay={`delay-${typeIndex * 100}`}>
                          <Card
                            className="group rounded-2xl [perspective:1000px] min-h-[320px] sm:min-h-[340px] cursor-pointer bg-transparent border-none shadow-none p-0 relative"
                          >
                            <div className="absolute inset-0 glowing-card-border-gradient opacity-0 group-hover:opacity-75 transition-opacity duration-300 rounded-2xl z-0"></div>
                            <div className="relative z-10 w-full h-full transition-transform duration-700 ease-in-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                              <div className={`inset-0 w-full h-[300px] [backface-visibility:hidden] rounded-xl border-2 ${groupStyling.border} ${groupStyling.bg} backdrop-blur-md shadow-xl flex flex-col items-center text-center p-6 justify-between`}>
                                <div>
                                  <h3 className={`text-4xl font-extrabold ${groupStyling.text} transition-colors duration-300`}>{mbtiType.type}</h3>
                                  <p className="text-lg font-semibold text-slate-200 mt-1">{mbtiType.nickname}</p>
                                </div>
                                <div className="my-4 flex-grow flex flex-col justify-center items-center">
                                  <DynamicLucideIcon name={mbtiType.iconName || 'HelpCircle'} size={72} className={`${groupStyling.text} transition-colors duration-300 group-hover:scale-110 transform`} />
                                </div>
                                <p className="text-xs text-slate-400 group-hover:text-slate-300 transition-colors">{mbtiType.tagline}</p>
                              </div>
                              <div className={`absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl border-2 ${groupStyling.border} bg-gradient-to-br ${gradientFromToClasses(mbtiType.group as keyof typeof typeGroups)} backdrop-blur-lg shadow-2xl flex flex-col items-center justify-center text-center p-6 overflow-y-auto custom-scrollbar`}>
                                <h4 className={`text-2xl font-bold mb-3 ${groupStyling.text}`}>{mbtiType.type} - {mbtiType.nickname}</h4>
                                <p className="text-sm text-slate-100 leading-relaxed">{mbtiType.description}</p>
                              </div>
                            </div>
                          </Card>
                        </AnimatedSection>
                    ))}
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </section>

        <section id="take-the-test" className="py-20 sm:py-24 bg-slate-900/70 backdrop-blur-lg">
          <AnimatedSection className="container mx-auto px-6 text-center">
            <Lucide.ClipboardEdit size={52} className="mx-auto mb-6 text-cyan-400 drop-shadow-[0_0_10px_theme(colors.cyan.500)]" />
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-sky-300 tracking-tight">Ready to Embark on Your Journey?</h2>
            <p className="text-slate-300 max-w-xl mx-auto mb-12 text-xl leading-relaxed">
              Our carefully crafted assessment is designed to be insightful and engaging. Answer honestly to discover the personality type that resonates most with you.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 text-white font-semibold py-4 px-10 rounded-lg text-xl group transition-all duration-300 ease-in-out shadow-xl hover:shadow-sky-500/50 transform hover:scale-105" onClick={handleStartTest}>
              Start Your Self-Discovery
              <Lucide.Rocket className="ml-3 h-6 w-6 group-hover:rotate-[15deg] transition-transform duration-300" />
            </Button>
          </AnimatedSection>
        </section>

        <footer className="py-10 text-center border-t border-slate-700/50">
          <p className="text-slate-400">© {new Date().getFullYear()} MBTI Insights. All rights reserved.</p>
          <p className="text-xs text-slate-500 mt-2">
            MBTI is a trademark or registered trademark of The Myers & Briggs Foundation in the United States and other countries. This site is not affiliated with The Myers & Briggs Foundation.
          </p>
        </footer>
      </div> {/* End of relative z-10 content wrapper */}
    </div> // End of mainContainerRef spotlight-container
  );
};

const gradientFromToClasses = (group: keyof typeof typeGroups): string => {
    switch (group) {
        case 'Analysts': return 'from-purple-700/80 via-indigo-800/70 to-purple-700/80';
        case 'Diplomats': return 'from-emerald-700/80 via-teal-800/70 to-emerald-700/80';
        case 'Sentinels': return 'from-amber-700/80 via-orange-800/70 to-amber-700/80';
        case 'Explorers': return 'from-rose-700/80 via-pink-800/70 to-rose-700/80';
        default: return 'from-slate-700/80 via-gray-800/70 to-slate-700/80';
    }
};

export default LandingPage;