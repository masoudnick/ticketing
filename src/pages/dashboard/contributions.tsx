import { type ApexOptions } from 'apexcharts';
import ApexChart from 'react-apexcharts';
import { Card, CardContent } from '@/components/card';

interface IContributionsProps {
  title: string;
}

const Contributions = () => {
  const data: number[] = [44, 55, 41, 17, 15];
  const labels: string[] = ['ERP', 'HRM', 'DMS', 'CRM', 'DAM'];
  const colors: string[] = [
    'var(--color-blue-500)',
    'var(--color-red-500)',
    'var(--color-green-500)',
    'var(--color-violet-700)',
    'var(--color-orange-300)',
  ];

  const options: ApexOptions = {
    series: data,
    labels: labels,
    colors: colors,
    fill: {
      colors: colors,
    },
    chart: {
      type: 'donut',
    },
    stroke: {
      show: true,
      width: 2,
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    legend: {
      offsetY: -10,
      offsetX: -10,
      fontSize: '13px',
      fontWeight: '500',
      itemMargin: {
        vertical: 1,
      },
      labels: {
        colors: 'var(--gray-700)',
        useSeriesColors: false,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <Card>
      <CardContent className="flex justify-center items-center">
        <ApexChart
          id="contributions_chart"
          options={options}
          series={options.series}
          type="donut"
          width="100%"
          height="178.7"
        />
      </CardContent>
    </Card>
  );
};

export { Contributions, type IContributionsProps };
