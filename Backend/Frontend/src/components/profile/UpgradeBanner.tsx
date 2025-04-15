import React from 'react';
import { Button } from "@/components/ui/button";

const UpgradeBanner = () => {
  return (
    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg overflow-hidden shadow-sm text-white">
      <div className="p-6 h-full flex flex-col justify-between">
        <div className="flex justify-center">
          <div className="px-4 py-1 bg-red-500 rounded-lg text-xl font-bold text-center mb-4">
            30 DAY
          </div>
        </div>
        
        <div className="text-center mb-4">
          <h2 className="text-4xl font-bold">MONEY</h2>
          <h2 className="text-4xl font-bold">BACK</h2>
          <h2 className="text-4xl font-bold mb-4">GUARANTEE<sup>*</sup></h2>
          
          <div className="bg-white rounded-full w-48 h-48 mx-auto flex items-center justify-center mb-4">
            <div className="text-center">
              <p className="text-gray-600 text-lg">SAVE UP TO</p>
              <p className="text-blue-600 text-7xl font-bold">83%</p>
            </div>
          </div>
          
          <Button variant="default" className="bg-black hover:bg-gray-800 text-white font-bold text-xl py-6 px-6 rounded-lg w-full">
            Upgrade Now
          </Button>
          
          <p className="text-sm mt-2 opacity-80">*Conditions apply.</p>
        </div>
      </div>
    </div>
  );
};

export default UpgradeBanner;
