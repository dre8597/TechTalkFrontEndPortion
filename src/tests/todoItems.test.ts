import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { TodoItem } from '../TodoItems/todoItem';
import fetchMock from 'fetch-mock-jest';

// mock the fetch call
const mockTodoItem = {
	item: {
		id: '1',
		contents: 'Walk the dog',
	},
	onDelete: jest.fn(),
};

describe('Todo Items', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		fetchMock.reset();
	});

	it('displays a todo item', () => {
		render(TodoItem(mockTodoItem));
		expect(screen.getByText(mockTodoItem.item.contents)).toBeVisible();
	});

	it('calls the delete method when the button is pressed', async () => {
		render(TodoItem(mockTodoItem));
		const deleteButton = screen.getByRole('button');
		fireEvent.click(deleteButton);
		expect(mockTodoItem.onDelete).toBeCalledTimes(1);
		expect(mockTodoItem.onDelete).toBeCalledWith('1');
	});
});
