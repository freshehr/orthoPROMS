import React from 'react';
import getAllEHRsInCDR from '../../components/Queries/getAllEHRsInCDR';
import GenderDistributionGraph from '../../components/Graphs/GenderDistributionGraph';
import { DownloadCSV } from '../../components/DownloadCSV';

function occurrence(array) {
  const result = {};
  if (array instanceof Array) {
    array.forEach((x, i) => {
      if (!result[x]) {
        result[x] = [i];
      } else {
        result[x].push(i);
      }
    });
  }
  return result;
}

export default class GenderDistribution extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      admin_genders: [],
      labels: ['Male', 'Female', 'Not Defined'],
    };
  }

  componentDidMount() {
    const promise = getAllEHRsInCDR();
    const genderList = [];
    promise.then((e) => {
      for (let i = 0; i < e.length; i += 1) {
        genderList[i] = e[i].gender;
      }
      this.setState({ genders: genderList });
    });
  }

  pushIntoArray(props) {
    this.state.admin_genders.push(props);
  }

  render() {
    if (!this.state.genders) {
      return null;
    }
    if (this.state.genders.length > 0) {
      const male = occurrence(this.state.genders).Male.length;
      const female = occurrence(this.state.genders).Female.length;
      const unknown = occurrence(this.state.genders)[''].length;
      this.pushIntoArray(male);
      this.pushIntoArray(female);
      this.pushIntoArray(unknown);
      return (
        <div>
          <>
            <GenderDistributionGraph
              title="Gender Distribution"
              genderDistribution={this.state.admin_genders}
              labels={this.state.labels}
            />
            <br />
            <br />
            <DownloadCSV
              array={[this.state.labels, this.state.admin_genders]}
              fileName="GenderDistribution.csv"
            />
          </>
        </div>
      );
    }
    return <p>No data obtained</p>;
  }
}
