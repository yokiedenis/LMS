import { Bar } from "react-chartjs-2";

type CompletionData = {
  moduleName: string;
  completionRate: number;
};

interface CompletionChartProps {
  completionData: CompletionData[];
}

const CompletionChart: React.FC<CompletionChartProps> = ({ completionData }) => {
  const labels = completionData.map((item) => item.moduleName);
  const data = {
    labels,
    datasets: [
      {
        label: "Completion Rate (%)",
        data: completionData.map((item) => item.completionRate),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={data} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />;
};

export default CompletionChart;
