// import React from 'react';
// import { X, MessageCircle, Share2, Printer, Lock, Clock, Users, Phone, Mail, Wine, Book, Home, Users2 } from 'lucide-react';

// interface ProfileDialogProps {
//   visitor: {
//     id: string;
//     name: string;
//     age: number;
//     height: string;
//     language: string;
//     location: string;
//     imageUrl: string | null;
//     isPremium?: boolean;
//   };
//   onClose: () => void;
// }

// interface NewMatch {
//   name: string;
//   age: number;
//   height: string;
//   religion: string;
//   caste: string;
//   occupation: string;
//   location: string;
//   imageUrl: string | null;
// }

// const newMatches: NewMatch[] = [
//   {
//     name: 'Pushpa K',
//     age: 37,
//     height: "4' 11\"",
//     religion: 'Hindu',
//     caste: 'Sched',
//     occupation: 'Not working',
//     location: 'Delhi, Delhi-NCR',
//     imageUrl: null
//   },
//   {
//     name: 'Lata R',
//     age: 33,
//     height: "5' 0\"",
//     religion: 'Hindu',
//     caste: 'Pasi',
//     occupation: 'Professor',
//     location: 'Bareilly, Uttar Pradesh',
//     imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&fit=crop'
//   },
//   {
//     name: 'Sangeetha T',
//     age: 34,
//     height: "5' 3\"",
//     religion: 'Hindu',
//     caste: 'Other',
//     occupation: 'Business Owner / Entre',
//     location: 'Vientiane, Laos',
//     imageUrl: null
//   }
// ];

// const ProfileDialog: React.FC<ProfileDialogProps> = ({ visitor, onClose }) => {
//   const [activeTab, setActiveTab] = React.useState<'detailed' | 'preferences'>('detailed');

//   return (
//     <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b z-10 p-4 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
//               <X className="w-6 h-6" />
//             </button>
//             <div className="flex items-center gap-2">
//               <h2 className="text-xl font-semibold">{visitor.name}</h2>
//               {visitor.isPremium && <Lock className="text-green-500 w-5 h-5" />}
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <span className="text-green-600 flex items-center gap-1">
//               <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//               I am Online
//             </span>
//             <button className="p-2 hover:bg-gray-100 rounded-full">
//               <MessageCircle className="w-6 h-6" />
//             </button>
//           </div>
//         </div>

//         <div className="flex gap-6 p-6">
//           {/* Main Content */}
//           <div className="flex-1">
//             {/* Profile Header */}
//             <div className="flex gap-6 mb-8">
//               <div className="w-96 rounded-lg overflow-hidden">
//                 <img 
//                   src={visitor.imageUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=600&fit=crop'} 
//                   alt={visitor.name}
//                   className="w-full h-[500px] object-cover"
//                 />
//                 <div className="mt-2 text-center text-gray-500 text-sm">1 of 4</div>
//               </div>
//               <div className="flex-1">
//                 <div className="flex items-center gap-3 mb-4">
//                   <Clock className="w-5 h-5 text-green-500" />
//                   <span className="text-green-600">Online 13h ago</span>
//                 </div>
                
//                 <div className="grid gap-4 mb-6">
//                   <div className="flex items-center gap-2">
//                     <Users className="w-5 h-5 text-gray-400" />
//                     <span>{visitor.age} yrs, {visitor.height}, Pisces</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Home className="w-5 h-5 text-gray-400" />
//                     <span>Lives in {visitor.location}, Madhya Pradesh, India</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Book className="w-5 h-5 text-gray-400" />
//                     <span>Masters degree in Medicine</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Users2 className="w-5 h-5 text-gray-400" />
//                     <span>Hindu, Hindi</span>
//                   </div>
//                 </div>

