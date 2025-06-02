console.log('Starting server.js...');

try {
  const express = require('express');
  const cors = require('cors');
  const multer = require('multer');
  const fs = require('fs');
  const path = require('path');

  const app = express();
  const PORT = 5001; // Changed to 5001 to avoid port conflict

  // Global error handlers
  process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
  });

  process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
  });

  // Enable CORS
  app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }));

  // Log incoming requests
  app.use((req, res, next) => {
    console.log(`Received ${req.method} request for ${req.url}`);
    console.log('Headers:', req.headers);
    next();
  });

  // Middleware to parse JSON
  app.use(express.json());

  // Serve uploaded images statically
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  // Create uploads directory if not exists
  const uploadsDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    console.log('Creating uploads directory...');
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Storage config for Multer
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${file.originalname}`;
      cb(null, uniqueName);
    }
  });

  const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      if (!file.mimetype.startsWith('image/')) {
        console.log('Invalid file type:', file.mimetype);
        return cb(new Error('Only images are allowed'), false);
      }
      cb(null, true);
    }
  });

  // File to store house data
  const DATA_FILE = path.join(__dirname, 'houses.json');

  // Read data helper
  const readData = () => {
    try {
      if (!fs.existsSync(DATA_FILE)) {
        console.log('Data file not found, returning empty array');
        return [];
      }
      const content = fs.readFileSync(DATA_FILE);
      return JSON.parse(content || '[]');
    } catch (error) {
      console.error('Error reading data file:', error);
      return [];
    }
  };

  // Write data helper
  const writeData = (data) => {
    try {
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
      console.log('Data saved successfully');
    } catch (error) {
      console.error('Error writing data file:', error);
    }
  };

  // GET all houses
  app.get('/api/houses', (req, res) => {
    console.log('GET /api/houses called');
    const houses = readData();
    res.json(houses);
  });

  // POST new house (with image upload)
  app.post('/api/houses', upload.single('img'), (req, res) => {
    console.log('POST /api/houses called with body:', req.body, 'file:', req.file);
    const { title, desc } = req.body;
    const file = req.file;

    if (!title || !desc || !file) {
      console.log('Missing fields or image in POST /api/houses');
      return res.status(400).json({ error: 'Missing fields or image' });
    }

    const imageUrl = `http://localhost:${PORT}/uploads/${file.filename}`;
    const houses = readData();

    const newHouse = {
      id: Date.now().toString(),
      title,
      desc,
      img: imageUrl
    };

    houses.push(newHouse);
    writeData(houses);

    res.status(201).json(newHouse);
  });

  // PUT update house
  app.put('/api/houses/:id', upload.single('img'), (req, res) => {
    console.log('PUT /api/houses/:id called with body:', req.body, 'file:', req.file);
    const { id } = req.params;
    const { title, desc } = req.body;
    const file = req.file;

    const houses = readData();
    const index = houses.findIndex(h => h.id === id);
    if (index === -1) {
      console.log(`House with id ${id} not found`);
      return res.status(404).json({ error: 'House not found' });
    }

    const updatedHouse = { ...houses[index], title, desc };

    if (file) {
      const imageUrl = `http://localhost:${PORT}/uploads/${file.filename}`;
      updatedHouse.img = imageUrl;
    }

    houses[index] = updatedHouse;
    writeData(houses);
    res.json(updatedHouse);
  });

  // DELETE a house
  app.delete('/api/houses/:id', (req, res) => {
    console.log('DELETE /api/houses/:id called');
    const { id } = req.params;
    const houses = readData();
    const filtered = houses.filter(h => h.id !== id);
    writeData(filtered);
    res.json({ success: true });
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.error('Server failed to start:', error);
}