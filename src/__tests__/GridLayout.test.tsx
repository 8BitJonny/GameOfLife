import React from 'react';
import {render, unmountComponentAtNode} from 'react-dom';
import GridLayout from '../GridLayout';
import Grid from "../Grid";

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

it("renders a new grid with the required size", () => {
	render(<GridLayout cellSize={10} size={{w:4, h:3}} gridState={Grid.prototype.generateEmptyState(3,4)} handleCellClick={() => {}} />, container);

	const cellCount = container!.querySelectorAll("[class~='cell']").length;
	const rowCount = container!.querySelectorAll("[class~='row']").length;

	expect(cellCount).toBe(12);
	expect(rowCount).toBe(3);
});
