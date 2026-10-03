import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { Card, CardContent } from '@/components/card';
import clsx from 'clsx';

const CardItems = ({ title,
    value,
    caption,
    icon,
    variant = 'primary'
}: {
    title: string;
    value: number;
    caption: string;
    icon: IconSvgElement;
    variant?: 'primary' | 'success' | 'warning' | 'violet';
}) => {
    const variants = {
        primary: 'bg-primary/10 text-primary dark:bg-blue-600/10',
        success: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-600/10',
        warning: 'bg-amber-50 text-amber-600 dark:bg-amber-600/10',
        violet: 'bg-violet-50 text-violet-600 dark:bg-violet-600/10',
    };
    return (
        <>
            {/* <Card className="overflow-hidden">
                <CardContent className="p-5">
                    <div className="flex items-start justify-between gap-3">
                        <div className={`flex size-10 items-center justify-center rounded-xl ${variants[variant]}`}>
                            <HugeiconsIcon icon={icon} size={20} />
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-[11px] text-muted-foreground">
                            <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} />
                            {caption}
                        </span>
                    </div>
                    <p className="mt-5 text-sm text-muted-foreground">{title}</p>
                    <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
                </CardContent>
            </Card> */}
            <Card>
                <CardContent className="!p-4 flex gap-6 h-full rounded-2xl">
                    <div className={clsx("flex items-center justify-center w-12 h-12 rounded-xl", variants[variant])}>
                        <HugeiconsIcon icon={icon} size={20} />
                    </div>
                    <div className="flex flex-col grow">
                            <div className='inline-flex justify-between'>
                                <p className="text-sm text-gray-500 dark:text-white/90">{title}</p>
                                <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2 py-1 text-[11px] text-muted-foreground">
                                    <HugeiconsIcon icon={ArrowUpRight01Icon} size={14} />
                                    {caption}
                                </span>
                            </div>
                            <span className="mt-1 font-bold text-gray-800 text-xl text-title-sm dark:text-white/90">{value}</span>
                    </div>
                </CardContent>
            </Card>
        </>
    );
}


export default CardItems;