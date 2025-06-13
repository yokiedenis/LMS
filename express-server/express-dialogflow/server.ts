import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dialogflowRoutes from './routes/dialogflowroutes'; // Update the import to match your filename

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS to handle requests from different domains

// Routes
app.use('/express-dialogflow', dialogflowRoutes); // Ensure this path is correct

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
