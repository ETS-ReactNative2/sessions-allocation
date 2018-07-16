import React, { Component } from 'react';
import classes from './App.css';
import {Route, withRouter, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from '../header/Header';
import Auth from '../forms/Auth/Auth';
import Examiners from '../views/Examiners/Examiners';
import Sessions from '../views/Sessions/Sessions';
import SingleExaminer from '../views/SingleExaminer/SingleExaminer';
import SingleSession from '../views/SingleSession/SingleSession';
import AddExaminers from '../forms/Examiners/Examiners';
import AddSessions from '../forms/Sessions/Sessions';
import Wrapper from '../../components/Misc/Wrapper/Wrapper';
import {loadExaminers} from '../../store/actions/examiners';
import {loadSessions} from '../../store/actions/sessions';
import {checkAuthState} from '../../store/actions/auth/auth';
import {Redirect} from 'react-router-dom';
import * as routes from '../../store/app-data/routes';

class App extends Component {
  componentDidMount(){
    this.props.loadExaminers();
    this.props.loadSessions();
    this.props.checkAuthState();
  }

  render() {
    // const {isAuthenticated} = this.props;
    return (
      <Wrapper>
        <Switch>
          <Route path={routes.LOGIN_PAGE} exact component={Auth} />
        </Switch>

        {true ? <Route path='/(.+)' render={() => (
          <div>
            <Header />
            <section className={classes.Section}>
              <Switch>
                <Route path={routes.ADD_EXAMINER} exact component={AddExaminers} />
                <Route path={routes.EDIT_EXAMINER} exact component={AddExaminers}/>
                <Route path={routes.EXAMINERS} exact component={Examiners} />
                <Route path={routes.SINGLE_EXAMINER_VIEW} exact component={SingleExaminer} />
                <Route path={routes.SESSIONS} exact component={Sessions} />
                <Route path={routes.ADD_SESSION} exact component={AddSessions} />
                <Route path={routes.EDIT_SESSION} exact component={AddSessions}/>
                <Route path={routes.SINGLE_SESSION_VIEW} exact component={SingleSession} />
              </Switch>
            </section>
          </div>
          )}
          />: <Redirect to={routes.LOGIN_PAGE} />}
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    sessions: state.sess.sessions,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    loadExaminers: () => dispatch(loadExaminers()),
    loadSessions: () => dispatch(loadSessions()),
    checkAuthState: () => dispatch(checkAuthState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
