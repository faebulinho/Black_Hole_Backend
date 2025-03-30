// Import express with types
import express, { Request, Response } from 'express';

// Create app
const app = express();

// Create a simple endpoint with proper types
app.get('/test', function (req: Request, res: Response) {
  res.send('Hello world');
});

// Start server
app.listen(3000, function () {
  console.log('Server running on port 3000');
});