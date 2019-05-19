import React from 'react';
const User = ({firstName, lastName, sex, age}) => {
    return (
        <tr>
            <td><button className="edit-btn"><i className="fas fa-pencil-alt"></i> Edit</button></td>
            <td><button className="delete-btn"><i className="far fa-trash-alt"></i> Delete</button></td>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{sex}</td>
            <td>{age}</td>
        </tr>
    );
}
export default User;