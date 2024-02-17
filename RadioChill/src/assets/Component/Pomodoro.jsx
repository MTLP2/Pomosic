import React, { useState, useEffect, useRef } from 'react';



import { gsap } from "gsap";


const alertSound = new Audio('music/Event.mp3');

export default function Pomodoro() {
    // Crée une variable d'état pour stocker l'heure actuelle formatée
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }));
    const [isActive, setIsActive] = useState(false); // Commence comme inactif
    const [isButtonActive, setisButtonActive] = useState(false); // Commence comme inactif
    const [timer, setTimer] = useState(25 * 60); // 25 minutes en secondes
    const [isWorkTime, setIsWorkTime] = useState(true); // True pour le cycle de travail, false pour la pause
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
  

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setTasks(savedTasks);
      }, []);

    const addTask = () => {
      if (!newTask) return; // Ne rien faire si l'input est vide
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    };
  
    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };


    const togllePomodoro = () => {
        setIsActive(!isActive); // Basculer l'état d'activité du timer
        if (!isActive) { // Si le timer était inactif, le démarrer
            setTimer(isWorkTime ? 25 * 60  : 5 * 60); // Réinitialise le timer selon le cycle
        }
    };


    useEffect(() => {


        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        alertSound.play(); // Joue un son à la fin du timer
                        clearInterval(interval); // Arrête le timer
                        setIsActive(false); // Désactive le timer
                        setIsWorkTime(!isWorkTime); // Basculer entre le travail et la pause
                        return isWorkTime ? 5 * 60 : 25 * 60; // Réinitialise le timer pour le prochain cycle
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isActive, isWorkTime]);

    const formatTime = () => {
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };


    const toggleIsActive = () => {
        if (!isButtonActive) {
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
        setisButtonActive(!isButtonActive);
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
                <p className='PomodoroTimer'>{formatTime()}</p>
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
                    <button onClick={togllePomodoro} className='StartPomodoro'>{isActive ? 'Stop' : 'Start'}</button>
                </div>
            </div>
        </div>
    );
}
