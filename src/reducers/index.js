import {
  ADD_TASK,
  DEL_FAIL_TASK,
  DEL_TASK,
  DONE_TASK,
  EDIT_TASK
} from "../actions/actionType";
import { calculatedSize, getCharset } from "../utils/tool";

const initialState = {
  hasDoneTasks: [], // 已完成的task
  hasFailTasks: [], // 以失败的task
  unDoneTasks: [], // 未完成的task

  capacity: 5 * 1024 * 1024, // localStorage总容量，单位bt
  curCapacity: 0, // 当前使用容量，单位bt
};

const reducer = (state = initialState, action) => {
  let charset = getCharset();
  switch (action.type) {
    case ADD_TASK:
      return Object.assign({}, state, {
        unDoneTasks: [...state.unDoneTasks, action.payload],
        curCapacity:
          state.curCapacity +
          calculatedSize(JSON.stringify(action.payload), charset),
      });

    case DEL_TASK:
      let curDone = state.unDoneTasks[action.payload],
        curDoneSize = calculatedSize(JSON.stringify(curDone), charset);
      state.unDoneTasks.splice(action.payload, 1);
      return Object.assign({}, state, {
        curCapacity: state.curCapacity - curDoneSize,
      });

    //编辑
    case EDIT_TASK:
      let i = action.payload.index;
      delete action.payload.index;
      // 计算大小差
      let preSize = calculatedSize(JSON.stringify(state.unDoneTasks[i]), charset),
        curSize = calculatedSize(JSON.stringify(action.payload), charset);
      // 将修改后的task赋值给原来的task
      state.unDoneTasks[i] = action.payload;
      return Object.assign({}, state, {
        unDoneTasks: [...state.unDoneTasks],
        curCapacity: state.curCapacity + curSize - preSize,
      });

    //已失败： 从未完成列表中删除task（容量不需要重新计算）
    case DEL_FAIL_TASK:
      let curDone2 = state.unDoneTasks[action.payload];
      state.unDoneTasks.splice(action.payload, 1);
      return Object.assign({}, state, {
        hasFailTasks: [...state.hasFailTasks, curDone2],
      });

    //已完成
    case DONE_TASK:
      let newDone = state.unDoneTasks[action.payload];
      state.unDoneTasks.splice(action.payload, 1);
      return Object.assign({}, state, {
        hasDoneTasks: [...state.hasDoneTasks, newDone],
      });

    default:
      return state;
  }
};

export default reducer;
