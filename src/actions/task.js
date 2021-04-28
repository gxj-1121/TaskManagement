import { ADD_TASK, DEL_FAIL_TASK, DEL_TASK, DONE_TASK, EDIT_TASK } from './actionType';

export const addTask = (data, cb) => {
  cb && 'function' === typeof cb && cb(data);
  return {
    type: ADD_TASK,
    payload: data
  }
}

export const delTask = (data, cb) => {
  cb && 'function' === typeof cb && cb(data);
  return {
    type: DEL_TASK,
    payload: data
  }
}

export const editTask = (data, cb) => {
  cb && 'function' === typeof cb && cb(data);
  return {
    type: EDIT_TASK,
    payload: data
  }
}

export const delFailTask = (data, cb) => {
  cb && 'function' === typeof cb && cb(data);
  return {
    type: DEL_FAIL_TASK,
    payload: data
  }
}

export const doneTask = (data, cb) => {
  cb && 'function' === typeof cb && cb(data);
  return {
    type: DONE_TASK,
    payload: data
  }
}