import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
	createBrowserRouter,
	redirect,
	RouterProvider,
} from "react-router-dom";
import './index.css';
import Root, {
	loader as rootLoader,
	action as rootAction
} from './routes/root';
import ErrorPage from './error-page';
import Task, {
	loader as taskLoader,
	action as taskAction,
} from './routes/task';
import EditTask, {
	action as editAction
} from './routes/edit';
import { action as destroyAction } from './routes/destroy';
import { Provider, useDispatch } from 'react-redux';
import store, { RootState, useTypedSelector } from './store';
import { createTask } from './redux/slices/tasksSlice';

const rootContainer = document.querySelector('#root');

if (rootContainer === null) throw new Error('Can\'t find root container');

export default function Index() {
	return (
		<p id="zero-state">
			This is a Task Manager App.
		</p>
	);
}

const getTasks=async ()=>{
	return await useTypedSelector((state: RootState) => state.tasksReducer) 
}


const Router = () => {
	const tasks = useTypedSelector((state: RootState) => state.tasksReducer);
	console.log(tasks);
	
	const dispatch = useDispatch();

	const router = createBrowserRouter([
		{
			path: "/",
			element: <Root />,
			errorElement: <ErrorPage />,
			// loader: rootLoader,
			action: rootAction,
			loader: rootLoader,
			children: [
				{
					errorElement: <ErrorPage />,
					children: [
						{ index: true, element: <Index /> },
						{
							path: "/:taskId",
							element: <Task />,
							loader: taskLoader,
							action: taskAction,
						},
						{
							path: "/:taskId/edit",
							element: <EditTask />,
							loader: taskLoader,
							action: editAction
						},
						{
							path: "/:taskId/destroy",
							action: destroyAction,
							errorElement: <div>Oops! There was an error.</div>,
						}
					],
				},
			]
		}
	]);
	return <RouterProvider router={router} />
}

const root = createRoot(rootContainer);

root.render(
	<StrictMode>
		<Provider store={store}>
			<Router />
		</Provider>
	</StrictMode>
)