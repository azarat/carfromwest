import CarSVG from '../assets/svg/cars.svg'
import TruckSVG from '../assets/svg/truck.svg'
import OtherCarSVG from '../assets/svg/other-car.svg'
import HatchbackCarSVG from '../assets/svg/hatchback.svg'
import CoupeCarSVG from '../assets/svg/coupe.svg'
import PickupCarSVG from '../assets/svg/pickup.svg'

export const years: any[] = []
for (let i = 2022; i >= 1960; i--) {
  years.push({ label: i, value: i })
}

export const transmissions: any[] = [
  { label: 'Всі', value: '' },
  { label: 'Механічна', value: 'manual' },
  { label: 'Автоматична', value: 'automatic' },
]

// export const driveLineTypes: any[] = [
//   { label: 'Всі', value: '' },
//   { label: 'Передній привід', value: 'front' },
//   { label: 'Задній привід', value: 'rear' },
//   { label: '4x4', value: 'four' },
//   { label: 'Повний привід', value: 'all' },
// ]


export const driveLineTypes: any[] = [
  { label: 'Всі', value: '' },
  { label: 'Передній/Повний', value: '4x4 w/Front Whl Drv' },
  { label: 'Задній/Повний', value: '4x4 w/Rear Wheel Drv' },
  { label: 'Повний', value: 'All wheel drive' },
  { label: 'Передній привід', value: 'Front-wheel Drive' },
  { label: 'Задній привід', value: 'Rear-wheel drive' },
]

export const primaryDamage: any[] = [
  { label: 'Всі', value: '' },
  { label: 'Ходова частина', value: 'Undercarriage' },
  { label: 'Передня частина', value: 'Front End' },
  { label: 'Задня частина', value: 'Rear End' },
  { label: 'Вода/повінь', value: 'Water/flood' },
  { label: 'Сторона', value: 'side' },
  { label: 'Ліва передня частина', value: 'Left Front' },
  { label: 'Історія пошкоджень', value: 'damage history' },  
]

// export const secondaryDamage: any[] = [
//   { label: 'Всі', value: '' },
//   { label: 'Підвіска', value: 'Suspension' },
//   { label: 'Невеликі подряпини і вм’ятини', value: 'Minor Dent/scratches' },
//   { label: 'Ліва сторона', value: 'Left side' },
//   { label: 'Задня частина', value: 'rear end' },
//   { label: 'Вода/повінь', value: 'Water/flood' },
//   { label: 'Сторона', value: 'side' },
//   { label: 'Ліва передня частина', value: 'Left Front' }, 
// ]

// export const condition: any[] = [
//   { label: 'Всі', value: '' },
//   { label: 'Їде', value: 'runs' },
//   { label: 'Заводиться', value: 'starts' },
//   { label: 'Не заводиться', value: 'wont-start' },
// ]

export const condition: any[] = [
  { label: 'Всі', value: '' },
  { label: 'Їде', value: 'RUNS AND DRIVES' },
  { label: 'Не заводиться', value: 'ENHANCED VEHICLES' },
  { label: 'Заводиться', value: 'ENGINE START PROGRAM' },
  { label: 'Н/Д', value: 'NaN' },
]

export const gas: { label: string; value: string }[] = [
  { label: 'Всі', value: '' },
  { label: 'Бензин', value: 'gas' },
  { label: 'Дизель', value: 'diesel' },
  { label: 'Гібрид', value: 'hybrid-engine' },
  { label: 'Електро', value: 'electric' },
  { label: 'Етанол 85', value: 'flexible-fuel' },
  { label: 'Газ', value: 'compressed-natural-gas' },
  { label: 'Конвертується на газ', value: 'convertible-to-gaseous-powered' },
  { label: 'Водень', value: 'hydrogen-fuel-cell' },
  { label: 'Зріджений газ', value: 'liquefied-petroleum-gas"' },
  { label: 'Інше', value: 'other' },
]

