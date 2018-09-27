import React from 'react';
import classes from '../../Venues.css';
import Table from '../../../../components/Tables/Table/Table';
import DeleteBtn from '../../../../components/Btns/DeleteBtn/DeleteBtn';
import EditBtn from '../../../../components/Btns/EditBtn/EditBtn';

const VenuesTable = ({ data, handlers, isConfirming }) => {
  return (
    <div className={classes.Box}>
      <Table labels={['name', 'contact', 'type', 'phone', null]}>
        {data.map(v => (
          <tr className={classes.Row} key={v.name}>
            <td>
              {v.name}
              <span className={classes.Address}>{v.address}</span>
            </td>
            <td>{v.contact}</td>
            <td>{v.type.join(" | ")}</td>
            <td>{v.phone !== '' ? '+34( ' + v.phone + ')' : '-' }</td>
            <td>
              <EditBtn handler={handlers.editVenueHandler} id={v.id} />
              <span> | </span>
              <DeleteBtn handlers={handlers} data={v} isConfirming={isConfirming} />
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default VenuesTable;
