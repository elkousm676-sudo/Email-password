const express = require('express');
const fs = require('fs'); // باش نخزنوا البيانات ف JSON
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// middleware
app.use(bodyParser.json());
app.use(express.static('public')); // باش نخدمو ملفات HTML, CSS, JS

// route باش نجيبوا كل البيانات
app.get('/api/users', (req, res) => {
  let data = JSON.parse(fs.readFileSync('data.json', 'utf-8') || '[]');
  res.json(data);
});

// route باش نسجلوا مستخدم جديد
app.post('/api/users', (req, res) => {
  const { mail, pass } = req.body;

  // تحقق من شكل gmail
  let emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!emailPattern.test(mail)) {
    return res.status(400).json({ error: "Gmail غير صالح" });
  }

  // قراءة البيانات القديمة
  let data = JSON.parse(fs.readFileSync('data.json', 'utf-8') || '[]');

  // إضافة المستخدم الجديد
  data.push({ mail, pass });

  // تخزين في JSON
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));

  res.json({ success: true, data });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
