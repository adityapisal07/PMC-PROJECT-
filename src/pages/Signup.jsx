import React, { useState } from 'react';
import { UserPlus, Lock, LogIn } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPass) {
      setError('⚠ All fields are required.');
      return;
    }
    if (password !== confirmPass) {
      setError('⚠ Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('⚠ Password must be at least 6 characters.');
      return;
    }

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      localStorage.setItem("userEmail", result.user.email);
      navigate('/');
    } catch (err) {
      setError(`⚠ ${err.message}`);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      localStorage.setItem("userEmail", result.user.email);
      navigate('/');
    } catch (err) {
      setError(`⚠ ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-pink-100 dark:from-gray-800 dark:via-gray-900 dark:to-black transition">
      <form 
        onSubmit={handleSignup}
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md transform hover:scale-105 transition duration-300"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-pink-600 dark:text-pink-400">
          Create Account
        </h2>

        {error && <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-center">{error}</div>}

        <div className="relative mb-4">
          <UserPlus className="absolute top-3 left-3 text-gray-400" size={18} />
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div className="relative mb-4">
          <Lock className="absolute top-3 left-3 text-gray-400" size={18} />
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div className="relative mb-6">
          <Lock className="absolute top-3 left-3 text-gray-400" size={18} />
          <input 
            type="password"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            placeholder="Confirm Password"
            className="w-full pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-pink-600 text-white p-3 rounded-lg font-semibold hover:bg-pink-700 transition mb-3"
        >
          Sign Up
        </button>

        <button 
          type="button"
          onClick={handleGoogleSignup}
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition flex items-center justify-center gap-2"
        >
          <LogIn size={18} /> Sign Up with Google
        </button>

        <p className="text-sm text-center mt-4 text-gray-500 dark:text-gray-400">
          Already have an account? <Link to="/login" className="text-pink-500 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
