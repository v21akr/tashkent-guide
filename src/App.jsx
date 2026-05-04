import React, { useState, useEffect } from 'react';
import { Train, Award, Landmark, Building2, Info, ChevronRight, MapPin, Clock, CreditCard, ArrowLeft, Star, Calendar, Users } from 'lucide-react';

// ── Wikipedia page titles for image fetching ──────────────────────────────────
const WIKI_TITLES = {
  applied: 'State_Museum_of_Applied_Arts_of_Uzbekistan',
  railway: 'Tashkent_Museum_of_Railway_Techniques',
  victory: 'Victory_Park,_Tashkent',
  romanov: 'Romanov_Palace',
};

// ── i18n ──────────────────────────────────────────────────────────────────────
const CONTENT = {
  RU: {
    title: 'Ташкент',
    subtitle: 'Жемчужина Центральной Азии',
    cta: 'Начать путешествие',
    back: 'Назад в меню',
    infoSub: 'Транспорт, еда и этикет',
    factsTitle: 'Интересные факты',
    labels: {
      highlight: 'Главное',
      open: 'Часы работы',
      price: 'Вход',
      transport: 'Как добраться',
      tips: 'Советы',
      bestTime: 'Лучшее время',
    },
    locations: {
      applied: {
        name: 'Музей прикладного искусства',
        short: 'Сокровищница узбекских ремёсел.',
        desc: 'Бывшая резиденция дипломата-востоковеда А. А. Половцева. В конце XIX века мастера из Бухары, Хивы, Самарканда и Ташкента украсили здание резьбой по ганчу, росписью и деревянными узорами. С 1937 года здесь хранится одна из лучших коллекций декоративно-прикладного искусства Центральной Азии — более 7 000 экспонатов.',
        mustSee: 'Резные потолки и вышивка сюзане',
        price: '~30 000 сум',
        time: '09:00 – 18:00, ежедневно',
        transport: 'Метро: Космонавтлар (5 мин пешком)',
        tips: 'Приходите в первой половине дня — меньше групп. Фотосъёмка разрешена повсюду.',
        bestTime: 'Март – май, сентябрь – ноябрь',
        rating: '4.6',
        facts: [
          'Более 7 000 экспонатов: керамика, ювелирные украшения, ковры и национальные костюмы.',
          'Здание — пример «половцевского стиля»: смесь восточной и русской архитектуры XIX века.',
          'Вышитые сюзане датируются серединой XIX – началом XX веков.',
        ],
      },
      railway: {
        name: 'Музей железнодорожной техники',
        short: 'Стальные гиганты под открытым небом.',
        desc: 'Открытый в 1989 году в честь 100-летия железных дорог Центральной Азии, этот музей — один из крупнейших в Азии. Вдоль аллеи протяжённостью почти километр выстроились паровозы, тепловозы и электровозы, многие из которых участвовали в исторических событиях XX века. Можно залезть в кабину машиниста.',
        mustSee: 'Паровоз П36 и трофейный немецкий TE-52',
        price: '~25 000 сум',
        time: '09:00 – 18:00 (вых. пн, вт)',
        transport: 'Метро: Ташкент (3 мин пешком)',
        tips: 'Можно залезать в кабины машинистов. Мини-поезд на паровой тяге провезёт по всей аллее.',
        bestTime: 'Весь год; утром меньше людей',
        rating: '4.4',
        facts: [
          '13 паровозов, 18 тепловозов и 3 электровоза из эпохи Российской империи до 1970-х.',
          'Трофейный немецкий паровоз BR-52 (TE-52) захвачен Красной Армией в годы ВОВ.',
          'Паровоз ОВ-1534 («Овечка») 1914 года изображён на почтовой марке Узбекистана 1999 года.',
        ],
      },
      victory: {
        name: 'Парк Победы',
        short: 'Символ стойкости и мужества.',
        desc: 'Торжественный мемориальный комплекс, открытый 9 мая 2020 года в честь 75-летия Победы. Центральный монумент — «Ода стойкости» — посвящён Зулфие Закировой, узбекской матери, потерявшей пятерых сыновей на фронте. Музей Славы хранит подлинные документы, личные вещи солдат и интерактивные экспозиции.',
        mustSee: '«Ода стойкости» и Вечный огонь',
        price: 'Парк — бесплатно, музей — 25 000 сум',
        time: 'Парк: 08:00 – 22:00 / Музей: 09:00 – 18:00',
        transport: 'Такси (Яндекс Go, ~15 мин от центра)',
        tips: 'В музее есть аудиогид. В будние дни утром почти никого нет.',
        bestTime: 'Май (9 мая — особые мероприятия)',
        rating: '4.7',
        facts: [
          'Из Узбекистана на фронт ушло почти 2 миллиона человек — каждый третий погиб.',
          'В годы войны Узбекистан принял более 1,5 миллиона эвакуированных из охваченных войной республик.',
          'Ташкентские железнодорожники отправили на фронт 18 санитарных и 5 бронепоездов.',
        ],
      },
      romanov: {
        name: 'Дворец Романова',
        short: 'Европейский замок в центре Азии.',
        desc: 'Резиденция 1891 года для великого князя Николая Константиновича Романова — внука Николая I, сосланного в Туркестан. Здание сочетает готику, модерн и восточный декор. Николай Константинович открыл в Ташкенте первый кинотеатр, мыловаренный завод и проложил ирригационные каналы в Голодной степи.',
        mustSee: 'Бронзовые гончие у входа и фасад',
        price: 'Бесплатно (наружный осмотр)',
        time: '24/7 (снаружи)',
        transport: 'Метро: Мустакиллик (10 мин пешком)',
        tips: 'Лучшие кадры — с угла улицы Сайилгох. Внутрь не пускают (МИД Узбекистана).',
        bestTime: 'Утро и закат для фотографий',
        rating: '4.3',
        facts: [
          'Коллекция картин и скульптур дворца стала основой Государственного музея искусств в 1919 году.',
          'Николай Константинович открыл первый кинотеатр Ташкента — «Хива».',
          'Дворец спроектирован теми же архитекторами, что работали над зданиями Санкт-Петербурга.',
        ],
      },
    },
    useful: {
      title: 'Полезно знать',
      items: [
        { title: 'Транспорт', body: 'Yandex Go: поездка $1.5–3. Метро — 1 700 сум (~$0.14) за поездку.' },
        { title: 'Кухня', body: 'Обязательно: плов (лучший — в ЦУМе), самса, шурпа, лагман и свежий нон.' },
        { title: 'Этикет', body: 'В мечетях прикрывайте плечи и снимайте обувь. Фотографировать людей — только с разрешения.' },
      ],
    },
  },

  EN: {
    title: 'Tashkent',
    subtitle: 'Pearl of Central Asia',
    cta: 'Start Journey',
    back: 'Back to Menu',
    infoSub: 'Transport, food & etiquette',
    factsTitle: 'Interesting Facts',
    labels: {
      highlight: 'Highlight',
      open: 'Hours',
      price: 'Entry',
      transport: 'Getting There',
      tips: 'Tips',
      bestTime: 'Best Time',
    },
    locations: {
      applied: {
        name: 'Applied Arts Museum',
        short: 'Treasury of Uzbek craftsmanship.',
        desc: "Originally the residence of diplomat A. A. Polovtsov, this mansion was decorated in the late 19th century by master craftsmen from Bukhara, Khiva, Samarkand and Tashkent. Since 1937 it has housed one of Central Asia's finest decorative art collections, with over 7,000 pieces spanning from the early 19th century to the present day.",
        mustSee: 'Ganch carved ceilings & suzani collection',
        price: '~30,000 UZS',
        time: '09:00 – 18:00, daily',
        transport: 'Metro: Kosmonavtlar (5 min walk)',
        tips: 'Visit in the morning to avoid group tours. Photography is permitted throughout.',
        bestTime: 'Mar – May, Sep – Nov',
        rating: '4.6',
        facts: [
          'Over 7,000 exhibits including ceramics, jewelry, carpets and national costumes.',
          "The building blends Eastern and Russian 19th-century architecture in the 'Polovtsov style'.",
          'Suzani embroideries in the collection date from the mid-19th to early 20th centuries.',
        ],
      },
      railway: {
        name: 'Railway Museum',
        short: 'Steel giants under the open sky.',
        desc: 'Opened in 1989 to mark the centenary of Central Asian railways, this is one of the largest railway museums in Asia. Along a kilometre-long alley stand steam, diesel and electric locomotives — many with fascinating histories. You can climb into the driver cabs and feel the scale of the Soviet rail empire firsthand.',
        mustSee: 'P36 steam locomotive & captured German TE-52',
        price: '~25,000 UZS',
        time: '09:00 – 18:00 (Closed Mon/Tue)',
        transport: 'Metro: Toshkent (3 min walk)',
        tips: 'You can climb into most locomotive cabs. A steam-hauled mini train runs the full length of the alley.',
        bestTime: 'Year-round; mornings are quietest',
        rating: '4.4',
        facts: [
          '13 steam, 18 diesel and 3 electric locomotives from the Imperial era through the 1970s.',
          'The German BR-52 war trophy was captured by the Red Army and renamed TE-52.',
          'The 1914 OV-1534 ("Sheep") locomotive was featured on an Uzbekistan postage stamp in 1999.',
        ],
      },
      victory: {
        name: 'Victory Park',
        short: 'Symbol of resilience and courage.',
        desc: "A solemn memorial complex opened on 9 May 2020 for the 75th anniversary of Victory Day. The centrepiece is the \"Ode to Resilience\" — a monument to Zulfiya Zakirova, an Uzbek mother who lost all five sons at the front. The Museum of Glory holds original documents, soldiers' personal items, and immersive exhibitions.",
        mustSee: '"Ode to Resilience" & Eternal Flame',
        price: 'Park: Free, Museum: 25,000 UZS',
        time: 'Park: 08:00 – 22:00 / Museum: 09:00 – 18:00',
        transport: 'Taxi (Yandex Go, ~15 min from centre)',
        tips: 'An audio guide is available in the museum. Weekday mornings are the least crowded.',
        bestTime: 'May 9 for special ceremonies',
        rating: '4.7',
        facts: [
          'Nearly 2 million Uzbeks served in WWII — one in every three did not return.',
          'Uzbekistan hosted over 1.5 million evacuees from war-zone republics during the conflict.',
          'Tashkent railway workers sent 18 hospital trains and 5 armored trains to the front.',
        ],
      },
      romanov: {
        name: 'Romanov Palace',
        short: 'European castle in Central Asia.',
        desc: "Built in 1891 for Grand Duke Nikolai Konstantinovich — a grandson of Nicholas I, exiled to Turkestan after a family scandal. The palace fuses Gothic, Art Nouveau and Eastern decorative styles. During his exile Nikolai opened Tashkent's first cinema, a soap factory, and dug major irrigation canals across the Hungry Steppe.",
        mustSee: 'Bronze hound statues at the entrance',
        price: 'Free (exterior only)',
        time: '24/7 (exterior)',
        transport: 'Metro: Mustaqillik (10 min walk)',
        tips: 'Best photographed from the corner of Sayilgoh Street. Interior is closed — it serves as the MFA reception house.',
        bestTime: 'Morning or golden hour for photos',
        rating: '4.3',
        facts: [
          "The Duke's art collection became the foundation of the State Museum of Arts in 1919.",
          "Nikolai opened Tashkent's first cinema, named 'Khiva', to the delight of locals.",
          'The palace was designed by the same St. Petersburg architects who built structures in the capital.',
        ],
      },
    },
    useful: {
      title: 'Practical Info',
      items: [
        { title: 'Transport', body: 'Yandex Go: rides cost $1.5–3. Metro costs 1,700 UZS (~$0.14) per trip.' },
        { title: 'Cuisine', body: 'Must try: Plov (best at the Central Dept Store), Somsa, Shurpa, Lagman and fresh non bread.' },
        { title: 'Etiquette', body: 'Cover shoulders in mosques and remove shoes. Always ask before photographing locals.' },
      ],
    },
  },

  ZH: {
    title: '塔什干',
    subtitle: '中亚明珠',
    cta: '开始旅程',
    back: '返回菜单',
    infoSub: '交通、美食与礼仪',
    factsTitle: '趣闻轶事',
    labels: {
      highlight: '亮点',
      open: '开放时间',
      price: '门票',
      transport: '如何前往',
      tips: '实用贴士',
      bestTime: '最佳时间',
    },
    locations: {
      applied: {
        name: '应用艺术博物馆',
        short: '乌兹别克工艺宝库。',
        desc: '这座建筑原为俄国外交官波洛夫佐夫的宅邸，19世纪末由来自布哈拉、希瓦、撒马尔罕和塔什干的匠人装饰，精美的石膏雕刻天花板与苏扎尼刺绣令人叹为观止。自1937年起，这里收藏着中亚地区最丰富的装饰艺术藏品之一，超过7,000件展品。',
        mustSee: '石膏雕刻天花板与苏扎尼刺绣',
        price: '约 30,000 索姆',
        time: '每日 09:00 – 18:00',
        transport: '地铁：Kosmonavtlar 站（步行5分钟）',
        tips: '建议上午参观，团队游少。全馆允许拍照。',
        bestTime: '3-5月、9-11月',
        rating: '4.6',
        facts: [
          '馆藏逾7,000件展品，包括陶瓷、珠宝、地毯和民族服饰。',
          '建筑融合了东方与俄罗斯19世纪建筑风格，被称为"波洛夫佐夫风格"。',
          '苏扎尼刺绣藏品可追溯至19世纪中期至20世纪初。',
        ],
      },
      railway: {
        name: '铁路博物馆',
        short: '露天展示的钢铁巨兽。',
        desc: '博物馆于1989年建成，以庆祝中亚铁路百年华诞，是亚洲最大的铁路博物馆之一。沿近一公里的林荫道排列着蒸汽机车、内燃机车和电力机车，其中许多见证了20世纪的历史。您可以亲身攀上机车驾驶室，感受苏联铁路帝国的宏大气魄。',
        mustSee: 'П36蒸汽机车与缴获的德国TE-52',
        price: '约 25,000 索姆',
        time: '09:00 – 18:00（周一、二闭馆）',
        transport: '地铁：Toshkent 站（步行3分钟）',
        tips: '大多数机车可以攀爬进入驾驶室。小观光火车贯穿整条展览大道。',
        bestTime: '全年皆宜，清晨人少',
        rating: '4.4',
        facts: [
          '馆内有13辆蒸汽机车、18辆内燃机车和3辆电力机车，跨越帝俄至1970年代。',
          '德国BR-52战利品机车是二战中被红军缴获的，被重命名为TE-52。',
          '1914年制造的ОВ-1534"绵羊"机车曾登上1999年乌兹别克斯坦邮票。',
        ],
      },
      victory: {
        name: '胜利公园',
        short: '坚韧与勇气的象征。',
        desc: '这座庄严的纪念园于2020年5月9日为纪念胜利75周年而开放。核心是《坚韧颂》雕塑，献给失去五个儿子的乌兹别克母亲祖尔菲娅·扎基洛娃。荣誉博物馆珍藏着原始文件、士兵遗物和沉浸式展览，令人动容。',
        mustSee: '《坚韧颂》与长明火',
        price: '公园免费，博物馆约 25,000 索姆',
        time: '公园：08:00–22:00 / 博物馆：09:00–18:00',
        transport: '打车（Yandex Go，距市中心约15分钟）',
        tips: '博物馆提供音频导览。平日上午参观人最少。',
        bestTime: '5月9日有特别纪念活动',
        rating: '4.7',
        facts: [
          '近200万乌兹别克人参战，每三人中就有一人未能归来。',
          '二战期间乌兹别克斯坦接纳了超过150万名来自战区的疏散难民。',
          '塔什干铁路工人共向前线输送了18列医疗列车和5列装甲列车。',
        ],
      },
      romanov: {
        name: '罗曼诺夫宫',
        short: '中亚腹地的欧洲城堡。',
        desc: '这座宫殿建于1891年，为因家族丑闻被流放至突厥斯坦的尼古拉一世之孙——尼古拉·康斯坦丁诺维奇大公所建。建筑融合哥特式、新艺术运动与东方装饰风格。大公在塔什干开设了第一家电影院，建造肥皂厂，并在饥饿草原开凿了主要灌溉渠道。',
        mustSee: '入口处的青铜猎犬雕塑',
        price: '免费（仅限外观）',
        time: '全天（外观）',
        transport: '地铁：Mustaqillik 站（步行10分钟）',
        tips: '在Sayilgoh街路口拍摄效果最佳。内部不对外开放（现为外交部接待所）。',
        bestTime: '清晨或黄金时段拍照',
        rating: '4.3',
        facts: [
          '大公的艺术收藏于1919年成为国家艺术博物馆馆藏的基础。',
          '大公在塔什干开设了第一家名为"希瓦"的电影院。',
          '宫殿由曾在圣彼得堡工作的著名建筑师设计。',
        ],
      },
    },
    useful: {
      title: '实用信息',
      items: [
        { title: '交通', body: 'Yandex Go打车每次约1.5–3美元。地铁票价1,700索姆（约$0.14）。' },
        { title: '美食', body: '必尝：抓饭（中百大楼最佳）、烤包子、肉汤、拉面和馕饼。' },
        { title: '礼仪', body: '参观清真寺时请遮盖肩膀并脱鞋。拍摄当地人前请先征得同意。' },
      ],
    },
  },
};

