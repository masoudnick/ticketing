import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/card';
import { ActionItem } from './actionItem';
import { Alert01Icon, UserXIcon, BookOpenCheckIcon, AlertCircleIcon, MessageSquareMoreIcon, UserSearch01Icon } from '@hugeicons/core-free-icons'

export const ActionCenter = () => {

  return (
    <div className="flex gap-5 lg:gap-7.5">
      <Card
        key={0}
        className={`grow`}
        id={`activity`}
      >
        <CardHeader>
          <CardTitle>نیازمند اقدام</CardTitle>
        </CardHeader>
        <CardContent>
          <ActionItem iconBgClass='text-red-600 bg-red-50 dark:bg-red-900/30 dark:text-red-600' icon={Alert01Icon} line={true}>
            <div className="flex flex-col">
              <div className="inline-flex text-sm text-foreground">
                <p>17 تیکت SLA را نقض کرده‌اند</p>
                <Link className='text-primary underline underline-offset-8 decoration-dashed decoration-1 ms-2 hover:text-primary/90' to="">مشاهده</Link>
              </div>
            </div>
          </ActionItem>
          <ActionItem iconBgClass='text-orange-600 bg-orange-50 dark:bg-orange-900/30 dark:text-orange-600' icon={UserXIcon} line={true}>
            <div className="flex flex-col">
              <div className="inline-flex text-sm text-foreground">
                <p>23 تیکت بدون پیگیری کننده هستند</p>
                <Link className='text-primary underline underline-offset-8 decoration-dashed decoration-1 ms-2 hover:text-primary/90' to="">مشاهده</Link>
              </div>
            </div>
          </ActionItem>
          <ActionItem iconBgClass='text-violet-600 bg-violet-50 dark:bg-violet-900/30 dark:text-violet-600' icon={BookOpenCheckIcon} line={true}>
            <div className="flex flex-col">
              <div className="inline-flex text-sm text-foreground">
                <p>6 تیکت پس از بسته‌شدن مجدد باز شده‌اند</p>
                <Link className='text-primary underline underline-offset-8 decoration-dashed decoration-1 ms-2 hover:text-primary/90' to="">مشاهده</Link>
              </div>
            </div>
          </ActionItem>
          <ActionItem iconBgClass='text-yellow-600 bg-yellow-50 dark:bg-yellow-900/30 dark:text-yellow-600' icon={AlertCircleIcon} line={true}>
            <div className="flex flex-col">
              <div className="inline-flex text-sm text-foreground">
                <p>9 تیکت در آستانه نقض SLA هستند</p>
                <Link className='text-primary underline underline-offset-8 decoration-dashed decoration-1 ms-2 hover:text-primary/90' to="">رسیدگی</Link>
              </div>
            </div>
          </ActionItem>
          <ActionItem iconBgClass='text-cyan-600 bg-cyan-50 dark:bg-cyan-900/30 dark:text-cyan-600' icon={UserSearch01Icon} line={true}>
            <div className="flex flex-col">
              <div className="inline-flex text-sm text-foreground">
                <p>15 تیکت در انتظار بررسی کارشناس هستند</p>
                <Link className='text-primary underline underline-offset-8 decoration-dashed decoration-1 ms-2 hover:text-primary/90' to="">رسیدگی</Link>
              </div>
            </div>
          </ActionItem>
          <ActionItem iconBgClass='text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 dark:text-emerald-600' icon={MessageSquareMoreIcon} line={false}>
            <div className="flex flex-col">
              <div className="inline-flex text-sm text-foreground">
                <p>19 تیکت دارای پیام جدید هستند</p>
                <Link className='text-primary underline underline-offset-8 decoration-dashed decoration-1 ms-2 hover:text-primary/90' to="">مشاهده</Link>
              </div>
            </div>
          </ActionItem>
        </CardContent>
        <CardFooter className="justify-center">
          <Link className='text-primary underline underline-offset-8 decoration-dashed decoration-1 hover:text-primary/90' to="">مشاهده همه</Link>
        </CardFooter>
      </Card>
    </div>
  );
}
