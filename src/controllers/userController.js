const db = require('../config/database');
const { metrics } = require('../config/metrics');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const [users] = await db.query('SELECT * FROM users');
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const [user] = await db.query('SELECT * FROM users WHERE id = ?', [req.params.id]);
      if (user.length === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json(user[0]);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const [result] = await db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password]
      );
      res.status(201).json({ id: result.insertId, name, email });
    } catch (error) {
      metrics.userCreationErrors.inc({
        error_type: error.code === 'ER_DUP_ENTRY' ? 'duplicate_email' : 'unknown'
      });
      res.status(500).json({ message: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const [result] = await db.query(
        'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
        [name, email, password, req.params.id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      res.json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const [result] = await db.query('DELETE FROM users WHERE id = ?', [req.params.id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuário não encontrado' });
      }
      metrics.usersDeleted.inc();
      res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = userController; 