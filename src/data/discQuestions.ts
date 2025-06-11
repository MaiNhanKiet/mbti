// src/data/discQuestions.ts

export type DiscDimension = 'D' | 'I' | 'S' | 'C';

export interface DiscOption {
  text: string;
  // For simplified scoring: which dimension this option primarily loads onto if chosen as "Most"
  mostDimension: DiscDimension; 
}

export interface DiscQuestionSet {
  id: number;
  options: [DiscOption, DiscOption, DiscOption, DiscOption]; // Exactly four options
}

const discQuestionData: DiscQuestionSet[] = [
  {
    id: 1,
    options: [
      { text: "Adventurous", mostDimension: 'D' },
      { text: "Enthusiastic", mostDimension: 'I' },
      { text: "Patient", mostDimension: 'S' },
      { text: "Accurate", mostDimension: 'C' },
    ],
  },
  {
    id: 2,
    options: [
      { text: "Forceful", mostDimension: 'D' },
      { text: "Sociable", mostDimension: 'I' },
      { text: "Loyal", mostDimension: 'S' },
      { text: "Systematic", mostDimension: 'C' },
    ],
  },
  {
    id: 3,
    options: [
      { text: "Bold", mostDimension: 'D' },
      { text: "Talkative", mostDimension: 'I' },
      { text: "Gentle", mostDimension: 'S' },
      { text: "Precise", mostDimension: 'C' },
    ],
  },
  {
    id: 4,
    options: [
      { text: "Competitive", mostDimension: 'D' },
      { text: "Optimistic", mostDimension: 'I' },
      { text: "Supportive", mostDimension: 'S' },
      { text: "Perfectionistic", mostDimension: 'C' },
    ],
  },
  {
    id: 5,
    options: [
      { text: "Direct", mostDimension: 'D' },
      { text: "Inspiring", mostDimension: 'I' },
      { text: "Calm", mostDimension: 'S' },
      { text: "Analytical", mostDimension: 'C' },
    ],
  },
  {
    id: 6,
    options: [
      { text: "Demanding", mostDimension: 'D' },
      { text: "Charming", mostDimension: 'I' },
      { text: "Agreeable", mostDimension: 'S' },
      { text: "Careful", mostDimension: 'C' },
    ],
  },
  {
    id: 7,
    options: [
      { text: "Decisive", mostDimension: 'D' },
      { text: "Persuasive", mostDimension: 'I' },
      { text: "Good Listener", mostDimension: 'S' },
      { text: "Organized", mostDimension: 'C' },
    ],
  },
  {
    id: 8,
    options: [
      { text: "Takes Charge", mostDimension: 'D' },
      { text: "Outgoing", mostDimension: 'I' },
      { text: "Steady", mostDimension: 'S' },
      { text: "Fact-finder", mostDimension: 'C' },
    ],
  },
   {
    id: 9,
    options: [
      { text: "Results-driven", mostDimension: 'D' },
      { text: "Spontaneous", mostDimension: 'I' },
      { text: "Kind", mostDimension: 'S' },
      { text: "Logical", mostDimension: 'C' },
    ],
  },
   {
    id: 10,
    options: [
      { text: "Assertive", mostDimension: 'D' },
      { text: "Convincing", mostDimension: 'I' },
      { text: "Relaxed", mostDimension: 'S' },
      { text: "Reserved", mostDimension: 'C' },
    ],
  },
  {
    id: 11,
    options: [
      { text: "Daring", mostDimension: 'D' },
      { text: "Playful", mostDimension: 'I' },
      { text: "Predictable", mostDimension: 'S' },
      { text: "Cautious", mostDimension: 'C' },
    ],
  },
  {
    id: 12,
    options: [
      { text: "Dominant", mostDimension: 'D' },
      { text: "Lively", mostDimension: 'I' },
      { text: "Considerate", mostDimension: 'S' },
      { text: "Formal", mostDimension: 'C' },
    ],
  },
  {
    id: 13,
    options: [
      { text: "Problem Solver", mostDimension: 'D' },
      { text: "Trusting", mostDimension: 'I' },
      { text: "Stable", mostDimension: 'S' },
      { text: "Orderly", mostDimension: 'C' },
    ],
  },
  {
    id: 14,
    options: [
      { text: "Risk-Taker", mostDimension: 'D' },
      { text: "Magnetic", mostDimension: 'I' },
      { text: "Deliberate", mostDimension: 'S' },
      { text: "Compliant", mostDimension: 'C' },
    ],
  },
  {
    id: 15,
    options: [
      { text: "Independent", mostDimension: 'D' },
      { text: "Influential", mostDimension: 'I' },
      { text: "Team Player", mostDimension: 'S' },
      { text: "Detail-Oriented", mostDimension: 'C' },
    ],
  },
  {
    id: 16,
    options: [
      { text: "Strong-willed", mostDimension: 'D' },
      { text: "Popular", mostDimension: 'I' },
      { text: "Amiable", mostDimension: 'S' },
      { text: "High Standards", mostDimension: 'C' },
    ],
  },
  {
    id: 17,
    options: [
      { text: "Determined", mostDimension: 'D' },
      { text: "Expressive", mostDimension: 'I' },
      { text: "Cooperative", mostDimension: 'S' },
      { text: "Analytical", mostDimension: 'C' },
    ],
  },
  {
    id: 18,
    options: [
      { text: "Goal-oriented", mostDimension: 'D' },
      { text: "Fun-loving", mostDimension: 'I' },
      { text: "Consistent", mostDimension: 'S' },
      { text: "Disciplined", mostDimension: 'C' },
    ],
  },
  {
    id: 19,
    options: [
      { text: "Authoritative", mostDimension: 'D' },
      { text: "Generous", mostDimension: 'I' },
      { text: "Possessive", mostDimension: 'S' },
      { text: "Private", mostDimension: 'C' },
    ],
  },
  {
    id: 20,
    options: [
      { text: "Takes Control", mostDimension: 'D' },
      { text: "Animated", mostDimension: 'I' },
      { text: "Harmonious", mostDimension: 'S' },
      { text: "Fact-based", mostDimension: 'C' },
    ],
  },
  {
    id: 21,
    options: [
      { text: "Firm", mostDimension: 'D' },
      { text: "Upbeat", mostDimension: 'I' },
      { text: "Modest", mostDimension: 'S' },
      { text: "Procedural", mostDimension: 'C' },
    ],
  },
  {
    id: 22,
    options: [
      { text: "Action-oriented", mostDimension: 'D' },
      { text: "Verbal", mostDimension: 'I' },
      { text: "Dependable", mostDimension: 'S' },
      { text: "Logical", mostDimension: 'C' },
    ],
  },
  {
    id: 23,
    options: [
      { text: "Outspoken", mostDimension: 'D' },
      { text: "Impulsive", mostDimension: 'I' },
      { text: "Neighborly", mostDimension: 'S' },
      { text: "Reserved", mostDimension: 'C' },
    ],
  },
  {
    id: 24,
    options: [
      { text: "Persistent", mostDimension: 'D' },
      { text: "Emotional", mostDimension: 'I' },
      { text: "Even-tempered", mostDimension: 'S' },
      { text: "Critical Thinker", mostDimension: 'C' },
    ],
  },
  {
    id: 25,
    options: [
      { text: "Self-reliant", mostDimension: 'D' },
      { text: "Positive", mostDimension: 'I' },
      { text: "Methodical", mostDimension: 'S' },
      { text: "Structured", mostDimension: 'C' },
    ],
  },
  {
    id: 26,
    options: [
      { text: "Tough", mostDimension: 'D' },
      { text: "Spirited", mostDimension: 'I' },
      { text: "Sincere", mostDimension: 'S' },
      { text: "Industrious", mostDimension: 'C' },
    ],
  },
  {
    id: 27,
    options: [
      { text: "Task-oriented", mostDimension: 'D' },
      { text: "People-oriented", mostDimension: 'I' },
      { text: "Process-oriented", mostDimension: 'S' },
      { text: "Rule-oriented", mostDimension: 'C' },
    ],
  },
  {
    id: 28,
    options: [
      { text: "Ambitious", mostDimension: 'D' },
      { text: "Gregarious", mostDimension: 'I' },
      { text: "Peaceful", mostDimension: 'S' },
      { text: "Prudent", mostDimension: 'C' },
    ],
  }
];

export const getDiscQuestions = (): DiscQuestionSet[] => {
  // You could shuffle the order of the sets each time the test is taken
  // return [...discQuestionData].sort(() => Math.random() - 0.5);
  
  // For consistency, we'll return them in order for now.
  return discQuestionData; 
};