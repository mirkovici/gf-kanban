import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { LOGIN_USER } from '@/apollo/mutations/users';
import { setUser } from '@/store/slices/userSlice';

const Login: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Component State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginUser, { loading }] = useMutation(LOGIN_USER); // Apollo Mutation Hook

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setError(''); // Reset any previous error messages

    try {
      // Call the GraphQL mutation
      const { data } = await loginUser({
        variables: { email, password },
      });

      // Check for valid login data
      if (data?.login?.access_token && data?.login?.user_id) {
        // Dispatch user data to Redux store
        dispatch(
          setUser({
            id: data.login.user_id,
            token: data.login.access_token,
            email,
          }),
        );

        // Store token and user ID in localStorage
        localStorage.setItem('auth_token', data.login.access_token);
        localStorage.setItem('user_id', data.login.user_id);

        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err: any) {
      // Capture GraphQL or network errors
      const message =
        err?.graphQLErrors?.[0]?.message || 'An unexpected error occurred.';
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Welcome Back
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Please sign in to continue.
        </p>
        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Redirect to Register */}
        <p className="text-sm text-gray-600 text-center mt-4">
          Don&apos;t have an account?{' '}
          <a href="/register" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
