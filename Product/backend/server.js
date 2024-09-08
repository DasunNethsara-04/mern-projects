import cors from 'cors';
import path from "path";
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import ProductRoutes from './routes/products.route.js';

dotenv.config();

const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(cors());

// api routes
app.use("/api/products/", ProductRoutes);

const PORT = process.env.PORT || 5001;

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
});