import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Truck, CalendarCheck, History, HelpCircle, CreditCard, FileText } from 'lucide-react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { motion } from 'framer-motion';

function Home() {
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");

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
    { icon: Truck, title: "Book Tanker", desc: "Request a tanker quickly with a few clicks.", color: "text-blue-500", path: "/bookings" },
    { icon: CalendarCheck, title: "Manage Bookings", desc: "View and manage your upcoming bookings.", color: "text-green-500", path: "/manage" },
    { icon: History, title: "Booking History", desc: "Track all your previous bookings easily.", color: "text-purple-500", path: "/history" },
    { icon: HelpCircle, title: "Help & Support", desc: "Need assistance? We are here for you.", color: "text-yellow-500", path: "/help" },
    { icon: CreditCard, title: "Payments", desc: "Secure online payments for your bookings.", color: "text-red-500", path: "/payments" },
    { icon: FileText, title: "Reports", desc: "Download or view your monthly reports.", color: "text-pink-500", path: "/reports" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-black dark:to-black text-gray-900 dark:text-gray-100 p-6 relative">
      {/* Sticky Logout button */}
      <div className="fixed top-25 right-4 z-10">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Hero banner */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-12 mb-8"
      >
        <h1 className="text-4xl font-bold mb-2 text-blue-700 dark:text-blue-400">PMC WaterLine</h1>
        <p className="text-gray-600 dark:text-gray-400">Efficient. Reliable. Transparent. Book and manage tankers seamlessly.</p>
      </motion.div>

      {/* Features grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer"
            onClick={() => navigate(item.path)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg hover:shadow-2xl transition duration-300 flex flex-col items-center text-center"
            >
              <item.icon size={40} className={`mb-3 ${item.color}`} />
              <h2 className="text-lg font-semibold mb-1">{item.title}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Home;
