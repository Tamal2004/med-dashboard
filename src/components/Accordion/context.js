import { createContext } from 'react';

const AccordionContext = createContext({});

export const AccordionProvider = AccordionContext.Provider;
export const AccordionConsumer = AccordionContext.Consumer;
