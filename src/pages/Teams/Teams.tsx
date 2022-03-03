import React, { ChangeEvent } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

import { GET_TEAMS_DATA, CLEAR_CURRENT_TEAM } from '../../redux/actions/teams/actionNames';
import type { ITeamOne } from '../../redux/reducers/teams/teamsDataInterfaces';
import type { IPagination } from '../../components/Paginator/interfaces';

import { Search, Loader, TeamCard, Paginator } from '../../components';
import { sliceData } from '../../utils/paginationHelper';

import searchIcon from "../../assets/images/searchIcon.svg";
import sadEmoji from "../../assets/images/sadEmoji.png";
import useSearch from '../../hooks/useSearch';

const Teams: React.FC = () => {
  const [slicedData, setSlicedData] = React.useState<Array<ITeamOne>>([]);
  const [pagination, setPagination] = React.useState<IPagination>({
    page: 1,
    limit: 10
  });

    const dispatch = useAppDispatch();
    const [filterValue, setFilterValue] = React.useState<string>('');

    const { teams, isLoading, error, theme } = useAppSelector(({teamsData, globalSettings}) => ({
        teams: teamsData.teams.data,
        isLoading: teamsData.teams.isLoading,
        error: teamsData.teams.error,
        theme: globalSettings.theme
    }))

    const {filterDataHandler, clearFilterHandler, filteredDataCount, isFiltered} = useSearch<ITeamOne>(teams?.teams, pagination, setSlicedData, setFilterValue, filterValue);

    React.useEffect(() => {
      if(!teams) {
        dispatch({type: GET_TEAMS_DATA});
      }
        dispatch({type: CLEAR_CURRENT_TEAM})
    }, []);

    React.useEffect(() => {
        if(teams) {
            const sliced = teams.teams.slice((pagination.page - 1) * pagination.limit, pagination.limit * pagination.page);
            setSlicedData(sliced);
        }
    }, [teams, pagination])

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
            isFiltered && <button onClick={clearFilterHandler}>Очистить</button>
          }
        </div>
      </div>
      {!teams && isLoading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader />
        </div>
      ) : error && error.message ? (
        <div className="flex justify-center items-center font-bold text-red-500 min-h-[60vh] text-center">
          {error.message}
        </div>
      ) : slicedData && !filteredDataCount && !slicedData.length && teams?.teams?.length ? (
        <div className="flex flex-col justify-center items-center min-h-[60vh] text-center">
              <div className='font-bold mb-4'>К сожалению по вашему запросу ничего не найдено</div>
              <div className='max-w-[60px]'>
                <img src={sadEmoji} alt="404" />
              </div>
           </div>
      ) : (
        <div className="flex items-center justify-evenly flex-wrap my-14">
          {slicedData &&
            slicedData.length > 0 &&
            slicedData.map((item: ITeamOne) => (
              <TeamCard name={item.name} id={item.id} key={item.id} image={item.crestUrl} />
            ))}
        </div>
      )}
      {teams && teams.count && pagination && (
        <Paginator
          setPagination={setPagination}
          pagination={pagination}
          position="center"
          count={filteredDataCount || (!filteredDataCount && !slicedData?.length && teams.teams?.length) ? filteredDataCount : teams.count}
          limit={pagination.limit}
          page={pagination.page}
        />
      )}
    </div>
  );
}

export default Teams;