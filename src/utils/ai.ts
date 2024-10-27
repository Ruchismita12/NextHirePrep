import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyBTslVZYq-RsfKW9K_3m0tlc1E6RIe5sX0');

export async function generateQuestions(position: string, description: string): Promise<string[]> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const prompt = `Generate 5 technical interview questions for a ${position} position with the following tech stack: ${description}. 
    Format each question on a new line. Questions should be challenging but appropriate for the role. 
    Focus on both technical skills and problem-solving abilities.`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Split by newlines and clean up the questions
    const questions = text
      .split('\n')
      .map(q => q.trim())
      .filter(q => q && q.length > 10) // Filter out empty lines and too short questions
      .slice(0, 5);

    // If we don't get exactly 5 questions, add fallback questions
    const fallbackQuestions = [
      'Describe your experience with the main technologies in your stack.',
      'How do you handle error handling in your applications?',
      'Explain your approach to testing and quality assurance.',
      'How do you stay updated with new technologies?',
      'Describe a challenging technical problem you solved recently.',
    ];

    // Ensure we always return exactly 5 questions
    return [...questions, ...fallbackQuestions].slice(0, 5);
  } catch (error) {
    console.error('Error generating questions:', error);
    // Return fallback questions if API fails
    return [
      'Describe your experience with the main technologies in your stack.',
      'How do you handle error handling in your applications?',
      'Explain your approach to testing and quality assurance.',
      'How do you stay updated with new technologies?',
      'Describe a challenging technical problem you solved recently.',
    ];
  }
}