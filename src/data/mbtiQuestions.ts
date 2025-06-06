// src/data/mbtiQuestions.ts

export type MbtiDimensionValue = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

export interface MbtiQuestionOption {
  text: string;
  value: MbtiDimensionValue;
}

export interface MbtiQuestion {
  id: number;
  text: string;
  options: [MbtiQuestionOption, MbtiQuestionOption];
}

export const mbtiQuestions: MbtiQuestion[] = [
  // --- Extraversion (E) vs. Introversion (I) ---
  {
    id: 1,
    text: 'When you are at a social gathering, you are more likely to:',
    options: [
      { text: 'Interact with many people, including strangers.', value: 'E' },
      { text: 'Interact with a few people you know well.', value: 'I' },
    ],
  },
  {
    id: 2,
    text: 'After a long week of work or study, you feel most re-energized by:',
    options: [
      { text: 'Going out and socializing with friends.', value: 'E' },
      { text: 'Spending quiet time alone or with one or two close companions.', value: 'I' },
    ],
  },
  {
    id: 3,
    text: 'In group discussions, you tend to:',
    options: [
      { text: 'Speak up readily and voice your thoughts often.', value: 'E' },
      { text: 'Listen carefully and speak up when you have something specific to contribute.', value: 'I' },
    ],
  },
  {
    id: 4,
    text: 'When meeting new people, you are usually:',
    options: [
      { text: 'Quick to introduce yourself and start conversations.', value: 'E' },
      { text: 'More reserved and wait for others to approach you.', value: 'I' },
    ],
  },
  {
    id: 5,
    text: 'You find it more natural to:',
    options: [
      { text: 'Think out loud while processing information.', value: 'E' },
      { text: 'Reflect internally before sharing your thoughts.', value: 'I' },
    ],
  },

  // --- Sensing (S) vs. Intuition (N) ---
  {
    id: 6,
    text: 'When learning something new, you prefer to:',
    options: [
      { text: 'Focus on concrete facts, details, and practical applications.', value: 'S' },
      { text: 'Focus on underlying patterns, theories, and future possibilities.', value: 'N' },
    ],
  },
  {
    id: 7,
    text: 'You are generally more interested in:',
    options: [
      { text: 'The actual and current reality of things.', value: 'S' },
      { text: 'The potential and future implications of things.', value: 'N' },
    ],
  },
  {
    id: 8,
    text: 'When describing an experience, you are more likely to:',
    options: [
      { text: 'Provide specific details and a step-by-step account.', value: 'S' },
      { text: 'Describe the overall impression, themes, or meaning.', value: 'N' },
    ],
  },
  {
    id: 9,
    text: 'You tend to trust:',
    options: [
      { text: 'What you can verify through your senses and direct experience.', value: 'S' },
      { text: 'Your insights, hunches, and the connections you see.', value: 'N' },
    ],
  },
  {
    id: 10,
    text: 'When solving problems, you prefer to:',
    options: [
      { text: 'Use established methods and practical solutions that have worked before.', value: 'S' },
      { text: 'Brainstorm innovative ideas and explore novel approaches.', value: 'N' },
    ],
  },

  // --- Thinking (T) vs. Feeling (F) ---
  {
    id: 11,
    text: 'When making important decisions, you primarily rely on:',
    options: [
      { text: 'Logical analysis, objective principles, and fairness.', value: 'T' },
      { text: 'Personal values, empathy, and how decisions will affect others.', value: 'F' },
    ],
  },
  {
    id: 12,
    text: 'You would rather be seen as:',
    options: [
      { text: 'Competent and logical.', value: 'T' },
      { text: 'Compassionate and understanding.', value: 'F' },
    ],
  },
  {
    id: 13,
    text: 'When in a disagreement, your first instinct is to:',
    options: [
      { text: 'Find the logical flaw in the argument and point it out.', value: 'T' },
      { text: 'Consider everyone\'s feelings and seek harmony.', value: 'F' },
    ],
  },
  {
    id: 14,
    text: 'When giving feedback, you prioritize:',
    options: [
      { text: 'Clarity and directness, even if it might be hard to hear.', value: 'T' },
      { text: 'Tact and encouragement, ensuring the person feels supported.', value: 'F' },
    ],
  },
  {
    id: 15,
    text: 'You are more convinced by arguments that are:',
    options: [
      { text: 'Logically sound and based on evidence.', value: 'T' },
      { text: 'Aligned with your values and emotionally resonant.', value: 'F' },
    ],
  },

  // --- Judging (J) vs. Perceiving (P) ---
  {
    id: 16,
    text: 'You prefer your life to be mostly:',
    options: [
      { text: 'Planned, orderly, and with clear schedules.', value: 'J' },
      { text: 'Flexible, spontaneous, and open to new experiences.', value: 'P' },
    ],
  },
  {
    id: 17,
    text: 'When working on a project, you generally prefer to:',
    options: [
      { text: 'Make a detailed plan and stick to it, aiming for completion.', value: 'J' },
      { text: 'Keep your options open, adapt as you go, and enjoy the process.', value: 'P' },
    ],
  },
  {
    id: 18,
    text: 'You feel more comfortable when:',
    options: [
      { text: 'Decisions are made and things are settled.', value: 'J' },
      { text: 'Things are open-ended and possibilities are still being explored.', value: 'P' },
    ],
  },
  {
    id: 19,
    text: 'When facing a deadline, you are more likely to:',
    options: [
      { text: 'Work steadily ahead of time to avoid last-minute pressure.', value: 'J' },
      { text: 'Feel energized by the pressure and do your best work closer to the deadline.', value: 'P' },
    ],
  },
  {
    id: 20,
    text: 'In your daily routine, you prefer:',
    options: [
      { text: 'Structure and predictability.', value: 'J' },
      { text: 'Variety and the freedom to change plans.', value: 'P' },
    ],
  },
  {
    id: 21,
    text: 'When starting a new task, you typically:',
    options: [
      { text: 'Like to have clear guidelines and know what\'s expected.', value: 'J' },
      { text: 'Prefer to figure things out as you go and adapt to new information.', value: 'P' },
    ],
  },
];

// Function to shuffle questions for each test attempt
export const getShuffledQuestions = (): MbtiQuestion[] => {
  // Create a copy of the array to avoid mutating the original
  const shuffled = [...mbtiQuestions];
  // Fisher-Yates (Knuth) Shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
};