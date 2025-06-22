import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
  Home,
  Users,
  FileText,
  Brain,
  User,
  LogOut,
  Search,
  BarChart,
  Clock
} from 'lucide-react';

const localizer = momentLocalizer(moment);

function Dashboard() {
  const [screenTime, setScreenTime] = useState(0);
  const [profilePic, setProfilePic] = useState("https://via.placeholder.com/100");

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const minutes = Math.floor((Date.now() - startTime) / 60000);
      setScreenTime(minutes);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const events = [
    {
      title: 'Group Discussion',
      start: new Date(2025, 5, 20, 10, 0),
      end: new Date(2025, 5, 20, 11, 0)
    },
    {
      title: 'Assignment Submission',
      start: new Date(2025, 5, 21, 15, 0),
      end: new Date(2025, 5, 21, 16, 0)
    }
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-100 via-blue-50 to-gray-200">
      {/* Sidebar */}
      <aside className="w-16 sm:w-64 bg-black/70 text-white backdrop-blur-lg flex flex-col justify-between py-6 px-2 shadow-2xl">
        <div className="space-y-3">
          <Link to="/dashboard" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition">
            <Home /> <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <Link to="/groups" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition">
            <Users /> <span className="hidden sm:inline">Groups</span>
          </Link>
          <Link to="/assignments" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition">
            <FileText /> <span className="hidden sm:inline">Assignments</span>
          </Link>
          <Link to="/aibox" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition">
            <Brain /> <span className="hidden sm:inline">AI Box</span>
          </Link>
        </div>
        <div className="space-y-2">
          <Link to="/profile" className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition">
            <User /> <span className="hidden sm:inline">Profile</span>
          </Link>
          <Link to="/" className="flex items-center gap-3 p-3 rounded-lg text-red-400 hover:bg-white/10 transition">
            <LogOut /> <span className="hidden sm:inline">Logout</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">NoteNode Hub</h1>
          <div className="relative w-full max-w-xs">
            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-full pl-10 pr-4 py-2 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition">
            <h2 className="font-semibold mb-2">Your Tasks Today</h2>
            <ul className="space-y-1 text-sm text-gray-600">
              <li>✅ Complete dashboard design</li>
              <li>✅ Check group discussions</li>
              <li>⏳ AI Box review pending</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition">
            <h2 className="font-semibold mb-2">Your Progress</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">465</p>
                <p className="text-xs text-gray-400">Tasks Completed</p>
              </div>
              <BarChart size={36} className="text-blue-400" />
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition">
            <h2 className="font-semibold mb-2 flex items-center"><Clock size={16} className="mr-1" /> Screen Time</h2>
            <p className="text-3xl font-bold">{screenTime} min</p>
            <p className="text-xs text-gray-400">Today on NoteNode</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-4 hover:shadow-xl transition">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 250 }}
            />
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 text-center hover:shadow-xl transition relative">
            <div className="relative inline-block">
              <img
                src={profilePic}
                alt=""
                className="w-28 h-28 rounded-full mx-auto shadow-lg border-4 border-white object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-blue-500 p-1.5 rounded-full cursor-pointer shadow-md hover:bg-blue-600 transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="hidden"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M4 3a2 2 0 00-2 2v2a1 1 0 001 1h2a1 1 0 001-1V5a2 2 0 00-2-2H4zm10 0a2 2 0 00-2 2v2a1 1 0 001 1h2a1 1 0 001-1V5a2 2 0 00-2-2h-2zM4 11a2 2 0 00-2 2v2a1 1 0 001 1h2a1 1 0 001-1v-2a2 2 0 00-2-2H4zm10 0a2 2 0 00-2 2v2a1 1 0 001 1h2a1 1 0 001-1v-2a2 2 0 00-2-2h-2z" />
                </svg>
              </label>
            </div>
            <h3 className="font-semibold mt-2">Your Name</h3>
            <p className="text-xs text-gray-400">NoteNode User</p>
            <button className="mt-3 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm hover:opacity-90">
              Settings
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