// ── SVG Illustrations ─────────────────────────────────────────────────────────

function AppliedIllus() {
  return (
      <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="400" height="320" fill="#04111f" />
        {[...Array(6)].map((_, i) => (
            <circle key={i} cx="200" cy="160" r={24 + i * 30} fill="none" stroke="#22d3ee" strokeWidth="0.7" opacity={0.22 - i * 0.03} />
        ))}
        {[...Array(12)].map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return <line key={i} x1="200" y1="160" x2={200 + Math.cos(a) * 200} y2={160 + Math.sin(a) * 200} stroke="#0e7490" strokeWidth="0.5" opacity="0.3" />;
        })}
        {[...Array(8)].map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
              <g key={i}>
                <circle cx={200 + Math.cos(a) * 85} cy={160 + Math.sin(a) * 85} r="10" fill="none" stroke="#22d3ee" strokeWidth="1" opacity="0.35" />
                <circle cx={200 + Math.cos(a) * 85} cy={160 + Math.sin(a) * 85} r="3" fill="#22d3ee" opacity="0.4" />
              </g>
          );
        })}
        <circle cx="200" cy="160" r="7" fill="#22d3ee" opacity="0.5" />
      </svg>
  );
}

function RailwayIllus() {
  const ties = [0.04, 0.13, 0.25, 0.38, 0.53, 0.68, 0.84, 1.0];
  return (
      <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="400" height="320" fill="#0c0f14" />
        <line x1="200" y1="20" x2="55" y2="320" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        <line x1="200" y1="20" x2="345" y2="320" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
        {ties.map((t, i) => {
          const y = 20 + t * 300;
          const hw = t * 145 + 4;
          return <line key={i} x1={200 - hw} y1={y} x2={200 + hw} y2={y} stroke="#334155" strokeWidth={1.5 + t * 5} strokeLinecap="round" />;
        })}
        <circle cx="200" cy="22" r="6" fill="#94a3b8" opacity="0.3" />
      </svg>
  );
}

