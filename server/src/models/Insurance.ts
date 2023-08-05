import mongoose, { Document, Schema } from 'mongoose';
import { Discounts, Surcharges, Coverages } from './Configuration';
import { ConfigurationTransformation } from '../utils/utils';

export interface IInsurance {
  name: string;
  birthdate: Date;
  city: string;
  vehiclePower: number;
  voucher?: number;
  priceMatch?: number;
  discounts?: ConfigurationTransformation[];
  surcharges?: ConfigurationTransformation[];
  coverages?: ConfigurationTransformation[];
  basePrice?: Number;
  totalPrice?: Number;
}

export interface IInsuranceModel extends IInsurance, Document {}

const InsuranceSchema: Schema = new Schema({
  name: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  vehiclePower: {
    type: Number,
    required: true
  },
  voucher: {
    type: Number,
    default: null
  },
  priceMatch: {
    type: Number,
    default: null
  },
  discounts: {
    type: [
      {
        type: {
          name: {
            type: String,
            enum: Object.values(Discounts)
          },
          amount: {
            type: Number
          }
        }
      }
    ],
    default: []
  },
  surcharges: {
    type: [
      {
        type: {
          name: {
            type: String,
            enum: Object.values(Surcharges)
          },
          amount: {
            type: Number
          }
        }
      }
    ],
    default: []
  },
  coverages: {
    type: [
      {
        type: {
          name: {
            type: String,
            enum: Object.values(Coverages)
          },
          amount: {
            type: Number
          }
        }
      }
    ],
    default: []
  },
  basePrice: {
    type: Number,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
});

export default mongoose.model<IInsuranceModel>('Insurance', InsuranceSchema);
