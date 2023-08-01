import Logger from '../../utils/Logger';
import Configuration from '../../models/Configuration';
import { connectToDatabase, disconnectFromDatabase } from '../database';

const seedDiscounts = [
  {
    name: 'Commercial discount',
    configurationType: 'discount',
    calculationType: 'percentage',
    percentageValue: 0.1
  },
  {
    name: 'Adviser discount',
    configurationType: 'discount',
    calculationType: 'percentage',
    percentageValue: 0.2
  },
  {
    name: 'VIP discount',
    configurationType: 'discount',
    calculationType: 'percentage',
    percentageValue: 0.05
  }
];

const seedSurcharges = [
  {
    name: 'Strong car surcharge',
    configurationType: 'surcharge',
    calculationType: 'percentage',
    percentageValue: 0.1
  }
];

const seedCoverages = [
  {
    name: 'Bonus protection',
    configurationType: 'coverage',
    calculationType: 'percentage',
    percentageValue: 0.12
  },
  {
    name: 'AO+',
    configurationType: 'coverage',
    calculationType: 'fixed',
    fixedValue: {
      min: 55,
      max: 105
    }
  },
  {
    name: 'Glass protection',
    configurationType: 'coverage',
    calculationType: 'percentage',
    percentageValue: 0.8
  }
];

const seedConfigurations = async (): Promise<void> => {
  await Configuration.deleteMany({});
  await Configuration.insertMany([...seedDiscounts, ...seedSurcharges, ...seedCoverages]);
};

connectToDatabase()
  .then(() => {
    seedConfigurations().then(() => {
      Logger.info('Successfully seeded configuration to database');
      disconnectFromDatabase();
    });
  })
  .catch((error) => {
    Logger.error('Error while seeding configuration to database: ');
    Logger.error(error);
  });
