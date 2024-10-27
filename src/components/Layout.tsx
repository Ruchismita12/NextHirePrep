import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserButton } from '@clerk/clerk-react';
import { Brain } from 'lucide-react';

export default function Layout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-xl font-semibold text-indigo-600"
            >
              <Brain size={24} />
              NextHirePrep
            </button>
            <UserButton afterSignOutUrl="/sign-in" />
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}