'use client';
import React from 'react';
import { ItemType, StatsCard } from './StatsCard';
import { DollarSign, Eye, Film, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useStatistics } from '../hooks/useStatistics';
import StatisticsSkeleton from '@/components/skeletons/StatisticsSkeleton';

export default function StatsList() {
    const { statistics, isLoading, error } = useStatistics();




    // loading
    if (isLoading) {
        return <StatisticsSkeleton />

    }



    //handle loading and error states
    if (error) return <div>Error fetching statistics</div>;
    if (!statistics || !statistics.data) return null;






    // destructure the data
    const { numberOfCustomers, numberOfMovies, numberOfVisits, revenue } = statistics.data;

    const items: ItemType[] = [
        {
            title: 'Users',
            data: isLoading ? 'Loading...' : numberOfCustomers.toString(),
            icon: Users,
            color: "#8280FF",
            bgColor: "#8280FF",
        },
        {
            title: 'Movies',
            data: isLoading ? 'Loading...' : numberOfMovies.toString(),
            icon: Film,
            color: "#FEC53D",
            bgColor: "#8280FF",
        },
        {
            title: 'Revenue',
            data: isLoading ? 'Loading...' : `$${revenue.toLocaleString()}`,
            icon: DollarSign,
            color: "#4AD991",
            bgColor: "#8280FF",
        },
        {
            title: 'Visitors',
            data: isLoading ? 'Loading...' : numberOfVisits.toString(),
            icon: Eye,
            color: "#80d7ff",
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