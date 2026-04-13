"use client"
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useAbsencesData } from '../_hooks/get_absences';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function AbsenceGraph() {


  const {data: unFormatedAbsenceData, error, isPending} = useAbsencesData()

  if(error || isPending){
    return "Not a word my man"
  }


  const absenceData = unFormatedAbsenceData.map((ab) => {
    return{
      count: ab._count.player_name,
      name: ab.player_name
    }
  })

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
        position: "center",
      },
      title: {
        display: false,
        text: 'Absences Overview',
      },
    },
    onClick(event, elements, chart) {
      console.log(elements)
    },
  };

  return (
    <div className="w-full flex items-center justify-center h-150">
      <Bar data={data} options={options} />
    </div>
  );
}