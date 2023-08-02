import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Insurance, { IInsurance } from '../models/Insurance';
import { calculateInsurancePrice } from '../utils/utils';
import Logger from '../utils/Logger';

const getAllInsurances = async (req: Request, res: Response) => {
  try {
    const insurances = await Insurance.find();
    res.status(200).json({ insurances });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const upsertInsurance = async (req: Request, res: Response) => {
  const insuranceId = req.params.insuranceId;
  const { name, birthdate, city, vehiclePower, voucher, priceMatch, discounts, surcharges, coverages } = req.body;

  if (insuranceId) {
    try {
      const existingInsurance = await Insurance.findOne({ _id: insuranceId });

      if (!existingInsurance) {
        return res.status(404).json({ error: `Insurance with id ${insuranceId} not found.` });
      }

      const totalPrice = calculateInsurancePrice(existingInsurance);

      const updates: IInsurance = {
        name,
        birthdate,
        city,
        vehiclePower,
        voucher,
        priceMatch,
        discounts,
        surcharges,
        coverages,
        totalPrice
      };

      const updatedInsurance = await Insurance.findOneAndUpdate({ _id: insuranceId }, updates, { new: true });

      return res.status(200).json({ data: updatedInsurance });
    } catch (error) {
      return res.status(500).json({ error: 'Error while updating insurance.' });
    }
  }

  const insurance = new Insurance({
    _id: new mongoose.Types.ObjectId(),
    name,
    birthdate,
    city,
    vehiclePower,
    voucher,
    priceMatch,
    discounts,
    surcharges,
    coverages
  });

  insurance.totalPrice = calculateInsurancePrice(insurance);

  try {
    await insurance.save();
    return res.status(201).json({ data: insurance });
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong.' });
  }
};

const deleteInsurance = async (req: Request, res: Response): Promise<Response> => {
  const insuranceId = req.params._id;

  try {
    const insurance = await Insurance.findByIdAndDelete(insuranceId);
    if (insurance) {
      return res.status(200).json({ insurance });
    } else {
      return res.status(404).json({ error: `Insurance with id ${insuranceId} not found.` });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default { getAllInsurances, upsertInsurance, deleteInsurance };
