import React from 'react';
import Card from '../components/Card';
 

function Contact() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Contact Page</h1>

      <div>
         <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <Card 
        title="Learn React"
        description="Build powerful UIs with components."
        date="2025-06-17"
      />
      <Card 
        title="Master Tailwind"
        description="Style your app with utility classes."
      />
      <Card 
        title="Vite + React"
        description="Super fast development experience."
        date="2025-06-18"
      />
    </div>
      </div>
    </div>
  );
}

export default Contact;
