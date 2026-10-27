const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const formData = require("form-data");
const Mailgun = require("mailgun.js");

const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

dotenv.config({
    path: path.join(__dirname, "credentials.env")
});

const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
    credential: cert(serviceAccount)
});

const app = express();
const PORT = 3000;

app.use(cors({
    origin: "http://localhost:5173"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const mailgun = new Mailgun(formData);

const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || ""
});

const DOMAIN =
    "sandbox329b59f9c6ea47978ae4b4741fab3166.mailgun.org";

app.get("/api/test", (req, res) => {
    res.status(200).send("server is running!");
});

app.post("/api/auth/verify", async (req, res) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authentication token is required."
            });
        }

        const idToken = authHeader.split(" ")[1];

        const decodedToken = await getAuth().verifyIdToken(idToken);

        return res.status(200).json({
            message: "Token verified successfully.",
            uid: decodedToken.uid,
            email: decodedToken.email || null
        });
    } catch (error) {
        console.error("Token verification error:", error.message);

        return res.status(401).json({
            message: "Invalid or expired authentication token."
        });
    }
});

app.post("/api/subscribe", async (req, res) => {
    try {
        const email = String(req.body.email || "").trim();

        if (!email) {
            return res.status(400).send("Email is required.");
        }

        if (!process.env.MAILGUN_API_KEY) {
            return res.status(500).send("Mailgun API key is missing.");
        }

        await mg.messages.create(DOMAIN, {
            from: `DEV@Deakin Newsletter <postmaster@${DOMAIN}>`,
            to: [email],
            subject: "Welcome to DEV@Deakin",
            text: `Hello,

            Thank you for subscribing to DEV@Deakin Newsletter.

            We're excited to have you as part of our community. Stay tuned for our latest articles, tutorials, and updates.

            Best regards,
            DEV@Deakin Team`
        });

        return res.status(200).send(
            "Welcome email sent successfully!"
        );
    } catch (error) {
        console.error("Mailgun error:", error.message);

        return res.status(500).send(
            "Failed to send welcome email."
        );
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
