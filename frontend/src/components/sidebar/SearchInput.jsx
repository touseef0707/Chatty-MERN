import React from 'react'

const SearchInput = () => {
  return (
    <div className="searchBar">
        <form action="#" aria-label="Search" role="search" className="flex items-center justify-center w-64 px-2 py-1 bg-slate-800 rounded-full" id="search-container">
        <div className="flex items-center justify-center gap-2 w-full">
            <img src="svg/search.svg" alt="search" />
            <input type="text" placeholder="Search" className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400 w-full" />
        </div>
        </form>
    </div>

  )
}

export default SearchInput
