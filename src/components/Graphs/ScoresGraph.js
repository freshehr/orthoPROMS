import React, { Component } from 'react'
import GeneralLineChart from "./GeneralLineChart";
import * as PropTypes from "prop-types";
import ReactPerformance from 'react-performance';

/**
 * Build a graph based on arrays of standard pain scores and an array of times
 */
export class ScoresGraph extends Component {
    render() {
        return (
            <GeneralLineChart id={"myScores"} labels={this.props.time} data={[
                {
                    label: "Pain Score",
                    data: this.props.pain,
                },
                {
                    label: "Limitations Score",
                    data: this.props.limit,
                },
                {
                    label: "Walking Score",
                    data: this.props.walking,
                },
                {
                    label: "Walking Surfaces Score",
                    data: this.props.surface,
                },
                {
                    label: "Total Score",
                    data: this.props.total,
                }
            ]} title={"Progress Scores"} xLabel={"Date/Time"} yLabel={"Scores"}
                              linkList={this.props.compId.map((compId) => '/Composition?compId=' + compId)}/>
        )
    }
}

ScoresGraph.propTypes = {
    id: PropTypes.string,
    pain: PropTypes.array,
    limit: PropTypes.array,
    walking: PropTypes.array,
    surface: PropTypes.array,
    total: PropTypes.array,
    time: PropTypes.array,
    xLabel: PropTypes.string,
    yLabel: PropTypes.string,
    title: PropTypes.string,
    units: PropTypes.string,
    compId: PropTypes.array
};

export default ReactPerformance.measure({
    isCollapsed: false,
    getId: 'scoresGraph',
    Component: ScoresGraph,
})

