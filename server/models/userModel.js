const db = require('../config/db');

const User = {
  // إنشاء يوزر جديد
  create: async (name, email, hashedPassword, role) => {
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );
    return result;
  },

  // البحث بالإيميل
  findByEmail: async (email) => {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return rows[0];
  },

  // البحث بالـ ID
  findById: async (id) => {
    const [rows] = await db.execute(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return rows[0];
  },

  // حفظ الـ 2FA secret
  save2FASecret: async (userId, secret) => {
    await db.execute(
      'UPDATE users SET two_fa_secret = ?, is_2fa_setup = TRUE WHERE id = ?',
      [secret, userId]
    );
  },
};

module.exports = User;