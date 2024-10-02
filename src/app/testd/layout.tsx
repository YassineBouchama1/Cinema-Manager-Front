import React from 'react';
import Image from 'next/image';
import { Home, TrendingUp, Users, Video, List, ChevronDown, Bell } from 'lucide-react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-900 text-white">


            {/* Main content */}
            <main className="flex-1 overflow-y-auto">
               
                <div className="p-4">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;





// import React from 'react';
// import { Home, TrendingUp, Users, Video, List, ChevronDown, Bell } from 'lucide-react';

// const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//     return (
//         <div className="flex h-screen bg-[#161616] text-white">
//             {/* Sidebar */}
//             {/* <aside className="w-64 bg-[#1e1e1e] p-4 flex flex-col">
//                 <div className="flex items-center mb-8">
//                     <div className="w-8 h-8 bg-[#e50914] rounded-full flex items-center justify-center text-white font-bold mr-2">N</div>
//                     <span className="text-xl font-bold">Adze.DESIGN</span>
//                 </div>
//                 <nav className="flex-grow">
//                     <p className="text-gray-400 mb-4">News Feed</p>
//                     <ul className="space-y-2">
//                         <li className="flex items-center bg-[#e50914] rounded-md p-2">
//                             <Home className="mr-3" size={20} />
//                             <span>Browse</span>
//                         </li>
//                         <li className="flex items-center p-2">
//                             <TrendingUp className="mr-3" size={20} />
//                             <span>Trending</span>
//                         </li>
//                         <li className="flex items-center p-2">
//                             <Users className="mr-3" size={20} />
//                             <span>Following</span>
//                         </li>
//                         <li className="flex items-center p-2">
//                             <Video className="mr-3" size={20} />
//                             <span>Your Videos</span>
//                         </li>
//                         <li className="flex items-center p-2">
//                             <List className="mr-3" size={20} />
//                             <span>Playlist</span>
//                         </li>
//                     </ul>
//                 </nav>
//                 <div className="mt-auto">
//                     <p className="text-gray-400 mb-4">Following</p>
//                     <ul className="space-y-2">
//                         {['Ikako.t', 'Nick.B', 'Vika.J', 'Alemanda.B', 'Jessie.J', 'David.H'].map((name, index) => (
//                             <li key={index} className="flex items-center">
//                                 <div className="w-8 h-8 bg-gray-600 rounded-full mr-2"></div>
//                                 <span>{name}</span>
//                             </li>
//                         ))}
//                     </ul>
//                     <button className="flex items-center text-gray-400 mt-4">
//                         <ChevronDown size={20} className="mr-2" />
//                         Load more
//                     </button>
//                 </div>
//             </aside> */}

//             {/* Main content */}
//             <main className="flex-1 overflow-y-auto">
//                 {/* Header */}
//                 <header className="flex justify-between items-center p-4 bg-[#1e1e1e]">
//                     <button className="text-gray-400">
//                         <ChevronDown size={24} />
//                     </button>
//                     <div className="flex items-center bg-[#2b2b2b] rounded-full px-4 py-2 w-1/2">
//                         <input type="text" placeholder="Search everything" className="bg-transparent w-full focus:outline-none" />
//                     </div>
//                     <div className="flex items-center space-x-4">
//                         <Bell size={24} className="text-gray-400" />
//                         <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
//                     </div>
//                 </header>
//                 <div className="p-4">
//                     {children}
                    
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Layout;