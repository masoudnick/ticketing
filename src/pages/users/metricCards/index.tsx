import { memo } from "react";
import CardItems from "./cardItem";
import { User02Icon } from '@hugeicons/core-free-icons';

const MetricCards = memo(() => {
    console.log('MetricCards render');
    return (
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
            <CardItems title="کاربران فعال" value={10} caption="۲ نفر این ماه" icon={User02Icon} />
            <CardItems title="تیکت‌های حل‌شده" value={20} caption="۸.۴٪ رشد" icon={User02Icon} variant="success" />
            <CardItems title="تیکت‌های باز" value={30} caption="نیازمند پیگیری" icon={User02Icon} variant="warning" />
            <CardItems title="میانگین SLA تیم" value={40} caption="۱.۲٪ رشد" icon={User02Icon} variant="violet" />
        </section>
    );
})


export default MetricCards;