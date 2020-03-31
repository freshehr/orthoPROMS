import environment from '../environment';

/**
 * The standard headers used for calls to the CDr, including the authorisation string
 * @type {{Authorization: *, "Ehr-Session-disabled": string, "Content-Type": string}}
 */
export const CDRHeaders = {
  'Ehr-Session-disabled': '{{Ehr-Session}}',
  'Content-Type': 'application/json',
  Authorization: environment.api_authorisation,
};

/**
 * Object containing headers and options to use with axios to run HTTP calls to the CDR
 * @type {{CDRHeaders: {Authorization: *, "Ehr-Session-disabled": string, "Content-Type": string},
 *     generateQueryOptions(*=): *, generateAxiosOptions(*): *}}
 */
const CDROptions = {
  generateGetAxiosOptions(url) {
    return {
      method: 'get',
      url: environment.api_url + url,
      headers: CDRHeaders,
    };
  },
  generatePostAxiosOptions(url, data) {
    return {
      method: 'post',
      url: environment.api_url + url,
      headers: CDRHeaders,
      data,
    };
  },
  generateQueryOptions(aql) {
    return {
      method: 'post',
      url: `${environment.api_url}/rest/v1/query`,
      headers: CDRHeaders,
      data: JSON.stringify({
        aql,
      }),
    };
  },
  CDRHeaders,
};

export default CDROptions;
