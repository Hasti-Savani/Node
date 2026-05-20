import db from '../config/db.js';

export const getProducts = (req, res) => {
  db.query('SELECT * FROM products', (err, result) => {
    if (err) throw err;

    res.render('products/index', {
      products: result,
    });
  });
};

export const createProduct = (req, res) => {
  const { title, price } = req.body;

  db.query(
    'INSERT INTO products(title,price) VALUES(?,?)',
    [title, price],
    (err) => {
      if (err) throw err;
      res.redirect('/products');
    }
  );
};

export const deleteProduct = (req, res) => {
  db.query(
    'DELETE FROM products WHERE id=?',
    [req.params.id],
    (err) => {
      if (err) throw err;
      res.redirect('/products');
    }
  );
};