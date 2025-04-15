import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const ProfessionalDetails = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-5 mt-6">
      <h2 className="text-xl font-semibold mb-4">Improve your Profile</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-green-100/80 flex items-center justify-center p-8 rounded-lg">
          <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
            </svg>
          </div>
        </div>
        
        <div className="flex flex-col justify-center">
          <h3 className="text-xl font-medium text-gray-700 mb-3">
            Add your professional details to get better responses
          </h3>
          
          <div className="mb-4">
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Working as" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="software_engineer">Software Engineer</SelectItem>
                <SelectItem value="doctor">Doctor</SelectItem>
                <SelectItem value="lawyer">Lawyer</SelectItem>
                <SelectItem value="business_owner">Business Owner</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button className="bg-cyan-400 hover:bg-cyan-500 text-white w-40 py-6">
            Submit
          </Button>
        </div>
      </div>
      
      {/* <div className="flex justify-center mt-4">
        <div className="flex gap-1.5">
          <div className="h-2 w-2 rounded-full bg-red-500"></div>
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
          <div className="h-2 w-2 rounded-full bg-gray-300"></div>
        </div>
      </div> */}
    </div>
  );
};

export default ProfessionalDetails;