import React from 'react';
import classes from '../Sessions.css';
import moment from 'moment';

export const renderDate = (session, handleLink) => {
  return  (
    <td>
     <span className={classes.LinkToSingleView} onClick={()=> handleLink(session)}>
       {moment([...session.session_date].join("-")).format('dddd Do MMMM')}
      </span>
    </td>
  )
}

export const renderTime = (session) => {
  return (
    <td>
      {session.time}
    </td>
  )
}

export const renderType = (session) => {
  return (
    <td>
      {session.type}
    </td>
  )
}

export const renderVenue = (session) => {
  return (
    <td>
      {session.venue}
    </td>
  )
}

export const renderLevels = (session) => {
  return (
    <td>
      {session.levels
        .map(level => {
          return <span key={level} className={classes.Icons}>{level}</span>
      })}
    </td>
  )
}

export const renderExaminers = (session) => {
  return (
    <td>
      {session.examiners && session.examiners.join(" + ")}
    </td>
  )
}

export const renderSupport = (session) => {
  return (
    <td>
      {session.support && session.support.join(" + ")}
    </td>
  )
}

export const renderStatus = (session) => {
  return (
    <td>
      <form className={classes.Radios}>
        <input type="radio" name="status" value="accept" /><span>accept</span>
        <input type="radio" name="status" value="reject" /><span>reject</span>
      </form>
    </td>
  )
}

export const renderBtns = (session, deleteHandler, editHandler) => {
  return(
    <td>
      <span className={classes.Btn} onClick={() => editHandler(session)}>edit</span>
      <span className={classes.Bar}> | </span>
      <span className={classes.Btn} onClick={() => deleteHandler(session)}>delete</span>
    </td>
  )
}