import React, { useState } from 'react';
import { Eye, EyeOff, User, Lock, LogIn, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');        // ✅ renamed from username for clarity
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('⚠ Please fill in all fields.');
      return;
    }

    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in user:', userCredential.user);

      // Optionally store user data
      localStorage.setItem("userEmail", userCredential.user.email);

      // Navigate to home page
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(`⚠ ${err.message}`);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Google user:", result.user);
      localStorage.setItem("userEmail", result.user.email);
      navigate('/');
    } catch (err) {
      console.error("Google sign-in error", err);
      setError(`⚠ ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-800 dark:via-gray-900 dark:to-black transition">
      <form 
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md transform hover:scale-105 transition duration-300"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">
          Welcome Back
        </h2>

        {error && <div className="bg-red-100 text-red-600 p-2 mb-4 rounded text-center">{error}</div>}

        {/* Email */}
        <div className="relative mb-4">
          <User className="absolute top-3 left-3 text-gray-400" size={18} />
          <input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full pl-10 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div className="relative mb-4">
          <Lock className="absolute top-3 left-3 text-gray-400" size={18} />
          <input 
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full pl-10 pr-10 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button 
            type="button"
            className="absolute top-2.5 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <button 
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 transition flex justify-center items-center gap-2"
        >
          <LogIn size={18} /> Sign In
        </button>

        <button 
          type="button"
          onClick={handleGoogleLogin}
          className="mt-3 w-full bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 transition flex justify-center items-center gap-2"
        >
          <Globe size={18} /> Sign in with Google
        </button>

        <p className="text-sm text-center mt-4 text-gray-500 dark:text-gray-400">
          Forgot password? <span className="text-blue-500 hover:underline cursor-pointer">Reset</span> 
        </p>
        <p className="text-sm text-center mt-2 text-gray-500 dark:text-gray-400">
          New User? <Link className="text-blue-500 hover:underline cursor-pointer" to="/signup">Sign Up</Link> 
        </p>
      </form>
    </div>
  );
}

export default Login;
