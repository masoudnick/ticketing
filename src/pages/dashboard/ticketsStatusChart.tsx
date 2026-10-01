import { Fragment } from 'react';
import { type ApexOptions } from 'apexcharts';
import ApexChart from 'react-apexcharts';
import { Card, CardHeader, CardTitle } from '@/components/card';

const TicketsStatusChart = () => {
  const data: number[] = [42, 145, 278, 26, 598, 36];
  const categories: string[] = [
    'باز',
    'در حال بررسی',
    'در حال انجام',
    'منتظر پاسخ',
    'انجام شده',
    'بازگشایی‌ شده',
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
      type: 'bar',
      toolbar: {
        show: false,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        type: 'horizontal',
        shadeIntensity: 0.9,
        gradientToColors: ['var(--color-primary)'],
        opacityFrom: 0.8,
        opacityTo: 0.7,
        stops: [0, 100],
      },
    },
    states: {
      hover: {
        filter: {
          type: 'lighten',
          value: 0.04,
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: 'end',
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: categories,
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
        offsetX: 50,
      },
      opposite: true,
      reversed: true,
    },
    tooltip: {
      enabled: true,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      custom: ({ series, seriesIndex, dataPointIndex }: any) => {
        const number = series[seriesIndex][dataPointIndex];
        const category = categories.find((_, index) => index === dataPointIndex);
        return `
          <div class="flex flex-col gap-2 p-2 text-right text-xs">
            <p class="font-mediumtext-secondary-foreground">${category}</p>
              <p>${number}</p>
          </div>
        `;
      },
    },
    grid: {
      borderColor: 'var(--color-border)',
      strokeDashArray: 2,
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        right: 10,
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
          <CardTitle>تعداد تیکت‌ها براساس وضعیت</CardTitle>
        </CardHeader>
        <div className="px-3 py-1">
          <ApexChart
            id="media_uploads_chart"
            options={options}
            series={options.series}
            type="bar"
            max-width="694"
            height="250"
          />
        </div>
      </Card>
    </Fragment>
  );
};

export { TicketsStatusChart };
