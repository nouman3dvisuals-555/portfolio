import express from 'express';
import { sendInquiryEmail } from '../services/emailService.js';

const router = express.Router();

// POST /api/contact — Handle portfolio client & recruiter inquiries
router.post('/', async (req, res) => {
  try {
    const { name, email, projectType, projectDetails, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required.'
      });
    }

    // Send email notification to nouman3dvisuals@gmail.com
    await sendInquiryEmail({ name, email, projectType, projectDetails, message });

    res.status(200).json({
      success: true,
      message: 'Thank you for reaching out! Nouman will respond to your inquiry shortly.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to process inquiry.',
      error: error.message
    });
  }
});

export default router;
