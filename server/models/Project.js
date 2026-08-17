import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Perfume', 'Skincare', 'Beverage', 'Tech', 'Watch', 'Other'],
      default: 'Other'
    },
    mediaType: {
      type: String,
      required: [true, 'Media type is required'],
      enum: ['image', 'video'],
      default: 'image'
    },
    mediaUrl: {
      type: String,
      required: [true, 'Media URL is required']
    },
    thumbnailUrl: {
      type: String,
      default: ''
    },
    duration: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['published', 'draft'],
      default: 'published'
    },
    featured: {
      type: Boolean,
      default: false
    },
    order: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);
export default Project;
