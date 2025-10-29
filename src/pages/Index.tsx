import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';

interface Character {
  id: number;
  name: string;
  element: string;
  weapon: string;
  rarity: number;
  image?: string;
}

interface Team {
  type: 'damage' | 'exploration' | 'support';
  members: string[];
  description: string;
}

const characters: Character[] = [
  { id: 1, name: 'Дилюк', element: 'Пиро', weapon: 'Двуручный меч', rarity: 5, image: 'https://static.wikia.nocookie.net/gensin-impact/images/3/3a/Character_Diluc_Portrait.png' },
  { id: 2, name: 'Кэ Цин', element: 'Электро', weapon: 'Одноручный меч', rarity: 5, image: 'https://static.wikia.nocookie.net/gensin-impact/images/0/06/Character_Keqing_Portrait.png' },
  { id: 3, name: 'Венти', element: 'Анемо', weapon: 'Лук', rarity: 5, image: 'https://static.wikia.nocookie.net/gensin-impact/images/8/8d/Character_Venti_Portrait.png' },
  { id: 4, name: 'Гань Юй', element: 'Крио', weapon: 'Лук', rarity: 5, image: 'https://static.wikia.nocookie.net/gensin-impact/images/d/d2/Character_Ganyu_Portrait.png' },
  { id: 5, name: 'Ху Тао', element: 'Пиро', weapon: 'Копьё', rarity: 5, image: 'https://static.wikia.nocookie.net/gensin-impact/images/2/2f/Character_Hu_Tao_Portrait.png' },
  { id: 6, name: 'Райдэн', element: 'Электро', weapon: 'Копьё', rarity: 5, image: 'https://static.wikia.nocookie.net/gensin-impact/images/3/30/Character_Raiden_Shogun_Portrait.png' },
  { id: 7, name: 'Аяка', element: 'Крио', weapon: 'Одноручный меч', rarity: 5, image: 'https://static.wikia.nocookie.net/gensin-impact/images/7/71/Character_Kamisato_Ayaka_Portrait.png' },
  { id: 8, name: 'Нахида', element: 'Дендро', weapon: 'Катализатор', rarity: 5, image: 'https://static.wikia.nocookie.net/gensin-impact/images/4/48/Character_Nahida_Portrait.png' },
  { id: 9, name: 'Джинн', element: 'Анемо', weapon: 'Одноручный меч', rarity: 5, image: 'https://static.wikia.nocookie.net/gensin-impact/images/2/20/Character_Jean_Portrait.png' },
  { id: 10, name: 'Мона', element: 'Гидро', weapon: 'Катализатор', rarity: 5, image: 'https://static.wikia.nocookie.net/gensin-impact/images/7/73/Character_Mona_Portrait.png' },
  { id: 11, name: 'Кли', element: 'Пиро', weapon: 'Катализатор', rarity: 5 },
  { id: 12, name: 'Тарталья', element: 'Гидро', weapon: 'Лук', rarity: 5 },
  { id: 13, name: 'Чжун Ли', element: 'Гео', weapon: 'Копьё', rarity: 5 },
  { id: 14, name: 'Альбедо', element: 'Гео', weapon: 'Одноручный меч', rarity: 5 },
  { id: 15, name: 'Сяо', element: 'Анемо', weapon: 'Копьё', rarity: 5 },
  { id: 16, name: 'Эола', element: 'Крио', weapon: 'Двуручный меч', rarity: 5 },
  { id: 17, name: 'Кадзуха', element: 'Анемо', weapon: 'Одноручный меч', rarity: 5 },
  { id: 19, name: 'Ёимия', element: 'Пиро', weapon: 'Лук', rarity: 5 },
  { id: 20, name: 'Кокоми', element: 'Гидро', weapon: 'Катализатор', rarity: 5 },
  { id: 21, name: 'Итто', element: 'Гео', weapon: 'Двуручный меч', rarity: 5 },
  { id: 22, name: 'Шэнь Хэ', element: 'Крио', weapon: 'Копьё', rarity: 5 },
  { id: 23, name: 'Яэ Мико', element: 'Электро', weapon: 'Катализатор', rarity: 5 },
  { id: 24, name: 'Аято', element: 'Гидро', weapon: 'Одноручный меч', rarity: 5 },
  { id: 25, name: 'Е Лань', element: 'Гидро', weapon: 'Лук', rarity: 5 },
  { id: 26, name: 'Тигнари', element: 'Дендро', weapon: 'Лук', rarity: 5 },
  { id: 27, name: 'Сайно', element: 'Электро', weapon: 'Копьё', rarity: 5 },
  { id: 28, name: 'Нилу', element: 'Гидро', weapon: 'Одноручный меч', rarity: 5 },
  { id: 29, name: 'Странник', element: 'Анемо', weapon: 'Катализатор', rarity: 5 },
  { id: 30, name: 'Аль-Хайтам', element: 'Дендро', weapon: 'Одноручный меч', rarity: 5 },
  { id: 31, name: 'Дэхья', element: 'Пиро', weapon: 'Двуручный меч', rarity: 5 },
  { id: 46, name: 'Невиллет', element: 'Гидро', weapon: 'Катализатор', rarity: 5 },
  { id: 47, name: 'Риосли', element: 'Крио', weapon: 'Одноручный меч', rarity: 5 },
  { id: 48, name: 'Фурина', element: 'Гидро', weapon: 'Одноручный меч', rarity: 5 },
  { id: 49, name: 'Лини', element: 'Пиро', weapon: 'Двуручный меч', rarity: 5 },
  { id: 50, name: 'Навия', element: 'Крио', weapon: 'Двуручный меч', rarity: 5 },
  { id: 51, name: 'Арлекино', element: 'Пиро', weapon: 'Копьё', rarity: 5 },
  { id: 52, name: 'Клоринда', element: 'Электро', weapon: 'Одноручный меч', rarity: 5 },
  { id: 53, name: 'Сигевин', element: 'Анемо', weapon: 'Лук', rarity: 5 },
  { id: 54, name: 'Эмили', element: 'Дендро', weapon: 'Копьё', rarity: 5 },
  { id: 55, name: 'Каччаторе', element: 'Анемо', weapon: 'Катализатор', rarity: 5 },
  { id: 56, name: 'Муалани', element: 'Гидро', weapon: 'Катализатор', rarity: 5 },
  { id: 57, name: 'Кинитч', element: 'Дендро', weapon: 'Двуручный меч', rarity: 5 },
  { id: 58, name: 'Мавуика', element: 'Пиро', weapon: 'Двуручный меч', rarity: 5 },
  { id: 32, name: 'Барбара', element: 'Гидро', weapon: 'Катализатор', rarity: 4 },
  { id: 33, name: 'Беннет', element: 'Пиро', weapon: 'Одноручный меч', rarity: 4 },
  { id: 34, name: 'Син Цю', element: 'Гидро', weapon: 'Одноручный меч', rarity: 4 },
  { id: 35, name: 'Фишль', element: 'Электро', weapon: 'Лук', rarity: 4 },
  { id: 36, name: 'Сян Лин', element: 'Пиро', weapon: 'Копьё', rarity: 4 },
  { id: 37, name: 'Розария', element: 'Крио', weapon: 'Копьё', rarity: 4 },
  { id: 38, name: 'Диона', element: 'Крио', weapon: 'Лук', rarity: 4 },
  { id: 39, name: 'Сахароза', element: 'Анемо', weapon: 'Катализатор', rarity: 4 },
  { id: 40, name: 'Сара', element: 'Электро', weapon: 'Лук', rarity: 4 },
  { id: 41, name: 'Горо', element: 'Гео', weapon: 'Лук', rarity: 4 },
  { id: 42, name: 'Саю', element: 'Анемо', weapon: 'Двуручный меч', rarity: 4 },
  { id: 43, name: 'Ноэлль', element: 'Гео', weapon: 'Двуручный меч', rarity: 4 },
  { id: 44, name: 'Нин Гуан', element: 'Гео', weapon: 'Катализатор', rarity: 4 },
  { id: 45, name: 'Бэй Доу', element: 'Электро', weapon: 'Двуручный меч', rarity: 4 },
  { id: 58, name: 'Чоньюн', element: 'Пиро', weapon: 'Двуручный меч', rarity: 4 },
  { id: 59, name: 'Нинггуан', element: 'Гео', weapon: 'Катализатор', rarity: 4 },
  { id: 60, name: 'Кэя', element: 'Крио', weapon: 'Одноручный меч', rarity: 4 },
  { id: 61, name: 'Лиза', element: 'Электро', weapon: 'Катализатор', rarity: 4 },
  { id: 62, name: 'Рэйзор', element: 'Электро', weapon: 'Двуручный меч', rarity: 4 },
  { id: 63, name: 'Янь Фэй', element: 'Пиро', weapon: 'Катализатор', rarity: 4 },
  { id: 64, name: 'Чунь Юнь', element: 'Крио', weapon: 'Двуручный меч', rarity: 4 },
  { id: 65, name: 'Сиканоин', element: 'Гидро', weapon: 'Катализатор', rarity: 4 },
  { id: 66, name: 'Шеврёз', element: 'Анемо', weapon: 'Двуручный меч', rarity: 4 },
  { id: 67, name: 'Фремине', element: 'Крио', weapon: 'Одноручный меч', rarity: 4 },
  { id: 68, name: 'Линетт', element: 'Анемо', weapon: 'Одноручный меч', rarity: 4 },
  { id: 69, name: 'Шарлотта', element: 'Крио', weapon: 'Катализатор', rarity: 4 },
  { id: 70, name: 'Гейминг', element: 'Анемо', weapon: 'Двуручный меч', rarity: 4 },
  { id: 71, name: 'Каве', element: 'Дендро', weapon: 'Двуручный меч', rarity: 4 },
  { id: 72, name: 'Фарузан', element: 'Анемо', weapon: 'Лук', rarity: 4 },
  { id: 73, name: 'Лайла', element: 'Крио', weapon: 'Одноручный меч', rarity: 4 },
  { id: 74, name: 'Яо Яо', element: 'Дендро', weapon: 'Копьё', rarity: 4 },
  { id: 75, name: 'Кандакия', element: 'Гидро', weapon: 'Копьё', rarity: 4 },
  { id: 76, name: 'Коллей', element: 'Дендро', weapon: 'Лук', rarity: 4 },
  { id: 77, name: 'Дори', element: 'Дендро', weapon: 'Двуручный меч', rarity: 4 },
  { id: 78, name: 'Тома', element: 'Пиро', weapon: 'Копьё', rarity: 4 },
];

