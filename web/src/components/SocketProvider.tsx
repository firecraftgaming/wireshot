"use client";

import React from 'react';
import {ApiInterface} from '../lib/api';
import {API} from '../lib/constants';

let conn: ApiInterface | null = null;
if (typeof window !== 'undefined') {
    conn = new ApiInterface(API);
    conn.connect().then(() => console.log('Connected to server'));
}

export const SocketContext = React.createContext<{
    conn: ApiInterface | null;
}>({
    conn: null,
});

export const SocketProvider: React.FC<{children: React.ReactNode}> = ({
    children,
}) => {
    return (
        <SocketContext.Provider
            value={{
                conn,
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};
