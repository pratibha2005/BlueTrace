import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Lottie from "lottie-react";
import Homesvg from "../assets/animations/Homesvg.json";
import {
  Car,
  TrendingDown,
  Award,
  Globe,
  Sparkles,
  Zap,
  Leaf,
} from "lucide-react";

// --- Reusable Stat Card ---
const StatCard = ({ number, label }) => (
  <div className="text-center p-4">
    <div className="text-5xl font-extrabold text-green-600 mb-2">{number}</div>
    <div className="text-gray-600 text-lg font-medium">{label}</div>
  </div>
);

// --- Modern Feature Card ---
const FeatureCard = ({
  icon,
  title,
  description,
  gradient,
  index,
  accentColor,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className="relative group perspective-1000"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(50px)",
        transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${
          index * 0.15
        }s`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Main card */}
      <div className="relative h-full backdrop-blur-xl bg-white/70 rounded-3xl p-8 border border-white/20 shadow-2xl overflow-hidden transform transition-all duration-700 group-hover:scale-105">
        {/* Icon */}
        <div className="relative mb-6 z-10">
          <div className={`relative w-20 h-20 ${gradient} rounded-2xl flex items-center justify-center`}>
            {React.cloneElement(icon, {
              className: "w-10 h-10 text-white drop-shadow-lg",
              strokeWidth: 2.5,
            })}
          </div>
        </div>

        {/* Title + Description */}
        <h3 className="text-2xl font-bold mb-3 text-gray-800">{title}</h3>
        <p className="text-gray-600 leading-relaxed mb-6 text-sm">
          {description}
        </p>

        {/* Button */}
        <button
          className={`px-5 py-2.5 ${gradient} text-white rounded-xl font-semibold text-sm shadow-md hover:scale-105 hover:shadow-xl transition-all`}
        >
          Explore
        </button>
      </div>
    </div>
  );
};

// --- Main Home Component ---
export const Home = () => {
  const { user } = useAuth();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <Car />,
      title: "Carbon Calculator",
      description:
        "Calculate CO₂ emissions based on vehicle type, fuel consumption, and distance traveled.",
      gradient: "bg-gradient-to-br from-green-500 via-emerald-500 to-teal-600",
      accentColor: "#10b981",
    },
    {
      icon: <TrendingDown />,
      title: "AI Suggestions",
      description:
        "Get personalized tips to reduce emissions and improve fuel efficiency based on your data.",
      gradient: "bg-gradient-to-br from-blue-500 via-cyan-500 to-indigo-600",
      accentColor: "#3b82f6",
    },
    {
      icon: <Award />,
      title: "Green Badges",
      description:
        "Earn digital certificates for achieving emission reduction milestones and eco-friendly habits.",
      gradient: "bg-gradient-to-br from-purple-500 via-pink-500 to-rose-600",
      accentColor: "#a855f7",
    },
    {
      icon: <Globe />,
      title: "Multilingual Content",
      description:
        "Access educational content about sustainable transport in multiple languages worldwide.",
      gradient: "bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-600",
      accentColor: "#f97316",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* --- Hero Section --- */}
        <div className="grid md:grid-cols-2 gap-12 items-center text-center md:text-left mb-20">
          <div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
              BlueTrace - <span className="text-green-600">Land Edition</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-xl mb-8">
              Track, analyze, and reduce your land vehicle carbon emissions.
              Join the movement towards sustainable transportation and earn Green
              Badges for your eco-friendly efforts.
            </p>

            <div className="mt-8 flex justify-center md:justify-start space-x-4">
              {user ? (
                <>
                  <Link
                    to="/calculator"
                    className="bg-green-600 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-green-700 transition transform hover:scale-105"
                  >
                    Calculate Emissions
                  </Link>
                  <Link
                    to="/dashboard"
                    className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-green-50 transition transform hover:scale-105"
                  >
                    View Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className="bg-green-600 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-green-700 transition transform hover:scale-105"
                  >
                    Get Started Free!
                  </Link>
                  <Link
                    to="/login"
                    className="bg-white text-green-600 border-2 border-green-600 px-8 py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-green-50 transition transform hover:scale-105"
                  >
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="hidden md:block">
            <Lottie
              animationData={Homesvg}
              loop
              className="w-full h-auto max-w-lg mx-auto transform scale-125 translate-x-6 md:translate-x-24"
            />
          </div>
        </div>

        {/* --- Modern Feature Cards Section --- */}
        {/* <div className="relative z-10 py-20 px-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-3xl mb-20">
          <div className="max-w-7xl mx-auto mb-20 text-center">
            <div className="inline-block mb-6 px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-full border border-green-500/30 shadow-lg">
              <span className="text-green-300 font-bold text-sm flex items-center gap-2 justify-center">
                <Sparkles className="w-4 h-4" /> Next-Gen Features{" "}
                <Sparkles className="w-4 h-4" />
              </span>
            </div>

            <h2 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400">
                Transform Your
              </span>
              <br />
              <span className="text-white drop-shadow-2xl">
                Carbon Journey
              </span>
            </h2>
          </div>

          <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div> */}
        {/* --- Modern Feature Cards Section --- */}
        <div className="relative z-10 py-20 px-4 mb-20 overflow-hidden">
          {/* Animated Background with Gradient Mesh */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-700 to-green-800 rounded-3xl">
            {/* Animated Gradient Orbs */}
            <div
              className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/30 rounded-full blur-3xl animate-pulse"
              style={{
                transform: `translateY(${scrollY * 0.1}px)`,
                transition: "transform 0.1s ease-out",
              }}
            />
            <div
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse"
              style={{
                transform: `translateY(${-scrollY * 0.15}px)`,
                transition: "transform 0.1s ease-out",
                animationDelay: "1s",
              }}
            />
            <div
              className="absolute top-1/2 left-1/2 w-64 h-64 bg-emerald-500/25 rounded-full blur-3xl animate-pulse"
              style={{
                transform: `translate(-50%, -50%) scale(${1 + Math.sin(scrollY * 0.01) * 0.1})`,
                transition: "transform 0.3s ease-out",
                animationDelay: "2s",
              }}
            />
            
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `linear-gradient(rgba(37, 125, 96, 0.9) 1px, transparent 1px),
                                   linear-gradient(90deg, rgba(141, 206, 185, 0.87) 1px, transparent 1px)`,
                  backgroundSize: "50px 50px",
                  transform: `translateY(${scrollY * 0.05}px)`,
                }}
              />
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto mb-20 text-center">
            {/* Floating Badge */}
            <div
              className="inline-block mb-8 px-8 py-4 bg-gradient-to-r from-green-500/30 via-emerald-500/30 to-teal-500/30 backdrop-blur-2xl rounded-2xl border border-green-400/40 shadow-2xl hover:scale-105 transition-transform duration-500"
              style={{
                transform: `translateY(${Math.sin(scrollY * 0.01) * 10}px)`,
              }}
            >
              <span className="text-green-300 font-bold text-base flex items-center gap-3 justify-center">
                <Zap className="w-5 h-5 animate-pulse text-green-400" />
                <span className="relative">
                  Next-Gen Features
                  <span className="absolute -top-1 -right-8 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </span>
                <Leaf className="w-5 h-5 animate-pulse text-emerald-400" />
              </span>
            </div>

            {/* Main Heading with Animated Gradient */}
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
              <span
                className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300 animate-pulse"
                style={{
                  transform: `scale(${1 + Math.sin(scrollY * 0.005) * 0.02})`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                Transform Your
              </span>
              <br />
              <span
                className="inline-block text-white drop-shadow-2xl"
                style={{
                  textShadow: "0 0 40px rgba(16, 185, 129, 0.5)",
                  transform: `scale(${1 + Math.cos(scrollY * 0.005) * 0.02})`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                Carbon Journey
              </span>
            </h2>

            {/* Subtitle with Glow Effect */}
            <p className="text-green-200/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Experience cutting-edge technology that makes sustainability{" "}
              <span className="text-green-300 font-semibold">effortless</span> and{" "}
              <span className="text-emerald-300 font-semibold">rewarding</span>
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>

          {/* Bottom Glow Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50"></div>
        </div>

        {/* --- Stats Section --- */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-20 border-t-4 border-green-500">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Why BlueTrace Matters
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <StatCard number="45%" label="CO₂ reduction with public transport" />
            <StatCard number="70%" label="Lower emissions with electric vehicles" />
            <StatCard number="30%" label="Fuel efficiency improvement with eco-driving" />
          </div>
        </div>

        {/* --- CTA Section --- */}
        <div className="text-center bg-green-700 text-white rounded-3xl p-16 shadow-2xl">
          <h2 className="text-4xl font-extrabold mb-4">
            Ready to Make a Difference? 🌍
          </h2>
          <p className="text-lg mb-8 max-w-3xl mx-auto opacity-90">
            Join thousands of users tracking their carbon footprint and working
            towards a cleaner, greener future for transportation. Every
            kilometer counts.
          </p>
          {!user && (
            <Link
              to="/signup"
              className="inline-block bg-white text-green-700 px-10 py-4 rounded-full text-xl font-bold hover:bg-green-100 transition transform hover:scale-105 shadow-xl"
            >
              Start Your Journey Today!
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};







