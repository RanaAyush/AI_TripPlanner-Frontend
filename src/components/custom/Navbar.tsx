import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Link, useLocation } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import { Menu, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Navbar = () => {
  const [active, setActive] = useState('Home');
  const [user, setUser]:any = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = menuItems.find(item => item.path === currentPath);
    if (currentItem) {
      setActive(currentItem.name);
    }
  }, [location.pathname]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'Budget Planner', path: '/budget-planner' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="relative">
      <div className="flex justify-between items-center px-4 md:px-6 lg:px-8 pt-6 pb-4">
        {/* Logo */}
        <div className="text-2xl md:text-3xl font-bold cursor-pointer">
          <Link to="/" onClick={closeMenu}>Hola Trip</Link>
        </div>

        {/* Hamburger Menu Button for Mobile */}
        <button
          className="lg:hidden p-2 hover:bg-gray-100 rounded-md"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <ul className="flex gap-7 font-semibold items-center">
            {menuItems.map((item) => (
              <li key={item.name} className="relative group">
                <Link
                  to={item.path}
                  onClick={() => setActive(item.name)}
                  className={`block transform transition-transform duration-300 
                    group-hover:scale-110 pb-1 ${
                    active === item.name
                      ? 'border-b-2 border-black'
                      : 'border-b-2 border-transparent'
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 w-0 group-hover:w-full 
                    transition-all duration-500 h-[2px] bg-black ${
                      active === item.name ? 'w-full' : ''
                    }`}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Language and Auth */}
        <div className="hidden lg:flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <img src="/united-states.png" alt="united-states" className="w-6 h-6" />
            <Select>
              <SelectTrigger className="w-24 shadow-none">
                <SelectValue placeholder="English" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="Hindi">Hindi</SelectItem>
                <SelectItem value="French">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {user ? (
            <ProfileDropdown user={user} setUser={setUser} />
          ) : (
            <Link to="/login">
              <Button className="px-6 py-2">Log in</Button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed lg:hidden top-0 left-0 w-full h-full bg-white transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="text-2xl font-bold">
            <Link to="/" onClick={closeMenu}>Hola Trip</Link>
          </div>
          <button
            className="p-2 hover:bg-gray-100 rounded-md"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4">
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  onClick={() => {
                    setActive(item.name);
                    closeMenu();
                  }}
                  className={`block p-2 rounded-md ${
                    active === item.name
                      ? 'bg-gray-100 font-semibold'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-2 p-2">
              <img src="/united-states.png" alt="united-states" className="w-6 h-6" />
              <Select>
                <SelectTrigger className="w-full shadow-none">
                  <SelectValue placeholder="English" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {user ? (
              <div className="p-2">
                <ProfileDropdown user={user} setUser={setUser} />
              </div>
            ) : (
              <Link to="/login" onClick={closeMenu}>
                <Button className="w-full py-2">Log in</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;