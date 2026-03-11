import React, { useRef, useState } from 'react';
import { 
  Camera, 
  Mic, 
  Keyboard, 
  LayoutDashboard, 
  Smartphone,
  Utensils, 
  Target, 
  CheckCircle2, 
  ArrowRight,
  Droplets,
  Zap,
  BrainCircuit,
  Database,
  Play,
  QrCode,
  X
} from 'lucide-react';
import { motion } from 'motion/react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Section = ({ children, className = "", id }: SectionProps) => (
  <section id={id} className={`py-24 px-6 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => (
  <div className={`bg-white border border-stone-100 shadow-sm rounded-2xl p-6 ${className}`}>
    {children}
  </div>
);

const Placeholder = ({ label, height = "aspect-[9/16]", type = "image" }: { label: string, height?: string, type?: 'image' | 'video' }) => (
  <div className={`${height} w-full bg-stone-100 border-2 border-dashed border-stone-200 rounded-2xl flex flex-col items-center justify-center text-stone-400 gap-2 overflow-hidden relative p-4 text-center`}>
    {type === 'video' ? <Zap className="w-8 h-8 opacity-20" /> : <Camera className="w-8 h-8 opacity-20" />}
    <span className="text-xs font-medium leading-tight">{label}</span>
    <div className="absolute inset-0 bg-linear-to-br from-transparent to-stone-200/50 pointer-events-none" />
  </div>
);

const VideoPlayer = ({ src, className = "", objectPosition = "50% 63%" }: { src: string, className?: string, objectPosition?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handleToggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div className={`relative cursor-pointer group ${className}`} onClick={handleToggle}>
      <video
        ref={videoRef}
        src={src}
        playsInline
        onEnded={() => setPlaying(false)}
        className="w-full h-full object-cover rounded-2xl" style={{ objectPosition }}
      />
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/20 transition-opacity">
          <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
            <Play className="w-6 h-6 text-stone-900 ml-0.5" fill="currentColor" />
          </div>
        </div>
      )}
    </div>
  );
};

const FlowNode = ({ label, icon: Icon, subLabel, variant = "default" }: { label: string, icon?: any, subLabel?: string, variant?: "default" | "primary" | "accent" }) => (
  <div className="flex flex-col items-center relative z-10">
    <div className={`
      px-5 py-3 rounded-2xl shadow-sm flex items-center gap-3 min-w-[160px] justify-center border transition-all
      ${variant === 'primary' ? 'bg-stone-900 text-white border-stone-900' : 
        variant === 'accent' ? 'bg-white border-stone-900 text-stone-900' : 
        'bg-white border-stone-200 text-stone-900'}
    `}>
      {Icon && <Icon className={`w-4 h-4 ${variant === 'primary' ? 'text-stone-400' : 'text-stone-500'}`} />}
      <span className="text-base font-bold tracking-tight">{label}</span>
    </div>
    {subLabel && <span className="text-xs text-stone-400 mt-2 font-bold uppercase tracking-widest">{subLabel}</span>}
  </div>
);

const FlowArrow = ({ direction = "down", length = "h-12" }: { direction?: "down" | "right", length?: string }) => (
  <div className={`flex items-center justify-center ${direction === 'down' ? `${length} w-full` : 'w-12 h-full'}`}>
    {direction === 'down' ? (
      <svg className="w-2 h-full" viewBox="0 0 8 48" preserveAspectRatio="none">
        <line x1="4" y1="0" x2="4" y2="42" stroke="#a8a29e" strokeWidth="2" />
        <polygon points="0,42 8,42 4,48" fill="#a8a29e" />
      </svg>
    ) : (
      <svg className="h-2 w-full" viewBox="0 0 48 8" preserveAspectRatio="none">
        <line x1="0" y1="4" x2="42" y2="4" stroke="#a8a29e" strokeWidth="2" />
        <polygon points="42,0 42,8 48,4" fill="#a8a29e" />
      </svg>
    )}
  </div>
);

const QrCodeButton = () => {
  const [showQr, setShowQr] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowQr(true)}
        className="w-14 h-14 bg-white border border-stone-200 rounded-full flex items-center justify-center hover:bg-stone-50 transition-colors shadow-sm"
        title="扫码打开"
      >
        <QrCode className="w-6 h-6 text-stone-700" />
      </button>

      {showQr && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowQr(false)}>
          <div className="bg-white rounded-3xl p-8 shadow-2xl relative max-w-xs w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowQr(false)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-900 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-bold text-lg text-center mb-2">扫码体验 Milo</h3>
            <p className="text-stone-500 text-sm text-center mb-6">用手机扫描二维码，立即开始</p>
            <div className="aspect-square w-48 mx-auto bg-stone-100 rounded-2xl flex items-center justify-center">
              <img src="/images/qrcode.png" alt="QR Code" className="w-full h-full object-contain rounded-2xl" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const sections = [
  { id: "hero", label: "介绍" },
  { id: "users", label: "用户" },
  { id: "plan", label: "计划" },
  { id: "record", label: "记录" },
  { id: "dashboard", label: "仪表盘" },
  { id: "data", label: "数据" },
  { id: "arch", label: "架构" },
];

const FloatingNav = () => {
  const [active, setActive] = useState("hero");

  React.useEffect(() => {
    const handleScroll = () => {
      const offsets = sections.map(s => {
        const el = document.getElementById(s.id);
        return { id: s.id, top: el ? el.getBoundingClientRect().top : Infinity };
      });
      const current = offsets.reduce((prev, curr) =>
        Math.abs(curr.top) < Math.abs(prev.top) ? curr : prev
      );
      setActive(current.id);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-1">
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })}
          className="group flex items-center gap-2 py-1.5"
        >
          <span className={`text-xs font-medium transition-all opacity-0 group-hover:opacity-100 ${active === s.id ? "!opacity-100 text-stone-900" : "text-stone-400"}`}>
            {s.label}
          </span>
          <div className={`rounded-full transition-all ${active === s.id ? "w-6 h-2 bg-stone-900" : "w-2 h-2 bg-stone-300 group-hover:bg-stone-500"}`} />
        </button>
      ))}
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen font-sans selection:bg-stone-900 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-stone-50/80 backdrop-blur-md border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Milo" className="w-8 h-8 rounded-lg" />
            <span className="font-serif font-bold text-xl tracking-tight">Milo</span>
          </div>
          <a href="https://milo-one-lyart.vercel.app" target="_blank" rel="noopener noreferrer" className="bg-stone-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-stone-800 transition-colors">
            立即体验
          </a>
        </div>
      </nav>

      <FloatingNav />

      {/* Hero Section: Intro + Highlights + Video Demo */}
      <Section className="pt-32 pb-20" id="hero">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7 pt-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="serif-title text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                Milo — 你的私人AI营养师
              </h1>
              <p className="text-stone-500 text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
                一款 AI 驱动的个性化饮食助手。让”吃什么、吃多少”的决策和记录，变得像发一条消息一样简单。
              </p>
              
              <div className="space-y-8 mb-12">
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center">
                    <BrainCircuit className="text-stone-900 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">基于真实生活惯例，而非模板</h3>
                    <p className="text-stone-400 text-sm leading-relaxed">多轮对话采集 8 类生活惯例，确保推荐的食物是你真的能吃到的。</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center">
                    <Mic className="text-stone-900 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">多模态输入，记录门槛趋近于零</h3>
                    <p className="text-stone-400 text-sm leading-relaxed">语音、拍照、文字混合使用，AI 自动识别匹配营养数据。</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 bg-stone-100 rounded-2xl flex items-center justify-center">
                    <Zap className="text-stone-900 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">从计划到记录的完整闭环</h3>
                    <p className="text-stone-400 text-sm leading-relaxed">AI 生成计划 → 保存为 Meal Plan → 一键应用到记录。</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-3">
                  <a 
                    href="https://milo-one-lyart.vercel.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-stone-900 text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-stone-800 transition-all flex items-center gap-2 shadow-lg shadow-stone-900/10"
                  >
                    开始使用产品 <ArrowRight className="w-5 h-5" />
                  </a>
                  <QrCodeButton />
                </div>
                <div className="flex items-center gap-2 text-stone-500 text-sm pl-1">
                  <Smartphone className="w-4 h-4 flex-shrink-0" />
                  <span>支持 PWA，浏览器打开网址 → 分享 → 添加到主屏幕</span>
                </div>
              </div>
            </motion.div>
          </div>
          <div className="lg:col-span-5 pt-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="max-w-[260px] mx-auto lg:ml-auto"
            >
              <video src="/images/demo-0.mp4" autoPlay loop muted playsInline className="w-full aspect-[9/18] object-cover rounded-2xl shadow-lg" style={{ objectPosition: '50% 70%' }} />
            </motion.div>
          </div>
        </div>
      </Section>

      {/* Target Users */}
      <Section className="bg-stone-100/50 rounded-[3rem] mb-12" id="users">
        <div className="text-center mb-12">
          <h2 className="serif-title text-3xl md:text-4xl font-bold mb-3">目标用户</h2>
          <p className="text-stone-500 text-lg">解决你饮食管理中的真实痛点</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { group: "减脂/增肌人群", pain: "饮食方案千篇一律", solution: "基于个人习惯生成专属计划" },
            { group: "记录困难户", pain: "手动搜索、输数字太耗时", solution: "语音/拍照/文字，说完即记" },
            { group: "健康关注者", pain: "看不懂复杂的营养数字", solution: "仪表盘可视化四大营养素缺口" },
            { group: "肠胃敏感用户", pain: "不知道哪类食物对自己友好", solution: "Onboarding 收集症状，生成建议" },
          ].map((item, i) => (
            <div key={i}>
              <Card className="flex flex-col h-full">
                <div className="mb-4 p-2 w-fit bg-stone-100 rounded-lg">
                  <Target className="w-6 h-6 text-stone-900" />
                </div>
                <h3 className="font-bold text-xl mb-2">{item.group}</h3>
                <p className="text-stone-400 text-base mb-4">痛点：{item.pain}</p>
                <div className="mt-auto pt-4 border-t border-stone-50">
                  <p className="text-stone-900 text-base font-medium flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item.solution}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Section>

      {/* 1 | Personalized Diet Plan Design */}
      <Section id="plan">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-7">
            <h2 className="serif-title text-3xl md:text-4xl font-bold mb-6">1｜个性化饮食计划设计</h2>
            <p className="text-stone-500 text-lg mb-12">完整闭环：收集信息 → 理解惯例 → 生成建议 → 一键记录</p>
            
            <div className="space-y-12">
              <div className="relative pl-8 border-l border-stone-200">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-protein" />
                <h4 className="font-bold text-lg mb-2">Step 1: Onboarding 基础信息采集</h4>
                <p className="text-stone-500 text-lg leading-relaxed">
                  收集身高体重、目标（减脂/增肌/维持）、饮食偏好、运动频率等。系统自动计算 BMR 和每日宏量营养素目标，全程约 1 分钟。
                </p>
              </div>
              
              <div className="relative pl-8 border-l border-stone-200">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-carbs" />
                <h4 className="font-bold text-lg mb-2">Step 2: AI 智能对话 — 自动匹配你的阶段</h4>
                <p className="text-stone-500 text-base leading-relaxed mb-5">
                  AI 会根据你是否已有饮食记录，自动选择最合适的路径：
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="px-2 py-0.5 rounded-md bg-stone-900 text-white text-xs font-bold">A</div>
                      <h5 className="font-bold text-base">首次使用 · 无记录</h5>
                    </div>
                    <p className="text-stone-500 text-sm leading-relaxed mb-4">AI 像真正的营养师一样，主动逐一采集 8 类生活惯例：</p>
                    <div className="space-y-2 text-sm">
                      {[
                        "三餐内容与时间",
                        "加餐/零食习惯",
                        "睡眠时间与质量",
                        "饮水量",
                        "运动类型/频率",
                        "压力与情绪性进食",
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-stone-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-carbs flex-shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-stone-400 text-xs mt-4">收集完毕后进入建议阶段，确保计划基于真实生活。</p>
                  </div>

                  <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="px-2 py-0.5 rounded-md bg-stone-900 text-white text-xs font-bold">B</div>
                      <h5 className="font-bold text-base">已有记录 · 跳过采集</h5>
                    </div>
                    <p className="text-stone-500 text-sm leading-relaxed mb-4">跳过信息收集，根据请求自动切换两种模式：</p>
                    <div className="space-y-4">
                      <div className="p-3 bg-stone-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-1.5">
                          <Utensils className="w-4 h-4 text-stone-700" />
                          <span className="font-bold text-sm">单餐推荐</span>
                        </div>
                        <p className="text-stone-500 text-xs leading-relaxed">"推荐晚餐" → 计算今日剩余配额 → 推荐该餐 → 一键记录到今天</p>
                      </div>
                      <div className="p-3 bg-stone-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-1.5">
                          <LayoutDashboard className="w-4 h-4 text-stone-700" />
                          <span className="font-bold text-sm">全天计划</span>
                        </div>
                        <p className="text-stone-500 text-xs leading-relaxed">"帮我做个饮食计划" → 分析已有记录 → 生成完整一日计划 → 可保存为 Meal Plan</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative pl-8 border-l border-stone-200">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-veggie" />
                <h4 className="font-bold text-lg mb-2">Step 3: AI 建议 + 生成结构化计划</h4>
                <p className="text-stone-500 text-lg leading-relaxed">
                  AI 生成包含食物名称、分量、热量、宏量数据的完整一日计划。支持对话式调整：“我不喜欢吃鸡胸肉”、“我对乳糖过敏”，AI 会针对性替换食材。
                </p>
                <div className="flex gap-3 mt-4">
                  <div className="px-3 py-1 rounded-full bg-protein/10 text-protein text-xs font-bold">蛋白质 Protein</div>
                  <div className="px-3 py-1 rounded-full bg-carbs/10 text-carbs text-xs font-bold">碳水 Carbs</div>
                  <div className="px-3 py-1 rounded-full bg-fat/10 text-fat text-xs font-bold">脂肪 Fat</div>
                  <div className="px-3 py-1 rounded-full bg-veggie/10 text-veggie text-xs font-bold">蔬菜 Veggie</div>
                </div>
              </div>

              <div className="relative pl-8 border-l border-stone-200">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-fat" />
                <h4 className="font-bold text-lg mb-2">Step 4: 保存 Meal Plan，随时一键应用</h4>
                <p className="text-stone-500 text-sm leading-relaxed">
                  生成的计划可保存入计划库（如“增肌高蛋白日”、“外卖懒人版”）。进入记录页时，点击计划即可一键填入当日所有餐次。
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-5 pt-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <VideoPlayer src="/images/sec1-s1.mp4" className="aspect-[9/18] shadow-sm" objectPosition="50% 55%" />
                <p className="text-stone-500 text-sm mt-2 text-center">Step1：Onboarding 基础信息采集</p>
              </div>
              <div>
                <VideoPlayer src="/images/sec1-s2.mp4" className="aspect-[9/18] shadow-sm" />
                <p className="text-stone-500 text-sm mt-2 text-center">Step2：AI 智能对话匹配阶段</p>
              </div>
              <div>
                <VideoPlayer src="/images/sec1-s3.mp4" className="aspect-[9/18] shadow-sm" />
                <p className="text-stone-500 text-sm mt-2 text-center">Step3：AI 建议 + 生成结构化计划</p>
              </div>
              <div>
                <VideoPlayer src="/images/sec1-s4.mp4" className="aspect-[9/18] shadow-sm" />
                <p className="text-stone-500 text-sm mt-2 text-center">Step4：保存 Meal Plan 一键应用</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 2 | Multimodal Recording */}
      <Section className="bg-stone-100/50 rounded-[3rem] mb-12" id="record">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-7">
            <h2 className="serif-title text-3xl md:text-4xl font-bold mb-6">2｜饮食记录 — 多模态输入</h2>
            <p className="text-stone-500 text-lg mb-12">记录一餐支持三种方式，可混合使用。底层统一走 AI 解析。</p>
            
            <div className="space-y-4">
              {[
                { icon: Camera, title: "拍照识别", desc: "拍一张餐食照片，AI 自动识别食物并估算营养数据，识别结果可直接确认或手动调整。", color: "text-fat", bg: "bg-fat/5" },
                { icon: Mic, title: "语音输入", desc: "支持按住说话或持续监听，内容自动转成文字发给 AI 解析并完成记录。", color: "text-protein", bg: "bg-protein/5" },
                { icon: Keyboard, title: "文字输入", desc: "自由描述：“刚吃了一碗大碗宽面加两个煎蛋”，AI 理解语义后自动解析。", color: "text-veggie", bg: "bg-veggie/5" }
              ].map((feature, idx) => (
                <div key={idx} className="group flex items-start gap-6 p-6 bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-md hover:border-stone-200 transition-all">
                  <div className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-stone-900 group-hover:text-white transition-colors`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-1.5 tracking-tight">{feature.title}</h3>
                    <p className="text-stone-500 text-lg leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <VideoPlayer src="/images/sec2-image.mp4" className="aspect-[9/18] shadow-sm" />
                <p className="text-stone-500 text-sm mt-2 text-center">图片识别食物</p>
              </div>
              <div>
                <VideoPlayer src="/images/sec2-text.mp4" className="aspect-[9/18] shadow-sm" />
                <p className="text-stone-500 text-sm mt-2 text-center">文字输入食物</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 3 | Nutrition Dashboard */}
      <Section className="bg-stone-900 text-white rounded-[3rem] overflow-hidden mb-12" id="dashboard">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="w-full max-w-[240px]">
              <img src="/images/record-dashboard.png" alt="Record 页：环形图 + 热量进度 + 饮水" className="w-full rounded-2xl shadow-lg" />
            </div>
          </div>
          <div className="lg:col-span-7 order-1 lg:order-2">
            <h2 className="serif-title text-3xl md:text-4xl font-bold mb-6">3｜记录页面 — 营养仪表盘</h2>
            <p className="text-stone-400 text-lg mb-10">
              可视化当日饮食全貌，一眼看懂缺什么、超了什么。
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-protein" />
                <span className="font-medium text-protein">蛋白质 Protein</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-carbs" />
                <span className="font-medium text-carbs">碳水 Carbs</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-fat" />
                <span className="font-medium text-fat">脂肪 Fat</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-veggie" />
                <span className="font-medium text-veggie">蔬菜 Veggie</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <LayoutDashboard className="w-6 h-6 text-protein" />
                <div>
                  <h4 className="font-bold mb-1">营养环形图</h4>
                  <p className="text-stone-400 text-sm">四个核心指标各对应一个进度环，实时显示”已摄入 / 目标”。</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Droplets className="w-6 h-6 text-veggie" />
                <div>
                  <h4 className="font-bold mb-1">热量进度 & 饮水追踪</h4>
                  <p className="text-stone-400 text-sm">大字显示当日已摄入热量，饮水量进度条距离目标一目了然。</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Utensils className="w-6 h-6 text-carbs" />
                <div>
                  <h4 className="font-bold mb-1">餐次列表与跨日查看</h4>
                  <p className="text-stone-400 text-sm">支持左滑删除、点击编辑，顶部日期栏可快速切换回溯查看。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Data Layer */}
      <Section id="data">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="serif-title text-3xl md:text-4xl font-bold mb-3">数据层</h2>
            <p className="text-stone-500 text-lg">智能匹配营养数据，从本地库到 AI 估算的完整链路</p>
          </div>

          <div className="p-8 bg-stone-50 rounded-3xl border border-stone-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-5 border border-stone-100">
                <Database className="w-5 h-5 text-protein mb-3" />
                <h4 className="font-bold text-base mb-1">内置 2,667 条食物营养数据库</h4>
                <p className="text-stone-500 text-sm leading-relaxed">来源中国食物成分表，包含热量、宏量、膳食纤维数据。支持中英文模糊搜索与加权评分匹配。</p>
              </div>
              <div className="bg-white rounded-2xl p-5 border border-stone-100">
                <BrainCircuit className="w-5 h-5 text-veggie mb-3" />
                <h4 className="font-bold text-base mb-1">AI 兜底补充</h4>
                <p className="text-stone-500 text-sm leading-relaxed">当数据库未命中时，自动调用 AI 模型估算营养数据，并写入用户本地自定义库，下次直接命中。</p>
              </div>
            </div>

            <div className="flex items-center justify-between bg-white rounded-2xl px-6 py-4 border border-stone-100">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center text-[10px] font-bold">1</div>
                <span className="text-sm font-medium">输入食物</span>
              </div>
              <ArrowRight className="w-5 h-5 text-stone-900" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center text-[10px] font-bold">2</div>
                <span className="text-sm font-medium">自定义库</span>
              </div>
              <ArrowRight className="w-5 h-5 text-stone-900" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center text-[10px] font-bold">3</div>
                <span className="text-sm font-medium">内置数据库</span>
              </div>
              <ArrowRight className="w-5 h-5 text-stone-900" />
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center text-[10px] font-bold">4</div>
                <span className="text-sm font-medium">AI 估算</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* AI Model Routing Architecture */}
      <Section className="bg-white border-y border-stone-100" id="arch">
        <div className="text-center mb-16">
          <h2 className="serif-title text-3xl md:text-4xl font-bold mb-4">架构与模型</h2>
          <p className="text-stone-500">多模型协同，实现从感知到决策的完整链路</p>
        </div>
        
        <div className="max-w-5xl mx-auto p-12 bg-stone-50 rounded-[3rem] border border-stone-100 overflow-x-auto relative">
          {/* Background decorative lines */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
          
          <div className="min-w-[840px] flex flex-col items-center gap-4 relative">
            {/* Inputs Stage */}
            <div className="flex gap-12">
              <FlowNode label="语音输入" icon={Mic} subLabel="DashScope ASR" />
              <FlowNode label="图片输入" icon={Camera} subLabel="Qwen3-VL-flash" />
              <FlowNode label="文字输入" icon={Keyboard} subLabel="DeepSeek-V3" />
            </div>
            
            <FlowArrow length="h-16" />
            
            {/* Intent Stage */}
            <FlowNode label="意图分类" icon={BrainCircuit} subLabel="DeepSeek-V3" variant="primary" />
            
            <div className="inline-flex gap-8 mt-12 relative">
              <svg className="absolute left-0 right-0 h-12 pointer-events-none" style={{ top: '-48px', width: '100%' }}>
                <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#a8a29e" strokeWidth="2" />
                <line x1="12.86%" y1="0" x2="87.14%" y2="0" stroke="#a8a29e" strokeWidth="2" />
                <line x1="12.86%" y1="0" x2="12.86%" y2="100%" stroke="#a8a29e" strokeWidth="2" />
                <line x1="87.14%" y1="0" x2="87.14%" y2="100%" stroke="#a8a29e" strokeWidth="2" />
              </svg>
              
              {/* Intent Columns */}
              <div className="flex flex-col items-center gap-6 w-72">
                <FlowNode label="饮食记录" variant="accent" />
                <FlowArrow />
                <div className="bg-white p-6 rounded-2xl border border-stone-100 text-base space-y-4 shadow-sm w-full">
                  <div className="flex items-center gap-3 text-stone-500"><div className="w-2.5 h-2.5 rounded-full bg-stone-300" /> 提取食物列表</div>
                  <div className="flex items-center gap-3 text-stone-500"><div className="w-2.5 h-2.5 rounded-full bg-stone-300" /> 数据库匹配</div>
                  <div className="flex items-center gap-3 font-bold text-stone-900"><Zap className="w-5 h-5 text-stone-900" /> 写入饮食记录</div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-0 w-[480px]">
                <FlowNode label="饮食计划" variant="accent" />
                <FlowArrow />
                <div className="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-bold">
                  有饮食记录？
                </div>

                <div className="relative w-full h-16">
                  <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 320 64" preserveAspectRatio="xMidYMid meet">
                    <line x1="160" y1="0" x2="160" y2="14" stroke="#a8a29e" strokeWidth="2" />
                    <line x1="78" y1="14" x2="242" y2="14" stroke="#a8a29e" strokeWidth="2" />
                    <line x1="78" y1="14" x2="78" y2="56" stroke="#a8a29e" strokeWidth="2" />
                    <polygon points="72,56 84,56 78,64" fill="#a8a29e" />
                    <line x1="242" y1="14" x2="242" y2="56" stroke="#a8a29e" strokeWidth="2" />
                    <polygon points="236,56 248,56 242,64" fill="#a8a29e" />
                  </svg>
                  <span className="absolute left-[40px] top-[18px] text-xs font-bold text-stone-500">No</span>
                  <span className="absolute right-[40px] top-[18px] text-xs font-bold text-stone-500">Yes</span>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm">
                    <div className="font-bold text-stone-900 text-base mb-3">首次使用</div>
                    <div className="text-stone-500 text-sm space-y-2">
                      <div>1. 收集 8 类生活惯例</div>
                      <div>2. 分析 + 优化建议</div>
                      <div className="font-bold text-stone-900">3. 生成全天 Meal Plan</div>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm">
                    <div className="font-bold text-stone-900 text-base mb-3">已有记录</div>
                    <div className="text-sm space-y-4">
                      <div>
                        <div className="font-bold text-stone-700 mb-1">单餐推荐</div>
                        <div className="text-stone-500">计算剩余配额 → 推荐该餐 → 记录到今天</div>
                      </div>
                      <div>
                        <div className="font-bold text-stone-700 mb-1">全天计划</div>
                        <div className="text-stone-500">分析记录 → 生成计划 → 保存至计划库</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center gap-6 w-72">
                <FlowNode label="饮食分析" variant="accent" />
                <FlowArrow />
                <div className="bg-white p-6 rounded-2xl border border-stone-100 text-base space-y-4 shadow-sm w-full">
                  <div className="flex items-center gap-3 text-stone-500"><div className="w-2.5 h-2.5 rounded-full bg-stone-300" /> 读取历史日志</div>
                  <div className="flex items-center gap-3 text-stone-500"><div className="w-2.5 h-2.5 rounded-full bg-stone-300" /> 分析摄入趋势</div>
                  <div className="flex items-center gap-3 font-bold text-stone-900"><BrainCircuit className="w-5 h-5 text-stone-900" /> 给出周期建议</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-20 border-t border-stone-100 text-center">
        <div className="flex items-center justify-center gap-2 mb-8">
          <img src="/images/logo.png" alt="Milo" className="w-8 h-8 rounded-lg" />
          <span className="font-serif font-bold text-xl tracking-tight">Milo</span>
        </div>
        <p className="text-stone-400 text-sm">© 2026 Milo AI Nutritionist. All rights reserved.</p>
      </footer>
    </div>
  );
}
