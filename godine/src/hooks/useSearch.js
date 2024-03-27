import { useContext } from "react";
import SearchContext from "../context/SearchContext";

const useSearch = () => {
    return useContext(SearchContext);
}

export default useSearch;