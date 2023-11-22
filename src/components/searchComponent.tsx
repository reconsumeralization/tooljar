```typescript
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchApps } from '../redux/actions';

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const searchResults = useSelector(state => state.searchResults);

    useEffect(() => {
        if (searchTerm) {
            dispatch(searchApps(searchTerm));
        }
    }, [searchTerm, dispatch]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="search-component">
            <input
                type="text"
                placeholder="Search for apps..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            {searchResults && searchResults.length > 0 && (
                <div className="search-results">
                    {searchResults.map((app, index) => (
                        <div key={index} className="search-result-item">
                            <h3>{app.name}</h3>
                            <p>{app.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchComponent;
```
