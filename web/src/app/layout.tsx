import React from 'react';
import '../../styles/globals.css';
import {SocketProvider} from '../components/SocketProvider';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <head>
                <title>Wireshot</title>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>
                <SocketProvider>
                    {children}
                </SocketProvider>
            </body>
        </html>
    )
}
