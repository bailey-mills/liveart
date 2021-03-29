import { useState, useEffect } from "react";
import { getData } from "../AnalyticsPage";
import { Bar } from "react-chartjs-2"
import axios from "axios";
require('dotenv').config();

function Age() {
    const [isLoading, setLoading] = useState(true);
    const [chartSettings, setChartSettings] = useState();

    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    stepSize: 1
                }
            }]
        }
    }

    useEffect(() => {
        axios.get(process.env.REACT_APP_SERVER + '/analytics/artist/age').then(res => {
            setLoading(false);
            
            const settings = {
                labels: res.data.labels,
                datasets: [
                    {
                        data: res.data.data,
                        label: 'Age',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(75,192,192,0.4)',
                        borderColor: 'rgba(75,192,192,1)',
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: 'rgba(75,192,192,1)',
                        pointBackgroundColor: '#fff',
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                        pointHoverBorderColor: 'rgba(220,220,220,1)',
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10
                    }
                ]
            };
            setChartSettings(settings);
        });
    }, []);

    if (isLoading) {
        return <div className="Age">Loading...</div>;
    }

    return(
        <div className="Age">
            <h2>Age Demographics</h2>
            <Bar data={chartSettings} options={options} />
        </div>
    );
}

export default Age;