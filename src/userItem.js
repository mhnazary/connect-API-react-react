import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getuser, error, status, fetchuser } from './store/users/usersSlice';

function UserItem() {
  const dispatch = useDispatch();
  const user = useSelector(getuser);
  const isLoading = useSelector(status);
  const err = useSelector(error);

  useEffect(() => {
    dispatch(fetchuser());
  }, []);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (user.length !== 0) {
    content = user.map((user) => (
      <ul key={user.uuid}>
        <li>{user.gender}</li>
        <li>{user.name.first}</li>
        <li>{user.name.last}</li>
        <li>{user.email}</li>
      </ul>
    ));
  }
  if (err !== undefined) {
    content = err;
  }
  return (
    <div>
      <h3>User list</h3>
      {content}
    </div>
  );
}

export default UserItem;