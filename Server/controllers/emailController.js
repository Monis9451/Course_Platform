let nodemailer;
try {
  nodemailer = require('nodemailer');
} catch (error) {
  console.warn('Nodemailer not installed. Email functionality will be simulated.');
  nodemailer = null;
}

const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

// Create transporter configuration
const createTransporter = () => {
  if (!nodemailer) {
    return null;
  }
  
  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.FEEDBACK_ADMIN_EMAIL,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send feedback email
const sendFeedbackEmail = catchAsync(async (req, res, next) => {
  const {
    name,
    email,
    rating,
    mostHelpful,
    improvements,
    personalChanges,
    additionalComments,
    anonymous,
    userEmail // The email of the logged-in user (from auth)
  } = req.body;

  // Validation
  if (!email && !anonymous) {
    return next(new AppError('Email is required when not submitting anonymously', 400));
  }

  if (!rating) {
    return next(new AppError('Rating is required', 400));
  }

  // If nodemailer is not available, simulate the email sending
  if (!nodemailer) {
    console.log('=== SIMULATED EMAIL FEEDBACK ===');
    console.log('To:', process.env.FEEDBACK_ADMIN_EMAIL);
    console.log('From:', anonymous ? 'Anonymous User' : (email || userEmail));
    console.log('Rating:', rating);
    console.log('Feedback:', { name, mostHelpful, improvements, personalChanges, additionalComments });
    console.log('Anonymous:', anonymous);
    console.log('================================');
    
    return res.status(200).json({
      status: 'success',
      message: 'Feedback received successfully! (Note: Email functionality requires nodemailer installation)'
    });
  }

  // Create transporter
  const transporter = createTransporter();

  // Verify transporter configuration
  try {
    console.log('Testing email configuration...');
    console.log('Email user:', process.env.FEEDBACK_ADMIN_EMAIL);
    console.log('Password set:', process.env.EMAIL_PASSWORD ? 'Yes' : 'No');
    
    // Skip verification for now and try to send directly
    console.log('Skipping verification, attempting to send email directly...');
    
  } catch (error) {
    console.error('Email transporter verification failed:', error.message);
    console.error('Full error:', error);
    return next(new AppError('Email service is currently unavailable. Please check email configuration.', 500));
  }

  // Prepare email content
  const senderEmail = anonymous ? 'Anonymous User' : email || userEmail;
  const senderName = anonymous ? 'Anonymous' : (name || 'Not provided');

  const emailHTML = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #393128; border-bottom: 2px solid #393128; padding-bottom: 10px;">
        New Course Feedback Received
      </h2>
      
      <div style="background-color: #f8f6f3; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #393128; margin-top: 0;">Feedback Details</h3>
        
        <p><strong>From:</strong> ${senderName} ${anonymous ? '(Anonymous)' : ''}</p>
        <p><strong>Email:</strong> ${senderEmail}</p>
        <p><strong>Overall Rating:</strong> ${rating}/5</p>
        <p><strong>Submission Date:</strong> ${new Date().toLocaleString()}</p>
      </div>

      ${mostHelpful ? `
        <div style="margin: 20px 0;">
          <h4 style="color: #393128;">What part of the course supported you most?</h4>
          <div style="background-color: #fff; padding: 15px; border-left: 4px solid #393128; margin: 10px 0;">
            ${mostHelpful}
          </div>
        </div>
      ` : ''}

      ${improvements ? `
        <div style="margin: 20px 0;">
          <h4 style="color: #393128;">Areas for improvement:</h4>
          <div style="background-color: #fff; padding: 15px; border-left: 4px solid #f39c12; margin: 10px 0;">
            ${improvements}
          </div>
        </div>
      ` : ''}

      ${personalChanges ? `
        <div style="margin: 20px 0;">
          <h4 style="color: #393128;">Personal changes or shifts:</h4>
          <div style="background-color: #fff; padding: 15px; border-left: 4px solid #27ae60; margin: 10px 0;">
            ${personalChanges}
          </div>
        </div>
      ` : ''}

      ${additionalComments ? `
        <div style="margin: 20px 0;">
          <h4 style="color: #393128;">Additional comments:</h4>
          <div style="background-color: #fff; padding: 15px; border-left: 4px solid #8e44ad; margin: 10px 0;">
            ${additionalComments}
          </div>
        </div>
      ` : ''}

      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ccc; font-size: 12px; color: #666;">
        <p>This feedback was submitted through The Mind Planner course platform.</p>
        <p>Please handle this feedback with care and confidentiality as requested.</p>
      </div>
    </div>
  `;

  const emailText = `
    New Course Feedback Received

    From: ${senderName} ${anonymous ? '(Anonymous)' : ''}
    Email: ${senderEmail}
    Overall Rating: ${rating}/5
    Submission Date: ${new Date().toLocaleString()}

    ${mostHelpful ? `Most Helpful Part: ${mostHelpful}\n\n` : ''}
    ${improvements ? `Areas for Improvement: ${improvements}\n\n` : ''}
    ${personalChanges ? `Personal Changes: ${personalChanges}\n\n` : ''}
    ${additionalComments ? `Additional Comments: ${additionalComments}\n\n` : ''}

    This feedback was submitted through The Mind Planner course platform.
  `;

  const mailOptions = {
    from: `"Mind Planner Feedback" <${process.env.FEEDBACK_ADMIN_EMAIL}>`,
    to: process.env.FEEDBACK_ADMIN_EMAIL,
    subject: `Course Feedback - Rating: ${rating}/5 ${anonymous ? '(Anonymous)' : `from ${senderName}`}`,
    text: emailText,
    html: emailHTML,
    replyTo: anonymous ? undefined : (email || userEmail)
  };

  // Send email
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Feedback email sent successfully:', info.messageId);

    res.status(200).json({
      status: 'success',
      message: 'Feedback submitted successfully. Thank you for your valuable input!'
    });
  } catch (error) {
    console.error('Error sending feedback email:', error);
    return next(new AppError('Failed to send feedback. Please try again later.', 500));
  }
});

// Test email configuration
const testEmailConfig = catchAsync(async (req, res, next) => {
  if (!nodemailer) {
    return res.status(200).json({
      status: 'warning',
      message: 'Nodemailer not installed. Please install nodemailer to enable email functionality.',
      installed: false
    });
  }

  const transporter = createTransporter();

  try {
    await transporter.verify();
    res.status(200).json({
      status: 'success',
      message: 'Email configuration is working correctly',
      installed: true
    });
  } catch (error) {
    console.error('Email configuration test failed:', error);
    return next(new AppError('Email configuration test failed', 500));
  }
});

module.exports = {
  sendFeedbackEmail,
  testEmailConfig
};
