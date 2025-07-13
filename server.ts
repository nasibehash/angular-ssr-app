import express from 'express';
import { AngularNodeAppEngine, writeResponseToNodeResponse } from '@angular/ssr/node';

const app = express();
const angularApp = new AngularNodeAppEngine();

app.use(express.json()); // برای اینکه body رو بخونه

// 🔥 API custom خودت اینجاست
app.post('/api/welcome', (req, res) => {
  console.log('✅ POST /api/welcome called!');
  const name = req.body.name || 'کاربر';
  res.json({ message: `سلام ${name} عزیز، خوش اومدی! 💖` });
});

// 👇 مهم‌ترین بخش برای لاگ گرفتن
app.use((req, res, next) => {
  console.log('📥 Express middleware received request:', req.method, req.url);
  next();
});

// 👇 Angular SSR برای باقی مسیرها
app.use('/**', async (req, res, next) => {
  try {
    const response = await angularApp.handle(req);
    if (response) {
      writeResponseToNodeResponse(response, res);
    } else {
      next();
    }
  } catch (err) {
    console.error('❌ SSR error:', err);
    next(err);
  }
});

// 👂 Start server
const port = process.env['PORT'] || 4000;
app.listen(port, () => {
  console.log(`🔥 Node Express server listening on http://localhost:${port}`);
});
