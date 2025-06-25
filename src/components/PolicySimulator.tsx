import React, { useState } from 'react';
import { Settings, TrendingUp, TrendingDown, AlertCircle, Clock } from 'lucide-react';
import { EconomicData, Country, PolicyEffect } from '../types';

interface PolicySimulatorProps {
  data: EconomicData;
  country: Country;
  selectedDate: string;
  isHistorical: boolean;
}

const PolicySimulator: React.FC<PolicySimulatorProps> = ({ 
  data, 
  country, 
  selectedDate, 
  isHistorical 
}) => {
  const [interestRate, setInterestRate] = useState(data.interestRate.value);
  const [fiscalSpending, setFiscalSpending] = useState(50);
  const [taxRate, setTaxRate] = useState(25);

  const calculatePolicyEffects = (): PolicyEffect[] => {
    const interestRateChange = interestRate - data.interestRate.value;
    const spendingMultiplier = (fiscalSpending - 50) / 10;
    const taxMultiplier = (25 - taxRate) / 10;

    return [
      {
        indicator: 'GDP Growth',
        currentValue: data.gdp.value,
        projectedValue: data.gdp.value * (1 + (spendingMultiplier * 0.02) + (taxMultiplier * 0.015) - (interestRateChange * 0.01)),
        impact: spendingMultiplier + taxMultiplier - interestRateChange > 0 ? 'positive' : 'negative'
      },
      {
        indicator: 'Inflation Rate',
        currentValue: data.inflation.value,
        projectedValue: Math.max(0, data.inflation.value + (interestRateChange * -0.3) + (spendingMultiplier * 0.2)),
        impact: interestRateChange < 0 && spendingMultiplier > 0 ? 'negative' : 'positive'
      },
      {
        indicator: 'Unemployment',
        currentValue: data.unemployment.value,
        projectedValue: Math.max(0, data.unemployment.value - (spendingMultiplier * 0.5) - (taxMultiplier * 0.3) + (interestRateChange * 0.2)),
        impact: spendingMultiplier > 0 || taxMultiplier > 0 ? 'positive' : 'negative'
      }
    ];
  };

  const policyEffects = calculatePolicyEffects();

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'text-green-400';
      case 'negative':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive':
        return <TrendingUp className="h-4 w-4" />;
      case 'negative':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <Settings className="h-8 w-8 text-blue-400" />
          <div>
            <h2 className="text-2xl font-bold">Policy Impact Simulator</h2>
            <div className="flex items-center space-x-2 text-gray-400 text-sm mt-1">
              <Clock className="h-4 w-4" />
              <span>Base data from {formatDate(selectedDate)}</span>
              {isHistorical && <span className="text-yellow-400">(Historical)</span>}
            </div>
          </div>
        </div>
        
        {isHistorical && (
          <div className="bg-yellow-900/50 border border-yellow-500/50 px-3 py-2 rounded-lg">
            <span className="text-yellow-400 text-sm font-medium">Historical Simulation</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Policy Controls */}
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Monetary Policy</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Interest Rate: {interestRate.toFixed(2)}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.25"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0%</span>
                  <span>Current: {data.interestRate.value}%</span>
                  <span>10%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl">
            <h3 className="text-lg font-semibold mb-4">Fiscal Policy</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Government Spending: {fiscalSpending}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={fiscalSpending}
                  onChange={(e) => setFiscalSpending(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Low</span>
                  <span>Moderate</span>
                  <span>High</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tax Rate: {taxRate}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="50"
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>10%</span>
                  <span>Current: 25%</span>
                  <span>50%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Policy Effects */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">
            {isHistorical ? 'Hypothetical Economic Impact' : 'Projected Economic Impact'}
          </h3>
          
          <div className="space-y-4">
            {policyEffects.map((effect, index) => (
              <div key={index} className="p-4 bg-gray-700 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{effect.indicator}</h4>
                  <div className={`flex items-center space-x-1 ${getImpactColor(effect.impact)}`}>
                    {getImpactIcon(effect.impact)}
                    <span className="text-sm font-medium">
                      {effect.impact === 'positive' ? 'Positive' : 'Negative'}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">{isHistorical ? 'Historical' : 'Current'}</p>
                    <p className="font-semibold">
                      {effect.indicator.includes('Rate') || effect.indicator.includes('Unemployment') 
                        ? `${effect.currentValue.toFixed(2)}%`
                        : `$${effect.currentValue.toFixed(2)}T`
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400">{isHistorical ? 'Simulated' : 'Projected'}</p>
                    <p className={`font-semibold ${getImpactColor(effect.impact)}`}>
                      {effect.indicator.includes('Rate') || effect.indicator.includes('Unemployment')
                        ? `${effect.projectedValue.toFixed(2)}%`
                        : `$${effect.projectedValue.toFixed(2)}T`
                      }
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Policy Recommendations */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4">
          {isHistorical ? 'Historical Policy Context' : 'Policy Recommendations'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-blue-400 mb-2">Monetary Policy Guidance</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• {isHistorical ? 'Lower rates could have stimulated' : 'Lower interest rates to stimulate'} economic growth</li>
              <li>• {isHistorical ? 'Inflation monitoring was' : 'Monitor inflation closely with rate adjustments'}</li>
              <li>• {isHistorical ? 'QE could have been' : 'Consider quantitative easing if'} needed</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-green-400 mb-2">Fiscal Policy Guidance</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• {isHistorical ? 'Infrastructure spending could have boosted' : 'Increase infrastructure spending for'} growth</li>
              <li>• {isHistorical ? 'Tax policy balance was' : 'Balance tax cuts with deficit'} considerations</li>
              <li>• {isHistorical ? 'Job programs could have targeted' : 'Target spending on job creation'} programs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolicySimulator;