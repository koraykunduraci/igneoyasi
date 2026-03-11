import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, MapPin } from 'lucide-react';
import TurkeyMap from './MapComponent';

const REGION_DATA = {
  'marmara': {
    name: 'Marmara Bölgesi',
    color: '#3b82f6',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80',
    text: 'Marmara Bölgesi, Türkiye\'nin kuzeybatısında yer alan, tarihi yarımada ve doğal güzellikleri ile ünlü, sanayi ve kültürel açıdan en gelişmiş bölgesidir. İstanbul gibi metropolleri barındıran bölge, iki kıtayı birbirine bağlar.',
    video: '/marmara nazar.mp4'
  },
  'ege': {
    name: 'Ege Bölgesi',
    color: '#10b981',
    image: 'https://images.unsplash.com/photo-1502095819777-62f79fb650fe?auto=format&fit=crop&w=800&q=80',
    text: 'Ege Bölgesi, zeytin ağaçları, muhteşem koyları ve antik kentleriyle Türkiye\'nin tatil cennetidir. Efes Antik Kenti ve travertenler gibi dünya mirası zenginliklerine sahiptir.',
    video: '/ege pullu oya.mp4'
  },
  'akdeniz': {
    name: 'Akdeniz Bölgesi',
    color: '#ef4444',
    image: 'https://images.unsplash.com/photo-1534063230623-ac4bc8586ea2?auto=format&fit=crop&w=800&q=80',
    text: 'Akdeniz Bölgesi, uçsuz bucaksız plajları, Toros Dağları ve sıcacık iklimiyle harika bir bölgedir. Turunçgil bahçeleri ve tarihi kalıntılarıyla eşsiz bir deneyim sunar.',
    video: '/akdeniz halka boncuk.mp4'
  },
  'ic-anadolu': {
    name: 'İç Anadolu Bölgesi',
    color: '#f59e0b',
    image: 'https://images.unsplash.com/photo-1563212046-24eeb64f51e1?auto=format&fit=crop&w=800&q=80',
    text: 'İç Anadolu, bozkırın ortasında yükselen Kapadokya peri bacaları ve köklü tarihi ile medeniyetin beşiğidir. Türkiye\'nin tahıl ambarı olarak da bilinir.',
    video: '/icanadolu citi piti.mp4'
  },
  'karadeniz': {
    name: 'Karadeniz Bölgesi',
    color: '#06b6d4',
    image: 'https://images.unsplash.com/photo-1587313361138-03828949826f?auto=format&fit=crop&w=800&q=80',
    text: 'Karadeniz Bölgesi, yemyeşil doğası, hırçın denizi ve yaylalarıyla büyüleyici bir atmosfere sahiptir. Çay ve fındık bahçeleriyle meşhurdur.',
    video: '/karadeniz pullu boncuk.mp4'
  },
  'dogu-anadolu': {
    name: 'Doğu Anadolu Bölgesi',
    color: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1596489379683-144f83733075?auto=format&fit=crop&w=800&q=80',
    text: 'Doğu Anadolu Bölgesi, sarp dağları, karla kaplı zirveleri ve tarihi kaleleriyle mistik bir diyardır. Türkiye\'nin en büyük gölü olan Van Gölü buradadır.',
    video: 'https://vjs.zencdn.net/v/oceans.mp4'
  },
  'guneydogu-anadolu': {
    name: 'Güneydoğu Anadolu Bölgesi',
    color: '#ec4899',
    image: 'https://images.unsplash.com/photo-1601004149632-1f4864c39df4?auto=format&fit=crop&w=800&q=80',
    text: 'Güneydoğu Anadolu, Mezopotamya uygarlıklarına ev sahipliği yapan, taş evleri ve enfes mutfağıyla eşsizdir. Zeugma ve Göbeklitepe gibi dünyanın en eski kalıntılarına ev sahipliği yapar.',
    video: 'https://vjs.zencdn.net/v/oceans.mp4'
  }
};

