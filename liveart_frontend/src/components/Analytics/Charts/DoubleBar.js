import { Bar } from "react-chartjs-2";
import '../AnalyticsPage.css';
require('dotenv').config();

function DoubleBarChart(props) {
    const options = {
        scales: {
            yAxes: [{
                id: 'A',
                type: 'linear',
                position: 'left',
                ticks: {
                    beginAtZero: true,
                    stepSize: 10
                }
            }]
        },
        maintainAspectRatio: false,
        plugins: {
            datalabels: {
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 0
                },
                textShadowColor: '#000f',
                textShadowBlur: 10
            },
            title: {
                display: true,
                text: 'Test',
            }
        },
    }

    let scaleA = 'A';
    let scaleB = 'A';
    if (props.hasSecondaryAxis) {
        options.scales.yAxes.push({
            id: 'B',
            type: 'linear',
            position: 'right',
            ticks: {
                beginAtZero: true,
                stepSize: 10
            }
        });
        scaleB = 'B';
    }
    
    
    const settings = {
        labels: props.data.labels,
        datasets: [
            {
                data: props.data.data1,
                label: props.label1,
                fill: false,
                lineTension: 0.1,
                backgroundColor: props.colours1,
                yAxisID: scaleA
            },
            {
                data: props.data.data2,
                label: props.label2,
                fill: false,
                lineTension: 0.1,
                backgroundColor: props.colours2,
                yAxisID: scaleB
            }
        ]
    };

    return(
        <div className={props.class}>
            <h5>{props.title}</h5>
            <Bar data={settings} options={options} />
        </div>
    );
}

export default DoubleBarChart;