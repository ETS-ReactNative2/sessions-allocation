import * as check from './checks';
import moment from 'moment';

export const examinerCheck = ({examiners, session}) => {
    return examiners
      .filter(e => !e.roles.includes('Support staff'))
      .map(e => check.type(e, session.type.value))
      .map(e => check.levels(e, session.levels.value))
      .map(e => check.day(e, session.session_date.value, session.time.value))
      // .filter(e => checkOtherSessions(e, sessions))
      .map(e => check.isAvailable(e))
  }

export const sameDayCheck = ({sessions, sessionDate}) => {
  return sessions.filter(s => moment(s.session_date).isSame(sessionDate));
}

export const filterExaminers = ({examiners, filterValue}) => {
  const {length} = filterValue;
  return examiners
    .filter(e => e.roles.includes('Speaking Examiner'))
    .filter(e => e.name.substring(0, length).toLowerCase() === filterValue.toLowerCase());
}