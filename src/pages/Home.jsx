import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { BookOpen, Users, MessageSquare, FileText, LogOut, MessageCircle, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

function Home() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("userEmail");
      navigate('/login');
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const features = [
    { icon: BookOpen, title: "Shared Notes", desc: "Collaborate and share study notes with your peers.", path: "/notes" },
    { icon: Users, title: "Study Groups", desc: "Join or form groups for better collaboration.", path: "/groups" },
    { icon: MessageSquare, title: "Discussions", desc: "Engage in meaningful topic discussions.", path: "/discussions" },
    { icon: FileText, title: "Assignments", desc: "Manage, submit, and track assignments.", path: "/assignments" },
  ];

  return (
    <div className={`relative min-h-screen overflow-y-auto font-sans ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Background video */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
          style={{ opacity: 0.6 }} // make video visible but subtle
        >
          <source src="/videos/0418.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/20"></div> {/* optional soft overlay */}
      </div>

      {/* Buttons */}
      <div className="fixed top-4 right-4 z-40 flex gap-2">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full shadow-md ${
            darkMode ? 'bg-yellow-400 hover:bg-yellow-500 text-black' : 'bg-gray-800 hover:bg-gray-900 text-white'
          }`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-full shadow-md flex items-center gap-1"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 space-y-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Welcome to NoteNode ✨
          </h1>
          <p className="mt-2 max-w-2xl mx-auto text-lg text-blue-100">
            Your ultimate platform for collaborative learning.
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              onClick={() => navigate(item.path)}
              className="cursor-pointer backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition"
            >
              <item.icon size={36} className="mb-3 text-blue-300" />
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-blue-100">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp Community */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="flex flex-col items-center justify-center text-center bg-green-500/20 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-3">Join our WhatsApp Community</h3>
            <button
              onClick={() => window.open('https://chat.whatsapp.com/', '_blank')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} /> Join Now
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="mt-16 text-center text-blue-100 space-y-2">
          <p className="text-sm">Follow us on</p>
          <div className="flex justify-center gap-6 text-white text-2xl">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
          <p className="text-xs">&copy; {new Date().getFullYear()} NoteNode — Made for learners, by learners.</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
