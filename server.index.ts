import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authenticateUser } from './middleware/auth';

const app = express();
app.use(express.json());

// Login endpoint
app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // TODO: Validate input data if necessary

  try {
    // Mock user data for demonstration
    const user = {
      id: 1,
      username: 'exampleUser',
      passwordHash: '$2b$10$2iJgeUvXUcq/fzRKp0YcQ.Fh3zvWlZ02voLPlnWUuIHaN0qCMLNim', // Hashed password: "password123"
    };

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate access and refresh tokens
    const accessToken = jwt.sign({ userId: user.id }, 'your-access-token-secret', { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user.id }, 'your-refresh-token-secret', { expiresIn: '7d' });

    res.json({ accessToken, refreshToken });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Token rotation endpoint
app.post('/refresh-token', authenticateUser, (req: Request, res: Response) => {
  // User is already authenticated at this point
  const user = req.user;

  // Generate a new access token
  const accessToken = jwt.sign({ userId: user.id }, 'your-access-token-secret', { expiresIn: '15m' });

  res.json({ accessToken });
});

app.get('/messages', async (req: Request, res: Response) => {
    try {
      // Parse query parameters
      const page = Number(req.query.page) || 1;
      const offset = Number(req.query.offset) || 0;
      const limit = 100; // Maximum number of messages per page
  
      // Calculate start and end indices based on page and offset
      const startIndex = (page - 1) * limit + offset;
  
      // Fetch messages from the database
      const messages = await prisma.message.findMany({
        skip: startIndex,
        take: limit,
        orderBy: { timestamp: 'desc' }, // Assuming messages are ordered by timestamp
      });
  
      res.json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  });
  
// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
app.get('/messages', async (req: Request, res: Response) => {
  try {
    const messages = await prisma.message.findMany({
      take: 100, // Limit the result to 100 messages
    });
    const formattedMessages: Message[] = messages.map((message) => ({
      id: message.id,
      text: message.text,
      sender: message.sender,
      timestamp: message.timestamp,
    }));

    res.json(formattedMessages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});