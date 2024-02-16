import React, { useState, useEffect, useRef } from 'react';


import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";


export default function Pomodoro() {
    // Crée une variable d'état pour stocker l'heure actuelle formatée
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
    const [isActive, setIsActive] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
  
    const addTask = () => {
      if (!newTask) return; // Ne rien faire si l'input est vide
      setTasks([...tasks, newTask]); // Ajoute la nouvelle tâche à la liste
      setNewTask(""); // Réinitialise l'input après l'ajout
    };
  
    const deleteTask = (index) => {
      setTasks(tasks.filter((_, i) => i !== index)); // Supprime la tâche à l'index spécifié
    };




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
                        {tasks.map((task, index) => (
                        <div key={index} className="PomodoroTask">
                        <p>{task}</p>
                        <button onClick={() => deleteTask(index)}>X</button>
                        </div>
                        ))}
                    </div>
                    <div className="PomodoroAddTask">
                        <input 
                            value={newTask}
                            onChange={(e) => setNewTask(e.target.value)}
                            type="text"
                            placeholder="Add a task"
                        />
                        <button onClick={addTask}>Save</button>
                    </div>
                    <button className='StartPomodoro'>Start</button>
                </div>
            </div>
        </div>
    );
}
