import React from 'react';
import NHSContainer from '../components/react-styled-nhs/src/NHSContainer';
import NHSWrapper from '../components/react-styled-nhs/src/NHSWrapper';
import {
  NHSPanelBody,
  NHSPanelTitle,
  NHSPanelWithLabel,
} from '../components/react-styled-nhs/src/NHSPanel';
import { NHSVectorArrowRightCircle } from '../components/react-styled-nhs/src/NHSIcons';
import NHSFooter from '../components/react-styled-nhs/src/NHSFooter';

/**
 * Static page showing the home page with login options
 * @returns {*}
 * @constructor
 */
function Home() {
  return (
    <div style={{ backgroundColor: '#f0f4f5' }}>
      <div style={{
        height: '60vh',
        backgroundPosition: 'center top',
        backgroundSize: '100%',
        textAlign: 'center !important',
      }}
      >
        <div style={{
          justifyContent: 'center',
          paddingTop: '12%',
        }}
        >
          <div style={{ paddingLeft: '40%' }}>
            <h1 style={{
              fontFamily: 'Frutiger W01, Arial, Sans-serif',
              fontWeight: '700',
              fontSize: '5.5em',
            }}
            >
              IPROMS
            </h1>
          </div>
        </div>
      </div>
      <NHSContainer>
        {' '}
        <NHSWrapper style={{ paddingTop: '8px' }}>
          <div className="nhsuk-grid-row">
            <div className="nhsuk-grid-column-one-half">
              <NHSPanelWithLabel>
                {' '}
                <NHSPanelTitle
                  className="nhsuk-panel-with-label__label"
                >
                  {' '}
                  Patient
                </NHSPanelTitle>
                {' '}
                <NHSPanelBody>
                  <div className="nhsuk-u-reading-width">
                    <p>Login using your patient&apos;s account</p>
                  </div>
                  <div className="nhsuk-action-link">
                    <a
                      className="nhsuk-action-link__link"
                      href="/Login?id=1"
                    >
                      <NHSVectorArrowRightCircle />
                      <span className="nhsuk-action-link__text">Login as Patient</span>
                    </a>
                  </div>
                </NHSPanelBody>
              </NHSPanelWithLabel>
            </div>
            <div className="nhsuk-grid-column-one-half">
              <NHSPanelWithLabel>
                <NHSPanelTitle
                  className="nhsuk-panel-with-label__label"
                >
                  Clinician
                </NHSPanelTitle>
                <NHSPanelBody>
                  <div className="nhsuk-u-reading-width">
                    <p>Login using your clinician&apos;s account</p>
                  </div>
                  <div className="nhsuk-action-link">
                    <a
                      className="nhsuk-action-link__link"
                      href="/Login?id=2"
                    >
                      <NHSVectorArrowRightCircle />
                      {' '}
                      <span className="nhsuk-action-link__text">Login as Clinician</span>
                    </a>
                  </div>
                </NHSPanelBody>
                {' '}

              </NHSPanelWithLabel>
            </div>
          </div>
        </NHSWrapper>
        {' '}

      </NHSContainer>
      {' '}
      <NHSFooter />
    </div>
  );
}

export default Home;
