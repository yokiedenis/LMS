import React, { useEffect } from 'react';
import styles from '@/styles/BackgroundAnimation.module.css';

const FallingLetters: React.FC = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // You can use any string of letters
    const numberOfLetters = 50; // Adjust the number of falling letters

    const generateRandomPosition = (): number => {
        return Math.random() * 100; // Random position between 0% and 100%
    };

    useEffect(() => {
        const fallingLetterContainer = document.getElementById('falling-letters');
        if (fallingLetterContainer) {
            for (let i = 0; i < numberOfLetters; i++) {
                const letter = letters.charAt(Math.floor(Math.random() * letters.length));
                const letterElement = document.createElement('div');
                letterElement.className = `${styles.fallingLetter} falling-letter-${i % 3 + 1}`;
                letterElement.innerText = letter;
                letterElement.style.left = `${generateRandomPosition()}%`;
                fallingLetterContainer.appendChild(letterElement);
            }
        }
    }, []);

    return <div id="falling-letters" />;
};

export default FallingLetters;
