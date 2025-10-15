import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, LogOut } from 'lucide-react';

export const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 to-teal-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
            <Leaf className="w-8 h-8" />
            <span>BlueTrace</span>
          </Link>

          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link to="/calculator" className="hover:text-green-100 transition">
                  Calculator
                </Link>
                <Link to="/dashboard" className="hover:text-green-100 transition">
                  Dashboard
                </Link>
                <Link to="/awareness" className="hover:text-green-100 transition">
                  Awareness
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-sm">Hello, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-green-100 transition">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
