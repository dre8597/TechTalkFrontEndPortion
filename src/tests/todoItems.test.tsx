import { render, fireEvent, screen } from '@testing-library/react';
import { TodoItem } from '../TodoItems/todoItem';

// mock the fetch call
const mockTodoItem = {
	item: {
		id: '1',
		contents: 'Walk the dog',
	},
	onDelete: jest.fn(),
};

describe('Todo Items', () => {
	it('displays the todo item content', () => {
		render(
			<TodoItem item={mockTodoItem.item} onDelete={mockTodoItem.onDelete} />
		);
		const todoItem = screen.getByText(mockTodoItem.item.contents);
		expect(todoItem).toBeVisible();
	});

	it('calls the delete method when the button is pressed', () => {
		render(
			<TodoItem item={mockTodoItem.item} onDelete={mockTodoItem.onDelete} />
		);
		const deleteButton = screen.getByRole('button');
		expect(deleteButton).toBeVisible();
		fireEvent.click(deleteButton);
		expect(mockTodoItem.onDelete).toBeCalledTimes(1);
		expect(mockTodoItem.onDelete).toBeCalledWith("1");
	});
});
