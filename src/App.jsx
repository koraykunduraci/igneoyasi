import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, BookOpen, FileText } from 'lucide-react';
import TurkeyMap from './MapComponent';

import { LOCALES, OYA_DATA } from './locales';

const REGION_MEDIA = {
  'marmara': {
    color: '#3b82f6',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80',
    videos: [{ src: '/marmara nazar.mp4', orientation: 'horizontal' }]
  },
  'ege': {
    color: '#10b981',
    image: 'https://images.unsplash.com/photo-1502095819777-62f79fb650fe?auto=format&fit=crop&w=800&q=80',
    videos: [{ src: '/ege pullu oya.mp4', orientation: 'vertical' }]
  },
  'akdeniz': {
    color: '#ef4444',
    image: 'https://images.unsplash.com/photo-1534063230623-ac4bc8586ea2?auto=format&fit=crop&w=800&q=80',
    videos: [
      { src: '/akdeniz halka boncuk.mp4', orientation: 'vertical' },
      { src: '/akdeniz yıldız oyası.mp4', orientation: 'vertical' }
    ]
  },
  'ic-anadolu': {
    color: '#f59e0b',
    image: 'https://images.unsplash.com/photo-1563212046-24eeb64f51e1?auto=format&fit=crop&w=800&q=80',
    videos: [{ src: '/icanadolu citi piti.mp4', orientation: 'horizontal' }]
  },
  'karadeniz': {
    color: '#06b6d4',
    image: 'https://images.unsplash.com/photo-1587313361138-03828949826f?auto=format&fit=crop&w=800&q=80',
    videos: [{ src: '/karadeniz pullu boncuk.mp4', orientation: 'vertical' }]
  },
  'dogu-anadolu': {
    color: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1596489379683-144f83733075?auto=format&fit=crop&w=800&q=80',
    videos: []
  },
  'guneydogu-anadolu': {
    color: '#ec4899',
    image: 'https://images.unsplash.com/photo-1601004149632-1f4864c39df4?auto=format&fit=crop&w=800&q=80',
    videos: []
  }
};

