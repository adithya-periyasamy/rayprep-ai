"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "./ui/button";

const StartInterviewButton = () => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleClick = () => {
        startTransition(() => {
            router.push("/interview");
        });
    };

    return (
        <Button
            className="btn-primary max-sm:w-full"
            onClick={handleClick}
            disabled={isPending}
        >
            {isPending ? (
                <span className="flex items-center gap-2">
                    <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Loading...
                </span>
            ) : (
                "Start an Interview"
            )}
        </Button>
    );
};

export default StartInterviewButton;
