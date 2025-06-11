// src/data/discStyles.ts (or wherever you keep this data)
import * as Lucide from 'lucide-react';
import type { DiscDimension } from './discQuestions';

export interface DiscStyleInfo {
  id: DiscDimension;
  name: string;
  adjective: string; 
  keywords: string[];
  description: string; 
  focusesOn: string;    
  icon: React.ElementType;
  // Theme classes
  textColorClass: string;        
  lightTextColorClass: string;   
  borderColorClass: string;      
  gradientFromClass: string;   
  gradientToClass: string;     
  hoverShadowColor: string; 
  // Badge-specific colors
  badgeBorderColor: string;  
  badgeBgColor: string;      
  badgeTextColor: string;    
  // Optional detailed content
  strengths?: string[];
  challenges?: string[];
  communicationTips?: string[];
}

// Example data structure, ensure it's populated for all 4 types
export const discStylesData: DiscStyleInfo[] = [
  { 
    id: 'D', name: 'Dominance', adjective: "Direct & Driven", 
    keywords: ['Assertive', 'Results-Oriented', 'Decisive', 'Problem-Solver', 'Competitive', 'Risk-Taker'], 
    description: 'Individuals with a Dominant (D) style are driven, ambitious, and results-focused...', 
    focusesOn: 'Accomplishing tasks, achieving goals, exercising authority...', 
    icon: Lucide.Target, 
    textColorClass: 'text-red-400', lightTextColorClass: 'text-red-300', borderColorClass: 'border-red-500/60',
    gradientFromClass: 'from-red-500', gradientToClass: 'to-orange-500', 
    hoverShadowColor: 'hover:shadow-red-500/30',
    badgeBorderColor: 'border-red-600/50', badgeBgColor: 'bg-red-900/30', badgeTextColor: 'text-red-200',
    strengths: ['Takes initiative', 'Decisive under pressure', 'Results-focused', 'Strong problem-solver'],
    challenges: ['Can be impatient', 'May overlook feelings', 'Can appear blunt', 'Resists micromanagement'],
    communicationTips: ['Be direct and brief', 'Focus on results/solutions', 'Provide options/control']
  },
  { 
    id: 'I', name: 'Influence', adjective: "Inspiring & Sociable", 
    keywords: ['Optimistic', 'Enthusiastic', 'Persuasive', 'Talkative', 'Collaborative', 'Trusting'], 
    description: 'Those with an Influence (I) style are typically outgoing, enthusiastic, and optimistic...', 
    focusesOn: 'Persuading others, building connections, expressing enthusiasm...', 
    icon: Lucide.Megaphone, 
    textColorClass: 'text-yellow-400', lightTextColorClass: 'text-yellow-300', borderColorClass: 'border-yellow-500/60',
    gradientFromClass: 'from-amber-400', gradientToClass: 'to-yellow-400', 
    hoverShadowColor: 'hover:shadow-yellow-500/30',
    badgeBorderColor: 'border-yellow-600/50', badgeBgColor: 'bg-yellow-800/20', badgeTextColor: 'text-yellow-200',
    strengths: ['Charismatic & persuasive', 'Builds networks easily', 'Optimistic & motivating', 'Creative brainstormer'],
    challenges: ['May lack follow-through', 'Can be impulsive', 'Fears social rejection', 'Easily distracted'],
    communicationTips: ['Be friendly, allow social time', 'Show enthusiasm', 'Provide recognition', 'Focus on the big picture']
  },
  { 
    id: 'S', name: 'Steadiness', adjective: "Supportive & Stable", 
    keywords: ['Patient', 'Cooperative', 'Reliable', 'Calm', 'Good Listener', 'Team Player'], 
    description: 'The Steadiness (S) style is marked by a calm, patient, and supportive demeanor...', 
    focusesOn: 'Providing support, maintaining stability, ensuring collaboration...', 
    icon: Lucide.Users2, 
    textColorClass: 'text-green-400', lightTextColorClass: 'text-green-300', borderColorClass: 'border-green-500/60',
    gradientFromClass: 'from-emerald-500', gradientToClass: 'to-green-500', 
    hoverShadowColor: 'hover:shadow-green-500/30',
    badgeBorderColor: 'border-green-600/50', badgeBgColor: 'bg-green-800/20', badgeTextColor: 'text-green-200',
    strengths: ['Reliable & dependable', 'Patient listener', 'Calm under pressure', 'Supportive team player'],
    challenges: ['Resistant to sudden change', 'May avoid conflict', 'Can be overly accommodating', 'Slow to decide'],
    communicationTips: ['Be patient & sincere', 'Explain changes clearly', 'Show appreciation', 'Ask for their opinions']
  },
  { 
    id: 'C', name: 'Conscientiousness', adjective: "Cautious & Correct", 
    keywords: ['Analytical', 'Precise', 'Systematic', 'Quality-Focused', 'Detail-Oriented', 'Orderly'], 
    description: 'Individuals with a Conscientious (C) style prioritize accuracy, quality, and details...', 
    focusesOn: 'Ensuring accuracy, maintaining quality standards, challenging assumptions...', 
    icon: Lucide.Scaling, 
    textColorClass: 'text-blue-400', lightTextColorClass: 'text-blue-300', borderColorClass: 'border-blue-500/60',
    gradientFromClass: 'from-sky-500', gradientToClass: 'to-blue-500', 
    hoverShadowColor: 'hover:shadow-blue-500/30',
    badgeBorderColor: 'border-blue-600/50', badgeBgColor: 'bg-blue-800/20', badgeTextColor: 'text-blue-200',
    strengths: ['Analytical & detail-oriented', 'Maintains high standards for quality', 'Systematic & organized', 'Diplomatic & factual'],
    challenges: ['Can be overly critical', 'Prone to analysis paralysis', 'May appear reserved', 'Risk-averse'],
    communicationTips: ['Be prepared with data', 'Provide clear expectations', 'Allow time for analysis', 'Focus on logic']
  },
];