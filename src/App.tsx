import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import CountrySelector from './components/CountrySelector';
import DatePicker from './components/DatePicker';
import EconomicIndicators from './components/EconomicIndicators';
import PolicySimulator from './components/PolicySimulator';
import StockMarket from './components/StockMarket';
import TradeData from './components/TradeData';
import { Country, EconomicData } from './types';
import { generateMockData } from './utils/mockData';

function App() {
  const [selectedCountry, setSelectedCountry] = useState<Country>({
    code: 'US',
    name: 'United States',
    flag: '🇺🇸'
  });
  
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  
  const [economicData, setEconomicData] = useState<EconomicData | null>(null);
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      const data = generateMockData(selectedCountry.code, selectedDate);
      setEconomicData(data);
      setIsLoading(false);
    };

    fetchData();
    
    // Set up real-time updates every 30 seconds (only for current date)
    const isCurrentDate = selectedDate === new Date().toISOString().split('T')[0];
    let interval: NodeJS.Timeout | null = null;
    
    if (isCurrentDate) {
      interval = setInterval(fetchData, 30000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [selectedCountry, selectedDate]);

  const tabs = [
    { id: 'overview', label: 'Economic Overview', icon: '📊' },
    { id: 'policy', label: 'Policy Simulator', icon: '⚙️' },
    { id: 'stocks', label: 'Stock Market', icon: '📈' },
    { id: 'trade', label: 'Trade & Demographics', icon: '🌍' }
  ];

  const isCurrentDate = selectedDate === new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <CountrySelector 
            selectedCountry={selectedCountry}
            onCountryChange={setSelectedCountry}
          />
          
          <div className="flex items-center space-x-4">
            <DatePicker 
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
            
            {!isCurrentDate && (
              <div className="bg-yellow-900/50 border border-yellow-500/50 px-3 py-2 rounded-lg">
                <span className="text-yellow-400 text-sm font-medium">Historical Data</span>
              </div>
            )}
            
            {isCurrentDate && (
              <div className="flex items-center space-x-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Live Data</span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-8">
          <nav className="flex space-x-1 bg-gray-800 p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : economicData && (
          <div className="space-y-8">
            {activeTab === 'overview' && (
              <EconomicIndicators 
                data={economicData} 
                country={selectedCountry}
                selectedDate={selectedDate}
                isHistorical={!isCurrentDate}
              />
            )}
            
            {activeTab === 'policy' && (
              <PolicySimulator 
                data={economicData}
                country={selectedCountry}
                selectedDate={selectedDate}
                isHistorical={!isCurrentDate}
              />
            )}
            
            {activeTab === 'stocks' && (
              <StockMarket 
                country={selectedCountry}
                selectedDate={selectedDate}
                isHistorical={!isCurrentDate}
              />
            )}
            
            {activeTab === 'trade' && (
              <TradeData 
                data={economicData}
                country={selectedCountry}
                selectedDate={selectedDate}
                isHistorical={!isCurrentDate}
              />
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;