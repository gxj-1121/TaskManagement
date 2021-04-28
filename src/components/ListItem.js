import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined
} from "@ant-design/icons";
import {
  Badge, Card
} from "antd";
import React from "react";


export const ListItem = (props) => {
  return (
    <>
      {props.unDoneTasks.map((item, i) => (
        <Card
          size="small"
          title={item.title}
          style={{ display: "inline-block", width: 250 }}
          key={i}
          actions={[
            <span>
              <EditOutlined
                key="edit"
                onClick={()=>props.handleEdit(i)}
              />
            </span>,
            <span>
              <CheckCircleOutlined
                key="success"
                onClick={() => props.handleDone(i)}
              />
            </span>,
            <span>
              <CloseCircleOutlined
                key="remove"
                onClick={() => props.handleRemove(i)}
              />
            </span>,
          ]}
        >
          <div className="todo-status">
            <div className="todo-desc">{item.desc}</div>
            <div>开始时间： {item.startDate}</div>
            <div>结束时间： {item.endDate}</div>
            <div>
              <Badge
                status={props.data.type[item.kind || 0]}
                text={props.data.typeText[item.kind || 0]}
              ></Badge>
            </div>
          </div>
        </Card>
      ))}
    </>
  );
};

export default ListItem;
