import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Upload, Save, Film, Image as ImageIcon, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { createProject, updateProject, fetchAdminProjects, uploadMediaFile } from '../../services/api';

const AdminProjectForm = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Perfume',
    mediaType: 'image',
    mediaUrl: '',
    thumbnailUrl: '',
    duration: '',
    status: 'published',
    featured: false
  });

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isEdit) {
      const loadProjectDetails = async () => {
        try {
          const res = await fetchAdminProjects();
          if (res.success && res.data) {
            const found = res.data.find((p) => p._id === id);
            if (found) {
              setFormData({
                title: found.title || '',
                description: found.description || '',
                category: found.category || 'Perfume',
                mediaType: found.mediaType || 'image',
                mediaUrl: found.mediaUrl || '',
                thumbnailUrl: found.thumbnailUrl || '',
                duration: found.duration || '',
                status: found.status || 'published',
                featured: Boolean(found.featured)
              });
            }
          }
        } catch (err) {
          setErrorMsg('Failed to load project details for editing');
        }
      };
      loadProjectDetails();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileUpload = async (e, field = 'mediaUrl') => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setErrorMsg('');

    try {
      const res = await uploadMediaFile(file);
      if (res.success && res.data?.url) {
        setFormData((prev) => ({
          ...prev,
          [field]: res.data.url,
          // If video project and no thumbnail set yet, use mediaUrl or preview
          ...(field === 'mediaUrl' && prev.mediaType === 'image' ? { thumbnailUrl: res.data.url } : {})
        }));
      }
    } catch (err) {
      setErrorMsg('File upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.mediaUrl) {
      setErrorMsg('Please upload a media file or provide a valid media URL.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    const payload = {
      ...formData,
      thumbnailUrl: formData.thumbnailUrl || formData.mediaUrl
    };

    try {
      if (isEdit) {
        await updateProject(id, payload);
      } else {
        await createProject(payload);
      }
      navigate('/admin/projects');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || err.message || 'Failed to save project.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-4">
          <Link
            to="/admin/projects"
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold font-heading text-white">
              {isEdit ? 'Edit Portfolio Project' : 'Add New Portfolio Project'}
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Upload media and set portfolio display metadata.
            </p>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Project Type Switcher */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
          <label className="text-xs font-bold text-slate-300">Project Type *</label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData((p) => ({ ...p, mediaType: 'image' }))}
              className={`p-4 rounded-xl border flex items-center justify-center gap-3 transition-all ${
                formData.mediaType === 'image'
                  ? 'bg-gold-500/20 border-gold-500 text-gold-400 font-bold'
                  : 'bg-dark-800 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-5 h-5" />
              <span className="text-xs">Image Project</span>
            </button>

            <button
              type="button"
              onClick={() => setFormData((p) => ({ ...p, mediaType: 'video' }))}
              className={`p-4 rounded-xl border flex items-center justify-center gap-3 transition-all ${
                formData.mediaType === 'video'
                  ? 'bg-gold-500/20 border-gold-500 text-gold-400 font-bold'
                  : 'bg-dark-800 border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <Film className="w-5 h-5" />
              <span className="text-xs">Video / Motion Project</span>
            </button>
          </div>
        </div>

        {/* Basic Metadata */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Project Title *</label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Aura Elixir — Luxury Parfum 3D Visual"
              className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-500"
              >
                <option value="Perfume">Perfume</option>
                <option value="Skincare">Skincare</option>
                <option value="Beverage">Beverage</option>
                <option value="Tech">Tech</option>
                <option value="Watch">Watch</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Visibility Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-500"
              >
                <option value="published">Published (Visible on Public Website)</option>
                <option value="draft">Draft (Visible only in Admin CMS)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-300">Project Description *</label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the 3D texturing, refraction physics, lighting techniques, or color grading..."
              className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-500 resize-none"
            />
          </div>

          {formData.mediaType === 'video' && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Video Duration (Optional)</label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 0:30"
                className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-500"
              />
            </div>
          )}
        </div>

        {/* Media Asset Upload */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <label className="text-xs font-bold text-slate-300">
            Media File (Upload to External Object Storage) *
          </label>

          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <label className="flex-grow flex items-center justify-center gap-2 p-4 rounded-xl border border-dashed border-white/20 hover:border-gold-500 bg-dark-800 cursor-pointer transition-colors text-xs text-slate-300">
                <Upload className="w-4 h-4 text-gold-400" />
                <span>{uploading ? 'Uploading to Storage...' : 'Click to Upload Media File'}</span>
                <input
                  type="file"
                  accept={formData.mediaType === 'video' ? 'video/*' : 'image/*'}
                  onChange={(e) => handleFileUpload(e, 'mediaUrl')}
                  className="hidden"
                />
              </label>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">Or Direct Asset URL:</label>
              <input
                type="text"
                name="mediaUrl"
                value={formData.mediaUrl}
                onChange={handleChange}
                placeholder="https://your-object-storage.com/media/file.mp4"
                className="w-full px-4 py-2.5 rounded-xl bg-dark-800 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          {/* Live Preview Box */}
          {formData.mediaUrl && (
            <div className="pt-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Live Media Preview:</label>
              <div className="w-full max-h-64 rounded-xl overflow-hidden bg-black border border-white/10 flex items-center justify-center">
                {formData.mediaType === 'video' ? (
                  <video src={formData.mediaUrl} controls className="max-h-64 object-contain" />
                ) : (
                  <img src={formData.mediaUrl} alt="Preview" className="max-h-64 object-contain" />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Video Thumbnail Image Section (For Video Projects) */}
        {formData.mediaType === 'video' && (
          <div className="glass-panel p-6 rounded-2xl border border-gold-500/20 bg-gold-500/5 space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gold-400 flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-gold-400" />
                <span>Video Thumbnail Image (Custom Poster / Cover Image)</span>
              </label>
              <p className="text-[11px] text-slate-400">
                Upload a custom cover image or enter an image URL. If left empty, the <strong className="text-slate-200">video's first frame</strong> will automatically be set as the thumbnail.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <label className="flex-grow flex items-center justify-center gap-2 p-3.5 rounded-xl border border-dashed border-white/20 hover:border-gold-500 bg-dark-800 cursor-pointer transition-colors text-xs text-slate-300">
                  <Upload className="w-4 h-4 text-gold-400" />
                  <span>{uploading ? 'Uploading Thumbnail...' : 'Upload Custom Thumbnail Image'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'thumbnailUrl')}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] text-slate-400">Or Direct Thumbnail Image URL:</label>
                <input
                  type="text"
                  name="thumbnailUrl"
                  value={formData.thumbnailUrl}
                  onChange={handleChange}
                  placeholder="https://images.unsplash.com/photo-custom-cover.jpg"
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-800 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>

            {/* Thumbnail Preview */}
            <div className="pt-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Active Card Thumbnail Preview:
              </label>
              <div className="w-48 h-32 rounded-xl overflow-hidden bg-black border border-white/10 flex items-center justify-center relative">
                {formData.thumbnailUrl && !formData.thumbnailUrl.endsWith('.mp4') && !formData.thumbnailUrl.endsWith('.webm') ? (
                  <img src={formData.thumbnailUrl} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                ) : formData.mediaUrl ? (
                  <div className="relative w-full h-full">
                    <video src={`${formData.mediaUrl}#t=0.001`} preload="metadata" muted className="w-full h-full object-cover" />
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] text-gold-400 font-semibold">First Frame</span>
                  </div>
                ) : (
                  <span className="text-[11px] text-slate-500">No preview available</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <Link
            to="/admin/projects"
            className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading || uploading}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-dark-900 font-bold text-xs shadow-lg shadow-gold-500/20 transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving Project...' : isEdit ? 'Update Project' : 'Save Project'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProjectForm;
