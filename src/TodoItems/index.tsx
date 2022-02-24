import React, { useEffect, useState } from 'react';
import { TodoItem } from './todoItem';

export function TodoItems() {
	//This is used to store the todo items that a user has entered
	const [newTodo, setNewTodo] = useState('');
	//This is used to hold all the todo items retrieved from the backend
	const [todoItems, setTodoItems] = useState([]);

	async function deleteTodo(id: string) {
		const res = await fetch(`http://localhost:4000/todo/`, {
			method: 'DELETE', //This is the HTTP method that will be used to send delete requests to the backend
			body: JSON.stringify({ id: id }),
			headers: {
				'Content-Type': 'application/json', //This is the type of data that is being sent to the backend
			},
		});

		const data = await res.text(); //This is the response from the backend
		getTodos();
		console.log(data); //This is used to print the response from the backend to the console
	}

	async function addTodo() {
		//Unique ID
		const res = await fetch('http://localhost:4000/todo', {
			body: JSON.stringify({ todoItem: newTodo }),
			method: 'POST', //This is the HTTP method that will be used to send the request to the backend with data
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await res.json();
		getTodos();
		console.log(data);
	}

	//This is used to retrieve all the todo items from the backend
	async function getTodos() {
		fetch('http://localhost:4000/todo')
			.then((res) => res.json())
			.then((todoItems) => {
				setTodoItems(todoItems);
			});
	}

	useEffect(() => {
		//This is used to run the getTodos function when the page is loaded
		getTodos();
	}, []);

	return (
		<div>
			<h1>My TODO List</h1>{' '}
			{/*This is the title of the page shown as a header*/}
			<div className='mb-3'>
				<label htmlFor='todoItem' className='form-label'>
					{/*This is the label for the input field*/}
					Submit New Todo Item
				</label>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						addTodo();
					}}
				>
					{/*This is the form that is used to submit new todo items using the enter key*/}
					<div className='d-flex justify-content-between align-items-center'>
						{' '}
						{/*This is used to align the input field and the button in the center of the page*/}
						<input
							type='text'
							className='form-control' //This is the class that is used to style the input field
							id='todoItem'
							placeholder='Buy Tissue' //This is the placeholder text that is shown in the input field by default
							value={newTodo} //This is the value of the input field that will display the value of the newTodo variable in the input field or the placeholder text if the input field is empty
							onChange={(e) => setNewTodo(e.target.value)} //This is used to set the value of the newTodo variable to the value of the input field when the value of the input field changes
						/>
						<button
							type='button'
							className='btn btn-primary' //This is the class that is used to style the button see the Bootstrap documentation for more information
							onClick={(): void => {
								//This is the function that is called when the button is clicked
								addTodo();
							}}
						>
							Add {/*This is the text that is shown on the button*/}
						</button>
					</div>
				</form>
			</div>
			<ul className='list-group'>
				{/*//This is used to iterate through the todoItems array and display each item in the array as a list item*/}
				{todoItems.map((item: { id: string; contents: string }) =>
					TodoItem({ item: item, onDelete: deleteTodo })
				)}
			</ul>
		</div>
	);
}
