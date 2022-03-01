import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
  
import type { ICompetitionOne } from '../../redux/reducers/competitions/competitionsDataInterfaces';
import type { IPagination } from '../../components/Paginator/interfaces';

import { Search, Loader, CompetitionCard, Paginator } from '../../components';
import { GET_COMPETITIONS_DATA, CLEAR_CURRENT_COMPETITION} from '../../redux/actions/competitions/actionNames';
import { sliceData } from '../../utils/paginationHelper';

import searchIcon from "../../assets/images/searchIcon.svg";
import sadEmoji from "../../assets/images/sadEmoji.png";

const Competitions: React.FC = () => {
    const [slicedData, setSlicedData] = React.useState<Array<ICompetitionOne>>([]);
    const [pagination, setPagination] = React.useState<IPagination>({
      page: 1,
      limit: 9
    });
    const [filterValue, setFilterValue] = React.useState<string>("");
    const [filteredDataCount, setFilteredDataCount] = React.useState<number>(0);
    const [isFiltered, setIsFiltered] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();

    const { competitions, isLoading, error, theme } = useAppSelector(({competitionsData, globalSettings}) => ({
        competitions: competitionsData.competitions.data,
        isLoading: competitionsData.competitions.isLoading,
        error: competitionsData.competitions.error,
        theme: globalSettings.theme
    }))

    React.useEffect(() => {
      if(!competitions) {
        dispatch({type: GET_COMPETITIONS_DATA})
      }
        dispatch({type: CLEAR_CURRENT_COMPETITION})
    }, []);

    React.useEffect(() => {
        if(competitions && competitions.competitions) {
            const sliced = competitions.competitions.slice((pagination.page - 1) * pagination.limit, pagination.limit * pagination.page);
            setSlicedData(sliced);
        }
    }, [competitions, pagination]);

    const filterDataHandler = () => {
      if(competitions && competitions.competitions) {
        if(filterValue) {
          setIsFiltered(true);
          const filtered = competitions.competitions.filter(item => item.name.toLowerCase().includes(filterValue));
          setFilteredDataCount(filtered.length);
          setSlicedData(sliceData<ICompetitionOne>(filtered, pagination.page, pagination.limit));
        } else if(!filterValue) {
          setFilteredDataCount(0);
          setSlicedData(sliceData<ICompetitionOne>(competitions?.competitions, pagination.page, pagination.limit));
        }
      }
    };

    const clearFilterHandler = () => {
      if(competitions && competitions.competitions) {
        if(filterValue) {
          setFilterValue("");
          setFilteredDataCount(0);
          setSlicedData(sliceData<ICompetitionOne>(competitions?.competitions, pagination.page, pagination.limit));
        }
      }
    }

    return (
      <div>
        <div className="my-6">
          <div>
            <div className="flex items-center">
              <Search
                theme={theme}
                value={filterValue}
                placeholder="Поиск матчей"
                changeHandler={(e: ChangeEvent<HTMLInputElement>) => setFilterValue(e.target.value)}
              />
              <button onClick={filterDataHandler}>
                <img className="max-w-[32px] w-full" src={searchIcon} alt="search" />
              </button>
            </div>
            {
              filterValue && isFiltered && <button onClick={clearFilterHandler}>Очистить</button>
            }
          </div>
        </div>
        {!competitions && isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <Loader />
          </div>
        ) : error && error.message ? (
          <div className="flex justify-center items-center font-bold text-red-500 min-h-[60vh] text-center">
            {error.message}
          </div>
        ) : slicedData && !filteredDataCount && !slicedData.length && competitions?.competitions?.length ? (
          <div className="flex flex-col justify-center items-center min-h-[60vh] text-center">
              <div className='font-bold mb-4'>К сожалению по вашему запросу ничего не найдено</div>
              <div className='max-w-[60px]'>
                <img src={sadEmoji} alt="404" />
              </div>
           </div>
        ) :
          <div className="flex items-center justify-evenly flex-wrap my-14">
            {slicedData &&
              slicedData.length > 0 &&
              slicedData.map((item: ICompetitionOne) => (
                <CompetitionCard key={item.id} id={item.id} name={item.name} area={item.area} />
              ))}
          </div>

      }
        {competitions && competitions.count && pagination && (
          <Paginator
            setPagination={setPagination}
            pagination={pagination}
            position="center"
            count={filteredDataCount || (!filteredDataCount && !slicedData?.length && competitions.competitions?.length) ? filteredDataCount : competitions.count}
            limit={pagination.limit}
            page={pagination.page}
          />
        )}
      </div>
    );
}

export default Competitions;