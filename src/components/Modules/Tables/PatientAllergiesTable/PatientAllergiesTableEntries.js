import React from 'react';
import * as PropTypes from 'prop-types';
import getAllergiesListByEHRId from '../../../../cdr/getAllergiesListByEHRId';
import PatientAllergiesTableEntry from './PatientAllergiesTableEntry';
import { NHSTd, NHSTr } from '../../../react-styled-nhs/src/NHSTableWrapperTest';

/**
 * Get a table row to display when no allergies are found for a patient
 * @returns {*}
 * @constructor
 */
function PatientAllergiesTableEmptyError() {
  return (
    <NHSTr key="noAllergiesRow">
      <NHSTd
        key="noAllergiesData"
        colSpan="6"
      >
        No allergies records were found
      </NHSTd>
    </NHSTr>
  );
}

/**
 * Get individual entries list for allergies table
 */
export default class PatientAllergiesTableEntries extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    getAllergiesListByEHRId(this.props.ehrId)
      .then((e) => {
        this.setState({ allergies: e });
      });
    // TODO: deal with query error
  }

  render() {
    if (!this.state.allergies) return <PatientAllergiesTableEmptyError />;
    return this.state.allergies.map((e, index) => {
      e.index = index;
      return PatientAllergiesTableEntry(e);
    });
  }
}

PatientAllergiesTableEntries.propTypes = {
  ehrId: PropTypes.string,
};
