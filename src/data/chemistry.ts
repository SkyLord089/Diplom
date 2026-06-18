export interface Element {
  symbol: string;
  name: string;
  atomicNumber: number;
  mass: number;
  category: string;
  color: string;
  emoji: string;
  fact: string;
  electrons: string;
  group: number;
  period: number;
  valence: number;
  state: string;
  year: string;
}

export interface MixableElement {
  symbol: string;
  name: string;
  color: string;
  emoji: string;
  desc: string;
  valence: number;
}

export interface Compound {
  elements: string[];
  formula: string;
  name: string;
  description: string;
  points: number;
  emoji: string;
  color: string;
  mixPhrase: string;
  funFact: string;
  bondType: string;
  equation: string;
}

export interface TheoryTopic {
  title: string;
  icon: string;
  content: string;
  fact: string;
}

export interface BondType {
  type: string;
  description: string;
  example: string;
  emoji: string;
}

export interface AtomParticle {
  name: string;
  charge: string;
  mass: string;
  desc: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Level {
  level: number;
  name: string;
  minScore: number;
  emoji: string;
  color: string;
}

export interface DailyChallenge {
  id: number;
  task: string;
  type: string;
  target: number;
  reward: number;
  emoji: string;
}

export interface MemoryCard {
  id: number;
  symbol: string;
  name: string;
  emoji: string;
  color: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const periodicTable: Element[] = [
  { symbol: 'H', name: 'Водород', atomicNumber: 1, mass: 1.008, category: 'nonmetal', color: 'from-blue-400 to-blue-600', emoji: '💧', fact: 'Самый лёгкий элемент во Вселенной!', electrons: '1', group: 1, period: 1, valence: 1, state: 'Газ', year: '1766' },
  { symbol: 'He', name: 'Гелий', atomicNumber: 2, mass: 4.003, category: 'noble-gas', color: 'from-purple-400 to-purple-600', emoji: '🎈', fact: 'Используется в воздушных шарах!', electrons: '2', group: 18, period: 1, valence: 0, state: 'Газ', year: '1868' },
  { symbol: 'Li', name: 'Литий', atomicNumber: 3, mass: 6.941, category: 'alkali', color: 'from-red-400 to-red-600', emoji: '🔋', fact: 'В каждом аккумуляторе телефона!', electrons: '2, 1', group: 1, period: 2, valence: 1, state: 'Твёрдое', year: '1817' },
  { symbol: 'Be', name: 'Бериллий', atomicNumber: 4, mass: 9.012, category: 'alkaline', color: 'from-orange-400 to-orange-600', emoji: '💎', fact: 'Очень лёгкий и прочный металл!', electrons: '2, 2', group: 2, period: 2, valence: 2, state: 'Твёрдое', year: '1798' },
  { symbol: 'B', name: 'Бор', atomicNumber: 5, mass: 10.81, category: 'metalloid', color: 'from-green-400 to-green-600', emoji: '🌿', fact: 'Нужен растениям для роста!', electrons: '2, 3', group: 13, period: 2, valence: 3, state: 'Твёрдое', year: '1808' },
  { symbol: 'C', name: 'Углерод', atomicNumber: 6, mass: 12.01, category: 'nonmetal', color: 'from-slate-600 to-slate-800', emoji: '💎', fact: 'Основа всей жизни на Земле!', electrons: '2, 4', group: 14, period: 2, valence: 4, state: 'Твёрдое', year: 'Древность' },
  { symbol: 'N', name: 'Азот', atomicNumber: 7, mass: 14.01, category: 'nonmetal', color: 'from-indigo-400 to-indigo-600', emoji: '💨', fact: '78% воздуха состоит из азота!', electrons: '2, 5', group: 15, period: 2, valence: 3, state: 'Газ', year: '1772' },
  { symbol: 'O', name: 'Кислород', atomicNumber: 8, mass: 16.00, category: 'nonmetal', color: 'from-rose-400 to-rose-600', emoji: '💨', fact: 'Без него мы не можем дышать!', electrons: '2, 6', group: 16, period: 2, valence: 2, state: 'Газ', year: '1774' },
  { symbol: 'F', name: 'Фтор', atomicNumber: 9, mass: 19.00, category: 'halogen', color: 'from-yellow-300 to-yellow-500', emoji: '🦷', fact: 'Добавляют в зубную пасту!', electrons: '2, 7', group: 17, period: 2, valence: 1, state: 'Газ', year: '1886' },
  { symbol: 'Ne', name: 'Неон', atomicNumber: 10, mass: 20.18, category: 'noble-gas', color: 'from-pink-400 to-pink-600', emoji: '💡', fact: 'Светится в рекламных вывесках!', electrons: '2, 8', group: 18, period: 2, valence: 0, state: 'Газ', year: '1898' },
  { symbol: 'Na', name: 'Натрий', atomicNumber: 11, mass: 22.99, category: 'alkali', color: 'from-fuchsia-400 to-fuchsia-600', emoji: '🧂', fact: 'Взрывается в воде!', electrons: '2, 8, 1', group: 1, period: 3, valence: 1, state: 'Твёрдое', year: '1807' },
  { symbol: 'Mg', name: 'Магний', atomicNumber: 12, mass: 24.31, category: 'alkaline', color: 'from-amber-400 to-amber-600', emoji: '🔥', fact: 'Горит ярким белым светом!', electrons: '2, 8, 2', group: 2, period: 3, valence: 2, state: 'Твёрдое', year: '1808' },
  { symbol: 'Al', name: 'Алюминий', atomicNumber: 13, mass: 26.98, category: 'metal', color: 'from-slate-400 to-slate-600', emoji: '🥫', fact: 'Самый распространённый металл!', electrons: '2, 8, 3', group: 13, period: 3, valence: 3, state: 'Твёрдое', year: '1825' },
  { symbol: 'Si', name: 'Кремний', atomicNumber: 14, mass: 28.09, category: 'metalloid', color: 'from-teal-400 to-teal-600', emoji: '💻', fact: 'Основа всех компьютеров!', electrons: '2, 8, 4', group: 14, period: 3, valence: 4, state: 'Твёрдое', year: '1823' },
  { symbol: 'P', name: 'Фосфор', atomicNumber: 15, mass: 30.97, category: 'nonmetal', color: 'from-orange-400 to-orange-600', emoji: '🔥', fact: 'Светится в темноте!', electrons: '2, 8, 5', group: 15, period: 3, valence: 3, state: 'Твёрдое', year: '1669' },
  { symbol: 'S', name: 'Сера', atomicNumber: 16, mass: 32.07, category: 'nonmetal', color: 'from-yellow-400 to-yellow-600', emoji: '🌋', fact: 'Имеет запах тухлых яиц!', electrons: '2, 8, 6', group: 16, period: 3, valence: 2, state: 'Твёрдое', year: 'Древность' },
  { symbol: 'Cl', name: 'Хлор', atomicNumber: 17, mass: 35.45, category: 'halogen', color: 'from-emerald-400 to-emerald-600', emoji: '🏊', fact: 'Обеззараживает воду в бассейне!', electrons: '2, 8, 7', group: 17, period: 3, valence: 1, state: 'Газ', year: '1774' },
  { symbol: 'Ar', name: 'Аргон', atomicNumber: 18, mass: 39.95, category: 'noble-gas', color: 'from-cyan-400 to-cyan-600', emoji: '💡', fact: 'Инертный газ в лампочках!', electrons: '2, 8, 8', group: 18, period: 3, valence: 0, state: 'Газ', year: '1894' },
  { symbol: 'K', name: 'Калий', atomicNumber: 19, mass: 39.10, category: 'alkali', color: 'from-violet-400 to-violet-600', emoji: '🍌', fact: 'Содержится в бананах!', electrons: '2, 8, 8, 1', group: 1, period: 4, valence: 1, state: 'Твёрдое', year: '1807' },
  { symbol: 'Ca', name: 'Кальций', atomicNumber: 20, mass: 40.08, category: 'alkaline', color: 'from-rose-400 to-rose-600', emoji: '🦴', fact: 'Делает кости крепкими!', electrons: '2, 8, 8, 2', group: 2, period: 4, valence: 2, state: 'Твёрдое', year: '1808' }
];

export const mixableElements: MixableElement[] = [
  { symbol: 'H', name: 'Водород', color: 'from-blue-400 to-blue-600', emoji: '💧', desc: 'Лёгкий газ', valence: 1 },
  { symbol: 'O', name: 'Кислород', color: 'from-rose-400 to-rose-600', emoji: '💨', desc: 'Для дыхания', valence: 2 },
  { symbol: 'Na', name: 'Натрий', color: 'from-fuchsia-400 to-fuchsia-600', emoji: '🧂', desc: 'Мягкий металл', valence: 1 },
  { symbol: 'Cl', name: 'Хлор', color: 'from-emerald-400 to-emerald-600', emoji: '🏊', desc: 'Жёлто-зелёный газ', valence: 1 },
  { symbol: 'C', name: 'Углерод', color: 'from-slate-600 to-slate-800', emoji: '💎', desc: 'Основа жизни', valence: 4 },
  { symbol: 'Ca', name: 'Кальций', color: 'from-rose-400 to-rose-600', emoji: '🦴', desc: 'Щелочной металл', valence: 2 },
  { symbol: 'Fe', name: 'Железо', color: 'from-amber-600 to-amber-800', emoji: '🔨', desc: 'Прочный металл', valence: 3 },
  { symbol: 'S', name: 'Сера', color: 'from-yellow-400 to-yellow-600', emoji: '🌋', desc: 'Жёлтый порошок', valence: 2 },
  { symbol: 'N', name: 'Азот', color: 'from-indigo-400 to-indigo-600', emoji: '💨', desc: 'Инертный газ', valence: 3 },
  { symbol: 'K', name: 'Калий', color: 'from-violet-400 to-violet-600', emoji: '🍌', desc: 'Активный металл', valence: 1 },
  { symbol: 'Ag', name: 'Серебро', color: 'from-gray-300 to-gray-500', emoji: '🥈', desc: 'Драгоценный металл', valence: 1 },
  { symbol: 'Zn', name: 'Цинк', color: 'from-slate-400 to-slate-600', emoji: '🛡️', desc: 'Защитный металл', valence: 2 }
];

export const validCompounds: Compound[] = [
  { elements: ['H', 'O'], formula: 'H₂O', name: 'Вода', description: 'Бесцветная жидкость, основа всей жизни!', points: 10, emoji: '💧', color: 'from-blue-400 to-cyan-400', mixPhrase: 'Водород соединяется с кислородом... 💦', funFact: 'Человек на 60% состоит из воды!', bondType: 'Ковалентная полярная', equation: '2H₂ + O₂ → 2H₂O' },
  { elements: ['Na', 'Cl'], formula: 'NaCl', name: 'Поваренная соль', description: 'Кристаллы, которые мы добавляем в еду.', points: 10, emoji: '🧂', color: 'from-slate-100 to-slate-300', mixPhrase: 'Натрий + Хлор = Соль! 🧂', funFact: 'В Древнем Риме соль была валютой (отсюда слово salary)!', bondType: 'Ионная', equation: '2Na + Cl₂ → 2NaCl' },
  { elements: ['C', 'O'], formula: 'CO₂', name: 'Углекислый газ', description: 'Газ, который мы выдыхаем.', points: 10, emoji: '💨', color: 'from-gray-400 to-gray-600', mixPhrase: 'Углерод горит в кислороде! 💨', funFact: 'Растения поглощают CO₂ и выделяют кислород!', bondType: 'Ковалентная полярная', equation: 'C + O₂ → CO₂' },
  { elements: ['H', 'Cl'], formula: 'HCl', name: 'Соляная кислота', description: 'Сильная кислота в твоём желудке.', points: 15, emoji: '🧪', color: 'from-yellow-300 to-orange-400', mixPhrase: 'Водород + Хлор = Кислота! 🧪', funFact: 'Твой желудок вырабатывает её для переваривания пищи!', bondType: 'Ковалентная полярная', equation: 'H₂ + Cl₂ → 2HCl' },
  { elements: ['Ca', 'O'], formula: 'CaO', name: 'Негашёная известь', description: 'Используется в строительстве.', points: 15, emoji: '🏗️', color: 'from-stone-300 to-stone-500', mixPhrase: 'Кальций реагирует с кислородом! 🏗️', funFact: 'Известь использовали ещё древние римляне для бетона!', bondType: 'Ионная', equation: '2Ca + O₂ → 2CaO' },
  { elements: ['Fe', 'O'], formula: 'Fe₂O₃', name: 'Оксид железа', description: 'Та самая рыжая ржавчина.', points: 20, emoji: '🔴', color: 'from-red-500 to-orange-600', mixPhrase: 'Железо окисляется — ржавеет! 🔴', funFact: 'Марс красный именно из-за огромного количества оксида железа!', bondType: 'Ионная', equation: '4Fe + 3O₂ → 2Fe₂O₃' },
  { elements: ['C', 'H'], formula: 'CH₄', name: 'Метан', description: 'Основной компонент природного газа.', points: 20, emoji: '🔥', color: 'from-blue-300 to-blue-500', mixPhrase: 'Углерод + Водород = Горючий газ! 🔥', funFact: 'Метан горит красивым чистым голубым пламенем.', bondType: 'Ковалентная неполярная', equation: 'C + 2H₂ → CH₄' },
  { elements: ['S', 'O'], formula: 'SO₂', name: 'Сернистый газ', description: 'Газ с резким запахом зажженной спички.', points: 15, emoji: '😷', color: 'from-yellow-500 to-orange-500', mixPhrase: 'Сера горит — получается SO₂! 😷', funFact: 'Его часто используют для консервации сухофруктов.', bondType: 'Ковалентная полярная', equation: 'S + O₂ → SO₂' },
  { elements: ['N', 'H'], formula: 'NH₃', name: 'Аммиак', description: 'Газ с резким характерным запахом.', points: 20, emoji: '👃', color: 'from-indigo-300 to-indigo-500', mixPhrase: 'Азот + Водород = Аммиак! 💨', funFact: 'Используется как мощное удобрение и чистящее средство.', bondType: 'Ковалентная полярная', equation: 'N₂ + 3H₂ → 2NH₃' },
  { elements: ['K', 'Cl'], formula: 'KCl', name: 'Хлорид калия', description: 'Белые кристаллы, калийная соль.', points: 15, emoji: '🧂', color: 'from-violet-300 to-purple-400', mixPhrase: 'Калий + Хлор = Соль калия! 🧂', funFact: 'Жизненно необходим для нормальной работы сердца!', bondType: 'Ионная', equation: '2K + Cl₂ → 2KCl' },
  { elements: ['Ag', 'Cl'], formula: 'AgCl', name: 'Хлорид серебра', description: 'Белый творожистый осадок.', points: 25, emoji: '☁️', color: 'from-gray-100 to-gray-300', mixPhrase: 'Серебро + Хлор = Белый осадок! ☁️', funFact: 'Темнеет на свету, поэтому использовался в первых фотографиях!', bondType: 'Ионная', equation: '2Ag + Cl₂ → 2AgCl' },
  { elements: ['Zn', 'O'], formula: 'ZnO', name: 'Оксид цинка', description: 'Белый порошок, защищающий кожу.', points: 20, emoji: '🛡️', color: 'from-slate-100 to-slate-300', mixPhrase: 'Цинк + Кислород = Оксид цинка! 🛡️', funFact: 'Активно используется в солнцезащитных кремах и детских присыпках!', bondType: 'Ионная', equation: '2Zn + O₂ → 2ZnO' }
];

export const theoryTopics: TheoryTopic[] = [
  {
    title: "Атомы и Молекулы",
    icon: "⚛️",
    content: "Все вещества состоят из атомов — крошечных строительных блоков. Атомы соединяются, образуя молекулы. Например, молекула воды (H₂O) состоит из двух атомов водорода и одного кислорода.",
    fact: "В одной капле воды больше молекул, чем звезд в наблюдаемой Вселенной!"
  },
  {
    title: "Агрегатные состояния",
    icon: "🧊",
    content: "Вещества бывают твердыми (сохраняют форму), жидкими (текут, но сохраняют объем) и газообразными (занимают весь объем). Переходы: плавление, кипение, конденсация, кристаллизация.",
    fact: "Существует четвертое состояние — плазма! Из нее состоят звезды, включая наше Солнце."
  },
  {
    title: "Химические реакции",
    icon: "🔥",
    content: "Это превращение одних веществ в другие. Признаки реакции: изменение цвета, выделение газа, появление осадка, выделение тепла или света.",
    fact: "Ржавление железа и горение костра — это одна и та же реакция (окисление), просто с разной скоростью!"
  },
  {
    title: "Законы сохранения",
    icon: "⚖️",
    content: "Ничто не берется из ниоткуда и не исчезает в никуда. Масса веществ, вступивших в реакцию, равна массе образовавшихся веществ (Закон Ломоносова).",
    fact: "Атомы в твоем теле могли раньше быть частью динозавра или древней звезды!"
  }
];

export const bondTypes: BondType[] = [
  { type: 'Ионная', description: 'Между металлом и неметаллом. Металл отдает электроны, неметалл забирает. Образуются заряженные ионы.', example: 'NaCl, CaO', emoji: '🧲' },
  { type: 'Ковалентная полярная', description: 'Между разными неметаллами. Общая пара электронов смещена к более сильному атому (электроотрицательному).', example: 'H₂O, HCl', emoji: '🔗' },
  { type: 'Ковалентная неполярная', description: 'Между одинаковыми атомами неметаллов. Электроны делятся строго поровну.', example: 'O₂, N₂, H₂', emoji: '⚖️' },
  { type: 'Металлическая', description: 'В металлах. Свободные электроны (электронный газ) перемещаются между положительными ионами металла.', example: 'Fe, Cu, Al', emoji: '⚡' }
];

export const atomStructure: Record<string, AtomParticle> = {
  protons: { name: 'Протоны (p⁺)', charge: '+1', mass: '1', desc: 'Находятся в ядре, определяют, какой это химический элемент (атомный номер).' },
  neutrons: { name: 'Нейтроны (n⁰)', charge: '0', mass: '1', desc: 'Находятся в ядре, не имеют заряда, но придают атому массу и стабильность.' },
  electrons: { name: 'Электроны (e⁻)', charge: '-1', mass: '≈0', desc: 'Быстро вращаются вокруг ядра по орбиталям, участвуют в образовании химических связей.' }
};

export const achievements: Achievement[] = [
  { id: 'first_compound', name: 'Первый шаг!', description: 'Создай первое соединение', icon: '🎉' },
  { id: 'five_compounds', name: 'Юный химик', description: '5 различных соединений', icon: '🧪' },
  { id: 'all_compounds', name: 'Мастер лаборатории!', description: 'Собери 12 соединений', icon: '🏆' },
  { id: 'score_50', name: 'Накопитель', description: '50 очков', icon: '⭐' },
  { id: 'score_100', name: 'Виртуоз', description: '100 очков', icon: '💎' },
  { id: 'score_200', name: 'Легенда', description: '200 очков', icon: '👑' },
  { id: 'score_500', name: 'Бог химии', description: '500 очков', icon: '👼' },
  { id: 'quiz_master', name: 'Эрудит', description: '8 правильных ответов', icon: '🎓' },
  { id: 'elements_20', name: 'Знаток элементов', description: '20 изученных элементов', icon: '📚' },
  { id: 'streak_5', name: 'Серия!', description: '5 успехов подряд', icon: '🔥' }
];

export const levels: Level[] = [
  { level: 1, name: 'Новичок', minScore: 0, emoji: '🌱', color: 'from-emerald-400 to-teal-500' },
  { level: 2, name: 'Ученик', minScore: 50, emoji: '📖', color: 'from-blue-400 to-indigo-500' },
  { level: 3, name: 'Лаборант', minScore: 100, emoji: '🧪', color: 'from-purple-400 to-fuchsia-500' },
  { level: 4, name: 'Химик', minScore: 200, emoji: '⚗️', color: 'from-pink-400 to-rose-500' },
  { level: 5, name: 'Профессор', minScore: 350, emoji: '👨‍🔬', color: 'from-orange-400 to-red-500' },
  { level: 6, name: 'Нобелевский', minScore: 500, emoji: '🏅', color: 'from-yellow-400 to-amber-500' }
];

export const dailyChallenges: DailyChallenge[] = [
  { id: 1, task: 'Создай 3 соединения', type: 'mix', target: 3, reward: 25, emoji: '🧪' },
  { id: 2, task: 'Ответь на 5 вопросов', type: 'quiz', target: 5, reward: 20, emoji: '✅' },
  { id: 3, task: 'Изучи 5 элементов', type: 'study', target: 5, reward: 15, emoji: '📚' },
  { id: 4, task: 'Найди 4 пары в Memory', type: 'memory', target: 4, reward: 20, emoji: '🎴' }
];

export const labAssistantPhrases = {
  greeting: ['Привет, юный химик! 🧪', 'Готов к экспериментам? ⚗️', 'Добро пожаловать в лабораторию! 🔬'],
  success: ['Отлично справился! 🌟', 'Превосходная реакция! 👏', 'Ты настоящий учёный! 🎓'],
  encouragement: ['Попробуй ещё раз! 💪', 'Наука требует терпения! 🚀', 'У тебя всё получится! ⭐'],
  celebration: ['Ура! Новое открытие! 🎉', 'Фантастический результат! 🏆', 'Ты гений! 🧠✨'],
  educational: ['Валентность — это число связей атома!', 'Ионная связь образует кристаллы!', 'Температура ускоряет большинство реакций!']
};

export const baseCards: MemoryCard[] = [
  { id: 1, symbol: 'H', name: 'Водород', emoji: '💧', color: 'from-blue-400 to-blue-600' },
  { id: 2, symbol: 'O', name: 'Кислород', emoji: '💨', color: 'from-rose-400 to-rose-600' },
  { id: 3, symbol: 'Na', name: 'Натрий', emoji: '🧂', color: 'from-fuchsia-400 to-fuchsia-600' },
  { id: 4, symbol: 'Cl', name: 'Хлор', emoji: '🏊', color: 'from-emerald-400 to-emerald-600' },
  { id: 5, symbol: 'C', name: 'Углерод', emoji: '💎', color: 'from-slate-600 to-slate-800' },
  { id: 6, symbol: 'Fe', name: 'Железо', emoji: '🔨', color: 'from-amber-600 to-amber-800' },
  { id: 7, symbol: 'Ca', name: 'Кальций', emoji: '🦴', color: 'from-rose-400 to-rose-600' },
  { id: 8, symbol: 'S', name: 'Сера', emoji: '🌋', color: 'from-yellow-400 to-yellow-600' }
];

export const mixPhrases = ['Отличный выбор! 🎯', 'Готовим колбы... ⚗️', 'Интересная комбинация! 🤔', 'Химия в действии! ✨', 'Ожидаем реакцию... 🧪', 'Научный эксперимент! 🔬'];

export const quizQuestions: QuizQuestion[] = [
  { id: 1, question: 'Какой элемент имеет атомный номер 1?', options: ['Гелий', 'Водород', 'Литий', 'Кислород'], correct: 1, explanation: 'Водород — первый элемент периодической таблицы и самый лёгкий газ!' },
  { id: 2, question: 'Какая частица имеет отрицательный заряд?', options: ['Протон', 'Нейтрон', 'Электрон', 'Ядро'], correct: 2, explanation: 'Электроны вращаются вокруг ядра атома и несут отрицательный заряд.' },
  { id: 3, question: 'Какой pH у нейтральной среды (чистой воды)?', options: ['0', '7', '14', '10'], correct: 1, explanation: 'Шкала pH от 0 до 14. 7 — это нейтральная среда, где кислотность и щелочность сбалансированы.' },
  { id: 4, question: 'Кто создал периодическую таблицу?', options: ['Эйнштейн', 'Ньютон', 'Менделеев', 'Кюри'], correct: 2, explanation: 'Д.И. Менделеев создал таблицу в 1869 году, предсказав свойства ещё не открытых элементов!' },
  { id: 5, question: 'Какая связь между металлом и неметаллом?', options: ['Ковалентная', 'Ионная', 'Металлическая', 'Водородная'], correct: 1, explanation: 'Ионная связь образуется, когда металл отдает электроны неметаллу.' },
  { id: 6, question: 'Какова формула обычной воды?', options: ['H₂O₂', 'H₂O', 'HO₂', 'H₃O'], correct: 1, explanation: 'Два атома водорода и один атом кислорода образуют самую важную молекулу для жизни — H₂O.' },
  { id: 7, question: 'Самый лёгкий элемент?', options: ['Гелий', 'Водород', 'Литий', 'Углерод'], correct: 1, explanation: 'Водород — самый лёгкий и самый распространённый элемент во Вселенной.' },
  { id: 8, question: 'Химический символ золота?', options: ['Go', 'Gd', 'Au', 'Ag'], correct: 2, explanation: 'Символ Au происходит от латинского слова Aurum, что значит "золото".' },
  { id: 9, question: 'Какая валентность у кислорода в большинстве соединений?', options: ['1', '2', '3', '4'], correct: 1, explanation: 'Кислород почти всегда проявляет валентность II, то есть образует две связи.' },
  { id: 10, question: 'Какой газ мы выделяем при выдохе?', options: ['Кислород', 'Азот', 'Углекислый газ', 'Водород'], correct: 2, explanation: 'В процессе дыхания мы поглощаем кислород и выделяем углекислый газ (CO₂).' }
];
