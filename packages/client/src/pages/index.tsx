import React from 'react';
import { useAuth } from '@/context/AuthContext'; // Ensure the path matches your setup

const Home: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {isAuthenticated ? (
        <p>
          You are logged in! Go to your <a href="/dashboard">dashboard</a>.
        </p>
      ) : (
        <p>
          You are not logged in. Please <a href="/login">log in</a>.
        </p>
      )}
    </div>
  );
};

export default Home;
