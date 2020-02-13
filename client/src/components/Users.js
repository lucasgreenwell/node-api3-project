import React from 'react';
import {Link} from 'react-router-dom'

function Users(props) {
    return (
        <div>
            {props.users.map(user => {
            // console.log(user)
          return <Link to={`/users/${user.id}`}>
            <div>Username: {user.name}</div>
          </Link>
        })}
        </div>
    );
}

export default Users;