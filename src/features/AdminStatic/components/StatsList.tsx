'use client';
import React from 'react';
import { ItemType, StatsCard } from './StatsCard';
import { Film, MonitorPlay, Users } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsList() {
    const items: ItemType[] = [
        {
            title: 'users',
            data: '25',
            icon: Users,
            color: "#8280FF",
            bgColor: "#8280FF",
        },
        {
            title: 'movies',
            data: '14',
            icon: Film,
            color: "#FEC53D",
            bgColor: "#8280FF",
        },
        {
            title: 'Revenue',
            data: '\\$210,050',
            icon: MonitorPlay,
            color: "#4AD991",
            bgColor: "#8280FF",
        }
    ];

    return (
        <motion.section
            className="grid grid-cols-4 grid-rows-1 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {items.map((item: ItemType, index: number) => (
                <StatsCard key={index} item={item} />
            ))}
        </motion.section>
    );
}