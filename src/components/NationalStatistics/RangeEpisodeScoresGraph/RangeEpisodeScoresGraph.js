import React from 'react';
import * as PropTypes from 'prop-types';
import ReactPerformance from 'react-performance';
import RadarGraph from '../../Modules/Graphs/AbstractGraphs/RadarGraph';

/**
 * Build a graph based on the national average scores range categorically and its values
 * @param props
 * @returns {*}
 * @constructor
 */
export function RangeEpisodeScoresGraph(props) {
  return (
    <RadarGraph
      id="myAverageScoresRange"
      labels={props.label}
      data={
        [
          {
            label: 'Pre-Operation',
            data: props.preOp,
          },
          {
            label: 'One Week Post-Operation',
            data: props.oneWeek,
          },
          {
            label: 'Six Weeks Post-Operation',
            data: props.sixWeeks,
          },
        ]
      }
      title="Average Scores Range"
    />
  );
}

RangeEpisodeScoresGraph.propTypes = {
  label: PropTypes.arrayOf(PropTypes.string),
  preOp: PropTypes.arrayOf(PropTypes.number),
  oneWeek: PropTypes.arrayOf(PropTypes.number),
  sixWeeks: PropTypes.arrayOf(PropTypes.number),
};

export default ReactPerformance.measure({
  isCollapsed: false,
  getId: 'averageScoresRange',
  Component: RangeEpisodeScoresGraph,
});
