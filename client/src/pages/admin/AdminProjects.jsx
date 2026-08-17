import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Edit3, Trash2, Eye, Film, Image as ImageIcon, Search, AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { fetchAdminProjects, toggleProjectStatus, deleteProject } from '../../services/api';

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all'); // all | image | video
  const [deleteTarget, setDeleteTarget] = useState(null); // project object to delete
  const [actionLoading, setActionLoading] = useState(false);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminProjects();
      if (res.success && res.data) {
        setProjects(res.data);
      }
    } catch (err) {
      console.error('Error fetching admin projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleStatusToggle = async (project) => {
    const nextStatus = project.status === 'published' ? 'draft' : 'published';
    try {
      const res = await toggleProjectStatus(project._id, nextStatus);
      if (res.success) {
        setProjects((prev) =>
          prev.map((p) => (p._id === project._id ? { ...p, status: nextStatus } : p))
        );
      }
    } catch (err) {
      alert('Failed to toggle status: ' + err.message);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setActionLoading(true);
    try {
      const res = await deleteProject(deleteTarget._id);
      if (res.success) {
        setProjects((prev) => prev.filter((p) => p._id !== deleteTarget._id));
        setDeleteTarget(null);
      }
    } catch (err) {
      alert('Failed to delete project: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const filtered = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || p.mediaType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading text-white">Manage Portfolio Projects</h1>
          <p className="text-xs text-slate-400 mt-1">
            View, edit, toggle visibility, or delete image and video projects.
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

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-dark-800 p-4 rounded-2xl border border-white/10">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-gold-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-medium">Type:</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-xs text-white focus:outline-none focus:border-gold-500"
          >
            <option value="all">All Types</option>
            <option value="image">Image Projects</option>
            <option value="video">Video Projects</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      {loading ? (
        <div className="py-16 text-center text-xs text-slate-500 animate-pulse">
          Loading portfolio management dataset...
        </div>
      ) : (
        <div className="bg-dark-800 rounded-2xl border border-white/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-dark-900/60 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-4 px-4">Thumbnail</th>
                  <th className="py-4 px-4">Project Title</th>
                  <th className="py-4 px-4">Media Type</th>
                  <th className="py-4 px-4">Category</th>
                  <th className="py-4 px-4">Status</th>
                  <th className="py-4 px-4">Created Date</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((project) => (
                  <tr key={project._id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4">
                      <img
                        src={project.thumbnailUrl || project.mediaUrl}
                        alt=""
                        className="w-12 h-9 rounded-md object-cover bg-black border border-white/10"
                      />
                    </td>
                    <td className="py-3 px-4 font-bold text-white max-w-[220px] truncate">
                      {project.title}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[11px] font-semibold text-slate-200 capitalize">
                        {project.mediaType === 'video' ? (
                          <Film className="w-3 h-3 text-purple-400" />
                        ) : (
                          <ImageIcon className="w-3 h-3 text-sky-400" />
                        )}
                        {project.mediaType}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-gold-500/10 text-gold-400 border border-gold-500/20 text-[10px] font-mono">
                        {project.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleStatusToggle(project)}
                        title="Click to toggle Published/Draft"
                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all flex items-center gap-1 ${
                          project.status === 'published'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${project.status === 'published' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                        {project.status}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <Link
                        to={`/admin/projects/edit/${project._id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white transition-colors"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </Link>
                      <button
                        onClick={() => setDeleteTarget(project)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-dark-800 border border-white/10 rounded-2xl p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-rose-400">
              <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-heading text-white">Confirm Project Deletion</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to delete <span className="text-white font-bold">"{deleteTarget.title}"</span>? This will remove the project from MongoDB and delete its media assets from storage.
            </p>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={actionLoading}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-lg shadow-rose-500/20"
              >
                {actionLoading ? 'Deleting...' : 'Yes, Delete Project'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