//                 {/* Contact Details */}
//                 <div className="bg-gray-50 p-4 rounded-lg mb-6">
//                   <h3 className="font-semibold mb-4">Contact Details</h3>
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2">
//                       <Phone className="w-5 h-5 text-gray-400" />
//                       <div>
//                         <div className="text-gray-400">Contact Number</div>
//                         <div className="flex items-center gap-2">
//                           <span>+91 9993X XXXXX</span>
//                           <button className="text-blue-500 text-sm">Upgrade Now to view details</button>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Mail className="w-5 h-5 text-gray-400" />
//                       <div>
//                         <div className="text-gray-400">Email ID</div>
//                         <div className="flex items-center gap-2">
//                           <span>XXXXXXXXXX@gmail.com</span>
//                           <button className="text-blue-500 text-sm">Upgrade Now to view details</button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* About */}
//                 <div className="mb-6">
//                   <h3 className="font-semibold mb-3">About Rachana V</h3>
//                   <p className="text-gray-600">
//                     I am looking for a suitable partner for my daughter.
//                     She has completed her M.Pharma. She is focused about her career, but makes it a point to give equal attention to family as well.
//                     Please get in touch if you would like to know more about her.
//                   </p>
//                 </div>

//                 {/* Lifestyle */}
//                 <div className="mb-6">
//                   <h3 className="font-semibold mb-3 flex items-center gap-2">
//                     <Wine className="w-5 h-5" />
//                     Lifestyle
//                   </h3>
//                   <div className="flex items-center gap-2">
//                     <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm">Vegetarian</span>
//                   </div>
//                 </div>

//                 {/* Family Details */}
//                 <div>
//                   <h3 className="font-semibold mb-3">Family Details</h3>
//                   <div className="space-y-2">
//                     <div className="flex gap-2">
//                       <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">Nuclear</span>
//                       <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">Moderate</span>
//                     </div>
//                     <p>Both parents are retired</p>
//                     <p>1 Sister (1 Married)</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="w-80">
//             {/* New Matches */}
//             <div className="bg-gray-50 rounded-lg p-4 mb-6">
//               <h3 className="font-semibold mb-4">New Matches</h3>
//               <div className="space-y-4">
//                 {newMatches.map((match, index) => (
//                   <div key={index} className="flex gap-3">
//                     {match.imageUrl ? (
//                       <img
//                         src={match.imageUrl}
//                         alt={match.name}
//                         className="w-16 h-16 rounded-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
//                         <Users className="w-8 h-8 text-gray-400" />
//                       </div>
//                     )}
//                     <div>
//                       <h4 className="font-medium">{match.name}</h4>
//                       <p className="text-sm text-gray-600">
//                         {match.age}, {match.height}, {match.religion}, {match.caste}
//                       </p>
//                       <p className="text-sm text-gray-500">{match.occupation}</p>
//                       <p className="text-sm text-gray-500">{match.location}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Success Stories */}
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h3 className="font-semibold mb-4">Success Stories</h3>
//               <div className="relative">
//                 <img
//                   src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=300&h=200&fit=crop"
//                   alt="Success Story"
//                   className="w-full h-48 object-cover rounded-lg mb-3"
//                 />
//                 <h4 className="font-medium">Somansh & Anshul</h4>
//                 <p className="text-sm text-gray-600">
//                   It was a fairytale in the making from the moment we connected with each other. Shaadi was...
//                   <button className="text-blue-500">Read full story</button>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileDialog;

// import React from 'react';
// import { 
//   X, MessageCircle, Share2, Printer, Lock, Clock, Users, Phone, 
//   Mail, Wine, Book, Home, Users2, ChevronDown, CheckCircle
// } from 'lucide-react';

// interface ProfileDialogProps {
//   visitor: {
//     id: string;
//     name: string;
//     age: number;
//     height: string;
//     language: string;
//     location: string;
//     imageUrl: string | null;
//     isPremium?: boolean;
//   };
//   onClose: () => void;
// }

// interface NewMatch {
//   name: string;
//   age: number;
//   height: string;
//   religion: string;
//   caste: string;
//   occupation: string;
//   location: string;
//   imageUrl: string | null;
// }

