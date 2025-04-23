import nodemailer from "nodemailer";
export const sendEmail = async (req, res) => {
    const { name, email, phone, comment } = req.body;

    if (!name || !email || !phone || !comment) {
        return res.status(400).json({ status: "error", message: "All fields are required." });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"${name}" <${process.env.EMAIL_USER}>`,
            to: process.env.RECEIVER_EMAIL,
            subject: `New Inquiry from ${name}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong><br/>${comment}</p>
      `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ status: "success", message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ status: "error", message: "Failed to send email" });
    }
};