export const sort: { label: string; value: string }[] = [
  { label: 'Дата створення лота ↑', value: 'added-date--asc' },
  { label: 'Дата створення лота ↓', value: 'added-date--desc' },
  { label: 'Дата аукціона ↑', value: 'auction-date--asc' },
  { label: 'Дата аукціона ↓', value: 'auction-date--desc' },
  { label: 'Ставка ↑', value: 'current-bid--asc' },
  { label: 'Ставка ↓', value: 'current-bid--desc' },
  { label: 'Рік випуску ↑', value: 'year--asc' },
  { label: 'Рік випуску ↓', value: 'year--desc' },
  { label: 'Пробіг ↑', value: 'odometer--asc' },
  { label: 'Пробіг ↓', value: 'odometer--desc' },
]

export const vehicleTypes = [
  {
    title: 'Легкові',
    value: 'automobile',
    icon: CarSVG,
  },
  {
    title: 'Грузові',
    value: 'truck',
    icon: TruckSVG,
  },
  {
    title: 'Інші',
    value: 'other',
    icon: OtherCarSVG,
  },
]

export const bodyTypes = [
  { title: 'Седан', value: 'SEDAN 4D', icon: CarSVG },
  { title: 'Хетчбек', value: 'HATCHBAC', icon: HatchbackCarSVG },
  { title: 'Купе', value: 'COUPE', icon: CoupeCarSVG },
  { title: 'Пікап', value: 'PICKUP', icon: PickupCarSVG },
  { title: 'Інші', value: 'OTHER', icon: CarSVG },
]

export const bodyTypeArray = [
  '(none)',
  '2 Door',
  '2dr Spor',
  '3 Door Extended Cab Pickup',
  '3dr Ext',
  '4 Door',
  '4 Door Extended Cab Chassis',
  '4 Door Extended Cab Pickup',
  '4dr Ext',
  '4dr Spor',
  'All Terr',
  'Bus',
  'Cab &amp; Chassis (luv)',
  'Cab Chassis 2 Door',
  'Cargo Va',
  'Cargo Van',
  'Chassis',
  'Club Cab',
  'Club Cab Pickup',
  'Club Cha',
  'Conventi',
  'Converti',
  'Convertible',
  'Convertible 2 Door',
  'Coupe',
  'Coupe 2 Door',
  'Coupe 3 Dr.',
  'Coupe 3d',
  'Coupe 4 Dr.',
  'Crew Cab Long Bed',
  'Crew Cha',
  'Crew Chassis',
  'Crew Pic',
  'Crew Pickup',
  'Crew Van/cargo Van',
  'Cutaway',
  'Enduro',
  'Extended',
  'Extended Cab Pickup',
  'Extended Cargo Van',
  'Extended Sport Van',
  'Extended Van',
  'Forward Control',
  'Hatchbac',
  'Hatchback 2 Door',
  'Hatchback 2 Dr.',
  'Hatchback 4 Door',
  'Hatchback 4 Dr.',
  'Hearse',
  'Incomp P',
  'Incomple',
  'Incomplete Chassis',
  'Incomplete Ext Van',
  'Liftback',
  'Liftback 3 Dr.',
  'Limousin',
  'Limousine',
  'Mega Pickup',
  'Motor Sc',
  'Motorize',
  'Multi-purpose',
  'Passenger Van',
  'Pickup',
  'Pickup 2 Door',
  'Pickup 4 Door',
  'Pickup Long Bed',
  'Pillard Hardtop 2 Dr.',
  'Pillard Hardtop 4 Dr.',
  'Quad Pickup',
  'Racer',
  'Road/str',
  'Roadster',
  'Sedan',
  'Sedan 2',
  'Sedan 2 Door',
  'Sedan 2 Dr.',
  'Sedan 4 Door',
  'Sedan 4 Dr.',
  'Sedan 4d',
  'Sedan 5 Dr.',
  'Sport Pi',
  'Sport Pickup',
  'Sport Utility',
  'Sports V',
  'Sports Van',
  'Station',
  'Station Wagon',
  'Step Van',
  'Super Cab Pickup',
  'Suv 2 Door',
  'Suv 4 Door',
  'Tilt Cab',
  'Tractor',
  'Utility',
  'Van',
  'Van Camp',
  'Van Cargo 3 Door',
  'Van Passenger',
  'Van Passenger 3 Door',
  'Van Passenger 4 Door',
  'Wagon',
  'Wagon 2 Dr.',
  'Wagon 4 Door',
  'Wagon 4 Dr.',
  'Wagon 4d',
  'Window Van',
]
