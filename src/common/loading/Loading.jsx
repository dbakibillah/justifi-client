const Loading = () => {
    return (
        <section className="h-screen flex flex-col justify-center items-center space-y-3 lg:space-y-8 p-5 lg:p-36 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin animate__faster rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                </div>
            </div>
        </section>
    );
};

export default Loading;
