import { useState } from 'react';

// ==========================================
// [Type Definitions]
// ==========================================
interface PromptItem { label: string; value: string; icon?: string; }
interface Theme { 
  bg: string;
  bgGradient: string;
  text: string; 
  accent: string; 
  card: string; 
  btn: string; 
  btnActive: string; 
  visualizer: string; 
  slider: string;
}
interface ModeData { id: string; title: string; desc: string; theme: Theme; subjects: PromptItem[]; scenarios: PromptItem[]; actions: PromptItem[]; styles: PromptItem[]; envs: PromptItem[]; cameras?: PromptItem[]; }

// ==========================================
// [Database] 數據核心
// ==========================================
const COMMON_COMPOSITION: PromptItem[] = [
  { label: "單人特寫", value: "solo portrait of", icon: "👤" },
  { label: "雙人搭檔", value: "a dynamic shot of a pair of", icon: "👥" },
  { label: "三人小隊", value: "a cinematic shot of a squad of three", icon: "🛡️" },
  { label: "一群人", value: "a wide angle shot of a large crowd of", icon: "👨‍👩‍👧‍👦" },
  { label: "背對背", value: "a scene featuring two characters back to back,", icon: "⚔️" },
  { label: "對峙", value: "an intense scene of two characters facing each other,", icon: "⚡" }
];

// 1. 次世代科幻 (Cyber) - 銀灰科技
const DATA_CYBER: ModeData = {
  id: 'cyber', title: '次世代科幻', desc: 'Cyber & Sci-Fi',
  theme: { 
    bg: 'bg-slate-50',
    bgGradient: 'from-slate-100 to-slate-200', 
    text: 'text-slate-800', 
    accent: 'border-slate-300', 
    card: 'bg-white border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)]', 
    btn: 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-white hover:shadow-sm', 
    btnActive: 'bg-slate-800 text-white shadow-lg shadow-slate-300/50 border-transparent', 
    visualizer: 'from-slate-400 to-slate-600',
    slider: 'accent-slate-800'
  },
  subjects: [{ label: "賽博駭客", value: "cyberpunk hacker with neon tattoos", icon: "💻" }, { label: "戰術特勤", value: "special forces operator in full tactical gear", icon: "🥽" }, { label: "機甲巨龍", value: "giant mechanical dragon with steel scales", icon: "🐉" }, { label: "虛擬偶像", value: "virtual idol with holographic wings", icon: "🎤" }, { label: "生化人", value: "cyborg with exposed mechanical parts", icon: "🤖" }, { label: "星際戰士", value: "heavy armored space marine", icon: "🚀" }, { label: "機械女僕", value: "android maid with metallic skin", icon: "🎀" }, { label: "故障靈體", value: "digital ghost with data corruption effects", icon: "👻" }],
  scenarios: [{ label: "入侵主機", value: "hacking into a corporation mainframe", icon: "🔓" }, { label: "躲避追殺", value: "running away from police drones", icon: "🏃" }, { label: "天台抽菸", value: "smoking alone on a skyscraper rooftop", icon: "🚬" }, { label: "黑市交易", value: "engaging in an illegal black market trade", icon: "💰" }, { label: "穿越傳送", value: "stepping through a glowing dimensional portal", icon: "🌀" }],
  actions: [{ label: "戰鬥姿態", value: "in a fighting stance", icon: "🤺" }, { label: "駭客作業", value: "typing furiously on a holographic keyboard", icon: "⌨️" }, { label: "漂浮空中", value: "floating in zero gravity", icon: "🧚" }, { label: "手持武器", value: "aiming a futuristic weapon", icon: "🔫" }, { label: "高速奔跑", value: "sprinting at high speed", icon: "💨" }],
  styles: [{ label: "虛幻引擎5", value: "Unreal Engine 5 render", icon: "🎮" }, { label: "90s動漫", value: "1990s vintage anime aesthetic", icon: "📺" }, { label: "故障藝術", value: "glitch art style", icon: "👾" }, { label: "吉卜力風", value: "Studio Ghibli art style", icon: "🍃" }, { label: "奧術風格", value: "Arcane art style", icon: "🎨" }, { label: "蒸汽波", value: "vaporwave aesthetic", icon: "🌴" }],
  envs: [{ label: "霓虹雨夜", value: "against a backdrop of a cyberpunk city in heavy neon rain", icon: "🌧️" }, { label: "貧民窟", value: "situated in dirty cyberpunk slums", icon: "🏚️" }, { label: "太空站", value: "inside a sterile sci-fi space station", icon: "🛰️" }, { label: "電競室", value: "in a dark gaming room with RGB lighting", icon: "🎧" }, { label: "深海都市", value: "submerged in an underwater bioluminescent city", icon: "🌊" }, { label: "浮空島嶼", value: "standing on a floating island in the sky", icon: "☁️" }]
};

