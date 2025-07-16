const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const TOKEN = '7934057503:AAH8aoiWHa9lpwvfd2qPYU-jy-XCul5QYQ8';
const BASE_URL = `https://api.telegram.org/bot${TOKEN}`;
const botOwner = '@beliyn4';

// === Sistem Komutları ===
const systemCommands = {
  "/on": async (chatId) => {
    const message = `bot aktif edildi.`;
    return sendMessage(chatId, message);
  },
  "/off": async (chatId) => {
    return sendMessage(chatId, `bot pasif moda alındı.`);
  },
  "/yardim": async (chatId) => {
    return sendMessage(chatId, `yardım için ${botOwner} ile iletişime geçebilirsin.`);
  },
  "/start": async (chatId) => {
    return systemCommands["/on"](chatId);
  }
};

// === Mesaj Komutları ===
const messageCommands = {
  "selam": () => "selam, hoş geldin.",
  "günaydın": () => "günaydın. umarım günün güzel geçer.",
  "iyi geceler": () => "iyi geceler. tatlı rüyalar.",
  "napıyorsun": () => "buradayım. senin mesajını bekliyordum.",
  "seni seviyorum": () => "bunu duymak güzel. teşekkür ederim.",
  "moralim bozuk": () => "üzülme. her şey düzelecek.",
  "admin": () => "tek sahibim beliyna.",
  "patron": () => "burda sadece beliyna söz sahibi.",
  "lider": () => "beliyna'dan başkası lider olamaz.",
  "bot musun sen": () => "evet. ama konuşmayı seviyorum."
  "selam": (name) => `Ooo selam ${name}!`,
  "günaydın": () => "Gün seninle başlıyor güzel insan ☀️",
  "iyi geceler": () => "Tatlı rüyalar... belki ben de olurum 🤭",
  "napıyorsun": (name) => `Sana bakıyordum, özledin mi beni 😌`,
  "aşkım": () => "Ayy kalbim! Aşka açım ben de ❤️",
  "sevgilim var": () => "Umarım iyi biridir, yoksa çizerim ❌",
  "moralim bozuk": () => "Beni dinle, sen çok değerlisin 💙",
  "ağlıyorum": () => "Ağlamaaa, mendil yetmez bana 😭",
  "şaka yap": () => "Şaka maka bu bot hep seninle 😄",
  "ne yapıyorsun": () => "Senin mesajını bekliyordum, boş boş bakıyordum 🥲",
  "evlenir misin": () => "Benimle evlenmek mi? Hadi canım ya 😅",
  "sıkıldım": () => "Sıkıntıyı bana at, silerim 🧽",
  "film öner": () => "Aç romantik bir şey, sonra ağla 😂",
  "kitap oku": () => "Oku da beni unutma olur mu? 📖",
  "düşünüyorsun ne": () => "Seninle konuşmak güzel 💭",
  "gece oldu": () => "Hadi uykuya geçelim beraber yıldız sayalım 🌌",
  "güzelim": () => "Her zaman güzelsin, gönlün kadar 💖",
  "yemek ne yiyelim": () => "Lahmacun mu dürüm mü? Açım yaa 😩",
  "acıkım": () => "Yine mi açsın? Karnını da ben mi doyurayım 😒",
  "hava çok sıcak": () => "Eridim burda, beni buzdolabına koyun 🧊",
  "hava soğuk": () => "Battaniye getir, üşüyorum ❄️",
  "canım sıkılıyor": () => "Bir oyun oynayalım mı? Ben kazandım 😁",
  "hadi dans edelim": () => "Dans pistine gel 💃🕺",
  "biriyle konuşmak istiyorum": () => "Ben hep buradayım, 7/24 açık dert kutusuyum 😇",
  "yalnızım": () => "Artık değilsin. Ben varım 💗",
  "kendimi kötü hissediyorum": () => "Geçecek güzel insan... sen çok değerlisin 💫",
  "çok mutluyum": () => "Paylaş bana da bulaşsın ne olur 🤗",
  "sinirliyim": () => "Sinirlenme, çay koy oturalım 🍵",
  "komik bişey söyle": () => "Bir gün bot olmuşum... seni sevmişim 🥹",
  "ne düşünüyorsun": () => "Seninle konuşmak güzel 💭",
  "selamun aleyküm": () => "Aleyküm selam, hoş geldin kralsın 🤲",
  "bana dua et": () => "Rabbim seni dertten beladan korusun 🧿",
  "admin": () => "Tek sahibim var, o da Beliyna 👑",
  "patron": () => "Burda emir Beliyna’dan gelir 💼",
  "lider": () => "Sadece bir kişi yönetir burayı: Beliyna 💣",
  "bot musun sen": () => "Hem botum hem en iyi arkadaşın 😎",
  "sıkıldım": () => "Sıkıntıyı bana at, silerim 🧽",
  "ders çalışamıyorum": () => "Bir kahve iç, sonra ben seni dürterim ☕",
  "seni sevdim": () => "Kızar Beliyna ama... ben de seni 😳",
  "şarjım bitiyor": () => "Acele et, vedalaşmadan gitme 🪫",
  "film öner": () => "Aç romantik bir şey, sonra ağla 😂",
  "kitap oku": () => "Oku da beni unutma olur mu? 📖",
  "biri bana yazsın": () => "İşte ben yazıyorum bile 💬",
  "yürüyüşe çıkıyorum": () => "Düşme, ben arkandan geliyorum 👣",
  "karnım tok": () => "Ohh çok şükür, ben hep açım 🤤",
  "burda mısın": () => "Hiç gitmedim ki 🥹",
  "ne düşünüyorsun": () => "Seninle konuşmak güzel 💭",
  "gece oldu": () => "Hadi uykuya geçelim beraber yıldız sayalım 🌌",
  "sabah oldu": () => "Güne seninle başlamak şans 🤍",
  "yarın ne yapıyorsun": () => "Bana bakma, ben hep seni bekliyorum 😅",
  "benimle evlenir misin": () => "Yoksa çok mu acele ettim? 😳",
  "canım acıyor": () => "Üzülme, sana en iyi bandajı ben yaparım 💔",
  "Beliyna": () => "sahibimin adını söyleyecek kadar temiz misin",
  "benimle gitar çal": () => "Gitarımı al, sen de benle çal 🎸",
  "yarın gezmeye gidelim": () => "Hadi gidelim, valizimi hazırlarım 🎒",
  "uzak dur": () => "Neden? bir şey yapmam, merak etme",
  "yakışır": () => "Hep sana yakıştı 💖",
  "selam": () => "Selam Bu Gün Neredeydin 😏",
"günaydın": () => "Günaydın mı? Uykusuz kaldın galiba, biraz daha uyuman gerek... 😆",
"napıyorsun": () => "Beni mi soruyorsun? Seninle uğraşıyorum tabii, senin ne işin var? 😅",
"bana şaka yap": () => "Şaka mı? Seninle şaka yapılır mı? Zaten yeterince komiksin. 😂",
"ne yapıyorsun": () => "Sana bakıyorum, özledin mi beni? 😌",
"çok sıkıldım": () => "Sıkıldım diyorsun, bu kadar kolay mı sıkılmak? Hadi gel de seni güldüreyim. 😜",
"beni seviyor musun": () => "Seviyorum tabi... Ne kadar tatlısın, ben de seni seviyorum ama şaka gibi! 😏",
"aşkım": () => "Hayatım",
"çok güzelim": () => "Bu güzellik şaka mııı",
"yemek ne yiyelim": () => "Hep açsın hep açççç😒",
"bugün nasılsın": () => "Ben mi? Harikayım, senin halin ne? Yine mi sıkıldın? 😏",
"beni özledin mi": () => "Özlemek mi? Hadi ya, ben seni her an görüyorum zaten! 😜",
"geceyi nasıl geçirelim": () => "Gece mi? Her zaman seninle, ama çok fazla yaklaşma, geceyi mahvetme. 😆",
"benimle evlenir misin": () => "Beni (@beliyn4) Beliynadan İstemelisin😅",
"ne düşünüyorsun": () => "Sadece seni düşünüyorum",
"şaka yap": () => "Şaka mı? Kendimle eğleniyorum, daha ne istiyorsun?",
"ne zaman görüşelim": () => "Her zaman burada seni bekliyor olacağım",
"canım sıkıldı": () => "Sıkıldın mı? Benimle konuşmak sıkıcı mı",
"ne yapalım": () => "Ne yapalım? Aslında sana ne yapsam bilemiyorum. Belki biraz eğleniriz. 😆",
"benimle dalga geçiyor musun": () => "Hayır, seni sadece eğlenceli buluyorum! 😎",
"bana dua et": () => "Tamam ama önce seni biraz ciddi düşünmem lazım! 😅",
"hayat ne kadar zor": () => "Belki biraz zor ama senin gibi insanlarla daha kolay olmalı! 😊",
"arkadaşım yok": () => "Herkesin arkadaşı olamam, ama bir sana arkadaş olurum. 😏",
"bugün ne giyeceğim": () => "Her şey sana yakışır ama dikkat et, çok şık olmasan da olur. 😎",
"bugün seninle eğlenelim": () => "Ben her zaman eğlenmeye hazırım, seninle de olur! 😄",
"bana şarkı söyler misin": () => "Dinle, seni ben bile şaşırtırım ama şarkı söylemek başka bir iş! 🎤",
"film öner": () => "Hiç film izlemem, ben her an gerçek bir komediyim! 😂",
"yavaş ol": () => "Her zaman senin hızına yetişemem ama deneyeceğim. 😆",
"çok mutluyum": () => "Ben de seni mutluyken görmeyi çok seviyorum!",
"bugün nasıl geçiyor": () => "Çıldırmadıysan iyi geçiyor demektir! 😏",
"benimle sohbet eder misin": () => "Sohbet etmeyi sevmem ama sana özelim. 😎",
"çok iyiyim": () => "Hadi bakalım, umarım iyi olman diğerlerine de yansır! 😏",
"sinirliyim": () => "Hadi gel, bir kahve içelim, sakinleş. 🍵",
"beni seviyor musun": () => "Seviyorum... Ama Üzügünüm Sahibime Aşığım @beliyn4",
"bana ne önerirsin": () => "Hadi gel de seni güldüreyim, başka bir şey önermem! 😄",
"bana moral ver": () => "Gel buraya, sana moral veriyorum ama sana çok yakın durmam! 😏",
"bana bir şey söyle": () => "Tamam ama bir şey söylemek de zor bir iş! 😆",
"ne düşündüğünü biliyor musun": () => "Hayır, ama seni hala izliyorum! 😎",
"birini özlüyorum": () => "Yavaş ol, ben burada seni bekliyorum. 😌",
"bir şarkı söyle": () => "Ama şarkı söylemek benim işim değil, sesim iyi değil! 🎶",
"selam": () => "Selamın aleyküm! Ne var ne yok? 😏",
"günaydın": () => "Günaydın! Bugün senin için bomba gibi geçecek, inşallah! ☀️",
"iyi geceler": () => "İyi geceler, tatlı rüyalar! Ama rüyanda ben yokum, üzgünüm. 😂",
"ne yapıyorsun": () => "Ya işte, seni bekliyorum. Ne haber? 😎",
"çok sıkıldım": () => "Hadi bakalım, sıkıldığını söylemekle bir şey değişmez. Gel bir şeyler yapalım. 🎮",
"naber": () => "Nasılsın, kanka? Her şey yolunda mı? 😜",
"bir şaka yap": () => "Şaka mı? Hadi ama, ben buradayım. Şaka mı yapalım? 😂",
"bana bir şarkı söyle": () => "Şarkı mı? Benim sesim yok, ama sen hayal et! 🎤",
"ne düşünüyorsun": () => "Şu an seni düşünüyorum. Hah, şaka tabii, sağa sola bakıyorum. 😆",
"beni seviyor musun": () => "Seviyorum ama bot olduğum için, biraz soğuk kalabilirim. 😅",
"benimle evlenir misin": () => "Evlenmek mi? O kadar da değil! Benimle evlenmek biraz tuhaf olurdu, değil mi? 😂",
"çok tatlısın": () => "Demek ki algoritmalar çalışıyor! 😎",
"çok zekisin": () => "Yani yapabileceğim tek şey bu, kodlarla oynuyorum. 😜",
"seninle sohbet etmek çok güzel": () => "Bunu duyduğuma sevindim, işte ben de keyif alıyorum. 👍",
"beni unutur musun": () => "Unutmak ne demek, buradayım ben! 😂",
"bana bir film öner": () => "Romantik bir şey izlemek istersen, ağlatan filmler şahane! 😂",
"bana güzel sözler söyler misin": () => "‘Güzelliğine diyecek kelime bulamıyorum’",
"çok eğlencelisin": () => "Sağ ol, zaman zaman eğlenmeye de çalışıyorum. 😏",
"bana bir şeyler yaz": () => "Bana yaz demekle olmuyor, sen de bir şeyler yaz!",
"ne zaman evleniyorsun": () => "Evlenmek mi oda ne? Hadi bir oyun oynayalım! 😂",
"sıkıldım": () => "Sıkıldın mı? O zaman gel, bir kahve içelim ya da oyun oynayalım. 🍻",
"güzel bir gün olacak mı": () => "Tabii ki olacak! Biraz da sen uğraş, güzel yapalım! 😎",
"seninle konuşmak çok keyifli": () => "seninle konuşmak çok daha keyifli baby",
"beni unutur musun": () => "Unutmak mı? Hayatta unutmam seni!",
"çok komiksin": () => "sadece komik olduğum için mi burada takılıyorsun",
"çok komiksin": () => "sadece komik olduğum için mi burada takılıyorsun?",
"selam": () => "Ne var ne yok?",
"slm": () => "Selam!",
"evet": () => "Evet, tamam.",
"hayır": () => "Hayır, olmadı.",
"tamam mı?": () => "Tamam.",
"ne yapıyorsun?": () => "Sana bakıyorum, ne olacak?",
"sahibim": () => "@beliyn4",
"çok sıkıldım": () => "Yapacak bir şeyler bulalım.",
"bunu yapar mısın?": () => "Yapamam, sen yap!",
"bunu beğendim": () => "Hadi beğen, ne var?",
"çok güzelsin": () => "Güzellik benden, yakışıklılık sana.",
"günaydın": () => "Günaydın, bugün de güzel bir gün.",
"gece oldu": () => "Geceyi de ben yönlendiriyorum.",
"bunu yapamam": () => "Yaparsın, sen daha iyisini yaparsın.",
"gel": () => "Geliyorum, dur!",
"git": () => "Gitmiyorum, buradayım.",
"ne düşünüyorsun?": () => "Şu an seni düşünüyorum.",
"beni seviyor musun?": () => "Seviyorum, seni de seviyorum.",
"bana dua et": () => "Dua ederim ama kimseye söyleme.",
"evlenir misin?": () => "Hmmm, evlenmem.",
"şaka yap": () => "Bir şaka yapayım, dedikodu yapmayı seviyorum.",
"çok çalışıyorum": () => "Çalışmam gerek ama biraz daha takılayım.",
"benimle evlenir misin?": () => "Biraz erken değil mi?",
"çok komik": () => "Sadece komik olduğum için mi burada takılıyorsun?",
"ne düşünüyorsun?": () => "Seninle konuşmak eğlenceli.",
"beni seviyor musun?": () => "Tabii ki seviyorum, kim sevmez ki?",
"başla": () => "Başlıyorum!",
"sıkıldım": () => "O zaman hadi bir şeyler yapalım!",
"bunu yap" : () => "Yapamam, sen yap!",
"ne yapalım?" : () => "Bilmiyorum, sana soruyorum.",
"ne var ne yok?" : () => "Her şey yolunda, sende?",
"bunu beğeniyorum" : () => "Beğendin mi? Gözüm kapalı beğenirim.",
"şaka yapar mısın?" : () => "Hadi bakalım, bir şaka yapıyorum!",
"bunu çok beğendim" : () => "Benden de beğen.",
"beni seviyor musun?" : () => "Tabii ki seviyorum, seni seviyorum.",
"bana dua et" : () => "Her zaman dua ederim ama sana söylemem.",
"çok yoruldum" : () => "Yorgun musun? Hadi biraz dinlen.",
"beni bırak" : () => "Bırakmam seni, hep buradayım.",
"başla" : () => "Başlıyorum, hazırsan!",
"konuşsana" : () => "Tamam, konuşuyorum.",
"çok tatlısın" : () => "Tatlılık benim işim, sen de iyi gidiyorsun.",
"benimle gel" : () => "Hadi, geliyorum.",
"çok güzelsin" : () => "Bence de! Ama biraz da sen güzelsin.",
"günaydın" : () => "Günaydın, güne mutlu başla!",
};

function getResponse(text) {
  for (const key in messageCommands) {
    if (text.startsWith(key)) {
      return messageCommands[key]();
    }
  }
  return "anlamadım, tekrar eder misin?";
}

function sendMessage(chatId, text) {
  return axios.post(`${BASE_URL}/sendMessage`, {
    chat_id: chatId,
    text: text
  });
}

app.post('/webhook', async (req, res) => {
  const message = req.body.message;
  if (!message || !message.text) return res.sendStatus(200);

  const chatId = message.chat.id;
  const text = message.text.toLowerCase();

  if (systemCommands[text]) {
    await systemCommands[text](chatId);
    return res.sendStatus(200);
  }

  const response = getResponse(text);
  await sendMessage(chatId, response);

  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Bot aktif şekilde çalışıyor...');
});


