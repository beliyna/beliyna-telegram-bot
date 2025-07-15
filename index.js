const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const TOKEN = 'BOT_TOKENINI_BURAYA_YAZ'; // ← BotFather’dan aldığın token buraya

app.post('/', async (req, res) => {
  const msg = req.body.message;
  if (!msg || !msg.text) return res.sendStatus(200);

  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase();

  let reply = 'Merhaba!';
  if (text.includes('selam')) reply = 'Aleyküm selam!';
  else if (text.includes('günaydın')) reply = 'Gün seninle güzel!';
  else if (text.includes('patron') || text.includes('admin') || text.includes('mevki')) reply = 'Tek sahibim Beliyna ❤️';

  await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    chat_id: chatId,
    text: reply,
  });

  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Bot çalışıyor...');
});
