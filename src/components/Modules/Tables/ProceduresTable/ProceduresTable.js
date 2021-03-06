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
import ProceduresTableEntries from './ProceduresTableEntries';

/**
 * Table listing procedures relevant to a particular patient
 * @param props
 * @returns {null|*}
 * @constructor
 */
export default function ProceduresTable(props) {
  if (props.ehrId) {
    return (
      <NHSTableWrapper>
        <NHSTable>
          <NHSTHead>
            <NHSTr key={`proceduresno${props.index}`}>
              <NHSTh key={`proceduresno${props.index}procedure_name`}>Procedure</NHSTh>
              <NHSTh
                key={`proceduresno${props.index}notes`}
              >
                Notes
              </NHSTh>
              <NHSTh
                key={`proceduresno${props.index}careflow_step`}
              >
                Careflow Step
              </NHSTh>
              <NHSTh
                key={`proceduresno${props.index}time`}
              >
                Time
              </NHSTh>
              <NHSTh
                key={`proceduresno${props.index}name`}
              >
                Composer Name
              </NHSTh>
            </NHSTr>
          </NHSTHead>
          <NHSTBody>
            <ProceduresTableEntries
              key="procedures"
              ehrId={props.ehrId}
            />
          </NHSTBody>
        </NHSTable>
      </NHSTableWrapper>
    );
  }
  return null;
}

ProceduresTable.propTypes = {
  index: PropTypes.number,
  ehrId: PropTypes.string,
};
