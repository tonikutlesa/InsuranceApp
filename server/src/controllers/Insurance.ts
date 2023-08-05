import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Insurance, { IInsurance } from '../models/Insurance';
import { calculateInsurancePrice } from '../utils/utils';

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

      const { calculatedBasePrice, calculatedTotalPrice, calculatedDiscounts, calculatedCoverages, calculatedSurcharges } = await calculateInsurancePrice(
        birthdate,
        vehiclePower,
        voucher,
        priceMatch,
        discounts,
        surcharges,
        coverages
      );

      const updates: IInsurance = {
        name,
        birthdate,
        city,
        vehiclePower,
        voucher,
        priceMatch,
        discounts: calculatedDiscounts,
        surcharges: calculatedSurcharges,
        coverages: calculatedCoverages,
        totalPrice: calculatedTotalPrice,
        basePrice: calculatedBasePrice
      };

      const updatedInsurance = await Insurance.findOneAndUpdate({ _id: insuranceId }, updates, { new: true });

      return res.status(200).json({ data: updatedInsurance });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  } else {
    const insurance = new Insurance({
      _id: new mongoose.Types.ObjectId(),
      name,
      birthdate,
      city,
      vehiclePower,
      voucher,
      priceMatch
    });

    const { calculatedBasePrice, calculatedTotalPrice, calculatedDiscounts, calculatedSurcharges, calculatedCoverages } = await calculateInsurancePrice(
      birthdate,
      vehiclePower,
      voucher,
      priceMatch,
      discounts,
      surcharges,
      coverages
    );

    insurance.discounts = calculatedDiscounts;
    insurance.surcharges = calculatedSurcharges;
    insurance.coverages = calculatedCoverages;
    insurance.basePrice = calculatedBasePrice;
    insurance.totalPrice = calculatedTotalPrice;

    try {
      await insurance.save();
      return res.status(201).json({ data: insurance });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
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
