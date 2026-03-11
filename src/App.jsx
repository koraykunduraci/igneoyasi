import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, BookOpen, FileText } from 'lucide-react';
import TurkeyMap from './MapComponent';

const REGION_DATA = {
  'marmara': {
    name: 'Marmara Bölgesi',
    color: '#3b82f6',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=800&q=80',
    text: 'Marmara Bölgesi’nde başörtüsü kenarlarına uygulanan boncuklu oyalar, bölgenin el sanatları mirasının önemli bir parçasını oluşturur. İğne oyasının inceliği ile cam boncuğun estetik görünümünü bir araya getiren bu oya türleri, yalnızca süsleme amaçlı değil; aynı zamanda köklü kültürel inançları, sosyal mesajları ve geleneksel değerleri yansıtan bir iletişim biçimi niteliğindedir. Koruma, sevgi, zarafet, bereket gibi anlamlar taşıyan motifleriyle Marmara’nın boncuklu başörtü oyaları (özellikle Nazar Boncuğu ve Karanfil oyaları), hem çeyiz geleneğinin hem de halk sanatının canlı ve özgün örneklerini günümüze taşımaktadır.',
    oyalar: [{ isim: 'Nazar Boncuğu Oyası', tanim: 'Halk arasında "kem gözlerden korunma" inancıyla yapılan ve özellikle yazma, yemeni ve çeyizliklerde sık kullanılan bir boncuklu iğne oyası türüdür. Mavi, lacivert, beyaz ve sarı tonlarında nazar boncuğu şeklinde cam boncuklar kullanılır.' }, { isim: 'Karanfil Oyası', tanim: 'Tülbent kenarlarına işlenen ve karanfil çiçeğini andıran boncuklu ya da iğne oyası motifidir. Sevgi, zarafet ve kadın emeğini temsil eder. Bazı yörelerde "karanfil gibi narin kız" anlamında hediye edilir.' }],
    videos: [{ src: '/marmara nazar.mp4', orientation: 'horizontal' }]
  },
  'ege': {
    name: 'Ege Bölgesi',
    color: '#10b981',
    image: 'https://images.unsplash.com/photo-1502095819777-62f79fb650fe?auto=format&fit=crop&w=800&q=80',
    text: 'Ege Bölgesi başörtülerinde kullanılan boncuk oyaları, bölgenin geleneksel giyim kültürünün estetik ve sembolik bir parçasıdır. Ege’nin doğal ve kültürel yapısı, oya motiflerine zeytin dalı, üzüm salkımı, papatya, deniz kabuğu gibi temalarla yansır. Canlı ve açık tonların hâkim olduğu turkuaz, pembe, sarı ve yeşil renkler; parlak cam ya da inci görünümlü boncuklarla birlikte kullanılarak başörtülerine hareketli ve gösterişli bir görünüm kazandırır.',
    oyalar: [{ isim: 'Zeytin Dalı Oyası', tanim: 'Ege\'nin simgesi olan zeytin ağacından ilham alınarak yapılan, özellikle tülbent ve yazma kenarlarını süsleyen geleneksel bir iğne/boncuk oyası motifidir. Barış, bereket, umut ve direnç simgesidir.' }, { isim: 'Gelin Buketi Oyası', tanim: 'Adını düğünlerde gelinlerin taşıdığı renkli çiçek demetlerinden alır. Çeşitli çiçek motiflerinin bir araya getirilmesiyle oluşturulur. Mutluluk, sevgi, neşe ve yeni başlangıçlar anlamı taşır.' }],
    videos: [{ src: '/ege pullu oya.mp4', orientation: 'vertical' }]
  },

  'akdeniz': {
    name: 'Akdeniz Bölgesi',
    color: '#ef4444',
    image: 'https://images.unsplash.com/photo-1534063230623-ac4bc8586ea2?auto=format&fit=crop&w=800&q=80',
    text: 'Akdeniz Bölgesinde boncuk oyalarının iki ve üç boyutlu olarak yapıldığı, en çok tülbent kenarlarına dikildiği ve başörtüsü olarak kullanıldığı görülmektedir. Boncukla yapılan oyalarda en çok tığ ve iğne oyası teknikleri uygulanırken farklı oranlarda mekik, firkete ve şişle yapılan temel teknikler de kullanılmaktadır.',
    oyalar: [{ isim: 'Gül Oyası', tanim: 'Adını güle benzeyen desenlerinden alır. Gül motifi, sevgi, zarafet ve güzelliği simgeler. Kırmızı, pembe, mor renkleriyle narin, ince bir kişilik mesajı ileten bir oyadır.' }, { isim: 'Kafes (File) Oyası', tanim: 'Temel yapısı, düzenli kare boşluklar oluşturularak örülür. Üst kısmına genellikle boncuk, pul veya küçük motifler (çiçek, meyve) işlenir. Sabır ve zarafet simgesi olarak görülür.' }],
    videos: [
      { src: '/akdeniz halka boncuk.mp4', orientation: 'vertical' },
      { src: '/akdeniz yıldız oyası.mp4', orientation: 'vertical' }
    ]
  },
  'ic-anadolu': {
    name: 'İç Anadolu Bölgesi',
    color: '#f59e0b',
    image: 'https://images.unsplash.com/photo-1563212046-24eeb64f51e1?auto=format&fit=crop&w=800&q=80',
    text: 'İç Anadolu Bölgesi’nde başörtüler (yazma, tülbent) çoğunlukla sade zemin üzerine işlenen boncuk oyalarıyla süslenmektedir. Bölgenin kültürel yapısında sadelik, dayanıklılık ve zarafet ön planda olduğu için oya motifleri de genellikle küçük, düzenli ve gösterişten uzak tasarımlardan oluşur. Boncuklar, iplik üzerinde ritmik bir şekilde dizilerek küçük çiçek, tomurcuk veya damla biçimli motifler oluşturur.',
    oyalar: [{ isim: 'Çıtı Pıtı Oyası', tanim: 'Adını küçük ve zarif motiflerinden alır. Minik boncuklar ya da iplerle yapılan küçük çiçek, tomurcuk ya da damla şekilleri içerir. İncelik, sadelik ve zarafetin simgesidir.' }, { isim: 'Biber Oyası', tanim: 'Boncuklarla biber şekline benzeyen ince ve sivri form verilir. Sadece bereket ve üretkenliği değil, sivri ucu sebebiyle "lafını esirgemeyen gelin" gibi karakter mesajları da taşır.' }],
    videos: [{ src: '/icanadolu citi piti.mp4', orientation: 'horizontal' }]
  },
  'karadeniz': {
    name: 'Karadeniz Bölgesi',
    color: '#06b6d4',
    image: 'https://images.unsplash.com/photo-1587313361138-03828949826f?auto=format&fit=crop&w=800&q=80',
    text: 'Karadeniz bölgesinin hanımları, birbirinden farklı iğne oyaları ile sezonun renklendirilmesinde büyük katkıda bulunmaya devam ediyorlar. Karadeniz iğne oyası denince hemen aklımıza alnının önünde boncuk süslemeli yazmalar gelir. Görünürde güzel olduğu kadar yapımı da bir o kadar heyecan vericidir.',
    oyalar: [{ isim: 'Horon Oyası', tanim: 'Adını Karadeniz’in en bilinen coşkulu halk dansı olan horondan alır. Horonda el ele dizilen insanlar gibi oyadaki motifler de sıralı, ritmik ve canlı şekilde dizilir.' }, { isim: 'Dere Başı Pıtırak Oyası', tanim: 'Karadeniz’in zengin doğasından esinlenerek geliştirilmiş, dere kenarlarında yetişen pıtırak bitkisinden adını alan oya modelidir. Tıpkı pıtırak gibi bir yere tutunup kopmayan güçlü kadını simgeler.' }],
    videos: [{ src: '/karadeniz pullu boncuk.mp4', orientation: 'vertical' }]
  },
  'dogu-anadolu': {
    name: 'Doğu Anadolu Bölgesi',
    color: '#8b5cf6',
    image: 'https://images.unsplash.com/photo-1596489379683-144f83733075?auto=format&fit=crop&w=800&q=80',
    text: 'Anadolu\'nun Doğu bölgelerinde boncuk oyaları geleneksel Türk kültürünün önemli bir parçası olarak kabul edilmektedir. Bu sanat, Anadolu kadınının yüzyıllar öncesinden bugüne taşıdığı estetikleri yansıtmaktadır. Tığ, mekik, firkete, koza, yün, mum, dokuma gibi tekniklerle, doğanın zengin dokusundan ilhamla işlenir.',
    oyalar: [{ isim: 'Van Gölü Dalgası Oyası', tanim: 'Adını Türkiye’nin en büyük gölü olan Van Gölü’nün dalgalarından alan bu model, dalga formunu andıran kıvrımlı, sıralı motifler barındırır. Sabır, huzur ve süreklilik temalarını simgeler.' }, { isim: 'Fıstık Oyası', tanim: '"Fıstık" adı verilen küçük, top şeklinde motiflerden oluşan sağlam bir oya türüdür. Bereket, zenginlik ve kadının emeğini taşır.' }]
  },
  'guneydogu-anadolu': {
    name: 'Güneydoğu Anadolu Bölgesi',
    color: '#ec4899',
    image: 'https://images.unsplash.com/photo-1601004149632-1f4864c39df4?auto=format&fit=crop&w=800&q=80',
    text: 'Güneydoğu Anadolu Bölgesi’nde boncuk oyaları canlı ve parlak renklerin koyu tonlardaki başörtüsü kenarlarına ritmik bir düzen içinde işlenmesiyle oluşturulur. Motiflerde bereketi simgeleyen nar, buğday başağı, yıldız kullanılırken; nazardan korunmayı temsil eden göz motifi de görülür. Prestij unsurudur; düğün ve kına gecelerinde geleneğin en büyük göstergesidir.',
    oyalar: [{ isim: 'Mardin Taşı Oyası', tanim: 'Adını Mardin evlerine ilham veren meşhur Sarı Kalker Taşı’ndan alır. Sarı, krem, bej tonlarıyla sadelik ve asaletin simgesidir. Kadının sabrı ve geleneklerine bağlılığını temsil eder.' }, { isim: 'Halay Boncuğu Oyası', tanim: 'Adını halk dansı halaydan alır. İnsanların el ele tutuşarak oluşturduğu düzenli sıra ve ritmik hareketler bu oyaya esin kaynağı olmuştur. Toplumsal dayanışma, birlik ve kutlamaların simgesidir.' }]
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
        data.orientation === 'vertical' ? 'aspect-[9/16] w-full max-w-[340px] mx-auto min-h-[400px]' : 'aspect-video w-full'
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
      
      {/* Header */}
      <header className="pt-2 sm:pt-4 pb-4 sm:pb-8 px-4 sm:px-6 text-center relative w-full mb-4">
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
          <p className="text-neutral-600 text-base sm:text-lg max-w-2xl mx-auto px-2 font-medium text-justify">
            Sözün bittiği yerde iğnenin konuştuğu; Anadolu kadınlarının sevincini, hüznünü ve umudunu ilmek ilmek işlediği oya kültürünü haritada keşfedin.
          </p>
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

      {/* Footer Navigation */}
      <footer className="w-full pb-8 pt-4 flex items-center justify-center gap-4 relative z-20">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setInfoModal('onbilgi')}
          className="cursor-pointer flex items-center gap-2 px-6 py-3 bg-white/80 hover:bg-white text-neutral-800 rounded-full shadow-md hover:shadow-lg transition-all border border-neutral-200 backdrop-blur-sm font-semibold text-sm sm:text-base"
        >
          <BookOpen className="w-5 h-5 text-orange-500" />
          Proje Ön Bilgi
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setInfoModal('detay')}
          className="cursor-pointer flex items-center gap-2 px-6 py-3 bg-white/80 hover:bg-white text-neutral-800 rounded-full shadow-md hover:shadow-lg transition-all border border-neutral-200 backdrop-blur-sm font-semibold text-sm sm:text-base"
        >
          <FileText className="w-5 h-5 text-rose-500" />
          Proje Detay
        </motion.button>
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
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-y-auto overflow-x-hidden flex flex-col z-10 border border-neutral-200"
            >
              <button 
                onClick={() => setInfoModal(null)}
                className="absolute top-4 right-4 z-20 p-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-full transition-colors"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 sm:p-12 overflow-y-auto prose prose-neutral prose-headings:text-neutral-900 prose-p:text-neutral-700 prose-p:text-justify max-w-none text-left">
                {infoModal === 'onbilgi' && (
                  <>
                    <div className="text-center mb-10">
                      <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600 mb-4 inline-block">İĞNENİN UCUNDAKİ SESSİZ DİL</h1>
                      <h2 className="text-xl font-medium text-neutral-500">Boncuk Oyalarının Anadolu Kültüründeki İletişim Rolü</h2>
                      <p className="mt-6 text-sm font-semibold text-neutral-400">Alperen KOYUNCU, Derin ZÜLFÜKAR, Ömer Asaf KARABACAK</p>
                    </div>

                    <h3 className="text-2xl font-bold border-b pb-2 mb-4">Problem Cümlesi</h3>
                    <p className="text-lg leading-relaxed mb-8">
                      Boncuk oyaları sadece süsleme amacıyla mı yapılmaktadır, yoksa Anadolu kültüründe duygu ve düşünceleri ifade eden bir iletişim aracı mıdır?
                    </p>

                    <h3 className="text-2xl font-bold border-b pb-2 mb-4">Hipotez</h3>
                    <p className="text-lg leading-relaxed mb-8">
                      Anadolu’da yapılan boncuk oyalarının yalnızca estetik bir süsleme unsuru olmadığı, motif ve renkleri aracılığıyla kültürel anlamlar taşıyan bir iletişim biçimi olduğu düşünülmektedir.
                    </p>

                    <h3 className="text-2xl font-bold border-b pb-2 mb-4">Bulgular</h3>
                    <p className="text-lg leading-relaxed mb-4">
                      Araştırma sürecinde elde edilen veriler, boncuk oyalarının Anadolu kültüründe yalnızca estetik bir süsleme unsuru olarak değil, aynı zamanda anlam taşıyan bir kültürel ifade biçimi olarak kullanıldığını göstermektedir. İncelenen kaynaklar ve örnek motifler doğrultusunda aşağıdaki bulgulara ulaşılmıştır:
                    </p>
                    <ul className="space-y-4 text-lg leading-relaxed list-disc pl-6 text-neutral-600">
                      <li><strong>Bölgesel Etkiler:</strong> Anadolu’nun farklı bölgelerinde yapılan boncuk oyalarının motif, renk ve biçim özelliklerinin bölgenin kültürel yapısı, yaşam biçimi ve doğa koşullarıyla ilişki gösterdiği görülmüştür. Bu durum, oyaların yerel kültürün bir yansıması olduğunu ortaya koymaktadır.</li>
                      <li><strong>Doğa Temelli Motifler:</strong> Boncuk oyalarında en sık rastlanan motiflerin bitki ve doğa temelli olduğu belirlenmiştir. Çiçek, yaprak, dal ve çeşitli geometrik şekillerden oluşan bu motiflerin çoğu doğadan esinlenerek oluşturulmuştur.</li>
                      <li><strong>Sembolik Anlamlar:</strong> Araştırma sırasında bazı oya motiflerinin belirli sembolik anlamlar taşıdığı tespit edilmiştir. Örneğin gül motifinin sevgi ve zarafeti, zeytin dalı motifinin barış ve bereketi, nazar boncuğu motifinin ise korunma ve nazardan sakınma inancını temsil ettiği görülmüştür.</li>
                      <li><strong>İletişim Aracı:</strong> Boncuk oyalarının geçmiş dönemlerde kadınlar arasında dolaylı bir iletişim aracı olarak da kullanıldığı anlaşılmaktadır. Özellikle yazma kenarlarına yapılan oyaların, kişinin ruh hâlini, sosyal durumunu veya çevresine iletmek istediği mesajları yansıtabildiği ifade edilmektedir.</li>
                      <li><strong>Günümüzdeki Yeri:</strong> Günümüzde boncuk oyalarının kullanım alanının kısmen değiştiği, ancak geleneksel el sanatı olarak varlığını sürdürdüğü görülmektedir. Bu oyalar hem günlük kullanımda hem de kültürel mirasın korunmasına yönelik çalışmalarda yer almaktadır.</li>
                      <li><strong>Kültürel Derinlik:</strong> Elde edilen bulgular, boncuk oyalarının Anadolu kültüründe estetik değerinin yanında toplumsal ve kültürel anlamlar taşıyan önemli bir el sanatı ürünü olduğunu ortaya koymaktadır.</li>
                    </ul>
                  </>
                )}

                {infoModal === 'detay' && (
                  <>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-rose-600 mb-8 text-center">Proje Detay Raporu</h1>
                    
                    <h3 className="text-2xl font-bold border-b pb-2 mb-4 text-orange-600">Özet</h3>
                    <p className="text-lg leading-relaxed mb-8">
                      Bu araştırmada Anadolu’nun geleneksel el sanatları arasında önemli bir yere sahip olan boncuk oyalarının yalnızca estetik bir süsleme unsuru olup olmadığı ve bu oyaların kültürel anlamlar taşıyıp taşımadığı incelenmiştir. Çalışmanın temel amacı, boncuk oyalarında kullanılan motif ve renklerin hangi anlamları ifade ettiğini araştırmak ve bu el sanatının kültürel iletişim açısından taşıdığı değeri ortaya koymaktır.
                      <br /><br />
                      Araştırma sürecinde boncuk oyalarıyla ilgili yazılı kaynaklar incelenmiş, farklı bölgelerde kullanılan oya motifleri hakkında bilgiler toplanmış ve bu motiflerin taşıdığı sembolik anlamlar değerlendirilmiştir. Elde edilen veriler doğrultusunda, boncuk oyalarının Anadolu kültüründe yalnızca süsleme amacıyla yapılmadığı; aynı zamanda bireylerin duygu ve düşüncelerini dolaylı biçimde ifade etmelerine olanak sağlayan bir iletişim aracı olarak da kullanıldığı anlaşılmıştır. Özellikle çiçek, yaprak ve çeşitli geometrik şekillerden oluşan motiflerin çoğunlukla doğadan esinlenerek oluşturulduğu ve bazı motiflerin belirli duyguları ya da inançları temsil ettiği görülmüştür.
                      <br /><br />
                      Araştırma sonuçları, boncuk oyalarının kültürel birikimin ve geleneksel yaşam biçiminin önemli bir yansıması olduğunu göstermektedir. Günümüzde kullanım alanı kısmen değişmiş olsa da boncuk oyaları, Anadolu’da geleneksel el sanatları içinde varlığını sürdürmekte ve kültürel mirasın gelecek kuşaklara aktarılmasında önemli bir rol oynamaktadır. Bu çalışma ile boncuk oyalarının estetik değerinin yanı sıra kültürel ve toplumsal anlamlarının da vurgulanması amaçlanmıştır.
                    </p>

                    <h3 className="text-2xl font-bold border-b pb-2 mb-4 text-orange-600">Giriş</h3>
                    <p className="text-lg leading-relaxed mb-8">
                      Anadolu’da el sanatları kültürün önemli bir parçasıdır. Boncuk oyaları da geleneksel el sanatları arasında yer almaktadır. Geçmişte kadınlar yaptıkları oyalar aracılığıyla mutluluk, üzüntü, sevgi gibi duygularını ifade etmişlerdir. Bu nedenle boncuk oyaları sadece süsleme amacı taşımamakta, aynı zamanda kültürel bir iletişim aracı olarak da kullanılmaktadır. Bu proje ile boncuk oyalarının taşıdığı anlamların araştırılması amaçlanmıştır.
                    </p>

                    <h3 className="text-2xl font-bold border-b pb-2 mb-4 text-orange-600">Yöntem</h3>
                    <p className="text-lg leading-relaxed mb-8">
                      Bu araştırmada nitel araştırma yöntemlerinden <strong>doküman incelemesi ve gözlem yöntemi</strong> kullanılmıştır. Araştırma sürecinde öncelikle boncuk oyaları ve Anadolu’daki geleneksel el sanatları hakkında bilgi edinmek amacıyla ilgili kitaplar, makaleler ve güvenilir internet kaynakları incelenmiştir. Bu kaynaklarda boncuk oyalarının tarihsel gelişimi, kullanım alanları ve motiflerin taşıdığı anlamlara ilişkin bilgiler toplanmıştır.
                      <br /><br />
                      Araştırmanın bir diğer aşamasında farklı oya örnekleri incelenmiş ve bu oyaların motif, renk ve biçim özellikleri belirlenmiştir. İncelenen motifler sınıflandırılarak benzer özellik gösteren motifler bir araya getirilmiş ve hangi temalardan esinlenildiği değerlendirilmiştir. Bu süreçte özellikle doğa temelli motiflerin (çiçek, yaprak, dal gibi) ve nazar, bereket gibi sembolik anlamlar taşıyan motiflerin daha sık kullanıldığı gözlemlenmiştir.
                      <br /><br />
                      Elde edilen bilgiler karşılaştırma yöntemiyle değerlendirilmiş ve motiflerin kültürel anlamları belirlenmeye çalışılmıştır. Araştırma sürecinde ulaşılan veriler düzenlenerek yorumlanmış ve boncuk oyalarının yalnızca estetik bir süsleme unsuru olmadığı, aynı zamanda kültürel bir ifade biçimi olarak da değerlendirilebileceği sonucuna ulaşılmıştır.
                      <br /><br />
                      Bu yöntem sayesinde boncuk oyalarının motif özellikleri ve taşıdığı sembolik anlamlar hakkında genel bir değerlendirme yapılması amaçlanmıştır.
                    </p>

                    <h3 className="text-2xl font-bold border-b pb-2 mb-4 text-orange-600">Sonuç ve Tartışma</h3>
                    <p className="text-lg leading-relaxed mb-8">
                      Araştırma sonucunda boncuk oyalarının yalnızca süsleme amacıyla yapılmadığı, aynı zamanda kültürel anlamlar taşıdığı görülmüştür. Oyaların motifleri ve renkleri çeşitli mesajlar ifade etmektedir. Bu durum boncuk oyalarının Anadolu kültüründe önemli bir yere sahip olduğunu göstermektedir. Geleneksel el sanatlarının korunması ve gelecek nesillere aktarılması büyük önem taşımaktadır.
                    </p>

                    <h3 className="text-2xl font-bold border-b pb-2 mb-4 text-orange-600">Öneriler</h3>
                    <p className="text-lg leading-relaxed mb-8">
                      Proje, VR gözlük ile Türkiye’nin yedi bölgesini videolu ve görselli şekilde sunarak öğrenmeyi daha etkileşimli hâle getirmektedir. İçeriklerin eğitim ve öğretim materyali olarak kullanılması, öğrencilerin coğrafi, kültürel ve tarihsel farkındalığını artırabilir. Projenin interaktif ögelerle desteklenmesi, farklı VR cihazlarıyla uyumlu tasarlanması ve kullanıcı geri bildirimleriyle sürekli geliştirilmesi önerilmektedir. Ayrıca akademik kurum ve kültürel kuruluşlarla işbirliği yapılarak içeriklerin doğruluğu ve zenginliği güçlendirilebilir.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                      <div>
                        <h3 className="text-2xl font-bold border-b pb-2 mb-4 text-orange-600">Teşekkür</h3>
                        <p className="text-base leading-relaxed text-neutral-600 italic">
                          Bu çalışmanın hazırlanmasında desteklerini esirgemeyen değerli öğretmenlerimize, danışmanımıza ve araştırma sürecinde bilgi ve kaynak paylaşımında bulunan tüm kişi ve kurumlara teşekkür ederiz. Ayrıca projenin gerçekleştirilmesine katkı sağlayan ailelerimize ve arkadaşlarımıza göstermiş oldukları anlayış ve sabır için şükranlarımızı sunarız.
                        </p>
                      </div>
                      
                      <div className="bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                        <h3 className="text-xl font-bold border-b pb-2 mb-4 text-neutral-800">Kaynaklar</h3>
                        <ul className="space-y-2 text-sm text-neutral-500 break-words list-disc pl-4">
                          <li>Adana Olgunlaştırma Enstitüsü Öğretim Görevlisi Meral ALTINKAYA</li>
                          <li>Prof. Dr. ONUK, Tacisel (2005) Osmalıdan Günümüze Oyalar (sf:4,5,174)</li>
                          <li>Akpınarlı, H. Feriha: "El Örgüsü Çoraplarda Teknik Desen Renk ve Kullanım Özellikleri", Ankara: G.Ü. Sosyal Bilimler Enstitüsü</li>
                          <li>Akpınarlı, H. Feriha: "Kahramanmaraş Oyaları" Kültür ve Sanat Dergisi, İş Bankası Yayınları</li>
                          <li>Bayra, Muammer: "İğne Oyası Teknikleri ve Kastamonu İğne Oyaları". Ankara 1992.</li>
                          <li>Eronç, Perihan: Giyim Süsleme Teknikleri. İstanbul 1984.</li>
                          <li>Onuk, Taciser: İğne Oyaları Türkiye İş Bankası Yayınları. Ankara 1988.</li>
                          <li>Özel Web Kaynağı: boncukoyasi.com, ŞENOL, Sevgi</li>
                        </ul>
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

              <div className="pt-10 sm:pt-12 px-6 sm:px-8 shrink-0 flex items-center gap-4">
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

              <div className="p-6 sm:p-8 flex flex-col gap-8">
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-neutral-300 text-lg leading-relaxed mb-4 text-justify"
                >
                  {activeData.text}
                </motion.p>

                {activeData.oyalar && activeData.oyalar.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2"
                  >
                    {activeData.oyalar.map((oya, idx) => (
                      <div key={idx} className="bg-neutral-800/50 border border-neutral-700 p-5 rounded-2xl">
                        <h4 className="text-white font-semibold text-lg mb-2 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activeData.color }}></div>
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
