const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"🌸 Flower Shop" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html: `
        <div style="max-width: 600px; margin: auto; padding: 20px; font-family: Arial, sans-serif; border: 1px solid #ddd; border-radius: 10px; background-color: #fff;">
          <div style="text-align: center; padding-bottom: 20px;">
            <img src="https://via.placeholder.com/150x50?text=Flower+Shop" alt="Flower Shop" style="max-width: 100px;">
          </div>
          <h2 style="color: #ff66b2; text-align: center;">🌸 ${subject} 🌸</h2>
          <p style="font-size: 16px; color: #444; text-align: center;">${text}</p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="https://your-flower-shop.com" style="background-color: #ff66b2; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;">Visit Our Shop</a>
          </div>
          <hr style="margin: 20px 0; border: 0; border-top: 1px solid #ddd;">
          <p style="font-size: 12px; color: #888; text-align: center;">&copy; 2025 Flower Shop. All rights reserved.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('🌸 Email sent successfully 🌸');
  } catch (err) {
    console.error('❌ Error sending email:', err);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;

