"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";

interface FeedbackButtonsProps {
    interviewId: string;
}

const FeedbackButtons = ({ interviewId }: FeedbackButtonsProps) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [activeButton, setActiveButton] = useState<"home" | "retake" | null>(null);

    const handleNavigation = (destination: "home" | "retake") => {
        setActiveButton(destination);
        startTransition(() => {
            if (destination === "home") {
                router.push("/home");
            } else {
                router.push(`/interview/${interviewId}`);
            }
        });
    };

    return (
        <div className="buttons">
            <Button
                className="btn-secondary flex-1"
                onClick={() => handleNavigation("home")}
                disabled={isPending}
            >
                {isPending && activeButton === "home" ? (
                    <span className="flex items-center justify-center gap-2 w-full">
                        <span className="size-4 border-2 border-primary-200 border-t-transparent rounded-full animate-spin" />
                        Loading...
                    </span>
                ) : (
                    <p className="text-sm font-semibold text-primary-200 text-center">
                        Back to dashboard
                    </p>
                )}
            </Button>

            <Button
                className="btn-primary flex-1"
                onClick={() => handleNavigation("retake")}
                disabled={isPending}
            >
                {isPending && activeButton === "retake" ? (
                    <span className="flex items-center justify-center gap-2 w-full">
                        <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Loading...
                    </span>
                ) : (
                    <p className="text-sm font-semibold text-black text-center">
                        Retake Interview
                    </p>
                )}
            </Button>
        </div>
    );
};

export default FeedbackButtons;
