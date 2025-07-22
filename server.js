const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory incident store
let incidents = [];

// API to get all incidents
app.get('/api/incidents', (req, res) => {
  res.json(incidents);
});

// API to add a new incident
app.post('/api/incidents', (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const incident = {
    id: Date.now(),
    title,
    description: description || '',
    createdAt: new Date()
  };
  incidents.push(incident);
  res.status(201).json(incident);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
