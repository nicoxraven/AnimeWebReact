







export const COVERS = {
  celestial: '/anime/cover-celestial.png',
  blade: '/anime/cover-blade.png',
  mecha: '/anime/cover-mecha.png',
  spirit: '/anime/cover-spirit.png',
  academy: '/anime/cover-academy.png',
  void: '/anime/cover-void.png'
};

export const media = [
{
  id: 'm1',
  slug: 'celestial-gate',
  title: 'Celestial Gate',
  type: 'movie',
  cover: COVERS.celestial,
  year: 2024,
  rating: 9.2,
  genres: ['Fantasy', 'Action'],
  studio: 'Studio Aurora',
  synopsis:
  'A lone shrine maiden discovers she can open gates between worlds, and must choose which reality survives before the eclipse.',
  premium: false,
  duration: '1h 58m',
  trending: true
},
{
  id: 'm2',
  slug: 'neon-blade',
  title: 'Neon Blade',
  type: 'movie',
  cover: COVERS.blade,
  year: 2025,
  rating: 8.9,
  genres: ['Cyberpunk', 'Thriller'],
  studio: 'Kaze Pictures',
  synopsis:
  'In a rain-drenched megacity, a masterless swordsman hunts the syndicate that erased his memories.',
  premium: true,
  duration: '2h 06m',
  trending: true
},
{
  id: 'm3',
  slug: 'starfall-mecha',
  title: 'Starfall Mecha',
  type: 'movie',
  cover: COVERS.mecha,
  year: 2023,
  rating: 8.6,
  genres: ['Mecha', 'Sci-Fi'],
  studio: 'Gigawatt',
  synopsis:
  'When alien titans breach the atmosphere, a reluctant pilot bonds with the last prototype to defend the last city.',
  premium: false,
  duration: '2h 14m',
  trending: true
},
{
  id: 'm4',
  slug: 'void-sorcerer',
  title: 'Void Sorcerer',
  type: 'movie',
  cover: COVERS.void,
  year: 2025,
  rating: 9.0,
  genres: ['Dark Fantasy', 'Supernatural'],
  studio: 'Studio Aurora',
  synopsis:
  'A cursed student inherits forbidden magic and slips ever closer to becoming the very void he swore to seal.',
  premium: true,
  duration: '1h 49m',
  trending: true
},
{
  id: 'mg1',
  slug: 'fox-spirit-lantern',
  title: 'Fox Spirit Lantern',
  type: 'manga',
  cover: COVERS.spirit,
  year: 2024,
  rating: 9.1,
  genres: ['Supernatural', 'Romance'],
  studio: 'Lantern Works',
  synopsis:
  'A masked spirit collects the regrets of the living during the lantern festival, until one wish she cannot grant.',
  premium: false,
  chapters: 42,
  trending: true
},
{
  id: 'mg2',
  slug: 'elemental-academy',
  title: 'Elemental Academy',
  type: 'manga',
  cover: COVERS.academy,
  year: 2025,
  rating: 8.7,
  genres: ['Shonen', 'Adventure'],
  studio: 'Prism Ink',
  synopsis:
  'Four rivals at an elite academy of elemental arts must unite when a forbidden fifth element awakens.',
  premium: true,
  chapters: 88,
  trending: true
},
{
  id: 'mg3',
  slug: 'blade-chronicles',
  title: 'Blade Chronicles',
  type: 'manga',
  cover: COVERS.blade,
  year: 2023,
  rating: 8.5,
  genres: ['Action', 'Drama'],
  studio: 'Kaze Ink',
  synopsis:
  'The illustrated origin of the Neon Blade legend — a swordsman rebuilt from nothing.',
  premium: false,
  chapters: 61
},
{
  id: 'mg4',
  slug: 'gate-keeper',
  title: 'Gate Keeper',
  type: 'manga',
  cover: COVERS.celestial,
  year: 2024,
  rating: 8.8,
  genres: ['Fantasy', 'Mystery'],
  studio: 'Aurora Ink',
  synopsis:
  'Prequel to Celestial Gate — the first maiden and the price of the very first gate.',
  premium: true,
  chapters: 27
}];


export const news = [
{
  id: 'n1',
  title: 'Celestial Gate 2 Confirmed for Winter Season',
  excerpt:
  'Studio Aurora teases a direct sequel with returning cast and a new gate mythology at the center of the story.',
  category: 'Announcements',
  cover: COVERS.celestial,
  author: 'Rin Takara',
  date: 'Aug 12, 2026',
  premium: false,
  readTime: '3 min'
},
{
  id: 'n2',
  title: 'Exclusive: Behind the Ink of Elemental Academy',
  excerpt:
  'A rare studio interview on the paneling techniques driving the manga phenomenon — subscriber-only deep dive.',
  category: 'Interviews',
  cover: COVERS.academy,
  author: 'Mei Sato',
  date: 'Aug 10, 2026',
  premium: true,
  readTime: '9 min'
},
{
  id: 'n3',
  title: 'Neon Blade Tops Global Streaming Charts',
  excerpt:
  'The cyberpunk feature breaks records in its opening weekend across 40 regions.',
  category: 'Charts',
  cover: COVERS.blade,
  author: 'Kenji Aoi',
  date: 'Aug 8, 2026',
  premium: false,
  readTime: '4 min'
},
{
  id: 'n4',
  title: 'Void Sorcerer Score to Get Vinyl Release',
  excerpt:
  'The haunting orchestral soundtrack arrives on limited edition vinyl this fall.',
  category: 'Music',
  cover: COVERS.void,
  author: 'Rin Takara',
  date: 'Aug 5, 2026',
  premium: false,
  readTime: '2 min'
}];


