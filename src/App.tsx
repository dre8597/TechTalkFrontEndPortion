import React from 'react';
import './App.css';
import { TodoItems } from './TodoItems';

//This is the main component of the web app that displays all content to the user
function App() {
	return (
		<div className='App'>
			<TodoItems />
		</div>
	);
}

export default App;
