/**
 * @file Doughnut.js - The source code of the Doughnut chart component
 * @author Bailey Mills
 * 
 */
import { Doughnut } from "react-chartjs-2";
import '../AnalyticsPage.css';
require('dotenv').config();

function DoughnutChart(props) {
    const options={
        legend: { display: true, position: "bottom" },
        maintainAspectRatio: false,
        plugins: {
            datalabels: {
                color: '#fff',
                font: {
                    weight: 'bold',
                    size: 0
                },
                textShadowColor: '#000F',
                textShadowBlur: 4
            }
        },
        tooltips: {
            callbacks: {
                label: function(tooltipItem, data) {
                    var dataset = data.datasets[tooltipItem.datasetIndex];
                    var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                    var total = meta.total;
                    var currentValue = dataset.data[tooltipItem.index];
                    var percentage = parseFloat((currentValue/total*100).toFixed(1));
                    return currentValue + ' (' + percentage + '%)';
                },
                title: function(tooltipItem, data) {
                    return data.labels[tooltipItem[0].index];
                }
            }
        }
    };

    const settings = {
        labels: props.data.labels,
        datasets: [
            {
                data: props.data.data,
                backgroundColor: props.colours,
                hoverBackgroundColor: props.colours,
            }
        ]
    };

    let chart = <Doughnut data={settings} options={options}/>;
    let noData = <div class="no-data">No Data Available</div>
    let result = props.data.data.length ? chart : noData;

    return(
        <div className={props.class}>
            <h5>{props.title}</h5>
            {result}
        </div>
    );
}

export default DoughnutChart;