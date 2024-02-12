import React, { useState, useEffect } from 'react';

export default function Pomodoro() {
    // Crée une variable d'état pour stocker l'heure actuelle formatée
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));

    useEffect(() => {
        // Crée un intervalle qui met à jour l'heure actuelle chaque minute
        const timerId = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
        }, 60000); // Met à jour toutes les 60 secondes (60000 ms)

        // Nettoie l'intervalle quand le composant est démonté ou rechargé
        return () => {
            clearInterval(timerId);
        };
    }, []); // Le tableau vide comme deuxième argument signifie que l'effet ne s'exécute qu'au montage du composant

    return (
        <div className='ContentContainer'>
            <div className="TimerContainer">
                {/* Affiche l'heure actuelle formatée sans les secondes */}
                <p>{currentTime}</p>
            </div>
            <div className="PomodoroContainer">
                {/* Autres éléments de ton Pomodoro ici */}
            </div>
        </div>
    );
}
