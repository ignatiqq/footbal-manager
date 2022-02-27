import React from 'react'

import { formatToLocalDateString, formatToLocalTimeString } from '../../utils/dates';

import type { ICurrentCompetitionMatch } from "../../redux/reducers/competitions/competitionsDataInterfaces";

interface ICardMatchInfo {
  item: ICurrentCompetitionMatch
}

const CardMatchInfo: React.FC<ICardMatchInfo> = ({item}) => {
  return (
    <div className="border border-[#a5a5a5] w-full px-10 py-4 flex justify-between items-center flex-wrap md:flex-col" key={item.id}>
      <div className='flex justify-between items-center flex-wrap basis-[20%] md:mb-2 mr-4 md:mr-0'>
        <div className='mr-4'>{formatToLocalDateString(item.utcDate)}</div>
        <div>{formatToLocalTimeString(item.utcDate)}</div>
      </div>
      <div className='basis-1/4 basis-[10%] md:my-2 mr-4 md:mr-0'>{item.status}</div>
      <div className='basis-1/4 flex w-full items-center justify-between basis-[35%] md:my-2 mr-4 md:mr-0'>
        <div>{item.homeTeam.name}</div>
        <div>-</div>
        <div>{item.awayTeam.name}</div>
      </div>
      <div className='basis-1/4 flex items-center justify-between flex-wrap basis-[20%] md:my-2'>
        {item.score.fullTime.homeTeam !== null && (
          <div className="flex md:mr-4">
            <div>{item.score.fullTime.homeTeam}</div>
            <div className="mx-2">:</div>
            <div>{item.score.fullTime.awayTeam}</div>
          </div>
        )}
        {item.score.extraTime.homeTeam !== null && (
          <div className="flex md:mr-4">
            (<div>{item.score.extraTime.homeTeam}</div>
            <div className="mx-2">:</div>
            <div>{item.score.extraTime.awayTeam}</div>)
          </div>
        )}
        {item.score.penalties.homeTeam !== null && (
          <div className="flex">
            (<div>{item.score.penalties.homeTeam}</div>
            <div className="mx-2">:</div>
            <div>{item.score.penalties.awayTeam}</div>)
          </div>
        )}
      </div>
    </div>
  );
}

export default CardMatchInfo;