import * as axios from 'axios';
import CDROptions from './CDROptions';

export default async function getEHRIdByNHSNumber(subjectId) {
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
