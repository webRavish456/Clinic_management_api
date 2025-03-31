import express from 'express';
import { connectDB } from './src/db/mongo-db-connect.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import { router as Router } from './src/routes/routes.js';

const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


connectDB()

app.use("/api", Router);
      
 app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
