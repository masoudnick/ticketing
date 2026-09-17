import { Fragment } from 'react';
import { type ApexOptions } from 'apexcharts';
import ApexChart from 'react-apexcharts';
import { Card, CardHeader, CardTitle } from '@/components/card';

const TotalTicketsChart = () => {
  const data: number[] = [100, 145, 80, 70, 120, 200, 65, 90, 105, 40, 35, 50];
  const categories: {month: string, percentage: number, type: "increase" | "decrease"}[] = [
    {month: 'فروردین', percentage: 0, type: "increase"},
    {month: 'اردیبهشت', percentage: 10, type: "increase"},
    {month: 'خرداد', percentage: 10, type: "decrease"},
    {month: 'تیر', percentage: 2, type: "decrease"},
    {month: 'مرداد', percentage: 12, type: "increase"},
    {month: 'شهریور', percentage: 15, type: "increase"},
    {month: 'مهر', percentage: 20, type: "decrease"},
    {month: 'آبان', percentage: 5, type: "increase"},
    {month: 'آذر', percentage: 1, type: "increase"},
    {month: 'دی', percentage: 4, type: "decrease"},
    {month: 'بهمن', percentage: 1, type: "decrease"},
    {month: 'اسفند', percentage: 3, type: "increase"},
  ];


  const options: ApexOptions = {
    series: [
      {
        name: 'series1',
        data: data,
      },
    ],
    chart: {
      fontFamily: "Vazirmatn",
      height: 250,
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: ['var(--color-primary)'],
    },
    xaxis: {
      categories: categories.map((category) => category.month),
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: 'var(--color-secondary-foreground)',
          fontSize: '12px',
        },
      },
      crosshairs: {
        position: 'front',
        stroke: {
          color: 'var(--color-primary)',
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: false,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      min: 0,
      max: Math.max(...data),
      tickAmount: 5,
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: 'var(--color-secondary-foreground)',
          fontSize: '12px',
        },
        formatter: undefined,
      },
    },
    tooltip: {
      enabled: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      custom: ({ series, seriesIndex, dataPointIndex}: any) => {
        const number = series[seriesIndex][dataPointIndex];
        const category = categories.find((_, index) => index === dataPointIndex); 
        const badgeClass = category.type === "increase" ? "text-green-600 dark:text-green-600" : "text-red-600 dark:text-red-600";
        return `
          <div class="flex flex-col gap-2 p-2 text-right">
            <div class="font-medium text-sm text-secondary-foreground">${category['month']}</div>
            <div class="flex items-center gap-1.5">
              <div class="font-semibold text-base">${number}</div>
              <span class="font-semibold text-xs ${badgeClass}">${category.type === "increase"  ? "+" : "-"}${category['percentage']}%</span>
            </div>
          </div>
        `;
      },
    },
    markers: {
      size: 0,
      colors: 'var(--color-white)',
      strokeColors: 'var(--color-primary)',
      strokeWidth: 4,
      strokeOpacity: 1,
      strokeDashArray: 0,
      fillOpacity: 1,
      shape: 'circle',
      showNullDataPoints: true,
      hover: {
        size: 6,
        sizeOffset: 0,
      },
      discrete: [],
      offsetX: 0,
      offsetY: 0,
    },
    fill: {
      gradient: {
        opacityFrom: 0.4,
        opacityTo: 0,
      },
    },
    grid: {
      borderColor: 'var(--color-border)',
      strokeDashArray: 5,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle>تعداد تیکت های ثبت شده</CardTitle>
        </CardHeader>
        <div className="px-3 py-1">
          <ApexChart
            id="media_uploads_chart"
            options={options}
            series={options.series}
            type="area"
            max-width="694"
            height="250"
          />
        </div>
      </Card>
    </Fragment>
  );
};

export { TotalTicketsChart };
