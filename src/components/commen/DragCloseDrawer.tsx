import React, { ReactNode } from "react";
import useMeasure from "react-use-measure";
import {
    useDragControls,
    useMotionValue,
    useAnimate,
    motion,
} from "framer-motion";


interface DragCloseDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode
}

const DragCloseDrawer: React.FC<DragCloseDrawerProps> = ({ isOpen, onClose, children }) => {



    const [scope, animate] = useAnimate();
    const [drawerRef, { height }] = useMeasure();

    const y = useMotionValue(0);
    const controls = useDragControls();

    const handleClose = async () => {
        animate(scope.current, {
            opacity: [1, 0],
        });

        const yStart = typeof y.get() === "number" ? y.get() : 0;

        await animate("#drawer", {
            y: [yStart, height],
        });

        onClose()
    };

    return (
        <>
            {isOpen && (
                <motion.div
                    ref={scope}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={handleClose}
                    className="fixed inset-0 z-50 bg-neutral-950/70 w-full left-0 right-0"
                >
                    <motion.div
                        id="drawer"
                        ref={drawerRef}
                        onClick={(e) => e.stopPropagation()}
                        initial={{ y: "100%" }}
                        animate={{ y: "0%" }}
                        transition={{
                            ease: "easeInOut",
                        }}
                        className="absolute bottom-0 h-[98vh]   w-full overflow-hidden rounded-t-3xl bg-gray-100"
                        style={{ y }}
                        drag="y"
                        dragControls={controls}
                        onDragEnd={() => {
                            if (y.get() >= 100) {
                                handleClose();
                            }
                        }}
                        dragListener={false}
                        dragConstraints={{
                            top: 0,
                            bottom: 0,
                        }}
                        dragElastic={{
                            top: 0,
                            bottom: 0.5,
                        }}
                    >
                        <div className="absolute left-0 right-0 top-0 z-10 flex justify-center bg-gray-800 p-4">
                            <button
                                onPointerDown={(e) => {
                                    controls.start(e);
                                }}
                                className="h-2 w-14 cursor-grab touch-none rounded-full bg-gray-700 active:cursor-grabbing"
                            ></button>
                        </div>
                        <div className="relative z-0 h-full overflow-y-scroll p-4 pt-12 bg-gray-900">
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default DragCloseDrawer