// 2. 極致寫實 (Realism) - 暖白極簡
const DATA_REAL: ModeData = {
  id: 'real', title: '極致寫實', desc: 'Realism & Photo',
  theme: { 
    bg: 'bg-orange-50/30',
    bgGradient: 'from-orange-50/50 to-stone-100', 
    text: 'text-stone-800', 
    accent: 'border-stone-200', 
    card: 'bg-white border-stone-200 shadow-[0_4px_20px_rgba(0,0,0,0.03)]', 
    btn: 'bg-stone-50 text-stone-500 border-stone-200 hover:bg-white hover:shadow-sm', 
    btnActive: 'bg-stone-800 text-white shadow-lg shadow-stone-300/50 border-transparent', 
    visualizer: 'from-stone-400 to-stone-600',
    slider: 'accent-stone-800'
  },
  subjects: [{ label: "街頭老人", value: "old man with deep wrinkles", icon: "👴" }, { label: "極限運動", value: "extreme sports athlete", icon: "🧗" }, { label: "北歐少女", value: "scandinavian girl with freckles", icon: "👱‍♀️" }, { label: "戰地記者", value: "war photographer wearing a vest", icon: "📸" }, { label: "遊牧民族", value: "nomadic tribe member", icon: "⛺" }, { label: "太空人", value: "nasa astronaut in realistic suit", icon: "👩‍🚀" }, { label: "流浪貓", value: "stray cat with detailed fur", icon: "🐱" }, { label: "芭蕾舞者", value: "ballet dancer in a tutu", icon: "🩰" }],
  scenarios: [{ label: "久別重逢", value: "hugging someone tight during a reunion", icon: "🫂" }, { label: "暴風雨前", value: "facing dark storm clouds", icon: "⛈️" }, { label: "勝利吶喊", value: "screaming in victory", icon: "🏆" }, { label: "午後咖啡", value: "relaxing with a cup of coffee", icon: "☕" }, { label: "廢墟尋光", value: "exploring abandoned ruins", icon: "🔦" }],
  actions: [{ label: "直視鏡頭", value: "looking directly at the camera", icon: "👁️" }, { label: "交談", value: "talking candidly", icon: "🗣️" }, { label: "回眸", value: "looking back over the shoulder", icon: "🔙" }, { label: "自然行走", value: "walking naturally", icon: "🚶" }, { label: "大笑", value: "laughing out loud", icon: "😄" }, { label: "抽菸(暗示)", value: "holding a cigarette", icon: "🚬" }, { label: "在雨中", value: "standing in the pouring rain", icon: "☔" }],
  styles: [{ label: "Raw原始檔", value: "raw photo style", icon: "🎞️" }, { label: "國家地理", value: "National Geographic style", icon: "🌍" }, { label: "電影劇照", value: "cinematic movie still", icon: "🎬" }, { label: "黑白紀實", value: "black and white photography", icon: "📓" }, { label: "Vogue時尚", value: "Vogue magazine style", icon: "👠" }, { label: "柯達底片", value: "vintage Kodak Portra 400", icon: "📼" }],
  cameras: [{ label: "Sony A7R", value: "shot on Sony A7R IV", icon: "📷" }, { label: "Leica M10", value: "shot on Leica M10", icon: "🔴" }, { label: "Hasselblad", value: "shot on Hasselblad X2D", icon: "⬛" }, { label: "CineStill", value: "shot on CineStill 800T film", icon: "🌃" }, { label: "IMAX 70mm", value: "shot on IMAX 70mm", icon: "🎥" }],
  envs: [{ label: "自然光棚", value: "in a studio with soft window light", icon: "🪟" }, { label: "黃金時刻", value: "during golden hour sunset", icon: "🌅" }, { label: "東京街頭", value: "on a busy Tokyo street", icon: "🗼" }, { label: "冰島苔原", value: "in a mossy Iceland landscape", icon: "🏔️" }, { label: "撒哈拉", value: "amidst Sahara sand dunes", icon: "🐪" }, { label: "切爾諾貝利", value: "inside Chernobyl zone", icon: "☢️" }]
};

