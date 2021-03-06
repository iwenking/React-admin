import React, { Component } from 'react';
import { Card, Button } from 'antd'
import ReactEcharts from 'echarts-for-react';

class bar extends Component {
    state = {
        sales: [5, 20, 36, 10, 10, 20]
    }

    update = () => {
        this.setState(state => ({
            sales: state.sales.map(sale => sale + 1)
        }))
    }

    getOption = (sales) => {
        return {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: sales
            }]
        }
    }

    render() {
        const { sales } = this.state
        return (
            <div>
                <Card>
                    <Button type='primary' onClick={this.update}>更新</Button>
                </Card>
                <Card title='柱状图一'>
                    <ReactEcharts option={this.getOption(sales)} />
                </Card>
            </div>
        );
    }
}

export default bar;