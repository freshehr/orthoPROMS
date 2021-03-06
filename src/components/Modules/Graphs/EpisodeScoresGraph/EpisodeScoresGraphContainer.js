import React from 'react';
import * as PropTypes from 'prop-types';
import getAOFASScoresAgainstEpisodeByEHRId
  from '../../../../cdr/getAOFASScoresAgainstEpisodeByEHRId';
import { EpisodeScoresGraph } from './EpisodeScoresGraph';
import { DownloadCSV } from '../../DownloadCSV';

/**
 * Container for the episode scores graph
 */
export default class EpisodeScoresGraphContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preOp: [],
      oneWeekPostOp: [],
      sixWeeksPostOp: [],
      labels: ['Pain', 'Activity limitations and support requirements', 'Walking',
        'Walking surfaces'],
      isLoading: true,
    };
  }

  componentWillMount() {
    const promise = getAOFASScoresAgainstEpisodeByEHRId(this.props.ehrId);
    promise.then((e) => {
      this.pushIntoCategory(e);
      this.setState({
        episodeScores: e,
        isLoading: false,
      });
    });
  }

  pushIntoCategory(props) {
    props.forEach((prop) => {
      if (prop.episode_identifier === 'Pre-operative') {
        this.state.preOp.push(prop.pain);
        this.state.preOp.push(prop.limitations);
        this.state.preOp.push(prop.walking);
        this.state.preOp.push(prop.walking_surfaces);
      } else if (prop.episode_identifier === '1 week post-operative') {
        this.state.oneWeekPostOp.push(prop.pain);
        this.state.oneWeekPostOp.push(prop.limitations);
        this.state.oneWeekPostOp.push(prop.walking);
        this.state.oneWeekPostOp.push(prop.walking_surfaces);
      } else if (prop.episode_identifier === '6 weeks post-operative') {
        this.state.sixWeeksPostOp.push(prop.pain);
        this.state.sixWeeksPostOp.push(prop.limitations);
        this.state.sixWeeksPostOp.push(prop.walking);
        this.state.sixWeeksPostOp.push(prop.walking_surfaces);
      }
    });
  }

  render() {
    if (!this.state.episodeScores) return null;
    const { isLoading } = this.state;
    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (this.state.episodeScores.length > 0) {
      return (
        <>
          <EpisodeScoresGraph
            preOp={this.state.preOp}
            oneWeek={this.state.oneWeekPostOp}
            sixWeeks={this.state.sixWeeksPostOp}
            label={this.state.labels}
          />
          <br />
          <br />
          <DownloadCSV
            array={[this.state.labels, this.state.preOp, this.state.oneWeekPostOp,
              this.state.sixWeeksPostOp]}
            fileName="Episode_Scores.csv"
          />
        </>
      );
    }
    return <p>No scores were found</p>;
  }
}

EpisodeScoresGraphContainer.propTypes = {
  ehrId: PropTypes.string,
};
