import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, BarChart3, DollarSign, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Country, StockData } from '../types';

interface StockMarketProps {
  country: Country;
  selectedDate: string;
  isHistorical: boolean;
}

const StockMarket: React.FC<StockMarketProps> = ({ country, selectedDate, isHistorical }) => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [marketData, setMarketData] = useState<Array<{ time: string; value: number }>>([]);

  useEffect(() => {
    // Generate mock stock data based on country and date
    const generateStocks = () => {
      const stockTemplates = {
        US: [
          { symbol: 'AAPL', name: 'Apple Inc.' },
          { symbol: 'GOOGL', name: 'Alphabet Inc.' },
          { symbol: 'MSFT', name: 'Microsoft Corp.' },
          { symbol: 'TSLA', name: 'Tesla Inc.' },
          { symbol: 'AMZN', name: 'Amazon.com Inc.' }
        ],
        GB: [
          { symbol: 'LLOY', name: 'Lloyds Banking Group' },
          { symbol: 'BP', name: 'BP plc' },
          { symbol: 'SHEL', name: 'Shell plc' },
          { symbol: 'AZN', name: 'AstraZeneca PLC' },
          { symbol: 'ULVR', name: 'Unilever PLC' }
        ],
        PK: [
          { symbol: 'HBL', name: 'Habib Bank Limited' },
          { symbol: 'OGDC', name: 'Oil & Gas Development' },
          { symbol: 'LUCK', name: 'Lucky Cement' },
          { symbol: 'ENGRO', name: 'Engro Corporation' },
          { symbol: 'PSO', name: 'Pakistan State Oil' }
        ],
        TR: [
          { symbol: 'THYAO', name: 'Turkish Airlines' },
          { symbol: 'AKBNK', name: 'Akbank' },
          { symbol: 'BIMAS', name: 'BIM Stores' },
          { symbol: 'EREGL', name: 'Eregli Iron & Steel' },
          { symbol: 'KCHOL', name: 'Koc Holding' }
        ],
        default: [
          { symbol: 'INDEX', name: 'Market Index' },
          { symbol: 'BANK', name: 'Banking Sector' },
          { symbol: 'TECH', name: 'Technology Sector' },
          { symbol: 'ENERGY', name: 'Energy Sector' },
          { symbol: 'CONSUMER', name: 'Consumer Goods' }
        ]
      };

      const templates = stockTemplates[country.code as keyof typeof stockTemplates] || stockTemplates.default;
      
      // Adjust prices based on historical date
      const dateMultiplier = isHistorical ? 0.8 + Math.random() * 0.4 : 1;
      
      return templates.map(template => ({
        ...template,
        price: (Math.random() * 500 + 50) * dateMultiplier,
        change: (Math.random() - 0.5) * 20,
        changePercent: (Math.random() - 0.5) * 10
      }));
    };

    // Generate market trend data
    const generateMarketData = () => {
      const data = [];
      const baseValue = (3000 + Math.random() * 1000) * (isHistorical ? 0.85 : 1);
      
      for (let i = 0; i < 24; i++) {
        data.push({
          time: `${i}:00`,
          value: baseValue + (Math.random() - 0.5) * 200 + (Math.sin(i / 4) * 100)
        });
      }
      return data;
    };

    setStocks(generateStocks());
    setMarketData(generateMarketData());

    // Update data every 10 seconds (only for current date)
    let interval: NodeJS.Timeout | null = null;
    
    if (!isHistorical) {
      interval = setInterval(() => {
        setStocks(prev => prev.map(stock => ({
          ...stock,
          price: stock.price + (Math.random() - 0.5) * 5,
          change: stock.change + (Math.random() - 0.5) * 2,
          changePercent: stock.changePercent + (Math.random() - 0.5) * 1
        })));
      }, 10000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [country, selectedDate, isHistorical]);

  const marketSummary = {
    totalValue: marketData[marketData.length - 1]?.value || 0,
    dailyChange: Math.random() * 100 - 50,
    volume: Math.random() * 1000000000 + 500000000
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Custom tooltip for market trend chart
  const CustomMarketTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{`Time: ${label}`}</p>
          <p className="text-green-400">
            {`Market Index: ${payload[0].value.toFixed(2)} points`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <BarChart3 className="h-8 w-8 text-green-400" />
          <div>
            <h2 className="text-2xl font-bold">Stock Market - {country.name}</h2>
            <div className="flex items-center space-x-2 text-gray-400 text-sm mt-1">
              <Clock className="h-4 w-4" />
              <span>Data for {formatDate(selectedDate)}</span>
              {isHistorical && <span className="text-yellow-400">(Historical)</span>}
            </div>
          </div>
        </div>
        
        {isHistorical && (
          <div className="bg-yellow-900/50 border border-yellow-500/50 px-3 py-2 rounded-lg">
            <span className="text-yellow-400 text-sm font-medium">Historical Data</span>
          </div>
        )}
      </div>

      {/* Market Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl relative">
          {isHistorical && (
            <div className="absolute top-2 right-2">
              <Clock className="h-4 w-4 text-gray-400" />
            </div>
          )}
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="h-8 w-8 text-blue-400" />
            <div className={`flex items-center space-x-1 ${
              marketSummary.dailyChange > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {marketSummary.dailyChange > 0 ? 
                <TrendingUp className="h-4 w-4" /> : 
                <TrendingDown className="h-4 w-4" />
              }
              <span className="text-sm">
                {marketSummary.dailyChange > 0 ? '+' : ''}{marketSummary.dailyChange.toFixed(2)}
              </span>
            </div>
          </div>
          <p className="text-2xl font-bold">{marketSummary.totalValue.toFixed(2)}</p>
          <p className="text-sm text-gray-400">Market Index Points</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl relative">
          {isHistorical && (
            <div className="absolute top-2 right-2">
              <Clock className="h-4 w-4 text-gray-400" />
            </div>
          )}
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="h-8 w-8 text-purple-400" />
          </div>
          <p className="text-2xl font-bold">{(marketSummary.volume / 1000000).toFixed(0)}M</p>
          <p className="text-sm text-gray-400">Trading Volume (Shares)</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl relative">
          {isHistorical && (
            <div className="absolute top-2 right-2">
              <Clock className="h-4 w-4 text-gray-400" />
            </div>
          )}
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-8 w-8 text-yellow-400" />
          </div>
          <p className="text-2xl font-bold">
            {((marketSummary.dailyChange / marketSummary.totalValue) * 100).toFixed(2)}%
          </p>
          <p className="text-sm text-gray-400">Daily Change Percentage</p>
        </div>
      </div>

      {/* Market Chart */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <span>Market Index Trend (24 Hours)</span>
          {isHistorical && <Clock className="h-4 w-4 text-yellow-400" />}
        </h3>
        <div className="mb-4">
          <div className="text-sm text-gray-400 mb-2">
            <strong>X-Axis:</strong> Time (24-Hour Format) | <strong>Y-Axis:</strong> Market Index Value (Points)
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-gray-300 text-sm">Market Index Points</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={marketData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time" 
              stroke="#9CA3AF"
              label={{ value: 'Time (24-Hour Format)', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
            />
            <YAxis 
              stroke="#9CA3AF" 
              domain={['dataMin - 50', 'dataMax + 50']}
              label={{ value: 'Market Index (Points)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
            />
            <Tooltip content={<CustomMarketTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
              name="Market Index"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Individual Stocks */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <span>Top Performing Stocks</span>
          {isHistorical && <Clock className="h-4 w-4 text-yellow-400" />}
        </h3>
        <div className="mb-4 text-sm text-gray-400">
          <p><strong>Price:</strong> Current stock price in USD | <strong>Change:</strong> Absolute price change | <strong>Change %:</strong> Percentage change from previous close</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-300">Symbol</th>
                <th className="text-left py-3 px-4 text-gray-300">Company Name</th>
                <th className="text-right py-3 px-4 text-gray-300">Price (USD)</th>
                <th className="text-right py-3 px-4 text-gray-300">Change (USD)</th>
                <th className="text-right py-3 px-4 text-gray-300">Change (%)</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((stock, index) => (
                <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                  <td className="py-3 px-4 font-mono font-bold text-blue-400">{stock.symbol}</td>
                  <td className="py-3 px-4 text-gray-200">{stock.name}</td>
                  <td className="py-3 px-4 text-right font-semibold text-white">
                    ${stock.price.toFixed(2)}
                  </td>
                  <td className={`py-3 px-4 text-right font-semibold ${
                    stock.change > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stock.change > 0 ? '+' : ''}${stock.change.toFixed(2)}
                  </td>
                  <td className={`py-3 px-4 text-right font-semibold ${
                    stock.changePercent > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockMarket;