import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

/**
 * Storage Abstraction Layer
 * Handles uploading files to external Cloudinary CDN / local storage fallback
 * and deleting old media assets when projects are updated or removed.
 */

// Configure Cloudinary if environment variables are provided
const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  console.log('[StorageService] Cloudinary cloud storage configured successfully.');
} else {
  console.warn(
    '[StorageService Warning] Cloudinary credentials not configured. Local disk fallback active.\n' +
    'Note: Local files on Render/Heroku ephemeral containers are deleted when the service sleeps or restarts.\n' +
    'To make uploads permanent, add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to your environment.'
  );
}

export const processUploadedFile = async (file, req) => {
  if (!file) return null;

  // 1. If Cloudinary is configured, upload directly to Cloudinary CDN
  if (isCloudinaryConfigured) {
    try {
      const isVideo = file.mimetype.startsWith('video');
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        resource_type: isVideo ? 'video' : 'image',
        folder: 'n3d_portfolio',
        use_filename: true,
        unique_filename: true
      });

      // Safely remove temporary file from local server disk
      if (fs.existsSync(file.path)) {
        try {
          fs.unlinkSync(file.path);
        } catch (unlinkErr) {
          console.warn('[StorageService] Temp file cleanup warning:', unlinkErr.message);
        }
      }

      console.log(`[StorageService] Uploaded ${isVideo ? 'video' : 'image'} to Cloudinary: ${uploadResult.secure_url}`);

      return {
        filename: uploadResult.public_id,
        url: uploadResult.secure_url,
        relativeUrl: uploadResult.secure_url,
        size: uploadResult.bytes || file.size,
        mimetype: file.mimetype,
        format: uploadResult.format
      };
    } catch (err) {
      console.error('[StorageService Cloudinary Upload Error]:', err.message);
      // Fall through to local fallback if Cloudinary upload encounters an error
    }
  }

  // 2. Fallback to local uploads directory (ephemeral on free hosting)
  const relativeUrl = `/uploads/${file.filename}`;
  const fullUrl = req ? `${req.protocol}://${req.get('host')}${relativeUrl}` : relativeUrl;

  return {
    filename: file.filename,
    url: fullUrl,
    relativeUrl,
    size: file.size,
    mimetype: file.mimetype
  };
};

export const deleteMediaAsset = async (mediaUrl) => {
  if (!mediaUrl) return false;

  try {
    // If Cloudinary URL
    if (isCloudinaryConfigured && mediaUrl.includes('cloudinary.com')) {
      const urlParts = mediaUrl.split('/');
      const filenameWithExt = urlParts.pop();
      const publicIdWithoutExt = filenameWithExt.split('.')[0];
      const folder = urlParts.pop();
      const publicId = `${folder}/${publicIdWithoutExt}`;
      const isVideo = mediaUrl.includes('/video/');

      await cloudinary.uploader.destroy(publicId, {
        resource_type: isVideo ? 'video' : 'image'
      });
      console.log(`[StorageService] Deleted asset from Cloudinary: ${publicId}`);
      return true;
    }

    // If local uploads file
    if (mediaUrl.includes('/uploads/')) {
      const filename = mediaUrl.split('/uploads/').pop();
      const filePath = path.join(process.cwd(), 'uploads', filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`[StorageService] Deleted local media asset: ${filename}`);
        return true;
      }
    }
  } catch (error) {
    console.error(`[StorageService Error] Failed to delete media file: ${error.message}`);
  }

  return false;
};
