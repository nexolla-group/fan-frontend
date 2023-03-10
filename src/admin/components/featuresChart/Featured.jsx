import React from "react";
import "./featured.scss";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

import { kFormatter } from "../../../helpers";
import Congratulations from "../../../pages/userHome/congratulationsGoalReached/Congratulations";

const Featured = ({ group }) => {
  const totalPercentage = group?._id
    ? ((group.targetReached * 100) / group.target).toFixed(2)
    : 0;
  return (
    <div className='featured'>
      {totalPercentage >= 100 && <Congratulations group={group} />}
      <div className='top'>
        <h1 className='title fw-bold'>{group?._id && group.groupName}</h1>
      </div>
      <div className='bottom'>
        <div className='featuredChart'>
          <CircularProgressbarWithChildren
            value={
              group?._id
                ? ((group.targetReached * 100) / group.target).toFixed(2)
                : 0
            }
            strokeWidth={6}
          >
            <div style={{ fontSize: 16, marginTop: -5 }}>
              <strong>
                {group?._id &&
                  `${((group.targetReached * 100) / group.target).toFixed(
                    2
                  )} %`}
              </strong>
            </div>
          </CircularProgressbarWithChildren>
        </div>
        <p className='title'>Total Contributions made</p>
        <p className='amount'>
          {group?._id && `${group.targetReached}`} {""} Rwf
        </p>
        <p className='description'>{group?._id && group.description}</p>
        {group?._id && (
          <div className='summary'>
            <div className='item'>
              <div className='itemTitle'>Target</div>
              <div className='itemResult positive'>
                <KeyboardArrowDownOutlinedIcon fontSize='small' />
                <div className='resultAmount'>
                  {kFormatter(group.target)} {""} Rwf
                </div>
              </div>
            </div>
            <div className='item'>
              <div className='itemTitle'>balance</div>
              <div
                className={`itemResult ${
                  group.targetReached >= group.target ? "positive" : "negative"
                } `}
              >
                <KeyboardArrowUpOutlinedIcon fontSize='small' />
                <div className='resultAmount'>
                  {kFormatter(group.targetReached)}
                  {""} Rwf
                </div>
              </div>
            </div>
            <div className='item'>
              <div className='itemTitle'>
                {group.target - group.targetReached > 0 ? "Remaining" : "Extra"}
              </div>
              <div className='itemResult positive'>
                <KeyboardArrowUpOutlinedIcon fontSize='small' />
                <div className='resultAmount'>
                  {kFormatter(
                    group.target - group.targetReached > 0
                      ? group.target - group.targetReached
                      : group.targetReached - group.target
                  )}
                  {""} Rwf
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Featured;
