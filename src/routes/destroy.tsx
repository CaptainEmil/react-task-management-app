import { ActionFunctionArgs, Router, redirect } from "react-router-dom";
import { deleteTask } from "../redux/slices/tasksSlice";
import { connect, useDispatch } from "react-redux";
import store from "../store";


export function action({ params }: ActionFunctionArgs) {
  if(params.taskId!==undefined)store.dispatch(deleteTask(params.taskId));
  return redirect("/");
}