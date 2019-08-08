import { createContext } from 'react';

const FilterContext = createContext({});

export const FilterProvider = FilterContext.Provider;
export const FilterConsumer = FilterContext.Consumer;