export default function App() {
  const [activeRegion, setActiveRegion] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  const activeData = activeRegion ? REGION_DATA[activeRegion] : null;

  const handleRegionClick = (region) => {
    setActiveRegion(region);
    setIsVideoPlaying(false);
  };

  const handleClose = () => {
    setActiveRegion(null);
    setIsVideoPlaying(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  return (
    <div 
      className="min-h-screen text-neutral-900 font-sans selection:bg-orange-500 selection:text-white"
      style={{
        backgroundColor: '#f8fafc',
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='240' height='240' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2364748b' fill-opacity='0.5' font-family='Segoe UI Historic, sans-serif'%3E%3Ctext x='20' y='60' font-size='28' transform='rotate(-15 40 40)'%3E𐱅 𐰇 𐰼 𐰰%3C/text%3E%3Ctext x='120' y='160' font-size='26' transform='rotate(15 130 150)'%3E𐱅 𐰭 𐰼 𐰃%3C/text%3E%3Ctext x='160' y='40' font-size='22' transform='rotate(-35 160 40)'%3E𐰆 𐰉 𐰭%3C/text%3E%3Ctext x='30' y='200' font-size='24' transform='rotate(25 40 180)'%3E𐰴 𐰣%3C/text%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '240px 240px'
      }}
    >
      
      {/* Header */}
      <header className="pt-8 sm:pt-14 pb-4 sm:pb-8 px-4 sm:px-6 text-center relative w-full border-b border-neutral-200 mb-4 bg-white/70 backdrop-blur-md shadow-sm">
        {/* Left Logo */}
        <div className="absolute top-4 left-4 sm:top-6 sm:left-8 z-20 h-[72px] w-[144px] sm:h-[120px] sm:w-[192px] flex items-center justify-center overflow-visible">
          <img src="/mba logo.jpg" alt="Logo 1" className="max-h-full max-w-full object-contain mix-blend-multiply" onError={(e) => { e.target.style.display='none'; e.target.parentNode.innerHTML='<span class="text-xs text-black font-bold">Logo 1</span>' }} />
        </div>
        
        {/* Right Logo */}
        <div className="absolute top-4 right-4 sm:top-6 sm:right-8 z-20 h-[72px] w-[144px] sm:h-[120px] sm:w-[192px] flex items-center justify-center overflow-visible">
          <img src="/tubitak logo.png" alt="Logo 2" className="max-h-full max-w-full object-contain" onError={(e) => { e.target.style.display='none'; e.target.parentNode.innerHTML='<span class="text-xs text-black font-bold">Logo 2</span>' }} />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-20 sm:mt-12"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-2 sm:mb-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-orange-600 via-rose-600 to-purple-600 bg-clip-text text-transparent pb-2 drop-shadow-sm">
              İğnenin Ucundaki Sessiz Dil
            </h1>
          </div>
          <p className="text-neutral-600 text-base sm:text-lg max-w-xl mx-auto px-2 font-medium">
            Anadolu'nun eşsiz motiflerini, kültürünü ve tarihini harita üzerinden keşfedin.
          </p>
        </motion.div>
      </header>

      {/* Main Map Content - Full screen fit and responsive wrapper */}
      <main className="px-2 sm:px-6 py-4 sm:py-10 relative flex-1 flex flex-col items-center justify-center min-h-[50vh] sm:min-h-[auto] w-full max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 w-full h-full flex items-center justify-center bg-white/50 p-4 sm:p-8 rounded-3xl border border-neutral-200 backdrop-blur-sm shadow-xl"
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

      {/* Modal Overlay */}
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
              className="relative w-full max-w-4xl max-h-[90vh] bg-neutral-900 border border-neutral-800 rounded-3xl shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col z-10"
              style={{ boxShadow: `0 20px 40px -10px ${activeData.color}40` }}
            >
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md transition-colors"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-64 sm:h-80 w-full shrink-0">
                <img 
                  src={activeData.image} 
                  alt={activeData.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 sm:p-8">
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-3 mb-2"
                  >
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: activeData.color }}></div>
                    <span style={{ color: activeData.color }} className="font-semibold tracking-wider uppercase text-sm">
                      Bölgelerimiz
                    </span>
                  </motion.div>
                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl sm:text-4xl font-bold text-white"
                  >
                    {activeData.name}
                  </motion.h2>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col gap-8">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-neutral-300 text-lg leading-relaxed"
                >
                  {activeData.text}
                </motion.p>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative rounded-2xl overflow-hidden bg-black border border-neutral-800 aspect-video group"
                >
                  <video 
                    ref={videoRef}
                    src={activeData.video} 
                    className="w-full h-full object-cover"
                    controls={isVideoPlaying}
                    playsInline
                    onPause={() => setIsVideoPlaying(false)}
                    onPlay={() => setIsVideoPlaying(true)}
                  />
                  
                  {!isVideoPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors duration-300">
                      <button 
                        onClick={handlePlayVideo}
                        className="w-20 h-20 flex items-center justify-center bg-white/10 hover:bg-white/20 hover:scale-110 backdrop-blur-md border border-white/20 rounded-full transition-all duration-300 text-white"
                      >
                        <Play className="w-8 h-8 ml-1" fill="currentColor" />
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
