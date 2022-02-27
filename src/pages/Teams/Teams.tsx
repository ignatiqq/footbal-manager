import React, { ChangeEvent } from 'react';

import { Search, Loader, TeamCard, Paginator } from '../../components';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';

import { GET_TEAMS_DATA, CHANGE_TEAMS_PAGE } from '../../redux/actions/teams/actionNames';
import type { ITeamOne } from '../../redux/reducers/teams/teamsDataInterfaces';

const Teams: React.FC = () => {
  const [search, setSearch] = React.useState<string>("");
  const [slicedData, setSlicedData] = React.useState<Array<ITeamOne>>();

    const dispatch = useAppDispatch();

    const { teams, isLoading, error, pagination, theme } = useAppSelector(({teamsData, globalSettings}) => ({
        teams: teamsData.teams.data,
        isLoading: teamsData.teams.isLoading,
        error: teamsData.teams.error,
        pagination: teamsData.teams.pagination,
        theme: globalSettings.theme
    }))

    console.log(slicedData)

    React.useEffect(() => {
        dispatch({type: GET_TEAMS_DATA})
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
      <Search
        theme={theme}
        value={search}
        placeholder="Поиск матчей"
        changeHandler={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      />
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
        paginateType={CHANGE_TEAMS_PAGE}
        pagination={pagination}
        position="center"
        count={teams.count}
        limit={pagination.limit}
        page={pagination.page}
      />
    )}
  </div>
  )
}

export default Teams;