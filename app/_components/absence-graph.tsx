"use client"
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function AbsenceGraph() {
  // Mock data
  const absenceData = [
    { name: 'Liz', count: 7 },
    { name: 'John', count: 5 },
    { name: 'Alice', count: 9 },
    { name: 'Frank', count: 6 },
  ];

  const data = {
    labels: absenceData.map((item) => item.name), // X-Axis = Names
    datasets: [
      {
        label: 'Faltas',
        data: absenceData.map((item) => item.count), // Y-Axis = Count
        borderColor: 'rgb(63, 63, 70)',
        backgroundColor: 'rgb(0, 187, 167)',
        tension: 0.4,
      },
    ],
  };

  const options: import('chart.js').ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Absences Overview',
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Bar data={data} options={options} />
    </div>
  );
}