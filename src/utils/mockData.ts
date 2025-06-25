import { EconomicData } from '../types';

export const generateMockData = (countryCode: string, selectedDate?: string): EconomicData => {
  // Base values vary by country - significantly different values for each country
  const countryMultipliers = {
    US: { gdp: 21.4, inflation: 2.1, interest: 5.25, unemployment: 3.7, population: 331, tradeMultiplier: 1.0 },
    GB: { gdp: 3.1, inflation: 4.2, interest: 5.0, unemployment: 4.2, population: 67, tradeMultiplier: 0.8 },
    DE: { gdp: 4.2, inflation: 6.1, interest: 4.5, unemployment: 5.5, population: 83, tradeMultiplier: 0.9 },
    FR: { gdp: 2.9, inflation: 5.8, interest: 4.5, unemployment: 7.3, population: 68, tradeMultiplier: 0.85 },
    JP: { gdp: 4.9, inflation: 3.0, interest: 0.1, unemployment: 2.6, population: 125, tradeMultiplier: 0.95 },
    CN: { gdp: 17.7, inflation: 2.0, interest: 3.45, unemployment: 5.2, population: 1412, tradeMultiplier: 1.2 },
    IN: { gdp: 3.7, inflation: 6.7, interest: 6.5, unemployment: 7.9, population: 1380, tradeMultiplier: 0.7 },
    BR: { gdp: 2.1, inflation: 11.9, interest: 13.25, unemployment: 9.3, population: 215, tradeMultiplier: 0.6 },
    CA: { gdp: 2.1, inflation: 3.4, interest: 5.0, unemployment: 5.2, population: 38, tradeMultiplier: 0.75 },
    AU: { gdp: 1.6, inflation: 7.8, interest: 4.35, unemployment: 3.5, population: 26, tradeMultiplier: 0.65 },
    PK: { gdp: 0.35, inflation: 12.4, interest: 22.0, unemployment: 6.9, population: 230, tradeMultiplier: 0.3 },
    TR: { gdp: 0.82, inflation: 64.3, interest: 17.5, unemployment: 10.4, population: 84, tradeMultiplier: 0.4 },
    RU: { gdp: 1.8, inflation: 5.9, interest: 16.0, unemployment: 3.5, population: 146, tradeMultiplier: 0.5 },
    MX: { gdp: 1.3, inflation: 4.7, interest: 11.25, unemployment: 3.4, population: 128, tradeMultiplier: 0.55 },
    KR: { gdp: 1.8, inflation: 3.6, interest: 3.5, unemployment: 2.9, population: 52, tradeMultiplier: 0.8 },
    ID: { gdp: 1.3, inflation: 3.2, interest: 6.0, unemployment: 5.8, population: 274, tradeMultiplier: 0.45 },
    SA: { gdp: 0.83, inflation: 2.3, interest: 6.0, unemployment: 7.4, population: 35, tradeMultiplier: 0.7 },
    ZA: { gdp: 0.42, inflation: 5.9, interest: 8.25, unemployment: 32.9, population: 60, tradeMultiplier: 0.35 },
    NG: { gdp: 0.44, inflation: 22.8, interest: 18.75, unemployment: 33.3, population: 218, tradeMultiplier: 0.25 },
    EG: { gdp: 0.47, inflation: 14.2, interest: 19.25, unemployment: 7.4, population: 104, tradeMultiplier: 0.3 },
    AR: { gdp: 0.49, inflation: 102.5, interest: 97.0, unemployment: 6.9, population: 46, tradeMultiplier: 0.4 },
    TH: { gdp: 0.54, inflation: 1.2, interest: 2.5, unemployment: 1.2, population: 70, tradeMultiplier: 0.6 },
    MY: { gdp: 0.43, inflation: 2.8, interest: 3.0, unemployment: 3.9, population: 33, tradeMultiplier: 0.55 },
    SG: { gdp: 0.40, inflation: 4.8, interest: 3.4, unemployment: 2.1, population: 6, tradeMultiplier: 0.9 },
    PH: { gdp: 0.39, inflation: 5.3, interest: 6.5, unemployment: 4.5, population: 111, tradeMultiplier: 0.4 },
    VN: { gdp: 0.41, inflation: 3.2, interest: 4.5, unemployment: 2.0, population: 98, tradeMultiplier: 0.5 },
    BD: { gdp: 0.46, inflation: 9.5, interest: 7.25, unemployment: 4.2, population: 166, tradeMultiplier: 0.25 },
    LK: { gdp: 0.08, inflation: 25.0, interest: 15.5, unemployment: 4.7, population: 22, tradeMultiplier: 0.2 },
    IR: { gdp: 0.23, inflation: 45.2, interest: 18.0, unemployment: 9.1, population: 85, tradeMultiplier: 0.3 },
    IQ: { gdp: 0.22, inflation: 5.0, interest: 4.0, unemployment: 16.5, population: 41, tradeMultiplier: 0.25 },
    AE: { gdp: 0.51, inflation: 4.8, interest: 5.4, unemployment: 2.4, population: 10, tradeMultiplier: 0.8 },
    QA: { gdp: 0.18, inflation: 4.9, interest: 5.5, unemployment: 0.1, population: 3, tradeMultiplier: 0.75 },
    KW: { gdp: 0.14, inflation: 3.4, interest: 4.25, unemployment: 2.1, population: 4, tradeMultiplier: 0.7 },
    IL: { gdp: 0.48, inflation: 4.4, interest: 4.75, unemployment: 3.4, population: 9, tradeMultiplier: 0.6 },
    CL: { gdp: 0.32, inflation: 11.6, interest: 11.25, unemployment: 8.7, population: 19, tradeMultiplier: 0.5 },
    CO: { gdp: 0.31, inflation: 13.1, interest: 13.25, unemployment: 11.2, population: 51, tradeMultiplier: 0.4 },
    PE: { gdp: 0.24, inflation: 8.8, interest: 7.75, unemployment: 7.2, population: 33, tradeMultiplier: 0.35 },
    VE: { gdp: 0.05, inflation: 156.0, interest: 59.0, unemployment: 7.7, population: 28, tradeMultiplier: 0.15 },
    EC: { gdp: 0.11, inflation: 3.5, interest: 8.68, unemployment: 4.6, population: 18, tradeMultiplier: 0.3 },
    UY: { gdp: 0.06, inflation: 9.1, interest: 11.5, unemployment: 8.3, population: 3, tradeMultiplier: 0.25 },
    NZ: { gdp: 0.25, inflation: 7.2, interest: 5.5, unemployment: 3.4, population: 5, tradeMultiplier: 0.4 },
    FJ: { gdp: 0.005, inflation: 4.3, interest: 0.5, unemployment: 4.5, population: 1, tradeMultiplier: 0.1 }
  };

  const multiplier = countryMultipliers[countryCode as keyof typeof countryMultipliers] || countryMultipliers.US;

  // Adjust values based on historical date if provided
  const isHistorical = selectedDate && selectedDate !== new Date().toISOString().split('T')[0];
  const historicalMultiplier = isHistorical ? 0.85 + Math.random() * 0.3 : 1;

  // Generate country-specific trade data
  const generateTradeData = () => {
    const baseImports = (100 + Math.random() * 400) * multiplier.tradeMultiplier;
    const baseExports = (80 + Math.random() * 350) * multiplier.tradeMultiplier;
    
    return {
      imports: baseImports * historicalMultiplier,
      exports: baseExports * historicalMultiplier,
      balance: (baseExports - baseImports) * historicalMultiplier,
      remittances: (Math.random() * 50 + 5) * multiplier.tradeMultiplier * historicalMultiplier
    };
  };

  // Generate historical data with country-specific variations
  const generateHistoricalData = (baseValue: number, months: number = 12) => {
    return Array.from({ length: months }, (_, i) => {
      const seasonalVariation = Math.sin((i / 12) * 2 * Math.PI) * 0.1;
      const randomVariation = (Math.random() - 0.5) * 0.2;
      const countrySpecificTrend = multiplier.gdp > 10 ? 0.05 : multiplier.gdp > 1 ? 0.02 : -0.01;
      
      return {
        month: new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'short' }),
        value: baseValue * (1 + seasonalVariation + randomVariation + countrySpecificTrend) * historicalMultiplier
      };
    });
  };

  // Generate country-specific population growth
  const getPopulationGrowth = () => {
    if (multiplier.population > 1000) return 0.8 + Math.random() * 0.4; // Large countries
    if (multiplier.population > 100) return 1.0 + Math.random() * 0.8; // Medium countries
    return 1.2 + Math.random() * 1.0; // Small countries
  };

  const tradeData = generateTradeData();

  return {
    gdp: {
      value: multiplier.gdp * historicalMultiplier,
      change: (Math.random() - 0.5) * 4 * (multiplier.gdp > 5 ? 0.5 : 1.5),
      trend: Math.random() > 0.5 ? 'up' : 'down',
      unit: 'trillion'
    },
    inflation: {
      value: multiplier.inflation * historicalMultiplier,
      change: (Math.random() - 0.5) * 2,
      trend: multiplier.inflation > 10 ? 'up' : Math.random() > 0.6 ? 'up' : 'down',
      unit: 'percent'
    },
    interestRate: {
      value: multiplier.interest * historicalMultiplier,
      change: (Math.random() - 0.5) * 1,
      trend: multiplier.inflation > 5 ? 'up' : Math.random() > 0.4 ? 'up' : 'down',
      unit: 'percent'
    },
    unemployment: {
      value: multiplier.unemployment * historicalMultiplier,
      change: (Math.random() - 0.5) * 1.5,
      trend: Math.random() > 0.7 ? 'down' : 'up',
      unit: 'percent'
    },
    population: {
      value: multiplier.population,
      change: getPopulationGrowth(),
      trend: 'up',
      unit: 'million'
    },
    trade: tradeData,
    historicalData: {
      gdp: generateHistoricalData(multiplier.gdp),
      inflation: generateHistoricalData(multiplier.inflation),
      interestRate: generateHistoricalData(multiplier.interest)
    }
  };
};