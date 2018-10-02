import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getInputValue, updateState } from '../utility';
import { checkValidity } from '../../validation/validation';
import { Section } from '../../components/Wrappers';
import { AddNewBtn } from '../../components/Btns/';
import AsyncLoad from '../../components/AsyncLoad/AsyncLoad';
import SessionsTable from './components/SessionsTable/SessionsTable';
import SessionsForm from './components/SessionsForm/SessionsForm';
import constructSessionState from '../../store/constructors/sessions';
import * as actions from '../../store/actions/sessions/sessions';


class Sessions extends Component{
  state = {
    session: constructSessionState(),
    showForm: false,
    isConfirming: false,
    shouldValidate: false
  }

  handlers = {
    addAsyncForm: (value, type) => {
      this.setState((prev) => ({
        session: { ...prev.session, [type]: { ...prev.session[type], value: value }}
      }))
    },

    edit: (id) => {

    },

    prepareForEdit: (selected) => {

    },

    delete: (examiner) => {

    },

    expand: () => {
      this.setState((prev) => ({ extraLarge: prev.extraLarge ? false : true }))
    },

    submit: (event) => {

    },

    change: (event, type, id, index) => {
      const { session } = this.state;
      const value = getInputValue(event, type, index, [ ...session[id].value ]);
      const update = updateState(this.state, id, { value: value, id }, 'session');
      update.session[id].validation = checkValidity({ ...update.session[id] });
      this.setState(update);
    },

    openForm: () => {
      this.setState({ showForm: true });
    },

    closeForm: () => {
      this.setState({ showForm: false });
    },

    cancel: () => {
      this.handlers.closeForm();
      this.setState({ session: constructSessionState(), shouldValidate: false })
    },

    filter: ({ target: { value, id }}) => {
      this.props.filterSessions(value, id);
    },

    toggleConfirm: () => {
      this.setState((prev) => ({ isConfirming: prev.isConfirming ? false : true }));
    },

    validate: () => {
      this.setState((prev) => ({ ...prev.state, shouldValidate: true }))
    }
  }

  render(){  
    const { showForm, isConfirming, session, shouldValidate } = this.state;
    const { sessions, filteredSessions, venues } = this.props;

    return (
      <Section showForm={showForm}>
        <AsyncLoad waitFor={sessions}>
          <AddNewBtn showForm={showForm} openForm={this.handlers.openForm} label={'session'} />
          <SessionsTable 
            data={sessions} 
            filtered={filteredSessions} 
            handlers={this.handlers} 
            isConfirming={isConfirming} 
            venues={venues} />
          {showForm && 
            <SessionsForm 
              handlers={this.handlers} 
              values={session} 
              shouldValidate={shouldValidate} 
              selectedExaminer={null} 
              clearSelectedExaminer={null}
              venues={venues} />
          }
        </AsyncLoad>
      </Section>
    )
  }
}

const mapStateToProps = state => {
  return {
    sessions: state.sess.sessions,
    venues: state.venue.venues,
    filteredSessions: state.sess.filteredSessions,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    filterSessions: (value, filterBy) => dispatch(actions.filterSessionsByHeader(value, filterBy))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sessions));