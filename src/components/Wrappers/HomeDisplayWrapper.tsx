'use client';
import { useHomeDisplayContext } from "@/context/HomeDisplayContext";
import MovieRecommendations from "@/features/MovieRecommendations/components/MovieRecommendations";
import ShowTimesRecommendations from "@/features/ShowTimesRecommendations/components/ShowTimesRecommendations";
import { motion, AnimatePresence } from 'framer-motion';

const HomeDisplayWrapper = () => {
    const { homeDisplayField, setHomeDisplayField } = useHomeDisplayContext();

    // Define animation variants for content
    const contentVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
    };

    // Define animation variants for buttons
    const buttonVariants = {
        initial: { scale: 1 },
        hover: { scale: 1.1 },
        tap: { scale: 0.95 },
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-center mb-4">
                <motion.button
                    className={`px-4 py-2 mx-2 ${homeDisplayField === 'showtimes' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setHomeDisplayField('showtimes')}
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                >
                    Showtimes
                </motion.button>
                <motion.button
                    className={`px-4 py-2 mx-2 ${homeDisplayField === 'movies' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setHomeDisplayField('movies')}
                    variants={buttonVariants}
                    initial="initial"
                    whileHover="hover"
                    whileTap="tap"
                >
                    Movies
                </motion.button>
            </div>
            <div>
                <AnimatePresence mode="wait">
                    {homeDisplayField === 'showtimes' ? (
                        <motion.div
                            key="showtimes"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={contentVariants}
                            transition={{ duration: 0.3 }}
                        >
                            <ShowTimesRecommendations />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="movies"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={contentVariants}
                            transition={{ duration: 0.3 }}
                        >
                            <MovieRecommendations />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default HomeDisplayWrapper;