// const newMatches: NewMatch[] = [
//   {
//     name: 'Pushpa K',
//     age: 37,
//     height: "4' 11\"",
//     religion: 'Hindu',
//     caste: 'Sched',
//     occupation: 'Not working',
//     location: 'Delhi, Delhi-NCR',
//     imageUrl: null
//   },
//   {
//     name: 'Lata R',
//     age: 33,
//     height: "5' 0\"",
//     religion: 'Hindu',
//     caste: 'Pasi',
//     occupation: 'Professor',
//     location: 'Bareilly, Uttar Pradesh',
//     imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&fit=crop'
//   },
//   {
//     name: 'Sangeetha T',
//     age: 34,
//     height: "5' 3\"",
//     religion: 'Hindu',
//     caste: 'Other',
//     occupation: 'Business Owner / Entre',
//     location: 'Vientiane, Laos',
//     imageUrl: null
//   }
// ];

// const PreferenceItem: React.FC<{label: string; value: string | React.ReactNode; matches?: boolean}> = ({
//   label, value, matches = true
// }) => {
//   return (
//     <div className="border-b py-3">
//       <div className="flex justify-between items-center">
//         <div>
//           <div className="text-red-300 text-sm">{label}</div>
//           <div className="text-blue-800">{value}</div>
//         </div>
//         {matches && <CheckCircle className="w-5 h-5 text-green-500" />}
//       </div>
//     </div>
//   );
// };

// const ProfileDialog: React.FC<ProfileDialogProps> = ({ visitor, onClose }) => {
//   const [activeTab, setActiveTab] = React.useState<'detailed' | 'preferences'>('detailed');

//   return (
//     <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="sticky top-0 bg-white border-b z-10 p-4 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
//               <X className="w-6 h-6" />
//             </button>
//             <div className="flex items-center gap-2">
//               <h2 className="text-xl font-semibold">{visitor.name}</h2>
//               {visitor.isPremium && <Lock className="text-green-500 w-5 h-5" />}
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <span className="text-green-600 flex items-center gap-1">
//               <span className="w-2 h-2 bg-green-500 rounded-full"></span>
//               I am Online
//             </span>
//             <button className="p-2 hover:bg-gray-100 rounded-full">
//               <MessageCircle className="w-6 h-6" />
//             </button>
//           </div>
//         </div>

//         <div className="flex gap-6 p-6">
//           {/* Main Content */}
//           <div className="flex-1">
//             {/* Profile Header */}
//             <div className="flex gap-6 mb-8">
//               <div className="w-96 rounded-lg overflow-hidden">
//                 <img 
//                   src={visitor.imageUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=600&fit=crop'} 
//                   alt={visitor.name}
//                   className="w-full h-96 object-cover"
//                 />
//                 <div className="mt-2 text-center text-gray-500 text-sm">1 of 4</div>
//               </div>
//               <div className="flex-1">
//                 <div className="flex items-center gap-3 mb-4">
//                   <Clock className="w-5 h-5 text-green-500" />
//                   <span className="text-green-600">Online 13h ago</span>
//                 </div>
                
//                 <div className="grid gap-4 mb-6">
//                   <div className="flex items-center gap-2">
//                     <Users className="w-5 h-5 text-gray-400" />
//                     <span>{visitor.age} yrs, {visitor.height}, Pisces</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Home className="w-5 h-5 text-gray-400" />
//                     <span>Lives in {visitor.location}, Madhya Pradesh, India</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Book className="w-5 h-5 text-gray-400" />
//                     <span>Masters degree in Medicine</span>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Users2 className="w-5 h-5 text-gray-400" />
//                     <span>Hindu, Hindi</span>
//                   </div>
//                 </div>

