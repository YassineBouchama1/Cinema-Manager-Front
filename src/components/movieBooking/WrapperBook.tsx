'use client'
import React from 'react'
import DragCloseDrawer from '../commen/DragCloseDrawer'
import MovieBooking from '.'
import { useGlobalTheme } from '@/context/GlobalThemeContext';

export default function WrapperBook() {

    const { isModelOpen, closeModel } = useGlobalTheme();

    return (
        <DragCloseDrawer isOpen={!!isModelOpen} onClose={closeModel}>
            <MovieBooking />
        </DragCloseDrawer>
    )
}
