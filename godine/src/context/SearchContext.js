import React, {useState} from "react";

const SearchContext = React.createContext({});

export const SearchProvider = ({children}) => {
    const [searchResult, setsearchResult] = useState(null);

    const setsearchResultData = (data) => {
        setsearchResult(data);
    }

    const clearSearchData = () => {  
        setsearchResult(null);
    }

    const searchValues = {
        searchResult,
        setsearchResultData,
        setsearchResult,
        clearSearchData
    }

    return (
        <SearchContext.Provider value={searchValues}>
            {children}
        </SearchContext.Provider>
    );
}

export default SearchContext;