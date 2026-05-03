import React, { useState } from 'react';
import { Train, Award, Landmark, Building2, Info, ChevronRight, MapPin, Clock, CreditCard, ArrowLeft } from 'lucide-react';

// ── i18n ─────────────────────────────────────────────────────────────────────

const CONTENT = {
  RU: {
    title: 'Ташкент',
    subtitle: 'Жемчужина Центральной Азии',
    cta: 'Начать путешествие',
    back: 'Назад в меню',
    infoSub: 'Транспорт, еда и этикет',
    labels: { highlight: 'Главное', open: 'Часы работы', price: 'Цена', transport: 'Как добраться' },
    locations: {
      applied: {
        name: 'Музей прикладного искусства',
        short: 'Сокровищница узбекских ремёсел.',
        desc: 'Бывшая резиденция дипломата с уникальной резьбой по ганчу и одной из лучших коллекций вышивки сюзане в стране.',
        mustSee: 'Резные потолки и вышивка сюзане',
        price: '~30 000 сум',
        time: '09:00 – 18:00',
        transport: 'Метро: Космонавтлар',
      },
      railway: {
        name: 'Музей поездов',
        short: 'Стальные гиганты под открытым небом.',
        desc: 'Огромная коллекция паровозов и тепловозов — идеальное место для атмосферных ретрофотосессий.',
        mustSee: 'Паровозы XIX века и детский мини-поезд',
        price: '~25 000 сум',
        time: '09:00 – 18:00 (вых. пн, вт)',
        transport: 'Метро: Ташкент (Сев. вокзал)',
      },
      victory: {
        name: 'Парк Победы',
        short: 'Символ стойкости и мужества.',
        desc: 'Мемориальный комплекс и Музей Славы, посвящённые подвигу народа в годы Великой Отечественной войны.',
        mustSee: 'Памятник «Ода стойкости»',
        price: 'Парк — бесплатно, музей — 25 000',
        time: 'Парк до 20:00, музей до 18:00',
        transport: 'Такси (Алмазарский р-н)',
      },
      romanov: {
        name: 'Дворец Романова',
        short: 'Европейский замок в центре Азии.',
        desc: 'Шедевр архитектуры модерн, возведённый для великого князя Николая Романова в конце XIX века.',
        mustSee: 'Бронзовые статуи гончих и фасад дворца',
        price: 'Бесплатно (осмотр снаружи)',
        time: '24/7 (снаружи)',
        transport: 'Метро: Мустакиллик',
      },
    },
    useful: {
      title: 'Полезно знать',
      items: [
        { title: 'Транспорт', body: 'Используйте Yandex Go: поездка стоит $1.5–3' },
        { title: 'Кухня', body: 'Обязательно: плов, самса, шурпа' },
        { title: 'Этикет', body: 'В мечетях прикрывайте плечи и снимайте обувь' },
      ],
    },
  },
  EN: {
    title: 'Tashkent',
    subtitle: 'Pearl of Central Asia',
    cta: 'Start Journey',
    back: 'Back to Menu',
    infoSub: 'Transport, food & etiquette',
    labels: { highlight: 'Highlight', open: 'Hours', price: 'Price', transport: 'Getting There' },
    locations: {
      applied: {
        name: 'Applied Arts Museum',
        short: 'Treasury of Uzbek craftsmanship.',
        desc: "A former diplomat's mansion featuring intricate ganch carving and a celebrated collection of suzani embroidery panels.",
        mustSee: 'Ganch carved ceilings & suzani panels',
        price: '~30,000 UZS',
        time: '09:00 – 18:00',
        transport: 'Metro: Kosmonavtlar',
      },
      railway: {
        name: 'Railway Museum',
        short: 'Steel giants under the open sky.',
        desc: 'A vast open-air collection of vintage locomotives — the best spot in Tashkent for atmospheric retro photography.',
        mustSee: '19th-century steam trains & mini-train',
        price: '~25,000 UZS',
        time: '09:00 – 18:00 (Closed Mon/Tue)',
        transport: 'Metro: Toshkent (North Station)',
      },
      victory: {
        name: 'Victory Park',
        short: 'Symbol of resilience and courage.',
        desc: "A solemn memorial complex and Museum of Glory dedicated to Uzbekistan's heroism and sacrifice during WWII.",
        mustSee: '"Ode to Resilience" monument',
        price: 'Park: Free, Museum: 25,000 UZS',
        time: 'Park until 20:00, Museum until 18:00',
        transport: 'Taxi (Olmazor district)',
      },
      romanov: {
        name: 'Romanov Palace',
        short: 'European castle in Central Asia.',
        desc: 'An Art Nouveau masterpiece built for Grand Duke Nikolai Romanov in the late 19th century — a rare blend of East and West.',
        mustSee: 'Bronze hound statues & ornate facade',
        price: 'Free (exterior only)',
        time: '24/7 (exterior)',
        transport: 'Metro: Mustaqillik',
      },
    },
    useful: {
      title: 'Practical Info',
      items: [
        { title: 'Transport', body: 'Use Yandex Go: rides cost $1.5–3' },
        { title: 'Cuisine', body: 'Must try: Plov, Somsa, and Shurpa soup' },
        { title: 'Etiquette', body: 'Cover shoulders in mosques and remove shoes' },
      ],
    },
  },
  ZH: {
    title: '塔什干',
    subtitle: '中亚明珠',
    cta: '开始旅程',
    back: '返回菜单',
    infoSub: '交通、美食与礼仪',
    labels: { highlight: '亮点', open: '开放时间', price: '价格', transport: '如何前往' },
    locations: {
      applied: {
        name: '应用艺术博物馆',
        short: '乌兹别克工艺宝库。',
        desc: '昔日外交官宅邸，展示精美石膏雕刻与苏扎尼刺绣，传统手工艺之美令人叹为观止。',
        mustSee: '石膏雕刻天花板与苏扎尼刺绣',
        price: '约 30,000 索姆',
        time: '09:00 – 18:00',
        transport: '地铁：Kosmonavtlar 站',
      },
      railway: {
        name: '铁路博物馆',
        short: '露天展示的钢铁巨兽。',
        desc: '汇集大量复古机车的露天博物馆，是拍摄怀旧风格照片的绝佳场所。',
        mustSee: '19世纪蒸汽火车与儿童小火车',
        price: '约 25,000 索姆',
        time: '09:00 – 18:00（周一、二闭馆）',
        transport: '地铁：Toshkent 站（北站）',
      },
      victory: {
        name: '胜利公园',
        short: '坚韧与勇气的象征。',
        desc: '庄严的纪念建筑群与荣誉博物馆，纪念乌兹别克斯坦人民在二战中的英勇贡献。',
        mustSee: '《坚韧颂》纪念碑',
        price: '公园免费，博物馆约 25,000 索姆',
        time: '公园至 20:00，博物馆至 18:00',
        transport: '建议打车（Olmazor 区）',
      },
      romanov: {
        name: '罗曼诺夫宫',
        short: '中亚腹地的欧洲城堡。',
        desc: '19世纪末为尼古拉·罗曼诺夫大公建造的新艺术运动风格建筑杰作，东西方风格完美融合。',
        mustSee: '青铜猎犬雕塑与精美外墙',
        price: '免费（仅限外观）',
        time: '全天（外观）',
        transport: '地铁：Mustaqillik 站',
      },
    },
    useful: {
      title: '实用信息',
      items: [
        { title: '交通', body: '使用 Yandex Go，每次约 1.5–3 美元' },
        { title: '美食', body: '必尝：抓饭、烤包子、肉汤' },
        { title: '礼仪', body: '参观清真寺时请遮盖肩膀并脱鞋' },
      ],
    },
  },
};

