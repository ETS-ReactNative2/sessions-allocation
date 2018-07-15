import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {renderTableContent, renderError, renderFormPeriod} from './renders/';
import classes from './Sessions.css';
import Table from '../../../components/FormElements/Table/Table';
import {sessionTableHeaders} from '../../../store/app-data/table-headers';
import {constructPeriodState} from '../../../store/constructors/periods';
import {formatURL, formatDateURLPretty} from '../../../gen-utility';
import * as actions from '../../../store/actions/sessions';
import {handlePeriodSelect} from '../../../store/actions/periods';
import {getSelectedOptions} from '../../forms/form-utility';

class Sessions extends Component{
  state = {
    period: constructPeriodState()
  }

  componentDidMount(){
    this.props.deActivateSelectedSession();
  }

  handleEdit = (session) => {
    const url = '/sessions/edit/' + formatURL(session.venue) + '-' + formatDateURLPretty([...session.session_date])
    this.props.fetchSession(session);
    this.props.history.push(url);
  }

  handleDelete = (session) => {
    const {sessions, deleteSession, token} = this.props;
    const updated = [...sessions.filter(s => s.id !== session.id)];
    deleteSession(updated, session, token);
  }

  periodHandler = (event) => {
    const {sessions} = this.props;
    const value = getSelectedOptions(event);
    this.props.handlePeriodSelect(sessions, value);
  }

  handleLink = (session) => {
    this.props.fetchSession(session);
    this.props.history.push('/sessions/' + formatURL(session.venue) + '-' + formatDateURLPretty([...session.session_date]));
  }

  handlersObj = () => {
    return {
      linkHandler: this.handleLink
    }
  }


  render(){
    const {errors, sessionsByPeriod} = this.props;
    return (
      <section className={classes.Sessions}>
        {renderError(errors)}
        {renderFormPeriod(this.state, this.periodHandler, this.props)}
        <Table labels={sessionTableHeaders}>
          {renderTableContent(sessionsByPeriod, this.handleDelete, this.handleEdit, this.handleLink)}
        </Table>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    sessions: state.sess.sessions,
    errors: state.sess.error,
    periods: state.per.periods,
    currentPeriod: state.per.current,
    sessionsByPeriod: state.per.sessionsByPeriod,
    token: state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteSession: (sessions, session, token) => dispatch(actions.deleteSession(sessions, session, token)),
    fetchSession: (id) => dispatch(actions.fetchSession(id)),
    deActivateSelectedSession: () => dispatch(actions.deActivateSelectedSession()),
    handlePeriodSelect: (sessions, period) => dispatch(handlePeriodSelect(sessions, period))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sessions));