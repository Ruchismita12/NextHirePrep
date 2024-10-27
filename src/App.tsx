import { ClerkProvider, SignIn, SignUp } from '@clerk/clerk-react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Interview from './components/Interview';
import Feedback from './components/Feedback';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

const CLERK_KEY = 'pk_test_dHJ1ZS1zYXdmbHktNDYuY2xlcmsuYWNjb3VudHMuZGV2JA';

function App() {
  return (
    <ClerkProvider publishableKey={CLERK_KEY}>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignIn routing="path" path="/sign-in" />} />
          <Route path="/sign-up" element={<SignUp routing="path" path="/sign-up" />} />
          <Route element={<Layout />}>
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/interview/:id" element={<Interview />} />
              <Route path="/feedback/:id" element={<Feedback />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;