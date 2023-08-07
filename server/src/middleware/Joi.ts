import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { IInsurance } from '../models/Insurance';
import { IConfiguration } from '../models/Configuration';
import Logger from '../utils/Logger';
import { Discounts, Surcharges, Coverages } from '../models/Configuration';

interface IInsuranceWithId extends IInsurance {
  _id: string;
}

export const ValidateJoi = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);

      next();
    } catch (error) {
      Logger.error(error);

      return res.status(422).json({ error });
    }
  };
};

export const Schemas = {
  insurance: {
    upsert: Joi.object<IInsuranceWithId>({
      _id: Joi.string(),
      name: Joi.string().required(),
      birthdate: Joi.date().required(),
      city: Joi.string().required(),
      vehiclePower: Joi.number().required(),
      voucher: Joi.number().allow(null),
      priceMatch: Joi.number().allow(null),
      discounts: Joi.array().items(Joi.string().valid(...Object.values(Discounts))),
      surcharges: Joi.array().items(Joi.string().valid(...Object.values(Surcharges))),
      coverages: Joi.array().items(Joi.string().valid(...Object.values(Coverages)))
    })
  }
};
