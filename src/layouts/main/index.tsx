import React from "react";
import { useIsFetching } from "@tanstack/react-query";

const Main: React.FC<{ title: string; children: React.ReactElement }> = ({
  title,
  children,
}) => {
  const isFetching = useIsFetching();
  return (
    <main className="grow px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {title && (
        <section className="sm:flex sm:justify-between sm:items-center mb-8">
          <h1 className="text-lg md:text-xl font-bold">{title}</h1>
        </section>
      )}
      {isFetching > 0 ? (
        <div className="flex justify-center items-center h-full py-4">
          <div className="size-6 animate-spin rounded-full border-2 border-gray-300 border-t-primary" />
        </div>
      ) : children}

      
    </main>
  );
};

export default Main;
