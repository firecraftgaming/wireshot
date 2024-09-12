"use client";

import type { NextPage } from 'next';
import React, {useEffect, useState} from 'react';
import * as QRCode from 'qrcode';
import {ORIGIN} from '../../lib/constants';
import {useSocket} from '../../lib/useSocket';

const Desktop: NextPage = () => {
    const conn = useSocket();
    useEffect(() => {
        if (!conn) return;

        conn.routes.update('auth', (data) => {
            const { token } = data.data;
            QRCode.toDataURL(`http://${ORIGIN}/mobile/#${token}`).then(qr_url => setQRCode(qr_url));
        });

        conn.routes.action('open', (data) => {
            const { url } = data.data;
            location.href = url;
        });
    }, [conn]);

    const [qrCode, setQRCode] = useState('');
    return (
        <div className={"flex flex-col w-full h-full justify-center items-center"}>
            {
                qrCode &&
                <img alt="Authentication QR Code" className={"rounded-xl m-4 w-96 h-96"} src={qrCode}/>
            }
        </div>
    );
}

export default Desktop
