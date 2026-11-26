import { useMemo, useState, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import type { ApexOptions } from "apexcharts";
import ApexChart from "react-apexcharts";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";
import { Button } from "@/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardHeading,
  CardTitle,
} from "@/components/card";
import { performanceService, userService } from "@/services";
import {
  ArrowUpLeft,
  TicketCheck,
} from "lucide-react";

import {
  CheckmarkBadge02Icon,
  MailAtSign02Icon,
  SmartPhone01Icon,
  Location01Icon,
  SecurityCheckIcon,
  InLoveIcon,
  Time04Icon,
  TriangleAlertIcon,
  ArrowRight02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";

import { useThemeStore } from "@/store";
import clsx from "clsx";

const number = new Intl.NumberFormat("fa-IR");

const MetricCard = ({
  title,
  value,
  icon,
  variant,
}: {
  title: string;
  value: string;
  icon: ReactNode;
  variant: string;
}) => {
  return (
    <Card>
      <CardContent className="flex gap-6 items-center">
        <div
          className={`flex size-12 items-center justify-center rounded-xl ${variant}`}
        >
          {icon}
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-1 text-xl font-bold">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function TicketCount({
  label,
  value,
  variant,
}: {
  label: string;
  value: number;
  variant: string;
}) {
  return (
    <div className={clsx('rounded-lg p-3 text-center', variant)}>
      <p className="text-xs">{label}</p>
      <p className="mt-1 text-lg font-bold">{number.format(value)}</p>
    </div>
  );
}

function TicketDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}

type PendingTicket = {
  id: string;
  ownerId: string;
  title: string;
  customer: string;
  priority: "بحرانی" | "بالا" | "متوسط";
  sla: number;
  createdAt: string;
};

// Uses the actionable ticket examples already present in the dashboard.
const pendingTickets: PendingTicket[] = [
  {
    id: "705440",
    ownerId: "usr-1006",
    title: "مشکل ورود کاربر",
    customer: "شهرداری شیراز",
    priority: "بحرانی",
    sla: 50,
    createdAt: "۱۴۰۵/۰۵/۱۹",
  },
  {
    id: "705470",
    ownerId: "usr-1001",
    title: "عدم امکان جستجوی پروژه از طریق فیلتر موضوع",
    customer: "شهرداری کاشان",
    priority: "بالا",
    sla: 70,
    createdAt: "۱۴۰۵/۰۵/۲۰",
  },
  {
    id: "705480",
    ownerId: "usr-1001",
    title: "عدم امکان ارسال فرآیند قرارداد",
    customer: "شرکت گاز اصفهان",
    priority: "متوسط",
    sla: 80,
    createdAt: "۱۴۰۵/۰۵/۲۱",
  },
  {
    id: "705480",
    ownerId: "usr-1005",
    title: "عدم امکان ارسال فرآیند قرارداد",
    customer: "شرکت گاز اصفهان",
    priority: "متوسط",
    sla: 80,
    createdAt: "۱۴۰۵/۰۵/۲۱",
  },
  {
    id: "705890",
    ownerId: "usr-1006",
    title: "انجام نشدن ثبت امضا در پروژه 6407",
    customer: "شرکت آبفا اصفهان",
    priority: "بالا",
    sla: 85,
    createdAt: "۱۴۰۵/۰۵/۲۳",
  },
];

