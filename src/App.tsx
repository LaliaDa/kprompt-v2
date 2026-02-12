import { useState } from 'react';

// ==========================================
// 數據模組 (18-38M 優化版)
// ==========================================
const PROMPT_DATA = {
  subjects: [
    { label: "賽博駭客 (Cyberpunk)", value: "1girl, cyberpunk hacker, neon glowing tattoos, tactical techwear, futuristic visor, holographic interface, detailed face" },
    { label: "JDM 改裝車 (Street Racer)", value: "Nissan GTR R34, wide body kit, drifting in Tokyo Shinjuku at night, underglow neon, heavy rain, realistic reflections" },
    { label: "未來機甲 (Heavy Mecha)", value: "giant mechanical robot, heavy armor, battle worn, intricate hydraulics, glowing energy core, cinematic scale" },
    { label: "韓系高冷 (K-Style)", value: "1girl, k-pop idol style, trendy street fashion, silver hair, charismatic gaze, soft studio lighting, high fashion photography" },
    { label: "末日生存 (Wasteland)", value: "post-apocalyptic survivor, tactical gear, holding rifle, overgrown urban ruins background, cinematic atmosphere, moody lighting" },
    { label: "吉卜力風 (Studio Ghibli)", value: "studio ghibli style, beautiful landscape, whimsical atmosphere, hand-drawn texture, vibrant colors, Joe Hisaishi vibe" }
  ],
  styles: [
    { label: "虛幻引擎 5 (UE5 Render)", value: "Unreal Engine 5 render, 8k resolution, ray tracing, lumen lighting, hyper-realistic, highly detailed texture" },
    { label: "90年代動漫 (90s Retro)", value: "1990s vintage anime style, cel shaded, lo-fi aesthetic, muted colors, nostalgic vibe" },
    { label: "柯達底片 (Kodak 400)", value: "shot on Kodak Portra 400, film grain, analog photography, warm tones, authentic skin texture" },
    { label: "合成波 (Synthwave)", value: "synthwave aesthetic, retrowave neon, purple and pink color palette, digital sun, 80s futuristic" }
  ],
  environments: [
    { label: "雨夜霓虹 (Neon Rain)", value: "heavy rain at night, neon signs reflecting on wet asphalt, cinematic lighting, blade runner vibe" },
    { label: "黃金時刻 (Golden Hour)", value: "warm sunset lighting, lens flare, soft backlighting, dreamy atmosphere, glowing dust" },
    { label: "電競空間 (Gaming Setup)", value: "dark gaming room, RGB led strips, multiple monitors, cozy tech atmosphere, futuristic vibe" }
  ]
};

// 全域修飾詞：確保產出的基礎品質
const GLOBAL_SUFFIX = ", masterpiece, best quality, ultra-detailed, 8k, sharp focus, --ar 2:3 --v 6.0";

export default function App() {
  const [subject, setSubject] = useState(PROMPT_DATA.subjects[0].value);
  const [style, setStyle] = useState(PROMPT_DATA.styles[0].value);
  const [env, setEnv] = useState(PROMPT_DATA.environments[0].value);
  const [output, setOutput] = useState("");

  const handleGenerate = () => {
    // 執行字串拼接協議
    const result = `${subject}, ${style}, ${env}${GLOBAL_SUFFIX}`;
    setOutput(result);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    alert("COMMAND COPIED TO CLIPBOARD");
  };

  return (
    <div className="min-h-screen w-full bg-black text-zinc-100 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-zinc-900/50 border border-zinc-800 rounded-3xl p-8 shadow-[0_0_50px_rgba(59,130,246,0.1)] backdrop-blur-xl">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-black tracking-tighter text-blue-500 italic">V-PROMPT</h1>
          <div className="flex justify-between items-center mt-1">
            <span className="text-zinc-600 text-[10px] uppercase tracking-[0.3em] font-mono">Terminal v2.0 // Node_Active</span>
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
          </div>
        </header>

        {/* Control Interface */}
        <div className="space-y-6">
          <section className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Subject_Selection</label>
            <select 
              className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer appearance-none"
              onChange={e => setSubject(e.target.value)}
            >
              {PROMPT_DATA.subjects.map(item => <option key={item.label} value={item.value}>{item.label}</option>)}
            </select>
          </section>

          <section className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Visual_Engine</label>
            <select 
              className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer appearance-none"
              onChange={e => setStyle(e.target.value)}
            >
              {PROMPT_DATA.styles.map(item => <option key={item.label} value={item.value}>{item.label}</option>)}
            </select>
          </section>

          <section className="space-y-2">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Env_Matrix</label>
            <select 
              className="w-full bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer appearance-none"
              onChange={e => setEnv(e.target.value)}
            >
              {PROMPT_DATA.environments.map(item => <option key={item.label} value={item.value}>{item.label}</option>)}
            </select>
          </section>

          <button 
            onClick={handleGenerate}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl transition-all active:scale-[0.98] shadow-lg shadow-blue-900/30 text-xs tracking-[0.3em] mt-4"
          >
            EXECUTE GENERATION
          </button>
        </div>

        {/* Output Terminal */}
        {output && (
          <div className="mt-10 p-5 bg-zinc-950 border border-zinc-800 rounded-2xl border-l-4 border-l-blue-600 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[9px] text-zinc-600 font-mono tracking-tighter uppercase">Prompt_Stream_Output</span>
              <button 
                onClick={handleCopy}
                className="text-[10px] bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white px-3 py-1 rounded-full font-bold transition-all"
              >
                COPY
              </button>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono break-all leading-relaxed select-all">
              {output}
            </p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <footer className="mt-12 text-zinc-800 text-[10px] font-mono tracking-widest uppercase">
        System_Identity: kprompt-generator-v2 // No_Logs_Kept
      </footer>
    </div>
  );
}