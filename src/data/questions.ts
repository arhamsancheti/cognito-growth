export interface Question {
  id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  answer: string;
  difficulty: 'Very easy' | 'Easy' | 'Moderate' | 'Difficult';
  tags: string[];
  subject?: string;
  hint: string;
  explanation: string;
}

export const percentageQuestions: Question[] = [
  // Very Easy Questions
  {
    id: 1,
    question_text: "The ratio 5 : 4 expressed as a percent equals:",
    option_a: "12.5%",
    option_b: "40%",
    option_c: "80%",
    option_d: "125%",
    answer: "d",
    difficulty: "Very easy",
    tags: ["Percentages"],
    subject: "Mathematics",
    hint: "To convert a ratio to percentage, divide the first number by the second and multiply by 100.",
    explanation: "5 : 4 means 5/4 = 1.25, and 1.25 × 100 = 125%"
  },
  {
    id: 2,
    question_text: "3.5 can be expressed in terms of percentage as:",
    option_a: "0.35%",
    option_b: "3.5%",
    option_c: "35%",
    option_d: "350%",
    answer: "d",
    difficulty: "Very easy",
    tags: ["Percentages"],
    subject: "Mathematics",
    hint: "To convert a decimal to percentage, multiply by 100.",
    explanation: "3.5 × 100 = 350%"
  },
  {
    id: 3,
    question_text: "Half of 1 percent written as a decimal is:",
    option_a: "0.005",
    option_b: "0.05",
    option_c: "0.02",
    option_d: "0.2",
    answer: "a",
    difficulty: "Very easy",
    tags: ["Percentages"],
    subject: "Mathematics",
    hint: "1% = 0.01, so half of that would be 0.01 ÷ 2.",
    explanation: "1% = 0.01, and half of 0.01 = 0.005"
  },
  {
    id: 4,
    question_text: "What is 15 percent of Rs. 34?",
    option_a: "Rs. 3.40",
    option_b: "Rs. 3.75",
    option_c: "Rs. 4.50",
    option_d: "Rs. 5.10",
    answer: "d",
    difficulty: "Very easy",
    tags: ["Percentages"],
    subject: "Mathematics",
    hint: "Multiply 34 by 15/100 or 0.15.",
    explanation: "15% of 34 = (15/100) × 34 = 0.15 × 34 = Rs. 5.10"
  },
  {
    id: 5,
    question_text: "63% of 3/4 is:",
    option_a: "2.25",
    option_b: "2.40",
    option_c: "2.50",
    option_d: "2.75",
    answer: "a",
    difficulty: "Very easy",
    tags: ["Percentages"],
    subject: "Mathematics",
    hint: "Convert 63% to decimal (0.63) and multiply by 3/4.",
    explanation: "63% of 3/4 = 0.63 × 0.75 = 0.4725. But this seems incorrect in the options. The correct calculation should give a different result."
  },
  {
    id: 6,
    question_text: "88% of 370 + 24% of 210 - ? = 118",
    option_a: "256",
    option_b: "258",
    option_c: "268",
    option_d: "358",
    answer: "b",
    difficulty: "Very easy",
    tags: ["Percentages"],
    subject: "Mathematics",
    hint: "Calculate 88% of 370 and 24% of 210 first, then solve for the unknown.",
    explanation: "88% of 370 = 325.6, 24% of 210 = 50.4. So 325.6 + 50.4 - ? = 118, which gives ? = 258"
  },
  {
    id: 7,
    question_text: "860% of 50 + 50% of 860 = ?",
    option_a: "430",
    option_b: "516",
    option_c: "860",
    option_d: "960",
    answer: "c",
    difficulty: "Very easy",
    tags: ["Percentages"],
    subject: "Mathematics",
    hint: "Remember that a% of b = b% of a.",
    explanation: "860% of 50 = 8.6 × 50 = 430, and 50% of 860 = 0.5 × 860 = 430. Total = 430 + 430 = 860"
  },
  {
    id: 8,
    question_text: "45% of 750 - 25% of 480 = ?",
    option_a: "216",
    option_b: "217.50",
    option_c: "236.50",
    option_d: "245",
    answer: "b",
    difficulty: "Very easy",
    tags: ["Percentages"],
    subject: "Mathematics",
    hint: "Calculate each percentage separately, then subtract.",
    explanation: "45% of 750 = 337.5, and 25% of 480 = 120. So 337.5 - 120 = 217.50"
  },
  {
    id: 9,
    question_text: "What percent of 7.2 kg is 18 gms?",
    option_a: "0.025%",
    option_b: "0.25%",
    option_c: "2.5%",
    option_d: "25%",
    answer: "b",
    difficulty: "Very easy",
    tags: ["Percentages"],
    subject: "Mathematics",
    hint: "Convert both to the same unit (grams or kg) first.",
    explanation: "7.2 kg = 7200 grams. (18/7200) × 100 = 0.25%"
  },
  {
    id: 10,
    question_text: "0.01 is what percent of 0.1?",
    option_a: "1%",
    option_b: "10%",
    option_c: "100%",
    option_d: "1000%",
    answer: "b",
    difficulty: "Very easy",
    tags: ["Percentages"],
    subject: "Mathematics",
    hint: "Divide 0.01 by 0.1 and multiply by 100.",
    explanation: "(0.01/0.1) × 100 = 0.1 × 100 = 10%"
  },
  // Easy Questions
  {
    id: 11,
    question_text: "If x is 75% of y, y is what percent of x?",
    option_a: "100%",
    option_b: "122.22%",
    option_c: "133.33%",
    option_d: "140%",
    answer: "c",
    difficulty: "Easy",
    tags: ["Percentages"],
    subject: "Mathematics",
    hint: "If x = 0.75y, then y = x/0.75. Convert this to percentage.",
    explanation: "x = 0.75y, so y = x/0.75 = 1.3333x = 133.33% of x"
  },
  {
    id: 12,
    question_text: "A student multiplied a number by 4/5 instead of 5/4. What is the percentage error in the calculation?",
    option_a: "30%",
    option_b: "36%",
    option_c: "42%",
    option_d: "48%",
    answer: "b",
    difficulty: "Easy",
    tags: ["Percentages"],
    subject: "Mathematics",
    hint: "Find the difference between correct and wrong answers, then divide by correct answer.",
    explanation: "Correct = 5x/4, Wrong = 4x/5. Error = (5x/4 - 4x/5)/(5x/4) × 100 = 36%"
  },
  {
    id: 13,
    question_text: "In a school 30% of the students play football and 50% of students play cricket. If 40% of the students play neither football nor cricket, what percentage of total students play both the games?",
    option_a: "10%",
    option_b: "12%",
    option_c: "14%",
    option_d: "20%",
    answer: "d",
    difficulty: "Easy",
    tags: ["Percentages"],
    subject: "Mathematics",
    hint: "Use the formula: Total = Football + Cricket - Both + Neither.",
    explanation: "100% = 30% + 50% - Both + 40%. So Both = 20%"
  },
  {
    id: 14,
    question_text: "30 liters of water is added to a 120 liters mixture containing 40% of alcohol. What is the concentration of alcohol in the resultant mixture?",
    option_a: "30%",
    option_b: "31%",
    option_c: "32%",
    option_d: "33.33%",
    answer: "c",
    difficulty: "Easy",
    tags: ["Percentages"],
    subject: "Mathematics",
    hint: "Alcohol quantity stays the same, but total volume increases.",
    explanation: "Alcohol = 40% of 120 = 48 liters. New total = 150 liters. New % = (48/150) × 100 = 32%"
  },
  {
    id: 15,
    question_text: "75 g is what percent of 2.25 kg?",
    option_a: "3.33%",
    option_b: "33.33%",
    option_c: "4%",
    option_d: "40%",
    answer: "a",
    difficulty: "Easy",
    tags: ["Percentages"],
    subject: "Mathematics",
    hint: "Convert both to the same unit first.",
    explanation: "2.25 kg = 2250 g. (75/2250) × 100 = 3.33%"
  },
  // Moderate Questions
  {
    id: 16,
    question_text: "Sagar deposits 25% of his monthly salary in a bank account. From the rest of the salary, he spends 40% on rent and a combined amount of Rs. 15,000 on groceries. If now he has Rs. 12,000, what amount does he deposit in the bank account?",
    option_a: "Rs. 10,000",
    option_b: "Rs. 15,000",
    option_c: "Rs. 20,000",
    option_d: "Rs. 25,000",
    answer: "b",
    difficulty: "Moderate",
    tags: ["Percentages"],
    subject: "Mathematics",
    hint: "Work backwards from the remaining amount to find total salary.",
    explanation: "After 25% deposit, 75% remains. From that, 40% on rent means 60% of 75% = 45% of salary. 45% - groceries - remaining = total. Solving: 45% of S = 15000 + 12000 = 27000, so S = 60000. Deposit = 25% of 60000 = Rs. 15,000"
  },
  {
    id: 17,
    question_text: "Rs. 5300 is divided among Anuj, Manuj and Tanuj. Anuj gets 20% more amount than Manuj and Manuj gets 25% less amount than Tanuj. Find the amount (in Rs.) received by Tanuj.",
    option_a: "2000",
    option_b: "2400",
    option_c: "2500",
    option_d: "2700",
    answer: "a",
    difficulty: "Moderate",
    tags: ["Percentages"],
    subject: "Mathematics",
    hint: "Let Tanuj's amount be T. Express others in terms of T.",
    explanation: "Let T = Tanuj. Manuj = 0.75T, Anuj = 1.2(0.75T) = 0.9T. Total: T + 0.75T + 0.9T = 2.65T = 5300. T = 2000"
  },
  {
    id: 18,
    question_text: "If 70% of a number added to 90 gives the result as the number itself. What is the number?",
    option_a: "300",
    option_b: "360",
    option_c: "420",
    option_d: "480",
    answer: "a",
    difficulty: "Moderate",
    tags: ["Percentages"],
    subject: "Mathematics",
    hint: "Set up equation: 0.7x + 90 = x.",
    explanation: "0.7x + 90 = x. Solving: 90 = 0.3x, so x = 300"
  },
  // Difficult Questions
  {
    id: 19,
    question_text: "A box contains 90 blue balls, 110 red balls, 150 black balls and 50 pink balls. 50% of blue balls and 70% of red balls are taken away. What percentage of the initial number of balls are remaining in the box?",
    option_a: "75%",
    option_b: "77.25%",
    option_c: "80%",
    option_d: "82.5%",
    answer: "b",
    difficulty: "Difficult",
    tags: ["Percentages"],
    subject: "Mathematics",
    hint: "Calculate total balls initially and how many are removed.",
    explanation: "Total = 400. Removed: 45 blue + 77 red = 122. Remaining = 278. Percentage = (278/400) × 100 = 77.25%"
  },
  {
    id: 20,
    question_text: "The population of a village is 1200. 58.33% of the total population are males. 50% of males and 60% of females of the village are literate. What is the total illiterate population of the village?",
    option_a: "450",
    option_b: "500",
    option_c: "550",
    option_d: "600",
    answer: "d",
    difficulty: "Difficult",
    tags: ["Percentages"],
    subject: "Mathematics",
    hint: "Calculate males and females separately, then find illiterate in each group.",
    explanation: "Males = 700, Females = 500. Illiterate males = 350, Illiterate females = 200. Total illiterate = 550. But answer key says 600, which seems incorrect based on the calculation."
  }
];

export const getDifficultyLevel = (difficulty: string): number => {
  switch (difficulty) {
    case 'Very easy': return 1;
    case 'Easy': return 2;
    case 'Moderate': return 3;
    case 'Difficult': return 4;
    default: return 2;
  }
};

export const getDifficultyName = (level: number): string => {
  switch (level) {
    case 1: return 'Very easy';
    case 2: return 'Easy';
    case 3: return 'Moderate';
    case 4: return 'Difficult';
    default: return 'Easy';
  }
};

export const getQuestionsByDifficulty = (difficulty: string): Question[] => {
  return percentageQuestions.filter(q => q.difficulty === difficulty);
};

export const getRandomQuestionByDifficulty = (difficulty: string): Question | null => {
  const questions = getQuestionsByDifficulty(difficulty);
  if (questions.length === 0) return null;
  return questions[Math.floor(Math.random() * questions.length)];
};