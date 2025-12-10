const FeedbackLoading = () => {
    return (
        <section className="section-feedback">
            {/* Title skeleton */}
            <div className="flex flex-row justify-center">
                <div className="h-10 w-96 bg-dark-200 rounded-lg animate-pulse" />
            </div>

            {/* Score and date skeleton */}
            <div className="flex flex-row justify-center">
                <div className="flex flex-row gap-5">
                    <div className="h-6 w-40 bg-dark-200 rounded animate-pulse" />
                    <div className="h-6 w-32 bg-dark-200 rounded animate-pulse" />
                </div>
            </div>

            <hr />

            {/* Final assessment skeleton */}
            <div className="space-y-2">
                <div className="h-4 w-full bg-dark-200 rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-dark-200 rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-dark-200 rounded animate-pulse" />
            </div>

            {/* Breakdown skeleton */}
            <div className="flex flex-col gap-4">
                <div className="h-8 w-64 bg-dark-200 rounded-lg animate-pulse" />
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-2">
                        <div className="h-5 w-48 bg-dark-200 rounded animate-pulse" />
                        <div className="h-4 w-full bg-dark-200 rounded animate-pulse" />
                    </div>
                ))}
            </div>

            {/* Strengths skeleton */}
            <div className="flex flex-col gap-3">
                <div className="h-6 w-24 bg-dark-200 rounded animate-pulse" />
                <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-4 w-3/4 bg-dark-200 rounded animate-pulse" />
                    ))}
                </div>
            </div>

            {/* Areas for Improvement skeleton */}
            <div className="flex flex-col gap-3">
                <div className="h-6 w-48 bg-dark-200 rounded animate-pulse" />
                <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-4 w-3/4 bg-dark-200 rounded animate-pulse" />
                    ))}
                </div>
            </div>

            {/* Buttons skeleton */}
            <div className="buttons">
                <div className="h-10 flex-1 bg-dark-200 rounded-lg animate-pulse" />
                <div className="h-10 flex-1 bg-dark-200 rounded-lg animate-pulse" />
            </div>
        </section>
    );
};

export default FeedbackLoading;
