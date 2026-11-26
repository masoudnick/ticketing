import { clsx } from 'clsx';
import React from 'react';




const Card = ({className, children}: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={clsx('flex flex-col items-stretch text-card-foreground rounded-xl bg-card border border-border shadow-xs black/5', className)}>
        {children}
    </div>
}

const CardHeader = ({ className, children }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={clsx("flex items-center justify-between flex-wrap p-5 min-h-14 gap-2.5 border-b border-border", className)}>{children}</div>;
}

const CardContent = ({ className, children }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={clsx("grow p-5", className)}>{children}</div>;
}

const CardTable = ({ className, children }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={clsx("grid grow", className)}>{children}</div>;
}

const CardFooter = ({ className, children }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={clsx('flex items-center px-5 min-h-14 border-t border-border', className)}>{children}</div>;
}

const CardHeading = ({ className, children }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={clsx('space-y-1', className)}>{children}</div>;
}

const CardToolbar = ({ className, children }: React.HTMLAttributes<HTMLDivElement>) =>{
  return <div className={clsx('flex items-center gap-2.5', className)}>{children}</div>;
}

const CardTitle = ({ className, children }: React.HTMLAttributes<HTMLHeadingElement>) => {
  return <h3 className={clsx('text-base font-semibold leading-none tracking-tight', className)}>{children}</h3>
}

const CardDescription = ({ className, children }: React.HTMLAttributes<HTMLDivElement>) => {
  return <div className={clsx('text-sm text-muted-foreground', className)}>{children}</div>;
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardHeading, CardTable, CardTitle, CardToolbar };