const teams: Record<number, Team[]> = {
  1: [
    { type: 'damage', members: ['Дилюк', 'Син Цю', 'Беннет', 'Кадзуха'], description: 'Испарение для максимального урона' },
    { type: 'exploration', members: ['Дилюк', 'Венти', 'Чжун Ли', 'Кадзуха'], description: 'Быстрое передвижение и раскопки' },
    { type: 'support', members: ['Дилюк', 'Беннет', 'Диона', 'Розария'], description: 'Плавление с крио резонансом' },
  ],
  2: [
    { type: 'damage', members: ['Кэ Цин', 'Фишль', 'Беннет', 'Кадзуха'], description: 'Электро-заряжение для урона' },
    { type: 'exploration', members: ['Кэ Цин', 'Саю', 'Кадзуха', 'Венти'], description: 'Моментальное перемещение по карте' },
    { type: 'support', members: ['Кэ Цин', 'Сара', 'Беннет', 'Чжун Ли'], description: 'Усиление атаки и защита' },
  ],
  3: [
    { type: 'damage', members: ['Венти', 'Сяо', 'Беннет', 'Чжун Ли'], description: 'Контроль толпы с усилением' },
    { type: 'exploration', members: ['Венти', 'Сяо', 'Кадзуха', 'Саю'], description: 'Максимальная мобильность' },
    { type: 'support', members: ['Венти', 'Джинн', 'Фишль', 'Син Цю'], description: 'Группировка врагов и реакции' },
  ],
  4: [
    { type: 'damage', members: ['Гань Юй', 'Мона', 'Венти', 'Диона'], description: 'Заморозка для критического урона' },
    { type: 'exploration', members: ['Гань Юй', 'Венти', 'Кадзуха', 'Чжун Ли'], description: 'Дальние атаки и разведка' },
    { type: 'support', members: ['Гань Юй', 'Син Цю', 'Шэнь Хэ', 'Кокоми'], description: 'Крио-гидро контроль' },
  ],
  5: [
    { type: 'damage', members: ['Ху Тао', 'Син Цю', 'Чжун Ли', 'Альбедо'], description: 'Испарение с защитой' },
    { type: 'exploration', members: ['Ху Тао', 'Кадзуха', 'Венти', 'Саю'], description: 'Быстрые спринты и парение' },
    { type: 'support', members: ['Ху Тао', 'Син Цю', 'Янь Фэй', 'Томо'], description: 'Пиро резонанс с защитой' },
  ],
  6: [
    { type: 'damage', members: ['Райдэн', 'Син Цю', 'Сян Лин', 'Беннет'], description: 'Национальная команда с Райден' },
    { type: 'exploration', members: ['Райдэн', 'Кадзуха', 'Саю', 'Венти'], description: 'Восполнение энергии в пути' },
    { type: 'support', members: ['Райдэн', 'Сара', 'Кокоми', 'Кадзуха'], description: 'Баф энергии и атаки' },
  ],
  7: [
    { type: 'damage', members: ['Аяка', 'Мона', 'Кадзуха', 'Диона'], description: 'Крио-заморозка с взрывным уроном' },
    { type: 'exploration', members: ['Аяка', 'Саю', 'Венти', 'Чжун Ли'], description: 'Альтернативный спринт по воде' },
    { type: 'support', members: ['Аяка', 'Шэнь Хэ', 'Кокоми', 'Венти'], description: 'Усиление крио урона' },
  ],
  8: [
    { type: 'damage', members: ['Нахида', 'Райдэн', 'Син Цю', 'Кадзуха'], description: 'Буйное цветение с контролем' },
    { type: 'exploration', members: ['Нахида', 'Венти', 'Кадзуха', 'Чжун Ли'], description: 'Сбор материалов дендро' },
    { type: 'support', members: ['Нахида', 'Фишль', 'Бэй Доу', 'Кокоми'], description: 'Активация с электро резонансом' },
  ],
};

