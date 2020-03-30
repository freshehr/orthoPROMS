import React, { Component } from 'react';
import Chart from 'chart.js';
import * as PropTypes from 'prop-types';

const graphReferences = {};
const colours = ['red', 'green', 'blue', 'orange', 'purple'];

Chart.defaults.global.defaultFontFamily = '\'PT Sans\', sans-serif';
Chart.defaults.global.legend.display = true;

/**
 * A generalized line chart - graphs based on categorical data at base (or for example time
 * values), equidistantly spaced, and continuous scale on y-axis. Takes: id string, labels array,
 * data array, title string, xLabel string, yLabel string
 */
class GeneralLineChart extends Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }

  componentDidMount() {
    this.buildChart(this.props.id);
  }

  componentDidUpdate() {
    this.buildChart(this.props.id);
  }

  optionHolder() {
    return {
      title: {
        display: true,
        text: this.props.title,
        fontSize: 22,
        fontFamily: 'Lucida',
        fontColor: '#000000',
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          fontColor: '#000',
        },
      },
      tooltips: {
        enabled: true,
        displayColors: true,
      },
      scales: {
        xAxes: [{
          gridLines: {
            display: false,
            drawBorder: true,
            drawOnChartArea: false,
          },
          scaleLabel: {
            display: true,
            labelString: this.props.xLabel,
          },
        }],
        yAxes: [{
          gridLines: {
            display: true,
            drawBorder: false,
            drawOnChartArea: true,
          },
          scaleLabel: {
            display: true,
            labelString: this.props.yLabel,
          },
          ticks: {
            padding: 15,
          },
        }],
      },
    };
  }

  buildChart(ref) {
    const myGeneralGraphRef = this.chartRef.current.getContext('2d');
    if (typeof graphReferences[ref] !== 'undefined') graphReferences[ref].destroy();
    const data = {};
    data.labels = this.props.labels; // this.props.time
    const colorIterator = colours.values();
    data.datasets = this.props.data.map((datasetData) => ({
      label: datasetData.label,
      data: datasetData.data,
      fill: false,
      borderColor: colorIterator.next().value,
      pointRadius: 4,
      borderWidth: 2,
    }));
    const options = this.optionHolder();
    graphReferences[ref] = new Chart(myGeneralGraphRef, {
      type: 'line',
      data,
      options,
    });
    if (this.props.linkList) {
      const linkMapping = this.props.linkList;
      this.chartRef.current.onclick = (evt) => {
        const activePoint = graphReferences[ref].getElementAtEvent(evt);
        if (activePoint.length > 0) {
          // eslint-disable-next-line no-underscore-dangle
          window.location = linkMapping[activePoint[0]._index];
        }
      };
      this.chartRef.current.onmousemove = (evt) => {
        const activePoint = graphReferences[ref].getElementAtEvent(evt);
        this.chartRef.current.style.cursor = activePoint.length > 0 ? 'pointer' : 'default';
      };
    }
  }

  render() {
    return (
      <div className="general">
        <canvas
          id={this.props.id}
          ref={this.chartRef}
        />
      </div>
    );
  }
}

GeneralLineChart.propTypes = {
  id: PropTypes.string,
  labels: PropTypes.arrayOf(PropTypes.string),
  data: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  xLabel: PropTypes.string,
  yLabel: PropTypes.string,
  linkList: PropTypes.arrayOf(PropTypes.string),
};

export default GeneralLineChart;
