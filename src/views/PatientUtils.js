import qs from 'qs';
import * as axios from 'axios';
import CDROptions from '../cdr/CDROptions';

export async function getEHRId(subjectId) {
  let processedResult = '';
  const options = CDROptions.generateGetAxiosOptions(`/rest/v1/ehr/?subjectId=${subjectId}&subjectNamespace=uk.nhs.nhs_number`);
  // TODO: improve handling of http response
  try {
    const response = await axios(options);
    const result = response.data;
    processedResult = result.ehrId;
  } catch (error) {
    throw new Error(error);
  }
  return processedResult;
}

// TODO: improve default functionality if none found
export function getSubjectId(locationSearch) {
  return qs.parse(locationSearch, { ignoreQueryPrefix: true }).subjectId
    ? qs.parse(locationSearch, { ignoreQueryPrefix: true }).subjectId : '9999999000';
}

export function loadEhrId(subjectId) {
  const promise = getEHRId(subjectId);
  promise.then((e) => {
    this.setState({ ehrId: e });
  });
}
