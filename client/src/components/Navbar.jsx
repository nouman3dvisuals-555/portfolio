import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Work', path: '/work' },
    { name: 'Services', path: '/#services' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && path !== '/#services' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050508]/90 backdrop-blur-md border-b border-purple-500/10 py-3 shadow-2xl shadow-purple-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden p-[1px] bg-gradient-to-br from-purple-400 to-purple-700 shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <img
              src="/assets/logo.png"
              alt="N3D Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-white tracking-wider text-base sm:text-lg leading-tight group-hover:text-purple-300 transition-colors">
              NOUMAN
            </span>
            <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest -mt-0.5">
              3D ARTIST
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#0b0a10]/80 px-4 py-2 rounded-full border border-purple-500/20 backdrop-blur-md">
          {navLinks.map((link) => {
            const isAnchor = link.path.startsWith('/#');
            if (isAnchor) {
              return (
                <a
                  key={link.name}
                  href={link.path}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide text-purple-200 hover:text-white hover:bg-purple-500/10 transition-all"
                >
                  {link.name}
                </a>
              );
            }
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  isActive(link.path)
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30 font-bold'
                    : 'text-purple-200 hover:text-white hover:bg-purple-500/10'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02]"
          >
            <span>Let's Work Together</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl bg-dark-800 border border-purple-500/20 text-purple-200 hover:text-white"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050508]/95 backdrop-blur-xl border-b border-purple-500/20 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-4">
          {navLinks.map((link) => {
            const isAnchor = link.path.startsWith('/#');
            if (isAnchor) {
              return (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-semibold text-purple-200 hover:bg-purple-500/10"
                >
                  {link.name}
                </a>
              );
            }
            return (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'bg-purple-600 text-white font-bold'
                    : 'text-purple-200 hover:bg-purple-500/10'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-purple-600 text-white font-bold text-sm shadow-lg shadow-purple-500/25"
            >
              <span>Let's Work Together</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
