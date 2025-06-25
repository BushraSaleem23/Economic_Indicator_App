import React from 'react';
import { Globe, TrendingUp, Users, ArrowUpRight, ArrowDownRight, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { EconomicData, Country } from '../types';

interface TradeDataProps {
  data: EconomicData;
  country: Country;
  selectedDate: string;
  isHistorical: boolean;
}

const TradeData: React.FC<TradeDataProps> = ({ data, country, selectedDate, isHistorical }) => {
  const tradeData = [
    { category: 'Electronics', imports: 120, exports: 85 },
    { category: 'Automotive', imports: 95, exports: 110 },
    { category: 'Agriculture', imports: 45, exports: 75 },
    { category: 'Energy', imports: 200, exports: 30 },
    { category: 'Textiles', imports: 60, exports: 90 }
  ];

  const populationData = [
    { age: '0-14 Years', percentage: 18.5, description: 'Children & Early Teens' },
    { age: '15-24 Years', percentage: 11.2, description: 'Youth & Young Adults' },
    { age: '25-54 Years', percentage: 39.8, description: 'Working Age Adults' },
    { age: '55-64 Years', percentage: 13.4, description: 'Pre-Retirement Age' },
    { age: '65+ Years', percentage: 17.1, description: 'Senior Citizens' }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const remittanceData = {
    inflow: 45.2,
    outflow: 12.8,
    netFlow: 32.4,
    growthRate: 5.7
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Custom tooltip for trade chart
  const CustomTradeTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{`Category: ${label}`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: $${entry.value}B USD`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for population pie chart
  const CustomPopulationTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium">{data.age}</p>
          <p className="text-gray-300">{data.description}</p>
          <p className="text-blue-400 font-semibold">{data.percentage}% of Population</p>
        </div>
      );
    }
    return null;
  };

  // Custom label for pie chart
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percentage, age }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${percentage.toFixed(1)}%`}
      </text>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <Globe className="h-8 w-8 text-blue-400" />
          <div>
            <h2 className="text-2xl font-bold">Trade & Demographics - {country.name}</h2>
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

      {/* Trade Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-xl relative">
          {isHistorical && (
            <div className="absolute top-2 right-2">
              <Clock className="h-4 w-4 text-gray-400" />
            </div>
          )}
          <div className="flex items-center justify-between mb-2">
            <ArrowDownRight className="h-8 w-8 text-red-400" />
            <span className="text-red-400 text-sm">-2.1%</span>
          </div>
          <p className="text-2xl font-bold">${data.trade.imports.toFixed(1)}B</p>
          <p className="text-sm text-gray-400">Total Imports (USD)</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl relative">
          {isHistorical && (
            <div className="absolute top-2 right-2">
              <Clock className="h-4 w-4 text-gray-400" />
            </div>
          )}
          <div className="flex items-center justify-between mb-2">
            <ArrowUpRight className="h-8 w-8 text-green-400" />
            <span className="text-green-400 text-sm">+3.4%</span>
          </div>
          <p className="text-2xl font-bold">${data.trade.exports.toFixed(1)}B</p>
          <p className="text-sm text-gray-400">Total Exports (USD)</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl relative">
          {isHistorical && (
            <div className="absolute top-2 right-2">
              <Clock className="h-4 w-4 text-gray-400" />
            </div>
          )}
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-8 w-8 text-blue-400" />
            <span className={`text-sm ${data.trade.balance > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {data.trade.balance > 0 ? 'Surplus' : 'Deficit'}
            </span>
          </div>
          <p className="text-2xl font-bold">
            ${Math.abs(data.trade.balance).toFixed(1)}B
          </p>
          <p className="text-sm text-gray-400">Trade Balance (USD)</p>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl relative">
          {isHistorical && (
            <div className="absolute top-2 right-2">
              <Clock className="h-4 w-4 text-gray-400" />
            </div>
          )}
          <div className="flex items-center justify-between mb-2">
            <Users className="h-8 w-8 text-purple-400" />
            <span className="text-green-400 text-sm">+{remittanceData.growthRate}%</span>
          </div>
          <p className="text-2xl font-bold">${remittanceData.netFlow}B</p>
          <p className="text-sm text-gray-400">Net Remittances (USD)</p>
        </div>
      </div>

      {/* Trade by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <span>Import vs Export by Category</span>
            {isHistorical && <Clock className="h-4 w-4 text-yellow-400" />}
          </h3>
          <div className="mb-4">
            <div className="text-sm text-gray-400 mb-2">
              <strong>X-Axis:</strong> Trade Categories | <strong>Y-Axis:</strong> Trade Value (Billion USD)
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-gray-300">Imports (Billion USD)</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-gray-300">Exports (Billion USD)</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tradeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="category" 
                stroke="#9CA3AF"
                label={{ value: 'Trade Categories', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
              />
              <YAxis 
                stroke="#9CA3AF"
                label={{ value: 'Trade Value (Billion USD)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9CA3AF' } }}
              />
              <Tooltip content={<CustomTradeTooltip />} />
              <Legend />
              <Bar dataKey="imports" fill="#EF4444" name="Imports" />
              <Bar dataKey="exports" fill="#10B981" name="Exports" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <span>Population Age Distribution</span>
            {isHistorical && <Clock className="h-4 w-4 text-yellow-400" />}
          </h3>
          <div className="mb-4">
            <div className="text-sm text-gray-400 mb-3">
              <strong>Chart Type:</strong> Pie Chart showing percentage distribution of population by age groups
            </div>
            <div className="grid grid-cols-1 gap-2 text-sm">
              {populationData.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: COLORS[index] }}
                  ></div>
                  <span className="text-gray-300">
                    <strong>{item.age}:</strong> {item.percentage}% - {item.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={populationData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="percentage"
              >
                {populationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomPopulationTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Demographics & Remittances */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <span>Population Demographics Overview</span>
            {isHistorical && <Clock className="h-4 w-4 text-yellow-400" />}
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total Population</span>
              <span className="font-semibold text-white">{data.population.value}M people</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Population Growth Rate</span>
              <span className={`font-semibold flex items-center space-x-1 ${
                data.population.change > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {data.population.change > 0 ? 
                  <TrendingUp className="h-4 w-4" /> : 
                  <ArrowDownRight className="h-4 w-4" />
                }
                <span>{data.population.change > 0 ? '+' : ''}{data.population.change}% annually</span>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Working Age Population (15-64)</span>
              <span className="font-semibold text-blue-400">64.4% of total</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Dependency Ratio</span>
              <span className="font-semibold text-yellow-400">55.3 dependents per 100 workers</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <span>Foreign Remittances Impact</span>
            {isHistorical && <Clock className="h-4 w-4 text-yellow-400" />}
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Remittance Inflow</span>
              <span className="font-semibold text-green-400">${remittanceData.inflow}B USD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Remittance Outflow</span>
              <span className="font-semibold text-red-400">${remittanceData.outflow}B USD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Net Remittance Flow</span>
              <span className="font-semibold text-blue-400">${remittanceData.netFlow}B USD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Annual Growth Rate</span>
              <span className="font-semibold text-green-400">+{remittanceData.growthRate}%</span>
            </div>
            <div className="pt-2 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-2"><strong>Economic Impact Analysis:</strong></p>
              <ul className="text-sm space-y-1">
                <li className="text-green-400">• {isHistorical ? 'Boosted' : 'Boosts'} consumer spending by 12%</li>
                <li className="text-green-400">• {isHistorical ? 'Supported' : 'Supports'} 2.3M households directly</li>
                <li className="text-blue-400">• {isHistorical ? 'Contributed' : 'Contributes'} 4.2% to total GDP</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Economic Analysis */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <span>Trade & Demographics Analysis Summary</span>
          {isHistorical && (
            <div className="flex items-center space-x-1 text-yellow-400">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Historical Analysis</span>
            </div>
          )}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-blue-400 mb-2">
              {isHistorical ? 'Historical Trade Patterns' : 'Current Trade Opportunities'}
            </h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• {isHistorical ? 'Strong export growth was seen' : 'Strong export growth observed'} in automotive sector</li>
              <li>• Energy import diversification {isHistorical ? 'was needed' : 'strategy required'}</li>
              <li>• Agricultural exports {isHistorical ? 'showed' : 'showing'} significant potential</li>
              <li>• Technology trade deficit {isHistorical ? 'required' : 'requires'} strategic attention</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-yellow-400 mb-2">
              {isHistorical ? 'Historical Demographics Impact' : 'Demographic Insights & Trends'}
            </h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Aging population {isHistorical ? 'affected' : 'affecting'} labor force dynamics</li>
              <li>• Youth employment programs {isHistorical ? 'were critically' : 'critically'} needed</li>
              <li>• Remittances {isHistorical ? 'supported' : 'supporting'} economic stability significantly</li>
              <li>• Urban-rural migration trends {isHistorical ? 'emerged' : 'emerging'} as key factor</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeData;