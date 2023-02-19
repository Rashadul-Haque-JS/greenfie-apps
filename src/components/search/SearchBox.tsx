import { connectSearchBox } from 'react-instantsearch-dom';
import { SearchBoxProvided } from 'react-instantsearch-core';

const Searchbox = connectSearchBox(({ refine, currentRefinement }: SearchBoxProvided) => {
  return (
    <>
      <input
        className="h-full p-2 border border-gray-300 rounded-lg shadow-sm sm:w-full xs:w-full w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        type="search"
        value={currentRefinement}
        onChange={(event) => refine(event.currentTarget.value)}
        placeholder="Search..."
      />
    </>
  )

})

export default Searchbox