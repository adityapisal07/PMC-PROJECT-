import React, { useState, useEffect } from 'react';
import { PlusCircle, LogIn, Users } from 'lucide-react';

function Groups() {
  const [groupName, setGroupName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [joining, setJoining] = useState(false);

  const fetchGroups = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/groups/list");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setGroups(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching groups:", err);
      setGroups([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleCreate = async () => {
    if (!groupName.trim()) return;
    setCreating(true);
    try {
      const res = await fetch(`http://localhost:8080/api/groups/create?name=${encodeURIComponent(groupName)}`, {
        method: 'POST'
      });
      if (res.ok) {
        await fetchGroups();
        setGroupName('');
      } else {
        alert("❌ Failed to create group");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error creating group");
    }
    setCreating(false);
  };

  const handleJoin = async () => {
    if (!joinCode.trim()) return;
    setJoining(true);
    try {
      const res = await fetch(`http://localhost:8080/api/groups/join?code=${encodeURIComponent(joinCode)}`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data && data.id) {
        alert(`✅ Joined group: ${data.name}`);
        await fetchGroups();
        setJoinCode('');
      } else {
        alert('❌ Invalid code');
      }
    } catch (err) {
      console.error(err);
      alert('❌ Error joining group');
    }
    setJoining(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">Groups</h1>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Create Group */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-green-600">
              <PlusCircle /> Create a New Group
            </h2>
            <input
              value={groupName}
              onChange={e => setGroupName(e.target.value)}
              placeholder="Enter group name"
              className="w-full p-3 border rounded mb-3 focus:ring-2 focus:ring-green-400"
              disabled={creating}
            />
            <button
              onClick={handleCreate}
              disabled={creating}
              className={`w-full p-3 rounded-lg font-medium text-white ${
                creating ? "bg-green-300 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {creating ? "Creating..." : "Create Group"}
            </button>
          </div>

          {/* Join Group */}
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-blue-600">
              <LogIn /> Join a Group
            </h2>
            <input
              value={joinCode}
              onChange={e => setJoinCode(e.target.value)}
              placeholder="Enter join code"
              className="w-full p-3 border rounded mb-3 focus:ring-2 focus:ring-blue-400"
              disabled={joining}
            />
            <button
              onClick={handleJoin}
              disabled={joining}
              className={`w-full p-3 rounded-lg font-medium text-white ${
                joining ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {joining ? "Joining..." : "Join Group"}
            </button>
          </div>
        </div>

        {/* Group List */}
        <div className="bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="flex items-center gap-2 text-xl font-semibold mb-4 text-purple-600">
            <Users /> Your Groups
          </h2>
          {loading ? (
            <p className="text-center text-gray-500">Loading groups...</p>
          ) : groups.length === 0 ? (
            <p className="text-center text-gray-500">You haven’t joined or created any groups yet.</p>
          ) : (
            <ul className="space-y-2">
              {groups.map(g => (
                <li key={g.id} className="p-4 border rounded-lg flex justify-between items-center hover:bg-gray-50 transition">
                  <div>
                    <p className="font-medium text-lg">{g.name}</p>
                    <p className="text-sm text-gray-500">Code: {g.code}</p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Active</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Groups;
