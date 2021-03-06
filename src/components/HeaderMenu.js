import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { GoogleLogout } from 'react-google-login';
import * as PropTypes from 'prop-types';
import { logout } from '../actions/authActions';
import {
  NHSAppLogo, NHSHeader, NHSHeaderContainer,
  NHSHeaderContent,
  NHSHeaderMenu, NHSHeaderMenuToggle,
  NHSHeaderNavigation,
  NHSNav,
  NHSNavLink,
  NHSWidthContainer,
} from './react-styled-nhs/src/NHSHeader';
import { NHSVectorChevronRight } from './react-styled-nhs/src/NHSIcons';

/**
 * Header menu for each page
 */
class HeaderMenu extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = () => {
      this.props.logout();
      window.location.href = '/';
    };
    this.handleLogin = (e) => {
      e.preventDefault();

      if (window.localStorage.getItem('id') === '1') {
        window.location.href = '/Patient';
      }

      if (window.localStorage.getItem('id') === '2') {
        window.location.href = '/Clinician';
      }
    };
    this.onChange = (e) => {
      // this.setState({[e.target.name]: e.target.value})
      this.props.handleSearch(e.target.value);
    };
    this.handleIPROMS = () => {
      // TODO: long term replace this confirm
      // eslint-disable-next-line no-alert
      if (window.confirm('Exiting to the home page will log you out, are you sure you want to leave？')) {
        this.handleClick();
      }
    };
  }

  render() {
    const navigation = this.props.navigationDisabled ? null
      : (
        <NHSHeaderNavigation>
          <NHSWidthContainer>
            <NHSHeaderMenu />
            <NHSNav>
              {/* TODO: improve this component to add a key event for accessibility */}
              {/* eslint-disable-next-line max-len */}
              {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events */}
              <li
                className="nhsuk-header__navigation-item"
                onClick={this.handleLogin}
                style={{ cursor: 'pointer' }}
              >
                <span className="nhsuk-header__navigation-link">
                  Home
                  <NHSVectorChevronRight />
                </span>
              </li>
              <NHSNavLink href="/About">About</NHSNavLink>
              <NHSNavLink href="/NationalStatistics">National Statistics</NHSNavLink>
            </NHSNav>
          </NHSWidthContainer>
        </NHSHeaderNavigation>
      );
    const headerContent = this.props.searchDisabled && this.props.navigationDisabled ? null
      : (
        <NHSHeaderContent>
          <NHSHeaderMenuToggle />
        </NHSHeaderContent>
      );
    return (
      <NHSHeader>
        <NHSHeaderContainer>
          <NHSAppLogo
            smaller={this.props.navigationDisabled}
          >
            orthoPROMS
          </NHSAppLogo>
          {headerContent}
          <Form
            inline
            style={{ float: 'right' }}
          >
            <Button
              variant="outline-primary"
              className={((this.props.isAuthenticated) && (!this.props.isGoogleLogin)) ? 'd-block'
                : 'd-none'}
              onClick={this.handleClick}
            >
              logout
            </Button>
            <GoogleLogout
              clientId="1026232614474-9uipnerkha7t6vqo8rsetj2q8ffk5fg4.apps.googleusercontent.com"
              buttonText="Logout"
              onLogoutSuccess={this.handleClick}
              className={((this.props.isAuthenticated) && (this.props.isGoogleLogin))
                ? 'd-inline-flex'
                : 'd-none'}
            />
          </Form>
        </NHSHeaderContainer>
        {navigation}
      </NHSHeader>
    );
  }
}

HeaderMenu.propTypes = {
  navigationDisabled: PropTypes.bool,
  logout: PropTypes.func,
  handleSearch: PropTypes.func,
  searchDisabled: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  isGoogleLogin: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isGoogleLogin: state.auth.isGoogleLogin,
});

export default connect(mapStateToProps, { logout })(HeaderMenu);