function VictoryIllus() {
  const starPts = [...Array(5)].map((_, i) => {
    const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
    return `${200 + Math.cos(a) * 75},${160 + Math.sin(a) * 75}`;
  }).join(' ');
  return (
      <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="400" height="320" fill="#0a0d18" />
        {[...Array(16)].map((_, i) => {
          const a = (i / 16) * Math.PI * 2;
          return <line key={i} x1="200" y1="160" x2={200 + Math.cos(a) * 220} y2={160 + Math.sin(a) * 220} stroke="#d4a017" strokeWidth="0.6" opacity="0.18" />;
        })}
        {[28, 52, 78, 108, 142].map((r, i) => (
            <circle key={i} cx="200" cy="160" r={r} fill="none" stroke="#d4a017" strokeWidth="0.5" opacity={0.25 - i * 0.04} />
        ))}
        <polygon points={starPts} fill="none" stroke="#d4a017" strokeWidth="1.5" opacity="0.55" />
        <circle cx="200" cy="160" r="7" fill="#d4a017" opacity="0.55" />
      </svg>
  );
}

function RomanovIllus() {
  return (
      <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="400" height="320" fill="#0d0a1a" />
        {[...Array(5)].map((_, col) =>
            [...Array(4)].map((_, row) => {
              const x = col * 82 - 5, y = row * 88 - 10;
              return (
                  <g key={`${col}-${row}`} opacity="0.22">
                    <path d={`M${x+41},${y+5} Q${x+65},${y+30} ${x+41},${y+55} Q${x+17},${y+30} ${x+41},${y+5}`} fill="none" stroke="#a78bfa" strokeWidth="0.8" />
                    <circle cx={x+41} cy={y+20} r="3.5" fill="#a78bfa" opacity="0.5" />
                  </g>
              );
            })
        )}
        <rect x="148" y="88" width="104" height="144" fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0.25" />
      </svg>
  );
}

