"use client";

import type { NextPage } from 'next';
import React, {useEffect} from 'react';
import dynamic from 'next/dynamic';
import {ORIGIN} from '../../lib/constants';
import {useSocket} from '../../lib/useSocket';
import {Method} from 'rest-exchange-protocol-client';

const QR = dynamic(() => import('../../components/QRScan'), {
    loading: () => null,
    ssr: false,
});

function getURL(url) {
    try {
        return new URL(url);
    } catch (e) {
        return null;
    }
}

const Mobile: NextPage = () => {
    const conn = useSocket();
    const [url, setUrl] = React.useState('');
    const updateURL = (url: string) => getURL(url) && setUrl(url);
    useEffect(() => void updateURL(window.location.hash.substring(1)));

    return (
        <div className={"flex flex-col w-full h-full justify-center items-center"}>
            <QR
                onScan={(data) => {
                    console.log(data);

                    const target = getURL(data);
                    if (!target) return;
                    if (target.origin !== `https://${ORIGIN}`) return updateURL(data);

                    if (!url) return;

                    const token = target.hash.substring(1);
                    return conn?.rawRequest('open', Method.ACTION, {token, url});
                }}
            />
        </div>
    );
}

export default Mobile
