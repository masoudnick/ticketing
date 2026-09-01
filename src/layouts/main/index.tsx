import React from "react";


const Main: React.FC<{ title: string, children: React.ReactElement }> = ({ title, children }) => {
    return (
        <main className="grow px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <section className="sm:flex sm:justify-between sm:items-center mb-8">
                <h1 className="text-lg md:text-xl font-bold">{title}</h1>
            </section>
            {children}
        </main>
    );
}

export default Main;