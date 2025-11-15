import { motion } from "framer-motion";

export const ProfilePanelNew = () => {
  const destinations = [
    {
      name: 'Mt. Gambuta',
      date: '14 August 2025',
      participants: [
        'https://i.pravatar.cc/150?img=1',
        'https://i.pravatar.cc/150?img=2',
        'https://i.pravatar.cc/150?img=3',
        'https://i.pravatar.cc/150?img=4'
      ],
      more: 4,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    },
    {
      name: 'Mt. Sindoro',
      date: '21 August 2025',
      participants: [
        'https://i.pravatar.cc/150?img=5',
        'https://i.pravatar.cc/150?img=6',
        'https://i.pravatar.cc/150?img=7'
      ],
      more: 8,
      image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=400&h=300&fit=crop'
    }
  ];

  return (
    <motion.div 
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="w-[280px] h-screen bg-gradient-to-b from-sky-300 via-cyan-300 to-lime-300 p-6 flex flex-col gap-6 overflow-y-auto"
    >
      {/* Profile Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-center"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-slate-900 font-bold text-xl">My Profile 👤</h2>
        </div>

        {/* Avatar */}
        <div className="relative inline-block mb-4">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 p-1 shadow-2xl">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
              <img 
                src="https://i.pravatar.cc/150?img=68" 
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
        </div>

        {/* Name */}
        <h3 className="text-slate-900 font-bold text-xl mb-1">Raffialdo Bayu</h3>
        <p className="text-slate-700 text-sm">Traveling Lover</p>
      </motion.div>

      {/* Destination Trip Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-slate-900 font-bold text-lg mb-4 flex items-center gap-2">
          Destination Trip ✈️
        </h3>

        <div className="space-y-4">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="flex gap-3">
                {/* Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
                  <img 
                    src={dest.image} 
                    alt={dest.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm mb-1 truncate">
                    {dest.name}
                  </h4>
                  <p className="text-slate-600 text-xs mb-2">{dest.date}</p>
                  
                  {/* Participants */}
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {dest.participants.map((avatar) => (
                        <div 
                          key={avatar}
                          className="w-6 h-6 rounded-full border-2 border-white overflow-hidden shadow-sm"
                        >
                          <img src={avatar} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <span className="text-slate-600 text-xs font-medium">+{dest.more}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="mt-auto">
        <div className="h-32 relative opacity-40">
          <div className="absolute bottom-0 left-0 w-full h-full">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path
                d="M 0,100 Q 50,80 100,100 T 200,100 L 200,200 L 0,200 Z"
                fill="rgba(255,255,255,0.3)"
              />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
