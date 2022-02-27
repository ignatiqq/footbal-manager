import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';

import { GET_CURRENT_COMPETITION, CHANGE_CURRENT_COMPETITION_PAGE } from '../../redux/actions/competitions/actionNames';
import {Datepicker, Loader, Paginator, CardMatchInfo} from "../../components";
import { formatDateToRequest } from '../../utils/dates';

import type { ICurrentCompetitionMatch } from '../../redux/reducers/competitions/competitionsDataInterfaces';

const CompetitionPage: React.FC = () => {
    const [slicedData, setSlicedData] = React.useState<Array<ICurrentCompetitionMatch>>();

    const { id } = useParams();

    const dispatch = useAppDispatch();

    const { currentCompetitionData, pagination, isLoading, error } = useAppSelector(({competitionsData}) => ({
        currentCompetitionData: competitionsData.currentCompetition.data,
        pagination: competitionsData.currentCompetition.pagination,
        isLoading: competitionsData.currentCompetition.isLoading,
        error: competitionsData.currentCompetition.error
    }))

    React.useEffect(() => {
        if(id) {
            dispatch({type: GET_CURRENT_COMPETITION, payload: {id: id}})
        }
    }, [id])

    React.useEffect(() => {
        if(currentCompetitionData) {
            const sliced = currentCompetitionData.matches.slice((pagination.page - 1) * pagination.limit, pagination.limit * pagination.page);
            setSlicedData(sliced);
        }
    }, [currentCompetitionData, pagination])

    const getCurrentCompetitionByDate = (dateFrom: Date, dateTo: Date) => {
      dispatch({type: GET_CURRENT_COMPETITION, payload: {id: id, dateFrom: formatDateToRequest(dateFrom), dateTo: formatDateToRequest(dateTo)}});
    }

    return (
      <div>
        <div>
          <div className="flex mb-4">
            <Link to="/leagues">Лиги</Link>
            {currentCompetitionData && (
              <>
                <div className="mx-4">/</div>
                <div>{currentCompetitionData.competition.name}</div>
              </>
            )}
          </div>
          <div className="font-bold mb-4">Матчи</div>
          <div>
            <Datepicker
              changeDataHandler={getCurrentCompetitionByDate}
              firstMatchDate={currentCompetitionData && currentCompetitionData.matches[0].utcDate}
            />
          </div>
        </div>
        <div>
          {!currentCompetitionData && isLoading ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <Loader />
            </div>
          ) : error && error.message ? (
            <div className="flex justify-center items-center font-bold text-red-500 min-h-[60vh] text-center">
              {error.message}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-evenly flex-wrap my-14">
              {slicedData &&
                slicedData.length > 0 &&
                slicedData.map((item: ICurrentCompetitionMatch) => (
                  <CardMatchInfo key={item.id} item={item} />
                ))}
            </div>
          )}
        </div>
        {currentCompetitionData && currentCompetitionData.count && pagination && (
          <Paginator
            paginateType={CHANGE_CURRENT_COMPETITION_PAGE}
            pagination={pagination}
            position="center"
            count={currentCompetitionData.count}
            limit={pagination.limit}
            page={pagination.page}
          />
        )}
      </div>
    );
}

export default CompetitionPage;