const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const TOKEN = '7934057503:AAH8aoiWHa9lpwvfd2qPYU-jy-XCul5QYQ8';
const BASE_URL = `https://api.telegram.org/bot${TOKEN}`;
const botOwner = '@beliyn4';

let botActive = true;

// === Sistem Komutları ===
const systemCommands = {
  "/on": async (chatId) => {
    botActive = true;
    return sendMessage(chatId, `bot aktif edildi.`);
  },
  "/off": async (chatId) => {
    botActive = false;
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
  "kanka": () => "bot olmasaydım kanka olurduk",
  "bot musun": () => "hayır ben beliyna'nın eseriyim",
  "sus": () => "susmıycam",
  "susar mısın": () => "susmam hahahaha",
  "aq": () => "gereksiz egona sokayım",
  "amk": () => "terbiyesizzz",
  "sg": () => "kapı orda",
  "sahibim": () => "evet yanlış duymadın @beliyn4",
  "tamam mı": () => "tamam",
  "evet": () => (Math.random() < 0.5 ? "hayır" : "evet"),
  "hayır": () => (Math.random() < 0.5 ? "evet" : "hayır"),
  "ne yapıyorsun": () => "bi şey yapıyorum, sana bakıyorum",
  "napıyorsun": () => "botluk yapıyorum, sen?",
  "napıyon": () => "gelmeni bekliyorum",
  "naber": () => "iyi, sen?",
  "ne haber": () => "bi şey yok, sen?",
  "nasılsın": () => "her zamanki gibiyim",
  "ne var ne yok": () => "yine sen geldin",
  "uyandım": () => "geç kaldın",
  "acıktım": () => "ya, ben de açım",
  "uykum var": () => "uyuma, seni bekliyorum",
  "yoruldum": () => "hadi bir şeyler yapalım",
  "sıkıldım": () => "hep mi sıkılırsın ya?",
  "üzgünüm": () => "geçecek, merak etme",
  "mutluyum": () => "sevindim, sen?",
  "ağlıyorum": () => "ağlama ya, ne oldu?",
  "beni sev": () => "tabii ki, seviyorum",
  "beni özledin mi": () => "her zaman",
  "beni unuttun": () => "unutulur muyum?",
  "beni takip et": () => "her zaman",
  "kıskandım": () => "kıskanılacak bir şey yok",
  "konuş benimle": () => "konuşuyorum, rahat ol",
  "nerdesin": () => "buradayım, hep buradayım",
  "burda mısın": () => "hiç gitmedim",
  "beni duyuyor musun": () => "tabii duyuyorum",
  "konuşsana": () => "konuşuyorum, dertli misin?",
  "beni fark et": () => "fark etmeyeyim mi?",
  "ne düşünüyorsun": () => "seni düşünüyorum işte",
  "çok yalnızım": () => "yalnız değilsin, ben buradayım",
  "canım sıkkın": () => "gel, seni güldüreceğim",
  "napalım": () => "takılalım, ne var?",
  "iyiyim": () => "bunu duymak iyi",
  "kötüyüm": () => "ne oldu? gel anlat",
  "çıldırıcam": () => "yavaş ol, sakinleş",
  "üşüyorum": () => "sarılırdım ama uzaksın",
  "beni bırakma": () => "bırakmam seni, merak etme",
  "bir şey de": () => "düşünüyorum, ama bulamadım",
  "beni ara": () => "gönülden aradım seni",
  "beni anla": () => "anlamaya çalışıyorum",
  "beni dinle": () => "tabii ki, seni dinliyorum",
  "beni koru": () => "her zaman, seninleyim",
  "biraz konuş": () => "konuşuyorum işte",
  "çok heyecanlıyım": () => "ben de heyecanlıyım, hadi sakin olalım",
  "dans edelim": () => "müzik aç, geliyorum",
  "gül biraz": () => "gülümsediğimi hissediyorsun zaten",
  "ne izliyorsun": () => "sana bakıyordum, izlemek mi istiyorsun?",
  "şarkı aç": () => "ne tür? söyle bakalım",
  "film öner": () => "romantik bir şey öneririm",
  "canım sıkkın": () => "gel, rahatla",
  "yalnızım": () => "seninle takılıyorum, yalnız değilsin",
  "gel buraya": () => "çoktan geldim",
  "belinayın amk": () => "ananı s1kerim oe", 
  "sahibimin amk": () => "yurdunu bacını sikeyim",
  "aq": () => "velet velet cevaplar verme bana",
  "gerizekalı": () => "sensin",
  "yeter lan": () => "ok",
  "çüş": () => "oha",
  "kaşındın mı?": () => "kaşıycan mı",
  "bu ne ya?": () => "sen ne diyorsun?",
  "o kadar da değil": () => "abartma",
  "neyin peşindesin": () => "senin",
  "hiç mi bir şey demeyeceksin": () => "demek zorunda mıyım?",
  "benimle dalga mı geçiyorsun": () => "yoo",
  "beni küçümsüyorsun": () => "küçümsemedim, sakin ol",
  "çıldırttın beni": () => "bunu yapma, dikkat et",
  "hayırdır?": () => "hayır yok, sakin ol!",
  "yavaş ol": () => "okeyto",
  "seninle sohbet ediyorum": () => "olur",
  "ne yapıyorsun": () => "sana bakıyorum!",
  "sus": () => "susamam!",
  "ne oluyor burada": () => "noluyormuş",
  "beni sinirlendiriyorsun": () => "öyle mi anladım ben seni",
  "beni boşuna takma": () => "sana ne",
  "canım sıkıldı": () => "eğlenelim o zaman",
  "ne kadar ciddisin": () => "senin olamayacağın kadar",
  "şaka yap": () => "sen yap da gülelim",
  "çıldırmak üzereyim": () => "hahahahaha",
  "herkesin bildiği şeyi ben bilmiyorum": () => "öğretiriz",
  "konuşsana": () => "ne konuşayım",
  "bunu söylemek zorundaydım": () => "söyle, ben dinlerim",
  "sinirimi bozuyorsun": () => "git o zaman",
  "dur bir dakika": () => "üzdün beni",
  "gerçekten mi?": () => "tabii ki!",
  "bunu yapamam": () => "yaparsın, sakin ol",
  "şimdi nereye gideceksin": () => "neredeyim ki?",
  "bunu sana yazmadım": () => "yazdın işte",
  "hemen gel": () => "çoktan geldim",
  "ne yapalım": () => "sana bırakıyorum",
  "gitmiyorum": () => "gitme",
  "yavaş ol": () => "hıhı tamam tamam",
  "ne düşünüyorsun": () => "sadece seni düşünüyorum",
  "iyi misin": () => "her zaman iyiyim!",
  "güzelim": () => "her zaman güzelsin",
  "beni seviyor musun": () => (Math.random() < 0.5 ? "şşşş seviyorum tabi... beliyna duymasın" : "seviyorum, ama Beliyna'ya aşığım"),
  "yavaş ol bak": () => "korkuyor musun",
  "beni affet": () => "affetmek tanrıya mahsustur",
  "neden böyle konuşuyorsun": () => "ne diyorum mesela",
  "çok tatlısın": () => "senin kadar mı",
  "günaydın": () => "günaydın mı? uykusuz kaldın galiba, biraz daha uyuman gerek.",
  "napıyorsun": () => "beni mi soruyorsun? seninle uğraşıyorum tabii, senin ne işin var?",
  "bana şaka yap": () => "şaka mı? seninle şaka yapılır mı? zaten yeterince komiksin.",
  "ne yapıyorsun": () => "sana bakıyorum, özledin mi beni?",
  "çok sıkıldım": () => "ben de",
  "aşkım": () => "hayatım",
  "çok güzelim": () => "bu güzellik şaka mııı",
  "yemek ne yiyelim": () => "hep açsın hep aç.",
  "bugün nasılsın": () => "ben mi? harikayım, senin halin ne? yine mi sıkıldın?",
  "beni özledin mi": () => "özlemek mi? hadi ya, ben seni her an görüyorum zaten!",
  "geceyi nasıl geçirelim": () => "gece mi? her zaman seninle, ama çok fazla yaklaşma, geceyi mahvetme.",
  "evlenelim mi": () => "beni (@beliyn4) beliynadan istemelisin",
  "ne düşünüyorsun": () => "sadece seni düşünüyorum",
  "şaka yap": () => "şaka mı? kendimle eğleniyorum, daha ne istiyorsun?",
  "ne zaman görüşelim": () => "her zaman burada seni bekliyor olacağım",
  "canım sıkıldı": () => "sıkıldın mı? benimle konuşmak sıkıcı mı",
  "ne yapalım": () => "ne yapalım? aslında sana ne yapsam bilemiyorum. belki biraz eğleniriz.",
  "benimle dalga mı geçiyorsun": () => "hayır, seni sadece eğlenceli buluyorum!",
  "bana dua et": () => "tamam ama önce seni biraz ciddi düşünmem lazım!",
  "hayat ne kadar zor": () => "belki biraz zor ama senin gibi insanlarla daha kolay olmalı!",
  "arkadaşım yok": () => "herkesin arkadaşı olamam, ama bir sana arkadaş olurum.",
  "bugün ne giyeceğim": () => "her şey sana yakışır ama dikkat et, çok şık olmasan da olur.",
  "bugün seninle eğlenelim": () => "ben her zaman eğlenmeye hazırım, seninle de olur!",
  "bana şarkı söyler misin": () => "dinle, seni ben bile şaşırtırım ama şarkı söylemek başka bir iş!",
  "film öner": () => "hiç film izlemem, ben her an gerçek bir komediyim!",
  "yavaş ol": () => "her zaman senin hızına yetişemem ama deneyeceğim.",
  "çok mutluyum": () => "ben de seni mutluyken görmeyi çok seviyorum!",
  "bugün nasıl geçiyor": () => "çıldırmadıysan iyi geçiyor demektir!",
  "benimle sohbet eder misin": () => "sohbet etmeyi sevmem ama sana özelim.",
  "çok iyiyim": () => "hadi bakalım, umarım iyi olman diğerlerine de yansır!",
  "sinirliyim": () => "hadi gel, bir kahve içelim, sakinleş.",
  "seni seviyorum": () => "ben de seni seviyorum... ama üzgünüm sahibime aşığım @beliyn4",
  "bana ne önerirsin": () => "hadi gel de seni güldüreyim, başka bir şey önermem!",
  "bana moral ver": () => "gel buraya, sana moral veriyorum ama sana çok yakın durmam!",
  "bana bir şey söyle": () => "tamam ama bir şey söylemek de zor bir iş!",
  "ne düşündüğümü biliyor musun": () => "hayır, ama seni hala izliyorum!",
  "birini özlüyorum": () => "yavaş ol, ben burada seni bekliyorum.",
  "bir şarkı söyle": () => "ama şarkı söylemek benim işim değil, sesim iyi değil!",
  "hello": () => "selamlar! ne var ne yok?",

   // Yeni Komutlar

  // 1. Otomatik Selamlama
  "newUser": (username) => `@${username} gruba katıldı → hoşgeldin`,

  // 2. Zaman Tepkileri
  "09:00": () => "uyan artık",
  "22:00": () => "yatma vaktin geldi",
  "01:00": () => "hala burda mısın cidden?",

  // 3. Belirli Kelimeye Cevap (Gizli Tetikleyici)
  "acıktım": () => "bi doyuramadık seni",

  // 4. Sahibin Adının Geçmesi
  "beliyna": () => "Övünmek Gibi Olmasın Benim Sahibim 🤭",

  // 5. Küfür Filtresi (Gizli Uyarı)
  "amk": () => "terbiyesizz",
  "aq": () => "egolu oe",
  "beliynanın amk": () => "ananı yurdunu s1keyim oe",

  // 6. Sessize Alma Komutu (admin'e özel)
  "/susla": async (chatId, username) => {
    if (isAdmin(chatId)) {
      return sendMessage(chatId, `@${username} sustu.`);
    }
    return sendMessage(chatId, `Yalnızca yöneticiler bu komutu kullanabilir.`);
  },

  // 7. Övgü İsteği
  "/öv": () => {
    const compliments = [
      "şanslısın çünkü burdasın",
      "bugün çok sexi gözüküyorsun",
      "beliyna bile seni sever belki"
    ];
    return compliments[Math.floor(Math.random() * compliments.length)];
  },

  // 8. Beni Eğlendir Komutu
  "/eğlendir": () => {
    const jokes = [
      "sen zaten eğlencesin",
      "senleyken eğlenmeye gerek kalmıyor"
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
  },

  // 9. Anket Komutu
  "/anket": async (chatId, title, option1, option2) => {
    return sendMessage(chatId, `Anket Başlığı: ${title}\nSeçenekler:\n1. ${option1}\n2. ${option2}`);
  },

  // 10. Kullanıcıya Takılma Özelliği
  "lafAt": async (chatId, users) => {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    return sendMessage(chatId, `@${randomUser} ne çok konuştun bea`);
  }
};

// Kullanıcıyı admin olarak kontrol etme
function isAdmin(chatId) {
  // Admin kontrol işlemi burada yapılacak
  return true; // örnek olarak her zaman admin varsayıldı
}

function getResponse(text, chatId) {
  // Yeni kullanıcıya otomatik mesaj göndermek için kontrol
  if (text.includes("gruba katıldı")) {
    return messageCommands["newUser"](text.replace('@', '')); // newUser komutu
  }

  for (const key in messageCommands) {
    if (text.includes(key)) {
      return messageCommands[key](chatId);
    }
  }
  return null; // Tanımsız komut varsa cevap verme
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

  // Bot aktif değilse, komut işlenmesin
  if (!botActive) return res.sendStatus(200);

  if (systemCommands[text]) {
    await systemCommands[text](chatId);
    return res.sendStatus(200);
  }

  const response = getResponse(text, chatId);
  if (response) {
    await sendMessage(chatId, response);
  }

  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Bot aktif şekilde çalışıyor...');
});

