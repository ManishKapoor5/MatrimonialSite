import React, { useState, useEffect } from 'react';
import { Crown, UserCircle2 } from 'lucide-react';
import ProfileDialog from './ProfileDialog';
import { io, Socket } from 'socket.io-client';

let socket: Socket;

interface Visitor {
  id: string;
  name: string;
  age: number;
  height: string;
  language: string;
  location: string;
  imageUrl: string | null;
  isPremium?: boolean;
}

const VisitorCard: React.FC<{ visitor: Visitor; onConnect: (visitor: Visitor) => void }> = ({ visitor, onConnect }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-lg">
      <div className="relative">
        {visitor.imageUrl ? (
          <img
            src={visitor.imageUrl}
            alt={visitor.name}
            className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full mx-auto mb-3 bg-gray-100 flex items-center justify-center">
            <UserCircle2 className="w-16 h-16 text-gray-400" />
          </div>
        )}
        {visitor.isPremium && (
          <Crown className="absolute top-0 right-0 w-6 h-6 text-yellow-500" />
        )}
      </div>
      
      <div className="text-center">
        <h3 className="font-semibold text-lg text-gray-800">{visitor.name}</h3>
        <p className="text-gray-600 text-sm">
          {visitor.age} yrs, {visitor.height}, {visitor.language}
        </p>
        <p className="text-gray-500 text-sm mb-3">{visitor.location}</p>
        <button 
          onClick={() => onConnect(visitor)}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 px-4 rounded-full hover:from-cyan-600 hover:to-blue-600 transition-all duration-300"
        >
          Connect Now
        </button>
      </div>
    </div>
  );
};

const RecentVisitors: React.FC = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    socket = io("http://localhost:5000", {
      auth: { token },
    });

    socket.on("userStatus", (data: Visitor[]) => {
      setVisitors(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Recent Visitors</h2>
        <span className="bg-red-500 text-white text-sm px-2 py-0.5 rounded-full">
          {visitors.length}
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visitors.map((visitor) => (
          <VisitorCard 
            key={visitor.id} 
            visitor={visitor} 
            onConnect={setSelectedVisitor}
          />
        ))}
      </div>

      {selectedVisitor && (
        <ProfileDialog 
          visitor={selectedVisitor} 
          onClose={() => setSelectedVisitor(null)} 
        />
      )}
    </div>
  );
};

export default RecentVisitors;
