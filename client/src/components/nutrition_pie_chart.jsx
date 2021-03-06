import React from "react";
import Chart from "chart.js";

class NutritionPieChart extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");
    // const data = [25, 25, 50];
    const data = [this.props.fat, this.props.carb, this.props.protein];
    new Chart(myChartRef, {
      type: "pie",
      data: {
        labels: ["Carbs", "Proteins", "Fats"],
        datasets: [
          {
            label: "Macronutrients",
            data,
            backgroundColor: ["rgba(255, 240, 124, 1)", "rgba(0, 74, 3, 0.7)", "#57A8A3"]
          }
        ]
      },
      options: {
        responsive: true,
        legend: {
          position: "right",
          labels: {
            usePointStyle: true
          }
        }
      }
    });
  }

  render() {
    return <canvas id="myChart" ref={this.chartRef} />;
  }
}

export default NutritionPieChart;
