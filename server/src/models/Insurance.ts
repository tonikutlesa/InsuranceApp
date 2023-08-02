import mongoose, { Document, Schema } from 'mongoose';
import { Discounts, Surcharges, Coverages } from './Configuration';

export interface IInsurance {
  name: string;
  birthdate: Date;
  city: string;
  vehiclePower: number;
  voucher?: number;
  priceMatch?: number;
  discounts?: Discounts[];
  surcharges?: Surcharges[];
  coverages?: Coverages[];
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
        type: String,
        enum: [...Object.values(Discounts)]
      }
    ],
    default: []
  },
  surcharges: {
    type: [
      {
        type: String,
        enum: [...Object.values(Surcharges)]
      }
    ],
    default: []
  },
  coverages: {
    type: [
      {
        type: String,
        enum: [...Object.values(Coverages)]
      }
    ],
    default: []
  },
  totalPrice: {
    type: Number,
    required: true
  }
});

export default mongoose.model<IInsuranceModel>('Insurance', InsuranceSchema);
