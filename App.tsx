import React, { useState, useEffect, useRef } from 'react';
import { SectionTitle } from './components/SectionTitle';
import { RelationshipCard } from './components/RelationshipCard';
import { LoadingScreen } from './components/LoadingScreen';
import { RelationshipStatus, CharacterProfile } from './types';
import { Crown, User, Feather, Lock, Key, Image as ImageIcon, Volume2, VolumeX, ChevronDown, ChevronUp } from 'lucide-react';

const character: CharacterProfile = {
  name: '에티엔',
  fullName: 'Étienne de Navarre-Valois',
  age: 21,
  height: '187cm',
  birthday: '4월 16일',
  personality: ['과묵함', '냉철함', '행동주의'],
  role: '발루아의 부군'
};

const npc = {
  name: '앙리 랜스',
  role: '발루아 가문의 집사',
  description: '능숙하며, 농담 섞인 조언을 건네는 충직한 집사. 에티엔의 몇 안 되는 이해자이기도 하다.'
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [oathName, setOathName] = useState('');
  const [interactionPhase, setInteractionPhase] = useState<'initial' | 'burning' | 'revealed'>('initial');
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [secretCode, setSecretCode] = useState('');
  const [isSecretUnlocked, setIsSecretUnlocked] = useState(false);
  
  // Audio State
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Loading timer
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      if (!loading && audioRef.current.paused) {
          const playPromise = audioRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(error => console.log("Autoplay prevented"));
          }
      }
    }
  }, [volume, isMuted, loading]);

  const handleSignOath = () => {
    if (!oathName.trim()) return;
    setInteractionPhase('burning');
    setTimeout(() => {
      setInteractionPhase('revealed');
      setIsDarkTheme(true); // Switch to dark theme after burning
    }, 2800);
  };

  const checkSecretCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSecretCode(val);
    if (val === '0416') {
      setIsSecretUnlocked(true);
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`min-h-screen overflow-x-hidden selection:bg-blood-red selection:text-white transition-colors duration-[2000ms] ${isDarkTheme ? 'dark bg-dark-paper' : 'bg-parchment-bg'}`}>
      
      {/* Texture Overlays handled in global CSS, but here are the structural elements */}
      <div className="texture-overlay"></div>
      <div className="vignette-overlay"></div>

      {/* Background Audio */}
      <audio 
        ref={audioRef} 
        loop 
        src="https://cdn.pixabay.com/download/audio/2022/10/25/audio_5502a35602.mp3" 
      />

      {/* Audio Controls - Styled Larger and Top Right */}
      <div className="fixed top-6 right-6 z-[60] flex items-center gap-3 bg-[#f0e6d2]/80 dark:bg-[#1a110d]/80 px-4 py-2 rounded-lg border border-stone-300 dark:border-stone-700 shadow-xl backdrop-blur-md transition-all duration-500 hover:opacity-100 opacity-80">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="text-royal-red hover:text-blood-red dark:text-red-500 transition-colors"
        >
          {isMuted || volume === 0 ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-32 h-1.5 bg-stone-300 dark:bg-stone-600 rounded-lg appearance-none cursor-pointer accent-royal-red dark:accent-red-700"
        />
      </div>

      {/* Navigation Bar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-[#f0e6d2]/90 dark:bg-[#1a110d]/90 border-b border-stone-300 dark:border-stone-800 py-3 backdrop-blur-md shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-start pl-6 md:justify-center items-center">
          <span className="text-royal-red dark:text-red-800 font-bold text-xl tracking-widest uppercase font-serif drop-shadow-sm border-b-2 border-transparent hover:border-royal-red transition-all cursor-pointer">
            Navarre-Valois
          </span>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="hero" className="relative h-[100vh] flex items-center justify-center overflow-hidden border-b-4 border-double border-stone-400 dark:border-stone-800 transition-colors duration-[2000ms]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/id/1056/800/1200" 
            alt="Atmospheric Background" 
            className="w-full h-full object-cover filter sepia brightness-[0.4] contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f0e6d2]/60 via-transparent to-[#f0e6d2] dark:from-[#1a110d]/80 dark:to-[#1a110d] transition-colors duration-[2000ms]"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-60 mix-blend-overlay"></div>
        </div>

        <div className="container relative z-10 px-6 text-center flex flex-col items-center">
          <p className="text-blood-red dark:text-red-400 tracking-[0.3em] text-sm md:text-base mb-6 font-bold uppercase animate-[fadeInDown_1s_ease-out] bg-white/30 dark:bg-black/30 backdrop-blur-sm px-4 py-1 rounded-sm border border-white/20 dark:border-white/10">
            16th Century France • St. Bartholomew's Day Massacre
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-ink dark:text-[#d6cbbc] mb-4 leading-tight drop-shadow-lg animate-[fadeInUp_1.2s_ease-out] transition-colors duration-[2000ms]">
            피로 물든 신부 <br />
            <span className="text-blood-red dark:text-red-700 italic font-serif">La Mariée</span>
          </h1>
          <p className="max-w-xl mx-auto text-stone-900 dark:text-stone-400 text-lg md:text-xl font-medium mb-12 leading-relaxed animate-[fadeInUp_1.5s_ease-out_0.3s_both] text-shadow-sm transition-colors duration-[2000ms]">
            "나를 용서할 필요는 없습니다. 단념하는 건 익숙하니까."
          </p>
          
          <div className="animate-[fadeInUp_1.5s_ease-out_0.6s_both]">
             <div className="w-[2px] h-24 bg-gradient-to-b from-blood-red to-transparent mx-auto"></div>
          </div>
        </div>

        <button 
          onClick={() => scrollToSection('story')}
          className="absolute bottom-8 text-stone-600 dark:text-stone-400 animate-bounce-slow hover:text-royal-red transition-colors"
        >
          <ChevronDown size={32} />
        </button>
      </header>

      {/* Story & Context Section */}
      <section id="story" className="py-24 relative min-h-screen flex flex-col justify-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <SectionTitle title="Preview" subtitle="증오와 연민 사이에서" />
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 font-serif text-lg text-ink dark:text-stone-300 leading-loose text-justify transition-colors duration-1000">
              <p>
                <strong className="text-blood-red dark:text-red-500 font-bold text-xl block mb-2 border-b border-stone-300 dark:border-stone-700 pb-2 inline-block">1572년 프랑스, 격변의 순간.</strong></p>
              <p>
                가문이 이단이라는 명목으로 몰살당했습니다. <br />
                학살을 지휘한 자는 다름 아닌<br /> 당신의 정략혼 상대, <span className="text-royal-red dark:text-red-400 font-bold">에티엔</span>입니다.
              </p>
              <p>
                그는 굳이 변명하지 않습니다. <br />
                묵묵히 피 묻은 손을 당신에게 내밀 뿐.
              </p>
              <div className="p-8 border-y-2 border-double border-stone-400 dark:border-stone-600 bg-white/20 dark:bg-black/20 italic text-stone-800 dark:text-stone-400 font-bold text-center shadow-inner transition-colors duration-1000">
                "당신이 내 심장에 칼을 꽂는다 해도,<br/>결혼식은 예정대로 진행될테니까."
              </div>
            </div>
            
            <div className="relative h-[450px] bg-stone-200 dark:bg-stone-800 p-2 shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
               <div className="absolute inset-0 border border-stone-400 dark:border-stone-600 m-2 pointer-events-none z-20"></div>
               <img 
                src="https://picsum.photos/id/1050/600/800" 
                alt="Sword and Rose" 
                className="w-full h-full object-cover filter sepia-[0.6] contrast-125 hover:sepia-0 transition-all duration-700" 
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/80 dark:bg-black/80 backdrop-blur-sm p-4 text-center border border-stone-300 dark:border-stone-700 transition-colors duration-1000">
                <span className="block text-blood-red dark:text-red-400 text-xs uppercase tracking-widest mb-1">Dilemma</span>
                <span className="font-serif font-bold text-ink dark:text-stone-200">원망, 때로는 구원</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <button 
            onClick={() => scrollToSection('characters')}
            className="text-stone-600 dark:text-stone-400 animate-bounce-slow hover:text-royal-red transition-colors"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </section>

      {/* Characters Section */}
      <section id="characters" className="py-24 bg-parchment-paper/30 dark:bg-black/20 border-y border-stone-300 dark:border-stone-800 transition-colors duration-[2000ms]">
        <div className="container mx-auto px-6 max-w-5xl">
          <SectionTitle title="Dramatis Personae" subtitle="운명의 소용돌이 위에 선 자들" />

          {/* Étienne */}
          <div className="flex flex-col md:flex-row gap-10 items-stretch bg-white/40 dark:bg-black/40 p-1 shadow-lg mb-16 border border-stone-300/60 dark:border-stone-700/50 backdrop-blur-sm transition-colors duration-1000">
            <div className="w-full md:w-5/12 min-h-[400px] relative bg-stone-300 overflow-hidden group">
               <img 
                src="https://picsum.photos/seed/etienne/600/900" 
                alt="Étienne" 
                className="w-full h-full object-cover filter grayscale contrast-125 sepia-[0.3] group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute top-4 left-4 p-2 bg-white/80 dark:bg-black/80 backdrop-blur-sm rounded-full shadow-md">
                 <Crown className="w-6 h-6 text-gold-dark" />
              </div>
            </div>

            <div className="w-full md:w-7/12 p-8 md:p-12 flex flex-col justify-center border-l border-stone-300/50 dark:border-stone-700/50">
              <h3 className="text-4xl font-serif text-royal-red dark:text-red-700 mb-1 font-bold transition-colors duration-1000">{character.name}</h3>
              <p className="text-stone-600 dark:text-stone-400 uppercase tracking-widest text-sm mb-8 border-b border-stone-300 dark:border-stone-700 pb-4 transition-colors duration-1000">{character.fullName}</p>
              
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-10 text-stone-800 dark:text-stone-300 transition-colors duration-1000">
                <div className="pl-4 border-l-2 border-blood-red/30 dark:border-red-900/50">
                  <span className="block text-xs text-stone-500 uppercase tracking-wider mb-1">Age</span>
                  <span className="text-xl">{character.age}세</span>
                </div>
                <div className="pl-4 border-l-2 border-blood-red/30 dark:border-red-900/50">
                  <span className="block text-xs text-stone-500 uppercase tracking-wider mb-1">Height</span>
                  <span className="text-xl">{character.height}</span>
                </div>
                <div className="pl-4 border-l-2 border-blood-red/30 dark:border-red-900/50">
                  <span className="block text-xs text-stone-500 uppercase tracking-wider mb-1">Birthday</span>
                  <span className="text-xl">{character.birthday}</span>
                </div>
                <div className="pl-4 border-l-2 border-blood-red/30 dark:border-red-900/50">
                  <span className="block text-xs text-stone-500 uppercase tracking-wider mb-1">Role</span>
                  <span className="text-xl">{character.role}</span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-stone-500 text-sm uppercase tracking-wider">Personality Traits</p>
                <div className="flex flex-wrap gap-2">
                  {character.personality.map((trait, idx) => (
                    <span key={idx} className="px-3 py-1 bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-300 text-sm border border-stone-300 dark:border-stone-600 hover:border-blood-red transition-colors cursor-default">
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Henri Lance */}
          <div className="flex flex-col md:flex-row-reverse gap-8 items-center bg-white/40 dark:bg-black/40 p-6 shadow-md border border-stone-300/50 dark:border-stone-700/50 backdrop-blur-sm transition-colors duration-1000">
            <div className="w-full md:w-1/4 aspect-square relative bg-stone-300 overflow-hidden rounded-full border-4 border-stone-200 dark:border-stone-700 shadow-inner">
               <img 
                src="https://picsum.photos/seed/henri/400/400" 
                alt="Henri" 
                className="w-full h-full object-cover filter sepia-[0.4]"
              />
            </div>
            <div className="w-full md:w-3/4 text-center md:text-right text-stone-700 dark:text-stone-300 transition-colors duration-1000">
              <div className="flex items-center justify-center md:justify-end gap-3 mb-2">
                <h3 className="text-2xl font-serif text-ink dark:text-stone-200 font-bold">{npc.name}</h3>
                <User className="w-5 h-5 text-stone-500" />
              </div>
              <p className="text-blood-red dark:text-red-400 text-sm uppercase tracking-wider mb-4">{npc.role}</p>
              <p className="leading-relaxed font-serif">
                "{npc.description}"
              </p>
            </div>
          </div>

        </div>
        <div className="flex justify-center mt-12">
          <button 
            onClick={() => scrollToSection('relationships')}
            className="text-stone-600 dark:text-stone-400 animate-bounce-slow hover:text-royal-red transition-colors"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </section>

      {/* Relationship System */}
      <section id="relationships" className="py-24 min-h-screen flex flex-col justify-center">
        <div className="container mx-auto px-6 max-w-6xl">
          <SectionTitle title="Relationship Dynamics" subtitle="상호작용에 따른 변화" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RelationshipCard 
              status={RelationshipStatus.RUIN}
              icon="❄️"
              title="Ruin"
              description="파국, 파멸, 단절
              차라리 죽음이 자비로울 관계."
              color="stone-500"
            />
             <RelationshipCard 
              status={RelationshipStatus.WARY}
              icon="🥀"
              title="Wary"
              description="어색함과 경계심
              가시 돋친 장미처럼 위태로운 거리."
              color="rose-900"
            />
             <RelationshipCard 
              status={RelationshipStatus.OPEN}
              icon="🌹"
              title="Bloom"
              description="대화의 시작
              상흔 너머로 보이는 희미한 개선."
              color="rose-600"
            />
             <RelationshipCard 
              status={RelationshipStatus.TRUST}
              icon="💐"
              title="Trust"
              description="완전한 신뢰와 애정
              피로 씻어낸 구원의 서약."
              color="gold-accent"
            />
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <button 
            onClick={() => scrollToSection('vow')}
            className="text-stone-600 dark:text-stone-400 animate-bounce-slow hover:text-royal-red transition-colors"
          >
            <ChevronDown size={32} />
          </button>
        </div>
      </section>

      {/* Interactive Vow Section */}
      <section id="vow" className="py-32 relative flex items-center justify-center min-h-[80vh]">
        <div className="absolute inset-0 bg-stone-900/5 dark:bg-black/20 z-0 pointer-events-none transition-colors duration-1000"></div>

        <div className="container max-w-4xl relative z-10 px-6">
          
          {interactionPhase === 'initial' && (
            <div className="bg-[#fdfbf7] p-8 md:p-16 shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-stone-200 relative mx-auto max-w-2xl transform rotate-1 transition-all duration-500">
              <div className="absolute inset-4 border-2 border-stone-300 pointer-events-none"></div>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#fdfbf7] px-4 text-blood-red font-bold tracking-widest uppercase text-sm z-10">
                Marriage Vow
              </div>

              <div className="text-center font-serif space-y-8">
                <p className="text-stone-500 italic text-sm">God's eye is upon us.</p>
                
                <h2 className="text-3xl md:text-4xl text-ink font-bold leading-relaxed">
                  "나 <input 
                    type="text" 
                    value={oathName}
                    onChange={(e) => setOathName(e.target.value)}
                    placeholder="이름"
                    className="bg-transparent border-b-2 border-stone-400 text-center w-32 focus:outline-none focus:border-blood-red text-blood-red font-bold placeholder:text-stone-300"
                  /> 은(는)<br/>
                  에티엔 드 발루아와의<br/>
                  서약을 맹세합니다."
                </h2>

                <p className="text-stone-600 leading-loose px-4 md:px-12 text-sm md:text-base">
                  이 서약은 피와 맹세으로 쓰여졌으며,<br/>
                  죽음조차 우리를 갈라둘 수 없을 것입니다.<br/>
                  증오조차 당신의 마음을 씻어내릴 수 없음을 알기에.
                </p>

                <div className="pt-8">
                  <button 
                    onClick={handleSignOath}
                    disabled={!oathName}
                    className="group relative inline-flex items-center gap-3 px-8 py-3 bg-transparent text-blood-red border border-blood-red hover:bg-blood-red hover:text-white transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Feather className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    <span className="font-serif tracking-widest font-bold">맹세하기</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {interactionPhase === 'burning' && (
             <div className="bg-[#fdfbf7] p-8 md:p-16 shadow-2xl border border-stone-200 relative mx-auto max-w-2xl animate-burn-out origin-center">
                {/* Enhanced Fire Effects */}
                <div className="absolute inset-0 bg-orange-600/30 mix-blend-color-burn animate-fire-glow rounded-lg pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-50 mix-blend-overlay"></div>
                <div className="absolute inset-0 border-[120px] border-orange-900/10 blur-md pointer-events-none"></div>
                
                <div className="text-center font-serif space-y-8 blur-[1px] relative z-10">
                  <h2 className="text-3xl md:text-4xl text-ink font-bold leading-relaxed text-red-950">
                    Vous avez prêté serment...
                  </h2>
                </div>
             </div>
          )}

          {interactionPhase === 'revealed' && (
            <div className="animate-fade-in w-full">
              <SectionTitle title="The Hidden focus" subtitle="시체 속에 파묻힌" />
              
              {/* Album Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white dark:bg-stone-800 p-3 shadow-md rotate-1 hover:rotate-0 transition-all duration-300">
                    <div className="aspect-[3/4] bg-stone-200 overflow-hidden border border-stone-100 dark:border-stone-700 relative group">
                      <img 
                        src={`https://picsum.photos/seed/memory${i}/400/600`} 
                        alt={`Memory ${i}`}
                        className="w-full h-full object-cover filter sepia brightness-90 hover:sepia-0 transition-all duration-700"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <ImageIcon className="text-white w-8 h-8 drop-shadow-lg" />
                      </div>
                    </div>
                    <p className="text-center text-xs text-stone-500 dark:text-stone-400 mt-2 font-serif italic">Memory fragment #{i}</p>
                  </div>
                ))}
              </div>

              {/* Secret Document */}
              <div className="max-w-2xl mx-auto bg-white dark:bg-stone-900/80 p-8 md:p-12 shadow-[0_0_20px_rgba(0,0,0,0.1)] border border-stone-200 dark:border-stone-700 relative backdrop-blur-sm transition-colors duration-1000">
                {!isSecretUnlocked ? (
                  <div className="text-center py-12">
                    <Lock className="w-12 h-12 text-stone-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-ink dark:text-stone-200 mb-6 transition-colors">서랍 속 비밀</h3>
                    <p className="text-stone-500 dark:text-stone-400 mb-8 text-sm">그에게 있어 가장 의미 있는 날짜.</p>
                    <div className="flex justify-center items-center gap-4">
                      <input 
                        type="password" 
                        maxLength={4}
                        placeholder="MMDD"
                        className="bg-stone-100 dark:bg-stone-800 border border-stone-300 dark:border-stone-600 px-4 py-2 text-center text-xl tracking-[0.5em] w-48 focus:outline-none focus:border-gold-dark text-stone-800 dark:text-stone-200 transition-colors font-serif"
                        onChange={checkSecretCode}
                      />
                    </div>
                    {secretCode.length === 4 && secretCode !== '0415' && (
                       <p className="text-red-500 text-xs mt-4 animate-pulse">잘못된 날짜입니다.</p>
                    )}
                  </div>
                ) : (
                  <div className="animate-fade-in">
                    <div className="flex justify-between items-start mb-8 border-b border-stone-300 dark:border-stone-700 pb-4">
                      <span className="text-xs text-stone-400 uppercase tracking-widest">Secret Agreement</span>
                      <Key className="w-5 h-5 text-gold-dark" />
                    </div>
                    
                    <div className="font-serif leading-loose text-ink dark:text-stone-300 space-y-6 transition-colors duration-1000">
                      <p className="text-right italic text-sm text-stone-500">1572년 7월 24일</p>
                      <h4 className="text-xl font-bold text-center mb-8">이면 계약서</h4>
                      <p>
                        나, 에티엔 드 발루아는 <br /> 왕실의 명을 수행함에 있어 다음의 한 가지 조건을 요구한다.
                      </p>
                      <p>
                        위그노 처형을 집행하는 대가로, 내 약혼자의 절대적인 신변을 보장받는다.
                      </p>
                      <p className="font-bold text-blood-red dark:text-red-400 pl-4 border-l-4 border-blood-red bg-red-50 dark:bg-red-900/20 py-2">
                        "이 학살에서 그 사람만은 유일한 생존자로서 살아남아야 한다.<br/>
                        그것이 내가 검을 드는 유일한 이유다."
                      </p>
                      <div className="mt-12 flex justify-end">
                        <div className="text-center">
                          <img src="https://raw.githubusercontent.com/dddyod/U/refs/heads/main/1.png" className="h-14 opacity-90 mb-3 filter sepia dark:invert mx-auto" alt="signature" />
                          <span className="text-sm border-t border-stone-400 pt-1 block px-5">Étienne</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-100 dark:bg-black/50 pt-16 pb-8 border-t border-stone-300 dark:border-stone-900 mt-12 transition-colors duration-[2000ms]">
        <div className="container mx-auto px-6 text-center relative">
          <button 
            onClick={() => scrollToSection('hero')}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-stone-200 dark:bg-stone-800 p-2 rounded-full text-stone-600 dark:text-stone-400 hover:text-royal-red hover:bg-stone-300 dark:hover:bg-stone-700 transition-colors shadow-lg"
          >
            <ChevronUp size={24} />
          </button>
          
          <div className="mb-8">
            <span className="text-2xl font-serif text-stone-400 font-bold">Navarre-Valois</span>
          </div>
          <p className="text-stone-500 text-xs">
            © 2026 신부 La Mariée.<br/>
            All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;