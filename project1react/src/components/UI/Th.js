import React from 'react';
const Th = ({ title, inUse, inOrder, click }) => {
    const upClasses = ["fas", "fa-sort-up", "upArrow"];
    const downClasses = ["fas", "fa-sort-down", "downArrow"];
    if (inUse) {
        if (inOrder) {
            downClasses.push("arrow-inuse");
        } else {
            upClasses.push("arrow-inuse");
        }
    }
    return (
        <th className="sortable-th" onClick={click}>
            {title} <i className={upClasses.join(" ")}></i><i className={downClasses.join(" ")}></i>
        </th>
    );
}
export default Th;