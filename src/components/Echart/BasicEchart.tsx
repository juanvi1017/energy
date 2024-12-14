import { FunctionComponent } from 'react';
import ReactEcharts from 'echarts-for-react';

interface chartProps {
  category: string[];
  data: number[];
}

const BasicEchart: FunctionComponent<chartProps> = ({ category, data}) => {

   const option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: category
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: data,
            type: 'line',
            areaStyle: {}
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