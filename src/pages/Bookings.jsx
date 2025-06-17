import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';  // Added import for navigation

const AREAS = [
  "Shivajinagar",
  "Kothrud",
  "Hinjewadi",
  "Baner",
  "Viman Nagar",
  "Hadapsar"
];

const TANKER_OWNERS = {
  "Shivajinagar": ["Shree Water Suppliers", "Sai Tankers", "BlueWave Tanker Service"],
  "Kothrud": ["GreenLeaf Tankers", "Maharaja Tanker Service", "AquaPure Tankers"],
  "Hinjewadi": ["Hinjewadi Aqua", "TechCity Water Suppliers", "FreshFlow Tankers"],
  "Baner": ["Baner Tanker Co.", "PureDrops Water Service", "Quick Aqua Supply"],
  "Viman Nagar": ["Skyline Tankers", "Viman Water Delivery", "Jet Aqua Tankers"],
  "Hadapsar": ["Hadapsar Aqua", "FreshStream Tankers", "FlowFast Tanker Service"]
};

function BookTanker() {
  const [area, setArea] = useState("");
  const [owner, setOwner] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [litres, setLitres] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const litresInt = parseInt(litres);
    if (litresInt < 100 || litresInt > 1000 || litresInt % 100 !== 0) {
      alert("Please enter litres in steps of 100 between 100 and 1000.");
      return;
    }
    console.log({ area, owner, name, email, phone, litres: litresInt, address });
    alert("Booking submitted successfully!");
    navigate('/payments');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-black dark:to-black p-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
      >
        <h1 className="text-3xl font-bold text-center text-blue-600 dark:text-blue-400 mb-4">
          Book a Tanker
        </h1>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          
          {/* Area selection */}
          <select
            value={area}
            onChange={(e) => { setArea(e.target.value); setOwner(""); }}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select Area</option>
            {AREAS.map((a, idx) => (
              <option key={idx} value={a}>{a}</option>
            ))}
          </select>

          {/* Owner selection */}
          {area && (
            <select
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Tanker Owner</option>
              {TANKER_OWNERS[area].map((o, idx) => (
                <option key={idx} value={o}>{o}</option>
              ))}
            </select>
          )}

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="number"
            placeholder="Litres Required (100-1000)"
            value={litres}
            onChange={(e) => setLitres(e.target.value)}
            min="100"
            max="1000"
            step="100"
            className="p-3 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-400"
            required
          />

          <textarea
            placeholder="Detailed Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            className="md:col-span-2 p-3 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="md:col-span-2 bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Proceed for Payment
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default BookTanker;
