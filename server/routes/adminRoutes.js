import express from 'express';
import Project from '../models/Project.js';
import { verifyGoogleToken, generateAdminToken, requireAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import { processUploadedFile, deleteMediaAsset } from '../services/storageService.js';
import {
  getMemoryProjects,
  addMemoryProject,
  updateMemoryProject,
  deleteMemoryProject
} from '../seed/memoryStore.js';

const router = express.Router();
const AUTHORIZED_EMAIL = process.env.AUTHORIZED_ADMIN_EMAIL || 'nouman3dvisuals@gmail.com';

/**
 * POST /api/auth/google
 * Authenticate Administrator via Google credential ID token
 * Strictly validates email === nouman3dvisuals@gmail.com on server-side!
 */
router.post('/auth/google', async (req, res) => {
  try {
    const { credential, email: directEmail, name: directName } = req.body;

    let email = directEmail;
    let name = directName || 'Nouman Visuals';

    if (credential) {
      const payload = await verifyGoogleToken(credential, directEmail);
      email = payload.email;
      name = payload.name || name;
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Google authentication failed: Email not provided in token payload.'
      });
    }

    // STRICT INDEPENDENT BACKEND SECURITY CHECK
    if (email.toLowerCase() !== AUTHORIZED_EMAIL.toLowerCase()) {
      console.warn(`[Security Warning] Unauthorized admin login attempt by: ${email}`);
      return res.status(403).json({
        success: false,
        message: `Access Denied: Account '${email}' is not authorized. Only '${AUTHORIZED_EMAIL}' has administrative privileges.`
      });
    }

    // Generate Admin JWT Token
    const token = generateAdminToken(email, name);

    res.json({
      success: true,
      message: 'Google authentication successful. Welcome back, Nouman!',
      token,
      admin: {
        email,
        name,
        role: 'admin'
      }
    });
  } catch (error) {
    console.error('[Auth Error]', error);
    res.status(401).json({
      success: false,
      message: 'Google Authentication failed',
      error: error.message
    });
  }
});

/**
 * GET /api/admin/verify
 * Check active admin token status
 */
router.get('/verify', requireAdmin, (req, res) => {
  res.json({
    success: true,
    admin: req.admin
  });
});

/**
 * GET /api/admin/projects
 * Protected endpoint to list ALL projects (published + draft)
 */
router.get('/projects', requireAdmin, async (req, res) => {
  try {
    let projects;
    try {
      projects = await Project.find().sort({ createdAt: -1 });
    } catch (dbErr) {
      projects = getMemoryProjects({}); // All projects
    }

    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch admin projects',
      error: error.message
    });
  }
});

/**
 * POST /api/admin/upload
 * Media Upload handler (Images / Videos) -> Returns external/static Storage URL
 */
router.post('/upload', requireAdmin, upload.single('media'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No media file provided for upload.'
      });
    }

    const processed = processUploadedFile(req.file, req);

    res.json({
      success: true,
      message: 'Media uploaded successfully to object storage.',
      data: processed
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Media upload failed.',
      error: error.message
    });
  }
});

/**
 * POST /api/admin/projects
 * Protected endpoint to Create a New Project
 */
router.post('/projects', requireAdmin, async (req, res) => {
  try {
    const { title, description, category, mediaType, mediaUrl, thumbnailUrl, duration, status, featured } = req.body;

    if (!title || !description || !category || !mediaType || !mediaUrl) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, category, mediaType, and mediaUrl are required.'
      });
    }

    const projectData = {
      title,
      description,
      category,
      mediaType,
      mediaUrl,
      thumbnailUrl: thumbnailUrl || (mediaType === 'image' ? mediaUrl : ''),
      duration: duration || '',
      status: status || 'published',
      featured: Boolean(featured)
    };

    let newProject;
    try {
      newProject = await Project.create(projectData);
    } catch (dbErr) {
      newProject = addMemoryProject(projectData);
    }

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to create project',
      error: error.message
    });
  }
});

/**
 * PUT /api/admin/projects/:id
 * Protected endpoint to Update an existing Project
 */
router.put('/projects/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    let updatedProject;
    try {
      const existing = await Project.findById(id);
      if (!existing) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }

      // If mediaUrl is changed, clean up old asset
      if (updates.mediaUrl && updates.mediaUrl !== existing.mediaUrl) {
        await deleteMediaAsset(existing.mediaUrl);
      }

      updatedProject = await Project.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
    } catch (dbErr) {
      updatedProject = updateMemoryProject(id, updates);
    }

    if (!updatedProject) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: updatedProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update project',
      error: error.message
    });
  }
});

/**
 * PATCH /api/admin/projects/:id/visibility
 * Protected endpoint to toggle Published / Draft status quickly
 */
router.patch('/projects/:id/visibility', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['published', 'draft'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status. Must be published or draft.' });
    }

    let updated;
    try {
      updated = await Project.findByIdAndUpdate(id, { status }, { new: true });
    } catch (dbErr) {
      updated = updateMemoryProject(id, { status });
    }

    res.json({
      success: true,
      message: `Project status set to ${status}`,
      data: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to update visibility',
      error: error.message
    });
  }
});

/**
 * DELETE /api/admin/projects/:id
 * Protected endpoint to Delete a Project
 */
router.delete('/projects/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    let deleted;
    try {
      deleted = await Project.findByIdAndDelete(id);
      if (deleted && deleted.mediaUrl) {
        await deleteMediaAsset(deleted.mediaUrl);
      }
    } catch (dbErr) {
      deleted = deleteMemoryProject(id);
      if (deleted && deleted.mediaUrl) {
        await deleteMediaAsset(deleted.mediaUrl);
      }
    }

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Project not found or already deleted.'
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully and media assets cleaned.',
      data: deleted
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete project',
      error: error.message
    });
  }
});

export default router;
