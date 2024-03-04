import { ActionFunctionArgs, Router, redirect } from "react-router-dom";
import { deleteTask } from "../tasks";
import { connect, useDispatch } from "react-redux";
import store from "../store";

connect()(Router);

export function action({ params }: ActionFunctionArgs) {
  store.dispatch(deleteTask(params.taskId));
  return redirect("/");
}