import React from 'react';

import { Link } from "react-router-dom";

interface ICompetitionCard {
    name: string,
    area: {
        id: number,
        name: string
    },
    id: number
}

const CompetitionCard: React.FC<ICompetitionCard> = ({id, name, area}) => {
  return (
    <Link to={`/${id}/matches`} className='border max-w-[400px] w-full flex item-center flex-col justify-center h-[10rem] min-h-full p-8 cursor-pointer border-[#a5a5a5] m-4 shadow-lg relative hover:bottom-0.5'>
        <div className='text-center mb-2 font-bold text-2xl'>
            {name}
        </div>
        <div className='text-center text-lg'>
            {area.name}
        </div>
    </Link>
  )
}

export default CompetitionCard;