import express from 'express';
import Project from '../models/Project.js';
import { getMemoryProjects } from '../seed/memoryStore.js';

const router = express.Router();

// GET /api/projects — Retrieve published projects
router.get('/', async (req, res) => {
  try {
    const { category, type } = req.query;
    let query = { status: 'published' };

    if (category && category !== 'All') {
      query.category = category;
    }
    if (type) {
      query.mediaType = type;
    }

    let projects;
    try {
      projects = await Project.find(query).sort({ order: 1, createdAt: -1 });
    } catch (dbErr) {
      // Fallback to memory store if database is offline
      projects = getMemoryProjects({ category, type, status: 'published' });
    }

    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch portfolio projects',
      error: error.message
    });
  }
});

// GET /api/projects/:id — Retrieve single project by ID
router.get('/:id', async (req, res) => {
  try {
    let project;
    try {
      project = await Project.findOne({ _id: req.params.id, status: 'published' });
    } catch (dbErr) {
      const memoryProjects = getMemoryProjects({ status: 'published' });
      project = memoryProjects.find((p) => p._id === req.params.id);
    }

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project details',
      error: error.message
    });
  }
});

export default router;
