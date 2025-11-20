import { SignIn, SignUp, SignedIn, SignedOut } from '@clerk/clerk-react';

function Auth() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">🏥 MediTrack</h1>
          <p className="text-gray-600">Your Personal Health Dashboard</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <SignedOut>
            <SignIn />
            <div className="mt-4 text-center">
              <p className="text-gray-600">Don't have an account?</p>
              <div className="mt-2">
                <SignUp />
              </div>
            </div>
          </SignedOut>
          
          <SignedIn>
            <div className="text-center">
              <p className="text-gray-600 mb-4">You're signed in!</p>
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}

export default Auth;