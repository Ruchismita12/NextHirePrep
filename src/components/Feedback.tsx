import { useParams } from 'react-router-dom';
import { useStore } from '../store';
import { Star } from 'lucide-react';

export default function Feedback() {
  const { id } = useParams();
  const { interviews } = useStore();
  const interview = interviews.find(i => i.id === id);
  
  // Simulated feedback data
  const score = 7;
  const feedback = [
    "Good technical knowledge demonstration",
    "Could improve communication clarity",
    "Strong problem-solving approach",
    "Need more specific examples in answers"
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-6">Interview Feedback</h2>
        
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-2">Position: {interview?.position}</h3>
          <p className="text-gray-600">Experience: {interview?.experience} years</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <h3 className="text-2xl font-semibold">Overall Score:</h3>
            <div className="flex items-center">
              <span className="text-3xl font-bold text-indigo-600">{score}</span>
              <span className="text-xl text-gray-600">/10</span>
            </div>
          </div>
          
          <div className="flex gap-1">
            {[...Array(10)].map((_, i) => (
              <Star
                key={i}
                size={24}
                className={i < score ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Key Takeaways</h3>
          <ul className="space-y-3">
            {feedback.map((point, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm">
                  {idx + 1}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Tips for Improvement</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Practice structured answering using the STAR method</li>
            <li>Prepare more concrete examples from your experience</li>
            <li>Work on technical communication clarity</li>
            <li>Research company-specific information before interviews</li>
          </ul>
        </div>
      </div>
    </div>
  );
}