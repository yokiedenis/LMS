import { Request, Response } from 'express';
import * as dialogflow from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';

// Generate a unique session ID for each user session
const sessionId = uuidv4();

// Set up Dialogflow credentials and client
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: 'chatai.json', // Ensure this path is correct to your JSON service account key
});

export const sendMessageToDialogflow = async (req: Request, res: Response) => {
  const { userMessage } = req.body;

  // Define the session path
  const sessionPath = sessionClient.projectAgentSessionPath('ageless-thought-439510-v2', sessionId);

  // The Dialogflow query request
  const request: dialogflow.protos.google.cloud.dialogflow.v2.IDetectIntentRequest = {
    session: sessionPath,
    queryInput: {
      text: {
        text: userMessage,
        languageCode: 'en', // Use the appropriate language code
      },
    },
  };

  try {
    // Communicate with Dialogflow to detect intent
    const [response] = await sessionClient.detectIntent(request);
    const result = response.queryResult;

    // Send back the response from Dialogflow to the client
    res.json({ reply: result?.fulfillmentText });
  } catch (error) {
    console.error('ERROR:', error);
    res.status(500).send('Error communicating with Dialogflow');
  }
};
