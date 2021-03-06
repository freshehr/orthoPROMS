import React from 'react';
import * as PropTypes from 'prop-types';
import getIndirectOximetryAgainstTimeByEHRId
  from '../../../../cdr/getIndirectOximetryAgainstTimeByEHRId';
import { OxygenSaturationGraph } from './OxygenSaturationGraph';

/**
 * Container for oxygen saturation graph
 */
export default class OxygenSaturationGraphContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compIdArray: [],
      concentration: [],
      time: [],
    };
  }

  componentDidMount() {
    const promise = getIndirectOximetryAgainstTimeByEHRId(this.props.ehrId);
    promise.then((e) => {
      e.forEach((el) => {
        this.pushIntoArraysandCalculate(el);
      });
      this.setState({ indirectOximetry: e });
    });
  }

  pushIntoArraysandCalculate(props) {
    this.state.compIdArray.push(props.comp_id);
    const result = (props.numerator / props.denominator) * 100;
    this.state.concentration.push(result);
    this.state.time.push(props.time.replace(/T/, ' ')
      .substring(0, props.time.indexOf('.')) || props.time.replace(/T/, ' ')
      .substring(0, props.time.indexOf('Z')));
  }


  render() {
    if (!this.state.indirectOximetry) return null;
    if (this.state.indirectOximetry.length > 0) {
      return (
        <OxygenSaturationGraph
          compId={this.state.compIdArray}
          percent={this.state.concentration}
          time={this.state.time}
        />
      );
    }
    return <p>No oxygen concentration were recorded</p>;
  }
}

OxygenSaturationGraphContainer.propTypes = {
  ehrId: PropTypes.string,
};
