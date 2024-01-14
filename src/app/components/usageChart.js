import React, {useEffect, useRef} from "react"
import Chart from "chart.js/auto"

export const LineChart = ({data}) => {
  const chartRef = useRef(null)

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d")

      new Chart(ctx, {
        type: "line",
        data: {
          labels: data.labels,
          datasets: [
            {
              label: "Line Chart Example",
              data: data.values,
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      })
    }
  }, [data])

  return (
    <div>
      <canvas ref={chartRef} width={400} height={200}></canvas>
    </div>
  )
}

export default LineChart
