'use client'
import { useState } from 'react';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import ListMovieTickets from './ListMovieTickets';

const tabs = [
    {
        name: 'tab1',
        label: 'My Tickets',
        render: () => <ListMovieTickets />
    },
    {
        name: 'tab2',
        label: 'Setting',
        render: () => (
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita in non earum natus explicabo est aspernatur porro molestias fugiat eaque dignissimos, accusantium qui fugit praesentium ad cumque dolore temporibus excepturi.</p>
        )
    },
    {
        name: 'tab3',
        label: 'Tab 3',
        render: () => (
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis eos sequi ducimus voluptas, accusamus amet? Ducimus, velit doloremque atque est quidem ullam nisi quod. Aut quisquam ipsa exercitationem mollitia ratione?</p>
        )
    }
];

const tabContentVariants: Variants = {
    initial: {
        y: 10,
        opacity: 0
    },
    enter: {
        y: 0,
        opacity: 1
    },
    exit: {
        y: -10,
        opacity: 0
    }
}

function ProfileWrapper() {
    const [activeTab, setActiveTab] = useState(tabs[0]);



    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, tab: typeof tabs[number]) => {
        e.preventDefault();
        setActiveTab(tab);
    }


    const isSelected = (tab: typeof tabs[number]) => activeTab.name === tab.name;

    return (
        <div className="w-full px-3 mx-auto bg-gray-900 rounded-lg overflow-hidden flex flex-col p-1.5">
            <div className="flex gap-2.5 p-2.5">
                {tabs.map((tab) => (
                    <div
                        key={tab.name}
                        className={`relative ${isSelected(tab) ? 'text-blue-400' : 'text-gray-700'}`}
                    >
                        <a href='#' onClick={(e) => handleClick(e, tab)} className="block px-2.5 py-1.5">
                            {tab.label}
                        </a>

                        {isSelected(tab) && <motion.div layoutId='indicator' className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400" />}
                    </div>
                ))}
            </div>

            <div className="flex-1 p-2.5 text-white h-full bg-gray-800 overflow-auto">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={activeTab.name || "empty"}
                        variants={tabContentVariants}
                        initial="initial"
                        animate="enter"
                        exit="exit"
                        className='h-screen'
                        transition={{
                            duration: 0.3
                        }}
                    >
                        {activeTab.render()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}

export default ProfileWrapper;