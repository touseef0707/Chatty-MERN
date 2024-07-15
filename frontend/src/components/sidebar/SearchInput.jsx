import React, { useState } from 'react';
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations';
import toast from 'react-hot-toast';

// SearchBar: A sub-component of sidebar to search users
const SearchInput = () => {

  // State to store search input
  const [search, setSearch] = useState("");

  // Get setSelectedConversation method from useConversation hook
  const { setSelectedConversation } = useConversation();

  // Get all conversations from useGetConversations hook
  const { conversations } = useGetConversations();

  // Handle search input
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!search) return;  // If search is empty, return

    // If search term is less than 3 characters, show error toast
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    // Find conversation by fullName that includes search term
    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));

    // If conversation exists, set it as selected conversation and reset search input
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
  );
}

export default SearchInput;
