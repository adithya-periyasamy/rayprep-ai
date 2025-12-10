const HomeLoading = () => {
    return (
        <>
            {/* Header skeleton */}
            <div className="flex justify-between items-center mb-8">
                <div className="h-8 w-48 bg-dark-200 rounded-lg animate-pulse" />
                <div className="h-9 w-24 bg-dark-200 rounded-lg animate-pulse" />
            </div>

            {/* CTA section skeleton */}
            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <div className="h-10 w-full bg-dark-200 rounded-lg animate-pulse" />
                    <div className="h-6 w-3/4 bg-dark-200 rounded-lg animate-pulse" />
                    <div className="h-12 w-48 bg-dark-200 rounded-lg animate-pulse" />
                </div>
                <div className="w-[400px] h-[400px] bg-dark-200 rounded-lg animate-pulse max-sm:hidden" />
            </section>

            {/* Your Interviews section skeleton */}
            <section className="flex flex-col gap-6 mt-8">
                <div className="h-8 w-40 bg-dark-200 rounded-lg animate-pulse" />
                <div className="interviews-section">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="card-border w-[360px] max-sm:w-full min-h-96">
                            <div className="card-interview">
                                <div className="h-[90px] w-[90px] bg-dark-200 rounded-full animate-pulse" />
                                <div className="h-6 w-48 bg-dark-200 rounded-lg animate-pulse mt-5" />
                                <div className="flex flex-row gap-5 mt-3">
                                    <div className="h-5 w-24 bg-dark-200 rounded animate-pulse" />
                                    <div className="h-5 w-20 bg-dark-200 rounded animate-pulse" />
                                </div>
                                <div className="h-12 w-full bg-dark-200 rounded-lg animate-pulse mt-5" />
                                <div className="flex flex-row justify-between mt-4">
                                    <div className="h-8 w-24 bg-dark-200 rounded animate-pulse" />
                                    <div className="h-10 w-32 bg-dark-200 rounded-lg animate-pulse" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Take Interviews section skeleton */}
            <section className="flex flex-col gap-6 mt-8">
                <div className="h-8 w-40 bg-dark-200 rounded-lg animate-pulse" />
                <div className="interviews-section">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="card-border w-[360px] max-sm:w-full min-h-96">
                            <div className="card-interview">
                                <div className="h-[90px] w-[90px] bg-dark-200 rounded-full animate-pulse" />
                                <div className="h-6 w-48 bg-dark-200 rounded-lg animate-pulse mt-5" />
                                <div className="flex flex-row gap-5 mt-3">
                                    <div className="h-5 w-24 bg-dark-200 rounded animate-pulse" />
                                    <div className="h-5 w-20 bg-dark-200 rounded animate-pulse" />
                                </div>
                                <div className="h-12 w-full bg-dark-200 rounded-lg animate-pulse mt-5" />
                                <div className="flex flex-row justify-between mt-4">
                                    <div className="h-8 w-24 bg-dark-200 rounded animate-pulse" />
                                    <div className="h-10 w-32 bg-dark-200 rounded-lg animate-pulse" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default HomeLoading;
