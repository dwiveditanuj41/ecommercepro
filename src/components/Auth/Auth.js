import React from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader } from 'semantic-ui-react';
import { get } from 'lodash-es';
import { toast } from 'react-toastify';
import axios from 'axios';

import AuthContext from '../../contexts/AuthContext';
import getFirstAndLastName from '../../utils/getName';

class Auth extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  state = {
    verifyingAuth: true,
    authToken: null,
    user: null,
    userInfo: null,
    loadingUserInfo: null,
  };

  async componentDidMount() {
    try {
      
    } catch (error) {
      this.setState({ user: null, authToken: null });
    } finally {
      this.setState({ verifyingAuth: false });
    }
  }


  signUp = async (name, email, password) => {
    try {
      const {
        firstName: givenName,
        lastName: familyName,
      } = getFirstAndLastName(name);

      const username = email.toLowerCase();

       
    } catch (error) {
      const errorMessage = get(
        error,
        'message',
        'Something went wrong. Please try again',
      );
      toast.error(errorMessage);
    }
    return false;
  };

 
  signInWithEmailPassword = async (email, password) => {
    try {
      
    } catch (error) {
      const errorMessage = get(
        error,
        'message',
        'Something went wrong. Please try again',
      );
      toast.error(errorMessage);
      return false;
    }
  };

  fetchUserInfo = async () => {
    this.setState({
      loadingUserInfo: true,
    });
    const { user, authToken } = this.state;
    const api = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
      headers: {
        Authorization: authToken.jwtToken || authToken,
      },
    });

    const cognitoUserName = user.getSignInUserSession().getIdToken().payload[
      'cognito:username'
    ];

    try {
      const { data: userInfo } = await api.get(`/users/${cognitoUserName}`);
      this.setState({
        userInfo,
      });
    } catch (error) {
      const errorMessage = get(
        error,
        'response.data.message',
        'Something went wrong. Please try again',
      );
      toast.error(errorMessage);
      this.setState({ userInfo: null });
    } finally {
      this.setState({ loadingUserInfo: false });
    }
  };

  signOut = async () => {
    try {
     
    } catch (error) {
      const errorMessage = get(
        error,
        'message',
        'Something went wrong. Please try again',
      );
      toast.error(errorMessage);
    }
  };

 

  render() {
    const { authToken, user, verifyingAuth } = this.state;

    if (verifyingAuth) {
      return (
        <Dimmer active inverted>
          <Loader>Verifying User...</Loader>
        </Dimmer>
      );
    }

    return (
      <AuthContext.Provider
        value={{
          authToken,
          signUp: this.signUp,
          confirmSignUp: this.confirmSignUp,
          signInWithEmailPassword: this.signInWithEmailPassword,
          signInWithFacebook: this.signInWithFacebook,
          signInWithGoogle: this.signInWithGoogle,
          signOut: this.signOut,
          isUserRegistered: this.isUserRegistered,
          resendVerificationCode: this.resendVerificationCode,
          user,
          userInfo: this.state.userInfo,
          loadingUserInfo: this.state.loadingUserInfo,
          changePassword: this.changePassword,
          updateUserAndToken: this.updateUserAndToken,
          updateUserInfo: this.updateUserInfo,
          updateToken: this.updateToken,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default Auth;
