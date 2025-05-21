
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { SearchFiltersState } from '@/types/university';
import { COUNTRIES, REGIONS } from './search-constants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BasicSearchFieldsProps {
  filters: SearchFiltersState;
  onFilterChange: (name: string, value: any) => void;
}

export function BasicSearchFields({ filters, onFilterChange }: BasicSearchFieldsProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = e.target.checked;
      onFilterChange(name, checked);
    } else {
      onFilterChange(name, value);
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    onFilterChange(name, value);
  };

  return (
    <>
      {/* Keyword Search */}
      <div>
        <Label htmlFor="keyword">Search Universities</Label>
        <div className="relative">
          <Input
            id="keyword"
            name="keyword"
            placeholder="University name..."
            value={filters.keyword}
            onChange={handleChange}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
      </div>
      
      {/* Country Filter */}
      <div>
        <Label htmlFor="country">Country</Label>
        <Select
          value={filters.country || "_none"}
          onValueChange={(value) => handleSelectChange('country', value === "_none" ? "" : value)}
        >
          <SelectTrigger id="country" className="w-full">
            <SelectValue placeholder="All Countries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_none">All Countries</SelectItem>
            {COUNTRIES.map(country => (
              <SelectItem key={country} value={country}>{country}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Region Filter */}
      <div>
        <Label htmlFor="region">Region</Label>
        <Select
          value={filters.region || "_none"}
          onValueChange={(value) => handleSelectChange('region', value === "_none" ? "" : value)}
        >
          <SelectTrigger id="region" className="w-full">
            <SelectValue placeholder="All Regions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="_none">All Regions</SelectItem>
            {REGIONS.map(region => (
              <SelectItem key={region} value={region}>{region}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
