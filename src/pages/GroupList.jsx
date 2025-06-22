import React, { useEffect, useState } from "react";

function GroupsList() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/groups/list")
      .then((res) => res.json())
      .then((data) => setGroups(data))
      .catch((err) => console.error("Error fetching groups:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Groups</h2>
      {groups.length === 0 ? (
        <p>No groups available</p>
      ) : (
        <ul className="space-y-2">
          {groups.map((group) => (
            <li key={group.id} className="border rounded p-2">
              <p className="font-semibold">{group.name}</p>
              <p className="text-sm text-gray-500">Code: {group.code}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default GroupsList;
