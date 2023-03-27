const carFeatures = [
  {
    id: 1,
    eng: 'gas',
    ua: 'Бензин',
  },
  {
    id: 2,
    eng: 'diesel',
    ua: 'Дизель',
  },
  {
    id: 3,
    eng: 'flexible-fuel',
    ua: 'Етанол 85',
  },
  {
    id: 4,
    eng: 'compressed-natural-gas',
    ua: 'Стиснутий Природний Газ',
  },
  {
    id: 5,
    eng: 'convertible-to-cng',
    ua: 'Конвертується на газ',
  },
  {
    id: 6,
    eng: 'electric',
    ua: 'Електро',
  },
  {
    id: 7,
    eng: 'hybrid-engine',
    ua: 'Гибрид',
  },
  {
    id: 8,
    eng: 'hydrogen-fuel-cell',
    ua: 'Водень',
  },
  {
    id: 9,
    eng: 'liquefied-petroleum-gas',
    ua: 'Зріджений газ',
  },
  {
    id: 10,
    eng: 'automatic',
    ua: 'Автоматична',
  },
  {
    id: 11,
    eng: 'manual',
    ua: 'Механічна',
  },
  {
    id: 12,
    eng: 'engine-start',
    ua: 'Заводиться',
  },
  {
    id: 13,
    eng: 'run-and-drive',
    ua: 'Їде',
  },
  {
    id: 14,
    eng: 'wont-start',
    ua: 'Не заводиться',
  },
  {
    id: 15,
    eng: 'four',
    ua: '4x4',
  },
  {
    id: 16,
    eng: 'all',
    ua: 'Повний привід',
  },
  {
    id: 17,
    eng: 'front',
    ua: 'Передній привід',
  },
  {
    id: 18,
    eng: 'rear',
    ua: 'Задній привід',
  },
  {
    id: 19,
    eng: 'Salvage',
    ua: 'Утиль',
  },
  {
    id: 20,
    eng: 'CT',
    ua: 'Чисті документи',
  },
  {
    id: 21,
    eng: 'CERTIFICATE OF DESTRUCTION',
    ua: 'Не підлягає відновленню',
  },
  {
    id: 22,
    eng: 'sedan',
    ua: 'Седан',
  },
  {
    id: 23,
    eng: 'suv',
    ua: 'Кросовер',
  },
  {
    id: 24,
    eng: 'Rear End',
    ua: 'Задня частина',
  },
  {
    id: 25,
    eng: 'rollover',
    ua: 'Перекидання',
  },
  {
    id: 26,
    eng: 'missing/altered vin',
    ua: 'VIN відсутній або змінений',
  },
  {
    id: 27,
    eng: 'damage-history',
    ua: 'Історія пошкоджень',
  },
  {
    id: 28,
    eng: 'cash-for-cunkers',
    ua: 'Програма по викупу старих авто',
  },
  {
    id: 29,
    eng: 'Biohazard/chemical',
    ua: 'Біологічна небезпека',
  },
  {
    id: 30,
    eng: 'Water/flood',
    ua: 'Вода/повінь',
  },
  {
    id: 31,
    eng: 'rejected-repair',
    ua: 'Відмова від ремонту',
  },
  {
    id: 32,
    eng: 'hail',
    ua: 'град',
  },
  {
    id: 33,
    eng: 'roof',
    ua: 'Дах',
  },
  {
    id: 34,
    eng: 'rear',
    ua: 'Удар ззаду',
  },
  {
    id: 35,
    eng: 'electrical',
    ua: 'Електрика',
  },
  {
    id: 36,
    eng: 'right-front',
    ua: 'Права передня частина',
  },
  {
    id: 37,
    eng: 'repossession',
    ua: 'Забрали за невиплату',
  },
  {
    id: 38,
    eng: 'side',
    ua: 'Сторона',
  },
  {
    id: 39,
    eng: 'all over',
    ua: 'Все авто',
  },
  {
    id: 40,
    eng: 'vandalism',
    ua: 'Вандалізм',
  },
  {
    id: 41,
    eng: 'mechanical',
    ua: 'Механічні',
  },
  {
    id: 42,
    eng: 'none',
    ua: 'Без пошкоджень',
  },
  {
    id: 43,
    eng: 'Replaced Vin',
    ua: 'Заміна VIN',
  },
  {
    id: 44,
    eng: 'Left & Right Side',
    ua: 'Зліва і справа',
  },
  {
    id: 45,
    eng: 'Normal Wear & Tear',
    ua: 'Зношування при використанні',
  },
  {
    id: 46,
    eng: 'Theft',
    ua: 'Кража',
  },
  {
    id: 47,
    eng: 'Left Front',
    ua: 'Ліва передня частина',
  },
  {
    id: 48,
    eng: 'insurance',
    ua: 'Страхова компанія',
  },
  {
    id: 49,
    eng: 'dealer',
    ua: 'Продавець діллер',
  },
  {
    id: 50,
    eng: 'starts',
    ua: 'Заводиться',
  },
  {
    id: 51,
    eng: 'runs',
    ua: 'Їде',
  },
  {
    id: 52,
    eng: 'black',
    ua: 'Чорний',
  },
  {
    id: 53,
    eng: 'red',
    ua: 'Червоний',
  },
  {
    id: 54,
    eng: 'green',
    ua: 'Зелений',
  },
  {
    id: 55,
    eng: 'blue',
    ua: 'Синій',
  },
  {
    id: 56,
    eng: 'white',
    ua: 'Білий',
  },
  {
    id: 57,
    eng: 'Silver',
    ua: 'Срібна',
  },
  {
    id: 58,
    eng: 'Partial Repair',
    ua: 'Частковий ремонт',
  },
  {
    id: 59,
    eng: 'Undercarriage',
    ua: 'Ходова частина',
  },
  {
    id: 60,
    eng: 'Front & Rear',
    ua: 'Удар спереду і ззаду',
  },
  {
    id: 61,
    eng: 'Left Rear',
    ua: 'Удар зліва ззаду',
  },
  {
    id: 62,
    eng: 'Transmission',
    ua: 'Трансмісія',
  },
  {
    id: 63,
    eng: 'Stripped',
    ua: 'Розібраний',
  },
  {
    id: 64,
    eng: 'Suspension',
    ua: 'Підвіска',
  },
  {
    id: 65,
    eng: 'Fresh Water',
    ua: 'Прісна вода',
  },
  {
    id: 66,
    eng: 'Right Side',
    ua: 'Права сторона',
  },
  {
    id: 67,
    eng: 'Right Front',
    ua: 'Права передня частина',
  },
  {
    id: 68,
    eng: 'Right Rear',
    ua: 'Права задня частина',
  },
  {
    id: 69,
    eng: 'Storm Damage',
    ua: 'Пошкодження ураганом',
  },
  {
    id: 70,
    eng: 'Frame Damage',
    ua: 'Пошкодження кузова',
  },
  {
    id: 71,
    eng: 'Engine Damage',
    ua: 'Пошкодження двигуна',
  },
  {
    id: 72,
    eng: 'Burn - Interior',
    ua: 'Пожежа - інтер’єр',
  },
  {
    id: 73,
    eng: 'Burn - Exterior',
    ua: 'Пожежа - екстер’єр',
  },
  {
    id: 74,
    eng: 'Burn - Engine',
    ua: 'Пожежа - двигун',
  },
  {
    id: 75,
    eng: 'Burn - Total',
    ua: 'Пожежа - все авто',
  },
  {
    id: 76,
    eng: 'Burn',
    ua: 'Пожежа',
  },
  {
    id: 77,
    eng: 'Flood',
    ua: 'Повінь',
  },
  {
    id: 78,
    eng: 'Unknown',
    ua: 'Невідомо',
  },
  {
    id: 79,
    eng: 'Front End',
    ua: 'Передня частина',
  },
  {
    id: 80,
    eng: 'Minor Dent%2Fscratches',
    ua: 'Невеликі подряпини і вм’ятини',
  },
  {
    id: 81,
    eng: 'Mechanical',
    ua: 'Механічні',
  },
  {
    id: 82,
    eng: 'Left Side',
    ua: 'Ліва сторона',
  },
  { 
    id: 83,
    eng: 'Damage History', 
    ua: 'Історія пошкоджень' 
  },  { 
    id: 84,
    eng: 'NaN', 
    ua: 'Н/Д' 
  }, 
 
  { id: 86, ua: 'Передній/Повний', eng: '4x4 w/Front Whl Drv' },
  { id: 87, ua: 'Задній/Повний', eng: '4x4 w/Rear Wheel Drv' },
  { id: 88, ua: 'Повний', eng: 'All wheel drive' },
  { id: 89, ua: 'Передній привід', eng: 'Front-wheel Drive' },
  {  id: 90,ua: 'Задній привід', eng: 'Rear-wheel drive' },

   { id: 91, ua: 'Їде', eng: 'RUNS AND DRIVES' },
  {  id: 92,ua: 'Не заводиться', eng: 'ENHANCED VEHICLES' },
  {  id:93,ua: 'Заводиться', eng: 'ENGINE START PROGRAM' },
  
     { id: 95, ua: 'Роботизована', eng: 'BOTH AUTOMATED MANUAL' },
  {  id: 96,ua: 'Роботизована', eng: 'ECVT AUTOMATIC' },
  {  id:97,ua: 'Не зазначено', eng: 'UNKNOWN/OTHER' },
 
  
  
]

export default carFeatures
