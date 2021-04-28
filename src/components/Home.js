import {
  Layout,
  message
} from "antd";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";
import {
  addTask,
  delFailTask,
  delTask,
  doneTask,
  editTask
} from "../actions/task";
import AddModal from "./AddModal";
import EditModal from "./EditModal";
import Head from "./Head";
import "./Home.css";
import List from "./List";
import Status from "./Status";

const { Header, Content } = Layout;

const mapStateToProps = (state, ownProps) => {
  let {
    capacity,
    curCapacity,
    hasDoneTasks,
    hasFailTasks,
    unDoneTasks,
  } = state;
  return {
    capacity,
    curCapacity,
    hasDoneTasks,
    hasFailTasks,
    unDoneTasks,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addTask(data, cb) {
      dispatch(addTask(data, cb));
    },
    editTask(data, cb) {
      dispatch(editTask(data, cb));
    },
    doneTask(data, cb) {
      dispatch(doneTask(data, cb));
    },
    delTask(data, cb) {
      dispatch(delTask(data, cb));
    },
    delFailTask(data, cb) {
      dispatch(delFailTask(data, cb));
    },
  };
};
class Home extends React.Component {

  state = {
    curTask: {},
    failNum: 0, 
    isAdd:false,  //新增表单
    isEdit: false,  //编辑表单
  };

  data = {
    type: ["error", "warning", "processing", "success"],
    typeText: ["每天", "周次", "月次", "季度"],
    task: {},
  };

  formRef = React.createRef();

  //每10分钟检测task是否到期
  componentDidMount() {
    this.props.unDoneTasks.forEach((item, i) => {
      let now = new Date(),
        month = now.getMonth() + 1,
        date = now.getDate(),
        nowStr =
          now.getFullYear() +
          "-" +
          (month < 10 ? "0" + month : month) +
          "-" +
          (date < 10 ? "0" + date : date);
      //如果截止时间小于当前时间，则当前计划失败
      if (+new Date(item.endDate) < +new Date(nowStr)) {
        this.props.delFailTask(i);
        this.setState((prev) => ({
          failNum: ++prev.failNum,
        }));
      }
    }, 10 * 60 * 1000);
  }
  //不可用时间
  disabledDate = (current) => {
    return current < moment().startOf('day');
  }

  //新增表单显示
  showModal = () => {
    this.data.task = {};
    this.setState({
      isAdd: true,
    });
  };
  //表单数据提交
  handleOk = (e) => {
    this.formRef.current
      .validateFields()
      .then(() => {
        this.formRef.current.resetFields();
        if (this.state.isEdit) {
          this.props.editTask({ ...this.state.curTask ,...this.data.task}, () => {
            this.setState({
              isEdit:false
            });
          });
        } else {
          this.props.addTask({ ...this.data.task }, () => {
            this.setState({
              isAdd:false
            });
          });
        }
      })
      .catch((info) => {
        console.log("Validate Failed: ", info);
      });
  };
  //新增表单取消
  handleCancel = () => {
    this.setState({
      isAdd: false,
      curTask: {},
    });
  };
  //编辑表单取消
  handleECancel = () => {
    this.setState({
      isEdit: false,
    });
  };
 
  //标题，描述表单两项值的改变
  handleChange = (e, type) => {
    // console.log(type+"-----"+e.target.value);
    this.data.task[type] = e.target.value;
  };
  //计划类型的改变
  handleTypeChange = (e, type) => {
    // console.log(type+"-----"+v);
    this.data.task[type] = e;
  };
  //开始时间和结束时间的改变
  handleDateChange = (e, type) => {
    // console.log(type+"-----"+v.format("YYYY-MM-DD"));
    this.data.task[type] = e.format("YYYY-MM-DD");
  };

  //删除
  handleRemove = (index) => {
    console.log(index);
    this.props.delTask(index, () => {
      message.success("删除成功");
    });
  };
  //编辑
  handleEdit = (index) => {
    // console.log(moment(this.props.unDoneTasks[index].endDate, 'YYYY-MM-DD HH:mm:ss'))
    console.log((this.props.unDoneTasks[index].startDate));
    this.setState({
      curTask: this.props.unDoneTasks[index],
      modalTit: "编辑Task",
      isEdit: true,
    }, () => {
      this.formRef.current.setFieldsValue({
        title: this.props.unDoneTasks[index].title,
        startDate: moment(this.props.unDoneTasks[index].startDate,"YYYY-MM-DD"),
        endDate: moment(this.props.unDoneTasks[index].endDate,"YYYY-MM-DD"),
        kind: this.props.unDoneTasks[index].kind,
        desc: this.props.unDoneTasks[index].desc,

      });
    });
    this.data.task.index = index;
  };
  //已完成
  handleDone = (index) => {
    this.props.doneTask(index, () => {
      message.success("恭喜你，成功完成此计划");
    });
  };

  render() {
    const {
      capacity,
      curCapacity,
      hasDoneTasks,
      hasFailTasks,
      unDoneTasks,
    } = this.props;

    let hasDoneNum = hasDoneTasks.length,
      hasFailNum = hasFailTasks.length,
      totalTodos = hasDoneNum + hasFailNum,
      effectRate = totalTodos ? (hasDoneNum / totalTodos) * 100 : 0;

    return (
      <>
        <Layout>
          {/* 头部 */}
          <Header className="header">
            <Head
              curCapacity={curCapacity}
              capacity={capacity}
              failNum={this.state.failNum}
            />
          </Header>

          {/* 内容区 */}
          <Content className="content">
            {/* 左侧--任务列表 */}
            <List
              showModal={this.showModal}
              handleEdit={this.handleEdit}
              handleDone={this.handleDone}
              handleRemove={this.handleRemove}
              data={this.data}
              unDoneTasks={unDoneTasks}
              delTask={this.props.delTask}
            />
            {/* 右侧---状态区 */}
            <Status
              hasDoneTasks={hasDoneTasks}
              hasDoneNum={hasDoneNum}
              effectRate={effectRate}
            />
          </Content>
        </Layout>

        {/* 新增modal */}
        <AddModal
          formRef={this.formRef}
          isAdd={this.state.isAdd}
          disabledDate={this.disabledDate}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          handleChange={this.handleChange}
          handleDateChange={this.handleDateChange}
          handleTypeChange={this.handleTypeChange}
        />

        {/* 编辑modal */}
        <EditModal
          formRef={this.formRef}
          isEdit={this.state.isEdit}
          curTask={this.state.curTask}
          handleOk={this.handleOk}
          handleECancel={this.handleECancel}
          handleChange={this.handleChange}
          handleDateChange={this.handleDateChange}
          handleTypeChange={this.handleTypeChange}
        />
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
