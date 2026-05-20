import db from '../config/db.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    'INSERT INTO users(name,email,password) VALUES(?,?,?)',
    [name, email, hashedPassword],
    (err) => {
      if (err) throw err;
      res.redirect('/login');
    }
  );
};

export const loginUser = (req, res) => {
  const { email, password } = req.body;

  db.query(
    'SELECT * FROM users WHERE email=?',
    [email],
    async (err, result) => {
      if (err) throw err;

      if (result.length === 0) {
        return res.send('User not found');
      }

      const user = result[0];

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.send('Invalid Credentials');
      }

      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      res.redirect('/dashboard');
    }
  );
};

export const logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};