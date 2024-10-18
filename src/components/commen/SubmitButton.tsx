'use client'

import { cn } from '@/utils';
import { useFormStatus } from 'react-dom'

export function SubmitButton({
    title = "submit",
    style,
    loadingForm = 'loading...',
}: {
    title?: string;
    style?: string;
    loadingForm?: string;
}) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            aria-disabled={pending}
            disabled={pending}
            className={cn(style, 'hover:opacity-90 duration-200 scale-105')}
            style={{ opacity: pending ? "50%" : "100%" }}
        >
            {pending ? loadingForm : title ? title : "button"}
        </button>
    );
}