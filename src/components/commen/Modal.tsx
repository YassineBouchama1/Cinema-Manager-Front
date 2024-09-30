import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};


// setting for model 
const modalVariants = {
    hidden: { y: "100vh", opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.2,
            type: "spring",
            stiffness: 40
        }
    },
    exit: {
        y: "80vh",
        opacity: 0,
        transition: {
            duration: 0.2
        }
    },
};



const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {



    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={() => onClose()}
                    className="fixed  inset-0 bg-gray-500 bg-opacity-75 overflow-y-auto h-screen flex justify-center items-center z-50"
                >
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                        className="self-end  bg-white rounded-t-md shadow-md p-4 w-screen  h-[95%] mx-auto"
                    >
                        {children}
                        <button
                            onClick={() => onClose()}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            close
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
