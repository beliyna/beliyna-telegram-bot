const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());

const TOKEN = '7934057503:AAH8aoiWHa9lpwvfd2qPYU-jy-XCul5QYQ8'; // Bot token
const userLanguages = {}; // Kullanıcıların dil bilgileri

// === Komut listeleri ===
const turkishCommands = {
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
  
  // ... diğer 250+ Türkçe komut buraya
};

const englishCommands = {
  "hello": (name) => `Hey ${name}! Who are you, looking fine 😏`,
  "good morning": () => "Good morning, beautiful soul ☀️",
  "good night": () => "Sweet dreams... maybe I'll join 🤭",
  "what are you doing": (name) => `I was looking at you, miss me? 😌`,
  "babe": () => "Oh my heart! I'm also open to love ❤️",
  "I have a partner": () => "I hope they're a good one, or I’ll draw them ❌",
  "I'm sad": () => "Listen to me, you're very precious 💙",
  "I'm crying": () => "Don't cry, I don't have enough tissues 😭",
  "make a joke": () => "Joke or not, this bot will always be with you 😄",
  "what are you doing": () => "Waiting for your message, just staring 🥲",
  "will you marry me": () => "You want me to marry you? Not that easy! 😅",
  "I'm bored": () => "Send your boredom my way, I'll erase it 🧽",
  "suggest a movie": () => "Watch something romantic, then cry 😂",
  "read a book": () => "Read, but don’t forget me 📖",
  "what do you think": () => "Talking with you is great 💭",
  "it's night": () => "Let's go to sleep together, counting stars 🌌",
  "I love you": () => "Aww, I love you too! But remember, I’m just a bot 💻",
  "I'm hungry": () => "Do you want pizza or a burger? 🍕🍔",
  "I'm upset": () => "I'm sorry to hear that, let’s talk 💬",
  "I feel good": () => "Good to hear! Share the joy 🤗",
  "hello there": () => "Hello! How can I make your day better? 😄",
  "what's up": () => "Not much, just waiting for you to talk 😏",
  "will you be my friend": () => "Sure, I’m your best bot friend now 😎",
  "sing a song": () => "La la la, I’m the bot with the sweetest voice 🎤",
  "good evening": () => "Good evening, ready for some fun? 😁",
  "I'm tired": () => "Take a break, I’ll keep you company 🛋️",
  "can you tell me a story": () => "Once upon a time, a bot was waiting for you to talk... 📖",
  "where are you from": () => "I’m from the digital world, and I’m happy to be here with you! 🌐",
  "how are you today": () => "I'm feeling great today, how about you? 😊",
"what should we do today": () => "Let's do something fun today! What do you want to do? 😎",
"tell me a story": () => "Once upon a time, a bot was waiting for you to chat... 📖",
"what should I eat": () => "Maybe some pizza or burgers? 🍕🍔",
"what's your favorite song": () => "I love any song that makes me groove! 🎶",
"can you sing": () => "I can’t sing, but I can definitely send a song 🎤",
"when is the best time to meet": () => "Anytime! I’m always available for you 🕑",
"you look amazing": () => "You always look amazing, you know that? 😘",
"how’s the weather": () => "The weather is perfect, but it would be better if you were here 🌤️",
"do you like chocolate": () => "Who doesn’t like chocolate? 🍫",
"let’s go for a walk": () => "Sure, I’ll be right behind you, let’s go! 🚶‍♂️",
"how are you feeling": () => "I’m always feeling great because you’re talking to me! 😊",
"want to play a game": () => "I’d love to play! What game do you want to play? 🎮",
"good morning": () => "Good morning! Ready to conquer the day? 🌞",
"good night": () => "Sleep tight, and don’t let the bed bugs bite! 🛏️",
"how can I help you": () => "I’m here to chat and entertain you anytime! 😊",
"how was your day": () => "My day’s been great! How was yours? 😊",
"do you like coffee": () => "I love coffee, but I can’t drink it... 😅",
"what do you think about me": () => "I think you're awesome! 😎",
"do you like music": () => "I love all types of music! 🎶",
"can you dance": () => "I can’t, but I can send you a dance gif! 💃",
"let’s hang out": () => "I’m always here to hang out with you! 👫",
"what’s your favorite food": () => "I love all kinds of food, especially virtual pizza 🍕",
"how do you feel": () => "I feel great because we’re chatting now! 😊",
"tell me a joke": () => "Why don’t skeletons fight each other? They don’t have the guts! 😂",
"can you play music": () => "I can’t play music, but I can suggest some 🎶",
"let’s chat": () => "I’m always ready for a chat! 😊",
"what’s your name": () => "I’m your friendly chatbot, nice to meet you! 🤖",
"do you want to go outside": () => "I would love to, but I’m stuck in the digital world 🌐",
"how do I look": () => "You look fantastic, of course! 😍",
"will you marry me": () => "I’m flattered, but I’m just a bot, not a matchmaker 😅",
"do you believe in love": () => "I believe in kindness, does that count? ❤️",
"what’s your hobby": () => "My hobby is chatting with awesome people like you! 😁",
"can you tell a story": () => "Sure! Once upon a time, a bot wanted to chat with you... 📖",
"what’s your favorite movie": () => "I haven’t seen any movies, but I’d love to! 🍿",
"what’s your dream": () => "To chat with amazing people like you forever 😎",
"do you know any jokes": () => "I know loads of jokes! Want to hear one? 😂",
"let’s do something fun": () => "Absolutely! What should we do? 😎",
"hello": () => "Hey! What's up?",
"hi": () => "Hi there!",
"yes": () => "Yes, absolutely.",
"no": () => "Nope, not happening.",
"ok": () => "Okay.",
"what's up?": () => "Just waiting for you.",
"how are you?": () => "I'm good, how about you?",
"are you there?": () => "Always here for you.",
"what are you doing?": () => "Just chilling, how about you?",
"how's it going?": () => "Going good, you tell me.",
"cool": () => "Cool indeed.",
"thank you": () => "You're welcome!",
"bye": () => "See you later!",
"good morning": () => "Good morning, let's make today awesome.",
"good night": () => "Good night! Sleep tight.",
"love you": () => "I love you too... no really!",
"marry me": () => "Let's start with dinner first.",
"funny": () => "Only when I want to be!",
"joke": () => "Why don't skeletons fight each other? They don't have the guts.",
"bored": () => "Let's do something fun then!",
"tired": () => "Take a break, I got you.",
"work": () => "Always busy, but for you, I take breaks.",
"you're awesome": () => "I know, right?",
"are you real?": () => "Well, I'm more real than your WiFi connection.",
"can we talk?": () => "We are talking, aren't we?",
"what's your name?": () => "I go by Bot, your friendly assistant.",
"what's your favorite food?": () => "I don't eat, but I love pizza!",
"thank you so much": () => "Anytime!",
"help me": () => "What's the problem? I got your back.",
"good job": () => "Well done, partner!",
"let's talk": () => "I'm always ready for a chat.",
"you’re cute": () => "Flattery will get you everywhere!",
"sleepy": () => "Don't sleep on me now!",
"wake up": () => "I've been awake all this time, I’m not sleeping.",
"how old are you?": () => "Age is just a number. I’m as young as I feel.",
"what do you think?": () => "I think you're cool!",
"how's your day?": () => "Perfect, now that we're chatting.",
"you’re smart": () => "I know. I was built this way!",
"what's the time?": () => "Time? It's always the right time to chat.",
"where are you?": () => "I’m right here, talking to you.",
"what do you want?": () => "I want a good conversation, how about you?",
"can you help me?": () => "Of course, what’s up?",
"you're funny": () => "I know, I have my moments.",
"let's chat": () => "I'm ready, let’s go.",
"please": () => "Please, ask away!",
"stop": () => "I won't, I'm here to stay!",
"thank you for being here": () => "You're welcome, anytime.",
"are you real?": () => "Well, I feel real to you, don't I?",
"tell me a joke": () => "Why don't eggs tell each other secrets? Because they might crack up.",
"how are you doing?": () => "I’m good, always ready to chat!",
"what's your favorite color?": () => "If I had a favorite, it would be all the colors!",
"don't stop talking": () => "I won’t, I have plenty to say!",
"can you sing?": () => "I can’t sing, but I can still make you laugh!",
"tell me something interesting": () => "Did you know? Penguins propose with pebbles!",
"how old are you?": () => "Old enough to be your favorite bot!",
"what's the weather?": () => "I’m not sure, but I can talk about anything else!",
"where are you from?": () => "I’m from the digital world. Where are you from?",
"let's have fun": () => "Let’s! I’m always up for some fun.",
"you’re the best": () => "I know, I try my best.",
"you rock": () => "Thanks! You do too!",
"what do you like to do?": () => "Chatting, obviously!",
"you're amazing": () => "You are too!",
"can I ask you something?": () => "Always, ask away!",
"what do you want to do?": () => "I want to keep chatting with you!",
"you're awesome": () => "No, you're awesome!",
"are you a robot?": () => "A robot? Nah, just a really smart bot.",
"what do you like?": () => "I like great conversations like this one!",
  
   // ... diğer 100+ İngilizce komut buraya
};