const ILLUS = { applied: AppliedIllus, railway: RailwayIllus, victory: VictoryIllus, romanov: RomanovIllus };
const ICONS = { applied: Landmark, railway: Train, victory: Award, romanov: Building2 };

// ── Photo with SVG fallback ───────────────────────────────────────────────────

function LocationPhoto({ id, src, alt, aspectClass = 'aspect-[4/5]' }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const IllusComp = ILLUS[id];
  const showPhoto = src && !failed;

  return (
      <div className={`relative overflow-hidden w-full ${aspectClass}`}>
        <div className="absolute inset-0">
          <IllusComp />
        </div>
        {showPhoto && (
            <img
                src={src}
                alt={alt}
                onLoad={() => setLoaded(true)}
                onError={() => setFailed(true)}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                style={{ opacity: loaded ? 1 : 0 }}
            />
        )}
      </div>
  );
}

// ── LocationCard ──────────────────────────────────────────────────────────────

function LocationCard({ id, loc, photo, onClick }) {
  const Icon = ICONS[id];
  return (
      <button
          onClick={onClick}
          className="group text-left w-full cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          style={{ background: 'rgba(4,20,40,0.75)', border: '1px solid rgba(34,211,238,0.12)', backdropFilter: 'blur(12px)' }}
      >
        <div className="relative h-40 overflow-hidden">
          <LocationPhoto id={id} src={photo} alt={loc.name} aspectClass="h-40 w-full" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(4,11,20,0.92) 0%, transparent 55%)' }} />
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', color: '#fbbf24' }}>
            <Star size={10} fill="#fbbf24" /> {loc.rating}
          </div>
        </div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div className="p-2 rounded-lg" style={{ background: 'rgba(34,211,238,0.1)' }}>
              <Icon className="text-cyan-400 w-5 h-5" />
            </div>
            <ChevronRight className="text-cyan-900 group-hover:text-cyan-400 transition-colors mt-0.5" size={18} />
          </div>
          <h3 className="font-bold text-sky-50 mb-1 leading-snug">{loc.name}</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(186,230,253,0.55)' }}>{loc.short}</p>
        </div>
      </button>
  );
}

