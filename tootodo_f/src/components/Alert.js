import React, { useState, useEffect, useRef } from 'react';
import './Alert.css';

import { HiCheckCircle, HiExclamationCircle, HiXCircle, HiOutlineDotsCircleHorizontal } from 'react-icons/hi';

export default function Alert({alert}) {
    const [color, setColor] = useState({
        text: 'text-black',
        bg: 'bg-white',
        border: 'border-black'
    });
    const [isVisible, setIsVisible] = useState(true);

    const clearAlert = (callback) => {
        setTimeout(() => {
            callback(); // Clear alert after fade-out
        }, 5500); // Match with fade-out duration
    }
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        
        if(alert) {
            setIsVisible(true); // Reset visibility when new alert comes in
            const timer = setTimeout(() => {
                setIsVisible(false);
            }, 4500); // Set to 4.5s to account for animation duration
            clearAlert(() => {
                alert.title = ''; // Clear alert after showing
                alert.message = '';
            })
            
            return () => clearTimeout(timer);
        }
        
    }, [alert]); // Reset timer when alert changes

    const getAlertIcon = (title) => {
        switch (title) {
            case 'Success':
                return ( <HiCheckCircle /> );
            case 'Warning!':
                return ( <HiExclamationCircle /> );
            case 'Error':
                return ( <HiXCircle /> );
            default:
                return ( <HiOutlineDotsCircleHorizontal/> );
        }
    };

    useEffect(() => {
        switch (alert?.title) {
            case 'Success':
                setColor({
                    text: 'text-blue-800',
                    bg: 'bg-blue-200',
                    border: 'border-blue-800'
                });
                break;
            case 'Warning!':
                setColor({
                    text: 'text-yellow-800',
                    bg: 'bg-yellow-200',
                    border: 'border-yellow-800'
                });
                break;
            case 'Error':
                setColor({
                    text: 'text-red-800',
                    bg: 'bg-red-200',
                    border: 'border-red-800'
                });
                break;
            default:
                setColor({
                    text: 'text-black',
                    bg: 'bg-white',
                    border: 'border-black'
                });
        }
    }, [alert?.title]);

    if (!alert || isFirstRender.current) return null;

    return (
        <div className={`alert ${color.text} ${color.bg} ${color.border} ${!isVisible ? 'fade-out' : ''}`} role="alert">
            <div className='alert-logo inline-block mr-2 h-full text-[xx-large]'> 
                {getAlertIcon(alert?.title)}
            </div>
            <div className='alert-text inline-block'>
                <div className='alert-title block font-bold mb-1 text-[large]'>{alert?.title}</div>
                <p className='block font-normal'>{alert?.message}</p>
            </div>
        </div>
    );
}
