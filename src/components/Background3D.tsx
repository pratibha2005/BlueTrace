export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10 opacity-30 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-3xl floating"></div>
      <div className="absolute top-[20%] right-[-15%] w-[500px] h-[500px] bg-green-500/20 rounded-full blur-3xl floating" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-[-20%] left-[30%] w-[700px] h-[700px] bg-blue-600/20 rounded-full blur-3xl floating" style={{animationDelay: '4s'}}></div>
      
      {/* Particle effect using CSS */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