//                 {/* Contact Details */}
//                 <div className="bg-gray-50 p-4 rounded-lg mb-6">
//                   <h3 className="font-semibold mb-4">Contact Details</h3>
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-2">
//                       <Phone className="w-5 h-5 text-gray-400" />
//                       <div>
//                         <div className="text-gray-400">Contact Number</div>
//                         <div className="flex items-center gap-2">
//                           <span>+91 9993X XXXXX</span>
//                           <button className="text-blue-500 text-sm">Upgrade Now to view details</button>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Mail className="w-5 h-5 text-gray-400" />
//                       <div>
//                         <div className="text-gray-400">Email ID</div>
//                         <div className="flex items-center gap-2">
//                           <span>XXXXXXXXXX@gmail.com</span>
//                           <button className="text-blue-500 text-sm">Upgrade Now to view details</button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* About */}
//                 <div className="mb-6">
//                   <h3 className="font-semibold mb-3">About Rachana V</h3>
//                   <p className="text-gray-600">
//                     I am looking for a suitable partner for my daughter.
//                     She has completed her M.Pharma. She is focused about her career, but makes it a point to give equal attention to family as well.
//                     Please get in touch if you would like to know more about her.
//                   </p>
//                 </div>

//                 {/* Lifestyle */}
//                 <div className="mb-6">
//                   <h3 className="font-semibold mb-3 flex items-center gap-2">
//                     <Wine className="w-5 h-5" />
//                     Lifestyle
//                   </h3>
//                   <div className="flex items-center gap-2">
//                     <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm">Vegetarian</span>
//                   </div>
//                 </div>

//                 {/* Family Details */}
//                 <div className="border-t py-6">
//                   <div className="flex items-center">
//                     <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
//                       <Home className="w-6 h-6 text-gray-400" />
//                     </div>
//                     <h3 className="text-xl font-medium text-red-500">Family Details</h3>
//                   </div>
                  
//                   <div className="mt-4">
//                     <div className="flex flex-wrap gap-2 mb-4">
//                       <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">Nuclear</span>
//                       <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm">Moderate</span>
//                     </div>
                    
//                     <div className="flex items-center gap-2 mb-2">
//                       <Users2 className="w-5 h-5 text-blue-400" />
//                       <span>Both parents are retired</span>
//                     </div>
                    
//                     <div className="flex items-center gap-2 mb-2">
//                       <Users className="w-5 h-5 text-orange-400" />
//                       <span>1 Sister (1 Married)</span>
//                     </div>
                    
//                     <div className="flex items-center gap-2 mb-2">
//                       <div className="w-5 h-5 text-green-400">₹</div>
//                       <span>Family Financial Status</span>
//                     </div>
                    
//                     <div className="ml-7 mb-2">
//                       <span className="font-medium">Middle - </span>
//                       <span>Annual family income is 10-30 lakhs</span>
//                     </div>
                    
//                     <button className="ml-7 text-blue-400">Show more</button>
//                   </div>
//                 </div>

//                 {/* Education & Career */}
//                 <div className="border-t py-6">
//                   <div className="flex items-center">
//                     <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
//                       <Book className="w-6 h-6 text-gray-400" />
//                     </div>
//                     <h3 className="text-xl font-medium text-red-500">Education & Career</h3>
//                   </div>
                  
//                   <div className="mt-4 space-y-3">
//                     <div className="flex items-center gap-2">
//                       <Book className="w-5 h-5 text-blue-400" />
//                       <span>M.Pharma - Master of Pharmacy</span>
//                     </div>
                    
//                     <div className="flex items-center gap-2">
//                       <Book className="w-5 h-5 text-blue-400" />
//                       <span>Medicine</span>
//                     </div>
                    
//                     <div className="flex items-center gap-2">
//                       <span className="w-5 h-5 text-pink-400">🩺</span>
//                       <span>Medical / Healthcare Professional - own business/self employed</span>
//                     </div>
                    
//                     <div>
//                       <div className="flex items-center gap-2">
//                         <div className="w-5 h-5 text-green-400">₹</div>
//                         <span className="font-medium">Self: </span>
//                         <span>Earns INR 1 Lakh to 2 Lakh annually</span>
//                       </div>
                      
