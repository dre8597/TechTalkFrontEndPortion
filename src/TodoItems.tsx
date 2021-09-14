import React, { useEffect, useState } from 'react';

export function TodoItems() {
	const [newTodo, setNewTodo] = useState('');
	const [todoItems, setTodoItems] = useState([]);

	async function deleteTodo(id: string) {
		const res = await fetch(`http://localhost:4000/todo/${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await res.text();
		getTodos();
		console.log(data);
	}

	async function addTodo() {
		//Unique ID
		const res = await fetch('http://localhost:4000/todo', {
			body: JSON.stringify({ todoItem: newTodo }),
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await res.json();
		getTodos();
		console.log(data);
	}
	// async
	async function getTodos() {
		fetch('http://localhost:4000/todo')
			.then((res) => res.json())
			.then((todoItems) => {
				setTodoItems(todoItems);
			});
	}

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<div>
			<h1>My TODO List</h1>
			<div className='mb-3'>
				<label htmlFor='todoItem' className='form-label'>
					Submit New Todo Item
				</label>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						addTodo();
					}}
				>
					<div className='d-flex justify-content-between align-items-center'>
						<input
							type='text'
							className='form-control'
							id='todoItem'
							placeholder='Buy Tissue'
							value={newTodo}
							onChange={(e) => setNewTodo(e.target.value)}
						/>
						<button
							type='button'
							className='btn btn-primary'
							onClick={(): void => {
								addTodo();
							}}
						>
							{' '}
							Add
						</button>
					</div>
				</form>
			</div>
			<ul className='list-group'>
				{todoItems.map((item: any) => (
					<div className='container'>
						<li className='list-group-item d-flex justify-content-between align-items-center mb-3'>
							{item.contents}
							<button
								type='button'
								className='btn btn-danger'
								onClick={(): void => {
									deleteTodo(item.id);
								}}
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='16'
									height='16'
									fill='currentColor'
									className='bi bi-trash'
									viewBox='0 0 16 16'
								>
									<path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z' />
									<path
										fill-rule='evenodd'
										d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z'
									/>
								</svg>
							</button>
						</li>
					</div>
				))}
			</ul>
		</div>
	);
}
