"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";

interface InterviewCardButtonProps {
    href: string;
    label: string;
}

const InterviewCardButton = ({ href, label }: InterviewCardButtonProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(() => {
            router.push(href);
        });
    };

    return (
        <Button
            className="btn-primary"
            onClick={handleClick}
            disabled={isPending}
        >
            {isPending ? (
                <span className="flex items-center gap-2">
                    <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Loading...
                </span>
            ) : (
                label
            )}
        </Button>
    );
};

export default InterviewCardButton;