//                       <div className="flex items-center gap-2 ml-7">
//                         <span className="font-medium">Family: </span>
//                         <span>Earns INR 10-30 lakhs annually</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* What She Is Looking For */}
//                 <div className="border-t py-6">
//                   <div className="flex items-center">
//                     <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
//                       <span className="text-gray-400">📋</span>
//                     </div>
//                     <h3 className="text-xl font-medium text-red-500">What She Is Looking For</h3>
//                   </div>
                  
//                   <div className="mt-6 flex justify-between">
//                     <div className="w-72">
//                       <div className="flex flex-col items-center">
//                         <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
//                           <img 
//                             src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&fit=crop" 
//                             alt="Profile"
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                         <h4 className="font-medium mb-3">Her Preferences</h4>
//                       </div>
                      
//                       <div className="mt-4">
//                         <PreferenceItem label="Age" value="34 to 38" />
//                         <PreferenceItem label="Height" value="5ft 4 to 6ft" />
//                         <PreferenceItem label="Marital Status" value="Never Married" />
//                         <PreferenceItem label="Religion / Community" value="Hindu" />
//                         <PreferenceItem label="Mother Tongue" value="Hindi, English" />
//                         <PreferenceItem 
//                           label="Country Living in" 
//                           value={
//                             <div className="flex items-center">
//                               <span>Australia, India, Korea, United Arab Emirates, United Kingdo...</span>
//                               <span className="text-blue-400 ml-1">more</span>
//                               <ChevronDown className="w-4 h-4 text-blue-400" />
//                             </div>
//                           } 
//                         />
//                         <PreferenceItem label="Qualification" value="Bachelor / Undergraduate, Master, Doctorate" />
//                         <PreferenceItem label="Working With" value="Private Company, Government / Public Sector" />
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center">
//                       <div className="text-center text-gray-400 py-6 px-10 border-dotted border-2 border-gray-300 rounded-lg">
//                         <div className="text-lg mb-2">You match 8/8 of her Preferences</div>
//                         <div className="flex justify-center">
//                           <div className="h-px w-16 bg-gray-300"></div>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="w-72">
//                       <div className="flex flex-col items-center">
//                         <div className="w-24 h-24 rounded-full overflow-hidden mb-2">
//                           <img 
//                             src="https://images.unsplash.com/photo-1581382575275-97901c2635b7?q=80&w=100&h=100&fit=crop" 
//                             alt="You"
//                             className="w-full h-full object-cover"
//                           />
//                         </div>
//                         <h4 className="font-medium mb-3">You match</h4>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div className="w-80">
//             {/* New Matches */}
//             <div className="bg-gray-50 rounded-lg p-4 mb-6">
//               <h3 className="font-semibold mb-4">New Matches</h3>
//               <div className="space-y-4">
//                 {newMatches.map((match, index) => (
//                   <div key={index} className="flex gap-3">
//                     {match.imageUrl ? (
//                       <img
//                         src={match.imageUrl}
//                         alt={match.name}
//                         className="w-16 h-16 rounded-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
//                         <Users className="w-8 h-8 text-gray-400" />
//                       </div>
//                     )}
//                     <div>
//                       <h4 className="font-medium">{match.name}</h4>
//                       <p className="text-sm text-gray-600">
//                         {match.age}, {match.height}, {match.religion}, {match.caste}
//                       </p>
//                       <p className="text-sm text-gray-500">{match.occupation}</p>
//                       <p className="text-sm text-gray-500">{match.location}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Success Stories */}
//             <div className="bg-gray-50 rounded-lg p-4">
//               <h3 className="font-semibold mb-4">Success Stories</h3>
//               <div className="relative">
//                 <img
//                   src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=300&h=200&fit=crop"
//                   alt="Success Story"
//                   className="w-full h-48 object-cover rounded-lg mb-3"
//                 />
//                 <h4 className="font-medium">Somansh & Anshul</h4>
//                 <p className="text-sm text-gray-600">
//                   It was a fairytale in the making from the moment we connected with each other. Shaadi was...
//                   <button className="text-blue-500">Read full story</button>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Footer Navigation */}
//         <div className="sticky bottom-0 bg-white border-t p-4 flex justify-between">
//           <div className="flex">
//             <button className="text-gray-500 px-3">Back</button>
//             <div className="text-gray-500">4 more Profiles</div>
//           </div>
//           <div className="flex gap-4">
//             <button className="text-gray-500">Prev</button>
//             <span className="text-gray-300">|</span>
//             <button className="text-blue-500">Next</button>
//           </div>
//         </div>
        
