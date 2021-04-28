import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  FrownTwoTone,
  SmileTwoTone
} from "@ant-design/icons";
import {
  Card,
  Empty,
  Progress
} from "antd";
import React from "react";

export const Status = (props) => {
  return (
    <div className="content-right right">
      <Card
        size="small"
        title="执行率"
        style={{ width: "100%", marginBottom: "16px" }}
      >
        <Progress percent={props.effectRate} themeColor="#06c" width={150} />
      </Card>

      <Card
        size="small"
        title={
          <span>
            <SmileTwoTone style={{ marginRight: "3px" }} />
            已完成
          </span>
        }
        style={{ width: "100%", marginBottom: "16px" }}
      >
        {props.hasDoneNum ? (
          props.hasDoneTasks.map((item, i) => (
            <div className="status-list-item" key={i}>
              <CheckCircleTwoTone
                twoToneColor="#52c41a"
                style={{ fontSize: "12px", paddingRight: "5px" }}
              />
              {item.title}
            </div>
          ))
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Card>

      <Card
        size="small"
        title={
          <span>
            <FrownTwoTone style={{ marginRight: "3px" }} />
            已失败
          </span>
        }
        style={{ width: "100%", marginBottom: "16px" }}
      >
        {props.hasFailNum ? (
          props.hasDoneTasks.map((item, i) => (
            <div className="" key={i}>
              <CloseCircleTwoTone
                twoToneColor="red"
                style={{ fontSize: "12px", paddingRight: "5px" }}
              />
              {item.title}
            </div>
          ))
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )}
      </Card>
    </div>
  );
};

export default Status;
