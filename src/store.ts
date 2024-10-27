import { create } from 'zustand';

interface Interview {
  id: string;
  position: string;
  description: string;
  experience: number;
  date: string;
  answers?: string[];
}

interface Store {
  interviews: Interview[];
  addInterview: (interview: Interview) => void;
  addAnswers: (id: string, answers: string[]) => void;
}

export const useStore = create<Store>((set) => ({
  interviews: [],
  addInterview: (interview) =>
    set((state) => ({ interviews: [...state.interviews, interview] })),
  addAnswers: (id, answers) =>
    set((state) => ({
      interviews: state.interviews.map((interview) =>
        interview.id === id ? { ...interview, answers } : interview
      ),
    })),
}));