import { useState, useEffect, Fragment } from 'react';
import {
  periodicTable,
  mixableElements,
  validCompounds,
  theoryTopics,
  bondTypes,
  atomStructure,
  achievements,
  levels,
  dailyChallenges,
  labAssistantPhrases,
  baseCards,
  mixPhrases,
  quizQuestions,
  type Element,
  type MixableElement,
  type Compound,
  type Achievement,
} from './data/chemistry';

interface MatchCard {
  id: number;
  symbol: string;
  name: string;
  emoji: string;
  color: string;
  uid: number;
}

interface DailyProgress {
  mix: number;
  quiz: number;
  study: number;
  memory: number;
}

interface LastResult {
  success: boolean;
  compound?: Compound;
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);
  
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizTime, setQuizTime] = useState(0);
  const [quizTimerRunning, setQuizTimerRunning] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const [selectedElements, setSelectedElements] = useState<MixableElement[]>([]);
  const [gameScore, setGameScore] = useState(0);
  const [createdCompounds, setCreatedCompounds] = useState<Compound[]>([]);
  const [lastResult, setLastResult] = useState<LastResult | null>(null);
  const [isMixing, setIsMixing] = useState(false);
  const [mixProgress, setMixProgress] = useState(0);
  const [showMixPhrase, setShowMixPhrase] = useState('');
  
  const [totalScore, setTotalScore] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [studiedElements, setStudiedElements] = useState<number[]>([]);
  const [showAchievement, setShowAchievement] = useState<Achievement | null>(null);
  const [streak, setStreak] = useState(0);
  
  const [showParticles, setShowParticles] = useState(false);
  const [particleColor, setParticleColor] = useState('');
  
  const [matchCards, setMatchCards] = useState<MatchCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [matchMoves, setMatchMoves] = useState(0);
  const [matchScore, setMatchScore] = useState(0);
  
  const [dailyProgress, setDailyProgress] = useState<DailyProgress>({ mix: 0, quiz: 0, study: 0, memory: 0 });
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [loginStreak, setLoginStreak] = useState(1);
  const [lastLogin, setLastLogin] = useState('');
  
  const [showLabAssistant, setShowLabAssistant] = useState(true);
  const [assistantMessage, setAssistantMessage] = useState(labAssistantPhrases.greeting[0]);
  const [showCertificate, setShowCertificate] = useState(false);
  const [earnedCertificates, setEarnedCertificates] = useState<string[]>([]);
  const [learnedBonds, setLearnedBonds] = useState<string[]>([]);

  const shuffleMatchCards = () => {
    const doubled = baseCards.flatMap(c => [{ ...c, uid: Math.random() }, { ...c, uid: Math.random() }]);
    setMatchCards(doubled.sort(() => Math.random() - 0.5));
  };

  useEffect(() => {
    const saved = localStorage.getItem('chemistryLessonsV3');
    if (saved) {
      const data = JSON.parse(saved);
      setTotalScore(data.totalScore || 0);
      setUnlockedAchievements(data.unlockedAchievements || []);
      setStudiedElements(data.studiedElements || []);
      setGameScore(data.gameScore || 0);
      setCreatedCompounds(data.createdCompounds || []);
      setMatchScore(data.matchScore || 0);
      setStreak(data.streak || 0);
      setDailyProgress(data.dailyProgress || { mix: 0, quiz: 0, study: 0, memory: 0 });
      setCompletedChallenges(data.completedChallenges || []);
      setLoginStreak(data.loginStreak || 1);
      setLastLogin(data.lastLogin || '');
      setEarnedCertificates(data.earnedCertificates || []);
      setLearnedBonds(data.learnedBonds || []);
      
      const today = new Date().toDateString();
      if (data.lastLogin !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (data.lastLogin === yesterday.toDateString()) {
          setLoginStreak(prev => prev + 1);
        } else {
          setLoginStreak(1);
        }
        setDailyProgress({ mix: 0, quiz: 0, study: 0, memory: 0 });
        setCompletedChallenges([]);
        setLastLogin(today);
      }
    } else {
      setLastLogin(new Date().toDateString());
    }
    shuffleMatchCards();
    setAssistantMessage(labAssistantPhrases.greeting[Math.floor(Math.random() * labAssistantPhrases.greeting.length)]);
  }, []);

  useEffect(() => {
    localStorage.setItem('chemistryLessonsV3', JSON.stringify({
      totalScore, unlockedAchievements, studiedElements, gameScore, createdCompounds, 
      matchScore, streak, dailyProgress, completedChallenges, loginStreak, lastLogin, earnedCertificates, learnedBonds
    }));
  }, [totalScore, unlockedAchievements, studiedElements, gameScore, createdCompounds, matchScore, streak, dailyProgress, completedChallenges, loginStreak, lastLogin, earnedCertificates, learnedBonds]);

  useEffect(() => {
    const check = (ach: Achievement, cond: boolean) => {
      if (cond && !unlockedAchievements.includes(ach.id)) {
        setUnlockedAchievements([...unlockedAchievements, ach.id]);
        setShowAchievement(ach);
        setTotalScore(prev => prev + 15);
        setAssistantMessage(labAssistantPhrases.celebration[Math.floor(Math.random() * labAssistantPhrases.celebration.length)]);
        setTimeout(() => setShowAchievement(null), 4000);
        
        if (ach.id === 'all_compounds' && !earnedCertificates.includes('master')) {
          setEarnedCertificates([...earnedCertificates, 'master']);
          setShowCertificate(true);
          setTimeout(() => setShowCertificate(false), 6000);
        }
      }
    };
    check(achievements[0], createdCompounds.length >= 1);
    check(achievements[1], createdCompounds.length >= 5);
    check(achievements[2], createdCompounds.length >= 12);
    check(achievements[3], totalScore >= 50);
    check(achievements[4], totalScore >= 100);
    check(achievements[5], totalScore >= 200);
    check(achievements[6], totalScore >= 500);
    check(achievements[7], studiedElements.length >= 8);
    check(achievements[8], studiedElements.length >= 20);
    check(achievements[9], streak >= 5);
  }, [createdCompounds, totalScore, studiedElements, unlockedAchievements, streak, earnedCertificates]);

  useEffect(() => {
    dailyChallenges.forEach(challenge => {
      if (!completedChallenges.includes(challenge.id)) {
        let current = 0;
        if (challenge.type === 'mix') current = dailyProgress.mix;
        else if (challenge.type === 'quiz') current = dailyProgress.quiz;
        else if (challenge.type === 'study') current = dailyProgress.study;
        else if (challenge.type === 'memory') current = dailyProgress.memory;
        if (current >= challenge.target) {
          setCompletedChallenges([...completedChallenges, challenge.id]);
          setTotalScore(prev => prev + challenge.reward);
          setAssistantMessage(`Задание выполнено! +${challenge.reward} очков! 🎁`);
        }
      }
    });
  }, [dailyProgress, completedChallenges]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (quizTimerRunning) {
      interval = setInterval(() => { setQuizTime(prev => prev + 0.1); }, 100);
    }
    return () => clearInterval(interval);
  }, [quizTimerRunning]);

  const currentLevel = levels.slice().reverse().find(l => totalScore >= l.minScore) || levels[0];
  
  const createParticles = (color: string) => { 
    setParticleColor(color); 
    setShowParticles(true); 
    setTimeout(() => setShowParticles(false), 2000); 
  };
  
  const handleElementClick = (element: MixableElement) => {
    if (isMixing) return;
    if (selectedElements.length >= 2) { 
      setSelectedElements([element]); 
      setLastResult(null); 
      setShowMixPhrase(''); 
    } else {
      const newSelection = [...selectedElements, element];
      setSelectedElements(newSelection);
      setLastResult(null);
      if (newSelection.length === 2) { 
        setShowMixPhrase(mixPhrases[Math.floor(Math.random() * mixPhrases.length)]); 
      }
    }
  };
  
  const tryCombine = () => {
    if (selectedElements.length !== 2 || isMixing) return;
    setIsMixing(true); 
    setMixProgress(0);
    
    const sorted = selectedElements.map(e => e.symbol).sort();
    const found = validCompounds.find(c => { 
      const cs = c.elements.slice().sort(); 
      return cs[0] === sorted[0] && cs[1] === sorted[1]; 
    });
    
    const progressInterval = setInterval(() => { 
      setMixProgress(prev => { 
        if (prev >= 100) { clearInterval(progressInterval); return 100; } 
        return prev + 5; 
      }); 
    }, 50);
    
    setTimeout(() => {
      clearInterval(progressInterval); 
      setMixProgress(100);
      if (found) {
        const isNew = !createdCompounds.find(c => c.formula === found.formula);
        if (isNew) {
          setCreatedCompounds([...createdCompounds, found]); 
          setGameScore(prev => prev + found.points); 
          setTotalScore(prev => prev + found.points);
          setStreak(streak + 1); 
          setDailyProgress({ ...dailyProgress, mix: dailyProgress.mix + 1 }); 
          createParticles(found.color);
          setAssistantMessage(labAssistantPhrases.success[Math.floor(Math.random() * labAssistantPhrases.success.length)]);
          if (!learnedBonds.includes(found.bondType)) { 
            setLearnedBonds([...learnedBonds, found.bondType]); 
            setAssistantMessage(labAssistantPhrases.educational[Math.floor(Math.random() * labAssistantPhrases.educational.length)]); 
          }
        } else { setStreak(0); }
        setLastResult({ success: true, compound: found });
      } else { 
        setStreak(0); 
        setLastResult({ success: false }); 
        setAssistantMessage(labAssistantPhrases.encouragement[Math.floor(Math.random() * labAssistantPhrases.encouragement.length)]); 
      }
      setSelectedElements([]); 
      setIsMixing(false); 
      setShowMixPhrase('');
    }, 1200);
  };
  
  const resetMixingGame = () => { 
    setSelectedElements([]); 
    setLastResult(null); 
    setShowMixPhrase(''); 
  };
  
  const handleCardFlip = (uid: number) => {
    if (flippedCards.length >= 2 || flippedCards.includes(uid) || matchedPairs.includes(uid)) return;
    const newFlipped = [...flippedCards, uid]; 
    setFlippedCards(newFlipped);
    if (newFlipped.length === 2) {
      setMatchMoves(prev => prev + 1);
      const c1 = matchCards.find(c => c.uid === newFlipped[0]); 
      const c2 = matchCards.find(c => c.uid === newFlipped[1]);
      if (c1 && c2 && c1.symbol === c2.symbol) {
        setTimeout(() => { 
          setMatchedPairs([...matchedPairs, newFlipped[0], newFlipped[1]]); 
          setFlippedCards([]); 
          setMatchScore(prev => prev + 5); 
          setTotalScore(prev => prev + 5); 
          setDailyProgress({ ...dailyProgress, memory: dailyProgress.memory + 1 }); 
          createParticles('from-emerald-400 to-teal-500'); 
        }, 500);
      } else { 
        setTimeout(() => setFlippedCards([]), 1000); 
      }
    }
  };
  
  const resetMatchGame = () => { 
    setFlippedCards([]); 
    setMatchedPairs([]); 
    setMatchMoves(0); 
    shuffleMatchCards(); 
  };

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setShowResult(false);
    setQuizTime(0);
    setQuizTimerRunning(true);
    setShowExplanation(false);
  };
  
  const handleNextQuestion = () => {
    const isCorrect = selectedAnswer === quizQuestions[currentQuizIndex].correct;
    const newScore = isCorrect ? quizScore + 1 : quizScore;
    setQuizScore(newScore); 
    setShowExplanation(true);
    
    if (isCorrect) { 
      createParticles('from-blue-400 to-indigo-500'); 
      setDailyProgress({ ...dailyProgress, quiz: dailyProgress.quiz + 1 }); 
    }
    
    if (currentQuizIndex < quizQuestions.length - 1) { 
      setCurrentQuizIndex(currentQuizIndex + 1); 
      setSelectedAnswer(null); 
      setShowExplanation(false); 
    } else { 
      setQuizTimerRunning(false); 
      setShowResult(true); 
      setTotalScore(prev => prev + newScore * 3); 
    }
  };
  
  const resetQuiz = () => { 
    setQuizStarted(false);
    setQuizTimerRunning(false);
  };
  
  const handleElementStudy = (atomicNumber: number) => {
    if (!studiedElements.includes(atomicNumber)) { 
      setStudiedElements([...studiedElements, atomicNumber]); 
      setTotalScore(prev => prev + 1); 
      setDailyProgress({ ...dailyProgress, study: dailyProgress.study + 1 }); 
      createParticles('from-yellow-400 to-amber-500'); 
    }
  };
  
  const renderNavButton = (section: string, icon: string, label: string) => {
    const isActive = activeSection === section;
    return (
      <button 
        key={section}
        onClick={() => setActiveSection(section)} 
        className={`relative group flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-500 ease-out overflow-hidden
          ${isActive 
            ? 'text-white shadow-md shadow-indigo-500/20 scale-105' 
            : 'text-slate-600 hover:text-indigo-700 hover:bg-white/80 hover:shadow-sm hover:-translate-y-0.5'}`}
      >
        {isActive && (
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 z-0"></div>
        )}
        <span className={`relative z-10 transition-transform duration-500 ${isActive ? 'scale-110 drop-shadow-sm' : 'group-hover:scale-125 group-hover:-rotate-6'}`}>
          {icon}
        </span>
        <span className="relative z-10 hidden md:inline font-bold tracking-wide">
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="min-h-screen text-slate-800 bg-slate-50 relative overflow-x-hidden">
      
      {/* Анимированный задний фон (Glowing Blobs) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-purple-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-[35rem] h-[35rem] bg-cyan-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[45rem] h-[45rem] bg-pink-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-60 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-[10%] right-[20%] w-[30rem] h-[30rem] bg-yellow-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-blob animation-delay-6000"></div>
      </div>

      <div className="relative z-10">
        {/* Партиклы при успехе */}
        {showParticles && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {[...Array(40)].map((_, i) => (
              <div key={i} className={`absolute w-4 h-4 rounded-full bg-gradient-to-r ${particleColor} animate-soft-ping`} 
                style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 0.3}s`, animationDuration: '1.2s' }} />
            ))}
          </div>
        )}

        {/* Сертификат */}
        {showCertificate && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-yellow-50 via-amber-100 to-orange-100 rounded-3xl p-10 max-w-lg w-full border-8 border-yellow-400 shadow-2xl animate-pop-in">
              <div className="text-center">
                <div className="text-7xl mb-4 animate-float-smooth">🏆</div>
                <h2 className="text-3xl font-black text-amber-800 mb-2 tracking-widest">СЕРТИФИКАТ</h2>
                <div className="text-xl text-amber-700 mb-4">Выдаётся</div>
                <div className="text-3xl font-black text-purple-800 mb-4 bg-white/50 py-2 rounded-xl inline-block px-8 shadow-sm">Юному Химику</div>
                <div className="text-lg text-gray-700 font-medium">За освоение абсолютно всех химических реакций лаборатории!</div>
              </div>
            </div>
          </div>
        )}

        {/* Всплывающее окно достижения */}
        {showAchievement && (
          <div className="fixed top-24 right-4 z-50 animate-pop-in">
            <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white p-5 rounded-2xl shadow-2xl border-2 border-white/50">
              <div className="flex items-center gap-4">
                <div className="text-5xl animate-float-smooth">{showAchievement.icon}</div>
                <div>
                  <div className="font-black text-xl">{showAchievement.name}</div>
                  <div className="text-sm opacity-90">{showAchievement.description}</div>
                  <div className="text-xs mt-2 bg-black/20 px-3 py-1 rounded-full inline-block font-bold backdrop-blur">+15 XP</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Помощник Лаборант */}
        {showLabAssistant && (
          <div className="fixed bottom-6 left-6 z-40 animate-fade-in-up">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-white max-w-xs transition-transform hover:scale-105">
              <div className="flex flex-row items-center gap-4">
                <div className="text-5xl bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full p-2 shadow-inner">👨‍🔬</div>
                <div className="flex-1">
                  <div className="text-xs font-black text-indigo-600 mb-1 uppercase tracking-wide">Профессор</div>
                  <div className="text-sm text-slate-700 font-medium leading-tight">{assistantMessage}</div>
                </div>
                <button onClick={() => setShowLabAssistant(false)} className="text-slate-400 hover:text-rose-500 transition-colors p-1 text-xl">✕</button>
              </div>
            </div>
          </div>
        )}

        {/* Улучшенная навигация */}
        <nav className="bg-white/40 backdrop-blur-xl shadow-sm sticky top-0 z-40 border-b border-white/60">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between flex-wrap gap-4">
              
              {/* Логотип */}
              <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveSection('home')}>
                <div className="relative">
                  <span className="text-4xl group-hover:rotate-12 transition-transform duration-300 relative z-10 inline-block">🧪</span>
                  <div className="absolute inset-0 bg-purple-400 blur-md opacity-0 group-hover:opacity-50 transition-opacity"></div>
                </div>
                <div>
                  <span className="text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Уроки Химии</span>
                  <div className="text-[10px] text-slate-500 font-black tracking-widest uppercase mt-0.5">Интерактивная наука</div>
                </div>
              </div>
              
              {/* Уровень игрока */}
              <div className={`flex items-center gap-3 bg-gradient-to-r ${currentLevel.color} px-5 py-2 rounded-2xl shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-white/20`}>
                <span className="text-3xl animate-float-smooth drop-shadow-md">{currentLevel.emoji}</span>
                <div className="text-white hidden md:block">
                  <div className="text-[10px] opacity-90 uppercase tracking-widest font-bold">Уровень {currentLevel.level}</div>
                  <div className="font-black text-lg leading-tight drop-shadow-sm">{currentLevel.name}</div>
                </div>
                <div className="bg-black/20 backdrop-blur px-4 py-1.5 rounded-full ml-2 shadow-inner">
                  <div className="text-white font-black text-lg">{totalScore} <span className="text-xs opacity-80 uppercase">XP</span></div>
                </div>
              </div>

              {/* Блок кнопок-вкладок (Glassmorphism Pill container) */}
              <div className="flex gap-1 flex-wrap justify-center w-full lg:w-auto mt-2 lg:mt-0 bg-white/40 p-1.5 rounded-3xl shadow-sm border border-white/60 backdrop-blur-md">
                {renderNavButton('home', '🏠', 'Главная')}
                {renderNavButton('learn', '📖', 'Учебник')}
                {renderNavButton('periodic-table', '📊', 'Таблица')}
                {renderNavButton('mixing-game', '⚗️', 'Лаборатория')}
                {renderNavButton('memory', '🎴', 'Память')}
                {renderNavButton('quiz', '✅', 'Тест')}
                {renderNavButton('challenges', '📅', 'Квесты')}
              </div>

            </div>
          </div>
        </nav>

        {/* Основной контент */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          
          {/* ГЛАВНАЯ СТРАНИЦА */}
          {activeSection === 'home' && (
            <div className="space-y-10 animate-fade-in-up">
              <section className="relative text-center py-24 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-3xl text-white shadow-2xl overflow-hidden border border-white/20">
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+CjxjaXJjbGUgY3g9IjIiIGN5PSIyIiByPSIyIiBmaWxsPSIjZmZmIi8+Cjwvc3ZnPg==')]"></div>
                <div className="relative z-10 px-4">
                  <h1 className="text-5xl md:text-7xl font-black mb-6 drop-shadow-lg tracking-tight">🎓 Уроки Химии</h1>
                  <p className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-medium text-white/90 drop-shadow-md leading-relaxed">Интерактивное погружение в мир молекул, реакций и элементов!</p>
                  <div className="flex justify-center gap-6 flex-wrap">
                    <button onClick={() => setActiveSection('learn')} className="bg-white text-indigo-700 px-8 py-4 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl hover:shadow-white/30 flex items-center gap-3">
                      <span className="text-2xl">📖</span> Начать обучение
                    </button>
                    <button onClick={() => setActiveSection('mixing-game')} className="bg-black/20 backdrop-blur-md border border-white/50 text-white px-8 py-4 rounded-2xl font-black text-xl hover:bg-white hover:text-indigo-700 transition-all shadow-xl flex items-center gap-3">
                      <span className="text-2xl">⚗️</span> В лабораторию
                    </button>
                  </div>
                </div>
              </section>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {[
                  { num: totalScore, label: 'Очки', icon: '⭐', color: 'from-yellow-400 to-amber-500' }, 
                  { num: createdCompounds.length, label: 'Синтез', icon: '🧪', color: 'from-blue-400 to-indigo-500' }, 
                  { num: studiedElements.length, label: 'Элементы', icon: '⚛️', color: 'from-emerald-400 to-teal-500' }, 
                  { num: unlockedAchievements.length, label: 'Трофеи', icon: '🏆', color: 'from-rose-400 to-pink-500' }, 
                  { num: streak, label: 'Комбо', icon: '🔥', color: 'from-orange-400 to-red-500' }, 
                  { num: loginStreak, label: 'Дни', icon: '📅', color: 'from-violet-400 to-purple-500' }
                ].map((s, i) => (
                  <div key={i} className="bg-white/60 backdrop-blur-md rounded-2xl p-5 text-center shadow-lg border border-white/50 hover:-translate-y-1 transition-transform group">
                    <div className={`text-4xl mb-3 inline-block bg-gradient-to-br ${s.color} bg-clip-text drop-shadow-sm group-hover:scale-110 transition-transform`}>{s.icon}</div>
                    <div className={`text-3xl font-black bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>{s.num}</div>
                    <div className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-white">
                <div className="flex items-center justify-center gap-4 mb-8">
                  <span className="text-4xl">🏆</span>
                  <h2 className="text-3xl font-black text-center bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">Зал Славы</h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                  {achievements.map(a => (
                    <div key={a.id} className={`p-5 rounded-2xl text-center transition-all duration-500 ${unlockedAchievements.includes(a.id) ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-300 shadow-md hover:scale-105 hover:shadow-lg' : 'bg-slate-50/50 border border-slate-100 opacity-60 grayscale'}`}>
                      <div className="text-4xl mb-3 animate-float-smooth">{a.icon}</div>
                      <div className="font-bold text-sm text-slate-800">{a.name}</div>
                      <div className="text-xs text-slate-500 mt-2">{a.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* УЧЕБНИК */}
          {activeSection === 'learn' && (
            <div className="space-y-10 animate-fade-in-up">
              <div className="text-center bg-white/60 backdrop-blur-md p-10 rounded-3xl shadow-lg border border-white">
                <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">📖 Интерактивный Учебник</h2>
                <p className="text-slate-600 text-xl font-medium">Изучай теорию, чтобы стать мастером экспериментов!</p>
              </div>

              {/* Основы Химии */}
              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white">
                <h3 className="text-3xl font-black mb-8 text-center text-slate-800">🧠 Основы Химии</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {theoryTopics.map((topic, i) => (
                    <div key={i} className="bg-white/80 p-6 rounded-2xl border border-indigo-100 hover:shadow-md hover:-translate-y-1 transition-all group">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl bg-indigo-50 p-3 rounded-2xl shadow-sm group-hover:rotate-12 transition-transform duration-300">{topic.icon}</div>
                        <h4 className="text-xl font-black text-indigo-900">{topic.title}</h4>
                      </div>
                      <p className="text-slate-700 mb-5 leading-relaxed font-medium">{topic.content}</p>
                      <div className="bg-indigo-50 p-4 rounded-xl text-indigo-800 font-medium flex gap-3 items-start border-l-4 border-indigo-400 text-sm">
                        <span className="text-lg leading-none">💡</span>
                        <span>{topic.fact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Строение атома */}
              <div className="bg-gradient-to-br from-indigo-50 to-blue-100/50 rounded-3xl p-8 shadow-lg border border-indigo-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 text-9xl opacity-5 pointer-events-none -translate-y-1/4">⚛️</div>
                <h3 className="text-3xl font-black mb-8 text-center text-indigo-900 relative z-10">⚛️ Строение Атома</h3>
                <div className="grid md:grid-cols-3 gap-6 relative z-10">
                  {Object.values(atomStructure).map((particle, i) => (
                    <div key={i} className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-sm border border-white hover:scale-105 transition-transform duration-300">
                      <h4 className="font-black text-xl mb-4 text-center text-indigo-800">{particle.name}</h4>
                      <div className="flex justify-center gap-4 mb-4 text-sm">
                        <div className="bg-slate-100 px-3 py-1 rounded-lg"><span className="text-slate-500">Заряд:</span> <strong className={particle.charge.includes('+') ? 'text-rose-500' : particle.charge.includes('-') ? 'text-blue-500' : 'text-slate-600'}>{particle.charge}</strong></div>
                        <div className="bg-slate-100 px-3 py-1 rounded-lg"><span className="text-slate-500">Масса:</span> <strong>{particle.mass}</strong></div>
                      </div>
                      <p className="text-slate-700 text-center font-medium">{particle.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Шкала pH */}
              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white">
                <h3 className="text-3xl font-black mb-8 text-center text-emerald-800">🧪 Кислоты, Щелочи и Шкала pH</h3>
                <p className="text-center text-slate-600 mb-8 max-w-2xl mx-auto font-medium">Шкала pH показывает, насколько кислым или щелочным является раствор. Она идет от 0 до 14.</p>
                
                <div className="relative max-w-4xl mx-auto mb-12">
                  <div className="w-full h-12 rounded-full bg-gradient-to-r from-rose-500 via-emerald-400 to-indigo-600 shadow-inner flex items-center justify-between px-4 text-white font-black">
                    <span>pH 0</span>
                    <span>pH 7</span>
                    <span>pH 14</span>
                  </div>
                  <div className="flex justify-between mt-4 text-sm font-bold">
                    <div className="text-rose-500 text-center w-1/3">Сильная кислота<br/><span className="text-xs text-slate-500 font-normal mt-1 block">Желудочный сок, лимон</span></div>
                    <div className="text-emerald-600 text-center w-1/3">Нейтрально<br/><span className="text-xs text-slate-500 font-normal mt-1 block">Чистая вода, кровь</span></div>
                    <div className="text-indigo-600 text-center w-1/3">Сильная щелочь<br/><span className="text-xs text-slate-500 font-normal mt-1 block">Мыло, отбеливатель</span></div>
                  </div>
                </div>
              </div>

              {/* Типы связей */}
              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white">
                <h3 className="text-3xl font-black mb-8 text-center text-slate-800">🔗 Химические Связи</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {bondTypes.map((bond, i) => (
                    <div key={i} className={`bg-white/90 rounded-2xl p-6 shadow-sm transition-shadow ${learnedBonds.includes(bond.type) ? 'border-2 border-emerald-400 bg-emerald-50/20' : 'border border-slate-100'}`}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <span className="text-3xl bg-slate-50 p-2 rounded-xl border border-slate-100">{bond.emoji}</span>
                          <h4 className="text-lg font-black text-slate-800">{bond.type}</h4>
                        </div>
                        {learnedBonds.includes(bond.type) && <span className="text-xl bg-emerald-100 p-2 rounded-full" title="Изучено на практике">✅</span>}
                      </div>
                      <p className="text-slate-600 mb-5 font-medium">{bond.description}</p>
                      <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex items-center justify-between">
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-wide">Примеры</span>
                        <span className="font-black text-indigo-600 tracking-widest">{bond.example}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ПЕРИОДИЧЕСКАЯ ТАБЛИЦА */}
          {activeSection === 'periodic-table' && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="text-center bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-white">
                <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">⚛️ Таблица Элементов</h2>
                <p className="text-slate-600 text-xl font-medium">Исследуй кирпичики мироздания!</p>
              </div>
              
              <div className="bg-white/50 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white max-w-5xl mx-auto">
                <div className="grid grid-cols-4 md:grid-cols-10 gap-2 md:gap-3">
                  {periodicTable.map(el => (
                    <button 
                      key={el.atomicNumber} 
                      onClick={() => { setSelectedElement(el); handleElementStudy(el.atomicNumber); }} 
                      className={`bg-gradient-to-br ${el.color} p-2 md:p-3 rounded-2xl transition-all duration-300 shadow-sm
                      ${selectedElement?.atomicNumber === el.atomicNumber ? 'ring-4 ring-white ring-offset-2 scale-110 shadow-lg z-10' : 'hover:-translate-y-1 hover:shadow-md'}
                      ${studiedElements.includes(el.atomicNumber) ? '' : 'opacity-80'}`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="text-[10px] md:text-xs font-bold text-white/80">{el.atomicNumber}</div>
                        {studiedElements.includes(el.atomicNumber) && <div className="text-[10px] bg-white/30 rounded-full px-1">✓</div>}
                      </div>
                      <div className="text-xl md:text-3xl font-black text-white text-center my-1 drop-shadow-sm">{el.symbol}</div>
                      <div className="text-sm md:text-xl text-center transition-transform">{el.emoji}</div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedElement && (
                <div className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-4xl mx-auto border border-white animate-pop-in">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="flex items-center gap-6">
                      <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${selectedElement.color} flex items-center justify-center text-6xl shadow-inner shrink-0`}>
                        {selectedElement.emoji}
                      </div>
                      <div>
                        <h3 className="text-4xl font-black text-slate-800 mb-2">{selectedElement.name}</h3>
                        <div className="flex items-center gap-3">
                          <p className="text-3xl text-slate-400 font-black">{selectedElement.symbol}</p>
                          <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider">№ {selectedElement.atomicNumber}</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Масса</div>
                        <div className="text-xl font-black text-slate-700">{selectedElement.mass}</div>
                      </div>
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Открыт</div>
                        <div className="text-xl font-black text-slate-700">{selectedElement.year}</div>
                      </div>
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Группа / Период</div>
                        <div className="text-xl font-black text-slate-700">{selectedElement.group} / {selectedElement.period}</div>
                      </div>
                      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Состояние</div>
                        <div className="text-xl font-black text-slate-700">{selectedElement.state}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-100 text-center">
                      <div className="text-xs text-amber-600 font-bold uppercase tracking-widest mb-2">Валентность</div>
                      <div className="text-3xl font-black text-amber-700">{selectedElement.valence}</div>
                    </div>
                    <div className="bg-blue-50/50 rounded-2xl p-5 border border-blue-100 text-center">
                      <div className="text-xs text-blue-600 font-bold uppercase tracking-widest mb-2">Электроны</div>
                      <div className="text-xl font-black text-blue-700 mt-2">{selectedElement.electrons}</div>
                    </div>
                    <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-100 text-center">
                      <div className="text-xs text-rose-600 font-bold uppercase tracking-widest mb-2">Категория</div>
                      <div className="text-lg font-black text-rose-700 mt-2 leading-tight">{selectedElement.category}</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-100/50">
                    <div className="flex items-start gap-5">
                      <div className="text-4xl opacity-80">💡</div>
                      <div>
                        <div className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-2">Знаешь ли ты?</div>
                        <p className="text-lg font-medium text-slate-700">{selectedElement.fact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ЛАБОРАТОРИЯ (РАЗДЕЛЕННЫЙ ЭКРАН С УЛУЧШЕННОЙ СЕТКОЙ) */}
          {activeSection === 'mixing-game' && (
            <div className="space-y-6 animate-fade-in-up">
              
              {/* Заголовок и Статистика */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white/60 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-white">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">⚗️ Лаборатория</h2>
                  <p className="text-slate-600 font-medium">Синтезируй вещества, комбинируя элементы слева.</p>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <div className="bg-white/80 rounded-2xl px-5 py-3 shadow-sm border border-white text-center">
                    <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Счёт</div>
                    <div className="text-2xl font-black text-indigo-600">{gameScore}</div>
                  </div>
                  <div className="bg-white/80 rounded-2xl px-5 py-3 shadow-sm border border-white text-center">
                    <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Открыто</div>
                    <div className="text-2xl font-black text-emerald-600">{createdCompounds.length}<span className="text-sm text-slate-300">/{validCompounds.length}</span></div>
                  </div>
                  <div className="bg-white/80 rounded-2xl px-5 py-3 shadow-sm border border-white text-center">
                    <div className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Комбо</div>
                    <div className={`text-2xl font-black ${streak >= 3 ? 'text-orange-500 animate-pulse' : 'text-orange-400'}`}>{streak} 🔥</div>
                  </div>
                </div>
              </div>

              {/* Основная игровая зона */}
              <div className="grid lg:grid-cols-12 gap-6">
                
                {/* Левая панель: Доступные элементы с улучшенной сеткой */}
                <div className="lg:col-span-5 bg-white/50 backdrop-blur-xl rounded-3xl p-5 lg:p-6 shadow-lg border border-white flex flex-col h-full lg:max-h-[850px]">
                  <div className="flex items-center justify-between mb-6 sticky top-0 bg-white/80 backdrop-blur p-4 rounded-2xl shadow-sm border border-white z-20">
                    <h3 className="text-xl font-black text-slate-800 flex items-center gap-2"><span>📦</span> Шкаф элементов</h3>
                    <span className="text-xs font-black text-indigo-600 bg-indigo-100 px-3 py-1.5 rounded-xl uppercase tracking-widest">Выбери 2</span>
                  </div>
                  
                  <div className="overflow-y-auto hide-scrollbar flex-1 pb-6 px-1">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
                      {mixableElements.map(el => {
                        const isSelected = selectedElements.find(e => e.symbol === el.symbol);
                        return (
                          <button 
                            key={el.symbol} 
                            onClick={() => handleElementClick(el)} 
                            disabled={isMixing} 
                            className={`group relative bg-gradient-to-br ${el.color} rounded-3xl p-4 flex flex-col items-center justify-center text-white shadow-md transition-all duration-300 aspect-square border border-white/20
                              ${isSelected ? 'ring-4 ring-yellow-400 ring-offset-2 ring-offset-slate-50 scale-105 shadow-xl shadow-yellow-400/30 z-10' : ''} 
                              ${isMixing ? 'opacity-40 cursor-not-allowed grayscale' : 'cursor-pointer hover:shadow-xl hover:-translate-y-2 hover:scale-105 hover:rotate-1'}`}
                          >
                            <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 rounded-3xl transition-colors"></div>
                            <span className="text-4xl md:text-5xl mb-2 drop-shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">{el.emoji}</span>
                            <span className="text-2xl md:text-3xl font-black drop-shadow-md leading-none">{el.symbol}</span>
                            <span className="text-[10px] md:text-xs font-bold opacity-90 mt-1 uppercase tracking-widest">{el.name}</span>
                            
                            <div className="absolute -bottom-3 bg-white text-slate-800 text-[10px] font-black uppercase px-4 py-1.5 rounded-full shadow-lg border border-slate-100 whitespace-nowrap transition-transform duration-300 group-hover:-translate-y-1">
                              Вал: <span className="text-indigo-600">{el.valence}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Правая панель: Зона реакции */}
                <div className="lg:col-span-7 bg-white/50 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-lg border border-white relative overflow-hidden flex flex-col justify-center min-h-[500px]">
                  <h3 className="text-2xl font-black mb-6 text-center text-indigo-900 absolute top-6 w-full left-0">⚗️ Реактор</h3>
                  
                  {showMixPhrase && (
                    <div className="text-center absolute top-16 w-full left-0 z-10 animate-fade-in-up">
                      <span className="bg-white/90 backdrop-blur px-5 py-2 rounded-xl shadow-sm text-indigo-700 font-bold text-sm border border-indigo-100 inline-block">
                        {showMixPhrase}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap items-center justify-center gap-4 min-h-[160px] relative z-10 mt-10">
                    {selectedElements.length === 0 ? (
                      <div className="text-slate-500 text-lg md:text-xl font-medium bg-white/60 px-8 py-6 rounded-3xl border border-dashed border-slate-300 text-center">
                        Добавь элементы из шкафа слева,<br/>чтобы начать синтез
                      </div>
                    ) : (
                      <>
                        {selectedElements.map((el, i) => (
                          <Fragment key={i}>
                            <div className={`bg-gradient-to-br ${el.color} w-24 h-24 md:w-32 md:h-32 rounded-3xl flex items-center justify-center text-white text-5xl md:text-6xl font-bold shadow-lg shrink-0 animate-pop-in border border-white/20`}>
                              {el.emoji}
                            </div>
                            {i === 0 && selectedElements.length === 2 && (
                              <span className={`text-4xl font-black shrink-0 ${isMixing ? 'animate-spin text-purple-400' : 'text-slate-400'}`}>+</span>
                            )}
                          </Fragment>
                        ))}
                        {isMixing && (
                          <>
                            <span className="text-4xl text-slate-400 shrink-0">→</span>
                            <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 flex items-center justify-center text-5xl shrink-0 shadow-lg shadow-orange-500/30 animate-pulse-glow border border-white/20">
                              ⚡
                            </div>
                          </>
                        )}
                      </>
                    )}
                  </div>

                  {isMixing && (
                    <div className="max-w-xs mx-auto w-full mt-8 relative z-10">
                      <div className="h-4 bg-white/80 rounded-full overflow-hidden shadow-inner border border-slate-200">
                        <div className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-all duration-75" style={{ width: `${mixProgress}%` }} />
                      </div>
                      <div className="text-center mt-2 text-xs font-black uppercase tracking-widest text-indigo-600 animate-pulse">Синтез... {mixProgress}%</div>
                    </div>
                  )}

                  {lastResult && !isMixing && (
                    <div className={`mt-8 max-w-lg mx-auto w-full rounded-3xl p-6 md:p-8 text-center relative z-10 animate-pop-in ${lastResult.success ? 'bg-white border-2 border-emerald-400 shadow-xl shadow-emerald-500/10' : 'bg-white border-2 border-rose-400 shadow-xl shadow-rose-500/10'}`}>
                      {lastResult.success ? (
                        <>
                          <div className="flex justify-center mb-3">
                            <span className="text-6xl animate-float-smooth">✨</span>
                          </div>
                          <div className={`text-5xl mb-2 bg-gradient-to-r ${lastResult.compound?.color} bg-clip-text text-transparent font-black tracking-wider`}>
                            {lastResult.compound?.formula}
                          </div>
                          <div className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-wide">{lastResult.compound?.name}</div>
                          <div className="text-slate-600 font-medium text-sm mb-6">{lastResult.compound?.description}</div>
                          
                          <div className="flex flex-col gap-3 mb-6 text-left">
                            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex justify-between items-center shadow-sm">
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Тип связи</span>
                              <span className="font-bold text-slate-700 text-sm">{lastResult.compound?.bondType}</span>
                            </div>
                            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 flex justify-between items-center shadow-sm">
                              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Уравнение</span>
                              <span className="font-bold text-indigo-600 text-sm font-mono tracking-wider">{lastResult.compound?.equation}</span>
                            </div>
                          </div>
                          
                          <div className="bg-emerald-100 text-emerald-700 rounded-full px-6 py-2 inline-block font-black text-sm uppercase tracking-widest mb-4 border border-emerald-200">
                            +{lastResult.compound?.points} XP
                          </div>
                          
                          {lastResult.compound?.funFact && (
                            <div className="bg-blue-50/80 rounded-xl p-4 text-left border border-blue-100">
                              <span className="text-blue-500 text-[10px] font-bold uppercase tracking-widest block mb-1">Знаешь ли ты?</span>
                              <span className="text-slate-700 text-xs font-bold">💡 {lastResult.compound.funFact}</span>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <div className="text-6xl mb-4">💥</div>
                          <div className="text-2xl font-black text-rose-600 mb-2 uppercase tracking-wide">Несовместимо!</div>
                          <div className="text-slate-600 text-sm mb-6 font-medium">Эти элементы не образуют стабильное соединение в нашей лаборатории.</div>
                          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-left shadow-sm">
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Подсказки:</div>
                            <div className="text-slate-700 font-bold font-mono text-sm tracking-widest">H+O, Na+Cl, C+O, H+Cl...</div>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Управление */}
                  <div className="flex flex-wrap justify-center gap-4 mt-8 relative z-10">
                    <button 
                      onClick={resetMixingGame} 
                      className="px-6 py-4 rounded-2xl font-bold text-sm bg-white/80 backdrop-blur border border-slate-200 text-slate-600 hover:bg-white hover:text-slate-800 transition-all shadow-sm flex-1 max-w-[150px] uppercase tracking-widest"
                    >
                      Очистить
                    </button>
                    <button 
                      onClick={tryCombine} 
                      disabled={selectedElements.length !== 2 || isMixing} 
                      className={`px-8 py-4 rounded-2xl font-black text-base transition-all flex-[2] max-w-[280px] uppercase tracking-widest ${
                        selectedElements.length === 2 && !isMixing 
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 hover:-translate-y-1 shadow-lg shadow-indigo-500/30' 
                          : 'bg-white/60 border border-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {isMixing ? 'Синтез...' : 'Смешать'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Коллекция */}
              {createdCompounds.length > 0 && (
                <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white animate-fade-in-up">
                  <h3 className="text-2xl font-black mb-6 text-center text-slate-800">🏆 Журнал открытий</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {createdCompounds.map((c, i) => (
                      <div key={i} className={`bg-gradient-to-br ${c.color} rounded-2xl p-5 text-center shadow-md hover:shadow-lg hover:-translate-y-1 hover:scale-105 transition-all duration-300 relative group border border-white/20`}>
                        <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{c.emoji}</div>
                        <div className="font-black text-xl text-white tracking-widest">{c.formula}</div>
                        <div className="text-[10px] text-white/90 font-bold uppercase tracking-wider mt-1">{c.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ИГРА ПАМЯТЬ */}
          {activeSection === 'memory' && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="text-center bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white">
                <h2 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">🎴 Химическая Память</h2>
                <p className="text-slate-600 text-xl font-medium">Тренируй мозг, запоминая элементы!</p>
              </div>
              
              <div className="flex justify-center gap-4 flex-wrap">
                <div className="bg-white/80 backdrop-blur rounded-2xl px-6 py-3 shadow-sm border border-white text-center">
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Счёт</div>
                  <div className="text-3xl font-black text-indigo-600">{matchScore}</div>
                </div>
                <div className="bg-white/80 backdrop-blur rounded-2xl px-6 py-3 shadow-sm border border-white text-center">
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Ходы</div>
                  <div className="text-3xl font-black text-purple-600">{matchMoves}</div>
                </div>
              </div>

              <div className="bg-white/50 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-lg border border-white max-w-3xl mx-auto">
                <div className="grid grid-cols-4 gap-3 md:gap-4">
                  {matchCards.map(card => { 
                    const isFlipped = flippedCards.includes(card.uid) || matchedPairs.includes(card.uid); 
                    return (
                      <button 
                        key={card.uid} 
                        onClick={() => handleCardFlip(card.uid)} 
                        disabled={isFlipped} 
                        className={`aspect-square rounded-2xl flex flex-col items-center justify-center text-4xl font-black shadow-sm transition-all duration-300 transform border border-white/20
                          ${isFlipped ? `bg-gradient-to-br ${card.color} text-white ring-2 ring-white/50 shadow-inner` : 'bg-gradient-to-br from-slate-200 to-slate-300 text-slate-400 hover:bg-slate-300 hover:scale-105 hover:-translate-y-1 hover:shadow-md'} 
                          ${matchedPairs.includes(card.uid) ? 'opacity-50 scale-95 z-0' : 'z-10'}`}
                      >
                        {isFlipped ? (
                          <div className="flex flex-col items-center animate-pop-in">
                            <div className="text-2xl md:text-4xl drop-shadow-sm">{card.emoji}</div>
                            <div className="text-lg md:text-xl mt-1 drop-shadow-sm">{card.symbol}</div>
                          </div>
                        ) : (
                          <div className="text-2xl md:text-3xl opacity-50">❓</div>
                        )}
                      </button>
                    ); 
                  })}
                </div>
              </div>

              <div className="text-center">
                <button onClick={resetMatchGame} className="px-8 py-4 rounded-2xl font-black text-lg bg-white text-slate-700 border border-slate-200 hover:bg-white hover:-translate-y-1 transition-all shadow-sm uppercase tracking-widest">
                  🔄 Раздать заново
                </button>
              </div>

              {matchedPairs.length === baseCards.length * 2 && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-3xl p-10 text-center border-4 border-emerald-400 shadow-2xl animate-pop-in max-w-sm w-full">
                    <div className="text-6xl mb-4 animate-float-smooth">🎊</div>
                    <div className="text-3xl font-black text-emerald-600 mb-2 uppercase tracking-widest">Победа!</div>
                    <div className="text-slate-600 font-medium mb-6">Вы нашли все пары за <strong className="text-indigo-600 text-xl">{matchMoves}</strong> ходов.</div>
                    <button onClick={resetMatchGame} className="w-full py-4 rounded-xl font-black text-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:scale-105 transition-transform shadow-md uppercase tracking-wider">
                      Играть снова
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ВИКТОРИНА */}
          {activeSection === 'quiz' && (
            <div className="max-w-2xl mx-auto animate-fade-in-up">
              <div className="text-center bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white mb-8">
                <h2 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-rose-500 to-indigo-600 bg-clip-text text-transparent">✅ Экзамен</h2>
                <p className="text-slate-600 text-xl font-medium">Проверь свои знания и получи ранг!</p>
              </div>

              {!quizStarted && !showResult && (
                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-10 shadow-lg text-center border border-white">
                  <div className="text-7xl mb-6 animate-float-smooth">⏱️</div>
                  <h3 className="text-2xl font-black mb-4 text-slate-800">Готов к тесту?</h3>
                  <p className="text-slate-600 mb-8 max-w-md mx-auto leading-relaxed">Тебя ждут 10 вопросов на время. За каждый правильный ответ ты получишь очки опыта.</p>
                  <button onClick={startQuiz} className="px-10 py-4 bg-gradient-to-r from-rose-500 to-indigo-600 text-white rounded-2xl font-black text-xl hover:scale-105 hover:-translate-y-1 transition-all shadow-md uppercase tracking-widest">
                    Начать
                  </button>
                </div>
              )}

              {quizStarted && !showResult && (
                <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white">
                  {!showExplanation ? (
                    <div className="animate-fade-in-up">
                      <div className="flex justify-between items-center mb-6">
                        <span className="bg-white text-slate-500 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl shadow-sm border border-slate-100">Вопрос {currentQuizIndex + 1}/{quizQuestions.length}</span>
                        <span className="text-indigo-600 font-black">{quizScore} правильных</span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-8 bg-white/60 p-4 rounded-2xl border border-white shadow-sm">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Время:</span>
                        <span className="text-2xl font-black text-rose-500 font-mono">{quizTime.toFixed(1)}с</span>
                      </div>

                      <div className="w-full bg-white rounded-full h-3 mb-8 overflow-hidden shadow-inner border border-slate-100">
                        <div className="bg-gradient-to-r from-rose-400 to-indigo-500 h-full transition-all duration-300" style={{ width: `${((currentQuizIndex + 1) / quizQuestions.length) * 100}%` }}></div>
                      </div>

                      <h3 className="text-xl md:text-2xl font-black mb-6 text-slate-800 leading-snug">{quizQuestions[currentQuizIndex].question}</h3>
                      
                      <div className="space-y-3">
                        {quizQuestions[currentQuizIndex].options.map((opt, i) => (
                          <button 
                            key={i} 
                            onClick={() => setSelectedAnswer(i)} 
                            className={`w-full p-4 rounded-xl text-left transition-all text-lg font-bold border-2 ${
                              selectedAnswer === i 
                                ? 'bg-indigo-50 border-indigo-400 text-indigo-700 shadow-sm scale-[1.02]' 
                                : 'bg-white border-white text-slate-700 hover:border-indigo-200 hover:bg-slate-50 shadow-sm'
                            }`}
                          >
                            <span className="inline-block w-8 text-slate-400 font-mono text-sm">{i + 1}.</span> {opt}
                          </button>
                        ))}
                      </div>

                      <button 
                        onClick={handleNextQuestion} 
                        disabled={selectedAnswer === null} 
                        className={`w-full mt-8 py-4 rounded-xl font-black text-lg transition-all uppercase tracking-widest ${
                          selectedAnswer !== null 
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-md hover:-translate-y-1' 
                            : 'bg-white/60 text-slate-400 cursor-not-allowed border border-slate-200'
                        }`}
                      >
                        {currentQuizIndex < quizQuestions.length - 1 ? 'Далее' : 'Завершить'}
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-6 animate-pop-in">
                      <div className="text-7xl mb-4">
                        {selectedAnswer === quizQuestions[currentQuizIndex].correct ? '✅' : '❌'}
                      </div>
                      <h3 className={`text-2xl font-black mb-4 ${selectedAnswer === quizQuestions[currentQuizIndex].correct ? 'text-emerald-600' : 'text-rose-600'}`}>
                        {selectedAnswer === quizQuestions[currentQuizIndex].correct ? 'Верно!' : 'Ошибка!'}
                      </h3>
                      
                      <div className="bg-white rounded-2xl p-6 border border-slate-100 mb-8 text-left shadow-sm">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Объяснение</div>
                        <div className="text-slate-700 font-medium leading-relaxed">{quizQuestions[currentQuizIndex].explanation}</div>
                      </div>

                      <button 
                        onClick={handleNextQuestion} 
                        className="w-full py-4 rounded-xl font-black text-lg bg-slate-800 text-white hover:bg-slate-700 hover:-translate-y-1 transition-all shadow-md uppercase tracking-widest"
                      >
                        {currentQuizIndex < quizQuestions.length - 1 ? 'Следующий вопрос' : 'Результаты'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {showResult && (
                <div className="bg-white/90 backdrop-blur-md rounded-3xl p-10 shadow-xl text-center border border-white animate-pop-in">
                  <div className="text-7xl mb-4 animate-float-smooth">
                    {quizScore >= 8 ? '🏆' : quizScore >= 5 ? '👏' : '📚'}
                  </div>
                  
                  <h3 className="text-3xl font-black mb-6 text-slate-800">Тест завершён!</h3>
                  
                  <div className="flex justify-center gap-8 mb-8">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex-1 max-w-[150px]">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Результат</div>
                      <div className="text-4xl font-black text-indigo-600">{quizScore}<span className="text-xl text-slate-300">/10</span></div>
                    </div>
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex-1 max-w-[150px]">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Время</div>
                      <div className="text-4xl font-black text-rose-500">{quizTime.toFixed(1)}с</div>
                    </div>
                  </div>
                  
                  <p className="text-lg mb-8 font-medium text-slate-600">
                    {quizScore >= 8 ? 'Блестящие знания! Ты настоящий эксперт.' : quizScore >= 5 ? 'Неплохо! Но есть куда расти.' : 'Нужно больше практики. Почитай учебник!'}
                  </p>
                  
                  <button 
                    onClick={resetQuiz} 
                    className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold uppercase tracking-widest hover:bg-slate-50 hover:-translate-y-1 transition-all shadow-sm"
                  >
                    Пройти заново
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ЕЖЕДНЕВНЫЕ ЗАДАНИЯ */}
          {activeSection === 'challenges' && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="text-center bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-sm border border-white">
                <h2 className="text-4xl md:text-5xl font-black mb-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">📅 Квесты</h2>
                <p className="text-slate-600 text-xl font-medium">Выполняй задания и получай опыт!</p>
              </div>
              
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-white relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                  <div className="text-5xl bg-gradient-to-br from-violet-100 to-fuchsia-100 p-4 rounded-2xl shadow-inner border border-white">🔥</div>
                  <div className="text-center md:text-left">
                    <div className="text-2xl font-black text-violet-900 mb-1">Серия: {loginStreak} дней подряд</div>
                    <div className="text-violet-700 font-medium text-sm">Заходи каждый день для дополнительных бонусов!</div>
                  </div>
                </div>
                
                {loginStreak >= 7 && (
                  <div className="mt-6 bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl p-4 text-center border border-yellow-200 shadow-sm">
                    <div className="font-black text-lg text-amber-800 uppercase tracking-widest animate-pulse">Недельный бонус активен!</div>
                  </div>
                )}
              </div>
              
              <div className="grid md:grid-cols-2 gap-5">
                {dailyChallenges.map(challenge => { 
                  let current = 0; 
                  if (challenge.type === 'mix') current = dailyProgress.mix; 
                  else if (challenge.type === 'quiz') current = dailyProgress.quiz; 
                  else if (challenge.type === 'study') current = dailyProgress.study; 
                  else if (challenge.type === 'memory') current = dailyProgress.memory; 
                  
                  const completed = completedChallenges.includes(challenge.id); 
                  const progress = Math.min((current / challenge.target) * 100, 100); 
                  
                  return (
                    <div key={challenge.id} className={`bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-sm border transition-all duration-300 ${completed ? 'border-emerald-300 bg-emerald-50/50' : 'border-white hover:shadow-md hover:-translate-y-1'}`}>
                      <div className="flex items-center gap-4 mb-5">
                        <div className={`text-4xl p-3 rounded-2xl shadow-sm border border-white ${completed ? 'bg-emerald-100' : 'bg-slate-100'}`}>{challenge.emoji}</div>
                        <div className="flex-1">
                          <h3 className="text-lg font-black text-slate-800 leading-tight">{challenge.task}</h3>
                          <div className="text-[10px] font-bold text-violet-600 uppercase tracking-widest mt-1">+{challenge.reward} XP</div>
                        </div>
                        {completed && <div className="text-2xl animate-pop-in">✅</div>}
                      </div>
                      
                      <div className="h-3 bg-white rounded-full overflow-hidden border border-slate-100 shadow-inner">
                        <div className={`h-full transition-all duration-1000 ${completed ? 'bg-emerald-400' : 'bg-gradient-to-r from-violet-400 to-fuchsia-500'}`} style={{ width: `${progress}%` }} />
                      </div>
                      
                      <div className="flex justify-between mt-2 text-[10px] font-bold uppercase tracking-widest">
                        <span className="text-slate-400">{current} / {challenge.target}</span>
                        {completed ? (
                          <span className="text-emerald-500">Готово</span>
                        ) : (
                          <span className="text-violet-500">{Math.round(progress)}%</span>
                        )}
                      </div>
                    </div>
                  ); 
                })}
              </div>
            </div>
          )}
        </main>
        
        <footer className="bg-white/30 backdrop-blur border-t border-white/50 mt-16 py-8 relative z-10 text-center">
          <div className="text-2xl mb-2 group inline-block">
            <span className="inline-block hover:rotate-12 transition-transform cursor-pointer">🧪</span>
          </div>
          <div className="font-black text-slate-800 tracking-wider uppercase text-sm mb-1">Уроки Химии</div>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Интерактивная платформа © 2026</p>
        </footer>
      </div>
    </div>
  );
}
