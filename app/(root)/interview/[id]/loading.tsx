const InterviewLoading = () => {
    return (
        <>
            {/* Header skeleton */}
            <div className="flex flex-row gap-4 justify-between">
                <div className="flex flex-row gap-4 items-center max-sm:flex-col">
                    <div className="flex flex-row gap-4 items-center">
                        <div className="h-10 w-10 bg-dark-200 rounded-full animate-pulse" />
                        <div className="h-6 w-48 bg-dark-200 rounded-lg animate-pulse" />
                    </div>
                    <div className="h-8 w-32 bg-dark-200 rounded animate-pulse" />
                </div>
                <div className="h-10 w-20 bg-dark-200 rounded-lg animate-pulse" />
            </div>

            {/* Agent section skeleton */}
            <div className="call-view mt-8">
                <div className="card-border">
                    <div className="card-content flex flex-col items-center gap-4 p-8">
                        <div className="h-16 w-16 bg-dark-200 rounded-full animate-pulse" />
                        <div className="h-6 w-32 bg-dark-200 rounded animate-pulse" />
                    </div>
                </div>
                <div className="card-border">
                    <div className="card-content flex flex-col items-center gap-4 p-8">
                        <div className="h-[120px] w-[120px] bg-dark-200 rounded-full animate-pulse" />
                        <div className="h-6 w-24 bg-dark-200 rounded animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Call button skeleton */}
            <div className="w-full flex justify-center mt-8">
                <div className="h-16 w-16 bg-dark-200 rounded-full animate-pulse" />
            </div>
        </>
    );
};

export default InterviewLoading;
