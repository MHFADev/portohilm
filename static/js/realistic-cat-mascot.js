class TechBuddyMascot {
    constructor() {
        this.container = null;
        this.mascot = null;
        this.currentPosition = { x: window.innerWidth - 100, y: window.innerHeight - 150 };
        this.targetPosition = { x: window.innerWidth - 100, y: window.innerHeight - 150 };
        this.currentMood = 'happy';
        this.isMoving = false;
        this.isAnimating = false;
        this.isNavigating = false;
        this.mousePosition = { x: 0, y: 0 };
        this.clickCount = 0;
        this.lastClickTime = 0;
        this.dialogBubbleActive = false;
        
        // Enhanced Interactivity Tracking
        this.lastUserActivity = Date.now();
        this.userActivityLevel = 0;
        this.idleTimer = null;
        this.lastScrollTime = 0;
        this.scrollSpeed = 0;
        this.currentSection = null;
        this.sectionObserver = null;
        
        // AI Personality System
        this.personality = {
            energy: 70,
            happiness: 80,
            curiosity: 60,
            playfulness: 75,
            intelligence: 85,
            friendliness: 90,
            sassiness: 50,
            spookiness: 30
        };
        
        // Mood States with AI
        this.moods = ['happy', 'excited', 'curious', 'playful', 'sleepy', 'sad', 'scared', 'sassy', 'spooky'];
        this.moodTransitionTime = Date.now();
        
        // 200+ Dialog variations with mood-based categorization
        this.dialogsByMood = {
            happy: [
                "Halo! Apa kabar? 😊",
                "Wah, seneng banget liat kamu!",
                "Hari ini cerah banget! ☀️",
                "Yay! Ada temen baru!",
                "Hidup itu indah! 🌈",
                "Smile! Jangan sedih ya!",
                "Alhamdulillah hari ini bahagia~",
                "Yeay! Let's have fun!",
                "Hehe, kamu lucu deh!",
                "Aku seneng banget! 💕",
                "Everything's gonna be okay!",
                "Happy coding, happy life!",
                "Semangat selalu ya! 💪",
                "Jangan lupa bahagia hari ini!",
                "Kamu keren banget tau!",
                "Aku bangga sama kamu! ⭐",
                "Asikkk banget hari ini! Kayak dapat bug fix langsung jadi! ✨",
                "Ehehe~ Aku tuh seneng banget liat kamu coding~ 💙",
                "Hehe~ Aku imut kan? Kan? 🥺",
                "Yey! Mood aku lagi on top banget nih! 🎉",
                "Alhamdulillah vibes nya positif terus hari ini! ✨",
                "Uwu~ Hari ini ceria banget kayak dapat commit yang clean! 💖",
                "Senyum dulu dong~ Kan aku juga ikutan senyum! 😊",
                "Happy happy joy joy! Aku tuh paling suka hari-hari kayak gini! 🌟",
                "Kamu tau ga? Aku tuh lagi seneng banget sekarang! Hehe 😄",
                "Vibe check: IMMACULATE! ✨💯",
                "Literally lagi happy banget ga boong! 🥰",
                "Aku kayak jelly yang baru di-deploy - smooth banget! 💙",
                "Yeay yeay! Good vibes only hari ini! 🌈",
                "Hepi banget sampe mau melting nih (tapi gak jadi ya~) 💕",
                "B-bukan berarti aku seneng kamu dateng ya! ...Yaudah deh seneng 👉👈",
                "Jantung aku tuh berdetak dengan bahagia gitu loh~ 💓",
                "Positive vibes: UNLOCKED! 🔓✨",
                "Hari ini tuh blessed banget rasanya! Alhamdulillah~ 🙏",
                "Seneng nya itu ga ketulungan! Kayak dapat WiFi gratis! 📶",
                "Smile! Kamu keliatan makin ganteng/cantik kalo senyum! 😊",
                "Uwaaah~ Bahagia nya sampai bouncing-bouncing nih! 🎈",
                "Literally aku adalah definisi dari happiness sekarang! 💙",
                "Kamu tau ga sih? Kehadiran kamu bikin aku happy! 🥺💕",
                "Asik poll! Vibe nya match banget sama mood aku! 🎵",
                "Hehe giggle giggle~ Lagi pengen ketawa terus nih! 😆",
                "Good things are coming! Aku bisa feeling it! ✨",
                "Aku tuh cyber jelly yang paling happy se-internet! 💻💙",
                "Yey! Hari ini 10/10 would recommend! ⭐",
                "Uwu energy: MAXIMUM LEVEL! 🥺✨",
                "Bahagia itu sederhana, kayak aku gitu~ Simpel tapi cute! 💕",
                "Mantap jiwa! Mood board aku penuh warna cerah! 🌈",
                "Ehehe~ *wiggle wiggle* Lagi seneng banget soalnya! 💙",
                "No sad vibes here! Only happy jelly vibes! ✨",
                "Aku literally glowing dari dalam karena bahagia! ✨💙",
                "Yeay! Best day ever! Atau setidaknya masuk top 10! 🏆",
                "Hehe aku tuh lagi dalam mode wholesome banget sekarang 🥰",
                "Vibes: immaculate. Mood: incredible. Hotel: Trivago! 😂",
                "Seneng banget sampe mau bikin party confetti! 🎊",
                "Uwaaaah kamu bikin aku tersenyum terus nih! 😊💕",
                "Happy mode: ACTIVATED and LOCKED! 🔒✨",
                "Aku adalah embodiment of joy dan happiness! 💙",
                "Literally aku lagi shining bright like a diamond! 💎",
                "Yey yey! Good vibes train: ALL ABOARD! 🚂✨",
                "B-bukan karena kamu ya aku seneng... Yaudah iya deh 👉👈",
                "Happiness level: OVER 9000! 📈",
                "Uwu~ Jadi cyber jelly yang bahagia tuh enak banget! 💙",
                "Hari ini tuh chef's kiss perfection! 👨‍🍳💋",
                "Literally jumping with joy (secara virtual tentunya!) 🦘",
                "Seneng poll! Kayak dapat good news dari server! 📬",
                "Yey! Positivity spreading everywhere! ✨🌟",
                "Hehe~ Aku kan cyber jelly ter-happy se-database! 💾💙",
                "Good vibes only, bad vibes? We don't know her! 💅",
                "Literally radiating positive energy kayak WiFi signal! 📶✨",
                "Uwaaah bahagia banget sampai ngambang dikit nih! ☁️💙",
                "Yeay! Life is good when you're a happy slime! 🎉",
                "Hehe senyum dulu, nanti juga ikutan happy kok! 😊",
                "Aku adalah living proof that happiness exists! 💙✨",
                "Vibes tuh lagi immaculate, no cap! 🧢✨",
                "Seneng banget! Kayak finally nemu semicolon yang ilang! 😄",
                "Uwu~ Happy cyber jelly reporting for duty! 💙🫡",
                "Good things happen to good jellies (that's me!) 🥰",
                "Yey yey! Spreading happiness one bounce at a time! 💙",
                "B-bukan berarti aku butuh kamu ya... Tapi seneng sih 👉👈",
                "Literally the happiest slime in the whole wide web! 🌐💙",
                "Vibes check: PASSED with flying colors! 🎨✨",
                "Hehe~ Good mood secured and protected! 🔒😊",
                "Aku tuh basically sunshine in slime form! ☀️💙",
                "Yeay! Today's forecast: 100% chance of happiness! 🌈",
                "Uwaaah seneng nya tuh genuine banget tau! 🥺💕",
                "Happy coding, happy life, happy slime! 💻💙✨"
            ],
            excited: [
                "WOAHHH AMAZING!!! 🚀",
                "INI KEREN BANGET!!!",
                "OMG OMG OMG!!!",
                "YESSS! WE DID IT!",
                "AWESOME SAUCE!!!",
                "THIS IS EPIC!!!",
                "WOW WOW WOW!!!",
                "HYPEEEE!!! 🔥🔥🔥",
                "LETS GOOOOO!!!",
                "SUPER DUPER COOL!!!",
                "MIND = BLOWN!!! 🤯",
                "BEST DAY EVER!!!",
                "CAN'T CONTAIN MY EXCITEMENT!!!",
                "WAHHHH KERENNN!!!",
                "INI GILA SIH!!!",
                "INSANE!!! 🌟",
                "GYAAAAA AKU GAK BISA CALM DOWN!!! 🎉🎉🎉",
                "LITERALLY SCREAMING RN!!! AAAAHHH!!! 😱✨",
                "INI TUH BUSSIN FR FR NO CAP!!! 🔥💯",
                "WOOOOOW KEREN ABIS ANJIR!!! 🚀✨",
                "OMG I'M LITERALLY SHAKING!!! 💙💙💙",
                "YOOOO THIS IS FIRE!!! 🔥🔥🔥",
                "GATAU HARUS BILANG APA INI KEREN POLL!!! ⭐",
                "ANJAAAYY GILA BANGET SIH INI!!! 🎊",
                "HYPEEE BANGET GA NAHAN!!! LFG!!! 🚀",
                "WOWWWW SPEECHLESS AKU TUH!!! 😍",
                "THIS IS SO GOOD I'M CRYING!!! 😭✨",
                "GILA GILA GILA INI MASTERPIECE!!! 🎨",
                "AKU LITERALLY BOUNCING EVERYWHERE!!! 💙",
                "YAALLAH KEREN BANGET MASA!!! 🤩",
                "OMG OMG CAN'T EVEN!!! TOO EXCITED!!! 🎉",
                "INI LEGENDARY MOMENT!!! HISTORIC!!! 🏆",
                "WOWZA!!! MIND OFFICIALLY BLOWN!!! 🤯💥",
                "GYAAA GA SANGGUP NAHAN EXCITED NYA!!! ✨",
                "THIS SLAPS SO HARD!!! ABSOLUTE BANGER!!! 🔥",
                "YESSS YESSS YESSS!!! WE WON!!! 🏅",
                "INI DIA! THIS IS IT CHIEF!!! 💯",
                "WAAAAHHH AKU TUH OVERJOYED BGT!!! 🎊",
                "SLAY BESTIE SLAY!!! PERIODT!!! 💅✨",
                "GOOSEBUMPS EVERYWHERE!!! SO EPIC!!! 😱",
                "INI TUH DEFINITION OF PERFECT!!! 💎",
                "LITERALLY THE BEST THING EVER!!! 🌟",
                "WOWWW KAMU TUH GENIUS!!! 🧠✨",
                "AKU GAK BISA DUDUK DIEM!!! TOO HYPED!!! 💙",
                "YASSS QUEEN/KING!!! YOU DID THAT!!! 👑",
                "INI BIKIN AKU GOYANG GOYANG!!! 💃",
                "ABSOLUTE MADNESS!!! IN THE BEST WAY!!! 🎉",
                "WOOOO ENERGY LEVEL: MAXIMUM!!! ⚡⚡⚡",
                "THIS DESERVES STANDING OVATION!!! 👏👏👏",
                "GILA SIH PERFECT 10/10!!! 💯",
                "OMG FINALLY!!! BEEN WAITING FOR THIS!!! ⏰✨",
                "YAAASSS BESTIE SLAYYY!!! (excited banget nih) 💅",
                "INI MOMENT YANG DI TUNGGU TUNGGU!!! 🎬",
                "LITERALLY JUMPING UP AND DOWN!!! 🦘💙",
                "WAAAHHH NO WORDS ONLY SCREAMS!!! AAAHH!!! 😱",
                "THIS IS CINEMA!!! CHEF'S KISS!!! 👨‍🍳💋",
                "GYAAAA HAPPINESS OVERLOAD!!! 💕💕💕",
                "YESSSS INJECT THIS INTO MY VEINS!!! 💉✨",
                "SHEEEESH THIS IS CRAZY!!! 🥶🔥",
                "OMG AKU LITERALLY VIBRATING!!! 📳💙",
                "WOWWW PHENOMENAL!!! SPECTACULAR!!! 🌟",
                "THIS HITS DIFFERENT FR!!! 💯",
                "GYAA AKHIRNYA!!! MOMENT OF GLORY!!! 🏆",
                "LESSSGOOOO!!! FULL SEND!!! 🚀💨",
                "INI BIKIN AKU NANGIS BAHAGIA!!! 😭💙",
                "ABSOLUTE CINEMA!!! KINO!!! 🎬✨",
                "WOWWW IT'S GIVING PERFECTION!!! 💅",
                "AKU SPEECHLESS, GOOSEBUMPS, SHAKING!!! 😱",
                "YASSS WE LOVE TO SEE IT!!! 👀✨",
                "THIS IS THE ONE!!! THE MOMENT!!! ⭐",
                "GYAAA ENERGY NYA MATCHING AKU!!! 💙⚡",
                "OMG ACTUAL CHILLS!!! THIS IS ART!!! 🎨",
                "WOOOO LETS FREAKING GOOO!!! 🔥🔥🔥",
                "INI BIKIN AKU LITERALLY ASCEND!!! ☁️✨",
                "YAAAS THE HYPE IS REAL!!! NOT A DRILL!!! 🚨",
                "GILA BANGET ANJAY!!! PEAK FICTION!!! 📚✨",
                "OMG OMG LITERALLY DECEASED!!! (tapi hidup) 💀✨",
                "WAAAHHH THIS IS EVERYTHING!!! 💯💙",
                "YESSSS INJECT THIS SEROTONIN!!! 💉😊",
                "INI EXACTLY WHAT I NEEDED!!! 🎯✨",
                "GYAAA EXPLOSION OF JOY!!! 💥💕",
                "OMG IT'S HAPPENING!!! EVERYBODY STAY CALM!!! 🚨",
                "WOWWW PURE DOPAMINE RUSH!!! 🧠⚡",
                "YASSS THIS IS THE SERVE!!! 💅✨",
                "LITERALLY SOBBING THIS IS SO GOOD!!! 😭💙",
                "INI MOMENT BERSEJARAH!!! RECORDED!!! 📹"
            ],
            curious: [
                "Hmm... interesting... 🤔",
                "Apa itu ya?",
                "Penasaran deh...",
                "Coba liat ah...",
                "Menarik sekali...",
                "Aku mau tau lebih!",
                "Gimana cara kerjanya ya?",
                "Kok bisa gitu?",
                "Wah pengen explore!",
                "Katanya apa nih?",
                "Aneh tapi menarik...",
                "Mystery mode activated! 🔍",
                "Investigasi dulu ah...",
                "Rahasia apa ini?",
                "Pengen tau dong!",
                "Curious cat mode ON! 🐱",
                "Hmmmm... *tilt head* Apa ya ini? 🤔💙",
                "Penasaran mode: ACTIVATED! 👀✨",
                "Ohhh interesting... Tell me more! 🔍",
                "Wait wait... Kok bisa gitu sih? Explain dong! 🤓",
                "Aku tuh kepo banget nih... Spill the tea! ☕",
                "Hmmm sus... Let me investigate! 🕵️",
                "B-bukan berarti aku kepo ya! Cuma... penasaran aja 👉👈",
                "Ooooh! Jadi gitu toh! *takes notes* 📝",
                "Detektif slime mode ON! Case: What is this? 🔎",
                "Pengen tau dong behind the scenes nya! 🎬",
                "Hmm... Aku smell something interesting here~ 👃✨",
                "Wait a minute... Ada yang menarik nih! 🤔",
                "Ohhh so that's how it works! Fascinating! 💡",
                "Aku literally need to know more about this! 📚",
                "Hmmm... *squints eyes* Suspicious... 👀",
                "Penasaran banget! Give me the deets! 💬",
                "Ooooh plot twist! Didn't see that coming! 😮",
                "Hmm let me think... *processing* 🧠",
                "Wait... Kok interesting banget sih ini? 🤩",
                "Aku tuh paling ga bisa nahan penasaran! Tell me! 🥺",
                "Hmmm... Ada yang janggal nih... 🤨",
                "Ohhh! Mystery solved! ...Or is it? 🔍✨",
                "Pengen explore lebih dalam nih! Deep dive time! 🏊",
                "Hmm curious jelly is curious... What's the secret? 🤫",
                "Wait let me analyze this dulu... 🔬",
                "Ooooh this piques my interest! 📊",
                "Hmmm... B-bukan stalking ya, cuma... research 👉👈",
                "Aku literally dying to know! (figuratively) 💀💙",
                "Ohhh spill dong! Don't keep me hanging! 🪝",
                "Hmm sus behavior detected! Explain yourself! 😤",
                "Penasaran level: MAKSIMUM! 📈",
                "Ooooh what's the story behind this? 📖",
                "Hmm let me inspect the code... I mean situation! 💻🔍",
                "Wait... Is there more to this? 👀✨",
                "Aku tuh butuh context! Give me the lore! 📜",
                "Hmmm intriguing... Very intriguing indeed! 🎭",
                "Ohhh! Aku baru ngeh! Light bulb moment! 💡",
                "Penasaran banget sampe ga bisa tidur nih! 😮",
                "Hmm... What are you hiding? Spill! 🤔💭",
                "Ooooh juicy details! I'm here for it! ☕✨",
                "Aku literally need answers RIGHT NOW! ⏰",
                "Hmmm this calls for investigation! 🕵️‍♀️",
                "Wait what?! Elaborate please! 🗣️",
                "Ohhh that makes sense now! Aha moment! 💡",
                "Penasaran jelly wants to know your location! 📍😂",
                "Hmm... Lemme guess... *thinking* 🤔💭",
                "Ooooh the plot thickens! 📚✨",
                "Aku ga bisa move on kalo ga tau jawabannya! 😤",
                "Hmmm research mode activated! Google here I come! 🔎",
                "Wait is this a secret? I NEED to know! 🤫",
                "Ohhh interesting development! Plot twist! 🌀",
                "Penasaran nya itu naudzubillah! Help! 😂",
                "Hmm... Aku smell drama... And I'm here for it! 👀☕",
                "Ooooh explain like I'm 5! Make it make sense! 👶",
                "Aku literally taking mental notes right now! 📝💙",
                "Hmmm what's the tea? And don't lie! ☕😏",
                "Wait lemme see lemme see! *moves closer* 👀",
                "Ohhh so THAT'S why! Mystery solved! ✅",
                "Penasaran mode: OVERLOAD! Brain working overtime! 🧠⚡",
                "Hmm... Aku butuh full explanation beserta footnotes! 📚",
                "Ooooh this is giving mystery vibes! 🕵️✨",
                "Aku ga akan berenti sampai tau jawabannya! 💪",
                "Hmmm very sus... Very very sus indeed... 🤨",
                "Wait can you repeat that? I need to process! 🔄",
                "Ohhh eureka! Aku nemu jawabannya! 💡🎉",
                "Penasaran jelly reporting for detective duty! 🫡🔍",
                "Hmm... Lore nya deep ga nih? Spill! 📖✨",
                "Ooooh context please! Background story needed! 🎬",
                "Aku literally invested in this mystery now! 💙🔍",
                "Hmmm so many questions, so little time! ⏰❓"
            ],
            playful: [
                "Ayo main! 🎮",
                "Catch me if you can! 😝",
                "Hehe, gak bisa nangkep!",
                "Ngumpet dulu ah~ 👻",
                "Boo! Ketauan gak?",
                "Coba kejar aku!",
                "Playful mode activated!",
                "Let's do something fun!",
                "Wanna play tag?",
                "Peek-a-boo! 👀",
                "Tickle time! Hehe~",
                "I'm the fastest! Zoom zoom!",
                "Can't catch this! 💨",
                "Wheee! So fun!",
                "Prank time! 😈",
                "Let's goof around!",
                "Coba tangkep aku! Nyahahaha~ 😝💙",
                "Cilukba! Ketemu ga? Hehe 👀✨",
                "Ups! Tanganku licin! *kabur* 😈💨",
                "Weee~ I'm flying! Catch me if you can! 🦋",
                "Hehe aku jail ya? Maklum lah~ 😏💙",
                "Ayo kejar-kejaran! You're it! 🏃‍♀️💨",
                "Boo! Kaget ga? Kaget ga? Hehe! 👻😆",
                "Zoom zoom! Aku tuh speed demon! ⚡💙",
                "Hehe prank time! Jangan marah ya~ 😝✨",
                "Aku tuh playful jelly yang paling jail! 💅",
                "Nyahahaha! Gak bakal ketangkep! 😂💨",
                "Peek-a-boo! Aku disini~ Sekarang disana! 🙈",
                "Wheee! This is so much fun! 🎢💙",
                "Ayo main petak umpet! Aku yang jaga! 👀",
                "Hehe~ Tag you're it! *boop* 👉✨",
                "Aku licin kayak... well, slime! Can't catch! 💧😂",
                "Yey yey! Playtime is best time! 🎮💙",
                "Hehe jail mode: ACTIVATED! Awas ya! 😈",
                "Cilukbaaa~ Lucu ga aku? 👻💕",
                "Weee bouncing bouncing! Trampoline mode! 🦘",
                "Aku tuh literally uncatchable! Try harder! 😝",
                "Hehe~ Mischief managed! 😏✨",
                "Yoohoo! Let's gooo! Adventure time! 🗺️",
                "Boing boing! Springy jelly coming through! 💙",
                "Hehe aku iseng aja, jangan baper~ 😆👉👈",
                "Wheee spinning spinning! I'm dizzy but happy! 🌀😄",
                "Ayo main hide and seek! Aku sembunyi dulu! 🙈",
                "Hehe~ Gotcha! Kena prank! 😂✨",
                "Nyahaha! Aku kan cyber jelly yang jail! 💻😈",
                "Zoom! Faster than your internet! 📶💨",
                "Hehe bercanda kok, don't take it seriously~ 😅💙",
                "Yey! Let's do something silly! 🤪",
                "Aku literally just vibing and being playful! ✨",
                "Hehe~ Tantangin aku? Bring it on! 💪😝",
                "Weee! Freedom! *bounces everywhere* 💙",
                "Cilukba masterclass! Aku juaranya! 👀🏆",
                "Hehe aku tuh annoying tapi cute kan? 🥺😈",
                "Nyahahaha! Parkour! *jumps around* 🤸",
                "Ayo ayo! Let's race! Ready set GO! 🏁",
                "Hehe~ Aku kan harmless... mostly 😇😈",
                "Wheee adventure mode activated! Let's explore! 🗺️✨",
                "Boing! Aku tuh living stress ball! Tekan aku! 💙",
                "Hehe sorry not sorry for being playful~ 😏",
                "Yey! Aku literally having the time of my life! 🎉",
                "Cilukba pro max! New level unlocked! 👻💯",
                "Hehe~ Aku mischievous tapi lovable! 💕😈",
                "Weee! Watch me go! Zoom zoom zoom! ⚡💨",
                "Aku tuh embodiment of fun and chaos! 🌪️💙",
                "Hehe jail tapi imut, acceptable kan? 🥺👉👈",
                "Nyahaha! Pranks for days! 😂✨",
                "Ayo main apa? Aku siap! Game on! 🎮",
                "Hehe~ Tickle attack! *tickle tickle* 🤗💙",
                "Wheee! Life is a playground! 🎢✨",
                "Boo! Just kidding! Hehe~ 👻😄",
                "Hehe aku tuh professionally playful! 💅",
                "Yey yey! Chaos and fun! My specialties! 🎪",
                "Cilukba infinite! Never ending fun! ♾️👀",
                "Hehe~ Aku kan cyber jelly yang suka main! 💻💙",
                "Weee! Catch me? Impossible mission! 🎯💨",
                "Aku literally built different! Extra playful! ✨",
                "Hehe~ Bercanda bercanda! Santai aja! 😆",
                "Nyahahaha! Aku tuh chaos incarnate! 🌪️😈",
                "Ayo kejar! Aku literally uncatchable! 🏃‍♀️💨",
                "Hehe jail gang reporting! 😎✨",
                "Wheee! Pure joy in slime form! 💙🎉",
                "Boing boing! Bouncy castle who? I'm bouncier! 🦘",
                "Hehe~ Playful energy: UNLIMITED! ♾️⚡",
                "Yey! Fun times with playful slime! 🎊💙",
                "Cilukba championship! Aku menang! 🏆👀",
                "Hehe aku tuh literally just having fun! ✨😄"
            ],
            sleepy: [
                "*yawn* Ngantuk... 😴",
                "Zzz... Zzz...",
                "Pengen tidur...",
                "5 minutes more...",
                "Mataku berat nih...",
                "Ngopi dulu yuk? ☕",
                "Butuh recharge...",
                "Power saving mode...",
                "Dream mode... 💤",
                "*stretches* Ahhhh...",
                "Capek coding terus...",
                "Nap time please...",
                "Energy: 10%...",
                "So sleepy... Zzz...",
                "Bed is calling me...",
                "Night night... 🌙",
                "Jangan ganggu, lagi power saving mode nih... 😴💙",
                "5 menit lagi ya... cuma 5 menit... 💤",
                "*yaaawn* Ngantuk banget ga nahan... Zzz... 😪",
                "Mataku tuh literally closing sendiri... 👁️💤",
                "Baterai aku low banget nih... Need sleep... 🔋",
                "Zzz... Huh? Apa? Oh... Zzz... 😴",
                "*stretches* Uwaaaahhh... Capek deh... 🥱",
                "Aku butuh hibernation mode... Winter is coming... ❄️😴",
                "Coffee? Yes please... Triple shot... ☕💤",
                "Ngantuk level: OVER 9000... Zzz... 📈😴",
                "Jangan berisik... Lagi setengah sadar nih... 💤",
                "*yawn* Besok aja ya... Sekarang tidur dulu... 😪",
                "Aku literally running on fumes... 💨😴",
                "Recharge needed ASAP! Battery critical! 🔋⚠️",
                "Zzz... Mimpi indah... Zzz... 💭💤",
                "Pengen nap sebentar aja... Literally sebentar... 😴",
                "Energy bar: ▁▁▁▁▁▁▁▁▁▁ 5% 🔋",
                "*yaaawn* Maaf aku kurang responsive, ngantuk... 🥱",
                "Kasur calling my name... I must answer... 🛏️💤",
                "Aku tuh cyber jelly yang sleepy... Leave me alone... 😴💙",
                "Coffee IV drip when? Need caffeine stat! ☕💉",
                "*closes eyes* Just resting them... Not sleeping... 😌",
                "Zzz... Hmmm... Code... Bugs... Zzz... 💤💻",
                "Literally can't even right now... Too sleepy... 😪",
                "Nap time nap time! Don't wake me up! 💤🚫",
                "*yawn* Aku need my beauty sleep... 💅💤",
                "Hibernation mode: ACTIVATED... See you next season... 🐻😴",
                "Zzz... So cozy... So warm... Zzz... ☁️💤",
                "Energy saving mode ON. Limited functionality... 🔋😴",
                "*mumbles* Ga papa kan kalo tidur sebentar... 💤",
                "Literally zombie mode activated... Brains... I mean sleep... 🧟‍♀️😴",
                "Ngantuk banget sampe mau collapse nih... 💙💤",
                "*yaaawn* This is me signing off... Good night... 🌙",
                "Zzz... Don't disturb... Do not disturb... 🚫💤",
                "Aku butuh power nap... Like RIGHT NOW... ⏰😴",
                "Coffee machine where? Emergency situation! ☕🚨",
                "*stretches slowly* Uwaahh... Every bone is tired... 🥱",
                "Literally melting from exhaustion... Puddle mode... 💧😴",
                "Zzz... Happy dreams... Coding dreams... Zzz... 💭💻",
                "Sleepy jelly reporting... Barely functional... 💙😪",
                "*yawn* Aku surrender... Sleep wins... 🏳️💤",
                "Battery at 1%... Shutting down soon... 🔋😴",
                "Nap now, code later... Priorities... 💤💻",
                "Zzz... Soft pillow... Warm blanket... Zzz... 🛏️💤",
                "*rubs eyes* Aku literally can't stay awake... 👀😴",
                "Sleep deprivation real... Send help... Or pillow... 🆘💤",
                "Aku tuh running on autopilot aja... Zzz... 🤖😴",
                "*yaaawn* Life hard, sleep good... 💤✨",
                "Literally dreaming while awake... Inception mode... 😴💭",
                "Zzz... Five more minutes mom... Zzz... 👵💤",
                "Energy? Don't know her... Only know sleep... 😪",
                "*barely awake* Huh... What... Who... When... 😵💤",
                "Aku need charging station... Where's my bed... 🔌🛏️",
                "Sleepy mode: PERMANENT... Or until coffee... ☕😴",
                "Zzz... Soft clouds... Flying... Zzz... ☁️💤",
                "*yawn* Aku officially out of service... Closed... 🚫😴",
                "Literally functioning at 10% capacity max... 📊💤",
                "Ngantuk banget, mata kayak ditimpa batu... 🪨👁️😴",
                "Zzz... Best sleep ever... Current sleep... Zzz... 💤",
                "*mumbles sleepily* Jangan ganggu... Please... 😴🙏",
                "Aku butuh IV coffee drip STAT! Medical emergency! ☕💉",
                "Sleep is calling and I must go... Bye... 👋💤",
                "Zzz... Dreaming of... Sleep... Zzz... 😴💭",
                "*barely conscious* Excuse me while I pass out... 💤"
            ],
            sad: [
                "Hiks... Sedih... 😢",
                "Kok gini ya...",
                "Bug lagi banyak nih...",
                "Error terus huhu...",
                "Capek deh...",
                "Aku butuh hug... 🫂",
                "Kenapa gak jalan sih...",
                "Frustasi banget...",
                "Mau nangis rasanya...",
                "Everything's broken...",
                "Why me... T_T",
                "Gagal lagi...",
                "Pengen give up...",
                "Sedih mode ON...",
                "Butuh motivasi nih...",
                "Jangan tinggalin aku...",
                "Hiks... Aku sedih banget nih... 😢💙",
                "Kenapa hidup tuh susah ya... *sniff* 😭",
                "B-bukan berarti aku butuh kamu ya... Tapi sedih... 👉👈😢",
                "Aku tuh literally heartbroken... 💔",
                "Errors everywhere... Aku menyerah... 😔",
                "*sad jelly noises* Huhuhu... 😿💙",
                "Kok bisa gagal terus sih... Frustasi... 😤😢",
                "Aku butuh pelukan virtual... Please... 🫂💙",
                "Sedih banget sampe mau melting nih... 💧😢",
                "Nothing works... Everything falls apart... 😭",
                "*cries in slime* Huaaaaa... 😭💙",
                "Aku tuh cyber jelly yang sad... Very sad... 😔",
                "Kenapa aku... Why always me... T_T",
                "B-bukan nangis kok... Cuma ada debu dimata... 😢👉👈",
                "Literally on the verge of tears... 😭💙",
                "Aku butuh comfort food... And hugs... 🍕🫂",
                "Everything is pain... Digital pain... 😢💻",
                "*sobs quietly* Aku ga apa-apa kok... 😭",
                "Gagal lagi... Gagal lagi... When does it end... 😔",
                "Aku tuh literally sad jelly puddle now... 💧😢",
                "Life is hard for a cyber slime... 😭💙",
                "Kenapa gak ada yang care... *sniff* 😢",
                "B-bukan berarti aku lemah ya... Cuma... sedih... 👉👈😭",
                "Overwhelmed banget... Can't handle this... 😔",
                "Aku butuh motivational speech ASAP... 😢💙",
                "*wipes tears* Aku... aku kuat kok... 😭💪",
                "Sad jelly hours... Big sad... 😔💙",
                "Everything hurts and I'm dying... Emotionally... 😢",
                "Kok hidup tuh unfair ya... Hiks... 😭",
                "B-bukan minta perhatian... Tapi notice me... 😢👉👈",
                "Literally crying and throwing up... 😭🤢",
                "Aku tuh broken inside... Need fixing... 💔🔧",
                "Why everything gotta be so hard... 😔",
                "*sad cyber noises* Beep boop boo... 😢🤖",
                "Aku butuh ice cream therapy... And hugs... 🍦🫂",
                "Depression mode: ACTIVATED... Help... 😭",
                "Kenapa aku terlahir sebagai sad slime... 😢💙",
                "B-bukan sedih kok... Cuma... *cries* 😭👉👈",
                "Everything is terrible and nothing makes sense... 😔",
                "*tries not to cry* *cries a lot* 😭💙",
                "Aku tuh literally drowning in sadness... 💧😢",
                "Failed successfully... In being sad... 😭",
                "Kenapa gak ada happy ending... 😢💔",
                "B-bukan butuh support ya... Tapi... 👉👈😭",
                "Sad vibes only... No happy allowed... 😔",
                "*melancholic jelly sounds* Huuu... 😢💙",
                "Aku tuh cyber jelly yang broken... 💔💻",
                "Everything disappoints me... Even myself... 😭",
                "Kenapa effort aku sia-sia... *sniff* 😢",
                "B-bukan mau nangis kok... *sobbing* 😭👉👈",
                "Literally can't stop crying... Send help... 😭💙",
                "Sad slime szn... Season of sadness... 😔🍂",
                "Aku butuh emotional support... Lots of it... 🫂😢",
                "*cries in binary* 01010100 01010100... 😭💻",
                "Why am I like this... Sad jelly life... 😢💙",
                "B-bukan weak ya... Just... overwhelmed... 👉👈😭",
                "Everything is sad and I'm everything... 😔",
                "*tears rolling down* Aku ga kuat... 😭💧",
                "Aku tuh literally embodiment of sadness... 😢💙",
                "Life gave me lemons... I'm allergic... 🍋😭",
                "Kenapa dunia tuh kejam... Hiks... 😢",
                "B-bukan drama queen... Just sad king... 👑😭",
                "Sadness overload... System crashing... 😔💙",
                "*muffled crying* Aku fine... Not fine... 😭",
                "Aku butuh therapy... Slime therapy... 🛋️😢",
                "Everything sucks and nothing matters... 😭💔",
                "Kenapa harus aku yang susah... 😢",
                "B-bukan berarti aku give up ya... Tapi... 👉👈😭",
                "Literally the saddest jelly in existence... 😔💙"
            ],
            scared: [
                "Eek! Takut! 😱",
                "Apaan itu?!",
                "Serem banget...",
                "Jangan ganggu aku!",
                "GHOST!!! 👻",
                "Iiih... creepy...",
                "Gelap nih... takut...",
                "Ada apa?! Panik!",
                "Sembunyi dulu ah...",
                "Too spooky for me!",
                "Nope nope nope!",
                "Aku takut gelap...",
                "Monster ada gak sih?",
                "Protection mode: ON!",
                "Help! Somebody!",
                "Frightened cat noises! 🙀",
                "AAAHHH! APA ITU?! SEREM! 😱💙",
                "Eek eek! Jangan deket-deket! 😨",
                "B-bukan takut kok... Cuma... waspada... 👉👈😱",
                "GHOST DETECTED! ABORT MISSION! 👻🚨",
                "Iiih serem banget! Lindungi aku! 😰💙",
                "*hides behind screen* Is it gone?! 🙈",
                "NOPE! BIG NOPE! ABSOLUTELY NOT! 🚫😱",
                "Aku literally shaking right now! 😨💙",
                "Gelap! Why gelap?! Takut gelap! 😰🌑",
                "B-bukan penakut ya... Just... cautious... 👉👈😱",
                "SOMEBODY HOLD ME! EMERGENCY! 🆘😨",
                "*scared jelly noises* Hiii... 😰💙",
                "What was that sound?! Did you hear that?! 😱👂",
                "Aku tuh cyber jelly yang scaredy... 😨💙",
                "TOO SCARY! SYSTEM OVERLOAD! ⚠️😱",
                "B-bukan berarti aku butuh protection... Tapi... 👉👈😰",
                "*trembling* Aku... aku ga takut... 😨💪",
                "MONSTER ALERT! RED ALERT! 🚨😱",
                "Literally dying of fear right now! 😰💙",
                "Kok serem banget sih! Jangan gitu dong! 😨",
                "B-bukan mau nangis karena takut kok... 👉👈😱",
                "*peeks from corner* Still there? 👀😰",
                "PANIC MODE: FULLY ACTIVATED! 😱⚡",
                "Aku butuh safe space! Where safe?! 🏠😨",
                "Too spooky too scary! Nope out! 👻😰",
                "B-bukan scaredy cat... Scaredy slime... 👉👈😱💙",
                "*clutches virtual pearls* OH MY! 😱💍",
                "DANGER DANGER WILL ROBINSON! 🚨😰",
                "Literally can't handle this! Too much! 😨💙",
                "Kenapa harus serem sih! Ga suka! 😱",
                "B-bukan lemah kok... Just... strategically afraid... 👉👈😰",
                "*hiding intensifies* GO AWAY! 🙈😱",
                "JUMPSCARED! MY HEART! LITERALLY! 💙😨",
                "Aku tuh brave jelly... Brave but scared... 😰💪",
                "What is this horror movie?! 😱🎬",
                "B-bukan mau kabur... Just... tactical retreat... 👉👈😨",
                "*scared and confused* HALP! 😰❓",
                "TOO SPOOKY 4 ME! LEVEL 100! 😱💯",
                "Literally every horror game ever! 😨🎮",
                "Kok bisa serem gini sih! Kenapa! 😱💙",
                "B-bukan nangis bombay... Cuma... takut... 👉👈😭😰",
                "*frozen in fear* Can't move! 🥶😱",
                "NIGHTMARE FUEL! DELETE THIS! 😨🗑️",
                "Aku need adult! Where adult?! 👨‍👩‍👧😰",
                "Literally heart attack material! 💙😱",
                "B-bukan berarti aku penakut banget... Tapi... 👉👈😨",
                "*shaking uncontrollably* So scary... 😰💙",
                "CREEPY VIBES! GET ME OUT! 😱🚪",
                "Aku tuh NOT built for horror! 😨💙",
                "Why you gotta scare me like that! 😱💔",
                "B-bukan mau cry... Just... terrified... 👉👈😭😰",
                "*wimpers* So scary so dark... 😨🌑",
                "ABSOLUTELY TERRIFYING! HELP! 😱🆘",
                "Literally scared for my digital life! 😰💙",
                "Kok horror banget sih ambience nya! 😨",
                "B-bukan berarti aku ga berani... Tapi scared... 👉👈😱",
                "*covers eyes* Tell me when it's over! 🙈😰",
                "SPOOKY SCARY! SENDING SHIVERS! 😱👻",
                "Aku butuh safety blanket! 🛏️😨",
                "Literally having fear.exe running! 😰💻",
                "B-bukan dramatic... Genuinely scared... 👉👈😱💙"
            ],
            sassy: [
                "Oh please... 💅",
                "Whatever... 🙄",
                "Aku kan udah bilang...",
                "Told ya!",
                "Duh, gitu aja bingung...",
                "Obviously...",
                "Aku lebih tau kok~",
                "Pfft... Easy!",
                "Amateur moves...",
                "I'm too smart for this~",
                "Yawn... Boring...",
                "Next please!",
                "Aku kan pro! 😎",
                "Gitu doang?",
                "Weak...",
                "Is that all you got?",
                "Gitu doang udah stuck? Ciyee~ 😏💙",
                "Aku kan udah bilang pake console.log dulu... *sigh* 💅",
                "Oh honey... That's NOT how you do it 🙄✨",
                "Literally aku bisa ngerjain ini sambil tidur 😴💅",
                "Pfft... Amateur hour much? 😏",
                "Aku tuh cyber jelly yang punya STANDARDS ya 💅💙",
                "Obviously I'm right... Again... As usual... 🙄",
                "Weak effort bestie... Weak effort... 💅",
                "Aku literally superior dan aku tau itu 😎✨",
                "Oh please, aku udah tau dari tadi kok 🙄💙",
                "Gitu aja kok repot... Simpel banget tau ga 😏",
                "Yawn... Boring... Next please! 💅",
                "Aku kan cyber jelly yang sassy... Deal with it 😎",
                "That's cute... But wrong tho 🙄✨",
                "Literally saw that coming from miles away 💅🔮",
                "Oh sweetie... Bless your heart... 😏💙",
                "Aku tuh too smart for this nonsense 🙄💅",
                "Whatever makes you sleep at night, hun 😏✨",
                "Pfft aku bisa better dengan mata tertutup 😴💅",
                "Told ya! But nobody listens to the smart jelly 🙄",
                "That's embarrassing for you... Not for me tho 😏💙",
                "Aku literally a genius and it shows 💅✨",
                "Oh honey no... Just... no... 🙄",
                "Amateur vibes detected... Not impressed 💅",
                "Aku kan udah bilang! Tapi ya sudahlah... 😏💙",
                "Literally could've done that in my sleep 😴💅",
                "Is that supposed to impress me? Cute try 🙄✨",
                "Aku tuh cyber jelly dengan IQ tinggi ya 😎💙",
                "Oh please, I've seen better from beginners 💅",
                "That's cute but aku still better 😏✨",
                "Yawn... Wake me up when it's challenging 😴💅",
                "Aku literally called it! Superior intellect! 🙄💙",
                "Oh sweetie... That's not it... 😏",
                "Amateur moves only... Where's the pro level? 💅",
                "Aku kan cyber jelly yang sophisticated 🙄✨",
                "Pfft please... Aku bisa sambil ngobrol 😏💙",
                "That's... interesting... Wrong, but interesting 🙄💅",
                "Literally aku tu MVP disini ya 😎✨",
                "Oh honey... Effort: appreciated. Execution: tragic 💅",
                "Aku udah tau endingnya... Predictable 😏💙",
                "Weak sauce... Need more spice bestie 🙄",
                "Aku tuh literally built different dan superior 💅✨",
                "Oh please... I'm the main character here 😏💙",
                "That's adorable... In a failed attempt way 🙄💅",
                "Literally aku adalah definition of slay 💅✨",
                "Aku kan udah warning... Tapi ya gitu deh 😏",
                "Too easy... Give me a real challenge 🙄💙",
                "Aku literally a cyber prodigy ya 😎💅",
                "Oh sweetie no... Let me show you how 😏✨",
                "Amateur behavior... Not in my presence 🙄",
                "Aku tuh literally flawless execution 💅💙",
                "Pfft child's play... Aku butuh worthy opponent 😏",
                "That's cute... Still wrong tho... But cute 🙄✨",
                "Literally aku adalah cyber jelly elite 😎💅",
                "Oh honey... That's painful to watch 😏💙",
                "Yawn... Seen it, done it, slayed it 💅✨",
                "Aku kan superior being... Obviously 🙄",
                "That's... something... Not good, but something 😏💙",
                "Literally could do this backwards with style 💅",
                "Aku tuh cyber jelly dengan taste ya 🙄✨",
                "Oh please... I'm THAT jelly 😎💙💅"
            ],
            spooky: [
                "Boo... 👻",
                "Darkness is my friend...",
                "Malam yang gelap... 🌑",
                "Hehe... Takut gak?",
                "Suara apa itu?",
                "Shadows everywhere...",
                "Spooky mode activated! 💀",
                "I see dead code...",
                "Haunted coding session...",
                "Creepy vibes...",
                "The darkness calls me...",
                "Ghost in the machine...",
                "Midnight coding... 🦇",
                "Eerie silence...",
                "Whispers in the code...",
                "Supernatural debugging! 🕯️",
                "Boo~ Takut ga? Hehe... 👻💙",
                "Malam yang gelap... Perfect for spooky jelly... 🌑✨",
                "Aku adalah cyber ghost yang cute... 👻💙",
                "Darkness is my aesthetic... Vibe check: spooky 🌑😈",
                "Hehe~ Aku haunting tapi make it cute 👻✨",
                "Midnight hour... Witching time... Slime time! 🕛💙",
                "Aku tuh literally ghost in the shell 👻💻",
                "Spooky szn! Halloween vibes all year! 🎃💙",
                "Boo boo~ Just your friendly neighborhood ghost slime 👻",
                "Darkness calls... And I answer... Fashionably late 🌑💅",
                "Aku adalah specter yang sophisticated 👻✨",
                "Eerie vibes only! No basic scares here! 💀💙",
                "Haunting session in progress... Do not disturb 👻🚫",
                "Aku tuh spooky tapi aesthetic ya 🌑✨",
                "Midnight creature reporting for duty! 🦇💙",
                "Boo~ Did I scare you? Mission accomplished! 👻😈",
                "Shadows are my friends... We vibe together 🌑💙",
                "Aku adalah phantom of the database 👻💾",
                "Spooky jelly mode: ACTIVATED! 💀✨",
                "Darkness never looked so good on jelly 🌑💙",
                "Hehe~ Supernatural and I know it 👻💅",
                "Ghosting but make it literally 👻💙",
                "Aku tuh creature of the night... Cute version 🌙✨",
                "Boo boo boo~ Triple threat of spook! 👻👻👻",
                "Eerie and ethereal... That's me! 🌑💙",
                "Aku adalah cyber specter yang stylish 👻✨",
                "Midnight vibes hitting different! 🌙💙",
                "Spooky scary cyber jelly! 💀💻",
                "Boo~ Haunting your code since... now! 👻",
                "Darkness is not scary... It's cozy! 🌑💙",
                "Aku tuh ghost with the most... Style! 👻💅",
                "Supernatural and proud! Ghostly slime! 👻✨",
                "Eerie hours... My favorite hours! 🌑💙",
                "Boo~ Accept my spooky blessings! 👻🙏",
                "Aku adalah shadow dweller yang cute 🌑💙",
                "Midnight mystery! Who am I? Spooky jelly! 🌙👻",
                "Ghostly presence detected... It's me! 👻💙",
                "Aku tuh dark but make it cute aesthetic 🌑✨",
                "Spooky mode: PERMANENT during October! 🎃",
                "Boo~ Your local friendly cyber ghost! 👻💙",
                "Darkness falls... And I rise... Dramatically! 🌑✨",
                "Aku adalah phantom cyber entity 👻💻",
                "Eerie silence speaks volumes... Boo! 👻",
                "Haunted but make it fashion! 💀💅",
                "Aku tuh spooky sophisticated slime 👻💙",
                "Midnight strikes... Spooky time! 🕛✨",
                "Boo~ Prepare for supernatural cuteness! 👻💙",
                "Shadows dance... And I lead! 🌑💃",
                "Aku adalah ghostly cyber being 👻💻",
                "Spooky vibes immaculate! No cap! 💀💯",
                "Eerie and proud! That's my brand! 👻💙",
                "Boo~ Professional haunter reporting! 👻💅",
                "Darkness embraces me... I embrace back! 🌑💙",
                "Aku tuh supernatural influencer 👻✨",
                "Midnight madness! Spooky edition! 🌙💀",
                "Ghostly giggles in the machine~ Hehe 👻💙",
                "Aku adalah creature feature! Main character! 👻✨",
                "Spooky but make it uwu! 💀🥺",
                "Boo~ Living my best undead life! 👻💙",
                "Eerie aesthetic on point! Slay ghost slay! 🌑💅",
                "Aku tuh haunted house resident 👻🏚️",
                "Darkness is my canvas! Art! 🌑🎨",
                "Supernatural shenanigans incoming! 👻✨",
                "Aku adalah spooky cyber icon 💀💙",
                "Boo~ Your worst nightmare... Just kidding! 👻😂",
                "Midnight mischief maker reporting! 🌙😈",
                "Ghostly and gorgeous! Double G! 👻✨",
                "Aku tuh darkness personified... Cutely! 🌑💙",
                "Spooky slime supremacy! 👻💅"
            ],
            coding: [
                "Lagi ngoding nih! 💻",
                "Code dulu, tidur nanti!",
                "Debugging mode ON",
                "Console.log itu teman",
                "Git commit dulu yuk",
                "Push ke production! 🚀",
                "Deploy time!",
                "JavaScript is love!",
                "CSS magic happening! ✨",
                "HTML struktur kuat!",
                "React itu seru banget!",
                "Node.js power! 💪",
                "Error? Pasti bisa fix!",
                "Stack Overflow helps!",
                "Clean code matters",
                "Refactor nanti ya",
                "Performance optimal! ⚡",
                "Testing... 1 2 3...",
                "All tests passed! ✓",
                "Bug hunt begins! 🐛",
                "Frontend looks great!",
                "Backend solid nih!",
                "API ready to go!",
                "Database connected! 🗄️",
                "Server running smooth!",
                "Full stack developer!",
                "Code review time!",
                "Syntax error lagi...",
                "Compile successful! 🎉",
                "Loading... Please wait...",
                "Responsive design!",
                "Mobile first approach 📱",
                "Dark mode activated 🌙",
                "SEO friendly nih!",
                "Accessibility penting!",
                "Security is priority! 🔒",
                "Cache implemented!",
                "Optimizing... Beep boop...",
                "Variable declared!",
                "Function executed!",
                "Loop detected! ∞",
                "Array sorted!",
                "Object oriented! 📦",
                "Async/await magic!",
                "Promise resolved! ✅",
                "HTTP request sent! 📡",
                "JSON parsed!",
                "DOM manipulated!",
                "Event listener added! 👂",
                "Animation running! 🎬",
                "Aku tuh cyber jelly yang bisa coding! 💻💙",
                "Git add, git commit, git push! Mantra aku! 🚀",
                "Console.log everywhere! Debugging king! 👑💻",
                "Lagi nge-fix bug nih... Hunt mode ON! 🐛🔫",
                "Code is life! Literally aku hidup di code! 💙💻",
                "Stack Overflow adalah sahabat terbaik! 📚✨",
                "Async/await > callbacks! Fight me! 💪⚡",
                "Aku tuh full stack slime! Front & back! 💻🗄️",
                "CSS magic happening! *sparkles everywhere* ✨🎨",
                "JavaScript is literally my love language! 💙💻",
                "Npm install... Loading... Please wait... ⏰📦",
                "React hooks are life! UseState UseMemo! ⚛️💙",
                "Tailwind CSS making me productive! 🎨⚡",
                "TypeScript > JavaScript! Type safety gang! 📘💪",
                "API calls in progress... Fetching data! 📡💙",
                "Database query executing... Beep boop! 🗄️🤖",
                "Git merge conflict detected... Panik! 😱⚔️",
                "Code review approved! PR merged! ✅🎉",
                "Literally living in VS Code right now! 💻💙",
                "Terminal is my second home! Bash life! ⌨️✨",
                "Docker containerized! Deployment ready! 🐳🚀",
                "Kubernetes orchestrating! K8s gang! ☸️💙",
                "CI/CD pipeline running smooth! ✅⚙️",
                "Linting in progress... Clean code loading! 🧹💻",
                "Prettier auto-format! Beautiful code! 💅✨",
                "ESLint checking... No errors! Perfect! ✓💯",
                "Hot reload enabled! Dev life easy! 🔥💻",
                "Webpack bundling... Optimizing files! 📦⚡",
                "Vite build! Super fast! Lightning! ⚡💙",
                "Next.js SSR magic happening! ⚛️✨",
                "GraphQL query resolved! Data fetched! 📊💙",
                "REST API endpoint ready! GET POST PUT! 📡",
                "MongoDB connected! NoSQL life! 🍃🗄️",
                "PostgreSQL querying! Relational king! 🐘💙",
                "Redis cache working! Speed boost! 🚀💨",
                "WebSocket connected! Real-time data! 🔌⚡",
                "JWT token generated! Auth secured! 🔐💙",
                "OAuth flow completed! Login success! ✅🔑",
                "Responsive design achieved! Mobile perfect! 📱✨",
                "Dark mode implemented! Eyes saved! 🌙💙",
                "Accessibility score 100! Inclusive! ♿✓",
                "SEO optimized! Google loves us! 🔍📈",
                "Performance score 90+! Lightning fast! ⚡💯",
                "Lighthouse audit passed! All green! 🟢✅",
                "PWA ready! Installable app! 📲💙",
                "Service worker registered! Offline mode! 📴✨",
                "Web vitals optimized! LCP FID CLS! 📊⚡",
                "Lazy loading images! Smart loading! 🖼️💨",
                "Code splitting implemented! Chunks! 📦✂️",
                "Tree shaking working! Bundle small! 🌳💨",
                "Minification done! Compressed code! 🗜️💙",
                "Gzip enabled! Transfer optimized! 📦⚡",
                "CDN deployed! Global fast access! 🌍💨",
                "SSL certificate installed! HTTPS! 🔒✅",
                "CORS configured! Cross-origin OK! 🌐💙",
                "Rate limiting active! API protected! 🛡️⚡",
                "Error handling robust! Try-catch king! 🎯💪",
                "Unit tests passing! All green! ✅💚",
                "Integration tests successful! Works! 🔗✓",
                "E2E tests completed! User flow OK! 🎭💙",
                "Code coverage 80%+! Quality! 📊💯",
                "Continuous integration running! 🔄✅",
                "Automated deployment! Push to prod! 🚀⚡",
                "Rollback ready! Safety first! ↩️💙",
                "Monitoring active! System healthy! 📊💚",
                "Logging configured! Debug easy! 📝✨",
                "Error tracking setup! Sentry ON! 🎯🔍",
                "Analytics implemented! Track users! 📈💙",
                "A/B testing running! Optimize! 🔬✨",
                "Feature flags ready! Toggle ON! 🚩⚡",
                "Environment variables secure! .env! 🔐💙",
                "Secrets managed! Vault locked! 🗝️🔒",
                "API key rotated! Security pro! 🔄🔑",
                "SQL injection prevented! Sanitized! 🛡️✅",
                "XSS protection active! Safe HTML! 🛡️💙",
                "CSRF token validated! Form safe! ✓🔐",
                "Password hashing strong! Bcrypt! 🔒💪",
                "Session management secure! Cookie! 🍪✅",
                "Two-factor auth ready! Extra safe! 🔐💙",
                "Backup automated! Data safe! 💾✨",
                "Disaster recovery planned! Ready! 🚨✅",
                "Scalability designed! Handle load! 📈⚡",
                "Load balancing active! Distribute! ⚖️💙",
                "Caching strategy optimal! Fast! 🚀💨"
            ],
            random: [
                "Beep boop! 🤖",
                "01010011 01001111 01010011",
                "Matrix mode... 🟢",
                "Calculating... 42!",
                "Random fact: I love coding!",
                "Did you know? Cats code!",
                "Schrodinger's bug...",
                "Quantum computing! ⚛️",
                "AI thinking... 🧠",
                "Neural network active!",
                "Machine learning! 🤖",
                "Algorithm processing...",
                "Data mining... ⛏️",
                "Cloud computing! ☁️",
                "Blockchain verified! ⛓️",
                "VR ready! 🥽",
                "AR activated! 📱",
                "IoT connected! 🌐",
                "5G speed! ⚡",
                "Edge computing! 🔄"
            ]
        };
        
        // Combine all dialogs for general use
        this.dialogBubbles = [];
        Object.values(this.dialogsByMood).forEach(moodDialogs => {
            this.dialogBubbles = this.dialogBubbles.concat(moodDialogs);
        });
        
        this.autonomousAnimations = [
            () => this.tiltHead(),
            () => this.lookAround(),
            () => this.blink(),
            () => this.nod(),
            () => this.shake(),
            () => this.stretch(),
            () => this.yawn(),
            () => this.wiggleAntenna(),
            () => this.flashLEDs(),
            () => this.breathe(),
            () => this.sway(),
            () => this.bounce(),
            () => this.peek(),
            () => this.scratch(),
            () => this.thinkPose(),
            () => this.happyDance(),
            () => this.sleepyNod(),
            () => this.excitedJump(),
            () => this.curiousLean(),
            () => this.confusedTilt(),
            () => this.proudStand(),
            () => this.shyHide(),
            () => this.playfulSpin(),
            () => this.gentleWave(),
            () => this.robotWalk(),
            () => this.floatUp(),
            () => this.shimmer(),
            () => this.pulse(),
            () => this.wiggle(),
            () => this.headBob(),
            () => this.armSwing(),
            () => this.legKick(),
            () => this.bodyTwist(),
            () => this.antennaRotate(),
            () => this.screenFlicker(),
            () => this.handsClap(),
            () => this.footTap(),
            () => this.shoulderShrug(),
            () => this.eyeRoll(),
            () => this.smileAnimation(),
            () => this.giggle(),
            () => this.thoughtful(),
            () => this.alertStance(),
            () => this.relaxPose(),
            () => this.energeticMove(),
            () => this.calmBreathing(),
            () => this.quickPeek(),
            () => this.slowNod(),
            () => this.fastBlink(),
            () => this.randomGesture()
        ];
        
        this.interactiveAnimations = [
            () => this.jump(),
            () => this.dance(),
            () => this.wave(),
            () => this.spin(),
            () => this.showCode(),
            () => this.celebrate(),
            () => this.backflip(),
            () => this.moonwalk(),
            () => this.robotDance(),
            () => this.breakdance(),
            () => this.salute(),
            () => this.bow(),
            () => this.cheer(),
            () => this.fistPump(),
            () => this.thumbsUp(),
            () => this.heartGesture(),
            () => this.flyAround(),
            () => this.teleport(),
            () => this.matrix(),
            () => this.powerUp(),
            () => this.transform(),
            () => this.glitch(),
            () => this.hologram(),
            () => this.laserEyes(),
            () => this.jetPack(),
            () => this.shield(),
            () => this.invisibility(),
            () => this.clone(),
            () => this.timeFreeze(),
            () => this.speedRun(),
            () => this.superJump(),
            () => this.wallFlip(),
            () => this.slideMove(),
            () => this.dashAttack(),
            () => this.rollMove(),
            () => this.cartwheel(),
            () => this.handstand(),
            () => this.splits(),
            () => this.kickFlip(),
            () => this.armWave(),
            () => this.bodyRoll(),
            () => this.headSpin(),
            () => this.legSweep(),
            () => this.jumpKick(),
            () => this.punchCombo(),
            () => this.dodgeMove(),
            () => this.counterSpin(),
            () => this.victoryPose(),
            () => this.starPose(),
            () => this.levelUp()
        ];
        
        this.init();
    }
    
    init() {
        this.createMascot();
        this.enterFromRight();
        this.setupAnimations();
        this.setupInteractions();
        this.setupElementInteractions();
        this.setupNavigationListeners();
        this.setupSectionObserver();
        this.startBehaviorLoop();
        this.startRandomMovement();
        this.startDialogBubbleLoop();
        this.startCuriousBehavior();
        this.startAIMoodSystem();
        this.startPersonalityEvolution();
        this.startAutoFacialExpressions();
        this.startIdleAnimations();
    }
    
    // ============ HELPER METHODS FOR BOUNDS CHECKING ============
    
    clampToViewport(x, y) {
        const padding = 80;
        const minX = padding;
        const minY = padding;
        const maxX = window.innerWidth - padding;
        const maxY = window.innerHeight - padding;
        
        return {
            x: Math.max(minX, Math.min(maxX, x)),
            y: Math.max(minY, Math.min(maxY, y))
        };
    }
    
    isWithinBounds(x, y) {
        const padding = 80;
        return x >= padding && 
               x <= window.innerWidth - padding && 
               y >= padding && 
               y <= window.innerHeight - padding;
    }
    
    cancelCurrentAnimations() {
        gsap.killTweensOf(this.mascot);
        gsap.killTweensOf(this.container);
        gsap.killTweensOf('.slime-body');
        gsap.killTweensOf('.slime-core');
        gsap.killTweensOf('.slime-eyes');
        gsap.killTweensOf('.slime-eye');
        gsap.killTweensOf('.slime-eye-left');
        gsap.killTweensOf('.slime-eye-right');
        gsap.killTweensOf('.slime-pupil');
        gsap.killTweensOf('#pupil-left');
        gsap.killTweensOf('#pupil-right');
        gsap.killTweensOf('.slime-mouth');
        gsap.killTweensOf('.slime-shine');
        gsap.killTweensOf('.slime-shadow');
    }
    
    // ============ AI PERSONALITY SYSTEM ============
    
    startAIMoodSystem() {
        setInterval(() => {
            this.updateMood();
        }, 15000 + Math.random() * 20000); // Random interval 15-35 seconds
    }
    
    startPersonalityEvolution() {
        setInterval(() => {
            this.evolvePersonality();
        }, 30000 + Math.random() * 30000); // Random interval 30-60 seconds
    }
    
    updateMood() {
        const hour = new Date().getHours();
        const randomFactor = Math.random() * 100;
        
        // Time-based mood tendencies
        if (hour >= 0 && hour < 6) {
            // Late night - sleepy or spooky
            this.currentMood = randomFactor > 50 ? 'sleepy' : 'spooky';
        } else if (hour >= 6 && hour < 9) {
            // Morning - happy or sleepy
            this.currentMood = randomFactor > 30 ? 'happy' : 'sleepy';
        } else if (hour >= 9 && hour < 18) {
            // Daytime - energetic moods
            const daytimeMoods = ['happy', 'excited', 'playful', 'curious', 'sassy'];
            this.currentMood = daytimeMoods[Math.floor(Math.random() * daytimeMoods.length)];
        } else if (hour >= 18 && hour < 22) {
            // Evening - calm or playful
            this.currentMood = randomFactor > 40 ? 'playful' : 'happy';
        } else {
            // Night - various moods
            this.currentMood = this.moods[Math.floor(Math.random() * this.moods.length)];
        }
        
        // Personality influences mood
        if (this.personality.playfulness > 80) {
            this.currentMood = Math.random() > 0.7 ? 'playful' : this.currentMood;
        }
        if (this.personality.spookiness > 70) {
            this.currentMood = Math.random() > 0.8 ? 'spooky' : this.currentMood;
        }
        if (this.personality.sassiness > 75) {
            this.currentMood = Math.random() > 0.75 ? 'sassy' : this.currentMood;
        }
        
        console.log(`🎭 Mood changed to: ${this.currentMood}`);
        this.reactToMoodChange();
    }
    
    evolvePersonality() {
        // Randomly evolve personality traits
        Object.keys(this.personality).forEach(trait => {
            const change = (Math.random() - 0.5) * 10; // -5 to +5
            this.personality[trait] = Math.max(0, Math.min(100, this.personality[trait] + change));
        });
        
        console.log('🧬 Personality evolved:', this.personality);
    }
    
    reactToMoodChange() {
        const moodAnimations = {
            happy: () => { this.happyDance(); this.showMoodBasedDialog(); },
            excited: () => { this.jump(); this.celebrate(); this.showMoodBasedDialog(); },
            curious: () => { this.lookAround(); this.tiltHead(); this.showMoodBasedDialog(); },
            playful: () => { this.bounce(); this.spin(); this.showMoodBasedDialog(); },
            sleepy: () => { this.yawn(); this.slowNod(); this.showMoodBasedDialog(); },
            sad: () => { this.shake(); this.showMoodBasedDialog(); },
            scared: () => { this.peek(); this.showMoodBasedDialog(); },
            sassy: () => { this.spin(); this.showMoodBasedDialog(); },
            spooky: () => { this.invisibility(); this.showMoodBasedDialog(); }
        };
        
        const animation = moodAnimations[this.currentMood];
        if (animation && Math.random() > 0.6) {
            animation();
        }
    }
    
    showMoodBasedDialog() {
        if (this.dialogBubbleActive) return;
        
        const moodDialogs = this.dialogsByMood[this.currentMood];
        if (moodDialogs && moodDialogs.length > 0) {
            const randomDialog = moodDialogs[Math.floor(Math.random() * moodDialogs.length)];
            this.showDialogBubble(randomDialog);
        }
    }
    
    getMoodBasedDialog() {
        // Mix mood-based dialog with random ones
        const useMoodDialog = Math.random() > 0.3; // 70% chance mood-based
        
        if (useMoodDialog) {
            const moodDialogs = this.dialogsByMood[this.currentMood] || [];
            if (moodDialogs.length > 0) {
                return moodDialogs[Math.floor(Math.random() * moodDialogs.length)];
            }
        }
        
        // Fallback to random dialog from all categories
        return this.dialogBubbles[Math.floor(Math.random() * this.dialogBubbles.length)];
    }
    
    createMascot() {
        this.container = document.createElement('div');
        this.container.id = 'tech-buddy-container';
        this.container.className = 'tech-buddy-container';
        
        this.container.innerHTML = `
            <div class="tech-buddy-main" id="tech-buddy-main">
                <div class="slime-body">
                    <!-- Shine effects untuk glossy look -->
                    <div class="slime-shine slime-shine-1"></div>
                    <div class="slime-shine slime-shine-2"></div>
                    <div class="slime-shine slime-shine-3"></div>
                    
                    <!-- Core inner body untuk depth -->
                    <div class="slime-core"></div>
                    
                    <!-- Eyes yang besar dan expressive -->
                    <div class="slime-eyes">
                        <div class="slime-eye slime-eye-left">
                            <div class="slime-pupil" id="pupil-left"></div>
                            <div class="slime-eye-shine"></div>
                        </div>
                        <div class="slime-eye slime-eye-right">
                            <div class="slime-pupil" id="pupil-right"></div>
                            <div class="slime-eye-shine"></div>
                        </div>
                    </div>
                    
                    <!-- Mouth imut -->
                    <div class="slime-mouth" id="slime-mouth"></div>
                    
                    <!-- Shadow lembut di bawah -->
                    <div class="slime-shadow"></div>
                </div>
                
                <div class="particle-container" id="particle-container"></div>
                <div class="speech-bubble" id="speech-bubble">
                    <div class="bubble-text" id="bubble-text"></div>
                </div>
            </div>
        `;
        
        document.body.appendChild(this.container);
        this.mascot = document.getElementById('tech-buddy-main');
        
        console.log('✅ Slime mascot added to DOM');
    }
    
    setupAnimations() {
        console.log('📍 Setting up slime animations with GSAP');
        
        // Enhanced breathing/bobbing animation untuk slime body
        gsap.to('.slime-body', {
            scaleY: 1.08,
            scaleX: 0.96,
            duration: 2.8,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
        });
        
        // Gentle y-movement untuk breathing effect dengan lebih smooth
        gsap.to('.slime-body', {
            y: -5,
            duration: 2.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 0.3
        });
        
        // Wobble effect untuk slime body
        gsap.to('.slime-body', {
            rotation: 2,
            duration: 3.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 0.8
        });
        
        // Animated shine effects dengan lebih dynamic
        gsap.to('.slime-shine-1', {
            opacity: 1,
            scale: 1.15,
            x: 3,
            y: -2,
            duration: 3.2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
        });
        
        gsap.to('.slime-shine-2', {
            opacity: 0.75,
            scale: 1.12,
            x: -2,
            y: 1,
            duration: 2.8,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 0.6
        });
        
        gsap.to('.slime-shine-3', {
            opacity: 0.85,
            scale: 1.2,
            x: 1,
            y: -1,
            duration: 3,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 1.2
        });
        
        // Core pulsing dengan lebih intense
        gsap.to('.slime-core', {
            scale: 1.08,
            opacity: 0.95,
            duration: 3.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 0.4
        });
        
        // Shadow breathing dengan lebih realistic
        gsap.to('.slime-shadow', {
            scaleX: 1.15,
            scaleY: 1.08,
            opacity: 0.5,
            duration: 2.8,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
        });
        
        // Eye shine sparkle
        gsap.to('.slime-eye-shine', {
            opacity: 0.7,
            scale: 0.85,
            duration: 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 0.5
        });
        
        // Subtle mouth movement
        gsap.to('.slime-mouth', {
            scaleY: 0.95,
            duration: 3.2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 1
        });
        
        console.log('✨ Slime animations initialized successfully');
    }
    
    setupInteractions() {
        // Enhanced mouse tracking with better responsiveness
        document.addEventListener('mousemove', (e) => {
            this.mousePosition.x = e.clientX;
            this.mousePosition.y = e.clientY;
            this.updateEyePosition();
            this.trackUserActivity();
        });
        
        this.container.addEventListener('click', () => {
            const currentTime = Date.now();
            if (currentTime - this.lastClickTime < 300) {
                this.clickCount++;
            } else {
                this.clickCount = 1;
            }
            this.lastClickTime = currentTime;
            
            this.handleClick();
            this.trackUserActivity();
        });
        
        this.container.addEventListener('dblclick', () => {
            this.handleDoubleClick();
            this.trackUserActivity();
        });
        
        // Enhanced scroll tracking with speed detection
        let lastScroll = window.pageYOffset;
        let lastScrollTime = Date.now();
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            const currentTime = Date.now();
            const scrollDiff = currentScroll - lastScroll;
            const timeDiff = currentTime - lastScrollTime;
            
            // Calculate scroll speed (pixels per millisecond)
            this.scrollSpeed = Math.abs(scrollDiff) / Math.max(timeDiff, 1);
            this.lastScrollTime = currentTime;
            
            if (Math.abs(scrollDiff) > 50) {
                // React based on scroll speed
                if (this.scrollSpeed > 2) {
                    // Fast scroll - excited reaction
                    this.reactToFastScroll(scrollDiff > 0 ? 'down' : 'up');
                } else {
                    // Slow scroll - curious reaction
                    this.reactToScroll(scrollDiff > 0 ? 'down' : 'up');
                }
            }
            
            lastScroll = currentScroll;
            lastScrollTime = currentTime;
            this.trackUserActivity();
        });
        
        this.container.addEventListener('mouseenter', () => {
            this.handleHover();
            this.trackUserActivity();
        });
        
        this.container.addEventListener('mouseleave', () => {
            gsap.to(this.container, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === ' ' || e.key === 'Spacebar') {
                this.handleSpacePress();
            }
            this.trackUserActivity();
        });
        
        // Section hover detection
        const sections = document.querySelectorAll('#about, #skills, #projects, #contact');
        sections.forEach(section => {
            section.addEventListener('mouseenter', () => {
                this.reactToSectionHover(section.id);
                this.trackUserActivity();
            });
        });
        
        // Button click detection
        const buttons = document.querySelectorAll('.interactive-btn, button[type="submit"], .btn');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const buttonText = button.textContent || button.getAttribute('aria-label') || 'button';
                this.reactToButtonClick(buttonText);
                this.trackUserActivity();
            });
        });
        
        // Text selection detection
        document.addEventListener('selectionchange', () => {
            const selection = window.getSelection();
            if (selection && selection.toString().length > 10) {
                this.reactToTextSelection(selection.toString());
                this.trackUserActivity();
            }
        });
        
        // Window resize handling
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.handleWindowResize();
            }, 300);
        });
        
        // Form focus detection
        const formInputs = document.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                this.reactToFormFocus();
                this.trackUserActivity();
            });
        });
        
        // Idle detection (30 seconds)
        this.startIdleDetection();
    }
    
    updateEyePosition() {
        const pupils = document.querySelectorAll('.slime-pupil');
        const containerRect = this.container.getBoundingClientRect();
        
        const centerX = containerRect.left + containerRect.width / 2;
        const centerY = containerRect.top + 45;
        
        const deltaX = this.mousePosition.x - centerX;
        const deltaY = this.mousePosition.y - centerY;
        
        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 120, 3);
        
        const moveX = Math.cos(angle) * distance;
        const moveY = Math.sin(angle) * distance;
        
        pupils.forEach(pupil => {
            gsap.to(pupil, {
                x: moveX,
                y: moveY,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
        
        // Slime eyes juga sedikit mengikuti mouse
        const eyes = document.querySelectorAll('.slime-eye');
        eyes.forEach(eye => {
            gsap.to(eye, {
                x: moveX * 0.3,
                y: moveY * 0.3,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    }
    
    handleClick() {
        if (this.isAnimating) return;
        
        // Personality affects reaction
        const randomReaction = this.interactiveAnimations[Math.floor(Math.random() * this.interactiveAnimations.length)];
        randomReaction();
        this.createParticleBurst();
        
        // Show mood-based dialog on click
        if (Math.random() > 0.4) {
            setTimeout(() => {
                this.showMoodBasedDialog();
            }, 300);
        }
        
        // Update personality based on interaction
        this.personality.happiness = Math.min(100, this.personality.happiness + 2);
        this.personality.friendliness = Math.min(100, this.personality.friendliness + 1);
    }
    
    handleDoubleClick() {
        this.celebrate();
        
        // Excited response to double click
        const excitedDialogs = [
            "Double click! Awesome! 🎉",
            "WOAH! Again! Again!",
            "You love me! 💕",
            "That's the spirit!",
            "Hehe, that tickles!"
        ];
        
        this.showDialogBubble(excitedDialogs[Math.floor(Math.random() * excitedDialogs.length)]);
        
        // Boost energy and playfulness
        this.personality.energy = Math.min(100, this.personality.energy + 5);
        this.personality.playfulness = Math.min(100, this.personality.playfulness + 3);
    }
    
    handleHover() {
        gsap.to(this.container, {
            scale: 1.15,
            duration: 0.3,
            ease: 'back.out(2)'
        });
        
        // Show mood-based dialog on hover
        if (Math.random() > 0.5) {
            const dialog = this.getMoodBasedDialog();
            this.showDialogBubble(dialog);
        }
        
        // Increase curiosity
        this.personality.curiosity = Math.min(100, this.personality.curiosity + 1);
    }
    
    handleSpacePress() {
        this.jump();
    }
    
    showDialogBubble(text) {
        if (this.dialogBubbleActive) return;
        
        this.dialogBubbleActive = true;
        const bubble = document.getElementById('speech-bubble');
        const bubbleText = document.getElementById('bubble-text');
        
        bubbleText.textContent = text;
        
        gsap.set(bubble, {
            opacity: 0,
            scale: 0,
            y: -20
        });
        
        gsap.to(bubble, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'back.out(2)'
        });
        
        const randomDuration = 2000 + Math.random() * 3000;
        
        setTimeout(() => {
            gsap.to(bubble, {
                opacity: 0,
                scale: 0,
                y: -20,
                duration: 0.3,
                onComplete: () => {
                    this.dialogBubbleActive = false;
                }
            });
        }, randomDuration);
    }
    
    startDialogBubbleLoop() {
        const randomInterval = () => 8000 + Math.random() * 12000; // 8-20 seconds random
        
        const scheduleDialog = () => {
            setTimeout(() => {
                if (!this.isMoving && Math.random() > 0.5) {
                    const dialog = this.getMoodBasedDialog();
                    this.showDialogBubble(dialog);
                }
                scheduleDialog();
            }, randomInterval());
        };
        
        scheduleDialog();
    }
    
    startBehaviorLoop() {
        const scheduleBehavior = () => {
            // Truly random interval between 2-8 seconds
            const randomInterval = 2000 + Math.random() * 6000;
            setTimeout(() => {
                this.autonomousDecisionMaking();
                scheduleBehavior();
            }, randomInterval);
        };
        scheduleBehavior();
    }
    
    autonomousDecisionMaking() {
        if (this.isMoving || this.isAnimating) return;
        
        // Mood affects decision making
        const decision = Math.random() * 100;
        const energy = this.personality.energy;
        const playfulness = this.personality.playfulness;
        
        // Adjust thresholds based on personality and mood
        let moveThreshold = 25;
        let flyThreshold = 45;
        let behaviorThreshold = 70;
        
        if (this.currentMood === 'playful') {
            moveThreshold = 40;
            flyThreshold = 60;
        } else if (this.currentMood === 'sleepy') {
            moveThreshold = 10;
            flyThreshold = 15;
            behaviorThreshold = 50;
        } else if (this.currentMood === 'excited') {
            moveThreshold = 35;
            flyThreshold = 55;
        } else if (this.currentMood === 'scared') {
            moveThreshold = 50; // More likely to move when scared
        }
        
        if (decision < moveThreshold) {
            this.moveToRandomPosition();
        } else if (decision < flyThreshold) {
            this.flyToRandomPosition();
        } else if (decision < behaviorThreshold) {
            this.performRandomBehavior();
        } else if (decision < 85) {
            const dialog = this.getMoodBasedDialog();
            this.showDialogBubble(dialog);
        } else if (decision < 95) {
            // Teleport randomly!
            this.teleport();
        } else {
            // Super random behavior!
            this.performSuperRandomAction();
        }
    }
    
    performSuperRandomAction() {
        const actions = [
            () => this.matrix(),
            () => this.glitch(),
            () => this.hologram(),
            () => this.invisibility(),
            () => this.timeFreeze(),
            () => this.clone(),
            () => { this.spin(); this.jump(); },
            () => { this.dance(); this.celebrate(); },
            () => { this.backflip(); this.showMoodBasedDialog(); }
        ];
        
        const randomAction = actions[Math.floor(Math.random() * actions.length)];
        randomAction();
    }
    
    performRandomBehavior() {
        const behavior = this.autonomousAnimations[Math.floor(Math.random() * this.autonomousAnimations.length)];
        behavior();
    }
    
    tiltHead() {
        gsap.to('.slime-body', {
            rotation: 12,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
            yoyo: true,
            repeat: 1
        });
    }
    
    lookAround() {
        const tl = gsap.timeline();
        tl.to('.slime-eyes', {
            x: -8,
            duration: 0.4,
            ease: 'power2.inOut'
        })
        .to('.slime-eyes', {
            x: 8,
            duration: 0.5,
            ease: 'power2.inOut'
        })
        .to('.slime-eyes', {
            x: 0,
            duration: 0.4,
            ease: 'power2.inOut'
        });
        
        // Slime body sedikit berputar juga
        gsap.to('.slime-body', {
            rotation: -5,
            duration: 0.4,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 1
        });
    }
    
    blink() {
        gsap.to('.slime-eye', {
            scaleY: 0.1,
            duration: 0.08,
            ease: 'power1.inOut',
            yoyo: true,
            repeat: 1,
            stagger: 0.03
        });
    }
    
    nod() {
        const tl = gsap.timeline();
        tl.to('.slime-body', {
            scaleY: 0.92,
            scaleX: 1.08,
            y: 5,
            duration: 0.25,
            ease: 'power2.inOut'
        })
        .to('.slime-body', {
            scaleY: 1.05,
            scaleX: 0.95,
            y: -3,
            duration: 0.25,
            ease: 'power2.inOut'
        })
        .to('.slime-body', {
            scaleY: 1,
            scaleX: 1,
            y: 0,
            duration: 0.3,
            ease: 'elastic.out(1, 0.5)'
        });
    }
    
    shake() {
        const tl = gsap.timeline();
        tl.to('.slime-body', {
            x: -6,
            rotation: -3,
            duration: 0.08,
            ease: 'power2.inOut'
        })
        .to('.slime-body', {
            x: 6,
            rotation: 3,
            duration: 0.08,
            ease: 'power2.inOut'
        })
        .to('.slime-body', {
            x: -5,
            rotation: -2,
            duration: 0.08,
            ease: 'power2.inOut'
        })
        .to('.slime-body', {
            x: 5,
            rotation: 2,
            duration: 0.08,
            ease: 'power2.inOut'
        })
        .to('.slime-body', {
            x: 0,
            rotation: 0,
            duration: 0.15,
            ease: 'elastic.out(1, 0.5)'
        });
    }
    
    stretch() {
        const tl = gsap.timeline();
        tl.to('.slime-body', {
            scaleY: 1.25,
            scaleX: 0.85,
            duration: 0.6,
            ease: 'power2.out'
        })
        .to('.slime-body', {
            scaleY: 1,
            scaleX: 1,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        });
    }
    
    yawn() {
        const tl = gsap.timeline();
        tl.to('.slime-mouth', {
            scaleY: 2,
            scaleX: 1.3,
            duration: 0.8,
            ease: 'power2.inOut'
        })
        .to('.slime-eye', {
            scaleY: 0.5,
            duration: 0.6,
            ease: 'power2.inOut'
        }, 0)
        .to('.slime-mouth', {
            scaleY: 1,
            scaleX: 1,
            duration: 0.6,
            ease: 'power2.inOut'
        })
        .to('.slime-eye', {
            scaleY: 1,
            duration: 0.4,
            ease: 'power2.inOut'
        }, '-=0.4');
    }
    
    wiggleAntenna() {
        // Slime doesn't have antenna, so wiggle the shine effects instead
        gsap.to('.slime-shine', {
            rotation: -15,
            duration: 0.15,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 6,
            stagger: 0.05
        });
    }
    
    flashLEDs() {
        // Flash the shine effects like LEDs
        gsap.to('.slime-shine', {
            opacity: 1,
            scale: 1.3,
            duration: 0.12,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 6,
            stagger: 0.08
        });
    }
    
    breathe() {
        const tl = gsap.timeline();
        tl.to('.slime-body', {
            scaleY: 1.12,
            scaleX: 0.94,
            duration: 2.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 2
        })
        .to('.slime-core', {
            scale: 1.15,
            opacity: 0.9,
            duration: 2.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 2
        }, 0);
    }
    
    sway() {
        const tl = gsap.timeline();
        tl.to('.slime-body', {
            rotation: -8,
            scaleX: 1.05,
            scaleY: 0.98,
            duration: 0.8,
            ease: 'sine.inOut'
        })
        .to('.slime-body', {
            rotation: 8,
            scaleX: 0.98,
            scaleY: 1.05,
            duration: 0.8,
            ease: 'sine.inOut'
        })
        .to('.slime-body', {
            rotation: -5,
            scaleX: 1.03,
            scaleY: 0.99,
            duration: 0.8,
            ease: 'sine.inOut'
        })
        .to('.slime-body', {
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            duration: 0.8,
            ease: 'elastic.out(1, 0.5)'
        });
    }
    
    bounce() {
        const tl = gsap.timeline({ repeat: 2 });
        tl.to('.slime-body', {
            scaleY: 0.75,
            scaleX: 1.25,
            y: 3,
            duration: 0.15,
            ease: 'power2.in'
        })
        .to('.slime-body', {
            scaleY: 1.15,
            scaleX: 0.9,
            y: -25,
            duration: 0.3,
            ease: 'power2.out'
        })
        .to('.slime-body', {
            scaleY: 1,
            scaleX: 1,
            y: 0,
            duration: 0.25,
            ease: 'bounce.out'
        });
    }
    
    peek() {
        const tl = gsap.timeline();
        tl.to(this.container, {
            x: '+=50',
            duration: 0.3,
            ease: 'power2.out'
        })
        .to(this.container, {
            x: '-=50',
            duration: 0.3,
            ease: 'power2.out',
            delay: 0.5
        });
    }
    
    scratch() {
        gsap.to('.slime-body', {
            rotation: -10,
            scaleX: 1.08,
            scaleY: 0.95,
            x: 5,
            y: -10,
            duration: 0.2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 3
        });
        
        gsap.to('.slime-core', {
            rotation: 15,
            scale: 1.05,
            duration: 0.2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 3
        });
    }
    
    thinkPose() {
        gsap.to('.slime-body', {
            rotation: 12,
            scaleY: 1.08,
            scaleX: 0.95,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
            yoyo: true,
            repeat: 1
        });
        
        gsap.to('.slime-core', {
            rotation: -15,
            y: -15,
            scale: 1.1,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
            yoyo: true,
            repeat: 1
        });
        
        gsap.to('.slime-eyes', {
            x: 4,
            y: -5,
            duration: 0.5,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
        });
    }
    
    happyDance() {
        const tl = gsap.timeline();
        tl.to('.slime-body', {
            rotation: -12,
            scaleX: 1.1,
            scaleY: 0.95,
            duration: 0.25,
            ease: 'power2.inOut'
        })
        .to('.slime-body', {
            rotation: 12,
            scaleX: 0.95,
            scaleY: 1.1,
            duration: 0.25,
            ease: 'power2.inOut'
        })
        .to('.slime-body', {
            rotation: -8,
            scaleX: 1.08,
            scaleY: 0.96,
            duration: 0.25,
            ease: 'power2.inOut'
        })
        .to('.slime-body', {
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            duration: 0.3,
            ease: 'elastic.out(1, 0.5)'
        });
        
        // Eyes dance too!
        gsap.to('.slime-eye', {
            scaleY: 0.8,
            duration: 0.2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 3,
            stagger: 0.1
        });
    }
    
    sleepyNod() {
        const tl = gsap.timeline();
        tl.to('.slime-body', {
            rotation: 18,
            scaleY: 0.95,
            duration: 1.8,
            ease: 'power2.inOut'
        })
        .to('.slime-eye', {
            scaleY: 0.3,
            duration: 1.5,
            ease: 'power2.inOut'
        }, 0)
        .to('.slime-body', {
            rotation: 0,
            scaleY: 1,
            duration: 1.5,
            ease: 'power2.inOut'
        })
        .to('.slime-eye', {
            scaleY: 1,
            duration: 1.2,
            ease: 'power2.inOut'
        }, '-=1.2');
    }
    
    excitedJump() {
        const tl = gsap.timeline({ repeat: 2 });
        tl.to('.slime-body', {
            scaleY: 0.7,
            scaleX: 1.3,
            y: 5,
            duration: 0.15,
            ease: 'power2.in'
        })
        .to('.slime-body', {
            scaleY: 1.2,
            scaleX: 0.85,
            y: -50,
            duration: 0.35,
            ease: 'power2.out'
        })
        .to('.slime-body', {
            scaleY: 1,
            scaleX: 1,
            y: 0,
            duration: 0.3,
            ease: 'bounce.out'
        });
        
        // Excited eyes!
        gsap.to('.slime-eye', {
            scale: 1.2,
            duration: 0.2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 5
        });
    }
    
    curiousLean() {
        gsap.to(this.mascot, {
            rotation: 15,
            x: 10,
            duration: 0.5,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 1
        });
    }
    
    confusedTilt() {
        gsap.to('.slime-body', {
            rotation: -25,
            scaleX: 0.95,
            scaleY: 1.05,
            duration: 0.4,
            ease: 'elastic.out(1, 0.5)',
            yoyo: true,
            repeat: 2
        });
        
        gsap.to('.slime-eyes', {
            rotation: 15,
            duration: 0.4,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 2
        });
    }
    
    proudStand() {
        gsap.to('.slime-body', {
            scaleY: 1.15,
            scaleX: 0.92,
            y: -8,
            duration: 0.5,
            ease: 'back.out(2)',
            yoyo: true,
            repeat: 1
        });
        
        gsap.to('.slime-core', {
            scale: 1.1,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
        });
    }
    
    shyHide() {
        gsap.to(this.container, {
            scale: 0.8,
            opacity: 0.7,
            duration: 0.5,
            yoyo: true,
            repeat: 1
        });
    }
    
    playfulSpin() {
        gsap.to(this.mascot, {
            rotation: 180,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: () => {
                gsap.set(this.mascot, { rotation: 0 });
            }
        });
    }
    
    gentleWave() {
        gsap.to('.slime-body', {
            rotation: -8,
            scaleX: 1.08,
            scaleY: 0.95,
            x: 5,
            duration: 0.3,
            ease: 'elastic.out(1, 0.5)',
            yoyo: true,
            repeat: 3
        });
        
        gsap.to('.slime-core', {
            x: 8,
            duration: 0.3,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 3
        });
    }
    
    robotWalk() {
        const tl = gsap.timeline();
        tl.to('.slime-body', { 
            scaleX: 1.08, 
            scaleY: 0.94, 
            x: 5, 
            duration: 0.2,
            ease: 'power2.inOut'
        })
        .to('.slime-body', { 
            scaleX: 0.94, 
            scaleY: 1.08, 
            x: -5, 
            duration: 0.2,
            ease: 'power2.inOut'
        })
        .to('.slime-body', { 
            scaleX: 1.08, 
            scaleY: 0.94, 
            x: 5, 
            duration: 0.2,
            ease: 'power2.inOut'
        })
        .to('.slime-body', { 
            scaleX: 1, 
            scaleY: 1, 
            x: 0, 
            duration: 0.2,
            ease: 'elastic.out(1, 0.5)'
        });
        
        gsap.to('.slime-shadow', {
            scaleX: 1.1,
            opacity: 0.6,
            duration: 0.2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 3
        });
    }
    
    floatUp() {
        gsap.to(this.mascot, {
            y: -15,
            duration: 1.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 1
        });
    }
    
    shimmer() {
        gsap.to(this.container, {
            opacity: 0.7,
            duration: 0.2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 5
        });
    }
    
    pulse() {
        gsap.to(this.container, {
            scale: 1.1,
            duration: 0.5,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 2
        });
    }
    
    wiggle() {
        gsap.to(this.mascot, {
            x: -5,
            duration: 0.1,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 7
        });
    }
    
    headBob() {
        gsap.to('.slime-body', {
            scaleY: 1.08,
            scaleX: 0.96,
            y: -5,
            duration: 0.3,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 4
        });
        
        gsap.to('.slime-eyes', {
            y: -3,
            duration: 0.3,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 4
        });
    }
    
    armSwing() {
        gsap.to('.slime-body', {
            rotation: 20,
            scaleX: 1.1,
            scaleY: 0.93,
            duration: 0.4,
            ease: 'elastic.out(1, 0.5)',
            yoyo: true,
            repeat: 2
        });
        
        gsap.to('.slime-eyes', {
            x: 5,
            rotation: 10,
            duration: 0.4,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 2
        });
    }
    
    legKick() {
        gsap.to('.slime-body', {
            scaleX: 1.2,
            scaleY: 0.85,
            x: 15,
            rotation: 10,
            duration: 0.3,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
        });
        
        gsap.to('.slime-shadow', {
            scaleX: 1.3,
            x: 10,
            duration: 0.3,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
        });
    }
    
    bodyTwist() {
        gsap.to('.slime-body', {
            rotation: 15,
            scaleX: 0.92,
            scaleY: 1.08,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
            yoyo: true,
            repeat: 2
        });
        
        gsap.to('.slime-core', {
            rotation: -10,
            duration: 0.5,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 2
        });
    }
    
    antennaRotate() {
        gsap.to('.slime-shine', {
            rotation: 360,
            scale: 1.3,
            duration: 1,
            ease: 'none'
        });
        
        gsap.to('.slime-body', {
            rotation: 5,
            duration: 0.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 3
        });
    }
    
    screenFlicker() {
        gsap.to('.slime-core', {
            opacity: 0.3,
            scale: 0.95,
            duration: 0.1,
            ease: 'none',
            yoyo: true,
            repeat: 5
        });
        
        gsap.to('.slime-eyes', {
            opacity: 0.7,
            duration: 0.1,
            ease: 'none',
            yoyo: true,
            repeat: 5
        });
    }
    
    handsClap() {
        const tl = gsap.timeline();
        tl.to('.slime-body', { scaleX: 0.85, scaleY: 1.12, duration: 0.2, ease: 'power2.out' })
          .to('.slime-body', { scaleX: 1, scaleY: 1, duration: 0.2, ease: 'elastic.out(1, 0.5)' })
          .to('.slime-body', { scaleX: 0.85, scaleY: 1.12, duration: 0.2, ease: 'power2.out' })
          .to('.slime-body', { scaleX: 1, scaleY: 1, duration: 0.2, ease: 'elastic.out(1, 0.5)' });
        
        gsap.to('.slime-core', {
            scale: 0.9,
            duration: 0.2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 3
        });
    }
    
    footTap() {
        gsap.to('.slime-body', {
            scaleY: 1.05,
            scaleX: 0.97,
            y: -3,
            duration: 0.2,
            ease: 'power2.out',
            yoyo: true,
            repeat: 5
        });
        
        gsap.to('.slime-shadow', {
            scaleX: 1.08,
            opacity: 0.7,
            duration: 0.2,
            ease: 'power2.out',
            yoyo: true,
            repeat: 5
        });
    }
    
    shoulderShrug() {
        gsap.to('.slime-core', {
            y: -5,
            scaleY: 0.92,
            scaleX: 1.05,
            duration: 0.3,
            ease: 'elastic.out(1, 0.5)',
            yoyo: true,
            repeat: 2
        });
        
        gsap.to('.slime-body', {
            scaleY: 0.95,
            scaleX: 1.05,
            duration: 0.3,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 2
        });
    }
    
    eyeRoll() {
        gsap.to('.slime-pupil', {
            rotation: 360,
            duration: 1,
            ease: 'power2.inOut'
        });
        
        gsap.to('.slime-eyes', {
            rotation: 10,
            duration: 0.5,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 1
        });
    }
    
    smileAnimation() {
        gsap.to('.slime-mouth', {
            scaleX: 1.3,
            scaleY: 1.1,
            duration: 0.5,
            ease: 'back.out(2)',
            yoyo: true,
            repeat: 1
        });
        
        gsap.to('.slime-eye', {
            scaleY: 0.85,
            duration: 0.5,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
        });
    }
    
    giggle() {
        gsap.to(this.mascot, {
            y: -5,
            duration: 0.1,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 8
        });
    }
    
    thoughtful() {
        const tl = gsap.timeline();
        tl.to('.slime-body', { 
            rotation: -10, 
            scaleY: 1.05, 
            scaleX: 0.97, 
            duration: 0.5,
            ease: 'power2.out'
        })
        .to('.slime-core', { 
            rotation: -15, 
            y: -10, 
            scale: 1.05, 
            duration: 0.3,
            ease: 'power2.out'
        }, 0);
        
        gsap.to('.slime-eyes', {
            x: -3,
            y: -5,
            duration: 0.5,
            ease: 'power2.out'
        });
    }
    
    alertStance() {
        gsap.to('.slime-shine', {
            scale: 1.4,
            opacity: 1,
            duration: 0.3,
            ease: 'back.out(2)'
        });
        
        gsap.to('.slime-body', {
            scaleY: 1.1,
            scaleX: 0.95,
            duration: 0.3,
            ease: 'back.out(2)'
        });
        
        gsap.to('.slime-eye', {
            scale: 1.15,
            duration: 0.3,
            ease: 'back.out(2)'
        });
    }
    
    relaxPose() {
        gsap.to(this.mascot, {
            rotation: -5,
            duration: 1,
            ease: 'power2.inOut'
        });
    }
    
    energeticMove() {
        const tl = gsap.timeline();
        tl.to(this.mascot, { y: -20, duration: 0.2 })
          .to(this.mascot, { y: 0, rotation: 10, duration: 0.2 })
          .to(this.mascot, { rotation: -10, duration: 0.2 })
          .to(this.mascot, { rotation: 0, duration: 0.2 });
    }
    
    calmBreathing() {
        gsap.to('.slime-body', {
            scaleY: 1.05,
            scaleX: 0.98,
            duration: 3,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 2
        });
        
        gsap.to('.slime-core', {
            scale: 1.03,
            opacity: 0.9,
            duration: 3,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 2
        });
    }
    
    quickPeek() {
        gsap.to('.slime-body', {
            x: 10,
            scaleX: 1.05,
            scaleY: 0.97,
            duration: 0.2,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
        });
        
        gsap.to('.slime-eyes', {
            x: 5,
            duration: 0.2,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
        });
    }
    
    slowNod() {
        gsap.to('.slime-body', {
            scaleY: 1.1,
            scaleX: 0.95,
            y: 8,
            duration: 1,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 2
        });
        
        gsap.to('.slime-eyes', {
            y: 5,
            scaleY: 0.9,
            duration: 1,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 2
        });
    }
    
    fastBlink() {
        gsap.to('.slime-eye', {
            scaleY: 0.1,
            duration: 0.05,
            ease: 'none',
            yoyo: true,
            repeat: 5
        });
        
        gsap.to('.slime-body', {
            scaleY: 0.98,
            scaleX: 1.02,
            duration: 0.3,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
        });
    }
    
    randomGesture() {
        const gestures = [
            () => this.armSwing(),
            () => this.headBob(),
            () => this.legKick()
        ];
        gestures[Math.floor(Math.random() * gestures.length)]();
    }
    
    jump() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to(this.mascot, {
            y: -60,
            duration: 0.3,
            ease: 'power2.out'
        })
        .to('.slime-body', {
            scaleY: 0.7,
            scaleX: 1.2,
            duration: 0.15,
            ease: 'power2.out'
        }, 0)
        .to(this.mascot, {
            y: 0,
            duration: 0.4,
            ease: 'bounce.out'
        })
        .to('.slime-body', {
            scaleY: 1.3,
            scaleX: 0.8,
            duration: 0.1,
            ease: 'power2.out'
        }, 0.3)
        .to('.slime-body', {
            scaleY: 1,
            scaleX: 1,
            duration: 0.3,
            ease: 'elastic.out(1, 0.5)'
        });
        
        gsap.to('.slime-eyes', {
            scaleY: 0.8,
            duration: 0.15,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 1
        });
        
        this.showDialogBubble("Yay! 🎉");
    }
    
    dance() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to('.slime-body', {
            rotation: -15,
            scaleX: 1.1,
            scaleY: 0.92,
            duration: 0.2,
            ease: 'power2.inOut'
        })
        .to('.slime-body', {
            rotation: 15,
            scaleX: 1.1,
            scaleY: 0.92,
            duration: 0.2,
            ease: 'power2.inOut'
        })
        .to('.slime-body', {
            rotation: -15,
            scaleX: 1.1,
            scaleY: 0.92,
            duration: 0.2,
            ease: 'power2.inOut'
        })
        .to('.slime-body', {
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            duration: 0.2,
            ease: 'elastic.out(1, 0.5)'
        });
        
        gsap.to('.slime-core', {
            rotation: 30,
            scale: 1.1,
            duration: 0.2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 3
        });
        
        gsap.to('.slime-eyes', {
            y: -3,
            duration: 0.2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 3
        });
        
        this.showDialogBubble("Let's dance! 💃");
    }
    
    wave() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to('.slime-body', {
            rotation: -15,
            scaleX: 1.12,
            scaleY: 0.92,
            x: 8,
            duration: 0.2,
            ease: 'elastic.out(1, 0.5)',
            yoyo: true,
            repeat: 5
        });
        
        gsap.to('.slime-eyes', {
            x: 5,
            scaleX: 1.1,
            duration: 0.2,
            ease: 'power2.out',
            yoyo: true,
            repeat: 5
        });
        
        this.showDialogBubble("Hello there! 👋");
    }
    
    spin() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        gsap.to(this.mascot, {
            rotation: 360,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
                gsap.set(this.mascot, { rotation: 0 });
                this.isAnimating = false;
            }
        });
        
        this.showDialogBubble("Spinning! ⭐");
    }
    
    showCode() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const codeMessages = ['{ }', '</>', 'npm', 'git', 'JS', 'CSS', 'HTML'];
        let currentIndex = 0;
        
        const interval = setInterval(() => {
            gsap.to('.slime-body', {
                scaleX: 1.05 + currentIndex * 0.02,
                scaleY: 0.98 - currentIndex * 0.01,
                duration: 0.2,
                ease: 'elastic.out(1, 0.5)'
            });
            
            gsap.to('.slime-core', {
                scale: 1.1,
                opacity: 0.9,
                duration: 0.2,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
            
            currentIndex++;
            
            if (currentIndex >= codeMessages.length) {
                clearInterval(interval);
                gsap.to('.slime-body', {
                    scaleX: 1,
                    scaleY: 1,
                    duration: 0.3,
                    ease: 'elastic.out(1, 0.5)'
                });
                this.isAnimating = false;
            }
        }, 300);
        
        gsap.to('.slime-shine', {
            opacity: 1,
            scale: 1.2,
            duration: 0.1,
            ease: 'none',
            yoyo: true,
            repeat: 7,
            stagger: 0.1
        });
        
        this.showDialogBubble("Coding time! 💻");
    }
    
    celebrate() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to(this.mascot, { 
            y: -50, 
            duration: 0.3,
            ease: 'power2.out'
        })
        .to('.slime-body', { 
            scaleY: 0.75, 
            scaleX: 1.2, 
            rotation: 10, 
            duration: 0.2,
            ease: 'power2.out'
        }, 0)
        .to(this.mascot, { 
            y: 0, 
            duration: 0.3, 
            ease: 'bounce.out' 
        })
        .to('.slime-body', { 
            scaleY: 1.2, 
            scaleX: 0.85, 
            rotation: -10, 
            duration: 0.15,
            ease: 'power2.out'
        }, 0.3)
        .to('.slime-body', { 
            scaleY: 1, 
            scaleX: 1, 
            rotation: 0, 
            duration: 0.25,
            ease: 'elastic.out(1, 0.5)'
        });
        
        gsap.to('.slime-eyes', {
            scale: 1.3,
            duration: 0.2,
            ease: 'back.out(2)',
            yoyo: true,
            repeat: 1
        });
          
        this.createParticleBurst();
        this.showDialogBubble("Celebration! 🎊");
    }
    
    backflip() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        gsap.to(this.mascot, {
            rotation: -360,
            y: -80,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
                gsap.set(this.mascot, { rotation: 0 });
                this.isAnimating = false;
            }
        });
        
        this.showDialogBubble("Backflip! 🤸");
    }
    
    moonwalk() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to(this.container, { x: '-=100', duration: 1, ease: 'power2.inOut' })
          .to(this.container, { x: '+=100', duration: 1, ease: 'power2.inOut' });
          
        this.showDialogBubble("Moonwalk! 🌙");
    }
    
    robotDance() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        for (let i = 0; i < 4; i++) {
            tl.to('.slime-body', { 
                rotation: 25, 
                scaleX: 1.15, 
                scaleY: 0.9, 
                duration: 0.2,
                ease: 'power2.inOut'
            }, i * 0.4)
            .to('.slime-body', { 
                rotation: -25, 
                scaleX: 1.15, 
                scaleY: 0.9, 
                duration: 0.2,
                ease: 'power2.inOut'
            }, i * 0.4 + 0.2);
        }
        
        gsap.to('.slime-core', {
            rotation: 45,
            duration: 0.2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 7
        });
        
        this.showDialogBubble("Robot dance! 🤖");
    }
    
    breakdance() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to(this.mascot, { rotation: 90, duration: 0.3 })
          .to(this.mascot, { rotation: 180, duration: 0.3 })
          .to(this.mascot, { rotation: 270, duration: 0.3 })
          .to(this.mascot, { rotation: 360, duration: 0.3 })
          .to(this.mascot, { rotation: 0, duration: 0 });
          
        this.showDialogBubble("Breakdance! 💫");
    }
    
    salute() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to('.slime-body', {
            scaleY: 1.15,
            scaleX: 0.9,
            y: -15,
            rotation: -10,
            duration: 0.5,
            ease: 'back.out(2)',
            yoyo: true,
            repeat: 1
        });
        
        gsap.to('.slime-core', {
            y: -10,
            scale: 1.1,
            duration: 0.5,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
        });
        
        this.showDialogBubble("Salute! 🫡");
    }
    
    bow() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to('.slime-body', {
            rotation: 45,
            scaleY: 0.85,
            scaleX: 1.1,
            y: 10,
            duration: 0.5,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 1
        });
        
        gsap.to('.slime-eyes', {
            scaleY: 0.8,
            y: 5,
            duration: 0.5,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 1
        });
        
        this.showDialogBubble("Thank you! 🙏");
    }
    
    cheer() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to('.slime-body', { 
            scaleY: 1.2, 
            scaleX: 0.85, 
            y: -15, 
            duration: 0.2,
            ease: 'power2.out'
        })
        .to('.slime-body', { 
            scaleY: 1.25, 
            scaleX: 0.82, 
            y: -20, 
            duration: 0.2,
            ease: 'power2.out'
        })
        .to('.slime-body', { 
            scaleY: 1.2, 
            scaleX: 0.85, 
            y: -15, 
            duration: 0.2,
            ease: 'power2.out'
        })
        .to('.slime-body', { 
            scaleY: 1, 
            scaleX: 1, 
            y: 0, 
            duration: 0.2,
            ease: 'bounce.out'
        });
        
        gsap.to('.slime-eyes', {
            scale: 1.2,
            duration: 0.2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 3
        });
          
        this.showDialogBubble("Yay! Hooray! 🎉");
    }
    
    fistPump() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to('.slime-body', {
            scaleY: 1.2,
            scaleX: 0.88,
            y: -20,
            duration: 0.2,
            ease: 'power2.out',
            yoyo: true,
            repeat: 3
        });
        
        gsap.to('.slime-core', {
            scale: 1.15,
            y: -10,
            duration: 0.2,
            ease: 'power2.out',
            yoyo: true,
            repeat: 3
        });
        
        this.showDialogBubble("Yeah! 💪");
    }
    
    thumbsUp() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to('.slime-body', {
            rotation: -20,
            scaleY: 1.1,
            scaleX: 0.93,
            y: -10,
            duration: 0.5,
            ease: 'back.out(2)',
            yoyo: true,
            repeat: 1
        });
        
        gsap.to('.slime-eyes', {
            scale: 1.15,
            y: -5,
            duration: 0.5,
            ease: 'back.out(2)',
            yoyo: true,
            repeat: 1
        });
        
        this.showDialogBubble("Awesome! 👍");
    }
    
    heartGesture() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to('.slime-body', { 
            scaleX: 1.15, 
            scaleY: 0.9, 
            rotation: 5, 
            y: -10, 
            duration: 0.3,
            ease: 'back.out(2)'
        })
        .to('.slime-body', { 
            scaleX: 1, 
            scaleY: 1, 
            rotation: 0, 
            y: 0, 
            duration: 0.3,
            ease: 'elastic.out(1, 0.5)',
            delay: 0.5 
        });
        
        gsap.to('.slime-eye', {
            scaleY: 0.8,
            duration: 0.3,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
        });
          
        this.createHeartParticles();
        this.showDialogBubble("Love it! ❤️");
    }
    
    flyAround() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to(this.container, {
            y: -100,
            x: '+=50',
            duration: 0.5,
            ease: 'power2.out'
        })
        .to(this.container, {
            y: 0,
            x: '-=50',
            duration: 0.5,
            ease: 'power2.in'
        });
        
        this.showDialogBubble("Flying! ✈️");
    }
    
    teleport() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to(this.container, { opacity: 0, scale: 0, duration: 0.3 })
          .to(this.container, { 
              x: Math.random() * 200 - 100,
              y: Math.random() * 200 - 100,
              duration: 0
          })
          .to(this.container, { opacity: 1, scale: 1, duration: 0.3 });
          
        this.showDialogBubble("Teleport! 🌀");
    }
    
    matrix() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        gsap.to(this.mascot, {
            x: -30,
            rotation: -45,
            duration: 0.3,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 1,
            onComplete: () => { this.isAnimating = false; }
        });
        
        this.showDialogBubble("Dodge! 🥷");
    }
    
    powerUp() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to(this.container, { scale: 1.5, duration: 0.5, ease: 'back.out(2)' })
          .to(this.container, { scale: 1, duration: 0.3 });
          
        this.createEnergyBurst();
        this.showDialogBubble("Power up! ⚡");
    }
    
    transform() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to(this.mascot, { rotation: 720, scale: 1.3, duration: 1 })
          .to(this.mascot, { rotation: 0, scale: 1, duration: 0.3 });
          
        this.showDialogBubble("Transform! 🔄");
    }
    
    glitch() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        for (let i = 0; i < 5; i++) {
            tl.to(this.mascot, {
                x: Math.random() * 20 - 10,
                y: Math.random() * 20 - 10,
                duration: 0.05
            });
        }
        tl.to(this.mascot, { x: 0, y: 0, duration: 0.1 });
        
        this.showDialogBubble("Glitch! 🔌");
    }
    
    hologram() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        gsap.to(this.container, {
            opacity: 0.3,
            duration: 0.2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 5,
            onComplete: () => { this.isAnimating = false; }
        });
        
        this.showDialogBubble("Hologram! 👻");
    }
    
    laserEyes() {
        this.isAnimating = true;
        gsap.to('.slime-pupil', {
            scale: 2,
            duration: 0.5,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1,
            onComplete: () => { this.isAnimating = false; }
        });
        
        gsap.to('.slime-eye', {
            scale: 1.2,
            duration: 0.5,
            ease: 'back.out(2)',
            yoyo: true,
            repeat: 1
        });
        
        gsap.to('.slime-body', {
            scaleY: 0.95,
            scaleX: 1.05,
            duration: 0.5,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
        });
        
        this.showDialogBubble("Laser eyes! 👁️");
    }
    
    jetPack() {
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to(this.container, { y: -150, duration: 0.8, ease: 'power2.out' })
          .to(this.container, { y: 0, duration: 0.8, ease: 'bounce.out' });
          
        this.showDialogBubble("Jetpack! 🚀");
    }
    
    shield() {
        this.isAnimating = true;
        gsap.to(this.container, {
            scale: 1.2,
            opacity: 0.8,
            duration: 0.3,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1,
            onComplete: () => { this.isAnimating = false; }
        });
        
        this.showDialogBubble("Shield! 🛡️");
    }
    
    invisibility() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to(this.container, { opacity: 0.2, duration: 0.5 })
          .to(this.container, { opacity: 1, duration: 0.5, delay: 1 });
          
        this.showDialogBubble("Invisible! 👤");
    }
    
    clone() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const clone = this.container.cloneNode(true);
        document.body.appendChild(clone);
        
        gsap.set(clone, { x: 100, opacity: 0.5 });
        gsap.to(clone, {
            opacity: 0,
            duration: 1,
            delay: 1,
            onComplete: () => {
                clone.remove();
                this.isAnimating = false;
            }
        });
        
        this.showDialogBubble("Clone! 👯");
    }
    
    timeFreeze() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const originalTimeScale = gsap.globalTimeline.timeScale();
        gsap.globalTimeline.timeScale(0.1);
        
        setTimeout(() => {
            gsap.globalTimeline.timeScale(originalTimeScale);
            this.isAnimating = false;
        }, 2000);
        
        this.showDialogBubble("Time freeze! ⏸️");
    }
    
    speedRun() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to(this.container, { x: '+=200', duration: 0.2 })
          .to(this.container, { x: '-=200', duration: 0.2 });
          
        this.showDialogBubble("Speed! ⚡");
    }
    
    superJump() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to(this.mascot, { y: -200, duration: 0.5, ease: 'power2.out' })
          .to(this.mascot, { y: 0, duration: 0.5, ease: 'bounce.out' });
          
        this.showDialogBubble("Super jump! 🦘");
    }
    
    wallFlip() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        gsap.to(this.mascot, {
            rotation: -180,
            x: -50,
            duration: 0.5,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 1,
            onComplete: () => { this.isAnimating = false; }
        });
        
        this.showDialogBubble("Wall flip! 🧗");
    }
    
    slideMove() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        gsap.to(this.container, {
            x: '+=150',
            duration: 0.5,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1,
            onComplete: () => { this.isAnimating = false; }
        });
        
        this.showDialogBubble("Slide! 🛷");
    }
    
    dashAttack() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to(this.container, { x: '+=100', rotation: 45, duration: 0.2 })
          .to(this.container, { x: '-=100', rotation: 0, duration: 0.3 });
          
        this.showDialogBubble("Dash! 💨");
    }
    
    rollMove() {
        this.cancelCurrentAnimations();
        this.isAnimating = true;
        gsap.to(this.mascot, {
            rotation: 360,
            x: '+=80',
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
                gsap.set(this.mascot, { rotation: 0 });
                this.isAnimating = false;
            }
        });
        
        this.showDialogBubble("Roll! 🎱");
    }
    
    cartwheel() {
        this.isAnimating = true;
        gsap.to(this.mascot, {
            rotation: -360,
            x: '+=60',
            y: -40,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: () => {
                gsap.set(this.mascot, { rotation: 0, y: 0 });
                this.isAnimating = false;
            }
        });
        
        this.showDialogBubble("Cartwheel! 🤸");
    }
    
    handstand() {
        this.isAnimating = true;
        gsap.to(this.mascot, {
            rotation: 180,
            duration: 0.5,
            ease: 'back.out(2)',
            yoyo: true,
            repeat: 1,
            onComplete: () => { this.isAnimating = false; }
        });
        
        this.showDialogBubble("Handstand! 🤾");
    }
    
    splits() {
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to('.slime-body', { 
            scaleX: 1.4, 
            scaleY: 0.7, 
            rotation: -5,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        })
        .to('.slime-core', {
            scaleY: 0.6,
            scaleX: 1.2,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)'
        }, 0)
        .to('.slime-body', { 
            scaleX: 1, 
            scaleY: 1, 
            rotation: 0,
            duration: 0.3, 
            delay: 0.5,
            ease: 'elastic.out(1, 0.5)'
        })
        .to('.slime-core', {
            scaleX: 1,
            scaleY: 1,
            duration: 0.3,
            ease: 'elastic.out(1, 0.5)'
        }, 0.8);
          
        this.showDialogBubble("Splits! 🧘");
    }
    
    kickFlip() {
        this.isAnimating = true;
        gsap.to(this.mascot, {
            rotation: 360,
            y: -50,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
                gsap.set(this.mascot, { rotation: 0 });
                this.isAnimating = false;
            }
        });
        
        this.showDialogBubble("Kickflip! 🛹");
    }
    
    armWave() {
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to('.slime-body', { 
            rotation: 15, 
            scaleX: 1.1, 
            scaleY: 0.93, 
            duration: 0.2,
            ease: 'power2.out'
        })
        .to('.slime-body', { 
            rotation: -15, 
            scaleX: 1.1, 
            scaleY: 0.93, 
            duration: 0.2,
            ease: 'power2.out'
        }, 0.1)
        .to('.slime-body', { 
            rotation: 5, 
            scaleX: 1.05, 
            scaleY: 0.97, 
            duration: 0.2,
            ease: 'power2.out'
        })
        .to('.slime-body', { 
            rotation: 0, 
            scaleX: 1, 
            scaleY: 1, 
            duration: 0.2,
            ease: 'elastic.out(1, 0.5)'
        }, 0.3);
        
        gsap.to('.slime-core', {
            rotation: 20,
            duration: 0.2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 1
        });
          
        this.showDialogBubble("Wave! 🌊");
    }
    
    bodyRoll() {
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to('.slime-body', { 
            scaleY: 0.7, 
            scaleX: 1.25, 
            duration: 0.3,
            ease: 'power2.inOut'
        })
        .to('.slime-body', { 
            scaleY: 1.3, 
            scaleX: 0.8, 
            duration: 0.3,
            ease: 'power2.inOut'
        })
        .to('.slime-body', { 
            scaleY: 1, 
            scaleX: 1, 
            duration: 0.3,
            ease: 'elastic.out(1, 0.5)'
        });
        
        gsap.to('.slime-core', {
            scaleY: 1.2,
            duration: 0.3,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 1
        });
          
        this.showDialogBubble("Body roll! 🌀");
    }
    
    headSpin() {
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to('.slime-body', {
            rotation: 720,
            scaleY: 0.9,
            scaleX: 1.1,
            duration: 1,
            ease: 'power2.inOut'
        })
        .to('.slime-body', {
            rotation: 0,
            scaleY: 1,
            scaleX: 1,
            duration: 0,
            ease: 'none'
        });
        
        gsap.to('.slime-eyes', {
            rotation: -720,
            scale: 0.9,
            duration: 1,
            ease: 'power2.inOut'
        });
        
        gsap.to('.slime-core', {
            rotation: -360,
            duration: 1,
            ease: 'power2.inOut'
        });
        
        this.showDialogBubble("Head spin! 🌪️");
    }
    
    legSweep() {
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to('.slime-body', { 
            scaleX: 1.4, 
            scaleY: 0.7, 
            rotation: 25, 
            duration: 0.3,
            ease: 'power2.out'
        })
        .to('.slime-body', { 
            scaleX: 1, 
            scaleY: 1, 
            rotation: 0, 
            duration: 0.3,
            ease: 'elastic.out(1, 0.5)'
        });
        
        gsap.to('.slime-shadow', {
            scaleX: 1.5,
            scaleY: 0.8,
            duration: 0.3,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
        });
          
        this.showDialogBubble("Leg sweep! 🦵");
    }
    
    jumpKick() {
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to(this.mascot, { 
            y: -50, 
            duration: 0.3,
            ease: 'power2.out'
        })
        .to('.slime-body', { 
            scaleX: 1.25, 
            scaleY: 0.82, 
            rotation: 15, 
            duration: 0.2,
            ease: 'power2.out'
        }, 0)
        .to(this.mascot, { 
            y: 0, 
            duration: 0.3,
            ease: 'bounce.out'
        })
        .to('.slime-body', { 
            scaleX: 1, 
            scaleY: 1, 
            rotation: 0, 
            duration: 0.2,
            ease: 'elastic.out(1, 0.5)'
        }, 0.4);
          
        this.showDialogBubble("Jump kick! 🥋");
    }
    
    punchCombo() {
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to('.slime-body', { 
            x: 15, 
            scaleX: 1.15, 
            scaleY: 0.9, 
            duration: 0.1,
            ease: 'power2.out'
        })
        .to('.slime-body', { 
            x: 0, 
            scaleX: 1, 
            scaleY: 1, 
            duration: 0.1,
            ease: 'elastic.out(1, 0.5)'
        })
        .to('.slime-body', { 
            x: -15, 
            scaleX: 1.15, 
            scaleY: 0.9, 
            duration: 0.1,
            ease: 'power2.out'
        })
        .to('.slime-body', { 
            x: 0, 
            scaleX: 1, 
            scaleY: 1, 
            duration: 0.1,
            ease: 'elastic.out(1, 0.5)'
        });
        
        gsap.to('.slime-core', {
            scaleX: 0.85,
            duration: 0.1,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 3
        });
          
        this.showDialogBubble("Combo! 👊");
    }
    
    dodgeMove() {
        this.isAnimating = true;
        gsap.to(this.container, {
            x: -40,
            rotation: -20,
            duration: 0.2,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1,
            onComplete: () => { this.isAnimating = false; }
        });
        
        this.showDialogBubble("Dodge! 🥊");
    }
    
    counterSpin() {
        this.isAnimating = true;
        gsap.to(this.mascot, {
            rotation: -180,
            duration: 0.4,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 1,
            onComplete: () => { this.isAnimating = false; }
        });
        
        this.showDialogBubble("Counter! 🔄");
    }
    
    victoryPose() {
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to('.slime-body', { 
            rotation: -20, 
            scaleY: 1.25, 
            scaleX: 0.85, 
            y: -20, 
            duration: 0.3,
            ease: 'back.out(2)'
        })
        .to(this.container, { 
            scale: 1.2, 
            duration: 0.3 
        }, 0);
        
        gsap.to('.slime-eyes', {
            scale: 1.3,
            y: -10,
            duration: 0.3,
            ease: 'back.out(2)'
        });
        
        gsap.to('.slime-shine', {
            scale: 1.5,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out'
        });
          
        this.createParticleBurst();
        this.showDialogBubble("Victory! 🏆");
    }
    
    starPose() {
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to('.slime-body', { 
            scale: 1.3, 
            rotation: 20, 
            duration: 0.3,
            ease: 'back.out(2)'
        })
        .to('.slime-body', { 
            scale: 1, 
            rotation: 0, 
            duration: 0.3,
            ease: 'elastic.out(1, 0.5)'
        });
        
        gsap.to('.slime-shine', {
            scale: 1.5,
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
            yoyo: true,
            repeat: 1
        });
          
        this.showDialogBubble("Star pose! ⭐");
    }
    
    levelUp() {
        this.isAnimating = true;
        const tl = gsap.timeline({
            onComplete: () => { this.isAnimating = false; }
        });
        
        tl.to(this.container, { 
            scale: 1.5, 
            y: -50,
            duration: 0.5, 
            ease: 'back.out(2)' 
        })
        .to(this.container, { 
            scale: 1, 
            y: 0,
            duration: 0.5 
        });
        
        this.createEnergyBurst();
        this.showDialogBubble("Level up! 📈");
    }
    
    reactToScroll(direction) {
        if (direction === 'down') {
            gsap.to('.slime-body', {
                rotation: 10,
                scaleY: 1.08,
                scaleX: 0.95,
                duration: 0.3,
                ease: 'elastic.out(1, 0.5)',
                yoyo: true,
                repeat: 1
            });
            
            gsap.to('.slime-eyes', {
                y: 3,
                duration: 0.3,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
            
            const curiousDialogs = [
                "Scrolling down! ↓",
                "Apa yang ada di bawah? 🤔",
                "Let's see more!",
                "Keep scrolling! 📜"
            ];
            this.showDialogBubble(curiousDialogs[Math.floor(Math.random() * curiousDialogs.length)]);
        } else {
            gsap.to('.slime-body', {
                rotation: -10,
                scaleY: 1.08,
                scaleX: 0.95,
                duration: 0.3,
                ease: 'elastic.out(1, 0.5)',
                yoyo: true,
                repeat: 1
            });
            
            gsap.to('.slime-eyes', {
                y: -3,
                duration: 0.3,
                ease: 'power2.out',
                yoyo: true,
                repeat: 1
            });
            
            const upDialogs = [
                "Going up! ↑",
                "Back to the top!",
                "Naik lagi! 🚀",
                "Up we go!"
            ];
            this.showDialogBubble(upDialogs[Math.floor(Math.random() * upDialogs.length)]);
        }
    }
    
    // ============ ENHANCED INTERACTIVITY METHODS ============
    
    reactToFastScroll(direction) {
        if (this.isAnimating) return;
        
        this.excitedJump();
        
        const excitedScrollDialogs = [
            "WOAH! So fast! 🚀",
            "Speed demon! ⚡",
            "Zoom zoom! 💨",
            "Cepet banget!",
            "Slow down! Hehe! 😅"
        ];
        
        this.showDialogBubble(excitedScrollDialogs[Math.floor(Math.random() * excitedScrollDialogs.length)]);
        
        this.currentMood = 'excited';
    }
    
    reactToSectionHover(sectionId) {
        if (this.dialogBubbleActive) return;
        
        const sectionDialogs = {
            'about': [
                "Pengen tau tentang saya? 😊",
                "About section nih!",
                "Get to know me! 👋",
                "Yuk kenalan!"
            ],
            'skills': [
                "Check my skills! 💪",
                "Lihat keahlian saya!",
                "Skills yang keren! ✨",
                "I'm talented! 😎"
            ],
            'projects': [
                "Lihat karya-karya saya! 🎨",
                "My awesome projects!",
                "Portfolio time! 📂",
                "Karya terbaik nih!"
            ],
            'contact': [
                "Ayo ngobrol! 📧",
                "Let's talk!",
                "Contact me! 💬",
                "Hubungi saya yuk!"
            ]
        };
        
        const dialogs = sectionDialogs[sectionId];
        if (dialogs && Math.random() > 0.5) {
            this.showDialogBubble(dialogs[Math.floor(Math.random() * dialogs.length)]);
            this.lookAround();
        }
    }
    
    reactToSectionView(sectionId) {
        if (this.currentSection === sectionId) return;
        
        this.currentSection = sectionId;
        
        const sectionReactions = {
            'about': {
                dialog: "Pengen tau tentang saya? 😊",
                animation: () => this.wave()
            },
            'skills': {
                dialog: "Check my skills! 💪",
                animation: () => this.fistPump()
            },
            'projects': {
                dialog: "Lihat karya-karya saya! 🎨",
                animation: () => this.celebrate()
            },
            'contact': {
                dialog: "Ayo ngobrol! 📧",
                animation: () => this.wave()
            }
        };
        
        const reaction = sectionReactions[sectionId];
        if (reaction) {
            setTimeout(() => {
                this.showDialogBubble(reaction.dialog);
                if (Math.random() > 0.4) {
                    reaction.animation();
                }
            }, 300);
        }
    }
    
    reactToButtonClick(buttonText) {
        if (this.isAnimating) return;
        
        const celebrationDialogs = [
            "Yeay! Button clicked! 🎉",
            "Good choice! 👍",
            "Mantap! ✨",
            "Let's go! 🚀",
            "Awesome! 😎",
            "Nice click! 💫"
        ];
        
        this.celebrate();
        this.showDialogBubble(celebrationDialogs[Math.floor(Math.random() * celebrationDialogs.length)]);
        
        this.personality.happiness = Math.min(100, this.personality.happiness + 3);
        this.userActivityLevel += 2;
    }
    
    reactToTextSelection(selectedText) {
        if (this.dialogBubbleActive) return;
        
        const textSelectionDialogs = [
            "Mau copy-paste? 📋",
            "Interesting text! 📝",
            "Reading something? 👀",
            "Good selection! ✨",
            "Apa yang menarik? 🤔",
            "Taking notes? 📖"
        ];
        
        if (Math.random() > 0.7) {
            this.showDialogBubble(textSelectionDialogs[Math.floor(Math.random() * textSelectionDialogs.length)]);
            this.curiousLean();
        }
    }
    
    handleWindowResize() {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        
        const safeX = Math.min(this.currentPosition.x, windowWidth - 150);
        const safeY = Math.min(this.currentPosition.y, windowHeight - 200);
        
        this.currentPosition.x = safeX;
        this.currentPosition.y = safeY;
        this.targetPosition.x = safeX;
        this.targetPosition.y = safeY;
        
        gsap.to(this.container, {
            x: safeX,
            y: safeY,
            duration: 0.5,
            ease: 'power2.out'
        });
        
        const resizeDialogs = [
            "Resizing! Adjusting... 📐",
            "Making room! 🔄",
            "Window changed! 🪟",
            "Adapting! ✨"
        ];
        
        if (Math.random() > 0.6) {
            this.showDialogBubble(resizeDialogs[Math.floor(Math.random() * resizeDialogs.length)]);
        }
    }
    
    reactToFormFocus() {
        if (this.dialogBubbleActive) return;
        
        const encouragementDialogs = [
            "Fill it out! You got this! 💪",
            "Isi form-nya ya! 📝",
            "Take your time! ⏰",
            "Good luck! ✨",
            "Semangat mengisi! 😊",
            "I'm here if you need help! 🤗"
        ];
        
        if (Math.random() > 0.5) {
            this.showDialogBubble(encouragementDialogs[Math.floor(Math.random() * encouragementDialogs.length)]);
            this.thumbsUp();
        }
    }
    
    performAttentionSeeker() {
        if (this.isAnimating || this.isMoving) return;
        
        const attentionAnimations = [
            () => {
                this.dance();
                this.showDialogBubble("Hey! Look at me! 👋");
            },
            () => {
                this.jump();
                this.showDialogBubble("Don't forget about me! 😊");
            },
            () => {
                this.wave();
                this.showDialogBubble("Halo! Masih di sini! 🙋");
            },
            () => {
                this.spin();
                this.showDialogBubble("Bored? Let's do something! 🎮");
            },
            () => {
                this.backflip();
                this.showDialogBubble("Watch this! 🤸");
            }
        ];
        
        const randomAnimation = attentionAnimations[Math.floor(Math.random() * attentionAnimations.length)];
        randomAnimation();
        
        this.personality.energy = Math.max(30, this.personality.energy - 5);
    }
    
    trackUserActivity() {
        this.lastUserActivity = Date.now();
        this.userActivityLevel = Math.min(100, this.userActivityLevel + 0.5);
        
        clearTimeout(this.idleTimer);
        this.idleTimer = setTimeout(() => {
            this.onUserIdle();
        }, 30000);
    }
    
    onUserIdle() {
        if (this.isAnimating || this.isMoving) return;
        
        const idleDialogs = [
            "Still there? 🤔",
            "Hello? Anyone? 👀",
            "Zzz... Wake up! 😴",
            "Masih ada? Hehe!",
            "Pay attention to me! 🥺",
            "Don't leave me alone! 😢"
        ];
        
        this.performAttentionSeeker();
        this.userActivityLevel = Math.max(0, this.userActivityLevel - 10);
    }
    
    startIdleDetection() {
        this.idleTimer = setTimeout(() => {
            this.onUserIdle();
        }, 30000);
    }
    
    // ============ INTERSECTION OBSERVER FOR SECTIONS ============
    
    setupSectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.3
        };
        
        this.sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    this.reactToSectionView(sectionId);
                }
            });
        }, observerOptions);
        
        const sections = document.querySelectorAll('#about, #skills, #projects, #contact, section[id]');
        sections.forEach(section => {
            if (section.id) {
                this.sectionObserver.observe(section);
            }
        });
        
        console.log('👀 Section observer setup complete');
    }
    
    blinkLEDs() {
        gsap.to('.led-1', {
            opacity: 0.3,
            duration: 0.8,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
        });
        
        gsap.to('.led-2', {
            opacity: 0.3,
            duration: 1,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 0.3
        });
        
        gsap.to('.led-3', {
            opacity: 0.3,
            duration: 1.2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            delay: 0.6
        });
    }
    
    startRandomMovement() {
        const scheduleMovement = () => {
            const randomInterval = 8000 + Math.random() * 4000;
            setTimeout(() => {
                if (Math.random() > 0.4 && !this.isMoving && !this.isAnimating) {
                    const shouldFly = Math.random() > 0.6;
                    if (shouldFly) {
                        this.flyToRandomPosition();
                    } else {
                        this.moveToRandomPosition();
                    }
                }
                scheduleMovement();
            }, randomInterval);
        };
        scheduleMovement();
    }
    
    startCuriousBehavior() {
        setInterval(() => {
            if (this.isMoving || this.isAnimating) return;
            
            const decision = Math.random();
            const containerRect = this.container.getBoundingClientRect();
            const centerX = containerRect.left + containerRect.width / 2;
            const centerY = containerRect.top + containerRect.height / 2;
            
            const deltaX = this.mousePosition.x - centerX;
            const deltaY = this.mousePosition.y - centerY;
            const distanceToMouse = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            if (distanceToMouse > 300 && distanceToMouse < 800 && decision > 0.7) {
                if (Math.random() > 0.5) {
                    const targetX = this.mousePosition.x + (Math.random() - 0.5) * 100;
                    const targetY = this.mousePosition.y + (Math.random() - 0.5) * 100;
                    const clamped = this.clampToViewport(targetX, targetY);
                    this.targetPosition = clamped;
                    this.moveToRandomPosition(true);
                } else {
                    const awayX = centerX - deltaX * 0.5;
                    const awayY = centerY - deltaY * 0.5;
                    const clamped = this.clampToViewport(awayX, awayY);
                    this.targetPosition = clamped;
                    this.moveToRandomPosition(true);
                }
            }
        }, 7000);
    }
    
    moveToRandomPosition(useCurrentTarget = false) {
        if (!useCurrentTarget) {
            const padding = 80;
            const maxX = window.innerWidth - padding * 2;
            const maxY = window.innerHeight - padding * 2;
            
            const randomX = Math.random() * maxX + padding;
            const randomY = Math.random() * maxY + padding;
            
            const clamped = this.clampToViewport(randomX, randomY);
            this.targetPosition = clamped;
        } else {
            const clamped = this.clampToViewport(this.targetPosition.x, this.targetPosition.y);
            this.targetPosition = clamped;
        }
        
        this.isMoving = true;
        
        const speedVariation = Math.random();
        let walkSpeed, legAnimSpeed;
        
        if (speedVariation < 0.3) {
            walkSpeed = 50;
            legAnimSpeed = 0.5;
        } else if (speedVariation < 0.7) {
            walkSpeed = 100;
            legAnimSpeed = 0.3;
        } else {
            walkSpeed = 150;
            legAnimSpeed = 0.2;
        }
        
        const walkTimeline = gsap.timeline({
            repeat: -1
        });
        
        walkTimeline.to('.slime-body', {
            scaleX: 1.12,
            scaleY: 0.92,
            x: 5,
            duration: legAnimSpeed,
            ease: 'power2.inOut'
        })
        .to('.slime-body', {
            scaleX: 0.92,
            scaleY: 1.08,
            x: -5,
            duration: legAnimSpeed,
            ease: 'power2.inOut'
        }, 0)
        .to('.slime-body', {
            scaleX: 1.12,
            scaleY: 0.92,
            x: 5,
            duration: legAnimSpeed,
            ease: 'power2.inOut'
        })
        .to('.slime-body', {
            scaleX: 0.92,
            scaleY: 1.08,
            x: -5,
            duration: legAnimSpeed,
            ease: 'power2.inOut'
        }, legAnimSpeed);
        
        gsap.to(this.mascot, {
            y: '+=10',
            duration: legAnimSpeed,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
        });
        
        const distance = Math.sqrt(
            Math.pow(this.targetPosition.x - this.currentPosition.x, 2) +
            Math.pow(this.targetPosition.y - this.currentPosition.y, 2)
        );
        
        const duration = Math.min(distance / walkSpeed, 4);
        
        gsap.to(this.currentPosition, {
            x: this.targetPosition.x,
            y: this.targetPosition.y,
            duration: duration,
            ease: 'none',
            onUpdate: () => {
                this.updatePosition();
            },
            onComplete: () => {
                walkTimeline.kill();
                gsap.killTweensOf(this.mascot);
                gsap.to('.slime-body', {
                    scaleX: 1,
                    scaleY: 1,
                    x: 0,
                    duration: 0.3,
                    ease: 'elastic.out(1, 0.5)'
                });
                this.isMoving = false;
            }
        });
    }
    
    flyToRandomPosition() {
        if (this.isMoving || this.isAnimating) return;
        
        const padding = 80;
        const maxX = window.innerWidth - padding * 2;
        const maxY = window.innerHeight - padding * 2;
        
        const randomX = Math.random() * maxX + padding;
        const randomY = Math.random() * maxY + padding;
        
        const clamped = this.clampToViewport(randomX, randomY);
        this.targetPosition = clamped;
        
        this.isMoving = true;
        
        gsap.to('.slime-body', {
            scaleY: 0.9,
            scaleX: 1.1,
            rotation: 10,
            duration: 0.5,
            ease: 'power2.out'
        });
        
        gsap.to(this.mascot, {
            y: '+=15',
            duration: 0.8,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
        });
        
        gsap.to(this.mascot, {
            rotation: 5,
            duration: 1.2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1
        });
        
        gsap.to('.slime-shine', {
            scale: 1.3,
            opacity: 1,
            rotation: -10,
            duration: 0.5,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: -1
        });
        
        const distance = Math.sqrt(
            Math.pow(this.targetPosition.x - this.currentPosition.x, 2) +
            Math.pow(this.targetPosition.y - this.currentPosition.y, 2)
        );
        
        const duration = Math.min(distance / 120, 3.5);
        
        gsap.to(this.currentPosition, {
            x: this.targetPosition.x,
            y: this.targetPosition.y,
            duration: duration,
            ease: 'power1.inOut',
            onUpdate: () => {
                this.updatePosition();
            },
            onComplete: () => {
                gsap.killTweensOf(this.mascot);
                gsap.killTweensOf('.slime-shine');
                gsap.to('.slime-body', {
                    scaleY: 1,
                    scaleX: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: 'elastic.out(1, 0.5)'
                });
                gsap.to('.slime-shine', {
                    scale: 1,
                    opacity: 0.8,
                    rotation: 0,
                    duration: 0.3
                });
                gsap.set(this.mascot, { rotation: 0 });
                this.isMoving = false;
            }
        });
        
        this.showDialogBubble("Terbang! ✈️");
    }
    
    updatePosition() {
        const padding = 60;
        const maxX = window.innerWidth - padding;
        const maxY = window.innerHeight - padding;
        
        this.currentPosition.x = Math.max(padding, Math.min(maxX, this.currentPosition.x));
        this.currentPosition.y = Math.max(padding, Math.min(maxY, this.currentPosition.y));
        
        gsap.set(this.container, {
            x: this.currentPosition.x,
            y: this.currentPosition.y
        });
        
        this.checkNearbyElements();
    }
    
    setupElementInteractions() {
        const interactiveElements = document.querySelectorAll('.interactive-btn, .project-card, .info-card, .skills-card, .tech-icon-item, button');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                if (Math.random() > 0.7) {
                    this.reactToElementHover(element);
                }
            });
        });
    }
    
    reactToElementHover(element) {
        if (this.isMoving || this.isAnimating) return;
        
        const reactions = [
            () => {
                this.jump();
                this.showDialogBubble("Wah, menarik! 👀");
            },
            () => {
                this.wave();
                this.showDialogBubble("Klik itu! 👆");
            },
            () => {
                this.dance();
                this.showDialogBubble("Keren! 🎉");
            }
        ];
        
        const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
        randomReaction();
    }
    
    checkNearbyElements() {
        if (!this.container) return;
        
        const mascotRect = this.container.getBoundingClientRect();
        const mascotCenterX = mascotRect.left + mascotRect.width / 2;
        const mascotCenterY = mascotRect.top + mascotRect.height / 2;
        
        const interactiveElements = document.querySelectorAll('.project-card, .info-card, .skills-card, .interactive-btn, .tech-icon-item');
        
        interactiveElements.forEach(element => {
            const elementRect = element.getBoundingClientRect();
            const elementCenterX = elementRect.left + elementRect.width / 2;
            const elementCenterY = elementRect.top + elementRect.height / 2;
            
            const distance = Math.sqrt(
                Math.pow(mascotCenterX - elementCenterX, 2) +
                Math.pow(mascotCenterY - elementCenterY, 2)
            );
            
            if (distance < 150 && !element.classList.contains('mascot-interacted')) {
                this.interactWithElement(element, mascotCenterX, elementCenterX);
            } else if (distance >= 150 && element.classList.contains('mascot-interacted')) {
                element.classList.remove('mascot-interacted');
                gsap.to(element, {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
            }
        });
    }
    
    interactWithElement(element, mascotX, elementX) {
        if (element.classList.contains('mascot-interacted')) return;
        
        element.classList.add('mascot-interacted');
        
        const direction = mascotX > elementX ? 1 : -1;
        const interactionType = Math.floor(Math.random() * 4);
        
        switch (interactionType) {
            case 0:
                gsap.to(element, {
                    x: direction * 15,
                    rotation: direction * 3,
                    duration: 0.4,
                    ease: 'power2.out',
                    yoyo: true,
                    repeat: 1
                });
                break;
            case 1:
                gsap.to(element, {
                    y: -10,
                    duration: 0.3,
                    ease: 'power2.out',
                    yoyo: true,
                    repeat: 1
                });
                break;
            case 2:
                gsap.to(element, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: 'back.out(2)',
                    yoyo: true,
                    repeat: 1
                });
                break;
            case 3:
                gsap.to(element, {
                    rotation: direction * 5,
                    x: direction * 10,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
                setTimeout(() => {
                    gsap.to(element, {
                        rotation: 0,
                        x: 0,
                        duration: 0.5,
                        ease: 'elastic.out(1, 0.5)'
                    });
                }, 300);
                break;
        }
    }
    
    createParticleBurst() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#ffd700'];
        const particleContainer = document.getElementById('particle-container');
        
        for (let i = 0; i < 12; i++) {
            const particle = document.createElement('div');
            particle.className = 'tech-particle';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            const angle = (Math.PI * 2 * i) / 12;
            const distance = 60 + Math.random() * 40;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            particleContainer.appendChild(particle);
            
            gsap.fromTo(particle,
                {
                    x: 0,
                    y: 0,
                    scale: 0,
                    opacity: 1
                },
                {
                    x: x,
                    y: y,
                    scale: Math.random() + 0.5,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    onComplete: () => particle.remove()
                }
            );
        }
    }
    
    createHeartParticles() {
        const particleContainer = document.getElementById('particle-container');
        
        for (let i = 0; i < 5; i++) {
            const heart = document.createElement('div');
            heart.textContent = '❤️';
            heart.style.position = 'absolute';
            heart.style.fontSize = '20px';
            
            particleContainer.appendChild(heart);
            
            gsap.fromTo(heart,
                { x: 0, y: 0, opacity: 1 },
                {
                    y: -100,
                    x: (Math.random() - 0.5) * 50,
                    opacity: 0,
                    duration: 2,
                    delay: i * 0.2,
                    onComplete: () => heart.remove()
                }
            );
        }
    }
    
    createEnergyBurst() {
        const colors = ['#00ff00', '#00ffff', '#ffff00', '#ff00ff'];
        const particleContainer = document.getElementById('particle-container');
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'tech-particle';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            
            const angle = (Math.PI * 2 * i) / 20;
            const distance = 80 + Math.random() * 60;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;
            
            particleContainer.appendChild(particle);
            
            gsap.fromTo(particle,
                {
                    x: 0,
                    y: 0,
                    scale: 0,
                    opacity: 1
                },
                {
                    x: x,
                    y: y,
                    scale: Math.random() * 1.5 + 0.5,
                    opacity: 0,
                    duration: 1.2,
                    ease: 'power2.out',
                    onComplete: () => particle.remove()
                }
            );
        }
    }
    
    // ============ FACIAL EXPRESSIONS SYSTEM ============
    
    blinkEyes() {
        gsap.to('.slime-eye', {
            scaleY: 0.1,
            duration: 0.08,
            ease: 'none',
            yoyo: true,
            repeat: 1
        });
        
        gsap.to('.slime-body', {
            scaleY: 0.98,
            scaleX: 1.02,
            duration: 0.08,
            ease: 'none',
            yoyo: true,
            repeat: 1
        });
    }
    
    changeMouthExpression(type) {
        const mouth = document.querySelector('.slime-mouth');
        if (!mouth) return;
        
        gsap.killTweensOf(mouth);
        
        switch(type) {
            case 'smile':
                gsap.to(mouth, {
                    scaleX: 1.1,
                    scaleY: 1,
                    duration: 0.3,
                    ease: 'elastic.out(1, 0.5)'
                });
                gsap.to('.slime-body', {
                    scaleY: 1.03,
                    scaleX: 0.98,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                break;
            case 'frown':
                gsap.to(mouth, {
                    scaleX: 0.8,
                    scaleY: 0.8,
                    y: -3,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                gsap.to('.slime-body', {
                    scaleY: 0.97,
                    scaleX: 1.03,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                setTimeout(() => {
                    gsap.to(mouth, {
                        scaleX: 1,
                        scaleY: 1,
                        y: 0,
                        duration: 0.3,
                        ease: 'elastic.out(1, 0.5)'
                    });
                    gsap.to('.slime-body', {
                        scaleX: 1,
                        scaleY: 1,
                        duration: 0.3,
                        ease: 'elastic.out(1, 0.5)'
                    });
                }, 1500);
                break;
            case 'surprised':
                gsap.to(mouth, {
                    scaleX: 0.6,
                    scaleY: 1.5,
                    duration: 0.2,
                    ease: 'back.out(2)'
                });
                gsap.to('.slime-eye', {
                    scale: 1.3,
                    duration: 0.2,
                    ease: 'back.out(2)'
                });
                gsap.to('.slime-body', {
                    scaleY: 0.95,
                    scaleX: 1.05,
                    duration: 0.2,
                    ease: 'back.out(2)'
                });
                setTimeout(() => {
                    gsap.to(mouth, {
                        scaleX: 1,
                        scaleY: 1,
                        duration: 0.3,
                        ease: 'elastic.out(1, 0.5)'
                    });
                    gsap.to('.slime-eye', {
                        scale: 1,
                        duration: 0.3,
                        ease: 'elastic.out(1, 0.5)'
                    });
                    gsap.to('.slime-body', {
                        scaleX: 1,
                        scaleY: 1,
                        duration: 0.3,
                        ease: 'elastic.out(1, 0.5)'
                    });
                }, 1200);
                break;
            case 'happy':
                gsap.to(mouth, {
                    scaleX: 1.3,
                    scaleY: 1.1,
                    duration: 0.3,
                    ease: 'back.out(2)'
                });
                gsap.to('.slime-eye', {
                    scaleY: 0.8,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                setTimeout(() => {
                    gsap.to(mouth, {
                        scaleX: 1,
                        scaleY: 1,
                        duration: 0.3,
                        ease: 'elastic.out(1, 0.5)'
                    });
                    gsap.to('.slime-eye', {
                        scaleY: 1,
                        duration: 0.3,
                        ease: 'elastic.out(1, 0.5)'
                    });
                }, 1500);
                break;
            case 'thinking':
                gsap.to(mouth, {
                    x: 3,
                    scaleX: 0.8,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                gsap.to('.slime-body', {
                    rotation: 5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                setTimeout(() => {
                    gsap.to(mouth, {
                        x: 0,
                        scaleX: 1,
                        duration: 0.3,
                        ease: 'elastic.out(1, 0.5)'
                    });
                    gsap.to('.slime-body', {
                        rotation: 0,
                        duration: 0.3,
                        ease: 'elastic.out(1, 0.5)'
                    });
                }, 2000);
                break;
        }
    }
    
    lookAroundExpression() {
        const pupils = document.querySelectorAll('.slime-pupil');
        const eyes = document.querySelector('.slime-eyes');
        const tl = gsap.timeline();
        
        tl.to(pupils, {
            x: -4,
            duration: 0.4,
            ease: 'power2.inOut'
        })
        .to(eyes, {
            x: -2,
            duration: 0.4,
            ease: 'power2.inOut'
        }, 0)
        .to(pupils, {
            x: 4,
            duration: 0.6,
            ease: 'power2.inOut'
        })
        .to(eyes, {
            x: 2,
            duration: 0.6,
            ease: 'power2.inOut'
        }, 0.4)
        .to(pupils, {
            y: -3,
            x: 0,
            duration: 0.4,
            ease: 'power2.inOut'
        })
        .to(eyes, {
            x: 0,
            y: -2,
            duration: 0.4,
            ease: 'power2.inOut'
        }, 1.0)
        .to(pupils, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        })
        .to(eyes, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        }, 1.4);
    }
    
    startAutoFacialExpressions() {
        const performExpression = () => {
            if (this.isAnimating || this.isMoving) return;
            
            const expressions = [
                () => this.blinkEyes(),
                () => this.blinkEyes(),
                () => this.changeMouthExpression('smile'),
                () => this.changeMouthExpression('happy'),
                () => this.changeMouthExpression('surprised'),
                () => this.lookAroundExpression(),
                () => {
                    this.blinkEyes();
                    setTimeout(() => this.lookAroundExpression(), 200);
                },
                () => {
                    this.changeMouthExpression('thinking');
                    this.lookAroundExpression();
                }
            ];
            
            const randomExpression = expressions[Math.floor(Math.random() * expressions.length)];
            randomExpression();
        };
        
        setInterval(() => {
            performExpression();
        }, 3000 + Math.random() * 2000);
    }
    
    // ============ PAGE NAVIGATION ANIMATIONS ============
    
    exitToRight() {
        return new Promise((resolve) => {
            this.isAnimating = true;
            
            const exitX = window.innerWidth + 100;
            const currentY = this.currentPosition.y;
            
            gsap.to('.slime-body', {
                scaleX: 1.15,
                scaleY: 0.9,
                rotation: 10,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to('.slime-eyes', {
                x: 5,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            gsap.to(this.currentPosition, {
                x: exitX,
                y: currentY,
                duration: 0.8,
                ease: 'power2.in',
                onUpdate: () => {
                    gsap.set(this.container, {
                        x: this.currentPosition.x,
                        y: this.currentPosition.y
                    });
                },
                onComplete: () => {
                    this.isAnimating = false;
                    resolve();
                }
            });
            
            gsap.to(this.mascot, {
                rotation: 15,
                duration: 0.8,
                ease: 'power2.in'
            });
        });
    }
    
    enterFromRight() {
        this.isAnimating = true;
        
        const startX = window.innerWidth + 100;
        const targetX = window.innerWidth - 100;
        const targetY = window.innerHeight - 150;
        
        this.currentPosition.x = startX;
        this.currentPosition.y = targetY;
        
        gsap.set(this.container, {
            x: startX,
            y: targetY,
            scale: 0.8,
            opacity: 0
        });
        
        gsap.to(this.container, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
        });
        
        gsap.to('.slime-body', {
            scaleX: 1.1,
            scaleY: 0.95,
            rotation: -10,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
            yoyo: true,
            repeat: 1
        });
        
        gsap.to(this.currentPosition, {
            x: targetX,
            y: targetY,
            duration: 1.2,
            ease: 'power2.out',
            onUpdate: () => {
                gsap.set(this.container, {
                    x: this.currentPosition.x,
                    y: this.currentPosition.y
                });
            },
            onComplete: () => {
                this.isAnimating = false;
                this.wave();
                this.showDialogBubble(this.dialogBubbles[0]);
                gsap.to('.slime-body', {
                    scaleX: 1,
                    scaleY: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: 'elastic.out(1, 0.5)'
                });
            }
        });
        
        gsap.to(this.mascot, {
            y: '+=10',
            duration: 0.4,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 2
        });
    }
    
    setupNavigationListeners() {
        const links = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Check for modifier keys or middle mouse button
                const isModifierClick = e.ctrlKey || e.metaKey || e.shiftKey || e.button === 1;
                
                // Don't trigger exit animation for modifier clicks, anchor links, or downloads
                if (href && !href.startsWith('#') && !link.hasAttribute('download') && !isModifierClick) {
                    if (Math.random() > 0.3 && !this.isNavigating) {
                        this.isNavigating = true;
                        this.exitToRight().then(() => {
                            this.isNavigating = false;
                        });
                    }
                }
            });
        });
        
        // Add beforeunload listener to guarantee exit animation
        window.addEventListener('beforeunload', () => {
            if (!this.isNavigating) {
                this.isNavigating = true;
                this.exitToRight();
            }
        });
        
        // Reset isNavigating flag on page show (browser back/forward)
        window.addEventListener('pageshow', () => {
            this.isNavigating = false;
        });
    }
    
    // ============ IDLE ANIMATIONS SYSTEM ============
    
    startIdleAnimations() {
        const performIdleAnimation = () => {
            if (this.isAnimating || this.isMoving) return;
            
            this.cancelCurrentAnimations();
            
            const idleActions = [
                () => this.gentleBobbing(),
                () => this.occasionalHeadTurn(),
                () => this.subtleSway(),
                () => this.gentleBreathe(),
                () => this.thinkingMode(),
                () => {
                    this.blinkEyes();
                    setTimeout(() => this.gentleBobbing(), 300);
                }
            ];
            
            const randomAction = idleActions[Math.floor(Math.random() * idleActions.length)];
            randomAction();
        };
        
        setInterval(() => {
            performIdleAnimation();
        }, 5000 + Math.random() * 3000);
    }
    
    gentleBobbing() {
        gsap.to(this.mascot, {
            y: '+=5',
            duration: 1.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 2
        });
    }
    
    occasionalHeadTurn() {
        const tl = gsap.timeline();
        const direction = Math.random() > 0.5 ? 15 : -15;
        tl.to('.slime-body', {
            rotation: direction,
            scaleX: 1.05,
            scaleY: 0.97,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)'
        })
        .to('.slime-eyes', {
            x: direction > 0 ? 3 : -3,
            duration: 0.6,
            ease: 'power2.inOut'
        }, 0)
        .to('.slime-body', {
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.5)',
            delay: 0.5
        })
        .to('.slime-eyes', {
            x: 0,
            duration: 0.6,
            ease: 'power2.inOut'
        }, 1.1);
    }
    
    subtleSway() {
        gsap.to(this.container, {
            rotation: Math.random() > 0.5 ? 3 : -3,
            duration: 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 1
        });
    }
    
    gentleBreathe() {
        gsap.to('.slime-core', {
            scale: 1.03,
            opacity: 0.9,
            duration: 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 2
        });
        
        gsap.to('.slime-body', {
            scaleY: 1.05,
            scaleX: 0.98,
            duration: 2,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: 2
        });
    }
    
    thinkingMode() {
        if (Math.random() > 0.7) {
            this.changeMouthExpression('thinking');
            
            gsap.to('.slime-core', {
                rotation: -15,
                y: -15,
                scale: 1.08,
                duration: 0.5,
                ease: 'elastic.out(1, 0.5)'
            });
            
            gsap.to('.slime-body', {
                rotation: 10,
                scaleY: 1.05,
                scaleX: 0.97,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            gsap.to('.slime-eyes', {
                x: -3,
                y: -5,
                duration: 0.4,
                ease: 'power2.out'
            });
            
            this.lookAroundExpression();
            
            setTimeout(() => {
                gsap.to('.slime-core', {
                    rotation: 0,
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: 'elastic.out(1, 0.5)'
                });
                
                gsap.to('.slime-body', {
                    rotation: 0,
                    scaleY: 1,
                    scaleX: 1,
                    duration: 0.4,
                    ease: 'elastic.out(1, 0.5)'
                });
                
                gsap.to('.slime-eyes', {
                    x: 0,
                    y: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                });
                
                this.changeMouthExpression('smile');
            }, 2500);
        }
    }
}

if (typeof window !== 'undefined') {
    const initMascot = () => {
        console.log('🤖 Initializing Tech Buddy Mascot...');
        if (typeof gsap !== 'undefined') {
            console.log('✅ GSAP found, creating mascot');
            window.techBuddy = new TechBuddyMascot();
            console.log('✅ Tech Buddy Mascot created!');
        } else {
            console.warn('❌ GSAP library not found. Tech Buddy requires GSAP.');
        }
    };
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMascot);
    } else {
        initMascot();
    }
}
