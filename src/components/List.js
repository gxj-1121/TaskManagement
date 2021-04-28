import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import ListItem from "./ListItem";

export const List = (props) => {
  return (
    <>
      <div className="content-left left">
        
        <ListItem {...props}/>

        {/* 新增Task按钮 */}
        <div className="add-btn" onClick={props.showModal}>
          <PlusOutlined />
        </div>
        
      </div>
    </>
  );
};

export default List;