// ── SVG Illustrations ─────────────────────────────────────────────────────────
// Palette: Samarkand tiles — deep blue bg, cyan/teal geometric patterns

function AppliedIllus() {
  // Uzbek tilework: radial mandala in teal/cyan
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
      {[...Array(6)].map((_, i) => {
        const a = (i / 6) * Math.PI * 2 + Math.PI / 6;
        return <line key={i} x1={200 + Math.cos(a) * 50} y1={160 + Math.sin(a) * 50} x2={200 + Math.cos(a + Math.PI / 6) * 80} y2={160 + Math.sin(a + Math.PI / 6) * 80} stroke="#67e8f9" strokeWidth="1" opacity="0.3" />;
      })}
      <circle cx="200" cy="160" r="16" fill="#22d3ee" opacity="0.15" />
      <circle cx="200" cy="160" r="7" fill="#22d3ee" opacity="0.5" />
    </svg>
  );
}

function RailwayIllus() {
  // Railroad perspective tracks — steel tones
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
      {[50, 80, 115].map((r, i) => (
        <ellipse key={i} cx="200" cy="22" rx={r} ry={r * 0.4} fill="none" stroke="#64748b" strokeWidth="0.6" opacity={0.2 - i * 0.05} />
      ))}
      <circle cx="200" cy="22" r="6" fill="#94a3b8" opacity="0.3" />
    </svg>
  );
}

