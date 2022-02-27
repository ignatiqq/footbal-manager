import React, { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
  
import type { ICompetitionOne } from '../../redux/reducers/competitions/competitionsDataInterfaces';

import { Search, Loader, CompetitionCard, Paginator } from '../../components';
import { GET_COMPETITIONS_DATA, CHANGE_COMPETITIONS_PAGE, CLEAR_CURRENT_COMPETITION} from '../../redux/actions/competitions/actionNames';

const Competitions: React.FC = () => {
    const [search, setSearch] = React.useState<string>("");
    const [slicedData, setSlicedData] = React.useState<Array<ICompetitionOne>>();

    const dispatch = useAppDispatch();

    const { competitions, isLoading, error, pagination, theme } = useAppSelector(({competitionsData, globalSettings}) => ({
        competitions: competitionsData.competitions.data,
        isLoading: competitionsData.competitions.isLoading,
        error: competitionsData.competitions.error,
        pagination: competitionsData.competitions.pagination,
        theme: globalSettings.theme
    }))

    React.useEffect(() => {
        dispatch({type: GET_COMPETITIONS_DATA})
        dispatch({type: CLEAR_CURRENT_COMPETITION})
    }, []);

    React.useEffect(() => {
        if(competitions) {
            const sliced = competitions.competitions.slice((pagination.page - 1) * pagination.limit, pagination.limit * pagination.page);
            setSlicedData(sliced);
        }
    }, [competitions, pagination])

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
        {!competitions && isLoading ? (
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
              slicedData.map((item: ICompetitionOne) => (
                <CompetitionCard key={item.id} id={item.id} name={item.name} area={item.area} />
              ))}
          </div>
        )}
        {competitions && competitions.count && pagination && (
          <Paginator
            paginateType={CHANGE_COMPETITIONS_PAGE}
            pagination={pagination}
            position="center"
            count={competitions.count}
            limit={pagination.limit}
            page={pagination.page}
          />
        )}
      </div>
    );
}

export default Competitions;