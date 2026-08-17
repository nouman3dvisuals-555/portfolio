import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, PlusCircle, LogOut, ExternalLink, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const { isAuthenticated, adminUser, logout, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center text-slate-400 text-sm">
        Verifying administrator session...
      </div>
    );
  }

  if (!isAuthenticated) {
    navigate('/admin/login');
    return null;
  }

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { name: 'Add Project', path: '/admin/projects/new', icon: PlusCircle },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 flex flex-col md:flex-row font-sans">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-dark-800 border-r border-white/10 flex flex-col justify-between flex-shrink-0">
        <div className="p-6 space-y-8">
          {/* Logo & Status */}
          <div className="space-y-2">
            <Link to="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold-500 text-dark-900 flex items-center justify-center font-bold font-heading">
                N3D
              </div>
              <span className="font-heading font-extrabold text-white text-base tracking-wide">
                CMS DASHBOARD
              </span>
            </Link>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Verified</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'bg-gold-500 text-dark-900 font-bold shadow-md shadow-gold-500/20'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Actions */}
        <div className="p-6 border-t border-white/10 space-y-4">
          <div className="space-y-1">
            <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">Authorized Account</p>
            <p className="text-xs font-semibold text-white truncate">{adminUser?.email || 'nouman3dvisuals@gmail.com'}</p>
          </div>

          <div className="pt-2 space-y-2">
            <Link
              to="/"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-gold-400" />
                <span>Public Portfolio</span>
              </span>
              <span className="text-[10px] text-slate-500">&rarr;</span>
            </Link>

            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout Admin</span>
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN ADMIN CONTENT CONTAINER */}
      <main className="flex-grow p-6 md:p-10 overflow-y-auto max-w-7xl">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
