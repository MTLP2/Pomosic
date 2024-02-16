import React, { useState, useEffect, useRef } from 'react';


import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";


export default function Pomodoro() {
    // Crée une variable d'état pour stocker l'heure actuelle formatée
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
    const [isActive, setIsActive] = useState(true);
    const isFirstRender = useRef(true);

    const toggleIsActive = () => {
        if (!isActive) {
            gsap.to(".PomodoroContent", {
              height: "100%"
            });
            gsap.to(".PomodoroButton",{
                borderRadius : "0px"
            })
            
          } else {
            // Animation pour revenir à l'état initial ou un autre état
            gsap.to(".PomodoroContent", {
              height : "0%"
            });
            gsap.to(".PomodoroButton",{
                borderRadius : "10px"
            })
          }
        setIsActive(!isActive);
    };


    
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
                <p className='PomodoroTimer'>12:11</p>
            </div>
            <div className="PomodoroContainer">
                <button onClick={toggleIsActive} className='PomodoroButton'>Pomodoro</button>
                <div className="PomodoroContent">
                    <div className="PomodoroTaskContainer">
                        <div className="PomodoroTask">
                            <p>Task 1</p>
                            <button>X</button>
                        </div>

                        <div className="PomodoroTask">
                            <p>Task 1</p>
                            <button>X</button>
                        </div>
                        
                        <div className="PomodoroTask">
                            <p>Task 1</p>
                            <button>X</button>
                        </div>

                    </div>
                    <div className="PomodoroAddTask">
                        <input value={'Add a task'} type="text" />
                        <button>Save</button>
                    </div>
                    <button className='StartPomodoro'>Start</button>
                </div>
            </div>
        </div>
    );
}
