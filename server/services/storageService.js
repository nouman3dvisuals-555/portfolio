import fs from 'fs';
import path from 'path';

/**
 * Storage Abstraction Layer
 * Handles uploading files to external storage / local storage bucket
 * and deleting old media assets when projects are updated or removed.
 */

export const processUploadedFile = (file, req) => {
  if (!file) return null;

  // Generate public accessible URL
  // If absolute host URL is needed: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
  // Relative URL is ideal for CORS and CDN compatibility:
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
    // If local uploads file
    if (mediaUrl.includes('/uploads/')) {
      const filename = mediaUrl.split('/uploads/').pop();
      const filePath = path.join(process.cwd(), 'uploads', filename);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`[StorageService] Deleted media asset: ${filename}`);
        return true;
      }
    }
  } catch (error) {
    console.error(`[StorageService Error] Failed to delete media file: ${error.message}`);
  }

  return false;
};
