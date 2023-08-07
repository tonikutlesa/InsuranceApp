import { IInsurance } from '../models/Insurance';
import Configuration, { IConfiguration, Discounts, Coverages, Surcharges } from '../models/Configuration';
import { DISCOUNTS, SURCHARGES, COVERAGES } from '../constants';

type InsurancePriceResult = {
  calculatedBasePrice: number;
  calculatedTotalPrice: number;
  calculatedDiscounts: ConfigurationTransformation[];
  calculatedCoverages: ConfigurationTransformation[];
  calculatedSurcharges: ConfigurationTransformation[];
};

export type ConfigurationTransformation = {
  name: string;
  amount: Number;
};

const calculateInsurancePrice = async (
  birthdate: Date,
  vehiclePower: number,
  voucher: number,
  priceMatch: number,
  initialDiscounts: Discounts[],
  initialSurcharges: Surcharges[],
  initialCoverages: Coverages[]
): Promise<InsurancePriceResult> => {
  const coverages: ConfigurationTransformation[] = [];
  const discounts: ConfigurationTransformation[] = [];
  const surcharges: ConfigurationTransformation[] = [];
  const configurations: IConfiguration[] = await Configuration.find({});

  const transformedConfigurations: { [key: string]: IConfiguration } = {};
  for (const configuration of configurations) {
    transformedConfigurations[configuration.name] = configuration;
  }

  const userAge = new Date().getFullYear() - new Date(birthdate).getFullYear();

  let basePrice = userAge * vehiclePower;
  let totalPrice = basePrice;

  initialCoverages.forEach((coverage) => {
    let amount: number;
    switch (coverage) {
      case COVERAGES.BONUS_PROTECTION:
        amount = basePrice * Number(transformedConfigurations[coverage].percentageValue);
        break;
      case COVERAGES.GLASS_PROTECTION:
        amount = vehiclePower * Number(transformedConfigurations[coverage].percentageValue);
        break;
      case COVERAGES.AO_PLUS:
        amount = Number(userAge < 30 ? transformedConfigurations[coverage].fixedValue?.min : transformedConfigurations[coverage].fixedValue?.max);
        break;
      default:
        amount = 0;
    }
    totalPrice += amount;
    if (amount) {
      coverages.push({ name: coverage, amount });
    }
  });

  let adviserDiscountSum = 0;

  initialDiscounts.forEach((discount) => {
    if (discount === DISCOUNTS.COMMERCIAL_DISCOUNT) {
      const amount: number = basePrice * Number(transformedConfigurations[discount].percentageValue);
      totalPrice -= amount;
      if (amount) {
        discounts.push({
          name: DISCOUNTS.COMMERCIAL_DISCOUNT,
          amount
        });
      }
    } else if (discount === DISCOUNTS.ADVISER_DISCOUNT) {
      coverages.forEach((coverage) => {
        const coverageDiscount = Number(transformedConfigurations[discount].percentageValue) * Number(coverage.amount);
        coverage.amount = Number(coverage.amount) - coverageDiscount;
        adviserDiscountSum += coverageDiscount;
      });
      discounts.push({
        name: DISCOUNTS.ADVISER_DISCOUNT,
        amount: adviserDiscountSum
      });
      totalPrice -= adviserDiscountSum;
    }
  });

  const baseTotalPrice = totalPrice;

  initialSurcharges.forEach((surcharge) => {
    if (surcharge === SURCHARGES.STRONG_CAR_SURCHARGE) {
      const amount: number = baseTotalPrice * Number(transformedConfigurations[surcharge].percentageValue);
      totalPrice += amount;
      if (amount) {
        surcharges.push({
          name: SURCHARGES.STRONG_CAR_SURCHARGE,
          amount
        });
      }
    }
  });

  initialDiscounts.forEach((discount) => {
    if (discount === DISCOUNTS.VIP_DISCOUNT) {
      const amount: number = baseTotalPrice * Number(transformedConfigurations[discount].percentageValue);
      totalPrice -= amount;
      if (amount) {
        discounts.push({
          name: DISCOUNTS.VIP_DISCOUNT,
          amount
        });
      }
    }
  });

  if (voucher) {
    totalPrice -= voucher;
  }

  if (priceMatch && priceMatch > 0) {
    const additionalCost = totalPrice - basePrice;
    totalPrice = priceMatch;
    basePrice = totalPrice - additionalCost;
  }

  return {
    calculatedBasePrice: parseFloat(basePrice.toFixed(2)),
    calculatedTotalPrice: parseFloat(totalPrice.toFixed(2)),
    calculatedDiscounts: discounts,
    calculatedCoverages: coverages,
    calculatedSurcharges: surcharges
  };
};

export { calculateInsurancePrice };
