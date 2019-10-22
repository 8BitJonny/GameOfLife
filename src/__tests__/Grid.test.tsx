import React from 'react';
import Grid from '../Grid';
import Alive from "../model/alive";
import GridObject from "../model/grid";

it("generates a new grid with the required size", () => {
	const newGridState = Grid.prototype.generateNewRandomState(10,12);
	expect(newGridState).toHaveLength(10);
	newGridState.forEach((row: Alive[]) => { expect(row).toHaveLength(12) })
});

it("calculates new cell state correctly", () => {
	interface testCase { aliveNeighbours: number, currentState: Alive, result: Alive }
	const testCases: testCase[] = [
		{ aliveNeighbours: 2, currentState: 0, result: 0 },
		{ aliveNeighbours: 3, currentState: 0, result: 1 },
		{ aliveNeighbours: 4, currentState: 0, result: 0 },
		{ aliveNeighbours: 8, currentState: 0, result: 0 },
		{ aliveNeighbours: 0, currentState: 1, result: 0 },
		{ aliveNeighbours: 1, currentState: 1, result: 0 },
		{ aliveNeighbours: 2, currentState: 1, result: 1 },
		{ aliveNeighbours: 3, currentState: 1, result: 1 },
		{ aliveNeighbours: 4, currentState: 1, result: 0 },
		{ aliveNeighbours: 5, currentState: 1, result: 0 }
	];

	testCases.forEach(testCase => {
		const calculatedCellState = Grid.prototype.calculateCellState(testCase.aliveNeighbours, testCase.currentState);

		expect(calculatedCellState).toBe(testCase.result);
	});
});

it("checks correctly if cellIndex is in Grid", () => {
	const grid: GridObject = [ [0 , 0, 0], [0 , 0, 0], [0 , 0, 0] ];

	[
		{ rowIndex:  0, columnIndex:  0, expectedResult: true  },
		{ rowIndex:  2, columnIndex:  2, expectedResult: true  },
		{ rowIndex: -1, columnIndex:  2, expectedResult: false },
		{ rowIndex:  1, columnIndex: -1, expectedResult: false },
		{ rowIndex:  3, columnIndex:  0, expectedResult: false },
		{ rowIndex:  0, columnIndex:  3, expectedResult: false }
	].forEach(testCase => {
		const isIndexInBounds = Grid.prototype.indexInGridBounds(grid, {rowIndex: testCase.rowIndex, columnIndex: testCase.columnIndex});

		expect(isIndexInBounds).toBe(testCase.expectedResult);
	});
});

it("counts the alive numbers correctly", () => {
	const grid: GridObject = [
		[0, 1, 0],
		[1, 0, 0],
		[1, 1, 0],
		[0, 0, 1] ];

	[
		{ rowIndex:  0, columnIndex:  0, expectedResult: 2 },
		{ rowIndex:  2, columnIndex:  2, expectedResult: 2 },
		{ rowIndex:  1, columnIndex:  1, expectedResult: 4 },
		{ rowIndex:  3, columnIndex:  0, expectedResult: 2 },
		{ rowIndex:  3, columnIndex:  1, expectedResult: 3 },
		{ rowIndex:  1, columnIndex:  2, expectedResult: 2 }
	].forEach(testCase => {
		const isIndexInBounds = Grid.prototype.countAliveNeighbours(grid, {rowIndex: testCase.rowIndex, columnIndex: testCase.columnIndex});

		expect(isIndexInBounds).toBe(testCase.expectedResult);
	});
});

it("calculates new grid state correctly", () => {
	const testCases: { baseGrid: GridObject, expectedNextGrid: GridObject }[] = [
		{   baseGrid:  [
				[1, 1, 0, 0, 0],
				[0, 0, 0, 1, 0],
				[0, 1, 1, 0, 0],
				[0, 0, 0, 1, 0],
				[0, 1, 1, 1, 0]
	        ],
			expectedNextGrid: [
				[0, 0, 0, 0, 0],
				[1, 0, 0, 0, 0],
				[0, 0, 1, 1, 0],
				[0, 0, 0, 1, 0],
				[0, 0, 1, 1, 0]
			]
		},{ baseGrid:  [
				[1, 1, 0, 0, 1],
				[0, 0, 0, 0, 0],
				[1, 0, 0, 1, 0],
				[0, 0, 1, 0, 0],
				[1, 0, 0, 0, 1]
			],
			expectedNextGrid:  [
				[0, 0, 0, 0, 0],
				[1, 1, 0, 0, 0],
				[0, 0, 0, 0, 0],
				[0, 1, 0, 1, 0],
				[0, 0, 0, 0, 0]
			]
		},{ baseGrid:  [
				[1, 0, 1, 0, 0],
				[0, 1, 0, 0, 1],
				[0, 1, 0, 1, 0],
				[0, 0, 1, 0, 1],
				[1, 0, 0, 1, 0]
			],
			expectedNextGrid:  [
				[0, 1, 0, 0, 0],
				[1, 1, 0, 1, 0],
				[0, 1, 0, 1, 1],
				[0, 1, 1, 0, 1],
				[0, 0, 0, 1, 0]
			]
		}
	];

	testCases.forEach(testCase => {
		const nextGrid = Grid.prototype.calculateNextGrid(testCase.baseGrid, 5, 5);

		expect(nextGrid).toStrictEqual(testCase.expectedNextGrid);
	});
});
