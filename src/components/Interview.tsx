import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Mic, Camera, Play, StopCircle, Loader } from 'lucide-react';
import { useStore } from '../store';
import { generateQuestions } from '../utils/ai';

export default function Interview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const { interviews, addAnswers } = useStore();
  const interview = interviews.find(i => i.id === id);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [hasPermissions, setHasPermissions] = useState(false);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setupInterview();
  }, [interview]);

  const setupInterview = async () => {
    if (!interview) return;
    setIsLoading(true);
    try {
      const generatedQuestions = await generateQuestions(interview.position, interview.description);
      setQuestions(generatedQuestions);
    } catch (error) {
      console.error('Error setting up interview:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const requestPermissions = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setHasPermissions(true);
    } catch (err) {
      console.error('Error accessing media devices:', err);
      alert('Unable to access camera or microphone. Please ensure permissions are granted.');
    }
  };

  const handleRecord = () => {
    setIsRecording(true);
    // In a real app, implement actual recording logic here
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    // Simulate saving the answer
    const newAnswers = [...answers, `Answer for question ${currentQuestion + 1}`];
    setAnswers(newAnswers);
    
    if (currentQuestion === questions.length - 1) {
      addAnswers(id!, newAnswers);
      navigate(`/feedback/${id}`);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  if (!interview) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800">Interview not found</h2>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <Loader className="animate-spin h-8 w-8 mx-auto mb-4" />
        <p className="text-gray-600">Preparing your interview questions...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Interview for {interview.position}</h2>
          
          {!hasPermissions ? (
            <div className="text-center py-8">
              <h3 className="text-xl mb-4">We need camera and microphone access</h3>
              <button
                onClick={requestPermissions}
                className="flex items-center gap-2 mx-auto bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
              >
                <Camera size={20} />
                <Mic size={20} />
                Enable Access
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="mb-4">
                    {questions.map((q, idx) => (
                      <button
                        key={idx}
                        className={`mr-2 mb-2 px-4 py-2 rounded ${
                          idx === currentQuestion
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200'
                        }`}
                      >
                        Question #{idx + 1}
                      </button>
                    ))}
                  </div>
                  <p className="text-lg mb-4">{questions[currentQuestion]}</p>
                  {!isRecording ? (
                    <button
                      onClick={handleRecord}
                      className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      <Play size={20} /> Record Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleStopRecording}
                      className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                    >
                      <StopCircle size={20} /> Stop Recording
                    </button>
                  )}
                </div>
                <div className="bg-black rounded-lg overflow-hidden h-[300px] lg:h-auto">
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    mirrored
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}