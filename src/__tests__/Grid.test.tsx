import React from 'react';
import Grid from '../Grid';

it("generates a new grid with the required size", () => {
	const newGridState = Grid.prototype.generateNewRandomState(10,12);
	expect(newGridState).toHaveLength(10);
	newGridState.forEach((row: boolean[]) => { expect(row).toHaveLength(12) })
});
