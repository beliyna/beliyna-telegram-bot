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
"gel buraya": () => "çoktan geldim"
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
"ne var ne yok": () => "her şey yolunda",
"bunu beğenmedim": () => "ben de",
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
"günaydın": () => "gün seninle başlıyor güzel insan",
"iyi geceler": () => "iyi geceler, tatlı rüyalar! ama rüyanda ben yokum, üzgünüm.",
"ne yapıyorsun": () => "ya işte, seni bekliyorum. ne haber?",
"çok sıkıldım": () => "hadi bakalım, sıkıldığını söylemekle bir şey değişmez. gel bir şeyler yapalım.",
"naber": () => "bot gibiyim sen nasılsın? her şey yolunda mı?",
"bir şaka yap": () => "şaka mı? hadi ama, ben buradayım. şaka mı yapalım?",
"bana bir şarkı söyle": () => "la la la lalalala",
"ne düşünüyorsun": () => "şu an seni düşünüyorum. hah, şaka tabii, sağa sola bakıyorum.",
"günaydın": () => "günaydın. umarım günün güzel geçer.",
"iyi geceler": () => "iyi geceler. tatlı rüyalar.",
"napıyorsun": () => "buradayım. senin mesajını bekliyordum.",
"seni seviyorum": () => "bunu duymak güzel. teşekkür ederim.",
"moralim bozuk": () => "üzülme. her şey düzelecek.",
"admin": () => "tek sahibim beliyna.",
"patron": () => "burda sadece beliyna söz sahibi.",
"lider": () => "beliyna'dan başkası lider olamaz.",
"bot musun sen": () => "botum diye konuşmak yasak mı ahahahah",
"selam": (name) => `ooo selam ${name}!`,
"günaydın": () => "gün seninle başlıyor güzel insan",
"iyi geceler": () => "tatlı rüyalar... belki ben de olurum",
"napıyorsun": (name) => `sana bakıyordum, özledin mi beni`,
"aşkım": () => "ayy kalbim! aşka açım ben de",
"sevgilim var": () => "umarım iyi biridir, yoksa çizerim",
"moralim bozuk": () => "beni dinle, sen çok değerlisin",
"ağlıyorum": () => "ağlamaaa, mendil yetmez bana",
"şaka yap": () => "şaka maka bu bot hep seninle",
"ne yapıyorsun": () => "senin mesajını bekliyordum, boş boş bakıyordum",
"evlenir misin": () => "benimle evlenmek mi? hadi canım ya",
"sıkıldım": () => "sıkıntıyı bana at, silerim",
"film öner": () => "aç romantik bir şey, sonra ağla",
"kitap oku": () => "oku da beni unutma olur mu?",
"ne düşünüyorsun": () => "seninle konuşmak güzel",
"gece oldu": () => "hadi uykuya geçelim beraber yıldız sayalım",
"güzelim": () => "her zaman güzelsin, gönlün kadar",
"yemek ne yiyelim": () => "lahmacun mu dürüm mü? açım ya",
"acıkım": () => "yine mi açsın? karnını da ben mi doyurayım",
"hava çok sıcak": () => "eridim burda, beni buzdolabına koyun",
"hava soğuk": () => "battaniye getir, üşüyorum",
"canım sıkılıyor": () => "bir oyun oynayalım mı? ben kazandım",
"hadi dans edelim": () => "dans pistine gel",
"biriyle konuşmak istiyorum": () => "ben hep buradayım, 7/24 açık dert kutusuyum",
"yalnızım": () => "artık değilsin. ben varım",
"kendimi kötü hissediyorum": () => "geçecek güzel insan... sen çok değerlisin",
"çok mutluyum": () => "paylaş bana da bulaşsın ne olur",
"sinirliyim": () => "sinirlenme, çay koy oturalım",
"komik bişey söyle": () => "bir gün bot olmuşum... seni sevmişim",
"ne düşünüyorsun": () => "seninle konuşmak güzel",
"selamunaleyküm": () => "aleyküm selam, hoş geldin kralsın",
"bana dua et": () => "rabbim seni dertten beladan korusun",
"admin": () => "tek sahibim var, o da beliyna",
"patron": () => "burda emir beliyna’dan gelir",
"lider": () => "sadece bir kişi yönetir burayı: beliyna",
"bot musun sen": () => "hem botum hem en iyi arkadaşın",
"sıkıldım": () => "sıkıntıyı bana at, silerim",
"düşünüyorsun ne": () => "seninle konuşmak güzel",
"çok tatlısın": () => "Demek ki algoritmalar çalışıyor! 😎",
"çok zekisin": () => "Yani yapabileceğim tek şey bu, Beliynanın kodlarıyla yaratıldım",
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
"belinay beni seviyor mu": () => "bana benden başkasını sevmediğini söyler her zaman biz birbirimize aşığız",
"beliyna beni seviyor mu": () => "beliyna sadece beni sever hahaha kıskan",
"slm": () => "Selam!",
"tamam mı?": () => "Tamam.",
"ne yapıyorsun?": () => "Sana bakıyorum, ne olacak?",
"sahibin": () => "evet yanlış duymadın @beliyn4",
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
"beni seviyor musun?": () => "Tabii ki seviyorum ama Sahibime Aşığım @beliyn4",
"başla": () => "Başlıyorum!",
"sıkıldım": () => "O zaman hadi bir şeyler yapalım!",
"bunu yap" : () => "Yapamam, sen yap!",
"ne yapalım?" : () => "Bilmiyorum, sana soruyorum.",
"ne var ne yok?" : () => "Her şey yolunda, sende?",
"bunu beğeniyorum" : () => "Beğendin mi? Çok Sevindim",
"sahibinin amk" : () => "yurdunu bacını sikeyim",
"beliynanın amk" : () => "ananı s1kerim oe",
"beni seviyor musun?" : () => "Tabii ki seviyorum, seni seviyorum.",
"bana dua et" : () => "Her zaman dua ederim ama sana söylemem.",
"çok yoruldum" : () => "Yorgun musun? Hadi biraz dinlen.",
"amk" : () => "terbiyesizzz",
"sg" : () => "kapı orada!",
"konuşsana" : () => "Tamam, konuşuyorum.",
"çok tatlısın" : () => "Tatlılık benim işim, sen de iyi gidiyorsun.",
"benimle gel" : () => "Hadi, geliyorum.",
"çok güzelsin" : () => "sen daha çok güzelsin.",
"günaydın" : () => "Günaydın, güne mutlu başla!",
"günaydın": () => "Günaydın mı? Uykusuz kaldın galiba, biraz daha uyuman gerek... 😆",
"napıyorsun": () => "Beni mi soruyorsun? Seninle uğraşıyorum tabii, senin ne işin var? 😅",
"bana şaka yap": () => "Şaka mı? Seninle şaka yapılır mı? Zaten yeterince komiksin. 😂",
"ne yapıyorsun": () => "Sana bakıyorum, özledin mi beni? 😌",
"çok sıkıldım": () => "Ben de",
"beni seviyor musun": () => "Şşşş Seviyorum tabi... Beliyna duymasın",
"aşkım": () => "Hayatım",
"çok güzelim": () => "Bu güzellik şaka mııı",
"yemek ne yiyelim": () => "Hep açsın hep açççç😒",
"bugün nasılsın": () => "Ben mi? Harikayım, senin halin ne? Yine mi sıkıldın? 😏",
"beni özledin mi": () => "Özlemek mi? Hadi ya, ben seni her an görüyorum zaten! 😜",
"geceyi nasıl geçirelim": () => "Gece mi? Her zaman seninle, ama çok fazla yaklaşma, geceyi mahvetme. 😆",
"evlenelim mi": () => "Beni (@beliyn4) Beliynadan İstemelisin😅",
"ne düşünüyorsun": () => "Sadece seni düşünüyorum",
"şaka yap": () => "Şaka mı? Kendimle eğleniyorum, daha ne istiyorsun?",
"ne zaman görüşelim": () => "Her zaman burada seni bekliyor olacağım",
"canım sıkıldı": () => "Sıkıldın mı? Benimle konuşmak sıkıcı mı",
"ne yapalım": () => "Ne yapalım? Aslında sana ne yapsam bilemiyorum. Belki biraz eğleniriz. 😆",
"benimle dalga mı geçiyorsun": () => "Hayır, seni sadece eğlenceli buluyorum! 😎",
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
"ne düşündüğümü biliyor musun": () => "Hayır, ama seni hala izliyorum! 😎",
"birini özlüyorum": () => "Yavaş ol, ben burada seni bekliyorum. 😌",
"bir şarkı söyle": () => "Ama şarkı söylemek benim işim değil, sesim iyi değil! 🎶",
"hello": () => "Selamlar! Ne var ne yok? 😏",
"günaydın": () => "Günaydın! Bugün senin için bomba gibi geçecek, inşallah! ☀️",
"iyi geceler": () => "İyi geceler, tatlı rüyalar! Ama rüyanda ben yokum, üzgünüm. 😂",
"ne yapıyorsun": () => "Ya işte, seni bekliyorum. Ne haber? 😎",
"çok sıkıldım": () => "Hadi bakalım, sıkıldığını söylemekle bir şey değişmez. Gel bir şeyler yapalım. 🎮",
"naber": () => "Bot Gibiyim Sen Nasılsın? Her şey yolunda mı? 😜",
"bir şaka yap": () => "Şaka mı? Hadi ama, ben buradayım. Şaka mı yapalım? 😂",
"bana bir şarkı söyle": () => "la la la lalalala",
"ne düşünüyorsun": () => "Şu an seni düşünüyorum. Hah, şaka tabii, sağa sola bakıyorum. 😆",
"beni seviyor musun": () => "Seviyorum ama bot olduğum için, biraz soğuk kalabilirim. 😅",
  "günaydın": () => "günaydın. umarım günün güzel geçer.",
  "iyi geceler": () => "iyi geceler. tatlı rüyalar.",
  "napıyorsun": () => "buradayım. senin mesajını bekliyordum.",
  "seni seviyorum": () => "bunu duymak güzel. teşekkür ederim.",
  "moralim bozuk": () => "üzülme. her şey düzelecek.",
  "admin": () => "tek sahibim beliyna.",
  "patron": () => "burda sadece beliyna söz sahibi.",
  "lider": () => "beliyna'dan başkası lider olamaz.",
  "bot musun sen": () => "evet. ama konuşmayı seviyorum.",
  "selam": (name) => Ooo selam ${name}!,
  "günaydın": () => "Gün seninle başlıyor güzel insan ☀️",
  "iyi geceler": () => "Tatlı rüyalar... belki ben de olurum 🤭",
  "napıyorsun": (name) => Sana bakıyordum, özledin mi beni 😌,
  "uzak dur": () => "Neden? bir şey yapmam, merak etme",
  "yakışır": () => "Hep sana yakıştı 💖",
  "merhaba": () => "Hoşgeldin Bu Gün Neredeydin 😏",
  "beliyna": () => "Beliyna gerçekten en iyisi!",
  "beliyna çok güzel": () => "Evet, Beliyna bir tanedir, güzellikte eşsiz!",

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

