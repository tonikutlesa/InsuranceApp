import mongoose, { Document, Schema } from 'mongoose';

export enum Discounts {
  COMMERCIAL_DISCOUNT = 'Commercial discount',
  ADVISER_DISCOUNT = 'Adviser discount',
  VIP_DISCOUNT = 'VIP discount'
}

export enum Surcharges {
  STRONG_CAR_SURCHARGE = 'Strong car surcharge'
}

export enum Coverages {
  BONUS_PROTECTION = 'Bonus protection',
  AO_PLUS = 'AO+',
  GLASS_PROTECTION = 'Glass protection'
}

enum ConfigurationTypes {
  COVERAGE = 'coverage',
  DISCOUNT = 'discount',
  SURCHARGE = 'surcharge'
}

enum CalculationTypes {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed'
}

type FixedPriceType = {
  min?: Number;
  max?: Number;
  fixed?: Number;
};

const FixedValueSchema: Schema = new Schema({
  min: {
    type: Number
  },
  max: {
    type: Number
  },
  fixed: {
    type: Number
  }
});

export interface IConfiguration {
  name: string;
  configurationType: ConfigurationTypes;
  calculationType: CalculationTypes;
  percentageValue?: Number;
  fixedValue?: FixedPriceType;
}

export interface IConfigurationModel extends IConfiguration, Document {}

const ConfigurationSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    enum: [...Object.values(Discounts), ...Object.values(Surcharges), ...Object.values(Coverages)]
  },
  configurationType: {
    type: String,
    enum: [...Object.values(ConfigurationTypes)],
    required: true
  },
  calculationType: {
    type: String,
    enum: [...Object.values(CalculationTypes)],
    required: true
  },
  percentageValue: {
    type: Number
  },
  fixedValue: {
    type: FixedValueSchema
  }
});

export default mongoose.model<IConfigurationModel>('Configuration', ConfigurationSchema);