function VictoryIllus() {
  // Gold star radiating — fitting for a war memorial
  const starPoints = [...Array(5)].map((_, i) => {
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
      <polygon points={starPoints} fill="none" stroke="#d4a017" strokeWidth="1.5" opacity="0.55" />
      {[...Array(5)].map((_, i) => {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        return <circle key={i} cx={200 + Math.cos(a) * 75} cy={160 + Math.sin(a) * 75} r="5" fill="#d4a017" opacity="0.5" />;
      })}
      <circle cx="200" cy="160" r="14" fill="#d4a017" opacity="0.2" />
      <circle cx="200" cy="160" r="6" fill="#d4a017" opacity="0.55" />
    </svg>
  );
}

function RomanovIllus() {
  // Art Nouveau botanical arches — soft blue-violet
  return (
    <svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="400" height="320" fill="#0d0a1a" />
      {[...Array(5)].map((_, col) =>
        [...Array(4)].map((_, row) => {
          const x = col * 82 - 5;
          const y = row * 88 - 10;
          return (
            <g key={`${col}-${row}`} opacity="0.22">
              <path d={`M${x + 41},${y + 5} Q${x + 65},${y + 30} ${x + 41},${y + 55} Q${x + 17},${y + 30} ${x + 41},${y + 5}`} fill="none" stroke="#a78bfa" strokeWidth="0.8" />
              <line x1={x + 10} y1={y + 60} x2={x + 72} y2={y + 60} stroke="#a78bfa" strokeWidth="0.4" />
              <circle cx={x + 41} cy={y + 20} r="3.5" fill="#a78bfa" opacity="0.5" />
            </g>
          );
        })
      )}
      <rect x="148" y="88" width="104" height="144" fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0.25" />
      <rect x="160" y="100" width="80" height="116" fill="none" stroke="#a78bfa" strokeWidth="0.5" opacity="0.15" />
    </svg>
  );
}

const ILLUS = { applied: AppliedIllus, railway: RailwayIllus, victory: VictoryIllus, romanov: RomanovIllus };
const ICONS = { applied: Landmark, railway: Train, victory: Award, romanov: Building2 };

// ── Components (defined outside App — no re-creation on re-render) ────────────

function LocationCard({ id, loc, onClick }) {
  const Icon = ICONS[id];
  return (
    <button
      onClick={onClick}
      className="group text-left w-full cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      style={{ background: 'rgba(4,20,40,0.75)', border: '1px solid rgba(34,211,238,0.12)', backdropFilter: 'blur(12px)' }}
    >
      <div className="h-28 overflow-hidden relative">
        {React.createElement(ILLUS[id])}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(4,11,20,0.92) 0%, transparent 55%)' }} />
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

function LocationDetail({ id, loc, t, onBack }) {
  const IllusComp = ILLUS[id];
  const { labels } = t;
  return (
    <div className="max-w-4xl mx-auto px-6 pt-6 pb-24">
      <button onClick={onBack} className="flex items-center gap-2 text-cyan-500 mb-8 hover:text-cyan-300 transition-colors text-sm font-medium">
        <ArrowLeft size={16} /> {t.back}
      </button>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/5] relative">
          <IllusComp />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(4,11,20,0.65) 0%, transparent 50%)' }} />
        </div>

        <div>
          <h2 className="text-3xl font-black text-sky-50 mb-3 leading-tight">{loc.name}</h2>
          <p className="leading-relaxed mb-8" style={{ color: 'rgba(186,230,253,0.7)' }}>{loc.desc}</p>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 rounded-2xl" style={{ background: 'rgba(34,211,238,0.07)', border: '1px solid rgba(34,211,238,0.15)' }}>
              <Award className="text-cyan-400 shrink-0 mt-0.5" size={18} />
              <div>
                <p className="text-xs uppercase tracking-widest font-bold mb-1" style={{ color: 'rgba(34,211,238,0.5)' }}>{labels.highlight}</p>
                <p className="text-sky-100 text-sm">{loc.mustSee}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
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

            <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background: 'rgba(212,160,23,0.08)', border: '1px solid rgba(212,160,23,0.2)' }}>
              <MapPin className="text-yellow-400 shrink-0" size={18} />
              <div>
                <p className="text-xs uppercase tracking-widest font-bold mb-0.5" style={{ color: 'rgba(212,160,23,0.55)' }}>{labels.transport}</p>
                <p className="text-yellow-100 text-sm">{loc.transport}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
  const [lang, setLang] = useState('RU');
  const [page, setPage] = useState('landing');
  const [fading, setFading] = useState(false);

  const t = CONTENT[lang];

  const nav = (nextPage) => {
    setFading(true);
    setTimeout(() => {
      setPage(nextPage);
      setFading(false);
      window.scrollTo(0, 0);
    }, 140);
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
      {/* Ambient glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-0 w-[520px] h-[520px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(8,145,178,0.1) 0%, transparent 70%)', transform: 'translate(-35%, -35%)' }} />
        <div className="absolute bottom-0 right-0 w-[480px] h-[480px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(14,116,144,0.08) 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />
      </div>

      {/* Nav */}
      <nav className="relative z-10 px-6 py-5 flex justify-between items-center max-w-6xl mx-auto">
        <button
          onClick={() => nav('landing')}
          className="flex items-center gap-2.5 font-black text-lg tracking-tight text-sky-50 hover:text-cyan-300 transition-colors"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm text-sky-950" style={{ background: 'linear-gradient(135deg, #22d3ee, #0891b2)' }}>
            T
          </div>
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
            <p className="text-xs uppercase tracking-[0.3em] mb-4 font-bold" style={{ color: 'rgba(34,211,238,0.6)' }}>
              {t.subtitle}
            </p>
            <h1 className="text-7xl md:text-9xl font-black text-sky-50 mb-6 tracking-tight leading-none">
              {t.title}
            </h1>
            <div className="w-16 h-px mx-auto mb-8" style={{ background: 'linear-gradient(90deg, transparent, #22d3ee, transparent)' }} />
            <button
              onClick={() => nav('menu')}
              className="px-10 py-4 font-bold rounded-2xl text-sky-950 transition-all duration-200 hover:scale-105 active:scale-100"
              style={{ background: 'linear-gradient(135deg, #22d3ee, #0891b2)', boxShadow: '0 0 48px rgba(34,211,238,0.2)' }}
            >
              {t.cta}
            </button>
          </div>
        )}

        {page === 'menu' && (
          <div className="max-w-5xl mx-auto px-6 pb-24">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              {LOCATION_IDS.map((id) => (
                <LocationCard key={id} id={id} loc={t.locations[id]} onClick={() => nav(id)} />
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
            ? <LocationDetail key={id} id={id} loc={t.locations[id]} t={t} onBack={() => nav('menu')} />
            : null
        )}

        {page === 'info' && <InfoPage t={t} onBack={() => nav('menu')} />}

      </main>

      <footer className="relative z-10 py-10 text-center text-xs tracking-[0.2em] uppercase" style={{ color: 'rgba(56,189,248,0.2)' }}>
        © 2026 Multilingual Guide Project · Faculty of Translation
      </footer>
    </div>
  );
}
