const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const { register } = require('./config/metrics');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', register.contentType);
    res.end(await register.metrics());
  } catch (err) {
    res.status(500).end(err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 