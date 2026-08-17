import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, FolderKanban, Image as ImageIcon, Film, Eye, FileText, CheckCircle2, Clock } from 'lucide-react';
import { fetchAdminProjects } from '../../services/api';

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetchAdminProjects();
        if (res.success && res.data) {
          setProjects(res.data);
        }
      } catch (err) {
        console.error('Error fetching admin dashboard projects:', err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const total = projects.length;
  const published = projects.filter((p) => p.status === 'published').length;
  const drafts = projects.filter((p) => p.status === 'draft').length;
  const images = projects.filter((p) => p.mediaType === 'image').length;
  const videos = projects.filter((p) => p.mediaType === 'video').length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Dashboard Overview</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your 3D product visualization portfolio content & visibility.
          </p>
        </div>

        <Link
          to="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-dark-900 font-bold text-xs shadow-lg shadow-gold-500/20 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add New Project</span>
        </Link>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-dark-800 p-5 rounded-2xl border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Projects</span>
            <FolderKanban className="w-4 h-4 text-gold-400" />
          </div>
          <p className="text-2xl font-extrabold text-white font-heading">{total}</p>
        </div>

        <div className="bg-dark-800 p-5 rounded-2xl border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-emerald-400">
            <span className="text-xs font-semibold">Published</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-emerald-400 font-heading">{published}</p>
        </div>

        <div className="bg-dark-800 p-5 rounded-2xl border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-amber-400">
            <span className="text-xs font-semibold">Drafts</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-amber-400 font-heading">{drafts}</p>
        </div>

        <div className="bg-dark-800 p-5 rounded-2xl border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold font-sans">Image Work</span>
            <ImageIcon className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-2xl font-extrabold text-white font-heading">{images}</p>
        </div>

        <div className="bg-dark-800 p-5 rounded-2xl border border-white/5 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold font-sans">Motion Work</span>
            <Film className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-extrabold text-white font-heading">{videos}</p>
        </div>
      </div>

      {/* RECENT PROJECTS LIST */}
      <div className="bg-dark-800 rounded-2xl border border-white/10 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Recent Portfolio Work</h2>
          <Link to="/admin/projects" className="text-xs font-semibold text-gold-400 hover:underline">
            View All &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-slate-500 animate-pulse">Loading dashboard...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Project</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {projects.slice(0, 5).map((project) => (
                  <tr key={project._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={project.thumbnailUrl || project.mediaUrl}
                          alt=""
                          className="w-10 h-8 rounded-md object-cover bg-black"
                        />
                        <span className="font-semibold text-white truncate max-w-[200px]">
                          {project.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 capitalize text-slate-300">
                      {project.mediaType}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-slate-300 font-mono">
                        {project.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          project.status === 'published'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Link
                        to={`/admin/projects/edit/${project._id}`}
                        className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
