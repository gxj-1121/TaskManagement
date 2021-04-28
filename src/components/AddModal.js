import {
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Space
} from "antd";
import React from 'react';

export const AddModal = (props) => {
  const { TextArea } = Input;
  const { Option } = Select;
  const dateFormat = "YYYY-MM-DD";

  return(
    <>
      <Modal
          visible={props.isAdd}
          title="新增Task"
          okText="确认"
          cancelText="取消"
          onOk={props.handleOk}
          onCancel={props.handleCancel}
        >
          <Form
            ref={props.formRef}
            layout="horizontal"
            name="form_in_modal"
            initialValues={{
              modifier: "public",
            }}
          >
            <Form.Item name="title" label="标题"
              rules={[
                {
                  required: true,
                  message: "Please input the title of collection!",
                },
              ]}
            >
              <Input
                placeholder="请输入todo标题"
                onChange={(e) => props.handleChange(e, "title")}
              />
            </Form.Item>

            <Form.Item name="startDate" label="开始时间">
              <Space direction="vertical" size={12}>
                <DatePicker
                  placeholder="年/月/日"
                  format={dateFormat}
                  disabledDate={props.disabledDate}
                  style={{ width: 402.5 }}
                  onChange={(e) => props.handleDateChange(e, "startDate")}
                />
              </Space>
            </Form.Item>

            <Form.Item name="endDate" label="结束时间">
              <Space direction="vertical" size={12}>
                <DatePicker
                  placeholder="年/月/日"
                  format={dateFormat}
                  disabledDate={props.disabledDate}
                  style={{ width: 402.5 }}
                  onChange={(e) => props.handleDateChange(e, "endDate")}
                />
              </Space>
            </Form.Item>

            <Form.Item name="type" label="计划类型">
              <Select
                style={{ width: 120 }}
                onChange={(e) => props.handleTypeChange(e, "kind")}
              >
                <Option value="0">每天</Option>
                <Option value="1">周次</Option>
                <Option value="2">月次</Option>
                <Option value="3">季度</Option>
              </Select>
            </Form.Item>

            <Form.Item name="description" label="描述">
              <TextArea
                rows={4}
                placeholder="请输入todo描述"
                onChange={(e) => props.handleChange(e, "desc")}
              />
            </Form.Item>
          </Form>
        </Modal>
    </>
  )
}

export default AddModal