import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Plus } from 'lucide-react';
import { useStore } from '../store';

interface InterviewData {
  id: string;
  position: string;
  description: string;
  experience: number;
  date: string;
}

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    position: '',
    description: '',
    experience: '',
  });
  const navigate = useNavigate();
  const { addInterview, interviews } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = Date.now().toString();
    const interview = {
      id,
      position: formData.position,
      description: formData.description,
      experience: parseInt(formData.experience),
      date: new Date().toLocaleDateString(),
    };
    addInterview(interview);
    setIsModalOpen(false);
    navigate(`/interview/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          <Plus size={20} /> Add New
        </button>
      </div>

      {/* Interview List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviews.map((interview: InterviewData) => (
          <div key={interview.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{interview.position}</h3>
            <p className="text-gray-600 mb-2">{interview.experience} Years of Experience</p>
            <p className="text-sm text-gray-500 mb-4">Created: {interview.date}</p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate(`/feedback/${interview.id}`)}
                className="text-gray-600 hover:text-gray-800"
              >
                Feedback
              </button>
              <button
                onClick={() => navigate(`/interview/${interview.id}`)}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Start
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* New Interview Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">New Interview</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Position
                </label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="Ex. Full Stack Developer"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Job Description / Tech Stack
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="Ex. React, Node.js, MySQL etc"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <input
                  type="number"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full p-2 border rounded"
                  placeholder="Ex. 5"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                >
                  Start Interview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}