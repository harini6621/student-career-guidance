// Each option adds points to one or more careers.
// Career ids: software-developer, data-scientist, web-developer, cybersecurity-analyst, ui-ux-designer, ai-engineer, government-jobs
export const questions = [
  {
    id: 1,
    text: 'Which activity sounds the most enjoyable to you?',
    options: [
      { text: 'Writing code to build an app or program', scores: { 'software-developer': 3, 'web-developer': 1, 'ai-engineer': 1 } },
      { text: 'Analysing numbers and finding patterns', scores: { 'data-scientist': 3, 'ai-engineer': 1 } },
      { text: 'Designing how something looks and feels', scores: { 'ui-ux-designer': 3, 'web-developer': 1 } },
      { text: 'Preparing for a big exam and serving the public', scores: { 'government-jobs': 3 } },
    ],
  },
  {
    id: 2,
    text: 'Which school subject did you like the most?',
    options: [
      { text: 'Mathematics', scores: { 'data-scientist': 2, 'ai-engineer': 3, 'software-developer': 1 } },
      { text: 'Computer Science', scores: { 'software-developer': 3, 'web-developer': 2, 'cybersecurity-analyst': 2 } },
      { text: 'Art or Drawing', scores: { 'ui-ux-designer': 3, 'web-developer': 1 } },
      { text: 'Social Science and General Knowledge', scores: { 'government-jobs': 3 } },
    ],
  },
  {
    id: 3,
    text: 'How do you prefer to solve problems?',
    options: [
      { text: 'Break them into logical steps and automate them', scores: { 'software-developer': 3, 'ai-engineer': 2 } },
      { text: 'Look at data and evidence before deciding', scores: { 'data-scientist': 3, 'government-jobs': 1 } },
      { text: 'Think about how people feel and what they need', scores: { 'ui-ux-designer': 3 } },
      { text: 'Find weak points and test how things can fail', scores: { 'cybersecurity-analyst': 3, 'software-developer': 1 } },
    ],
  },
  {
    id: 4,
    text: 'Which project would you like to work on?',
    options: [
      { text: 'A responsive website for a local business', scores: { 'web-developer': 3, 'ui-ux-designer': 1 } },
      { text: 'A chatbot or model that can recognise images', scores: { 'ai-engineer': 3, 'data-scientist': 1 } },
      { text: 'A security audit of a school network', scores: { 'cybersecurity-analyst': 3 } },
      { text: 'A sales dashboard that predicts next month’s revenue', scores: { 'data-scientist': 3 } },
    ],
  },
  {
    id: 5,
    text: 'What kind of work environment do you prefer?',
    options: [
      { text: 'Creative studio with brainstorming and sketching', scores: { 'ui-ux-designer': 3, 'web-developer': 1 } },
      { text: 'Tech company with product teams and fast releases', scores: { 'software-developer': 2, 'web-developer': 2, 'ai-engineer': 1 } },
      { text: 'Research lab or analytics team', scores: { 'data-scientist': 2, 'ai-engineer': 3 } },
      { text: 'Stable government office with job security', scores: { 'government-jobs': 3 } },
    ],
  },
  {
    id: 6,
    text: 'Which skill do you feel strongest in?',
    options: [
      { text: 'Logical thinking', scores: { 'software-developer': 3, 'cybersecurity-analyst': 1, 'ai-engineer': 1 } },
      { text: 'Creativity and visual sense', scores: { 'ui-ux-designer': 3, 'web-developer': 1 } },
      { text: 'Statistics and analytical reasoning', scores: { 'data-scientist': 3, 'ai-engineer': 1 } },
      { text: 'Memory, discipline and consistency', scores: { 'government-jobs': 3 } },
    ],
  },
  {
    id: 7,
    text: 'Which news headline would you click first?',
    options: [
      { text: 'Hackers steal data from a major company', scores: { 'cybersecurity-analyst': 3 } },
      { text: 'New AI model can write code and create images', scores: { 'ai-engineer': 3, 'software-developer': 1 } },
      { text: 'Government announces new recruitment notifications', scores: { 'government-jobs': 3 } },
      { text: 'This app redesign makes shopping twice as easy', scores: { 'ui-ux-designer': 2, 'web-developer': 2 } },
    ],
  },
  {
    id: 8,
    text: 'How comfortable are you with maths and statistics?',
    options: [
      { text: 'Very comfortable – I enjoy it', scores: { 'data-scientist': 3, 'ai-engineer': 3 } },
      { text: 'Comfortable with the basics', scores: { 'software-developer': 2, 'cybersecurity-analyst': 1, 'government-jobs': 1 } },
      { text: 'I prefer applied work over heavy theory', scores: { 'web-developer': 2, 'ui-ux-designer': 1 } },
      { text: 'I can learn it if it helps my goal', scores: { 'government-jobs': 1, 'cybersecurity-analyst': 1, 'web-developer': 1 } },
    ],
  },
  {
    id: 9,
    text: 'What matters most to you in a career?',
    options: [
      { text: 'High growth and innovation', scores: { 'ai-engineer': 3, 'software-developer': 2, 'data-scientist': 1 } },
      { text: 'Creative freedom and visible results', scores: { 'ui-ux-designer': 3, 'web-developer': 2 } },
      { text: 'Job security, respect and pension', scores: { 'government-jobs': 3 } },
      { text: 'Protecting people and solving challenging puzzles', scores: { 'cybersecurity-analyst': 3, 'data-scientist': 1 } },
    ],
  },
  {
    id: 10,
    text: 'Pick a weekend activity you would choose:',
    options: [
      { text: 'Build a small app or website for fun', scores: { 'web-developer': 3, 'software-developer': 2 } },
      { text: 'Solve capture-the-flag or logic challenges online', scores: { 'cybersecurity-analyst': 3, 'software-developer': 1 } },
      { text: 'Explore a dataset or train a simple model', scores: { 'data-scientist': 2, 'ai-engineer': 3 } },
      { text: 'Study previous exam papers and current affairs', scores: { 'government-jobs': 3 } },
    ],
  },
];
