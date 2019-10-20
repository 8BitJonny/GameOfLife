import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import App from '../App';
import Grid from "../Grid";
import {act} from "react-dom/test-utils";

let container: HTMLDivElement | Element | null = null;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement("div");
	// container *must* be attached to document so events work correctly.
	document.body.appendChild(container);
});

afterEach(() => {
	if (container) {
		// cleanup on exiting
		unmountComponentAtNode(container);
		container.remove();
		container = null;
	}
});

it("renders without crashing", () => {
	render(<App />, container);
});

it("forwards event messages from navbar to grid", () => {
	const handleControlEventFake = jest.spyOn(Grid.prototype, 'handleControlEvent');

	act(() => {
		render(<App />, container);
	});

	const button = container!.querySelector("[id='PAUSE']");

	act(() => {
		button!.dispatchEvent(new MouseEvent('click', {bubbles: true}));
	});

	expect(handleControlEventFake).toHaveBeenCalledTimes(1);
});