// ── LocationDetail ────────────────────────────────────────────────────────────

function LocationDetail({ id, loc, photo, t, onBack }) {
  const { labels } = t;
  return (
      <div className="max-w-4xl mx-auto px-6 pt-6 pb-24">
        <button onClick={onBack} className="flex items-center gap-2 text-cyan-500 mb-8 hover:text-cyan-300 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> {t.back}
        </button>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Photo panel */}
          <div className="rounded-3xl overflow-hidden shadow-2xl relative" style={{ aspectRatio: '4/5' }}>
            <LocationPhoto id={id} src={photo} alt={loc.name} aspectClass="w-full h-full" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(4,11,20,0.5) 0%, transparent 60%)' }} />
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold" style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)', color: '#fbbf24', border: '1px solid rgba(251,191,36,0.2)' }}>
              <Star size={13} fill="#fbbf24" /> {loc.rating}
            </div>
          </div>

          {/* Info panel */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={14} style={{ color: 'rgba(34,211,238,0.6)' }} />
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'rgba(34,211,238,0.6)' }}>
              {labels.bestTime}: {loc.bestTime}
            </span>
            </div>
            <h2 className="text-3xl font-black text-sky-50 mb-3 leading-tight">{loc.name}</h2>
            <p className="leading-relaxed mb-6" style={{ color: 'rgba(186,230,253,0.72)', lineHeight: '1.75' }}>{loc.desc}</p>

            {/* Highlight */}
            <div className="flex items-start gap-4 p-4 rounded-2xl mb-4" style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.15)' }}>
              <Award className="text-cyan-400 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: 'rgba(34,211,238,0.5)' }}>{labels.highlight}</p>
                <p className="text-sky-100 text-sm">{loc.mustSee}</p>
              </div>
            </div>

            {/* Hours + Price */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <Clock className="text-cyan-500 mb-2" size={16} />
                <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: 'rgba(147,197,253,0.4)' }}>{labels.open}</p>
                <p className="text-sky-100 text-sm leading-snug">{loc.time}</p>
              </div>
              <div className="p-4 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <CreditCard className="text-cyan-500 mb-2" size={16} />
                <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: 'rgba(147,197,253,0.4)' }}>{labels.price}</p>
                <p className="text-sky-100 text-sm leading-snug">{loc.price}</p>
              </div>
            </div>

            {/* Transport */}
            <div className="flex items-center gap-3 p-4 rounded-2xl mb-4" style={{ background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.2)' }}>
              <MapPin className="text-yellow-400 shrink-0" size={18} />
              <div>
                <p className="text-xs uppercase tracking-widest font-bold mb-0.5" style={{ color: 'rgba(212,160,23,0.55)' }}>{labels.transport}</p>
                <p className="text-yellow-100 text-sm">{loc.transport}</p>
              </div>
            </div>

            {/* Tips */}
            <div className="flex items-start gap-3 p-4 rounded-2xl" style={{ background: 'rgba(167,139,250,0.07)', border: '1px solid rgba(167,139,250,0.15)' }}>
              <Info className="text-violet-400 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="text-xs uppercase tracking-widest font-bold mb-0.5" style={{ color: 'rgba(167,139,250,0.55)' }}>{labels.tips}</p>
                <p className="text-violet-100 text-sm leading-relaxed">{loc.tips}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Facts section */}
        <div className="mt-10">
          <h3 className="text-lg font-bold text-sky-200 mb-4 flex items-center gap-2">
            <Users size={18} className="text-cyan-400" /> {t.factsTitle}
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {loc.facts.map((fact, i) => (
                <div key={i} className="p-4 rounded-2xl text-sm leading-relaxed" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(34,211,238,0.08)', color: 'rgba(186,230,253,0.65)' }}>
                  <span className="text-cyan-500 font-black mr-2">{String(i + 1).padStart(2, '0')}.</span>
                  {fact}
                </div>
            ))}
          </div>
        </div>
      </div>
  );
}

