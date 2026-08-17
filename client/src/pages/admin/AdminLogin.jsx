import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { ShieldCheck, Lock, AlertTriangle, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLogin = () => {
  const { loginWithGoogle, devLoginBypass, authError } = useAuth();
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setErrorMsg('');
    try {
      await loginWithGoogle({ credential: credentialResponse.credential });
      navigate('/admin/dashboard');
    } catch (err) {
      setErrorMsg(err.message || 'Access Denied: Only nouman3dvisuals@gmail.com is authorized.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setErrorMsg('Google authentication was cancelled or failed.');
  };

  const handleDevBypass = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
      await devLoginBypass();
      navigate('/admin/dashboard');
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="w-full max-w-md relative z-10 glass-panel p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-400 to-amber-700 p-[1px] mx-auto shadow-lg shadow-gold-500/20">
            <div className="w-full h-full bg-dark-900 rounded-[15px] flex items-center justify-center">
              <Lock className="w-6 h-6 text-gold-400" />
            </div>
          </div>
          <h1 className="text-2xl font-extrabold font-heading text-white">Private Admin CMS</h1>
          <p className="text-xs text-slate-400">
            Authorized Content Management Interface for Nouman
          </p>
        </div>

        {/* Security Rule Banner */}
        <div className="p-4 rounded-xl bg-dark-800 border border-white/5 space-y-1 text-left">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>Authorized Email Enforcement</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Access is strictly restricted to <span className="text-gold-400 font-mono font-semibold">nouman3dvisuals@gmail.com</span>. All backend administrative endpoints independently verify Google credentials.
          </p>
        </div>

        {/* Error Notification */}
        {(errorMsg || authError) && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-3 text-left">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{errorMsg || authError}</span>
          </div>
        )}

        {/* Google Authentication Action */}
        <div className="space-y-4 pt-2">
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="filled_black"
              shape="pill"
              size="large"
              width="320"
              text="continue_with"
            />
          </div>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 text-[10px] text-slate-500 uppercase tracking-widest">Or Dev Mode Access</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          {/* Dev Mode Bypass Button */}
          <button
            onClick={handleDevBypass}
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-white/5 hover:bg-gold-500/10 border border-white/10 hover:border-gold-500/40 text-slate-200 text-xs font-semibold transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>{loading ? 'Authenticating...' : 'Sign In as nouman3dvisuals@gmail.com (Dev Mode)'}</span>
          </button>
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-white/5 text-center text-[10px] text-slate-500">
          <p>© N3D Portfolio CMS • Public visitors cannot access administrative routes.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
