import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../models/Project.js';
import { INITIAL_PROJECTS } from './memoryStore.js';

dotenv.config();

export const seedDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/n3d_portfolio');
    console.log(`[Seed Script] Connected to MongoDB at ${conn.connection.host}`);

    const existingCount = await Project.countDocuments();
    if (existingCount === 0) {
      console.log('[Seed Script] No existing projects found. Seeding initial 3D visualization projects...');
      const cleanProjects = INITIAL_PROJECTS.map(({ _id, ...rest }) => rest);
      await Project.insertMany(cleanProjects);
      console.log(`[Seed Script] Successfully seeded ${cleanProjects.length} initial projects.`);
    } else {
      console.log(`[Seed Script] Database already contains ${existingCount} projects. Skipping seed.`);
    }
  } catch (error) {
    console.warn(`[Seed Warning] Could not complete database seed: ${error.message}`);
  }
};

// If run directly via node seed/seedProjects.js
if (process.argv[1].endsWith('seedProjects.js')) {
  seedDatabase().then(() => process.exit(0));
}