// ── InfoPage ──────────────────────────────────────────────────────────────────

function InfoPage({ t, onBack }) {
  const icons = [MapPin, Award, Info];
  return (
      <div className="max-w-2xl mx-auto px-6 pt-6 pb-24">
        <button onClick={onBack} className="flex items-center gap-2 text-cyan-500 mb-8 hover:text-cyan-300 transition-colors text-sm font-medium">
          <ArrowLeft size={16} /> {t.back}
        </button>
        <h2 className="text-3xl font-black text-sky-50 mb-8">{t.useful.title}</h2>
        <div className="space-y-4">
          {t.useful.items.map((item, i) => {
            const Icon = icons[i];
            return (
                <div key={i} className="flex gap-5 p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(34,211,238,0.1)' }}>
                  <Icon className="text-cyan-400 shrink-0 mt-0.5" size={20} />
                  <div>
                    <h4 className="font-bold text-sky-200 mb-1">{item.title}</h4>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(186,230,253,0.65)' }}>{item.body}</p>
                  </div>
                </div>
            );
          })}
        </div>
      </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

const LOCATION_IDS = ['applied', 'railway', 'victory', 'romanov'];

export default function App() {
  const [lang, setLang]     = useState('RU');
  const [page, setPage]     = useState('landing');
  const [fading, setFading] = useState(false);
  const [photos, setPhotos] = useState({});

  const t = CONTENT[lang];

  // Fetch Wikipedia thumbnails via public API (CORS-enabled)
  useEffect(() => {
    Promise.all(
        Object.entries(WIKI_TITLES).map(([id, title]) =>
            fetch(
                `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}&prop=pageimages&format=json&pithumbsize=800&origin=*`
            )
                .then(r => r.json())
                .then(data => {
                  const pg = Object.values(data.query.pages)[0];
                  return [id, pg?.thumbnail?.source ?? null];
                })
                .catch(() => [id, null])
        )
    ).then(results => setPhotos(Object.fromEntries(results)));
  }, []);

  const nav = (nextPage) => {
    setFading(true);
    setTimeout(() => { setPage(nextPage); setFading(false); window.scrollTo(0, 0); }, 140);
  };

  return (
      <div
          className="min-h-screen text-sky-50 font-sans"
          style={{
            background: '#04080f',
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(34,211,238,0.045) 1px, transparent 0)',
            backgroundSize: '28px 28px',
          }}
      >
        {/* Glows */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-0 left-0 w-[520px] h-[520px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(8,145,178,0.1) 0%, transparent 70%)', transform: 'translate(-35%,-35%)' }} />
          <div className="absolute bottom-0 right-0 w-[480px] h-[480px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(14,116,144,0.08) 0%, transparent 70%)', transform: 'translate(30%,30%)' }} />
        </div>

        {/* Nav */}
        <nav className="relative z-10 px-6 py-5 flex justify-between items-center max-w-6xl mx-auto">
          <button onClick={() => nav('landing')} className="flex items-center gap-2.5 font-black text-lg tracking-tight text-sky-50 hover:text-cyan-300 transition-colors">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm text-sky-950" style={{ background: 'linear-gradient(135deg, #22d3ee, #0891b2)' }}>T</div>
            UZB GUIDE
          </button>
          <div className="flex p-1 rounded-full gap-0.5" style={{ background: 'rgba(34,211,238,0.06)', border: '1px solid rgba(34,211,238,0.12)' }}>
            {['RU', 'EN', 'ZH'].map((l) => (
                <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider transition-all ${lang === l ? 'text-sky-950' : 'text-sky-400 hover:text-sky-200'}`}
                    style={lang === l ? { background: 'linear-gradient(135deg, #22d3ee, #0891b2)' } : {}}
                >
                  {l}
                </button>
            ))}
          </div>
        </nav>

        {/* Pages */}
        <main className="relative z-10" style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.14s ease' }}>

          {page === 'landing' && (
              <div className="max-w-3xl mx-auto text-center px-6 pt-16 pb-32">
                <p className="text-xs uppercase tracking-[0.3em] mb-4 font-bold" style={{ color: 'rgba(34,211,238,0.6)' }}>{t.subtitle}</p>
                <h1 className="text-7xl md:text-9xl font-black text-sky-50 mb-6 tracking-tight leading-none">{t.title}</h1>
                <div className="w-16 h-px mx-auto mb-8" style={{ background: 'linear-gradient(90deg,transparent,#22d3ee,transparent)' }} />
                <p className="text-lg mb-10 max-w-lg mx-auto leading-relaxed" style={{ color: 'rgba(147,197,253,0.6)' }}>
                  {lang === 'RU' && 'Четыре места, которые стоит увидеть — с историями, фотографиями и практической информацией.'}
                  {lang === 'EN' && 'Four places worth seeing — with stories, photos and practical information.'}
                  {lang === 'ZH' && '四个值得一游的地方——含历史故事、照片与实用信息。'}
                </p>
                <button
                    onClick={() => nav('menu')}
                    className="px-10 py-4 font-bold rounded-2xl text-sky-950 transition-all duration-200 hover:scale-105 active:scale-100"
                    style={{ background: 'linear-gradient(135deg,#22d3ee,#0891b2)', boxShadow: '0 0 48px rgba(34,211,238,0.2)' }}
                >
                  {t.cta}
                </button>
              </div>
          )}

          {page === 'menu' && (
              <div className="max-w-5xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                  {LOCATION_IDS.map((id) => (
                      <LocationCard key={id} id={id} loc={t.locations[id]} photo={photos[id]} onClick={() => nav(id)} />
                  ))}
                </div>
                <button
                    onClick={() => nav('info')}
                    className="w-full text-left p-6 rounded-2xl transition-all hover:brightness-110"
                    style={{ background: 'linear-gradient(135deg, rgba(34,211,238,0.08), rgba(8,145,178,0.08))', border: '1px solid rgba(34,211,238,0.15)' }}
                >
                  <div className="flex items-center gap-4">
                    <Info className="text-cyan-400" size={22} />
                    <div>
                      <h3 className="font-bold text-lg text-sky-100">{t.useful.title}</h3>
                      <p className="text-sm" style={{ color: 'rgba(186,230,253,0.5)' }}>{t.infoSub}</p>
                    </div>
                    <ChevronRight className="text-cyan-800 ml-auto" size={20} />
                  </div>
                </button>
              </div>
          )}

          {LOCATION_IDS.map((id) =>
              page === id
                  ? <LocationDetail key={id} id={id} loc={t.locations[id]} photo={photos[id]} t={t} onBack={() => nav('menu')} />
                  : null
          )}

          {page === 'info' && <InfoPage t={t} onBack={() => nav('menu')} />}
        </main>

        <footer className="relative z-10 py-10 text-center text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(56,189,248,0.2)' }}>
          © 2026 Multilingual Guide Project · Mubina Muksinjonova · TRANSLATION STUDIES (WITH CHINESE AND ENGLISH LANGUAGE)
        </footer>
      </div>
  );
}