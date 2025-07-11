// src/data/governmentData.js
export const governmentMembers = [
  {
    id: 'prince-jackson',
    name: 'Prince Jackson',
    title: 'Prince of the City',
    clan: 'Ventrue',
    imageUrl: 'src/assets/PrinceJackson.png',
    sub: ['sheriff-damien','primogen-critias', 'primogen-annabelle', 'primogen-rosa'], // IDs of direct subordinates
  },
  {
    id: 'sheriff-damien',
    name: 'Damien',
    title: 'Sheriff',
    clan: 'Brujah',
    imageUrl: 'src/assets/damien.png',
    boss: 'prince-jackson',
    sub: [],
  },
  {
    id: 'scourge-santos',
    name: 'Alexa Santos',
    title: 'Magnus Canis',
    clan: 'Malkavian',
    imageUrl: 'src/assets/santos.png',
    boss: 'sheriff-damien',
    sub: [],
  },
  {
    id: 'primogen-critias',
    name: 'Critias',
    title: 'Primogen (Brujah)',
    clan: 'Brujah',
    imageUrl: 'src/assets/critias.png',
    boss: 'prince-jackson', // ID of direct superior
    sub: [],
  },
  {
    id: 'primogen-annabelle',
    name: 'Annabelle',
    title: 'Primogen (Toreador)',
    clan: 'Toreador',
    imageUrl: 'src/assets/annabelle.png',
    boss: 'prince-jackson',
    sub: [],
  },
  {
    id: 'primogen-rosa',
    name: 'Rosa Hernandez',
    title: 'Primogen (Gangrel)',
    clan: 'Gangrel',
    imageUrl: 'src/assets/rosa.png',
    boss: 'prince-jackson',
    sub: [],
  },
  {
    id: 'primogen-son',
    name: 'Son',
    title: 'Primogen (Malkavian)',
    clan: 'Malkavian',
    imageUrl: 'src/assets/son.png',
    boss: 'prince-jackson',
    sub: [],
  },
  {
    id: 'primogen-khalid',
    name: 'Khalid',
    title: 'Primogen (Nosferatu)',
    clan: 'Nosferatu',
    imageUrl: 'src/assets/khalid.png',
    boss: 'prince-jackson',
    sub: [],
  },
  {
    id: 'magister-marcel',
    name: 'Marcel',
    title: 'Amicus Curiae',
    clan: 'Ministry',
    imageUrl: 'src/assets/marcel.png',
    boss: 'prince-jackson',
    sub: [],
  },
  {
    id: 'ambassador-sierra',
    name: 'Sierra Van Burrace',
    title: 'Lasombra Ambassador',
    clan: 'Lasombra',
    imageUrl: 'src/assets/sierra.png',
    boss: 'prince-jackson',
    sub: [],
  },
  
];