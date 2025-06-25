import React from 'react';
import { TrendingUp, TrendingDown, Minus, DollarSign, Percent, Users, Building, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Legend } from 'recharts';
import { EconomicData, Country } from '../types';

interface EconomicIndicatorsProps {
  data: EconomicData;
  country: Country;
  selectedDate: string;
  isHistorical: boolean;
}

const EconomicIndicators: React.FC<EconomicIndicatorsProps> = ({ 
  data, 
  country, 
  selectedDate, 
  isHistorical 
}) => {
  const indicators = [
    {
      title: 'Gross Domestic Product',
      value: `$${data.gdp.value.toLocaleString()}T`,
      change: data.gdp.change,
      trend: data.gdp.trend,
      icon: DollarSign,
      color: 'blue'
    },
    {
      title: 'Inflation Rate',
      value: `${data.inflation.value}%`,
      change: data.inflation.change,
      trend: data.inflation.trend,
      icon: TrendingUp,
      color: 'red'
    },
    {
      title: 'Interest Rate',
      value: `${data.interestRate.value}%`,
      change: data.interestRate.change,
      trend: data.interestRate.trend,
      icon: Percent,
      color: 'green'
    },
    {
      title: 'Unemployment Rate',
      value: `${data.unemployment.value}%`,
      change: data.unemployment.change,
      trend: data.unemployment.trend,
      icon: Users,
      color: 'yellow'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4" />;
      case 'down':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-900/50 border-blue-500/50 text-blue-400',
      red: 'bg-red-900/50 border-red-500/50 text-red-400',
      green: 'bg-green-900/50 border-green-500/50 text-green-400',
      yellow: 'bg-yellow-900/50 border-yellow-500/50 text-yellow-400'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Custom tooltip for GDP chart
  const CustomGDPTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{`Month: ${label}`}</p>
          <p className="text-blue-400">
            {`GDP: $${payload[0].value.toFixed(2)} Trillion`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for Inflation vs Interest Rate chart
  const CustomRatesTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{`Month: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toFixed(2)}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{country.flag}</span>
          <div>
            <h2 className="text-2xl font-bold">Economic Overview - {country.name}</h2>
            <div className="flex items-center space-x-2 text-gray-400 text-sm mt-1">
              <Clock className="h-4 w-4" />
              <span>Data for {formatDate(selectedDate)}</span>
              {isHistorical && <span className="text-yellow-400">(Historical)</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Key Indicators Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {indicators.map((indicator, index) => {
          const Icon = indicator.icon;
          return (
            <div
              key={index}
              className={`p-6 rounded-xl border ${getColorClasses(indicator.color)} relative overflow-hidden`}
            >
              {isHistorical && (
                <div className="absolute top-2 right-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                </div>
              )}
              <div className="flex items-center justify-between mb-4">
                <Icon className="h-8 w-8" />
                <div className={`flex items-center space-x-1 ${
                  indicator.change > 0 ? 'text-green-400' : 
                  indicator.change < 0 ? 'text-red-400' : 'text-gray-400'
                }`}>
                  {getTrendIcon(indicator.trend)}
                  <span className="text-sm">
                    {indicator.change > 0 ? '+' : ''}{indicator.change}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold mb-1">{indicator.value}</p>
                <p className="text-sm text-gray-400">{indicator.title}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* GDP Trend */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Building className="h-5 w-5 text-blue-400" />
            <span>GDP Growth Trend (12 Months)</span>
            {isHistorical && <Clock className="h-4 w-4 text-yellow-400" />}
          </h3>
          <div className="mb-4">
            <div className="text-sm text-gray-400 mb-2">
              <strong>X-Axis:</strong> Time Period (Months) | <strong>Y-Axis:</strong> GDP Value (Trillion USD)
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data.historicalData.gdp}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="month" 
                stroke="#9CA3AF"
                label={{ value: 'Time Period (Months)', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
              />
              <YAxis 
                stroke="#9CA3AF"
                label={{ value: 'GDP (Trillion USD)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
              />
              <Tooltip content={<CustomGDPTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.2}
                name="GDP"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Inflation vs Interest Rate */}
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-red-400" />
            <span>Inflation vs Interest Rate Comparison</span>
            {isHistorical && <Clock className="h-4 w-4 text-yellow-400" />}
          </h3>
          <div className="mb-4">
            <div className="text-sm text-gray-400 mb-2">
              <strong>X-Axis:</strong> Time Period (Months) | <strong>Y-Axis:</strong> Rate Percentage (%)
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-gray-300">Inflation Rate (%)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-gray-300">Interest Rate (%)</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="month" 
                stroke="#9CA3AF"
                label={{ value: 'Time Period (Months)', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
              />
              <YAxis 
                stroke="#9CA3AF"
                label={{ value: 'Rate Percentage (%)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
              />
              <Tooltip content={<CustomRatesTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#EF4444"
                strokeWidth={2}
                data={data.historicalData.inflation}
                name="Inflation Rate"
                dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10B981"
                strokeWidth={2}
                data={data.historicalData.interestRate}
                name="Interest Rate"
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Economic Summary */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <span>Economic Analysis Summary</span>
          {isHistorical && (
            <div className="flex items-center space-x-1 text-yellow-400">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Historical Analysis</span>
            </div>
          )}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-green-400 mb-2">
              {isHistorical ? 'Historical Strengths' : 'Positive Indicators'}
            </h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• GDP showing {isHistorical ? 'showed' : 'steady'} growth trajectory</li>
              <li>• Employment rates {isHistorical ? 'were improving' : 'improving gradually'}</li>
              <li>• Trade balance {isHistorical ? 'moved' : 'moving'} towards equilibrium</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-yellow-400 mb-2">
              {isHistorical ? 'Historical Challenges' : 'Areas of Concern'}
            </h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Inflation {isHistorical ? 'was' : 'slightly'} above target range</li>
              <li>• Interest rate adjustments {isHistorical ? 'were' : ''} needed</li>
              <li>• Foreign remittance volatility {isHistorical ? 'observed' : ''}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EconomicIndicators;