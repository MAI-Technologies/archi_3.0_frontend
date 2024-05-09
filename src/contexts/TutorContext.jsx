import React, { createContext, useState, useContext } from 'react';

export const TutorContext = createContext();

export const useTutor = () => useContext(TutorContext);

export const TutorProvider = ({ children }) => {
    const [tutor, setTutor] = useState(null);

    return (
        <TutorContext.Provider value={{ tutor, setTutor }}>
            {children}
        </TutorContext.Provider>
    );
};
