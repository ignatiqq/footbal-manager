import React, { ChangeEvent } from 'react';

interface ISearchProps {
    placeholder?: string,
    changeHandler: (e: ChangeEvent<HTMLInputElement>) => void,
    value: string,
    theme: string | null,
}

const Search: React.FC<ISearchProps> = ({changeHandler, placeholder, value, theme}) => {
  return (
    <div className='flex items-center'>
      <input
        className={`${
          theme === 'light' ? 'text-stone-900 bg-zinc-50 border-[#a5a5a5]' : 'text-zinc-50 bg-stone-900'
        } text-lg rounded-sm placeholder:text-lg px-2 shadow-lg border mr-2`}
        value={value}
        onChange={changeHandler}
        placeholder={placeholder ? placeholder : 'Поиск'} />
    </div>
  );
}

export default Search;