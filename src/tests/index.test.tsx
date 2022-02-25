import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'fetch-mock-jest';
import { TodoItems } from '../TodoItems';

// mock the fetch call
const mockTodoItem = {
	id: '1',
	contents: 'Walk the dog',
	onDelete: jest.fn(),
};

describe('Todo Items', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		fetchMock.reset();
	});

	it('display the title of the page', () => {
		// This is used to intercept the api call and return a default value for the useEffect method
		fetchMock.getOnce('http://localhost:4000/todo', []);
		// This renders the component in a "headless" browser to allow for reading the elements within the component using screen
		render(<TodoItems />);
		// Here we use get by text to look for the element within the component that contains these words and save the entire component in the variable
		const title = screen.getByText('My TODO List');
		// We use to be visible to ensure that the item is visible within the headless browser. We can have a component that theoretically renders but isn't visible to the user
		expect(title).toBeVisible();
	});

	it('displays the todo items from a given source', async () => {
		fetchMock.getOnce('http://localhost:4000/todo', [mockTodoItem]);
		render(<TodoItems />);
		// We use waitFor in situation when rendering requires a step that isn't instantly available i.e. loading data from an api, waiting for a user/fireEvent to finish typing or clicking etc.
		await waitFor(() => {
			expect(screen.queryByText(mockTodoItem.contents)).toBeVisible();
		});
	});

	it('adds todo items to our list', async () => {
		//Ensure when mocking a value you are using the correct method as it is in your component i.e. method: POST -> fetchMock.postOnce, method: GET -> fetchMock.getOnce
		fetchMock.get('http://localhost:4000/todo', []);
		const postMock = fetchMock.postOnce('http://localhost:4000/todo', 200);

		render(<TodoItems />);
		// Here we are looking for the input box by using the placeholder we specified on the component
		const inputBox = await screen.findByPlaceholderText('Buy Tissue');
		//Here we simulate a user typing in what the todo item will be
		userEvent.type(inputBox, 'Walk the dog');
		// We confirm that the userEvent correct entered the todo item text
		await waitFor(() => {
			expect((inputBox as any).value).toBe('Walk the dog');
		});
		//We look for the only button that's currently on the screen and ensure it exists
		const addButton = await screen.findByRole('button');
		expect(addButton).toBeVisible();
		fireEvent.click(addButton);
		// Here we ensure that the mocked calls ONLY occur 2 times
		await waitFor(() => {
			expect(fetchMock).toHaveFetchedTimes(2);
		});
		//Since we know the last call is a post call after the add button is pressed we ensure it is cal;ed with the appropriate values
		await waitFor(() => {
			expect(postMock).toHaveLastFetched(
				'http://localhost:4000/todo',
				//We want to make sure its the correct method being called with the correct type and the correct inputs in the body of the request
				expect.objectContaining({
					method: 'POST',
					headers: {
						'content-type': 'application/json',
					},
					body: JSON.stringify({ todoItem: 'walk the dog' }),
				})
			);
		});
	});
	//The same would be done for the delete method only this time we are going to look for the delete button on the todo item component like we did in the todoItems.test.tsx file
});
