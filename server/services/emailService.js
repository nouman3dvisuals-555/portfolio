/**
 * Log Contact Inquiry to Server Console
 * (Email Delivery is handled directly on the frontend by EmailJS)
 */
export const sendInquiryEmail = async ({ name, email, projectType, projectDetails, message }) => {
  console.log(`====================================================`);
  console.log(`[NEW PROJECT INQUIRY LOGGED]`);
  console.log(`From: ${name} <${email}>`);
  console.log(`Project Type: ${projectType || 'General Inquiry'}`);
  console.log(`Details: ${projectDetails || 'N/A'}`);
  console.log(`Message: ${message}`);
  console.log(`====================================================`);

  return { logged: true };
};

