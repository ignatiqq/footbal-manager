import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';

import { GET_CURRENT_COMPETITION, CHANGE_CURRENT_COMPETITION_PAGE } from '../../redux/actions/actionNames';
import {Datepicker, Loader, Paginator, CardMatchInfo} from "../../components";

import type { ICurrentCompetitionMatch } from "../../redux/sagas/competitions/interfaces";

const CompetitionPage: React.FC = () => {
    const [slicedData, setSlicedData] = React.useState<Array<ICurrentCompetitionMatch>>();

    const { id } = useParams();

    const dispatch = useAppDispatch();

    const { currentCompetitionData, pagination, isLoading, error } = useAppSelector(({footbalData}) => ({
        currentCompetitionData: footbalData.currentCompetition.data,
        pagination: footbalData.currentCompetition.pagination,
        isLoading: footbalData.currentCompetition.isLoading,
        error: footbalData.currentCompetition.error
    }))

    React.useEffect(() => {
        if(id) {
            dispatch({type: GET_CURRENT_COMPETITION, payload: id})
        }
    }, [id])

    React.useEffect(() => {
        if(currentCompetitionData) {
            const sliced = currentCompetitionData.matches.slice((pagination.page - 1) * pagination.limit, pagination.limit * pagination.page);
            setSlicedData(sliced);
        }
    }, [currentCompetitionData, pagination])

    const getCurrentCompetitionByDate = (date: Date) => {
      console.log(date)
    }

    const paginateHandler = (page: number | string) => {
        if(typeof page === "number") {
            dispatch({type: CHANGE_CURRENT_COMPETITION_PAGE, payload: page})
        }
    }

    const prevPageHanlder = () => {
      if(pagination.page > 1) {
        dispatch({type: CHANGE_CURRENT_COMPETITION_PAGE, payload: pagination.page - 1})
      }
    }

    const nextPageHandler = () => {
      if(pagination.page < Math.ceil(currentCompetitionData!.count / pagination.limit))
      dispatch({type: CHANGE_CURRENT_COMPETITION_PAGE, payload: pagination.page + 1})
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
            paginateHandler={paginateHandler}
            nextPageHandler={nextPageHandler}
            prevPageHanlder={prevPageHanlder}
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