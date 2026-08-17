import axios from 'axios';
import emailjs from '@emailjs/browser';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to attach Admin Authorization JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('n3d_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Public API Services
export const fetchProjects = async (params = {}) => {
  const res = await api.get('/projects', { params });
  return res.data;
};

export const fetchProjectById = async (id) => {
  const res = await api.get(`/projects/${id}`);
  return res.data;
};

export const sendContactMessage = async (contactData) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_ci9tqtm';
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_wuzomqz';
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'EF2zX8mNRlZ22HkGM';

  try {
    emailjs.init(publicKey);
    await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: contactData.name,
        name: contactData.name,
        from_email: contactData.email,
        email: contactData.email,
        reply_to: contactData.email,
        project_type: contactData.projectType,
        projectType: contactData.projectType,
        project_details: contactData.projectDetails,
        projectDetails: contactData.projectDetails,
        message: contactData.message,
        to_email: 'nouman3dvisuals@gmail.com'
      },
      publicKey
    );

    return { success: true, message: 'Message sent successfully via EmailJS!' };
  } catch (err) {
    console.error('[EmailJS Error Detail]', err);
    const errorDetail = err.text || err.message || (err.status ? `EmailJS Error Status ${err.status}` : 'EmailJS delivery error');
    throw new Error(errorDetail);
  }
};

// Admin Auth & Protected API Services
export const adminGoogleLogin = async (payload) => {
  const res = await api.post('/admin/auth/google', payload);
  return res.data;
};

export const verifyAdminSession = async () => {
  const res = await api.get('/admin/verify');
  return res.data;
};

export const fetchAdminProjects = async () => {
  const res = await api.get('/admin/projects');
  return res.data;
};

export const uploadMediaFile = async (file) => {
  const formData = new FormData();
  formData.append('media', file);

  const res = await api.post('/admin/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return res.data;
};

export const createProject = async (projectData) => {
  const res = await api.post('/admin/projects', projectData);
  return res.data;
};

export const updateProject = async (id, projectData) => {
  const res = await api.put(`/admin/projects/${id}`, projectData);
  return res.data;
};

export const toggleProjectStatus = async (id, status) => {
  const res = await api.patch(`/admin/projects/${id}/visibility`, { status });
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await api.delete(`/admin/projects/${id}`);
  return res.data;
};

export default api;
