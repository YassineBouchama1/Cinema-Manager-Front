"use client";

import { cn } from "@/utils";
import { Film, LucideIcon, MonitorPlay, Users } from "lucide-react";
import { motion } from "framer-motion";

export type ItemType = {
    title: string;
    data: string;
    icon: LucideIcon;
    color: string;
    bgColor: string;
};

export function StatsCard({ item }: { item: ItemType }) {
    return (
        <motion.div
            className="col-span-4 md:col-span-2 lg:col-span-1 bg-gray-800 shadow-sm shadow-blue-950 flex flex-row items-start justify-between w-full h-auto rounded-xl py-2 px-4"
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