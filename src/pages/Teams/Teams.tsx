import React, { ChangeEvent } from 'react';

import { Search, Loader, TeamCard, Paginator } from '../../components';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

import { GET_TEAMS_DATA, CLEAR_CURRENT_TEAM } from '../../redux/actions/teams/actionNames';
import type { ITeamOne } from '../../redux/reducers/teams/teamsDataInterfaces';
import type { IPagination } from '../../components/Paginator/interfaces';

import searchIcon from "../../assets/images/searchIcon.svg";

const Teams: React.FC = () => {
  const [search, setSearch] = React.useState<string>("");
  const [slicedData, setSlicedData] = React.useState<Array<ITeamOne>>();
  const [pagination, setPagination] = React.useState<IPagination>({
    page: 1,
    limit: 10
  });

    const dispatch = useAppDispatch();

    const { teams, isLoading, error, theme } = useAppSelector(({teamsData, globalSettings}) => ({
        teams: teamsData.teams.data,
        isLoading: teamsData.teams.isLoading,
        error: teamsData.teams.error,
        theme: globalSettings.theme
    }))

    React.useEffect(() => {
        dispatch({type: GET_TEAMS_DATA});
        dispatch({type: CLEAR_CURRENT_TEAM})
    }, []);

    React.useEffect(() => {

    }, [])

    React.useEffect(() => {
        if(teams) {
            const sliced = teams.teams.slice((pagination.page - 1) * pagination.limit, pagination.limit * pagination.page);
            setSlicedData(sliced);
        }
    }, [teams, pagination])

  return (
    <div>
      <div className="my-6">
        <div className="flex items-center">
          <Search
            theme={theme}
            value={search}
            placeholder="Поиск матчей"
            changeHandler={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
          <button>
            <img className="max-w-[32px] w-full" src={searchIcon} alt="search" />
          </button>
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
          count={teams.count}
          limit={pagination.limit}
          page={pagination.page}
        />
      )}
    </div>
  );
}

export default Teams;