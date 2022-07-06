export enum ParamType {
  array = 'array',
  string = 'string',
  number = 'number',
  volume = 'volume',
}

export const aviableParams = {
  transport: {
    filterName: 'vehicleTypes',
    name: 'vehicleType',
    type: ParamType.string
  },
  brand: {
    filterName: 'makes',
    name: 'makes',
    type: ParamType.array
  },
  fuel: {
    filterName: 'fuelTypes',
    name: 'fuelTypes',
    type: ParamType.array
  },
  model: {
    filterName: 'models',
    name: 'models',
    type: ParamType.array,
  },
  volume: {
    filterName: 'engineCapacities',
    name: 'engineCapacities',
    type: ParamType.volume,
  },
  yearStart: {
    filterName: '',
    name: 'yearMin',
    type: ParamType.number,
  },
  yearEnd: {
    filterName: '',
    name: 'yearMax',
    type: ParamType.number,
  },
  priceStart: {
    filterName: '',
    name: 'priceMin',
    type: ParamType.number,
  },
  priceEnd: {
    filterName: '',
    name: 'priceMax',
    type: ParamType.number,
  },
  mileageStart: {
    filterName: '',
    name: 'odometerMin',
    type: ParamType.number,
  },
  mileageEnd: {
    filterName: '',
    name: 'odometerMax',
    type: ParamType.number,
  },
  damageTypes: {
    filterName: 'damageTypes',
    name: 'damageTypes',
    type: ParamType.array,
  },
  // secondaryDamage: {
  //   filterName: '',
  //   name: 'secondaryDamage',
  //   type: ParamType.string,
  // },
  condition: {
    filterName: 'vehicleConditions',
    name: 'vehicleConditions',
    type: ParamType.array,
  },
  transmissionTypes: {
    filterName: 'transmissionTypes',
    name: 'transmissionTypes',
    type: ParamType.array,
  },
  bodyStyles: {
    filterName: 'bodyStyles',
    name: 'bodyStyles',
    type: ParamType.array,
  },
  driveLineTypes: {
    filterName: 'drivelineTypes',
    name: 'driveLineTypes',
    type: ParamType.array,
  },
  saleDocumentsGroups: {
    filterName: 'saleDocumentsGroups',
    name: 'saleDocumentsGroups',
    type: ParamType.array,
  },
  sellerType: {
    filterName: '',
    name: 'sellerType',
    type: ParamType.string,
  },
}

export const range = (start: number, stop: number, step: number): string[] =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step))
    .map(n => n.toFixed(1));