// 3. 魅惑人像 (Glamour) - 柔粉白瓷
const DATA_GLAMOUR: ModeData = {
  id: 'glamour', title: '魅惑人像', desc: 'Glamour & Mood',
  theme: { 
    bg: 'bg-rose-50/30',
    bgGradient: 'from-rose-50/50 to-pink-50/50', 
    text: 'text-rose-900', 
    accent: 'border-rose-200', 
    card: 'bg-white border-rose-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]', 
    btn: 'bg-rose-50/50 text-rose-400 border-rose-100 hover:bg-white hover:shadow-sm', 
    btnActive: 'bg-rose-600 text-white shadow-lg shadow-rose-300/50 border-transparent', 
    visualizer: 'from-rose-400 to-rose-600',
    slider: 'accent-rose-600'
  },
  subjects: [{ label: "純欲寫真", value: "gravure idol with soft skin", icon: "👙" }, { label: "濕身襯衫", value: "model wearing wet white shirt", icon: "🚿" }, { label: "高冷秘書", value: "office lady in pencil skirt", icon: "👓" }, { label: "膠衣賽博", value: "model in tight latex bodysuit", icon: "🖤" }, { label: "蛇蠍美人", value: "femme fatale in evening gown", icon: "💋" }, { label: "絲綢睡袍", value: "woman in satin silk slip dress", icon: "👘" }, { label: "兔女郎", value: "girl in playboy bunny suit", icon: "👯" }, { label: "空服員", value: "flight attendant in uniform", icon: "✈️" }],
  scenarios: [{ label: "微醺甦醒", value: "waking up in a messy bed", icon: "🛌" }, { label: "剛出浴", value: "wrapped in a white towel", icon: "🧖‍♀️" }, { label: "派對落寞", value: "sitting on stairs after party", icon: "👠" }, { label: "辦公室曖昧", value: "sitting on the boss's desk", icon: "💼" }, { label: "深夜電話", value: "talking on phone late night", icon: "📞" }],
  actions: [{ label: "咬嘴唇", value: "biting her lip", icon: "👄" }, { label: "撥弄頭髮", value: "playing with her hair", icon: "💇‍♀️" }, { label: "雙腿交叉", value: "crossing legs elegantly", icon: "🦵" }, { label: "跪姿", value: "kneeling on the floor", icon: "🛐" }, { label: "躺在床上", value: "lying on her back", icon: "🛌" }, { label: "男友視角", value: "looking into the camera (pov)", icon: "👀" }, { label: "塗口紅", value: "applying red lipstick", icon: "💄" }],
  styles: [{ label: "Vogue風", value: "high fashion editorial style", icon: "📰" }, { label: "拍立得", value: "vintage polaroid aesthetic", icon: "🖼️" }, { label: "王家衛風", value: "Wong Kar-wai cinematic style", icon: "🕶️" }, { label: "柔焦人像", value: "soft focus dreamy style", icon: "✨" }, { label: "歐美IG風", value: "Instagram influencer filter", icon: "📱" }],
  envs: [{ label: "豪華飯店", value: "in a luxury hotel room", icon: "🏨" }, { label: "清晨臥室", value: "in a sunlit bedroom", icon: "🌅" }, { label: "深夜車內", value: "inside a car at night", icon: "🚗" }, { label: "廢棄泳池", value: "in an abandoned swimming pool", icon: "🏊" }, { label: "落地窗前", value: "by floor-to-ceiling window", icon: "🏙️" }, { label: "頂樓酒吧", value: "at a rooftop bar", icon: "🍸" }]
};