export const forumPosts = [
{
  id: 'f1',
  title: 'Celestial Gate ending — did anyone else catch the eclipse foreshadowing?',
  body: 'Rewatching the first act, the lantern colors literally spell out the ending. Studio Aurora cooked. Spoilers inside, let us discuss the gate mechanics.',
  author: 'Yuki_92',
  authorAvatar: '/anime/cover-spirit.png',
  authorRole: 'premium',
  category: 'Discussion',
  tags: ['Celestial Gate', 'Theory', 'Spoilers'],
  votes: 342,
  comments: 87,
  createdAt: '2h ago',
  pinned: true
},
{
  id: 'f2',
  title: 'Best reading order for the Blade Chronicles manga vs the movie?',
  body: 'New here. Should I read the manga before watching Neon Blade or after? Trying to avoid spoilers.',
  author: 'ramen_lord',
  authorAvatar: '/anime/cover-blade.png',
  authorRole: 'free',
  category: 'Help',
  tags: ['Neon Blade', 'Manga'],
  votes: 128,
  comments: 34,
  createdAt: '5h ago'
},
{
  id: 'f3',
  title: 'Elemental Academy chapter 88 discussion thread',
  body: 'That fifth element reveal changes everything. Creator drop was insane this week.',
  author: 'PrismFan',
  authorAvatar: '/anime/cover-academy.png',
  authorRole: 'creator',
  category: 'Discussion',
  tags: ['Elemental Academy', 'Chapter'],
  votes: 512,
  comments: 156,
  createdAt: '8h ago'
},
{
  id: 'f4',
  title: 'Unpopular opinion: Starfall Mecha has the best fight choreography of the year',
  body: 'The gravity-shift sequence in act two is a masterclift. Change my mind.',
  author: 'mechahead',
  authorAvatar: '/anime/cover-mecha.png',
  authorRole: 'free',
  category: 'Hot Takes',
  tags: ['Starfall Mecha', 'Animation'],
  votes: 96,
  comments: 41,
  createdAt: '1d ago'
}];


export const comments = [
{
  id: 'c1',
  author: 'Yuki_92',
  avatar: '/anime/cover-spirit.png',
  role: 'premium',
  body: 'The soundtrack in this scene gives me chills every single time.',
  time: '12m ago',
  likes: 24
},
{
  id: 'c2',
  author: 'ramen_lord',
  avatar: '/anime/cover-blade.png',
  role: 'free',
  body: 'Wait, is that the same shrine from the opening? Nice detail.',
  time: '34m ago',
  likes: 11
},
{
  id: 'c3',
  author: 'PrismFan',
  avatar: '/anime/cover-academy.png',
  role: 'creator',
  body: 'Animation budget was clearly not a concern here. Gorgeous.',
  time: '1h ago',
  likes: 47
}];


export const users = [
{
  id: 'u1',
  name: 'Aya Kurosawa',
  handle: 'aya.k',
  email: 'aya@kamistream.io',
  phone: '09-7712-4408',
  avatar: '/anime/cover-spirit.png',
  role: 'admin',
  subscription: 'active',
  joined: 'Jan 2024'
},
{
  id: 'u2',
  name: 'Kenji Aoi',
  handle: 'kenji.creates',
  email: 'kenji@kamistream.io',
  phone: '09-4420-1187',
  avatar: '/anime/cover-blade.png',
  role: 'creator',
  subscription: 'active',
  joined: 'Mar 2024'
},
{
  id: 'u3',
  name: 'Yuki Tanaka',
  handle: 'Yuki_92',
  email: 'yuki92@mail.com',
  phone: '09-9981-3320',
  avatar: '/anime/cover-academy.png',
  role: 'premium',
  subscription: 'active',
  joined: 'Jun 2024'
},
{
  id: 'u4',
  name: 'Min Thura',
  handle: 'ramen_lord',
  email: 'ramen@mail.com',
  phone: '09-2245-6690',
  avatar: '/anime/cover-mecha.png',
  role: 'free',
  subscription: 'inactive',
  joined: 'Nov 2024'
},
{
  id: 'u5',
  name: 'Su Su Hlaing',
  handle: 'prism.fan',
  email: 'susu@mail.com',
  phone: '09-6634-0091',
  avatar: '/anime/cover-void.png',
  role: 'premium',
  subscription: 'pending',
  joined: 'Feb 2026'
},
{
  id: 'u6',
  name: 'Zaw Lin',
  handle: 'mechahead',
  email: 'zaw@mail.com',
  phone: '09-3390-7745',
  avatar: '/anime/cover-celestial.png',
  role: 'free',
  subscription: 'inactive',
  joined: 'Apr 2026'
}];


export const activeMembers = users.slice(0, 5).map((u) => ({
  name: u.handle,
  avatar: u.avatar,
  role: u.role
}));

export const forumCategories = [
'All',
'Discussion',
'Help',
'Hot Takes',
'Theory',
'News'];


export const PLAN_PRICING = {
  monthly: { label: 'Monthly', price: 4900, per: '/mo', note: 'Billed monthly' },
  yearly: {
    label: 'Yearly',
    price: 49000,
    per: '/yr',
    note: 'Save 17% — 2 months free'
  }
};