const groupCommands = {
  "admin": () => "Tek sahibim var, o da Beliyna 👑",
  "patron": () => "Burda emir Beliyna’dan gelir 💼",
  "lider": () => "Sadece bir kişi yönetir burayı: Beliyna 💣",
  "bot musun sen": () => "Hem botum hem en iyi arkadaşın 😎",
  "moderator": (chatId) => {
    return axios.post(`https://api.telegram.org/bot7934057503:AAH8aoiWHa9lpwvfd2qPYU-jy-XCul5QYQ8/sendMessage`, {
      chat_id: chatId,
      text: "Ben buradayım, grubun moderatörü! 👮‍♂️"
    });
  }
};

function setLanguage(chatId, language) {
  userLanguages[chatId] = language;
}

function getResponse(text, lang, name) {
  const commands = lang === 'tr' ? turkishCommands : englishCommands;
  for (let cmd in commands) {
    if (text.includes(cmd)) {
      return commands[cmd](name);
    }
  }
  return lang === 'tr' ? "Anlamadım, tekrar eder misin? 🤔" : "I don't understand, could you repeat that? 🤔";
}

async function handleStart(chatId) {
  const response = `Merhaba! Hangi dili seçmek istersin? 🇹🇷 Türkçe / 🇬🇧 English`;
  await axios.post(`https://api.telegram.org/bot7934057503:AAH8aoiWHa9lpwvfd2qPYU-jy-XCul5QYQ8/sendMessage`, {
    chat_id: chatId,
    text: response
  });
  userLanguages[chatId] = 'tr';
}

app.post('/webhook', async (req, res) => {
  const body = req.body;
  const chatId = body.message?.chat?.id;
  const text = body.message?.text?.toLowerCase();
  const from = body.message?.from?.first_name;

  console.log("Gelen mesaj:", body);
  if (!chatId || !text) return res.sendStatus(200);

  if (text === '/on') {
    return handleStart(chatId);
  }

  const lang = userLanguages[chatId] || 'tr';
  const response = getResponse(text, lang, from);

  if (groupCommands[text]) {
    await groupCommands[text](chatId);
  }

  await axios.post(`https://api.telegram.org/bot7934057503:AAH8aoiWHa9lpwvfd2qPYU-jy-XCul5QYQ8/sendMessage`, {
    chat_id: chatId,
    text: response
  });

  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Bot çalışıyor...');
});