// 4. 迷因漫畫 (Meme) - 清新薄荷
const DATA_MEME: ModeData = {
  id: 'meme', title: '迷因漫畫', desc: 'Meme & Fun',
  theme: { 
    bg: 'bg-emerald-50/30',
    bgGradient: 'from-emerald-50/50 to-green-50/50', 
    text: 'text-emerald-800', 
    accent: 'border-emerald-200', 
    card: 'bg-white border-emerald-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]', 
    btn: 'bg-emerald-50/50 text-emerald-600 border-emerald-100 hover:bg-white hover:shadow-sm', 
    btnActive: 'bg-emerald-600 text-white shadow-lg shadow-emerald-300/50 border-transparent', 
    visualizer: 'from-emerald-400 to-emerald-600',
    slider: 'accent-emerald-600'
  },
  subjects: [{ label: "Wojak", value: "Wojak face", icon: "😐" }, { label: "Pepe蛙", value: "Pepe the Frog", icon: "🐸" }, { label: "GigaChad", value: "GigaChad", icon: "🗿" }, { label: "Doge柴犬", value: "Doge shiba inu", icon: "🐕" }, { label: "女人吼貓", value: "Woman Yelling at a Cat", icon: "😿" }, { label: "Stonks男", value: "Meme Man Stonks", icon: "📈" }, { label: "Among Us", value: "Among Us Crewmate", icon: "📮" }],
  scenarios: [{ label: "股票暴跌", value: "looking at crashing stock graph", icon: "📉" }, { label: "寫程式崩潰", value: "stressing over chaotic code", icon: "💻" }, { label: "強顏歡笑", value: "hiding the pain", icon: "🥲" }, { label: "房子失火", value: "sitting in a burning room", icon: "🔥" }, { label: "警察追捕", value: "running from the police", icon: "🚔" }],
  actions: [{ label: "崩潰尖叫", value: "screaming in agony", icon: "😱" }, { label: "互指", value: "pointing fingers at each other", icon: "👉" }, { label: "比讚", value: "giving a thumbs up", icon: "👍" }, { label: "翻桌", value: "flipping a table", icon: "┻━┻" }],
  styles: [{ label: "小畫家", value: "bad MS Paint art style", icon: "🎨" }, { label: "四格漫畫", value: "4-panel comic layout", icon: "🖼️" }, { label: "黑白日漫", value: "black and white manga style", icon: "✒️" }, { label: "深炸風格", value: "deep fried meme aesthetic", icon: "🍟" }, { label: "長輩圖", value: "boomer facebook meme style", icon: "🌷" }],
  envs: [{ label: "純白背景", value: "on a white background", icon: "⬜" }, { label: "綠幕", value: "on a green screen", icon: "🟩" }, { label: "著火房間", value: "in a room on fire", icon: "🔥" }, { label: "電腦桌前", value: "at a messy computer desk", icon: "🖥️" }]
};

const STATIC_QUALITY = "masterpiece, best quality, 8k, ultra-detailed";
const REAL_NEGATIVE = " --no cartoon, anime, illustration, painting, 3d render, plastic skin, text, watermark, bad anatomy, extra limbs";
const ANIME_NEGATIVE = " --no realistic photo, ugly, bad anatomy, text, watermark, logo, username, extra limbs";

const RATIO_OPTIONS = [
  { label: "1:1", value: "--ar 1:1", w: "w-5", h: "h-5" },
  { label: "16:9", value: "--ar 16:9", w: "w-7", h: "h-4" },
  { label: "9:16", value: "--ar 9:16", w: "w-4", h: "h-7" },
  { label: "3:2", value: "--ar 3:2", w: "w-6", h: "h-4" },
];

