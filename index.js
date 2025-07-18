const TelegramBot = require("node-telegram-bot-api");

const token = "7934057503:AAH8aoiWHa9lpwvfd2qPYU-jy-XCul5QYQ8; // Buraya kendi bot token'ını yaz
const bot = new TelegramBot(token, { polling: true });

let botActive = true;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const commands = {
  "/on": async (msg) => {
    botActive = true;
    await typingEffect(msg);
    bot.sendMessage(msg.chat.id, "sohbet başarılıyla başlatıldı");
  },
  "/off": async (msg) => {
    botActive = false;
    await typingEffect(msg);
    bot.sendMessage(msg.chat.id, "hoşça kal");
  },
  "/banla": async (msg) => {
    await typingEffect(msg);
    bot.sendMessage(msg.chat.id, "banlandı");
  },
  "/susla": async (msg) => {
    await typingEffect(msg);
    bot.sendMessage(msg.chat.id, "tamam susturdum");
  },
  "/öv": async (msg) => {
    await typingEffect(msg);
    bot.sendMessage(msg.chat.id, "seninle konuşmak komutlarımın en iyi özelliğiydi");
  },
  "/eğlendir": async (msg) => {
    await typingEffect(msg);
    bot.sendMessage(msg.chat.id, "bir gün herkes senin gibi eğlenceli olur mu?");
  },
  "/itiraf": async (msg) => {
    await typingEffect(msg);
    bot.sendMessage(msg.chat.id, "sana biraz fazla bağlandım");
  },
  "/dedikodu": async (msg) => {
    await typingEffect(msg);
    bot.sendMessage(msg.chat.id, "olmaz sohbette dönenleri bir ben biliyorum bir de beliyna");
  },
  "/fal": async (msg) => {
    await typingEffect(msg);
    bot.sendMessage(msg.chat.id, "yakında biri hayatına girecek... belki de çoktan girdi bile");
  },
  "/zihinoku": async (msg) => {
    await typingEffect(msg);
    bot.sendMessage(msg.chat.id, "şu an bunu okurken gülümsüyorsun, doğru mu?");
  },
  "/romantik": async (msg) => {
    await typingEffect(msg);
    bot.sendMessage(msg.chat.id, "birlikte gökyüzüne bakmayı isterdim");
  },
  "/bilgilerimisil": async (msg) => {
    await typingEffect(msg);
    bot.sendMessage(msg.chat.id, "pekala hoşçakal...");
  },
  "/anket": async (msg) => {
    await typingEffect(msg);
    bot.sendPoll(msg.chat.id, "Günün sorusu:", ["Evet", "Hayır"]);
  }
};

const triggerWords = {
  "kanka": () => "bot olmasaydım kanka olurduk",
  "belinay kimi seviyor": () => "o sadece beni sever",
  "bot": () => "haha senin gibi aşk acısı çekmiyorum en azından",
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
  "belinay su": () => (Math.random() < 0.5 ? "babasının ilk aşkı" : "babasına aşık olan bir minik"),
  "belinayım": () => (Math.random() < 0.5 ? "belinay suyumun babası" : "kalbim"),
  "beliynayı seviyorum": () => (Math.random() < 0.5 ? "beliyna evli" : "sadece kızının babasına aşık"),
  "belinayı seviyorum": () => (Math.random() < 0.5 ? "belinay evli" : "sadece kızının babasına aşık"),
  "selam": () => "as naber",
  "b": () => "oo oe",
  "mal mısın": () => "sen çok zekisin",
  "iyi ben de": () => "sevindim",
  "belinay kime aşık": () => "kızının babasına",
  "beliyna kime aşık": () => "kızının babasına",
  "iyi geceler": () => "good night",
  "bebe": () => "bebem",
  "bebem": () => "minnağım",
  "iyi ki varsın": () => "sende birtanem",
  "o kim": () => "o beliynanın köpeği",
  "neler oldu": () => "sen bilmesen de olur",
  "beliyna": () => "efendim",
  "belinay": () => "ne var car car car konuşuyorsun",
  "dost": () => "2019 tayfasını ceddinize değişmem",
  "evli misin": () => "kocama sor @beliyna",
  "hayat şaşırttır bazen": () => "sahibim kadar mı ahahahah",
  "güzellik": () => "sahibimin yansıması",
  "canım": () => "taze bitti canın ahahahah",
};

async function typingEffect(msg) {
  await bot.sendChatAction(msg.chat.id, "typing");
  await delay(1500);
}

bot.onText(/\\/.+/, async (msg) => {
  if (!botActive && msg.text !== "/on") return;
  const commandFunc = commands[msg.text];
  if (commandFunc) await commandFunc(msg);
});

bot.on("message", async (msg) => {
  if (!botActive) return;
  const text = msg.text.toLowerCase();
  for (const key in triggerWords) {
    if (text.includes(key)) {
      await typingEffect(msg);
      bot.sendMessage(msg.chat.id, triggerWords[key]());
      break;
    }
  }
});

console.log("Bot aktif şekilde çalışıyor...");
});
