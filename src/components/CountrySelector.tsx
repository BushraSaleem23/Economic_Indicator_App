import React, { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { Country } from '../types';

interface CountrySelectorProps {
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
}

const countries: Country[] = [
  // North America
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
  
  // Europe
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴' },
  { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
  { code: 'FI', name: 'Finland', flag: '🇫🇮' },
  { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
  { code: 'AT', name: 'Austria', flag: '🇦🇹' },
  { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
  { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
  { code: 'GR', name: 'Greece', flag: '🇬🇷' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱' },
  { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
  { code: 'RO', name: 'Romania', flag: '🇷🇴' },
  { code: 'BG', name: 'Bulgaria', flag: '🇧🇬' },
  { code: 'HR', name: 'Croatia', flag: '🇭🇷' },
  { code: 'SK', name: 'Slovakia', flag: '🇸🇰' },
  { code: 'SI', name: 'Slovenia', flag: '🇸🇮' },
  { code: 'LT', name: 'Lithuania', flag: '🇱🇹' },
  { code: 'LV', name: 'Latvia', flag: '🇱🇻' },
  { code: 'EE', name: 'Estonia', flag: '🇪🇪' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺' },
  { code: 'UA', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
  
  // Asia
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'LK', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'MM', name: 'Myanmar', flag: '🇲🇲' },
  { code: 'KH', name: 'Cambodia', flag: '🇰🇭' },
  { code: 'LA', name: 'Laos', flag: '🇱🇦' },
  { code: 'NP', name: 'Nepal', flag: '🇳🇵' },
  { code: 'BT', name: 'Bhutan', flag: '🇧🇹' },
  { code: 'MV', name: 'Maldives', flag: '🇲🇻' },
  { code: 'AF', name: 'Afghanistan', flag: '🇦🇫' },
  { code: 'IR', name: 'Iran', flag: '🇮🇷' },
  { code: 'IQ', name: 'Iraq', flag: '🇮🇶' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'QA', name: 'Qatar', flag: '🇶🇦' },
  { code: 'KW', name: 'Kuwait', flag: '🇰🇼' },
  { code: 'BH', name: 'Bahrain', flag: '🇧🇭' },
  { code: 'OM', name: 'Oman', flag: '🇴🇲' },
  { code: 'YE', name: 'Yemen', flag: '🇾🇪' },
  { code: 'JO', name: 'Jordan', flag: '🇯🇴' },
  { code: 'LB', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'SY', name: 'Syria', flag: '🇸🇾' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱' },
  { code: 'PS', name: 'Palestine', flag: '🇵🇸' },
  { code: 'CY', name: 'Cyprus', flag: '🇨🇾' },
  { code: 'GE', name: 'Georgia', flag: '🇬🇪' },
  { code: 'AM', name: 'Armenia', flag: '🇦🇲' },
  { code: 'AZ', name: 'Azerbaijan', flag: '🇦🇿' },
  { code: 'KZ', name: 'Kazakhstan', flag: '🇰🇿' },
  { code: 'UZ', name: 'Uzbekistan', flag: '🇺🇿' },
  { code: 'TM', name: 'Turkmenistan', flag: '🇹🇲' },
  { code: 'KG', name: 'Kyrgyzstan', flag: '🇰🇬' },
  { code: 'TJ', name: 'Tajikistan', flag: '🇹🇯' },
  { code: 'MN', name: 'Mongolia', flag: '🇲🇳' },
  
  // Africa
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬' },
  { code: 'DZ', name: 'Algeria', flag: '🇩🇿' },
  { code: 'MA', name: 'Morocco', flag: '🇲🇦' },
  { code: 'TN', name: 'Tunisia', flag: '🇹🇳' },
  { code: 'LY', name: 'Libya', flag: '🇱🇾' },
  { code: 'SD', name: 'Sudan', flag: '🇸🇩' },
  { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼' },
  { code: 'ZM', name: 'Zambia', flag: '🇿🇲' },
  { code: 'BW', name: 'Botswana', flag: '🇧🇼' },
  { code: 'NA', name: 'Namibia', flag: '🇳🇦' },
  { code: 'MZ', name: 'Mozambique', flag: '🇲🇿' },
  { code: 'MW', name: 'Malawi', flag: '🇲🇼' },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼' },
  { code: 'BI', name: 'Burundi', flag: '🇧🇮' },
  { code: 'DJ', name: 'Djibouti', flag: '🇩🇯' },
  { code: 'SO', name: 'Somalia', flag: '🇸🇴' },
  { code: 'ER', name: 'Eritrea', flag: '🇪🇷' },
  { code: 'SS', name: 'South Sudan', flag: '🇸🇸' },
  { code: 'CF', name: 'Central African Republic', flag: '🇨🇫' },
  { code: 'TD', name: 'Chad', flag: '🇹🇩' },
  { code: 'CM', name: 'Cameroon', flag: '🇨🇲' },
  { code: 'GA', name: 'Gabon', flag: '🇬🇦' },
  { code: 'GQ', name: 'Equatorial Guinea', flag: '🇬🇶' },
  { code: 'ST', name: 'São Tomé and Príncipe', flag: '🇸🇹' },
  { code: 'AO', name: 'Angola', flag: '🇦🇴' },
  { code: 'CD', name: 'Democratic Republic of Congo', flag: '🇨🇩' },
  { code: 'CG', name: 'Republic of Congo', flag: '🇨🇬' },
  { code: 'CI', name: 'Ivory Coast', flag: '🇨🇮' },
  { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫' },
  { code: 'ML', name: 'Mali', flag: '🇲🇱' },
  { code: 'NE', name: 'Niger', flag: '🇳🇪' },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳' },
  { code: 'GM', name: 'Gambia', flag: '🇬🇲' },
  { code: 'GW', name: 'Guinea-Bissau', flag: '🇬🇼' },
  { code: 'GN', name: 'Guinea', flag: '🇬🇳' },
  { code: 'SL', name: 'Sierra Leone', flag: '🇸🇱' },
  { code: 'LR', name: 'Liberia', flag: '🇱🇷' },
  { code: 'TG', name: 'Togo', flag: '🇹🇬' },
  { code: 'BJ', name: 'Benin', flag: '🇧🇯' },
  { code: 'MR', name: 'Mauritania', flag: '🇲🇷' },
  { code: 'MU', name: 'Mauritius', flag: '🇲🇺' },
  { code: 'SC', name: 'Seychelles', flag: '🇸🇨' },
  { code: 'MG', name: 'Madagascar', flag: '🇲🇬' },
  { code: 'KM', name: 'Comoros', flag: '🇰🇲' },
  { code: 'LS', name: 'Lesotho', flag: '🇱🇸' },
  { code: 'SZ', name: 'Eswatini', flag: '🇸🇿' },
  
  // South America
  { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
  { code: 'PE', name: 'Peru', flag: '🇵🇪' },
  { code: 'VE', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'EC', name: 'Ecuador', flag: '🇪🇨' },
  { code: 'BO', name: 'Bolivia', flag: '🇧🇴' },
  { code: 'PY', name: 'Paraguay', flag: '🇵🇾' },
  { code: 'UY', name: 'Uruguay', flag: '🇺🇾' },
  { code: 'GY', name: 'Guyana', flag: '🇬🇾' },
  { code: 'SR', name: 'Suriname', flag: '🇸🇷' },
  { code: 'GF', name: 'French Guiana', flag: '🇬🇫' },
  
  // Oceania
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'FJ', name: 'Fiji', flag: '🇫🇯' },
  { code: 'PG', name: 'Papua New Guinea', flag: '🇵🇬' },
  { code: 'SB', name: 'Solomon Islands', flag: '🇸🇧' },
  { code: 'VU', name: 'Vanuatu', flag: '🇻🇺' },
  { code: 'NC', name: 'New Caledonia', flag: '🇳🇨' },
  { code: 'PF', name: 'French Polynesia', flag: '🇵🇫' },
  { code: 'WS', name: 'Samoa', flag: '🇼🇸' },
  { code: 'TO', name: 'Tonga', flag: '🇹🇴' },
  { code: 'KI', name: 'Kiribati', flag: '🇰🇮' },
  { code: 'TV', name: 'Tuvalu', flag: '🇹🇻' },
  { code: 'NR', name: 'Nauru', flag: '🇳🇷' },
  { code: 'PW', name: 'Palau', flag: '🇵🇼' },
  { code: 'FM', name: 'Micronesia', flag: '🇫🇲' },
  { code: 'MH', name: 'Marshall Islands', flag: '🇲🇭' },
  
  // Caribbean & Central America
  { code: 'GT', name: 'Guatemala', flag: '🇬🇹' },
  { code: 'BZ', name: 'Belize', flag: '🇧🇿' },
  { code: 'SV', name: 'El Salvador', flag: '🇸🇻' },
  { code: 'HN', name: 'Honduras', flag: '🇭🇳' },
  { code: 'NI', name: 'Nicaragua', flag: '🇳🇮' },
  { code: 'CR', name: 'Costa Rica', flag: '🇨🇷' },
  { code: 'PA', name: 'Panama', flag: '🇵🇦' },
  { code: 'CU', name: 'Cuba', flag: '🇨🇺' },
  { code: 'JM', name: 'Jamaica', flag: '🇯🇲' },
  { code: 'HT', name: 'Haiti', flag: '🇭🇹' },
  { code: 'DO', name: 'Dominican Republic', flag: '🇩🇴' },
  { code: 'PR', name: 'Puerto Rico', flag: '🇵🇷' },
  { code: 'TT', name: 'Trinidad and Tobago', flag: '🇹🇹' },
  { code: 'BB', name: 'Barbados', flag: '🇧🇧' },
  { code: 'GD', name: 'Grenada', flag: '🇬🇩' },
  { code: 'VC', name: 'Saint Vincent and the Grenadines', flag: '🇻🇨' },
  { code: 'LC', name: 'Saint Lucia', flag: '🇱🇨' },
  { code: 'DM', name: 'Dominica', flag: '🇩🇲' },
  { code: 'AG', name: 'Antigua and Barbuda', flag: '🇦🇬' },
  { code: 'KN', name: 'Saint Kitts and Nevis', flag: '🇰🇳' },
  { code: 'BS', name: 'Bahamas', flag: '🇧🇸' }
];

const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  onCountryChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (country: Country) => {
    onCountryChange(country);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 bg-gray-800 hover:bg-gray-700 transition-colors px-4 py-3 rounded-lg border border-gray-600 min-w-[200px]"
      >
        <span className="text-2xl">{selectedCountry.flag}</span>
        <span className="font-medium">{selectedCountry.name}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-gray-800 border border-gray-600 rounded-lg shadow-xl z-50 max-w-sm">
          <div className="p-3 border-b border-gray-600">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto">
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                onClick={() => handleSelect(country)}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-700 transition-colors text-left"
              >
                <span className="text-xl">{country.flag}</span>
                <span>{country.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;