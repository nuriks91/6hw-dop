import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUser, removeUser, createUsers } from '../../store/reducers/userReducer';
import classes from './userlist.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen, faSort } from '@fortawesome/free-solid-svg-icons';
import ModalWindow from '../ModalWindow/ModalWindow';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);
  const [isModalOpen, setModalOpen] = useState(false);

  const createUser = (user) => {
    dispatch(createUsers(user));
    setModalOpen(false);
  };

  const onDelete = (id) => {
    dispatch(removeUser(id));
  };

  const fetchData = async () => {
    try {
      await dispatch(fetchAllUser());
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  


  return (
    <div className={classes.container}>
      <div className={classes.list}>
        <h1>Students List</h1>
        <div className={classes.buton}>
        </div>
      </div>
      <FontAwesomeIcon className={classes.icon} icon={faSort} style={{ color: "orange" }} />

      {!isModalOpen && (
        <button className={classes.btn} onClick={() => setModalOpen(true)}>
          ADD NEW STUDENT
        </button>
      )}

      {isModalOpen && <ModalWindow onSubmit={createUser} />}

      <hr />

      {users && users.length > 0 && (
        <table className={classes.cnt}>
          <thead className={classes.cantainer}>
            <tr className={classes.nav}>
              <th className={classes.names}>Name</th>
              <th className={classes.names}>Email</th>
              <th className={classes.names}>Phone</th>
              <th className={classes.names}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className={classes.users}>
                <td className={classes.name}>{user.name}</td>
                <td className={classes.name}>{user.email}</td>
                <td className={classes.name}>{user.phone}</td>
                <td>
                  <FontAwesomeIcon className={classes.faPen} icon={faPen} style={{ color: 'yellow' }} />
                </td>
                <td>
                  <button className={classes.delete_button} onClick={() => onDelete(user.id)}>
                    <FontAwesomeIcon icon={faTrashCan} className={classes.delet} style={{ color: 'yellow' }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading && users.length === 0 && <p>Nobody on your list!!!</p>}
    </div>
  );
};

export default UserList;