const elementColors: Record<string, string> = {
  'Пиро': 'bg-orange-500',
  'Гидро': 'bg-blue-500',
  'Анемо': 'bg-teal-400',
  'Электро': 'bg-purple-500',
  'Дендро': 'bg-green-500',
  'Крио': 'bg-cyan-400',
  'Гео': 'bg-yellow-600',
};

const elementIcons: Record<string, string> = {
  'Пиро': 'Flame',
  'Гидро': 'Droplet',
  'Анемо': 'Wind',
  'Электро': 'Zap',
  'Дендро': 'Leaf',
  'Крио': 'Snowflake',
  'Гео': 'Mountain',
};

export default function Index() {
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState<'characters' | 'support'>('characters');
  const [selectedElement, setSelectedElement] = useState<string>('Все');
  const [selectedRarity, setSelectedRarity] = useState<number | 'all'>('all');
  const [favorites, setFavorites] = useState<number[]>([]);

  const elements = ['Все', 'Пиро', 'Гидро', 'Анемо', 'Электро', 'Дендро', 'Крио', 'Гео'];

  const toggleFavorite = (charId: number) => {
    setFavorites(prev => 
      prev.includes(charId) 
        ? prev.filter(id => id !== charId)
        : [...prev, charId]
    );
  };

  const filteredCharacters = characters.filter(char => {
    const matchesSearch = char.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      char.element.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesElement = selectedElement === 'Все' || char.element === selectedElement;
    const matchesRarity = selectedRarity === 'all' || char.rarity === selectedRarity;
    return matchesSearch && matchesElement && matchesRarity;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="border-b border-primary/20 bg-card/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Sparkles" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Genshin Teams
              </h1>
            </div>
            <div className="flex gap-2">
              <Button
                variant={currentPage === 'characters' ? 'default' : 'ghost'}
                onClick={() => setCurrentPage('characters')}
                className="gap-2"
              >
                <Icon name="Users" size={18} />
                Персонажи
              </Button>
              <Button
                variant={currentPage === 'support' ? 'default' : 'ghost'}
                onClick={() => setCurrentPage('support')}
                className="gap-2"
              >
                <Icon name="MessageCircle" size={18} />
                Поддержка
              </Button>
              <div className="relative">
                <Button
                  variant="ghost"
                  onClick={() => {
                    setCurrentPage('characters');
                    setSelectedRarity('all');
                    setSelectedElement('Все');
                    setSearchQuery('');
                    const favChars = characters.filter(c => favorites.includes(c.id));
                    if (favChars.length > 0) setSelectedChar(favChars[0]);
                  }}
                  className="gap-2"
                >
                  <Icon name="Heart" size={18} className={favorites.length > 0 ? 'fill-red-500 text-red-500' : ''} />
                  Избранное
                </Button>
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {currentPage === 'characters' ? (
          <>
            <div className="mb-8 max-w-4xl mx-auto space-y-4">
              <div className="relative">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Поиск персонажа или элемента..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card/50 backdrop-blur border-primary/20"
                />
              </div>
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 justify-center">
                  {elements.map((element) => {
                    const isSelected = selectedElement === element;
                    return (
                      <button
                        key={element}
                        onClick={() => setSelectedElement(element)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 flex items-center gap-2 ${
                          isSelected
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                            : 'bg-card/50 backdrop-blur border border-primary/20 hover:border-primary/40'
                        }`}
                      >
                        {element !== 'Все' && (
                          <div className={`w-6 h-6 rounded-full ${elementColors[element]} flex items-center justify-center`}>
                            <Icon name={elementIcons[element]} size={14} className="text-white" />
                          </div>
                        )}
                        {element}
                      </button>
                    );
                  })}
                </div>
                <div className="flex gap-2 justify-center">
                  {['all', 5, 4].map((rarity) => (
                    <button
                      key={rarity}
                      onClick={() => setSelectedRarity(rarity as number | 'all')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 flex items-center gap-2 ${
                        selectedRarity === rarity
                          ? 'bg-secondary text-secondary-foreground shadow-lg shadow-secondary/30'
                          : 'bg-card/50 backdrop-blur border border-primary/20 hover:border-primary/40'
                      }`}
                    >
                      {rarity === 'all' ? (
                        <>
                          <Icon name="Users" size={16} />
                          Все
                        </>
                      ) : (
                        <>
                          <Icon name="Star" size={16} className="text-yellow-400 fill-yellow-400" />
                          {rarity} звезд
                        </>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card className="bg-card/50 backdrop-blur border-primary/20 sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Users" size={20} />
                      Персонажи
                    </CardTitle>
                    <CardDescription>Выберите персонажа для просмотра отрядов</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2 max-h-[calc(100vh-16rem)] overflow-y-auto">
                    {filteredCharacters.map((char) => (
                      <button
                        key={char.id}
                        onClick={() => setSelectedChar(char)}
                        className={`w-full p-3 rounded-lg border transition-all hover:scale-[1.02] ${
                          selectedChar?.id === char.id
                            ? 'bg-primary/20 border-primary shadow-lg shadow-primary/20'
                            : 'bg-card/30 border-border/50 hover:bg-card/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {char.image ? (
                              <img 
                                src={char.image} 
                                alt={char.name}
                                className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                              />
                            ) : (
                              <div className={`w-12 h-12 rounded-full ${elementColors[char.element]} flex items-center justify-center`}>
                                <Icon name={elementIcons[char.element]} size={20} className="text-white" />
                              </div>
                            )}
                            <div className="text-left">
                              <p className="font-semibold">{char.name}</p>
                              <p className="text-xs text-muted-foreground">{char.weapon}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(char.id);
                              }}
                              className="p-1 hover:scale-110 transition-transform"
                            >
                              <Icon 
                                name="Heart" 
                                size={18} 
                                className={favorites.includes(char.id) ? 'fill-red-500 text-red-500' : 'text-muted-foreground'} 
                              />
                            </button>
                            <div className="flex gap-1">
                              {[...Array(char.rarity)].map((_, i) => (
                                <Icon key={i} name="Star" size={14} className="text-yellow-400 fill-yellow-400" />
                              ))}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                {selectedChar ? (
                  <div className="space-y-6">
                    <Card className="bg-gradient-to-br from-card/80 to-card/50 backdrop-blur border-primary/20">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          {selectedChar.image ? (
                            <img 
                              src={selectedChar.image} 
                              alt={selectedChar.name}
                              className="w-20 h-20 rounded-2xl object-cover border-2 border-primary/50 shadow-xl"
                            />
                          ) : (
                            <div className={`w-20 h-20 rounded-2xl ${elementColors[selectedChar.element]} flex items-center justify-center shadow-lg`}>
                              <Icon name={elementIcons[selectedChar.element]} size={32} className="text-white" />
                            </div>
                          )}
                          <div>
                            <CardTitle className="text-3xl">{selectedChar.name}</CardTitle>
                            <CardDescription className="text-base mt-1">
                              {selectedChar.element} • {selectedChar.weapon}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>

                    <Tabs defaultValue="damage" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 bg-card/50 backdrop-blur">
                        <TabsTrigger value="damage" className="gap-2">
                          <Icon name="Sword" size={16} />
                          Урон
                        </TabsTrigger>
                        <TabsTrigger value="exploration" className="gap-2">
                          <Icon name="Map" size={16} />
                          Исследование
                        </TabsTrigger>
                        <TabsTrigger value="support" className="gap-2">
                          <Icon name="Shield" size={16} />
                          Баффы
                        </TabsTrigger>
                      </TabsList>

                      {['damage', 'exploration', 'support'].map((teamType) => {
                        const team = teams[selectedChar.id]?.find((t) => t.type === teamType);
                        return (
                          <TabsContent key={teamType} value={teamType} className="mt-6">
                            {team ? (
                              <Card className="bg-card/50 backdrop-blur border-primary/20">
                                <CardHeader>
                                  <CardDescription>{team.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid sm:grid-cols-2 gap-3">
                                    {team.members.map((member, idx) => (
                                      <div
                                        key={idx}
                                        className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 hover:border-primary/40 transition-all hover:scale-[1.02]"
                                      >
                                        <div className="flex items-center gap-3">
                                          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                                            {idx + 1}
                                          </div>
                                          <p className="font-medium">{member}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>
                            ) : (
                              <Card className="bg-card/50 backdrop-blur border-primary/20">
                                <CardContent className="py-12 text-center text-muted-foreground">
                                  Команда в разработке
                                </CardContent>
                              </Card>
                            )}
                          </TabsContent>
                        );
                      })}
                    </Tabs>
                  </div>
                ) : (
                  <Card className="bg-card/50 backdrop-blur border-primary/20">
                    <CardContent className="py-24 text-center">
                      <Icon name="UserCircle" size={64} className="mx-auto text-muted-foreground mb-4" />
                      <p className="text-xl text-muted-foreground">
                        Выберите персонажа для просмотра отрядов
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card/50 backdrop-blur border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon name="MessageCircle" size={24} className="text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Поддержка</CardTitle>
                    <CardDescription>Свяжитесь с нами для помощи</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="Send" size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Telegram</h3>
                      <p className="text-muted-foreground mb-3">
                        Напишите нам в Telegram для быстрой помощи
                      </p>
                      <a
                        href="https://t.me/W0xxx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
                      >
                        <Icon name="Send" size={18} />
                        @W0xxx
                      </a>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Icon name="HelpCircle" size={20} />
                    Часто задаваемые вопросы
                  </h3>
                  <div className="space-y-2">
                    {[
                      'Как использовать отряды?',
                      'Где найти персонажей?',
                      'Как улучшить команду?',
                    ].map((question, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-lg bg-card/30 border border-border/50 hover:border-primary/30 transition-colors"
                      >
                        <p className="text-sm">{question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}