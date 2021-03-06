import React, { useEffect, useRef } from 'react';
import './Surprise.scss';

type TSurpriseProps = {
    should_show_surprise: boolean;
    setShouldShowSurprise: (should_show_surprise: boolean) => void;
    startPosition: HTMLButtonElement | null;
    destination: HTMLDivElement | null;
};

export const Surprise: React.FC<TSurpriseProps> = React.memo(
    ({ should_show_surprise, setShouldShowSurprise, startPosition, destination }: TSurpriseProps) => {
        const surprise_ref = useRef<HTMLDivElement>(null);
        const surprise_track_ref = useRef<HTMLAudioElement>(null);

        const makeSurpriseRun = () => {
            const start = [(startPosition as HTMLElement)?.offsetTop, (startPosition as HTMLElement)?.offsetLeft + 70];
            const end = [(destination as HTMLElement)?.offsetTop + 70, (destination as HTMLElement)?.offsetLeft + 70];
            surprise_ref.current?.animate(
                [
                    { top: `${start[0]}px`, left: `${start[1]}px` },
                    { top: `${end[0]}px`, left: `${end[1]}px` },
                ],
                {
                    duration: 2000,
                    fill: 'both',
                    easing: 'linear',
                }
            );
        };

        useEffect(() => {
            let timeout_id: NodeJS.Timeout;
            if (should_show_surprise && surprise_track_ref) {
                makeSurpriseRun();
                surprise_track_ref.current?.play();
                timeout_id = setTimeout(() => {
                    setShouldShowSurprise(false);
                }, 2000);
            }

            return () => {
                if (timeout_id) clearTimeout(timeout_id);
                if (surprise_track_ref) surprise_track_ref.current?.pause();
            };
        }, [should_show_surprise]);

        if (!should_show_surprise) return null;

        return (
            <>
                <div className='surprise' ref={surprise_ref}></div>
                <audio src='/surprise-track.mp3' ref={surprise_track_ref}></audio>
            </>
        );
    }
);

Surprise.displayName = 'Surprise';
