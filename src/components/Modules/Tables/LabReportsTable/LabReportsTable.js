import * as PropTypes from 'prop-types';
import React from 'react';
import {
  NHSTable,
  NHSTableWrapper,
  NHSTBody,
  NHSTh,
  NHSTHead,
  NHSTr,
} from '../../../react-styled-nhs/src/NHSTableWrapperTest';
import LabReportsTableEntries from './LabReportsTableEntries';

/**
 * Table listing lab reports relevant to a particular patient
 * @param props
 * @returns {null|*}
 * @constructor
 */
export default function LabReportsTable(props) {
  if (props.ehrId) {
    return (
      <NHSTableWrapper>
        <NHSTable>
          <NHSTHead>
            <NHSTr key={`reportsno${props.index}`}>
              <NHSTh
                key={`reportsno${props.index}test`}
                style={{ width: '8px' }}
              >
                Tests
              </NHSTh>
              <NHSTh
                key={`reportsno${props.index}comment`}
              >
                Comment
              </NHSTh>
              <NHSTh
                key={`reportsno${props.index}conclusion`}
              >
                Conclusion
              </NHSTh>
              <NHSTh
                key={`reportsno${props.index}test_timestamp`}
              >
                Time
              </NHSTh>
              <NHSTh
                key={`reportsno${props.index}composer`}
              >
                Composer Name
              </NHSTh>
            </NHSTr>
          </NHSTHead>
          <NHSTBody>
            <LabReportsTableEntries
              key="reports"
              ehrId={props.ehrId}
            />
          </NHSTBody>
        </NHSTable>
      </NHSTableWrapper>
    );
  }
  return null;
}

LabReportsTable.propTypes = {
  index: PropTypes.number,
  ehrId: PropTypes.string,
};
