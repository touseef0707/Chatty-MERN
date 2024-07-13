import React, {useState} from 'react'
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';

const SearchInput = () => {

  const [search, setSearch] = useState("");
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const handleSearch = (e) => {
		e.preventDefault();
		if (!search) return;
		if (search.length < 3) {
			return toast.error("Search term must be at least 3 characters long");
		}

		const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

		if (conversation) {
			setSelectedConversation(conversation);
			setSearch("");
		} else toast.error("No such user found!");
	};


  return (
    <div className="searchBar">
        <form action="#" aria-label="Search" role="search" onSubmit={handleSearch}
        className="flex items-center justify-center w-64 px-2 py-1 bg-slate-800 rounded-full" id="search-container">
        <div className="flex items-center justify-center gap-2 w-full">
            <input 
            type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400 w-full" />
            <button type='submit'><img src="svg/search.svg" alt="search" /></button>
        </div>
        </form>
    </div>

  )
}

export default SearchInput
