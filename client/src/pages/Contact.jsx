import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, Instagram, Linkedin, Youtube, ArrowUpRight } from 'lucide-react';
import { sendContactMessage } from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Perfume Visualization',
    projectDetails: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success' | 'error', text: '' }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await sendContactMessage(formData);
      if (res.success) {
        setStatus({
          type: 'success',
          text: 'Message sent successfully! Nouman will review your inquiry and get back to you shortly.'
        });
        setFormData({
          name: '',
          email: '',
          projectType: 'Perfume Visualization',
          projectDetails: '',
          message: ''
        });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        text: err.message || err.text || (typeof err === 'string' ? err : 'Failed to send message via EmailJS. Please check EmailJS service status or use WhatsApp.')
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* PAGE HEADER */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-gold-500/30 text-gold-400 text-xs font-semibold uppercase tracking-widest">
          <Mail className="w-3.5 h-3.5" />
          <span>Get In Touch</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold font-heading text-white">
          Start a 3D <span className="gold-gradient-text">Project Inquiry</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Have a product visual or motion animation project in mind? Submit your inquiry or connect directly via WhatsApp.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Contact Form */}
        <div className="md:col-span-7 glass-panel p-8 rounded-3xl border border-white/10 space-y-6">
          <h2 className="text-2xl font-bold text-white font-heading">Project Inquiry Form</h2>

          {status && (
            <div
              className={`p-4 rounded-xl text-xs flex items-center gap-3 ${
                status.type === 'success'
                  ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                  : 'bg-rose-500/10 border border-rose-500/30 text-rose-400'
              }`}
            >
              {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
              <span>{status.text}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alexander Vance"
                  className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alexander@brand.com"
                  className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-500 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Project Type</label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-500 transition-colors"
              >
                <option value="Perfume Visualization">Perfume Visualization</option>
                <option value="Skincare Visualization">Skincare Visualization</option>
                <option value="Beverage Visualization">Beverage Visualization</option>
                <option value="Tech Product Visualization">Tech Product Visualization</option>
                <option value="Watch Visualization">Watch Visualization</option>
                <option value="3D Motion & Commercial Animation">3D Motion & Commercial Animation</option>
                <option value="Recruiter / Career Inquiry">Recruiter / Career Inquiry</option>
                <option value="Other Product Visualization">Other Product Visualization</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Project Specs & Timeline</label>
              <input
                type="text"
                name="projectDetails"
                value={formData.projectDetails}
                onChange={handleChange}
                placeholder="e.g. 3 high-res stills + 15s 4K commercial animation, launch in 2 weeks"
                className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-500 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-300">Message *</label>
              <textarea
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell Nouman about your product vision, reference styles, or deliverables needed..."
                className="w-full px-4 py-3 rounded-xl bg-dark-800 border border-white/10 text-white text-xs focus:outline-none focus:border-gold-500 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 hover:from-gold-400 hover:to-amber-500 text-dark-900 font-bold text-sm shadow-xl shadow-gold-500/20 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <span>Sending Message...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Direct Channels */}
        <div className="md:col-span-5 space-y-6">
          {/* WhatsApp Prominent Card */}
          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Direct WhatsApp</h3>
                <p className="text-xs text-slate-400">Fastest response for urgent client briefs</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Connect directly with Nouman to discuss your 3D product visualization, reference moodboards, or launch deadlines.
            </p>

            <a
              href="https://wa.me/923000000000?text=Hello%20Nouman,%20I'd%20like%20to%20discuss%20a%203D%20product%20visualization%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-900 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Chat on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Email Direct Card */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-400 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Email Address</h3>
                <p className="text-xs text-slate-400">For formal briefs & agency inquiries</p>
              </div>
            </div>

            <a
              href="mailto:nouman3dvisuals@gmail.com"
              className="text-sm font-semibold text-gold-400 hover:underline block"
            >
              nouman3dvisuals@gmail.com
            </a>
          </div>

          {/* Social Profiles — Instagram, LinkedIn, YouTube (NO Fiverr) */}
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Official Social Profiles</h3>
            <div className="space-y-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-dark-800 border border-white/5 hover:border-gold-500/30 text-xs text-slate-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Instagram className="w-4 h-4 text-gold-400" />
                  <span>Instagram (@nouman3dvisuals)</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-dark-800 border border-white/5 hover:border-gold-500/30 text-xs text-slate-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-gold-400" />
                  <span>LinkedIn Profile</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-dark-800 border border-white/5 hover:border-gold-500/30 text-xs text-slate-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Youtube className="w-4 h-4 text-gold-400" />
                  <span>YouTube Channel</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
