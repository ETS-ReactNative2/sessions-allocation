import React from 'react';
import classes from '../Sessions.css';
import Notification from '../../../../components/Misc/Notification';
import * as notifications from '../../../../store/app-data/notifications';

export const renderTableContent = (sessions) => {
  console.log(sessions);
  if(sessions === null){
    return <Notification message={notifications.LOADING} />
  }
  
  else if(sessions.length === 0){
    return <Notification message={notifications.NO_RECORDS} />
  }

  else{
    return (
      sessions.map(session => (
        <tr className={classes.Row} key={session.name}>
          {/* {renderName(session)} */}
        </tr>
    )))
  }
}