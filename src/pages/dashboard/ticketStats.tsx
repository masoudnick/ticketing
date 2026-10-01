import { Ticket03Icon, TicketPercentIcon, TicketCheckIcon, TicketPlusIcon } from '@hugeicons/core-free-icons';
import { Fragment } from 'react';
import { Card, CardContent } from '@/components/card';
import { Skeleton } from '@/components/skeleton';
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { useQuery } from '@tanstack/react-query';
import CountUp from "react-countup";


import clsx from 'clsx';

interface TicketStatsItem {
    name: string;
    icon: IconSvgElement;
    desc: string;
    variant: string;
}


const TicketStats = () => {
    const items: TicketStatsItem[] = [
        {
            name: "totalTickets",
            icon: TicketPlusIcon,
            variant: "text-orange-600 bg-orange-100 dark:bg-orange-900/40 dark:text-orange-600",
            desc: 'تعداد کل تیکت ها',
        },
        {
            name: "resolvedTickets",
            icon: TicketCheckIcon,
            variant: "text-green-600 bg-green-100 dark:bg-green-900/40 dark:text-green-600",
            desc: 'تعداد تیکت انجام شده',
        },
        {
            name: "openTickets",
            icon: Ticket03Icon,
            variant: "text-violet-600 bg-violet-100 dark:bg-violet-900/40 dark:text-violet-600",
            desc: 'تعداد تیکت باز',
        },
        {
            name: "doingTickets",
            icon: TicketPercentIcon,
            variant: "text-blue-600 bg-blue-100 dark:bg-blue-900/40 dark:text-blue-600",
            desc: 'تعداد تیکت در حال انجام',
        },
    ];

    const { data: ticketStats, isLoading } = useQuery({
        queryKey: ['ticketStats'],
        queryFn: () =>
            fetch('http://localhost:3001/ticketStats').then((res) =>
                res.json(),
            ),
        refetchOnWindowFocus: false,
    });


    return (
        <Fragment>
            {!isLoading ? items.map((item, index) =>
                <Card key={index}>
                    <CardContent className="p-0 flex gap-6 h-full rounded-2xl">
                        <div className={clsx("flex items-center justify-center w-12 h-12 rounded-xl", item.variant)}>
                            <HugeiconsIcon icon={item.icon} size={20} />
                        </div>
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-white/90">{item.desc}</p>
                                <CountUp start={0} end={ticketStats?.find((stat) => stat.name === item.name)?.value ?? 0} duration={3}>
                                    {({ countUpRef }) => (
                                        <span className="mt-1 font-bold text-gray-800 text-title-sm dark:text-white/90" ref={countUpRef}></span>
                                    )}
                                </CountUp>

                            </div>
                        </div>
                    </CardContent>
                </Card>
            ) :
                items.map((_, index) =>
                    <Skeleton key={index} className="h-22 w-full" />
                )
            }
        </Fragment>
    );
};

export { TicketStats, type TicketStatsItem };
