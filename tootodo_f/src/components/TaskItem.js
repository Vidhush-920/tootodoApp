import React from 'react';
import { motion } from 'framer-motion';

export default function TaskItem({ task, onToggleDone }) {

    // Framer Motion properties for entering, active, and exiting states
    const motionProps = {
        layout: true, // Enables smooth movement of other list items when this one is removed
        initial: { opacity: 0, y: -10, scale: 0.98 }, // Initial state (Fade-In)
        animate: { opacity: 1, y: 0, scale: 1 }, // Active state
        exit: { opacity: 0, height: 0, marginBottom: 0, paddingBottom: 0, paddingTop: 0 }, // Exit state (Fade-Out and Collapse)
        transition: { duration: 0.3 } // Transition settings (optional, Framer Motion defaults are often fine)
    };
    
    return (
        <motion.div key={task.id} {...motionProps} 
            className="taskitem bg-gray-300 p-5 mb-4 rounded-xl flex items-center justify-between 
                shadow-md hover:shadow-lg transition-shadow duration-300"
            >
            <div className="task-div flex-grow min-w-0">
                <h3 className="text-lg font-bold truncate">{task.title}</h3>
                <p className="text-sm text-gray-900 mt-1">{task.description}</p>
            </div>

            <div className="button-div flex flex-shrink-0 items-end ml-4 h-[-webkit-fill-available]">
                {/* Done Button */}
                <button type="button"
                    className="px-5 py-1 mx-1 text-sm font-medium 
                        text-gray-800 hover:text-blue-700 active:text-white 
                        bg-transparent active:bg-blue-700
                        border border-gray-800 hover:border-blue-600 rounded-lg shadow-sm 
                        transition duration-300"
                    onClick={() => onToggleDone(task.id, true)}
                    aria-label={`Mark ${task.title} as done`}
                >
                    Done
                </button>
            </div>
        </motion.div>
    );
};
