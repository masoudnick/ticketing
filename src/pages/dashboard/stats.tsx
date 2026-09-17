import { Ticket03Icon, TicketPercentIcon, TicketCheckIcon, TicketPlusIcon } from '@hugeicons/core-free-icons';
import { Fragment } from 'react';
import { Card, CardContent } from '@/components';
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import clsx from 'clsx';

interface IChannelStatsItem {
    icon: IconSvgElement;
    desc: string;
    value: number;
    variant: string;
}

type IChannelStatsItems = Array<IChannelStatsItem>;

const ChannelStats = () => {
    const items: IChannelStatsItems = [
        {
            icon: TicketPlusIcon,
            variant: "text-orange-600 bg-orange-100 dark:bg-orange-900/40 dark:text-orange-600",
            desc: 'تعداد کل تیکت ها',
            value: 4000,
        },
        { 
            icon: TicketCheckIcon,
            variant: "text-green-600 bg-green-100 dark:bg-green-900/40 dark:text-green-600",
            desc: 'تعداد تیکت انجام شده',
            value: 500 
        },
        { 
            icon: Ticket03Icon,
            variant: "text-violet-600 bg-violet-100 dark:bg-violet-900/40 dark:text-violet-600",
            desc: 'تعداد تیکت باز',
            value: 2500 },
        {
            icon: TicketPercentIcon,
            variant: "text-blue-600 bg-blue-100 dark:bg-blue-900/40 dark:text-blue-600",
            desc: 'تعداد تیکت در حال انجام',
            value: 1000,
        },
    ];


    return (
        <Fragment>

            {items.map((item, index) =>
                <Card key={index}>
                    <CardContent className="p-0 flex gap-6 h-full bg-cover rtl:bg-[left_top_-1.7rem] bg-[right_top_-1.7rem] bg-no-repeat rounded-2xl">
                        <div className={clsx("flex items-center justify-center w-12 h-12 rounded-xl", item.variant)}>
                                <HugeiconsIcon icon={item.icon} size={20} />
                            </div>
                            <div className="flex items-end justify-between">
                                <div>
                                    <span className="text-sm text-gray-500 dark:text-white/90">{item.desc}</span>
                                    <h4 className="mt-1 font-bold text-gray-800 text-title-sm dark:text-white/90">{item.value}</h4>
                                </div>
                            </div>
                    </CardContent>
                </Card>
            )}
        </Fragment>
    );
};

export { ChannelStats, type IChannelStatsItem, type IChannelStatsItems };
