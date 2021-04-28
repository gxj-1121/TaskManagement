import {
  BellFilled
} from "@ant-design/icons";
import {
  Badge
} from "antd";
import React from "react";
import { formatBt } from "../utils/tool";


export const Head = (props) => {
  return (
    <>
      <div className="logo">Notepad++</div>
      <div className="hd-right right">
        <Badge count={props.failNum} dot>
          <BellFilled style={{ marginRight: "10px" }} />
        </Badge>
        <div className="volumn">
          已用<span>{formatBt(props.curCapacity)}</span>,总容量
          <span>{formatBt(props.capacity)}</span>
        </div>
      </div>
    </>
  );
};

export default Head;
