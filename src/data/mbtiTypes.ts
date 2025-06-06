// src/data/mbtiTypes.ts
import * as Lucide from 'lucide-react';

export interface MbtiTypeInfo {
  id: string; // e.g., "intj"
  type: string; // e.g., "INTJ"
  nickname: string;
  tagline: string; // A short, catchy phrase
  description: string; // Short description (can be reused from landing page)
  fullDescription: string; // More detailed explanation
  strengths: string[];
  weaknesses: string[];
  careerPaths: string[];
  famousExamples?: string[]; // Optional
  cognitiveFunctions: { // Basic cognitive function stack
    dominant: string;
    auxiliary: string;
    tertiary: string;
    inferior: string;
  };
  group: 'Analyst' | 'Diplomat' | 'Sentinel' | 'Explorer'; 
  iconName: keyof typeof Lucide; // For Lucide icons used elsewhere on your site
  avatarSvgFilename: string; // NEW: e.g., "intj.svg"
}

export const mbtiTypesData: MbtiTypeInfo[] = [
  {
    id: 'intj',
    type: 'INTJ',
    nickname: 'The Architect',
    avatarSvgFilename: 'intj.svg', // <-- ADDED
    tagline: 'Imaginative and strategic thinkers, with a plan for everything.',
    description: 'Imaginative and strategic thinkers, with a plan for everything.',
    fullDescription:
      "INTJs are analytical problem-solvers, eager to improve systems and processes with their innovative ideas. They have a talent for seeing possibilities for improvement, whether at work, at home, or in themselves. They are often seen as reserved and serious, preferring to spend time alone or with a small group of intellectually stimulating people. Architects value logic and reason above all else.",
    strengths: ['Strategic Thinking', 'Independent', 'Decisive', 'Innovative', 'Driven'],
    weaknesses: ['Overly Analytical', 'Judgmental', 'Dismissive of Emotions', 'Perfectionistic', 'Can be Arrogant'],
    careerPaths: ['Scientist', 'Engineer', 'Professor', 'Strategist', 'Lawyer', 'Software Developer'],
    famousExamples: ['Elon Musk', 'Friedrich Nietzsche', 'Michelle Obama (speculated)', 'Isaac Newton'],
    cognitiveFunctions: {
      dominant: 'Introverted Intuition (Ni)',
      auxiliary: 'Extraverted Thinking (Te)',
      tertiary: 'Introverted Feeling (Fi)',
      inferior: 'Extraverted Sensing (Se)',
    },
    group: 'Analyst',
    iconName: 'DraftingCompass',
  },
  {
    id: 'infj',
    type: 'INFJ',
    nickname: 'The Advocate',
    avatarSvgFilename: 'infj.svg', // <-- ADDED
    tagline: 'Quiet and mystical, yet very inspiring and tireless idealists.',
    description: 'Quiet and mystical, yet very inspiring and tireless idealists.',
    fullDescription:
      "INFJs are insightful and principled, often driven by a strong sense of idealism and morality. They are creative and dedicated, with a talent for helping others realize their potential. Advocates are typically private individuals, preferring deep, meaningful connections. They seek meaning and purpose in their lives, and are deeply concerned with the well-being of humanity.",
    strengths: ['Insightful', 'Principled', 'Passionate', 'Creative', 'Altruistic'],
    weaknesses: ['Sensitive to Criticism', 'Perfectionistic', 'Can Burn Out Easily', 'Reluctant to Open Up', 'High Expectations'],
    careerPaths: ['Counselor', 'Writer', 'Teacher', 'Psychologist', 'Social Worker', 'Artist'],
    famousExamples: ['Martin Luther King Jr.', 'Nelson Mandela', 'Mother Teresa', 'Carl Jung'],
    cognitiveFunctions: {
      dominant: 'Introverted Intuition (Ni)',
      auxiliary: 'Extraverted Feeling (Fe)',
      tertiary: 'Introverted Thinking (Ti)',
      inferior: 'Extraverted Sensing (Se)',
    },
    group: 'Diplomat',
    iconName: 'HeartHandshake',
  },
  {
    id: 'istj',
    type: 'ISTJ',
    nickname: 'The Inspector',
    avatarSvgFilename: 'istj.svg', // <-- ADDED
    tagline: 'Practical and fact-minded individuals, whose reliability cannot be doubted.',
    description: 'Practical, fact-minded individuals whose reliability cannot be doubted.',
    fullDescription: 'ISTJs are responsible organizers, driven to create and enforce order within systems and institutions. They are neat and orderly, inside and out, and tend to have a procedure for everything they do. Reliable and dutiful, ISTJs want to uphold tradition and follow regulations. They are quiet and serious, and succeed through thoroughness and dependability.',
    strengths: ['Responsible', 'Thorough', 'Dependable', 'Practical', 'Organized', 'Loyal'],
    weaknesses: ['Stubborn', 'Insensitive', 'By-the-book', 'Judgmental', 'Reluctant to change'],
    careerPaths: ['Accountant', 'Auditor', 'Manager', 'Police Officer', 'Military Leader', 'Librarian', 'Civil Servant'],
    famousExamples: ['George Washington', 'Angela Merkel', 'Queen Elizabeth II', 'Denzel Washington'],
    cognitiveFunctions: {
      dominant: 'Introverted Sensing (Si)',
      auxiliary: 'Extraverted Thinking (Te)',
      tertiary: 'Introverted Feeling (Fi)',
      inferior: 'Extraverted Intuition (Ne)',
    },
    group: 'Sentinel',
    iconName: 'ClipboardCheck',
  },
  {
    id: 'enfp',
    type: 'ENFP',
    nickname: 'The Campaigner',
    avatarSvgFilename: 'enfp.svg', // <-- ADDED
    tagline: 'Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.',
    description: 'Enthusiastic, creative and sociable free spirits, who can always find a reason to smile.',
    fullDescription: 'ENFPs are enthusiastic innovators, always seeing life as a big, complex puzzle where everything is connected. They are imaginative and open-minded, seeing all things as part of a great cosmic whole. Campaigners are highly intuitive about people, and they rely on their insights to guide them. They are curious, expressive, and independent.',
    strengths: ['Enthusiastic', 'Creative', 'Sociable', 'Supportive', 'Good Communicators', 'Curious'],
    weaknesses: ['Easily Stressed', 'Overly Emotional', 'Independent to a Fault', 'Difficulty Focusing', 'Dislike Routine', 'Can be Overly Accommodating'],
    careerPaths: ['Journalist', 'Entrepreneur', 'Actor', 'Designer', 'Counselor', 'HR Manager', 'Event Planner'],
    famousExamples: ['Robin Williams', 'Will Smith', 'Robert Downey Jr.', 'Sandra Bullock'],
    cognitiveFunctions: {
      dominant: 'Extraverted Intuition (Ne)',
      auxiliary: 'Introverted Feeling (Fi)',
      tertiary: 'Extraverted Thinking (Te)',
      inferior: 'Introverted Sensing (Si)',
    },
    group: 'Diplomat',
    iconName: 'PartyPopper',
  },
  {
    id: 'intp',
    type: 'INTP',
    nickname: 'The Logician',
    avatarSvgFilename: 'intp.svg', // <-- ADDED
    tagline: 'Innovative inventors with an unquenchable thirst for knowledge.',
    description: 'INTPs are known for their brilliant theories and unrelenting logic; they are fascinated by systems and how things work.',
    fullDescription: "INTPs are pensive, analytical individuals who enjoy spending time alone, thinking about how things work and coming up with solutions to problems. They have a rich inner world and would rather focus their attention on their internal thoughts than the external world. They are highly logical and value precision in thought and language. Logicians are often seen as independent, unconventional, and original.",
    strengths: ['Analytical', 'Original', 'Open-minded', 'Imaginative', 'Objective', 'Independent'],
    weaknesses: ['Socially Reserved', 'Insensitive at times', 'Prone to Procrastination', 'Can be Condescending', 'Dislike Rules and Guidelines', 'Difficulty with practical follow-through'],
    careerPaths: ['Scientist', 'Philosopher', 'Programmer', 'Mathematician', 'Technical Writer', 'Researcher', 'University Professor'],
    famousExamples: ['Albert Einstein', 'Bill Gates', 'Marie Curie (speculated)', 'Charles Darwin', 'Abraham Lincoln (speculated)'],
    cognitiveFunctions: {
      dominant: 'Introverted Thinking (Ti)',
      auxiliary: 'Extraverted Intuition (Ne)',
      tertiary: 'Introverted Sensing (Si)',
      inferior: 'Extraverted Feeling (Fe)',
    },
    group: 'Analyst',
    iconName: 'Lightbulb',
  },
  {
    id: 'entj',
    type: 'ENTJ',
    nickname: 'The Commander',
    avatarSvgFilename: 'entj.svg', // <-- ADDED
    tagline: 'Bold, imaginative and strong-willed leaders, always finding a way – or making one.',
    description: 'ENTJs are decisive people who love momentum and accomplishment. They gather information to construct their creative visions but rarely hesitate for long before acting on them.',
    fullDescription: "ENTJs are natural-born leaders. They are decisive, assertive, and driven to achieve their goals. Commanders possess a sharp mind capable of absorbing and processing complex information quickly. They are strategic thinkers, always looking for more efficient ways to do things. While they are an E type, they often focus more on productive work than socializing for its own sake. They thrive on challenges and are not afraid to take charge.",
    strengths: ['Efficient', 'Energetic', 'Self-Confident', 'Strategic', 'Strong-Willed', 'Inspiring'],
    weaknesses: ['Stubborn', 'Impatient', 'Arrogant', 'Poor Handling of Emotions', 'Intolerant', 'Can be Ruthless'],
    careerPaths: ['CEO', 'Entrepreneur', 'Manager', 'Consultant', 'Lawyer', 'Judge', 'Military Officer'],
    famousExamples: ['Steve Jobs', 'Margaret Thatcher', 'Napoleon Bonaparte', 'Julius Caesar', 'Kamala Harris'],
    cognitiveFunctions: {
      dominant: 'Extraverted Thinking (Te)',
      auxiliary: 'Introverted Intuition (Ni)',
      tertiary: 'Extraverted Sensing (Se)',
      inferior: 'Introverted Feeling (Fi)',
    },
    group: 'Analyst',
    iconName: 'Megaphone',
  },
  {
    id: 'entp',
    type: 'ENTP',
    nickname: 'The Debater',
    avatarSvgFilename: 'entp.svg', // <-- ADDED
    tagline: 'Smart and curious thinkers who cannot resist an intellectual challenge.',
    description: 'ENTPs are quick-witted, innovative, and love to brainstorm. They enjoy debating ideas and are masters of understanding different perspectives.',
    fullDescription: "ENTPs are energetic and ingenious, always eager to explore new ideas and possibilities. They are excellent at understanding complex systems and are often drawn to entrepreneurial pursuits. Debaters are quick thinkers, articulate and enjoy a good argument, not for the sake of conflict, but for the intellectual stimulation. They can sometimes play devil's advocate to explore all angles of an issue.",
    strengths: ['Knowledgeable', 'Quick Thinker', 'Original', 'Excellent Brainstormer', 'Charismatic', 'Energetic'],
    weaknesses: ['Very Argumentative', 'Insensitive', 'Intolerant', 'Difficulty Focusing', 'Dislike Practical Matters', 'Can find it hard to follow through'],
    careerPaths: ['Entrepreneur', 'Lawyer', 'Consultant', 'Engineer', 'Politician', 'Actor', 'Marketing Strategist'],
    famousExamples: ['Socrates', 'Leonardo da Vinci', 'Thomas Edison', 'Catherine the Great', 'Barack Obama (speculated)', 'Weird Al" Yankovic'],
    cognitiveFunctions: {
      dominant: 'Extraverted Intuition (Ne)',
      auxiliary: 'Introverted Thinking (Ti)',
      tertiary: 'Extraverted Feeling (Fe)',
      inferior: 'Introverted Sensing (Si)',
    },
    group: 'Analyst',
    iconName: 'MessagesSquare',
  },
  {
    id: 'infp',
    type: 'INFP',
    nickname: 'The Mediator',
    avatarSvgFilename: 'infp.svg', // <-- ADDED
    tagline: 'Poetic, kind and altruistic people, always eager to help a good cause.',
    description: 'INFPs are idealistic, loyal to their values and to people who are important to them. They are curious, quick to see possibilities, and can be catalysts for implementing ideas.',
    fullDescription: "INFPs are imaginative idealists, guided by their core values and beliefs. To a Mediator, possibilities are paramount; the reality of the moment is only of passing concern. They see potential for a better future, and pursue truth and meaning with their own individual flair. INFPs are sensitive, caring, and compassionate, and are deeply concerned with personal growth for themselves and others.",
    strengths: ['Empathetic', 'Generous', 'Open-Minded', 'Creative', 'Passionate', 'Idealistic', 'Loyal'],
    weaknesses: ['Unrealistic', 'Self-Isolating', 'Overly Idealistic', 'Impractical', 'Difficulty with Data', 'Too Self-Critical', 'Can be Emotionally Overwhelmed'],
    careerPaths: ['Writer', 'Counselor', 'Artist', 'Social Worker', 'Librarian', 'Psychologist', 'Designer', 'Non-profit Work'],
    famousExamples: ['William Shakespeare', 'J.R.R. Tolkien', 'Princess Diana', 'Audrey Hepburn', 'Björk', 'Johnny Depp (speculated)'],
    cognitiveFunctions: {
      dominant: 'Introverted Feeling (Fi)',
      auxiliary: 'Extraverted Intuition (Ne)',
      tertiary: 'Introverted Sensing (Si)',
      inferior: 'Extraverted Thinking (Te)',
    },
    group: 'Diplomat',
    iconName: 'Feather',
  },
  {
    id: 'enfj',
    type: 'ENFJ',
    nickname: 'The Protagonist',
    avatarSvgFilename: 'enfj.svg', // <-- ADDED
    tagline: 'Charismatic and inspiring leaders, able to mesmerize their listeners.',
    description: 'ENFJs are warm, empathetic, responsive, and responsible. They are highly attuned to the emotions, needs, and motivations of others.',
    fullDescription: "ENFJs are natural-born leaders, full of passion and charisma. They radiate authenticity, concern, and altruism, unafraid to stand up and speak for what they feel is right. Protagonists often feel called to serve a greater purpose in life, and they can be highly effective in inspiring others to action. They are sociable and find fulfillment in guiding others to work together to improve themselves and their community.",
    strengths: ['Tolerant', 'Reliable', 'Charismatic', 'Altruistic', 'Natural Leader', 'Empathetic'],
    weaknesses: ['Overly Idealistic', 'Too Selfless', 'Sensitive to Criticism', 'Struggle to Make Tough Decisions', 'Can be Overbearing', 'Burnout Prone'],
    careerPaths: ['Teacher', 'Counselor', 'HR Manager', 'Politician', 'Sales Manager', 'Motivational Speaker', 'Non-profit Director'],
    famousExamples: ['Barack Obama', 'Oprah Winfrey', 'Martin Luther King Jr.', 'Ben Affleck', 'Jennifer Lawrence'],
    cognitiveFunctions: {
      dominant: 'Extraverted Feeling (Fe)',
      auxiliary: 'Introverted Intuition (Ni)',
      tertiary: 'Extraverted Sensing (Se)',
      inferior: 'Introverted Thinking (Ti)',
    },
    group: 'Diplomat',
    iconName: 'Users',
  },
  {
    id: 'isfj',
    type: 'ISFJ',
    nickname: 'The Defender',
    avatarSvgFilename: 'isfj.svg', // <-- ADDED
    tagline: 'Very dedicated and warm protectors, always ready to defend their loved ones.',
    description: 'ISFJs are quiet, kind, responsible, and conscientious. They are committed and steady in meeting their obligations. Thorough, painstaking, and accurate.',
    fullDescription: "ISFJs are known for their kindness, reliability, and dedication. They have a deep sense of responsibility and genuinely enjoy taking care of others. Defenders are practical and down-to-earth, with a keen eye for detail. They value harmony and cooperation, and work with quiet dedication to ensure the well-being of those around them. They are often modest and reserved, but their warmth and commitment are unmistakable.",
    strengths: ['Supportive', 'Reliable', 'Patient', 'Imaginative (practical)', 'Loyal', 'Hardworking', 'Good Practical Skills'],
    weaknesses: ['Humble and Shy', 'Take Things Too Personally', 'Repress Their Feelings', 'Overcommit', 'Reluctant to Change', 'Too Altruistic'],
    careerPaths: ['Nurse', 'Teacher', 'Social Worker', 'Administrator', 'Librarian', 'Interior Decorator', 'Personal Assistant'],
    famousExamples: ['Queen Elizabeth II', 'Mother Teresa', 'Beyoncé', 'Vin Diesel', 'Kate Middleton'],
    cognitiveFunctions: {
      dominant: 'Introverted Sensing (Si)',
      auxiliary: 'Extraverted Feeling (Fe)',
      tertiary: 'Introverted Thinking (Ti)',
      inferior: 'Extraverted Intuition (Ne)',
    },
    group: 'Sentinel',
    iconName: 'ShieldCheck',
  },
  {
    id: 'estj',
    type: 'ESTJ',
    nickname: 'The Executive',
    avatarSvgFilename: 'estj.svg', // <-- ADDED
    tagline: 'Excellent administrators, unsurpassed at managing things – or people.',
    description: 'ESTJs are practical, realistic, matter-of-fact. Decisive, quickly move to implement decisions. Organize projects and people to get things done.',
    fullDescription: "ESTJs are quintessential organizers, known for their ability to manage projects and people effectively. They are driven by a sense of duty and believe in the importance of rules and traditions. Executives are practical, logical, and decisive, preferring to deal with facts rather than abstract theories. They are hardworking and dedicated, and excel at creating order and structure in their environment.",
    strengths: ['Dedicated', 'Strong-willed', 'Direct and Honest', 'Loyal, Patient and Reliable', 'Excellent Organizers', 'Good at Creating Order'],
    weaknesses: ['Inflexible and Stubborn', 'Uncomfortable with Unconventional Situations', 'Judgmental', 'Too Focused on Social Status', 'Difficulty Expressing Emotion', 'Difficulty Relaxing'],
    careerPaths: ['Manager', 'Military Officer', 'Police Officer', 'Judge', 'Financial Officer', 'School Administrator', 'Project Manager'],
    famousExamples: ['Sonia Sotomayor', 'Frank Sinatra', 'Lyndon B. Johnson', 'Judge Judy', 'Emma Watson (speculated)'],
    cognitiveFunctions: {
      dominant: 'Extraverted Thinking (Te)',
      auxiliary: 'Introverted Sensing (Si)',
      tertiary: 'Extraverted Intuition (Ne)',
      inferior: 'Introverted Feeling (Fi)',
    },
    group: 'Sentinel',
    iconName: 'Briefcase',
  },
  {
    id: 'esfj',
    type: 'ESFJ',
    nickname: 'The Consul',
    avatarSvgFilename: 'esfj.svg', // <-- ADDED
    tagline: 'Extraordinarily caring, social and popular people, always eager to help.',
    description: 'ESFJs are warmhearted, conscientious, and cooperative. They want harmony in their environment and work with determination to establish it.',
    fullDescription: "ESFJs are highly sociable individuals who thrive on interacting with others and making them feel included and valued. They are attuned to the needs and feelings of people around them and genuinely enjoy helping. Consuls are practical and organized, often taking on the role of caregivers or community organizers. They value tradition and security, and are known for their loyalty and dedication.",
    strengths: ['Strong Practical Skills', 'Strong Sense of Duty', 'Very Loyal', 'Sensitive and Warm', 'Good at Connecting with Others', 'Outgoing and Gregarious'],
    weaknesses: ['Worried about Their Social Status', 'Inflexible', 'Reluctant to Improvise or Innovate', 'Vulnerable to Criticism', 'Often Too Needy', 'Too Selfless'],
    careerPaths: ['Nurse', 'Teacher', 'Social Worker', 'HR Manager', 'Event Coordinator', 'Customer Service Rep', 'Office Manager'],
    famousExamples: ['Taylor Swift', 'Jennifer Lopez', 'Bill Clinton', 'Anne Hathaway', 'Jennifer Garner'],
    cognitiveFunctions: {
      dominant: 'Extraverted Feeling (Fe)',
      auxiliary: 'Introverted Sensing (Si)',
      tertiary: 'Extraverted Intuition (Ne)',
      inferior: 'Introverted Thinking (Ti)',
    },
    group: 'Sentinel',
    iconName: 'Handshake',
  },
  {
    id: 'istp',
    type: 'ISTP',
    nickname: 'The Virtuoso',
    avatarSvgFilename: 'istp.svg', // <-- ADDED
    tagline: 'Bold and practical experimenters, masters of all kinds of tools.',
    description: 'ISTPs are tolerant and flexible, quiet observers until a problem appears, then act quickly to find workable solutions. Analyze what makes things work.',
    fullDescription: "ISTPs are hands-on individuals who love to explore the world through action and direct experience. They are masters of tools and mechanics, with a natural ability to understand how things work. Virtuosos are independent and adaptable, often thriving in situations that require quick thinking and practical problem-solving. They are typically reserved but can be surprisingly spontaneous and energetic when engaged in activities they enjoy.",
    strengths: ['Optimistic and Energetic', 'Creative and Practical', 'Spontaneous and Rational', 'Know How to Prioritize', 'Great in a Crisis', 'Relaxed'],
    weaknesses: ['Stubborn', 'Insensitive', 'Private and Reserved', 'Easily Bored', 'Dislike Commitment', 'Risky Behavior'],
    careerPaths: ['Mechanic', 'Engineer', 'Pilot', 'Paramedic', 'Carpenter', 'Forensic Scientist', 'Athlete', 'Firefighter'],
    famousExamples: ['Clint Eastwood', 'Bear Grylls', 'Michael Jordan', 'Bruce Lee', 'Tom Cruise', 'Scarlett Johansson (speculated)'],
    cognitiveFunctions: {
      dominant: 'Introverted Thinking (Ti)',
      auxiliary: 'Extraverted Sensing (Se)',
      tertiary: 'Introverted Intuition (Ni)',
      inferior: 'Extraverted Feeling (Fe)',
    },
    group: 'Explorer',
    iconName: 'Wrench',
  },
  {
    id: 'isfp',
    type: 'ISFP',
    nickname: 'The Adventurer',
    avatarSvgFilename: 'isfp.svg', // <-- ADDED
    tagline: 'Flexible and charming artists, always ready to explore and experience something new.',
    description: 'ISFPs are quiet, friendly, sensitive, and kind. Enjoy the present moment, what’s going on around them. Like to have their own space and to work within their own time frame.',
    fullDescription: "ISFPs are artistic and individualistic, with a strong appreciation for beauty and aesthetics. They live in the present moment and enjoy new experiences and sensations. Adventurers are typically gentle and unassuming, but they possess a passionate inner world and a deep well of emotion. They value freedom and autonomy, and often express themselves through creative pursuits or acts of service.",
    strengths: ['Charming', 'Sensitive to Others', 'Imaginative', 'Passionate', 'Curious', 'Artistic'],
    weaknesses: ['Fiercely Independent', 'Unpredictable', 'Easily Stressed', 'Overly Competitive', 'Fluctuating Self-Esteem', 'Difficulty with Long-Term Planning'],
    careerPaths: ['Artist', 'Musician', 'Designer', 'Chef', 'Veterinarian', 'Florist', 'Photographer', 'Fashion Designer'],
    famousExamples: ['Michael Jackson', 'Britney Spears', 'Frida Kahlo', 'Bob Dylan', 'Avril Lavigne', 'Lana Del Rey'],
    cognitiveFunctions: {
      dominant: 'Introverted Feeling (Fi)',
      auxiliary: 'Extraverted Sensing (Se)',
      tertiary: 'Introverted Intuition (Ni)',
      inferior: 'Extraverted Thinking (Te)',
    },
    group: 'Explorer',
    iconName: 'Palette',
  },
  {
    id: 'estp',
    type: 'ESTP',
    nickname: 'The Entrepreneur',
    avatarSvgFilename: 'estp.svg', // <-- ADDED
    tagline: 'Smart, energetic and very perceptive people, who truly enjoy living on the edge.',
    description: 'ESTPs are flexible and tolerant, they take a pragmatic approach focused on immediate results. Theories and conceptual explanations bore them – they want to act energetically to solve the problem.',
    fullDescription: "ESTPs are energetic thrill-seekers who thrive on action and excitement. They are highly observant and resourceful, with a knack for finding innovative solutions to practical problems. Entrepreneurs are persuasive and charismatic, often enjoying being the center of attention. They live in the moment and are not afraid to take risks, making them natural pioneers and troubleshooters.",
    strengths: ['Bold', 'Rational and Practical', 'Original', 'Perceptive', 'Direct', 'Sociable', 'Good at Influencing Others'],
    weaknesses: ['Insensitive', 'Impatient', 'Risk-prone', 'Unstructured', 'May Miss the Bigger Picture', 'Defiant', 'Can be Confrontational'],
    careerPaths: ['Salesperson', 'Entrepreneur', 'Paramedic', 'Detective', 'Marketing Manager', 'Professional Athlete', 'Stock Trader'],
    famousExamples: ['Donald Trump', 'Madonna', 'Ernest Hemingway', 'Jack Nicholson', 'Eddie Murphy', 'Angelina Jolie'],
    cognitiveFunctions: {
      dominant: 'Extraverted Sensing (Se)',
      auxiliary: 'Introverted Thinking (Ti)',
      tertiary: 'Extraverted Feeling (Fe)',
      inferior: 'Introverted Intuition (Ni)',
    },
    group: 'Explorer',
    iconName: 'Rocket',
  },
  {
    id: 'esfp',
    type: 'ESFP',
    nickname: 'The Entertainer',
    avatarSvgFilename: 'esfp.svg', // <-- ADDED
    tagline: 'Spontaneous, energetic and enthusiastic people – life is never boring around them.',
    description: 'ESFPs are outgoing, friendly, and acceptant. Exuberant lovers of life, people, and material comforts. Enjoy working with others to make things happen.',
    fullDescription: "ESFPs are vivacious and fun-loving individuals who bring energy and excitement wherever they go. They are highly observant and attuned to their surroundings, with a keen appreciation for aesthetics and sensory experiences. Entertainers are spontaneous and adaptable, enjoying new experiences and connecting with others on an emotional level. They are natural performers and often find joy in making others happy.",
    strengths: ['Bold', 'Original', 'Aesthetics and Showmanship', 'Practical', 'Observant', 'Excellent People Skills', 'Spontaneous', 'Fun-loving'],
    weaknesses: ['Sensitive', 'Conflict-Averse', 'Easily Bored', 'Poor Long-Term Planners', 'Unfocused', 'Can be Materialistic', 'Seek Constant Stimulation'],
    careerPaths: ['Actor', 'Musician', 'Designer', 'Event Planner', 'Salesperson', 'Flight Attendant', 'Comedian', 'Tour Guide'],
    famousExamples: ['Marilyn Monroe', 'Adele', 'Jamie Foxx', 'Will Smith', 'Leonardo DiCaprio (speculated)', 'Miley Cyrus'],
    cognitiveFunctions: {
      dominant: 'Extraverted Sensing (Se)',
      auxiliary: 'Introverted Feeling (Fi)',
      tertiary: 'Extraverted Thinking (Te)',
      inferior: 'Introverted Intuition (Ni)',
    },
    group: 'Explorer',
    iconName: 'Mic',
  },
];

export const findMbtiTypeDetails = (typeString: string): MbtiTypeInfo | undefined => {
  return mbtiTypesData.find(t => t.type.toUpperCase() === typeString.toUpperCase());
};