//         {/* Status Bar */}
//         <div className="fixed bottom-0 right-0 bg-white border-t border-l p-2 flex gap-4">
//           <button className="px-4 py-2 flex items-center gap-1">
//             <span>Alerts</span>
//           </button>
//           <button className="px-4 py-2">Chats</button>
//           <button className="px-4 py-2">Active (20)</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileDialog;

import React, { useState } from 'react';
import { 
  X, MessageCircle, Lock, Clock, Users, Phone, 
  Mail, Wine, Book, Home, Users2, ChevronDown, CheckCircle,
  Menu, ArrowLeft, ArrowRight, Filter
} from 'lucide-react';
import { Link } from "react-router-dom";

interface ProfileDialogProps {
  visitor: {
    id: string;
    name: string;
    age: number;
    height: string;
    language: string;
    location: string;
    imageUrl: string | null;
    isPremium?: boolean;
  };
  onClose: () => void;
}

interface NewMatch {
  name: string;
  age: number;
  height: string;
  religion: string;
  caste: string;
  occupation: string;
  location: string;
  imageUrl: string | null;
}

const newMatches: NewMatch[] = [
  {
    name: 'Pushpa K',
    age: 37,
    height: "4' 11\"",
    religion: 'Hindu',
    caste: 'Sched',
    occupation: 'Not working',
    location: 'Delhi, Delhi-NCR',
    imageUrl: null
  },
  {
    name: 'Lata R',
    age: 33,
    height: "5' 0\"",
    religion: 'Hindu',
    caste: 'Pasi',
    occupation: 'Professor',
    location: 'Bareilly, Uttar Pradesh',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&fit=crop'
  },
  {
    name: 'Sangeetha T',
    age: 34,
    height: "5' 3\"",
    religion: 'Hindu',
    caste: 'Other',
    occupation: 'Business Owner / Entre',
    location: 'Vientiane, Laos',
    imageUrl: null
  }
];

const PreferenceItem: React.FC<{label: string; value: string | React.ReactNode; matches?: boolean}> = ({
  label, value, matches = true
}) => {
  return (
    <div className="border-b py-2">
      <div className="flex justify-between items-center">
        <div className="pr-2">
          <div className="text-red-300 text-sm">{label}</div>
          <div className="text-blue-800 text-sm">{value}</div>
        </div>
        {matches && <CheckCircle className="w-4 h-4 flex-shrink-0 text-green-500" />}
      </div>
    </div>
  );
};

