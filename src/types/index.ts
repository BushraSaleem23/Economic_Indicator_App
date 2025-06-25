export interface Country {
  code: string;
  name: string;
  flag: string;
}

export interface EconomicIndicator {
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  unit?: string;
}

export interface PolicyEffect {
  indicator: string;
  currentValue: number;
  projectedValue: number;
  impact: 'positive' | 'negative' | 'neutral';
}

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

export interface TradeIndicator {
  imports: number;
  exports: number;
  balance: number;
  remittances: number;
}

export interface EconomicData {
  gdp: EconomicIndicator;
  inflation: EconomicIndicator;
  interestRate: EconomicIndicator;
  unemployment: EconomicIndicator;
  population: EconomicIndicator;
  trade: TradeIndicator;
  historicalData: {
    gdp: Array<{ month: string; value: number }>;
    inflation: Array<{ month: string; value: number }>;
    interestRate: Array<{ month: string; value: number }>;
  };
}