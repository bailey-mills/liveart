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

    let hasData = false;
    for (let i = 0; i < props.data.data.length; i++) {
        if (props.data.data[i] > 0) {
            hasData = true;
            break;
        }
    }
    let chart = <Bar data={settings} options={options} />;
    let noData = <div class="no-data">No Data Available</div>
    let result = hasData ? chart : noData;

    return(
        <div className={props.class}>
            <h5>{props.title}</h5>
            {result}
        </div>
    );
}

export default BarChart;