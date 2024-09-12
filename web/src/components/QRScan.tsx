import React, { useEffect, useRef } from 'react';
import QrScanner from "qr-scanner";

interface QRScanProps {
    onScan: (data: string) => void;
}

const QRScan: React.FC<QRScanProps> = ({ onScan }) => {
    const scanner = useRef<QrScanner>();
    const videoEl = useRef<HTMLVideoElement | null>(null);
    const qrBoxEl = useRef<HTMLDivElement | null>(null);

    const onScanSuccess = (result: QrScanner.ScanResult) => {
        onScan(result.data);
    };

    const onScanFail = (err: string | Error) => {
        console.log(err);
    };

    useEffect(() => {
        if (videoEl?.current && !scanner.current) {
            scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
                onDecodeError: onScanFail,

                preferredCamera: "environment",
                highlightScanRegion: true,
                highlightCodeOutline: true,

                overlay: qrBoxEl?.current || undefined,
            });

            scanner?.current?.start();
        }

        return () => {
            if (!videoEl?.current) scanner?.current?.stop();
        };
    }, []);

    return (
        <div className="qr-reader">
            <video ref={videoEl}/>
            <div ref={qrBoxEl} style={{ border: '1px solid red'}} />
        </div>
    );
};

export default QRScan;
