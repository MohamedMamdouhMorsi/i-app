// File: ./users/requestPasswordReset.js

const db = require('../../query/mysqlConnect');
const creatAUTH = require('../../toolsFN/createAUTH'); // <-- 1. IMPORT YOUR FUNCTION
const nodemailer = require('nodemailer');

// --- IMPORTANT ---
// Configure your email transporter.


const requestPasswordReset = (body, res,i_app) => {
   if(!i_app.resetPasswordsMail || !i_app.resetPasswordsMail.host){
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ res: false, message: 'Mail server is not configured.' }));
      return;
   }
   const transporter = nodemailer.createTransport({
    host: i_app.resetPasswordsMail.host,
    port: i_app.resetPasswordsMail.port,
    secure: i_app.resetPasswordsMail.secure, 
    auth: {
        user: i_app.resetPasswordsMail.auth.user,
        pass: i_app.resetPasswordsMail.auth.password,
    },
});
    const email = body?.email ? body.email.trim().toLowerCase() : null;

    if (!email) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ res: false, message: 'Email is required.' , body}));
        return;
    }

    // 1. Check if a user with that email exists
    const findUserCallback = async (dbres) => {
        if (dbres.length === 0) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ res: true, message: 'If your email is in our system, you will receive a reset link.' }));
            return;
        }

        const user = dbres[0];
        const userId = user.id;

        // 2. Generate a token using your creatAUTH function.
        // We combine the user's email with the current timestamp to ensure uniqueness.
        const tokenInput = `${user.email}${Date.now()}`;
        const resetToken = creatAUTH(tokenInput); 

        // 3. Store the token in the database
        const now = new Date();
        const currentDate = now.toISOString().slice(0, 10);
        const currentTime = now.toTimeString().slice(0, 8);
        
        const tokenStoredCallback = async () => {
            try {
                // 4. Create the email content
                const resetLink = `http://${i_app.domain}/reset-password?token=${resetToken}`;

                const emailHtml = `
                    <html>
                        <body style="font-family: Arial, sans-serif; color: #333;">
                            <h2>Password Reset Request</h2>
                            <p>Hello ${user.firstname || user.username},</p>
                            <p>We received a request to reset your password. Please click the link below to set a new one. This link will be valid for one hour.</p>
                            <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Reset Your Password</a>
                            <p>If you did not request a password reset, please ignore this email.</p>
                            <hr>
                            <p>If you're having trouble with the button, copy and paste this URL into your browser:</p>
                            <p>${resetLink}</p>
                        </body>
                    </html>
                `;

                // 5. Send the email
                await transporter.sendMail({
                    from: `${i_app.resetPasswordsMail.auth.user}`,
                    to: user.email,
                    subject: 'Your Password Reset Link',
                    html: emailHtml,
                });

                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ res: true, message: `If your email ${email} is in our system, you will receive a reset link.` }));

            } catch (error) {
                console.error('Failed to send password reset email:', error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ res: false, message: 'Could not send reset email.' }));
            }
        };
        
        // Insert into resetPasswords table
        db({ query: [{ a: 'in', n: 'resetPasswords', d: [userId, resetToken, '0', currentDate, currentTime] }] }, res, tokenStoredCallback);
    };

    // Query to find the user by email
    db({ query: [{ a: 'get', n: 'users', l: '1', q: [[['email', email, 'eq']]] }] }, false, findUserCallback);
};

module.exports = requestPasswordReset;