import React from 'react';
import { Link } from 'react-router-dom';

import notFound from "../../assets/images/notFound.png";

const PageNotFound: React.FC = () => {
  return (
    <div className="h-[70vh] flex items-center flex-col justify-center">
        <div className='w-full max-w-[360px] mb-10'>
            <img src={notFound} alt="page not found" />
        </div>
        <div className='text-4xl font-bold'>Упс... Такой страницы не существует</div>
        <Link className='rounded-lg px-6 py-1 bg-[#ff0000] mt-6 hover:bg-[#a5a5a5] transition' to="/">Вернуться</Link>
    </div>
  )
}

export default PageNotFound;