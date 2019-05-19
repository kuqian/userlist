import React from 'react';
const User = ({firstName, lastName, sex, age, deleteUser, editUser}) => {
    return (
        <tr>
            <td><button className="edit-btn" onClick={editUser}><i className="fas fa-pencil-alt"></i> Edit</button></td>
            <td><button className="delete-btn" onClick={deleteUser}><i className="far fa-trash-alt"></i> Delete</button></td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{sex}</td>
            <td>{age}</td>
        </tr>
    );
}
export default User;