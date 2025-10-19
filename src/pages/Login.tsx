// import { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { Leaf } from 'lucide-react';

// export const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//       await login(email, password);
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err instanceof Error ? err.message : 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex items-center justify-center px-4">
//       <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
//         <div className="text-center mb-8">
//           <div className="flex justify-center mb-4">
//             <div className="bg-green-600 p-3 rounded-full">
//               <Leaf className="w-10 h-10 text-white" />
//             </div>
//           </div>
//           <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
//           <p className="text-gray-600 mt-2">Log in to continue your eco-journey</p>
//         </div>

//         {error && (
//           <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               placeholder="your@email.com"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
//               placeholder="••••••••"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
//           >
//             {loading ? 'Logging in...' : 'Log In'}
//           </button>
//         </form>

//         <p className="mt-6 text-center text-gray-600">
//           Don't have an account?{' '}
//           <Link to="/signup" className="text-green-600 font-semibold hover:text-green-700">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };










import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, LogIn } from 'lucide-react'; // New icons for input fields

// Custom Car-with-Smoke SVG Component 🚗💨 (Re-used)
const CarAnimation = () => (
    <div className="flex justify-center items-center w-full p-4">
        <div className="relative w-64 h-32">
            {/* The Car Body (Simple SVG) */}
            <svg
                className="absolute bottom-0 left-0 transition-transform duration-1000 ease-in-out"
                style={{ transform: 'translateX(0)', animation: 'moveCar 1s infinite alternate' }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 40"
                width="250"
                height="60"
            >
                <style>
                  
                    {`
                        /* Keyframes from previous version */
                        @keyframes moveCar {
                            0% { transform: translateX(0px); }
                            100% { transform: translateX(100px); }
                        }
                    `}
                    {/* Unique Smoke keyframes (can be adjusted) */}
                    {`
                        @keyframes smoke1 {
                            0% { r: 5; opacity: 0.8; transform: translateX(0) translateY(0); }
                            100% { r: 15; opacity: 0; transform: translateX(-30px) translateY(-5px); }
                        }
                        @keyframes smoke2 {
                            0% { r: 3; opacity: 0.6; transform: translateX(0) translateY(0); }
                            100% { r: 10; opacity: 0; transform: translateX(-30px) translateY(-3px); }
                        }
                    `}
                </style>
                {/* Car body - Changed to a lighter blue/teal for contrast */}
                <rect x="0" y="15" width="100" height="20" rx="5" fill="#0e9745ff" /> {/* Teal body */}
                <rect x="15" y="5" width="50" height="10" rx="3" fill="#1ab33bff" /> {/* Cabin */}
                <circle cx="20" cy="35" r="5" fill="#337f07ff" /> {/* Front wheel */}
                <circle cx="80" cy="35" r="5" fill="#337f07ff" /> {/* Back wheel */}
                
                {/* Exhaust Pipe */}
                <rect x="-5" y="30" width="5" height="5" fill="#4b5563" /> 

                {/* Smoke Emitters (using CSS keyframes) */}
                <circle cx="-5" cy="32" r="0" fill="#f0fdfa" opacity="0">
                    <animate attributeName="r" values="5;15" dur="3s" repeatCount="indefinite" begin="0s" />
                    <animate attributeName="opacity" values="0.8;0" dur="3s" repeatCount="indefinite" begin="0s" />
                    <animate attributeName="cx" values="-5;-35" dur="3s" repeatCount="indefinite" begin="0s" />
                    <animate attributeName="cy" values="32;27" dur="3s" repeatCount="indefinite" begin="0s" />
                </circle>
                <circle cx="-5" cy="32" r="0" fill="#f0fdfa" opacity="0">
                    <animate attributeName="r" values="3;10" dur="3s" repeatCount="indefinite" begin="1s" />
                    <animate attributeName="opacity" values="0.6;0" dur="3s" repeatCount="indefinite" begin="1s" />
                    <animate attributeName="cx" values="-5;-30" dur="3s" repeatCount="indefinite" begin="1s" />
                    <animate attributeName="cy" values="32;29" dur="3s" repeatCount="indefinite" begin="1s" />
                </circle>
            </svg>
        </div>
    </div>
);


export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Unique Background: Gradient with soft "blobs" for visual interest
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4" 
        style={{ 
            // background: 'linear-gradient(135deg, #ffffffff 0%, #094301ff 100%)' 
        }}>
        {/* Background Decorative Blur/Blobs - For extra visual depth */}
        <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] bg-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

        {/* Global Keyframes for Blob Animation (Add these to your global CSS or here if not available globally) 
            <style>
                {`
                    @keyframes blob {
                        0% { transform: translate(0px, 0px) scale(1); }
                        33% { transform: translate(30px, -50px) scale(1.1); }
                        66% { transform: translate(-20px, 20px) scale(0.9); }
                        100% { transform: translate(0px, 0px) scale(1); }
                    }
                    .animation-delay-2000 {
                        animation-delay: 2s;
                    }
                `}
            </style>
        */}

        {/* Main Split-Screen Container */}
        <div className="relative z-10 w-full max-w-4xl min-h-[500px] grid md:grid-cols-2 shadow-2xl rounded-3xl overflow-hidden">
            
            {/* LEFT SIDE: The Glassmorphism Form Container */}
            <div className="p-8 sm:p-12 backdrop-filter backdrop-blur-lg bg-white/10 border border-white/20">
                <div className="text-center mb-6">
                    <h2 className="text-4xl font-extrabold text-black">Log In</h2>
                    <p className="text-black-300 mt-2">Welcome to a cleaner future</p>
                </div>

                {error && (
                    <div className="bg-red-400/20 border border-red-300 text-red-100 p-3 rounded-lg mb-6 shadow-md" role="alert">
                        <p className="font-bold">Login Failed</p>
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email Field */}
                    <div className="relative">
                        <Mail className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5 text-teal-300/80" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-12 pr-5 py-3 bg-white/20 border border-gray/100 text-black placeholder-gray/900 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-150"
                            placeholder="Email"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="relative">
                        <Lock className="absolute top-1/2 left-4 transform -translate-y-1/2 w-5 h-5 text-teal-300/80" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-12 pr-5 py-3 bg-white/20 border border-gray/100 text-black placeholder-gray/100 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-150"
                            placeholder="Password"
                            required
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        // Gradient Button for a stylish look
                        className="w-full flex items-center justify-center bg-gradient-to-r from-teal-500 to-green-500 text-white py-3.5 rounded-xl font-extrabold text-lg shadow-lg shadow-teal-500/30 hover:from-teal-600 hover:to-green-600 transition duration-300 disabled:opacity-50 disabled:shadow-none focus:outline-none focus:ring-4 focus:ring-teal-500/50"
                    >
                        {loading ? (
                            <span className="flex items-center">
                                <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Logging in...
                            </span>
                        ) : (
                            <>
                                <LogIn className="w-5 h-5 mr-2" /> Log In
                            </>
                        )}
                    </button>
                </form>

                <p className="mt-8 text-center text-white/80 text-sm">
                    New user?{' '}
                    <Link to="/signup" className="text-green-300 font-bold hover:text-green-100 transition">
                        Sign Up
                    </Link>
                </p>
            </div>

            {/* RIGHT SIDE: The Design/Branding Panel with Animation */}
            <div className="hidden md:flex flex-col items-center justify-center bg-teal-600/20 p-12 relative overflow-hidden">
                {/* Visual Title */}
                <h3 className="text-5xl font-black text-gray-700 z-10 mb-4 tracking-tighter">
                    Eco
                    <span className="text-green-700">Drive</span>
                </h3>
                <p className="text-dark/80 z-10 text-center max-w-xs">
                    The Car you see represents the old way of life. Log in to choose your sustainable path.
                </p>
                
                {/* Car Animation placed prominently */}
                <CarAnimation />

                {/* Decorative Pattern or Shapes */}
                <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-repeat" 
                     style={{ backgroundImage: 'radial-gradient(#14b8a6 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                </div>
            </div>

        </div>
    </div>
  );
};