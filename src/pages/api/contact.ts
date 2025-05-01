// pages/api/contact.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

// Ensure these environment variables are set in your .env.local file
const EMAIL_USER = process.env.EMAIL_USER; // The email address you're sending from
const EMAIL_PASS = process.env.EMAIL_PASS; // The password or app-specific password
const EMAIL_PRIVATE = process.env.NEXT_PUBLIC_EMAIL;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'POST') {
        // Only allow POST requests
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, message }: { name: string; email: string; message: string } = req.body;

    // Basic validation
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Configure your email transporter
    // Replace with your email provider's SMTP settings
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Example: Gmail SMTP server
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
    });

    try {
        // Send the email
        await transporter.sendMail({
            from: `"Contact Form Submission" <${EMAIL_USER}>`, // Sender address
            to: EMAIL_PRIVATE, // The recipient email address (where you want to receive messages)
            subject: `New message from ${name}`, // Subject line
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Plain text body
            html: `
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong><br/>${message}</p>
            `, // HTML body
            replyTo: email, // Set the user's email as the reply-to address
        });
        console.log('Message:', message);
        console.log(EMAIL_PRIVATE);
        console.log(EMAIL_USER);
        console.log('Email sent successfully');
        return res.status(200).json({ message: 'Transmission successful!' });

    } catch (error) {
        console.error('Error sending email:', error);
        // Provide a more generic error message to the client
        return res.status(500).json({ message: 'Transmission failed. Please try again.' });
    }
}