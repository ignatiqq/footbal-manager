import React from 'react';

import type { IPagination } from '../components/Paginator/interfaces';

import { sliceData } from '../utils/paginationHelper';

interface IUseSearchResult {
    filterDataHandler: () => void,
    clearFilterHandler: () => void,
    filteredDataCount: number,
    isFiltered: boolean
}

const useSearch = <T extends object>(
    data: T[] | undefined, 
    pagination: IPagination, 
    setSlicedData: React.Dispatch<React.SetStateAction<T[]>>,
    setFilterValue: React.Dispatch<React.SetStateAction<string>>,
    filterValue: string
    ): IUseSearchResult => {

    const [filteredDataCount, setFilteredDataCount] = React.useState<number>(0);
    const [isFiltered, setIsFiltered] = React.useState<boolean>(false);

    const filterDataHandler: () => void = () => {
        if(data) {
          if(filterValue) {
            setIsFiltered(true);
            const filtered = data.filter((item: any) => item.name.toLowerCase().includes(filterValue.toLowerCase()));
            setFilteredDataCount(filtered.length);
            setSlicedData(sliceData<T>(filtered, pagination.page, pagination.limit));
          } else if(!filterValue) {
            setIsFiltered(false)
            setFilteredDataCount(0);
            setSlicedData(sliceData<T>(data, pagination.page, pagination.limit));
          }
        }
      };
  
      const clearFilterHandler = () => {
        setIsFiltered(false)
        if(data) {
          if(filterValue) {
            setFilterValue("");
            setFilteredDataCount(0);
            setSlicedData(sliceData<T>(data, pagination.page, pagination.limit));
          }
        }
      }

    return {filterDataHandler, clearFilterHandler, filteredDataCount, isFiltered};
}

export default useSearch;