const VideoPlayer = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const vRef = useRef(null);

  const togglePlay = () => {
    setIsPlaying(true);
    if (vRef.current) vRef.current.play();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className={`relative rounded-2xl overflow-hidden bg-black border border-neutral-800 shrink-0 ${
        data.orientation === 'vertical' ? 'aspect-[9/16] w-full max-w-[260px] sm:max-w-[280px] mx-auto' : 'aspect-video w-full'
      } group`}
    >
      <video 
        ref={vRef}
        src={data.src} 
        className="w-full h-full object-cover"
        controls={isPlaying}
        playsInline
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
      
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors duration-300">
          <button 
            onClick={togglePlay}
            className="w-20 h-20 flex items-center justify-center bg-white/10 hover:bg-white/20 hover:scale-110 backdrop-blur-md border border-white/20 rounded-full transition-all duration-300 text-white shadow-lg"
          >
            <Play className="w-8 h-8 ml-1" fill="currentColor" />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default function App() {
  const [activeRegion, setActiveRegion] = useState(null);
  const [infoModal, setInfoModal] = useState(null);
  const [lang, setLang] = useState('tr');

  const t = LOCALES[lang];
  
  // Merge REGION_MEDIA with OYA_DATA for current lang
  const REGION_DATA = Object.keys(REGION_MEDIA).reduce((acc, key) => {
    acc[key] = {
      ...REGION_MEDIA[key],
      ...OYA_DATA[lang][key]
    };
    return acc;
  }, {});

  const activeData = activeRegion ? REGION_DATA[activeRegion] : null;

  const handleRegionClick = (region) => {
    setActiveRegion(region);
  };

  const handleClose = () => {
    setActiveRegion(null);
  };

  return (
    <div 
      className="min-h-screen text-neutral-900 font-sans selection:bg-orange-500 selection:text-white"
      style={{
        backgroundColor: '#f8fafc',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='500' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2364748b' fill-opacity='0.15' font-family='Segoe UI Historic, sans-serif' font-size='20' letter-spacing='12'%3E%3Ctext x='-50' y='30'%3E𐰁 𐰂 𐰃 𐰄 𐰅 𐰆 𐰇 𐰈 𐰉 𐱅 𐰇 𐰼 𐰰 𐰊 𐰋 𐰌 𐰍 𐰎 𐰏 𐰐 𐰑 𐰒 𐰓 𐰔 𐰕%3C/text%3E%3Ctext x='-10' y='70'%3E𐰖 𐰗 𐰘 𐰙 𐰚 𐰛 𐰜 𐰝 𐰞 𐰟 𐰠 𐰡 𐰢 𐰣 𐰤 𐰥 𐰦 𐰧 𐰨 𐰩 𐰪 𐰫 𐰬%3C/text%3E%3Ctext x='-60' y='110'%3E𐰭 𐰮 𐰯 𐰰 𐰱 𐰲 𐰳 𐰴 𐰣 𐰵 𐰶 𐰷 𐰸 𐰹 𐰺 𐰻 𐰼 𐰽 𐰾 𐰿 𐱀 𐱁 𐱂%3C/text%3E%3Ctext x='15' y='150'%3E𐱃 𐱄 𐱅 𐱆 𐱇 𐱈 𐱅 𐰭 𐰼 𐰃 𐰁 𐰂 𐰃 𐰄 𐰅 𐰆 𐰇 𐰈 𐰉 𐰊 𐰋 𐰌 𐰍%3C/text%3E%3Ctext x='-30' y='190'%3E𐰎 𐰏 𐰐 𐰑 𐰒 𐰓 𐰔 𐰕 𐰖 𐰗 𐰘 𐰙 𐰚 𐰛 𐰜 𐰝 𐰞 𐰟 𐰠 𐰡 𐰢 𐰣 𐰤%3C/text%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '400px 160px'
      }}
    >
      
      {/* Top Language Bar */}
      <div className="absolute top-4 right-4 z-50 flex items-center justify-center gap-6 bg-white/80 backdrop-blur-md rounded-full px-4 py-3 border border-neutral-200 shadow-sm">
        <button 
          onClick={() => setLang('tr')} 
          className={`flex items-center justify-center w-11 h-11 rounded-full overflow-hidden transition-all ${lang === 'tr' ? 'ring-2 ring-offset-2 ring-orange-500 scale-110' : 'opacity-70 hover:opacity-100 hover:scale-105'}`}
          title="Türkçe"
        >
          <img src="https://flagcdn.com/tr.svg" alt="TR" className="w-full h-full object-cover" />
        </button>
        <button 
          onClick={() => setLang('en')} 
          className={`flex items-center justify-center w-11 h-11 rounded-full overflow-hidden transition-all ${lang === 'en' ? 'ring-2 ring-offset-2 ring-rose-500 scale-110' : 'opacity-70 hover:opacity-100 hover:scale-105'}`}
          title="English"
        >
          <img src="https://flagcdn.com/gb.svg" alt="EN" className="w-full h-full object-cover" />
        </button>
      </div>

      {/* Header Banner */}
      <header className="pt-16 sm:pt-16 pb-4 sm:pb-8 px-4 sm:px-6 w-full max-w-7xl mx-auto flex items-center justify-center relative z-20">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/95 backdrop-blur-md rounded-2xl md:rounded-full px-4 py-4 md:px-10 md:py-6 shadow-xl border border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 w-full max-w-6xl"
        >
          {/* Left Logo - Sanayi Bakanligi */}
          <div className="flex-shrink-0 h-16 md:h-24 w-auto flex items-center justify-center">
            <img 
              src="/bakan.svg" 
              alt="T.C. Sanayi ve Teknoloji Bakanlığı" 
              className="max-h-full object-contain"
            />
          </div>

          {/* Central Text Block */}
          <div className="flex flex-col items-center justify-center text-center flex-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-600 via-rose-600 to-purple-600 bg-clip-text text-transparent pb-2 drop-shadow-sm mb-1">
              {t.title}
            </h1>
            <h2 className="text-sm md:text-base lg:text-lg font-semibold text-[#374151] mb-2 leading-snug">
              {t.subtitle}
            </h2>
            <p className="text-xs md:text-sm font-medium text-[#4b5563]">
              {t.authors}
            </p>
          </div>

          {/* Right Logo - Tubitak */}
          <div className="flex-shrink-0 h-16 md:h-24 w-auto flex items-center justify-center">
            <img 
              src="/tubitak logo.png" 
              alt="TÜBİTAK" 
              className="max-h-full object-contain"
            />
          </div>
        </motion.div>
      </header>

      {/* Main Map Content - Full screen fit and responsive wrapper */}
      <main className="px-2 sm:px-6 py-4 sm:py-10 relative flex-1 flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[auto] w-full max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 w-full h-full flex items-center justify-center"
        >
          <TurkeyMap 
            onRegionClick={handleRegionClick} 
            activeRegion={activeRegion}
            regionData={REGION_DATA}
          />
        </motion.div>
        
        {/* Glow effect behind map */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none -z-0"></div>
      </main>

      {/* Intro Video */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 mb-8 relative z-20">
        <div className="bg-white/80 backdrop-blur-sm p-2 sm:p-3 rounded-2xl md:rounded-3xl shadow-lg border border-neutral-200">
          <video 
            src="/intro.mp4" 
            controls 
            className="w-full aspect-video rounded-xl md:rounded-2xl object-cover bg-neutral-900"
          >
            Tarayıcınız video etiketini desteklemiyor.
          </video>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="w-full pb-8 pt-4 flex flex-col items-center justify-center gap-4 relative z-20">
        <div className="flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setInfoModal('onbilgi')}
            className="cursor-pointer flex items-center gap-2 px-6 py-3 bg-white/80 hover:bg-white text-neutral-800 rounded-full shadow-md hover:shadow-lg transition-all border border-neutral-200 backdrop-blur-sm font-semibold text-sm sm:text-base"
          >
            <BookOpen className="w-5 h-5 text-orange-500" />
            {t.pre_info}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setInfoModal('detay')}
            className="cursor-pointer flex items-center gap-2 px-6 py-3 bg-white/80 hover:bg-white text-neutral-800 rounded-full shadow-md hover:shadow-lg transition-all border border-neutral-200 backdrop-blur-sm font-semibold text-sm sm:text-base"
          >
            <FileText className="w-5 h-5 text-rose-500" />
            {t.detailed_info}
          </motion.button>
        </div>

        <button
          onClick={() => setInfoModal('arastirma')}
          className="cursor-pointer text-neutral-500 hover:text-neutral-800 text-sm md:text-xs underline underline-offset-4 hover:decoration-neutral-800 transition-all mt-6"
          style={{ cursor: 'pointer' }}
        >
          {t.academic_text}
        </button>
      </footer>

      {/* Info Modals */}
      <AnimatePresence>
        {infoModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setInfoModal(null)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-[95vw] md:w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col z-10 border border-neutral-200"
            >
              <button 
                onClick={() => setInfoModal(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-full transition-colors"
                aria-label={t.close}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 sm:p-12 overflow-y-auto prose prose-neutral prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-p:text-justify max-w-none text-left">
                {infoModal === 'onbilgi' && (
                  <>
                    <div className="text-center mb-10">
                      <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600 mb-4 inline-block">{t.title}</h1>
                      <h2 className="text-xl font-medium text-neutral-500">{t.subtitle}</h2>
                      <p className="mt-6 text-sm font-semibold text-neutral-400">{t.authors}</p>
                    </div>

                    <h3 className="text-2xl font-bold border-b pb-2 mb-4">{t.problem_statement}</h3>
                    <p className="text-lg leading-relaxed mb-8">
                      {t.problem_text}
                    </p>

                    <h3 className="text-2xl font-bold border-b pb-2 mb-4">{t.hypothesis}</h3>
                    <p className="text-lg leading-relaxed mb-8">
                      {t.hypothesis_text}
                    </p>

                    <h3 className="text-2xl font-bold border-b pb-2 mb-4">{t.findings}</h3>
                    <p className="text-lg leading-relaxed mb-4">
                      {t.findings_intro}
                    </p>
                    <ul className="space-y-4 text-lg leading-relaxed list-disc pl-6 text-neutral-600">
                      <li><strong>{t.regional_effects}</strong> {t.regional_effects_text}</li>
                      <li><strong>{t.nature_motifs}</strong> {t.nature_motifs_text}</li>
                      <li><strong>{t.symbolic_meanings}</strong> {t.symbolic_meanings_text}</li>
                      <li><strong>{t.communication_tool}</strong> {t.communication_tool_text}</li>
                      <li><strong>{t.current_status}</strong> {t.current_status_text}</li>
                      <li><strong>{t.cultural_depth}</strong> {t.cultural_depth_text}</li>
                    </ul>
                  </>
                )}

                {infoModal === 'detay' && (
                  <>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600 mb-8 text-center">{t.detail_report}</h1>
                    
                    <h3 className="text-2xl font-bold border-b pb-2 mb-4 text-orange-600">{t.summary}</h3>
                    <p className="text-lg leading-relaxed mb-8">
                      {t.summary_text_1}
                      <br /><br />
                      {t.summary_text_2}
                      <br /><br />
                      {t.summary_text_3}
                    </p>

                    <h3 className="text-2xl font-bold border-b pb-2 mb-4 text-orange-600">{t.intro}</h3>
                    <p className="text-lg leading-relaxed mb-8">
                      <span dangerouslySetInnerHTML={{ __html: t.intro_text }} />
                    </p>

                    <h3 className="text-2xl font-bold border-b pb-2 mb-4 text-orange-600">{t.method}</h3>
                    <p className="text-lg leading-relaxed mb-8">
                      <span dangerouslySetInnerHTML={{ __html: t.method_text_1 }} />
                      <br /><br />
                      <span dangerouslySetInnerHTML={{ __html: t.method_text_2 }} />
                      <br /><br />
                      <span dangerouslySetInnerHTML={{ __html: t.method_text_3 }} />
                      <br /><br />
                      <span dangerouslySetInnerHTML={{ __html: t.method_text_4 }} />
                    </p>

                    <h3 className="text-2xl font-bold border-b pb-2 mb-4 text-orange-600">{t.conclusion}</h3>
                    <p className="text-lg leading-relaxed mb-8">
                      {t.conclusion_text}
                    </p>

                    <h3 className="text-2xl font-bold border-b pb-2 mb-4 text-orange-600">{t.suggestions}</h3>
                    <p className="text-lg leading-relaxed mb-8">
                      {t.suggestions_text}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h3 className="text-2xl font-bold border-b pb-2 mb-4 text-orange-600">{t.thanks}</h3>
                        <p className="text-base leading-relaxed text-neutral-600 italic">
                          {t.thanks_text}
                        </p>
                      </div>
                      
                      <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                        <h3 className="text-xl font-bold border-b pb-2 mb-4 text-neutral-800">{t.sources}</h3>
                        <ul className="space-y-2 text-sm text-neutral-500 break-words list-disc pl-4">
                          <li>{t.sources_1}</li>
                          <li>{t.sources_2}</li>
                          <li>{t.sources_3}</li>
                          <li>{t.sources_4}</li>
                          <li>{t.sources_5}</li>
                          <li>{t.sources_6}</li>
                          <li>{t.sources_7}</li>
                          <li>{t.sources_8}</li>
                        </ul>
                      </div>
                    </div>

                  </>
                )}

                {infoModal === 'arastirma' && (
                  <>
                    <div className="text-center mb-10">
                      <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-neutral-600 to-neutral-900 mb-4 inline-block">{t.academic_title}</h1>
                      <h2 className="text-xl font-medium text-neutral-500">{t.academic_text}</h2>
                    </div>

                    <h3 className="text-2xl font-bold border-b pb-2 mb-4">{t.foreword}</h3>
                    <p className="text-lg leading-relaxed mb-6">
                      {t.foreword_1}
                    </p>
                    <p className="text-lg leading-relaxed mb-8">
                      {t.foreword_2}
                    </p>
                    <p className="text-lg leading-relaxed mb-8">
                      {t.foreword_3}
                    </p>

                    <h3 className="text-2xl font-bold border-b pb-2 mb-4 mt-8">{t.intro}</h3>
                    <p className="text-lg leading-relaxed mb-6">
                      {t.intro_long_1}
                    </p>
                    <p className="text-lg leading-relaxed mb-6">
                      {t.intro_long_2}
                    </p>
                    <p className="text-lg leading-relaxed mb-6">
                      {t.intro_long_3}
                    </p>
                    <p className="text-lg leading-relaxed mb-6">
                      {t.intro_long_4}
                    </p>
                    <p className="text-lg leading-relaxed mb-6">
                      {t.intro_long_5}
                    </p>
                    <p className="text-lg leading-relaxed mb-6">
                      {t.intro_long_6}
                    </p>
                    <p className="text-lg leading-relaxed mb-6">
                      {t.intro_long_7}
                    </p>
                    <p className="text-lg leading-relaxed mb-8">
                      {t.intro_long_8}
                    </p>

                    <h3 className="text-2xl font-bold border-b pb-2 mb-4 mt-8">{t.historical_development}</h3>
                    <p className="text-lg leading-relaxed mb-6">
                      {t.historical_1}
                    </p>
                    <p className="text-lg leading-relaxed mb-6">
                      {t.historical_2}
                    </p>
                    <p className="text-lg leading-relaxed mb-6">
                      {t.historical_3}
                    </p>
                    <p className="text-lg leading-relaxed mb-8">
                      {t.historical_4}
                    </p>

                    <h3 className="text-2xl font-bold border-b pb-2 mb-4 mt-8">{t.materials}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-6">
                      <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                        <h4 className="text-xl font-bold text-neutral-800 mb-2">{t.cotton_yarn}</h4>
                        <p className="text-base text-neutral-600">
                          {t.cotton_yarn_desc}
                        </p>
                      </div>
                      <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                        <h4 className="text-xl font-bold text-neutral-800 mb-2">{t.synthetic_yarn}</h4>
                        <p className="text-base text-neutral-600">
                          {t.synthetic_yarn_desc}
                        </p>
                      </div>
                      <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                        <h4 className="text-xl font-bold text-neutral-800 mb-2">{t.beads}</h4>
                        <p className="text-base text-neutral-600">
                          {t.beads_desc}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Map Content Regional Modal Overlay */}
      <AnimatePresence>
        {activeRegion && activeData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              layoutId={`region-${activeRegion}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-[95vw] md:w-full max-w-4xl max-h-[90vh] bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col z-10"
              style={{ boxShadow: `0 20px 40px -10px ${activeData.color}40` }}
            >
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="pt-6 sm:pt-8 px-6 sm:px-8 shrink-0 flex items-center gap-4">
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-5 h-5 rounded-full shadow-md"
                  style={{ backgroundColor: activeData.color }}
                />
                <motion.h2 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl sm:text-4xl font-bold text-white tracking-tight"
                >
                  {activeData.name}
                </motion.h2>
              </div>

              <div className="p-6 sm:p-8 pt-4 flex flex-col gap-5">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-neutral-300 text-base sm:text-lg leading-relaxed text-justify"
                >
                  {activeData.text}
                </motion.p>

                {activeData.oyalar && activeData.oyalar.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2"
                  >
                    {activeData.oyalar.map((oya, idx) => (
                      <div key={idx} className="bg-neutral-800/50 border border-neutral-700 p-4 rounded-xl flex flex-col">
                        {oya.image && (
                          <div className="w-full h-40 sm:h-48 rounded-lg overflow-hidden mb-3 border border-neutral-700">
                            <img src={oya.image} alt={oya.isim} className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-500 ease-out" />
                          </div>
                        )}
                        <h4 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: activeData.color }}></div>
                          {oya.isim}
                        </h4>
                        <p className="text-neutral-400 text-sm leading-relaxed text-justify">
                          {oya.tanim}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}

                {activeData.videos && activeData.videos.length > 0 && (
                  <div className={`grid grid-cols-1 ${activeData.videos.length > 1 ? 'md:grid-cols-2' : ''} gap-6 w-full items-center`}>
                    {activeData.videos.map((vid, idx) => (
                      <VideoPlayer key={idx} data={vid} />
                    ))}
                  </div>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
