import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

interface ActivityStat {
  count: number;
  label: string;
  isNew?: boolean;
  newCount?: number;
  locked?: boolean;
}

interface ActivitySummaryProps {
  stats: ActivityStat[];
  isPremium: boolean;
}

const ActivitySummary: React.FC<ActivitySummaryProps> = ({ stats, isPremium }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5">
      <h2 className="text-xl font-semibold mb-4">Your Activity Summary</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <Card 
            key={index} 
            className={`border ${stat.locked ? 'relative overflow-hidden' : ''}`}
          >
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <div className="flex items-center gap-2">
                <span className="text-4xl font-bold">{stat.count}</span>
                {stat.isNew && (
                  <span className="text-xs bg-cyan-500 text-white px-2 py-0.5 rounded">
                    {stat.newCount} New
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-center">{stat.label}</p>
              
              {stat.locked && (
                <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {!isPremium && (
        <Card className="mt-4 border-dashed border-gray-300">
          <CardContent className="p-4 flex justify-between items-center">
            <div className="flex items-center">
              <span className="mr-2 text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </span>
              <div>
                <span>Only </span>
                <span className="text-cyan-500 font-medium">Premium</span>
                <span> Members can avail these benefits</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ActivitySummary;