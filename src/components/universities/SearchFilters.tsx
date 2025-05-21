
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { SearchFiltersState } from '@/types/university';
import { useToast } from '@/hooks/use-toast';
import { BasicSearchFields } from './filters/BasicSearchFields';
import { AdvancedFilters } from './filters/AdvancedFilters';
import { FilterStatus } from './filters/FilterStatus';
import { FormActions } from './filters/FormActions';
import { ToggleAdvancedFilters } from './filters/ToggleAdvancedFilters';

type SearchFiltersProps = {
  onSearch: (filters: SearchFiltersState) => void;
  initialFilters: SearchFiltersState;
  planType?: 'free' | 'basic' | 'premium';
};

export function SearchFilters({ 
  onSearch, 
  initialFilters, 
  planType = 'free'
}: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFiltersState>(initialFilters);
  const [showAllFilters, setShowAllFilters] = useState(false);
  const { toast } = useToast();
  
  const handleFilterChange = (name: string, value: any) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };
  
  const resetFilters = () => {
    setFilters({
      keyword: '',
      country: '',
      region: '',
      scholarshipsOnly: false,
      minGpa: '',
      minSatScore: '',
      minIeltsScore: '',
      minDuolingoScore: '',
      degreeType: ''
    });
    
    toast({
      title: 'Filters Reset',
      description: 'All search filters have been cleared.',
      variant: 'default',
    });
  };
  
  const filtersApplied = Object.values(filters).some(val => 
    val !== '' && val !== false
  );
  
  const toggleAdvancedFilters = () => setShowAllFilters(!showAllFilters);
  
  return (
    <div className="sticky top-24 transition-all duration-300 ease-in-out animate-fade-in">
      <form onSubmit={handleSubmit} className="transform transition-all duration-300 hover:scale-[1.01]">
        <Card className="border-none shadow-lg bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
          <CardHeader className="pb-3 bg-gradient-to-r from-background via-muted/30 to-background animate-gradient-x">
            <CardTitle className="text-xl flex items-center">
              <Search className="mr-2 h-5 w-5 animate-pulse" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 animate-gradient-x">
                Search Filters
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="animate-fade-in">
              <BasicSearchFields 
                filters={filters} 
                onFilterChange={handleFilterChange} 
              />
            </div>
            
            {filtersApplied && (
              <div className="animate-slide-up">
                <FilterStatus />
              </div>
            )}
            
            <ToggleAdvancedFilters 
              showAllFilters={showAllFilters}
              toggleFilters={toggleAdvancedFilters}
            />
            
            {showAllFilters && (
              <div className="animate-scale-in overflow-hidden">
                <AdvancedFilters 
                  filters={filters} 
                  onFilterChange={handleFilterChange}
                  planType={planType}
                />
              </div>
            )}
            
            <FormActions resetFilters={resetFilters} />
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
