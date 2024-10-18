"use client";
import React from 'react';

import { DollarSign, Eye, Film, LucideIcon, Users } from "lucide-react";
import { motion } from "framer-motion";

import { cn } from '@/utils';



export type ItemType = {
    title: string;
    data: string;
    icon: LucideIcon;
    color: string;
    bgColor: string;
};

function StatsCardSkeleton({ item }: { item: ItemType }) {
    return (
        <motion.div
            className=" animate-spincol-span-4 md:col-span-2 lg:col-span-1 bg-gray-800 shadow-sm shadow-blue-950 flex flex-row items-start justify-between w-full h-auto rounded-xl py-2 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="flex flex-col gap-4">
                <motion.p
                    className="text-sm font-medium opacity-80"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    {item.title}
                </motion.p>
                <motion.p
                    className="font-semibold text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    {item.data}
                </motion.p>
            </div>
            <div className={cn("rounded-[23px] p-4", `bg-[#${item.bgColor}]/70`)}>
                <item.icon color={item.color} size={50} />
            </div>
        </motion.div>
    );
}







export default function StatisticsSkeleton() {


    const items: ItemType[] = [
        {
            title: 'Users',
            data: 'Loading...',
            icon: Users,
            color: "#8280FF",
            bgColor: "#8280FF",
        },
        {
            title: 'Movies',
            data: 'Loading...',
            icon: Film,
            color: "#FEC53D",
            bgColor: "#8280FF",
        },
        {
            title: 'Revenue',
            data: 'Loading...',
            icon: DollarSign,
            color: "#4AD991",
            bgColor: "#8280FF",
        },
        {
            title: 'Visitors',
            data: 'Loading...',
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
                <StatsCardSkeleton key={index} item={item} />
            ))}
        </motion.section>
    );
}