const ProfileDialog: React.FC<ProfileDialogProps> = ({ visitor, onClose }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'matches'>('profile');
  
  return (
    <div className="fixed inset-0 bg-white z-50 overflow-hidden flex flex-col">
      {/* Header */}
      <div className="bg-white border-b z-10 p-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1">
            <h2 className="text-lg font-semibold">{visitor.name}</h2>
            {visitor.isPremium && <Lock className="text-green-500 w-4 h-4" />}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-600 text-xs flex items-center gap-1">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="hidden sm:inline">I am Online</span>
          </span>
          <button className="p-1 hover:bg-gray-100 rounded-full">
            <Link to={`/chat`}>
              <MessageCircle className="w-5 h-5" />
            </Link>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b bg-white">
        <button 
          className={`flex-1 py-2 text-center ${activeTab === 'profile' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>
        <button 
          className={`flex-1 py-2 text-center ${activeTab === 'preferences' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('preferences')}
        >
          Preferences
        </button>
        <button 
          className={`flex-1 py-2 text-center ${activeTab === 'matches' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('matches')}
        >
          Matches
        </button>
      </div>

      {/* Content Area - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'profile' && (
          <div className="p-3">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Image and Basic Info */}
              <div className="w-full md:w-2/5">
                <div className="rounded-lg overflow-hidden mb-2">
                  <img 
                    src={visitor.imageUrl || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=600&fit=crop'} 
                    alt={visitor.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="mt-1 text-center text-gray-500 text-sm">1 of 4</div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-green-500" />
                    <span className="text-green-600 text-sm">Online 13h ago</span>
                  </div>
                  
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">{visitor.age} yrs, {visitor.height}, Pisces</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">Lives in {visitor.location}, Madhya Pradesh, India</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Book className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">Masters degree in Medicine</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users2 className="w-4 h-4 text-gray-400" />
                      <span className="text-sm">Hindu, Hindi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Wine className="w-4 h-4 text-gray-400" />
                      <span className="bg-green-50 text-green-600 px-2 py-1 rounded-full text-xs">Vegetarian</span>
                    </div>
                  </div>
                </div>
                
                {/* Contact Details */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <h3 className="font-semibold mb-2 text-sm">Contact Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Phone className="w-4 h-4 text-gray-400 mt-1" />
                      <div>
                        <div className="text-gray-400 text-xs">Contact Number</div>
                        <div className="flex flex-wrap items-center gap-1">
                          <span className="text-sm">+91 9993X XXXXX</span>
                          <button className="text-blue-500 text-xs">Upgrade Now</button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Mail className="w-4 h-4 text-gray-400 mt-1" />
                      <div>
                        <div className="text-gray-400 text-xs">Email ID</div>
                        <div className="flex flex-wrap items-center gap-1">
                          <span className="text-sm">XXXXXXXXXX@gmail.com</span>
                          <button className="text-blue-500 text-xs">Upgrade Now</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Details */}
              <div className="w-full md:w-3/5">
                {/* Tabs for Profile Sections */}
                <div className="flex border-b mb-3">
                  <button className="px-3 py-2 border-b-2 border-blue-500 text-blue-500 text-sm">About</button>
                  <button className="px-3 py-2 text-gray-500 text-sm">Family</button>
                  <button className="px-3 py-2 text-gray-500 text-sm">Education</button>
                </div>

                {/* About */}
                <div className="mb-4">
                  <h3 className="font-semibold mb-2 text-sm">About Rachana V</h3>
                  <p className="text-gray-600 text-sm">
                    I am looking for a suitable partner for my daughter.
                    She has completed her M.Pharma. She is focused about her career, but makes it a point to give equal attention to family as well.
                    Please get in touch if you would like to know more about her.
                  </p>
                </div>

                {/* Family Details */}
                <div className="mb-4 border-t pt-3">
                  <div className="flex items-center mb-2">
                    <h3 className="text-base font-medium text-red-500">Family Details</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs">Nuclear</span>
                    <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs">Moderate</span>
                  </div>
                  
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Users2 className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">Both parents are retired</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-orange-400" />
                      <span className="text-sm">1 Sister (1 Married)</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 text-green-400 flex items-center justify-center">₹</div>
                      <span className="text-sm">Family Financial Status</span>
                    </div>
                    
                    <div className="ml-6 text-sm">
                      <span className="font-medium">Middle - </span>
                      <span>Annual family income is 10-30 lakhs</span>
                    </div>
                  </div>
                </div>

                {/* Education & Career */}
                <div className="border-t pt-3">
                  <div className="flex items-center mb-2">
                    <h3 className="text-base font-medium text-red-500">Education & Career</h3>
                  </div>
                  
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2">
                      <Book className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">M.Pharma - Master of Pharmacy</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Book className="w-4 h-4 text-blue-400" />
                      <span className="text-sm">Medicine</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <span className="w-4 h-4 text-pink-400 flex items-center justify-center">🩺</span>
                      <span className="text-sm">Medical / Healthcare Professional - own business/self employed</span>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 text-green-400 flex items-center justify-center">₹</div>
                        <span className="font-medium text-sm">Self: </span>
                        <span className="text-sm">Earns INR 1 Lakh to 2 Lakh annually</span>
                      </div>
                      
                      <div className="flex items-center gap-2 ml-6">
                        <span className="font-medium text-sm">Family: </span>
                        <span className="text-sm">Earns INR 10-30 lakhs annually</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="p-3">
            <h3 className="text-lg font-medium text-red-500 mb-3">What She Is Looking For</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Her Preferences */}
              <div>
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <img 
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&fit=crop" 
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-medium text-sm">Her Preferences</h4>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg">
                  <PreferenceItem label="Age" value="34 to 38" />
                  <PreferenceItem label="Height" value="5ft 4 to 6ft" />
                  <PreferenceItem label="Marital Status" value="Never Married" />
                  <PreferenceItem label="Religion / Community" value="Hindu" />
                  <PreferenceItem label="Mother Tongue" value="Hindi, English" />
                  <PreferenceItem 
                    label="Country Living in" 
                    value={
                      <div className="flex items-center">
                        <span className="truncate">Australia, India, Korea, United Arab Emirates...</span>
                        <span className="text-blue-400 ml-1 flex-shrink-0">more</span>
                        <ChevronDown className="w-3 h-3 text-blue-400 flex-shrink-0" />
                      </div>
                    } 
                  />
                  <PreferenceItem label="Qualification" value="Bachelor / Undergraduate, Master, Doctorate" />
                  <PreferenceItem label="Working With" value="Private Company, Government / Public Sector" />
                </div>
              </div>
              
              {/* You Match */}
              <div>
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
                    <img 
                      src="https://images.unsplash.com/photo-1581382575275-97901c2635b7?q=80&w=100&h=100&fit=crop" 
                      alt="You"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-medium text-sm">You Match</h4>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg flex items-center justify-center">
                  <div className="text-center py-10">
                    <div className="text-lg font-semibold text-green-600 mb-2">You match 8/8 of her Preferences</div>
                    <div className="text-sm text-gray-500">Excellent compatibility!</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'matches' && (
          <div className="p-3">
            <h3 className="text-lg font-medium text-red-500 mb-3">New Matches</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {newMatches.map((match, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg flex gap-3">
                  {match.imageUrl ? (
                    <img
                      src={match.imageUrl}
                      alt={match.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                      <Users className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium">{match.name}</h4>
                    <p className="text-sm text-gray-600">
                      {match.age}, {match.height}, {match.religion}, {match.caste}
                    </p>
                    <p className="text-sm text-gray-500">{match.occupation}</p>
                    <p className="text-sm text-gray-500">{match.location}</p>
                    <div className="mt-2">
                      <button className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full">Connect</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <h3 className="text-lg font-medium text-red-500 mt-4 mb-3">Success Stories</h3>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=300&h=200&fit=crop"
                  alt="Success Story"
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
                <h4 className="font-medium">Somansh & Anshul</h4>
                <p className="text-sm text-gray-600">
                  It was a fairytale in the making from the moment we connected with each other. Shaadi was...
                  <button className="text-blue-500">Read full story</button>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="bg-white border-t p-2 flex justify-between">
        <div className="flex">
          <button className="text-gray-500 px-2 text-sm">Back</button>
          <div className="text-gray-500 text-sm">4 more Profiles</div>
        </div>
        <div className="flex gap-2">
          <button className="text-gray-500 text-sm flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Prev</span>
          </button>
          <span className="text-gray-300 hidden sm:inline">|</span>
          <button className="text-blue-500 text-sm flex items-center">
            <span className="hidden sm:inline">Next</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDialog;