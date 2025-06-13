import { Router } from 'express';
import { sendMessageToDialogflow } from '../controllers/dialogflowcontroller'; // Update import path

const router: Router = Router();

// Define the POST route for handling chat messages
router.post('/chat', sendMessageToDialogflow); // Ensure this matches the endpoint you call from React

export default router;
