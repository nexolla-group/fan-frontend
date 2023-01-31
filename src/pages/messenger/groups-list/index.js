import React from "react";
import "./stylez.css";
function GroupsList({ myGroups, setSelectedGroup }) {
  return (
    <div>
      <ul>
        {myGroups.map((item, index) => (
          <li
            key={index}
            onClick={() => setSelectedGroup(item)}
            className="listGroup"
          >
            {item?.groupDetails?.groupName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupsList;
