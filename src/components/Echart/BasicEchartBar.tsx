import { FunctionComponent } from 'react';
import ReactEcharts from 'echarts-for-react';

interface chartProps {
  category: string[];
  data: number[];
  average: number[];
}

const BasicEchart: FunctionComponent<chartProps> = ({ category, data, average}) => {

  const option = {
    xAxis: {
      type: 'category',
      data: category
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: data,
        type: 'bar',
      },
      {
        type: 'line',
        yAxis: 1,
        data: average
      }
    ]
  };

    return (
        <ReactEcharts
            style={{ height: '350px', width: '99.9%' }}
            option={{
                ...option
            }}
        />
    )
}

export default BasicEchart