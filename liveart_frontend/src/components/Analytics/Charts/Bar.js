import { Bar } from "react-chartjs-2"
import '../AnalyticsPage.css';
require('dotenv').config();

function BarChart(props) {
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                }
            }]
        },
        maintainAspectRatio: false,
        plugins: {
            datalabels: {
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 14
                },
                textShadowColor: '#000F',
                textShadowBlur: 4
            }
        },
    }
            
    const settings = {
        labels: props.data.labels,
        datasets: [
            {
                data: props.data.data,
                label: props.label,
                fill: false,
                lineTension: 0.1,
                backgroundColor: '#3280e6',
            }
        ]
    };

    return(
        <div className={props.class}>
            <Bar data={settings} options={options} />
        </div>
    );
}

export default BarChart;