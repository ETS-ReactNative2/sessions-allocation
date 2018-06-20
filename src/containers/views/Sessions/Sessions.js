import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {renderTableContent, renderError} from './renders/';
import classes from './Sessions.css';
import Table from '../../../components/FormElements/Table/Table';
import {sessionTableHeaders} from '../../../store/app-data/table-headers';
import {constructPeriodState} from '../../../store/constructors/periods';
import * as actions from '../../../store/actions/sessions';

class Sessions extends Component{
  state = {
    period: constructPeriodState()
  }

  handleEdit = () => {

  }

  handleDelete = (id) => {
    this.props.deleteSession(id)
  }

  render(){
    return (
      <section className={classes.Sessions}>
        {renderError(this.props.errors)}
        <Table labels={sessionTableHeaders}>
          {renderTableContent(this.props.sessions, this.handleDelete, this.handleEdit)}
        </Table>
      </section>
    )
  }
}

const mapStateToProps = state => {
  return {
    sessions: state.sess.sessions,
    errors: state.sess.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteSession: (id) => dispatch(actions.deleteSession(id))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Sessions));