export default function App() {
  const [view, setView] = useState<'hub' | 'cyber' | 'real' | 'glamour' | 'meme'>('hub');
  
  // State
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedComposition, setSelectedComposition] = useState<string[]>([]);
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>([]);
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [selectedEnvs, setSelectedEnvs] = useState<string[]>([]);
  const [selectedCameras, setSelectedCameras] = useState<string[]>([]);
  
  const [ratio, setRatio] = useState("--ar 16:9");
  const [outputParts, setOutputParts] = useState<{type: string, text: string}[]>([]);
  
  // Expert State
  const [isExpertMode, setIsExpertMode] = useState(false);
  const [stylize, setStylize] = useState(100);
  const [chaos, setChaos] = useState(0);
  const [weird, setWeird] = useState(0);
  const [version, setVersion] = useState("--v 6.0");
  const [diceRotate, setDiceRotate] = useState(false);

  const initMode = (modeData: ModeData) => {
    setSelectedComposition([COMMON_COMPOSITION[0].value]);
    setSelectedSubjects([modeData.subjects[0].value]);
    setSelectedScenarios([]);
    setSelectedActions([]);
    setSelectedStyles([modeData.styles[0].value]);
    setSelectedEnvs([modeData.envs[0].value]);
    setSelectedCameras(modeData.cameras ? [modeData.cameras[0].value] : []);
    setStylize(100); setChaos(0); setWeird(0);
    setView(modeData.id as any);
    window.scrollTo(0,0);
  };

  const toggleSelection = (value: string, list: string[], setList: any, category: 'single' | 'multi') => {
    if (category === 'single') {
      setList([value]);
    } else {
      if (list.includes(value)) {
        setList(list.filter((i: string) => i !== value));
      } else {
        setList([...list, value]);
      }
    }
  };

  const randomize = (options: PromptItem[], setList: any, category: 'single' | 'multi') => {
    if (category === 'single') {
      const randomItem = options[Math.floor(Math.random() * options.length)];
      setList([randomItem.value]);
    } else {
       const count = Math.ceil(Math.random() * 2);
       const shuffled = [...options].sort(() => 0.5 - Math.random());
       setList(shuffled.slice(0, count).map(i => i.value));
    }
  };

  const handleGlobalRandom = (currentData: ModeData) => {
    setDiceRotate(true);
    setTimeout(() => setDiceRotate(false), 600);
    
    randomize(COMMON_COMPOSITION, setSelectedComposition, 'single');
    randomize(currentData.subjects, setSelectedSubjects, 'single');
    randomize(currentData.scenarios, setSelectedScenarios, 'single');
    randomize(currentData.actions, setSelectedActions, 'single');
    randomize(currentData.styles, setSelectedStyles, 'multi');
    randomize(currentData.envs, setSelectedEnvs, 'single');
    if (currentData.cameras) randomize(currentData.cameras, setSelectedCameras, 'multi');
    
    const randomRatio = RATIO_OPTIONS[Math.floor(Math.random() * RATIO_OPTIONS.length)].value;
    setRatio(randomRatio);

    if (isExpertMode) {
      setStylize(Math.floor(Math.random() * 500));
      setChaos(Math.floor(Math.random() * 30));
    }
  };

  const handleGenerate = () => {
    const composition = selectedComposition[0] || "";
    const rawSubject = selectedSubjects[0] || "";
    const scenarios = selectedScenarios.join(" and ");
    const actions = selectedActions.join(" and ");
    const styles = selectedStyles.join(", ");
    const env = selectedEnvs[0] || "";
    const cameras = selectedCameras.join(", ");

    const isMulti = composition && !composition.includes("solo") && !composition.includes("portrait");
    let subject = rawSubject;
    if (isMulti && !rawSubject.endsWith('s') && !rawSubject.includes("people")) {
         const words = rawSubject.split(" ");
         if (words.length > 0 && !words[0].endsWith('s')) {
             words[0] = words[0] + "s";
             subject = words.join(" ");
         }
    }

    const parts = [];
    parts.push({ type: 'subject', text: `${composition} ${subject}` });
    if (scenarios) parts.push({ type: 'action', text: scenarios });
    if (actions) parts.push({ type: 'action', text: actions });
    if (env) parts.push({ type: 'env', text: env });

    let styleText = styles;
    if (cameras) styleText += (styleText ? ", " : "") + cameras;
    styleText += (styleText ? ", " : "") + STATIC_QUALITY;
    parts.push({ type: 'style', text: styleText });

    if (isExpertMode) {
        if (stylize !== 100) parts.push({ type: 'param', text: `--stylize ${stylize}` });
        if (chaos > 0) parts.push({ type: 'param', text: `--chaos ${chaos}` });
        if (weird > 0) parts.push({ type: 'param', text: `--weird ${weird}` });
        parts.push({ type: 'param', text: version });
    }

    const neg = view === 'real' ? REAL_NEGATIVE : view === 'glamour' ? "" : ANIME_NEGATIVE;
    if (neg) parts.push({ type: 'negative', text: neg });

    parts.push({ type: 'ratio', text: ratio });
    setOutputParts(parts);
  };

  const getFullString = () => outputParts.map(p => p.text).join(", ");
  const getLabel = (val: string, options: PromptItem[]) => options.find(o => o.value === val)?.label || "";

  // 1. Hub Page
  if (view === 'hub') {
    return (
      <div className="relative w-full min-h-screen font-sans text-slate-700 bg-slate-50 overflow-x-hidden">
        {/* Fixed Background Layer */}
        <div className="fixed inset-0 w-full h-full -z-10 bg-white">
           <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-slate-100/50 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-gray-100/50 rounded-full blur-[100px]"></div>
        </div>

        <div className="w-full max-w-[1920px] mx-auto px-4 py-12 md:py-20 flex flex-col items-center">
          <h1 className="text-4xl md:text-7xl font-black italic mb-2 tracking-tighter text-center text-slate-800">V-PROMPT</h1>
          <p className="text-slate-400 text-[10px] md:text-xs tracking-[0.5em] mb-12 uppercase font-medium text-center">Platinum Lab // v23.0</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-[1600px]">
            {[DATA_CYBER, DATA_REAL, DATA_GLAMOUR, DATA_MEME].map((mode) => (
              <div key={mode.id} onClick={() => initMode(mode)} className={`group p-8 rounded-3xl border border-slate-100 bg-white hover:border-slate-300 cursor-pointer transition-all hover:-translate-y-1 shadow-[0_4px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] flex flex-col justify-between min-h-[240px]`}>
                <div>
                  <h2 className={`text-2xl font-bold mb-3 ${mode.theme.text}`}>{mode.title}</h2>
                  <p className="text-slate-500 text-sm leading-relaxed">{mode.desc}</p>
                </div>
                <div className="mt-4 text-right">
                  <span className="text-2xl opacity-30 group-hover:opacity-100 transition-opacity text-slate-800">➔</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const currentData = view === 'real' ? DATA_REAL : view === 'glamour' ? DATA_GLAMOUR : view === 'meme' ? DATA_MEME : DATA_CYBER;
  const theme = currentData.theme;

  const LivePreview = () => (
    <div className={`mb-6 p-4 rounded-2xl border border-slate-200 bg-white/70 backdrop-blur-md flex flex-wrap gap-2 items-center text-xs md:text-sm font-medium text-slate-600 w-full shadow-sm`}>
       <span className="text-[10px] uppercase text-slate-400 tracking-widest mr-2">PREVIEW:</span>
       {selectedComposition[0] && <span className="px-2 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700">{getLabel(selectedComposition[0], COMMON_COMPOSITION)}</span>}
       <span className="text-slate-300">+</span>
       {selectedSubjects[0] && <span className="px-2 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700">{getLabel(selectedSubjects[0], currentData.subjects)}</span>}
       <span className="text-slate-300">+</span>
       {selectedScenarios[0] && <span className="px-2 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700">{getLabel(selectedScenarios[0], currentData.scenarios)}</span>}
    </div>
  );

  return (
    // Root container for App Mode
    <div className="relative w-full min-h-screen font-sans text-slate-700 overflow-x-hidden bg-white">
      
      {/* Fixed Background Layer */}
      <div className={`fixed inset-0 w-full h-full -z-10 bg-gradient-to-br ${theme.bgGradient} opacity-50`}></div>

      {/* Scrollable Content Layer */}
      <div className="w-full max-w-[1920px] mx-auto px-4 py-8 md:px-8 md:py-12 flex flex-col">
        
        {/* Header */}
        <header className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-6 p-5 rounded-3xl border border-white/60 bg-white/40 shadow-sm gap-4 w-full backdrop-blur-xl`}>
          <div><h1 className={`text-2xl font-bold italic ${theme.text}`}>{currentData.title}</h1></div>
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
             <div className="flex items-center gap-2 bg-white/60 p-1.5 rounded-xl border border-white shadow-inner">
                <span className="text-[10px] font-bold px-2 text-slate-400">EXPERT</span>
                <button onClick={() => setIsExpertMode(!isExpertMode)} className={`w-9 h-5 rounded-full transition-colors relative ${isExpertMode ? 'bg-slate-800' : 'bg-slate-300'}`}>
                  <div className={`w-3 h-3 bg-white rounded-full absolute top-1 transition-all shadow-sm ${isExpertMode ? 'left-5' : 'left-1'}`}></div>
                </button>
             </div>
             <button onClick={() => setView('hub')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all bg-white hover:bg-slate-50 border border-slate-200 shadow-sm text-slate-600`}>ESC</button>
          </div>
        </header>

        <LivePreview />

        {/* Responsive Grid System */}
        <Section title="1. 人物類型" theme={theme} onRandom={() => randomize(currentData.subjects, setSelectedSubjects, 'single')}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 w-full">
            {currentData.subjects.map(item => (
              <SolidBtn key={item.value} label={item.label} icon={item.icon} active={selectedSubjects.includes(item.value)} onClick={() => toggleSelection(item.value, selectedSubjects, setSelectedSubjects, 'single')} theme={theme} />
            ))}
          </div>
        </Section>

        <Section title="2. 情境故事" theme={theme} onRandom={() => randomize(currentData.scenarios, setSelectedScenarios, 'single')}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
            {currentData.scenarios.map(item => (
              <SolidBtn key={item.value} label={item.label} icon={item.icon} active={selectedScenarios.includes(item.value)} onClick={() => toggleSelection(item.value, selectedScenarios, setSelectedScenarios, 'single')} theme={theme} isWide={true} />
            ))}
          </div>
        </Section>

        <Section title="3. 動作補充" theme={theme} onRandom={() => randomize(currentData.actions, setSelectedActions, 'single')}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 w-full">
            {currentData.actions.map(item => (
              <SolidBtn key={item.value} label={item.label} icon={item.icon} active={selectedActions.includes(item.value)} onClick={() => toggleSelection(item.value, selectedActions, setSelectedActions, 'single')} theme={theme} />
            ))}
          </div>
        </Section>

        <Section title="4. 視覺風格" theme={theme} onRandom={() => randomize(currentData.styles, setSelectedStyles, 'multi')}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 w-full">
            {currentData.styles.map(item => (
              <SolidBtn key={item.value} label={item.label} icon={item.icon} active={selectedStyles.includes(item.value)} onClick={() => toggleSelection(item.value, selectedStyles, setSelectedStyles, 'multi')} theme={theme} />
            ))}
          </div>
        </Section>

        <Section title="5. 構圖與人數" theme={theme} onRandom={() => randomize(COMMON_COMPOSITION, setSelectedComposition, 'single')}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 w-full">
            {COMMON_COMPOSITION.map(item => (
              <SolidBtn key={item.value} label={item.label} icon={item.icon} active={selectedComposition.includes(item.value)} onClick={() => toggleSelection(item.value, selectedComposition, setSelectedComposition, 'single')} theme={theme} isWide={true} />
            ))}
          </div>
        </Section>

        {currentData.cameras && (
          <Section title="6. 攝影器材" theme={theme} onRandom={() => randomize(currentData.cameras!, setSelectedCameras, 'multi')}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-full">
              {currentData.cameras.map((item) => (
                <SolidBtn key={item.value} label={item.label} icon={item.icon} active={selectedCameras.includes(item.value)} onClick={() => toggleSelection(item.value, selectedCameras, setSelectedCameras, 'multi')} theme={theme} />
              ))}
            </div>
          </Section>
        )}

        <Section title="7. 環境氛圍" theme={theme} onRandom={() => randomize(currentData.envs, setSelectedEnvs, 'single')}>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 w-full">
            {currentData.envs.map(item => (
              <SolidBtn key={item.value} label={item.label} icon={item.icon} active={selectedEnvs.includes(item.value)} onClick={() => toggleSelection(item.value, selectedEnvs, setSelectedEnvs, 'single')} theme={theme} />
            ))}
          </div>
        </Section>

        {isExpertMode && (
          <div className={`mb-6 p-6 rounded-3xl border border-slate-200 bg-white/70 backdrop-blur-md w-full shadow-sm`}>
            <div className="flex justify-between items-center mb-6">
                <h3 className={`text-xs font-bold uppercase tracking-widest flex items-center gap-3 ${theme.text}`}><span className="text-lg">🎛️</span> 專家參數控制</h3>
                <div className="flex gap-2">
                    {["--v 6.0", "--v 5.2", "--niji 6"].map(v => (
                        <button key={v} onClick={() => setVersion(v)} className={`px-2 py-1 rounded text-[10px] font-mono border ${version === v ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400'}`}>{v}</button>
                    ))}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-400"><span>風格化 (--s)</span><span className={theme.text}>{stylize}</span></div>
                <input type="range" min="0" max="1000" value={stylize} onChange={e => setStylize(Number(e.target.value))} className={`w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer ${theme.slider}`} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-400"><span>多樣性 (--c)</span><span className={theme.text}>{chaos}</span></div>
                <input type="range" min="0" max="100" value={chaos} onChange={e => setChaos(Number(e.target.value))} className={`w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer ${theme.slider}`} />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-400"><span>怪異度 (--w)</span><span className={theme.text}>{weird}</span></div>
                <input type="range" min="0" max="3000" value={weird} onChange={e => setWeird(Number(e.target.value))} className={`w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer ${theme.slider}`} />
              </div>
            </div>
          </div>
        )}

        <div className={`mb-6 p-6 rounded-3xl border border-slate-200 bg-white/70 shadow-lg backdrop-blur-md w-full`}>
          <div className="flex flex-col md:flex-row gap-6 items-center w-full">
            <div className="flex-1 w-full">
              <h3 className={`text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-3 ${theme.text}`}><span className={`w-2 h-2 rounded-full bg-current`}></span>8. 畫面比例</h3>
              <div className="flex flex-wrap gap-3">
                {RATIO_OPTIONS.map(r => (
                  <button key={r.value} onClick={() => setRatio(r.value)} className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all border ${ratio === r.value ? 'bg-slate-800 text-white border-slate-800 shadow-md' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'} min-w-[60px]`}>
                    <div className={`border-2 ${r.w} ${r.h} ${ratio === r.value ? 'bg-white border-transparent' : 'border-slate-300'} rounded-[2px] opacity-80`}></div>
                    <span className="text-[10px] font-bold mt-1">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center gap-2">
               <h3 className={`text-[10px] font-bold uppercase tracking-widest ${theme.text} opacity-80`}>9. 全域隨機</h3>
               <button onClick={() => handleGlobalRandom(currentData)} className={`w-14 h-14 rounded-2xl bg-white border border-slate-200 text-slate-800 flex items-center justify-center transition-all hover:scale-105 shadow-md hover:shadow-xl ${diceRotate ? 'rotate-[360deg] scale-90' : ''}`}><span className="text-2xl">🎲</span></button>
            </div>
            <button onClick={handleGenerate} className={`flex-1 w-full py-4 rounded-xl font-bold text-xl tracking-[0.2em] shadow-xl transition-all transform active:scale-[0.99] ${theme.btnActive}`}>GENERATE</button>
          </div>
        </div>
        
        {outputParts.length > 0 && (
          <div className={`p-6 rounded-2xl border border-slate-200 bg-white/90 shadow-xl animate-in slide-in-from-bottom-2 relative group w-full`}>
            <div className="font-mono text-xs md:text-sm leading-relaxed break-all text-slate-600">
                {outputParts.map((part, index) => (
                    <span key={index} className={`${part.type === 'subject' ? 'text-emerald-600 font-bold' : part.type === 'action' ? 'text-amber-600' : part.type === 'env' ? 'text-blue-600' : part.type === 'style' ? 'text-purple-600 italic' : part.type === 'param' ? 'text-rose-600' : part.type === 'negative' ? 'text-red-400 opacity-70' : 'text-slate-400'}`}>{part.text}{index < outputParts.length - 1 ? ", " : ""}</span>
                ))}
            </div>
            <div className="absolute top-4 right-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <button onClick={() => {navigator.clipboard.writeText(getFullString()); alert('Copied!');}} className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-3 py-1.5 rounded text-xs border border-slate-200 shadow-sm">Copy</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ title, theme, children, onRandom }: any) {
  return (
    <div className={`mb-6 p-5 rounded-3xl border border-slate-200 bg-white/60 shadow-sm relative group w-full backdrop-blur-sm`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-xs font-bold uppercase flex items-center gap-2 ${theme.text}`}><span className={`w-1.5 h-1.5 rounded-full bg-current`}></span>{title}</h3>
        <button onClick={onRandom} className={`p-1.5 rounded bg-white hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all shadow-sm border border-slate-100`} title="隨機"><span className="text-xs">🎲</span></button>
      </div>
      {children}
    </div>
  );
}

function SolidBtn({ label, icon, active, onClick, theme, isWide }: any) {
  return (
    <button onClick={onClick} className={`py-3 px-3 rounded-2xl text-[10px] md:text-xs font-bold transition-all duration-200 text-center border ${active ? theme.btnActive : `${theme.btn} border-slate-200 shadow-sm`} ${isWide ? 'text-xs' : 'truncate'} flex items-center justify-center gap-2 w-full`}>
      {icon && <span className="text-sm md:text-base opacity-80">{icon}</span>}
      <span className="truncate">{label}</span>
    </button>
  );
}