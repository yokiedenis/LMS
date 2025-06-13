declare module 'react-fireworks' {
    import React from 'react';

    interface FireworksProps {
        width: number;
        height: number;
        options?: {
            particleColor?: string[];
            explosion?: {
                min?: number;
                max?: number;
            };
            delay?: number;
        };
    }

    const Fireworks: React.FC<FireworksProps>;

    export default Fireworks;
}
