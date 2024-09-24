import React, {useState} from "react";
import { HiSearch } from "react-icons/hi";
import './searchbar.css';
import { setSearch} from "./searchbarSlice";
import { useDispatch} from "react-redux";



const Searchbar = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('')

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    }

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            dispatch(setSearch(searchTerm));
        }
        
    };

    // const handleClearSearch = () => {
    //     setSearchTerm('');
    //     dispatch(clearSearch(searchTerm));
    // }

    
    console.log(searchTerm)
  


    return (
        <div className='searchContainer'>
            <HiSearch className='searchIcon'/>
            <form onKeyDown={handleSearch} className="form">
                <input 
                    id="search"
                    type='text' 
                    placeholder='Search Reddit' 
                    className='searchBar' 
                    onChange={handleChange}
                    value={searchTerm} 
                /> 
                
            </form>
        </div>
    );
}

 
export default Searchbar;