const Profile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const id = userId ?? "";
  const [selectedTicket, setSelectedTicket] = useState<PendingTicket | null>(
    null
  );

  const theme = useThemeStore((state) => state.theme);

  const userQuery = useQuery({
    queryKey: ["users", id],
    queryFn: () => userService.readById(id),
    enabled: Boolean(id),
  });

  const profileQuery = useQuery({
    queryKey: ["performanceProfiles", id],
    queryFn: () => performanceService.read(id),
    enabled: Boolean(id),
  });

  const options = useMemo<ApexOptions>(
    () => ({
      chart: {
        type: "area",
        height: 260,
        fontFamily: "Vazirmatn",
        toolbar: { show: false },
      },
      colors: ["#10B981"],
      stroke: { curve: "smooth", width: 3 },
      dataLabels: { enabled: false },
      legend: { position: "top", horizontalAlign: "right" },
      grid: { borderColor: "var(--color-border)", strokeDashArray: 4 },
      yaxis: {
        min: 0,
        forceNiceScale: true,
        labels: { style: { colors: "var(--color-secondary-foreground)" } },
        opposite: true,
      },
      xaxis: {
        labels: { style: { colors: "var(--color-secondary-foreground)" } },
        opposite: true,
      },
      fill: {
        type: "gradient",
        gradient: { opacityFrom: 0.35, opacityTo: 0.02 },
      },
    }),
    []
  );

  if (
    userQuery.isError ||
    profileQuery.isError ||
    !userQuery.data ||
    !profileQuery.data
  )
    return (
      <section className="grid min-h-80 place-items-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
          <HugeiconsIcon icon={TriangleAlertIcon} className="mx-auto size-5 text-amber-500" />
            <h2 className="mt-4 font-semibold">پروفایل کاربر پیدا نشد</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              ممکن است برای این کاربر هنوز ارزیابی عملکردی ثبت نشده باشد.
            </p>
            <Button asChild className="mt-5">
              <Link to="/performances">بازگشت به خلاصه عملکرد</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    );

  const user = userQuery.data;
  const profile = profileQuery.data;
  const userPendingTickets = pendingTickets.filter(
    (ticket) => ticket.ownerId === user.id
  );
  const breachedSlaCount = userPendingTickets.filter(
    (ticket) => ticket.sla < 60
  ).length;
  const atRiskCount = userPendingTickets.filter(
    (ticket) => ticket.sla >= 60 && ticket.sla < 80
  ).length;
  const series = [
    {
      name: "تیکت انجام‌ شده",
      data: user.resolvedTickets.map((point) => point.value).reverse(),
    },
  ];
  const chartOptions = {
    ...options,
    xaxis: {
      ...options.xaxis,
      categories: user.resolvedTickets.map((point) => point.label).reverse(),
    },
  };
  return (
    <section className="space-y-5 lg:space-y-7.5">
      <Link
        to="#"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <HugeiconsIcon icon={ArrowRight02Icon} className="size-5" />
        بازگشت به صفحه قبل
      </Link>

      <section
        className={clsx(
          "bg-center bg-cover bg-no-repeat",
          theme === "light"
            ? "bg-[url(/media/images/hero-bg.png)]"
            : "bg-[url(/media/images/hero-bg-dark.png)]"
        )}
      >
        <div className="flex flex-col items-center gap-2 border-b border-border lg:gap-4 py-4 lg:pt-5 lg:pb-8">
          <Avatar className="size-24 border-2 border-green-500">
            <AvatarImage
              src={`/media/avatars/${user.avatar}`}
              alt={`تصویر پروفایل ${user.name}`}
            />
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-2">
            <HugeiconsIcon
              className="text-primary"
              icon={CheckmarkBadge02Icon}
              size={24}
              strokeWidth={2}
            />
            <h1 className="text-xl font-bold">{user.name}</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            {user.role} · {user.department}
          </p>
          <div className="inline-flex gap-x-6 text-xs font-medium">
            <p className="inline-flex items-center gap-x-1.5">
              <HugeiconsIcon
                className="text-muted-foreground"
                icon={MailAtSign02Icon}
                size={15}
                strokeWidth={2}
              />
              <Link className="hover:text-primary" to={`mailto:${user.email}`}>
                {user.email}
              </Link>
            </p>
            <p className="inline-flex gap-x-1.5">
              <HugeiconsIcon
                className="text-muted-foreground"
                icon={SmartPhone01Icon}
                size={15}
                strokeWidth={2}
              />
              <Link
                className="hover:text-primary"
                to={`tel:${user.phone_number}`}
              >
                {user.phone_number}
              </Link>
            </p>
            <p className="inline-flex gap-x-1.5">
              <HugeiconsIcon
                className="text-muted-foreground"
                icon={Location01Icon}
                size={15}
                strokeWidth={2}
              />
              <span>{user.city}</span>
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          title="تیکت‌ های انجام‌ شده"
          value={number.format(user.performance.resolved)}
          icon={<TicketCheck className="size-5" />}
          variant="text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400"
        />
        <MetricCard
          title="میانگین زمان پاسخ"
          value={`${number.format(user.performance.averageResponseMinutes)} دقیقه`}
          icon={<HugeiconsIcon icon={Time04Icon} className="size-5" />}
          variant="text-violet-600 bg-violet-50 dark:bg-violet-900/20 dark:text-violet-400"
        />
        <MetricCard
          title="پایبندی به SLA"
          value={`٪${number.format(user.performance.sla)}`}
          icon={<HugeiconsIcon icon={SecurityCheckIcon} className="size-5" />}
          variant="text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400"
        />
        <MetricCard
          title="رضایت مشتری"
          value={`٪${number.format(profile.satisfaction)}`}
          icon={<HugeiconsIcon icon={InLoveIcon} className="size-5" />}
          variant="text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-400"
        />
      </div>
      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="items-start">
            <CardHeading>
              <CardTitle>تیکت‌ های انجام ‌شده در 6 ماه اخیر</CardTitle>
            </CardHeading>
          </CardHeader>
          <CardContent>
            {profile.trend.length ? (
              <ApexChart
                options={chartOptions}
                series={series}
                type="area"
                height={300}
              />
            ) : (
              <div className="grid min-h-64 place-items-center text-sm text-muted-foreground">
                داده‌ ای برای روند ماهانه ثبت نشده است.
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>وضعیت تیکت‌ های در انتظار</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              <TicketCount
                label="باز"
                value={user.performance.open}
                variant="bg-neutral-50 text-foreground dark:bg-neutral-900/50"
              />
              <TicketCount
                label="SLA نقض‌شده"
                value={breachedSlaCount}
                variant="bg-rose-50 text-rose-600 dark:bg-rose-900/15 dark:text-rose-300"
              />
              <TicketCount
                label="در معرض تأخیر"
                value={atRiskCount}
                variant="bg-amber-50 text-amber-600 dark:bg-amber-900/15 dark:text-amber-300"
              />
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-sm font-semibold">
                  موارد پیشنهادی برای پیگیری
                </p>
                <span className="text-xs text-muted-foreground">
                  {number.format(userPendingTickets.length)} مورد
                </span>
              </div>
              {userPendingTickets.length ? (
                <div className="space-y-2">
                  {userPendingTickets.map((ticket) => {
                    const breached = ticket.sla < 60;
                    const atRisk = ticket.sla >= 60 && ticket.sla < 80;
                    return (
                      <button
                        key={ticket.id}
                        type="button"
                        onClick={() => setSelectedTicket(ticket)}
                        className="group w-full rounded-lg border border-border p-3 text-right transition-colors hover:border-primary/50 hover:bg-accent/50"
                      >
                        <span className="flex items-start justify-between gap-2">
                          <span className="min-w-0">
                            <span className="block truncate text-sm font-medium group-hover:text-primary">
                              {ticket.title}
                            </span>
                            <span className="mt-1 block truncate text-xs text-muted-foreground">
                              #{number.format(Number(ticket.id))} ·{" "}
                              {ticket.customer}
                            </span>
                          </span>
                          <span
                            className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-medium ${
                              breached
                                ? "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300"
                                : atRisk
                                ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {breached
                              ? "SLA نقض‌شده"
                              : atRisk
                              ? "پیگیری فوری"
                              : ticket.priority}
                          </span>
                        </span>
                        <span className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <HugeiconsIcon icon={Time04Icon} className="size-4" strokeWidth={1.5} />
                            {ticket.createdAt}
                          </span>
                          <span className="inline-flex items-center gap-1 text-primary">
                            جزئیات تیکت
                            <ArrowUpLeft className="size-3.5" />
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-border px-3 py-6 text-center">
                  <HugeiconsIcon icon={TriangleAlertIcon} className="mx-auto size-5 text-amber-500" />
                  <p className="mt-2 text-xs text-muted-foreground">
                    برای این کاربر موردی در فهرست پیگیری ثبت نشده است.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Dialog
        open={Boolean(selectedTicket)}
        onOpenChange={(open) => !open && setSelectedTicket(null)}
      >
        <DialogContent
          size="lg"
          className="max-h-[90vh] overflow-y-auto p-6 sm:p-8"
        >
          {selectedTicket && (
            <>
              <DialogHeader className="border-b border-border pb-5">
                <DialogTitle>{selectedTicket.title}</DialogTitle>
                <DialogDescription>
                  جزئیات تیکت #{number.format(Number(selectedTicket.id))}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 sm:grid-cols-2">
                <TicketDetail label="مشتری" value={selectedTicket.customer} />
                <TicketDetail label="اولویت" value={selectedTicket.priority} />
                <TicketDetail
                  label="وضعیت پیگیری"
                  value={
                    selectedTicket.sla < 60
                      ? "نیازمند اقدام فوری؛ SLA نقض شده"
                      : selectedTicket.sla < 80
                      ? "در معرض تأخیر"
                      : "در انتظار پیگیری"
                  }
                />
                <TicketDetail
                  label="تاریخ ثبت"
                  value={selectedTicket.createdAt}
                />
                <TicketDetail label="مسئول پیگیری" value={user.name} />
                <TicketDetail
                  label="شاخص SLA"
                  value={number.format(selectedTicket.sla)}
                />
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};



export default Profile;
