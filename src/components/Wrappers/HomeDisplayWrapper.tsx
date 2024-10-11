'use client';
import { useHomeDisplayContext } from "@/context/HomeDisplayContext";
import MovieRecommendations from "@/features/MovieRecommendations/components/MovieRecommendations";
import ShowTimesRecommendations from "@/features/ShowTimesRecommendations/components/ShowTimesRecommendations";
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from "react";

// type tabs home display
type Tab = 'Showtimes' | 'Movies';

const tabs: Tab[] = ["Showtimes", "Movies"];

const HomeDisplayWrapper: React.FC = () => {
    const { homeDisplayField, setHomeDisplayField } = useHomeDisplayContext();
    const [selected, setSelected] = useState<Tab>(homeDisplayField === 'showtimes' ? 'Showtimes' : 'Movies');

    // here i define conet ver
    const contentVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 20 },
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-center mb-4">
                {tabs.map((tab) => (
                    <Chip
                        text={tab}
                        selected={selected === tab}
                        setSelected={(tab) => {
                            setSelected(tab);
                            setHomeDisplayField(tab.toLowerCase() as 'showtimes' | 'movies');
                        }}
                        key={tab}
                    />
                ))}
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

interface ChipProps {
    text: Tab;
    selected: boolean;
    setSelected: (tab: Tab) => void;
}

const Chip: React.FC<ChipProps> = ({ text, selected, setSelected }) => {
    return (
        <button
            onClick={() => setSelected(text)}
            className={`${selected
                ? "text-white"
                : "text-slate-300 hover:text-slate-200 hover:bg-slate-700"
                } text-sm transition-colors px-2.5 py-0.5 rounded-md relative`}
        >
            <span className="relative z-10">{text}</span>
            {selected && (
                <motion.span
                    layoutId="pill-tab"
                    transition={{ type: "spring", duration: 0.5 }}
                    className="absolute inset-0 z-0 bg-gradient-to-r from-red-600 to-red-500 rounded-md"
                ></motion.span>
            )}
        </button>
    );
};

export default HomeDisplayWrapper;