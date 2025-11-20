import { SignedIn, SignedOut } from '@clerk/clerk-react';
import Auth from './components/Auth';
import MainApp from './components/MainApp';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <SignedOut>
        <Auth />
      </SignedOut>
      
      <SignedIn>
        <MainApp />
      </SignedIn>
    </div>
  );
}

export default App;