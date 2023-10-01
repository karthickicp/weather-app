import React, { useState, createContext } from "react";

const SearchContext = createContext('');

export const ThemeProvider = ({ children }: any) => {
    const [locaiton, setLocation] = useState('');

    const updateLocation = (name: string) => {
        setLocation(name)
    }
    
    return (
        <SearchContext.Provider value={locaiton}>
        { children }
        </SearchContext.Provider>
    )
}