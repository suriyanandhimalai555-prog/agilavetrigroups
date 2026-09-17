import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- BULLETPROOF CORS CONFIGURATION ---
// Setting origin to 'true' automatically reflects the incoming request origin.
// This instantly resolves preflight (OPTIONS) blocks in production.
app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true
}));

app.use(express.json());

// --- NODEMAILER CONFIGURATION ---
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    },
    logger: true,
    debug: true
});

transporter.verify((error) => {
    if (error) {
        console.error("⚠️ SMTP Connection Error:", error.message);
    } else {
        console.log("=====================================================");
        console.log(`✅ Mail server is ready using ${process.env.SMTP_HOST}`);
        console.log(`🟢 The Express API is active and listening on port ${PORT}`);
        console.log("=====================================================");
    }
});

// --- CONTACT ROUTE ---
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ error: 'Please provide all required fields.' });
    }

    const mailOptions = {
        from: `"Agilavetri Website" <${process.env.SMTP_USER}>`,
        to: process.env.RECEIVER_EMAIL || process.env.SMTP_USER,
        replyTo: email,
        subject: `Website Inquiry: ${name}`,
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap');
                </style>
            </head>
            <body style="margin: 0; padding: 20px; background-color: #f9fafb;">
                <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.05); background-color: #ffffff;">
                    
                    <div style="background-color: #010a1f; padding: 35px 20px; text-align: center; border-bottom: 4px solid #f77704;">
                        <h2 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 2px; font-weight: 700; text-transform: uppercase;">New Connection Request</h2>
                    </div>
                    
                    <div style="padding: 32px; background-color: #ffffff;">
                        <p style="color: #4b5563; font-size: 15px; margin-bottom: 30px;">A new contact form submission has been received from the <strong>Agilavetri Groups</strong> website.</p>
                        
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; width: 120px; font-weight: 500; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Full Name</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-weight: 700; font-size: 15px;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 500; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Email Address</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #111827; font-size: 15px;">
                                    <a href="mailto:${email}" style="color: #0437cc; text-decoration: none; font-weight: 500;">${email}</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 500; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Phone Number</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #f3f4f6;">
                                    <span style="background-color: #f77704; color: #ffffff; padding: 4px 12px; border-radius: 4px; font-size: 13px; font-weight: 700; letter-spacing: 0.5px;">${phone}</span>
                                </td>
                            </tr>
                        </table>
                        
                        <h3 style="color: #010a1f; font-size: 14px; margin-bottom: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">Message Details</h3>
                        <div style="padding: 20px; background-color: #f9fafb; border-left: 4px solid #0437cc; border-radius: 0 4px 4px 0;">
                            <p style="margin: 0; color: #374151; line-height: 1.7; white-space: pre-wrap; font-weight: 400; font-size: 15px;">${message}</p>
                        </div>
                    </div>
                    
                    <div style="background-color: #f3f4f6; padding: 20px; text-align: center; font-size: 12px; color: #9ca3af; font-weight: 500;">
                        This email was automatically generated from the AGILAVETRI GROUPS web system.<br/>
                        &copy; ${new Date().getFullYear()} Agilavetri Groups Pvt Ltd. All rights reserved.
                    </div>
                </div>
            </body>
            </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('🔴 Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email. Please try again later.' });
    }
});

const server = app.listen(PORT, () => {
    console.log(`🚀 Server is successfully running and locked on port ${PORT}`);
});

server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.error(`⚠️ Port ${PORT} is in use. Trying port ${PORT + 1}...`);
        setTimeout(() => {
            server.close();
            app.listen(PORT + 1, () => {
                console.log(`🚀 Server is successfully running and locked on port ${PORT + 1}`);
            });
        }, 1000);
    } else {
        console.error("Server Error:", e);
    }
});