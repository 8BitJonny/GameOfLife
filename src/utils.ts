export function remap(oldValue: number, oldRange:{min: number, max: number}, newRange:{min: number, max: number}) {
	return (((oldValue - oldRange.min) * (newRange.max - newRange.min)) / (oldRange.max - oldRange.min)) + newRange.min;
}

export function calculateCellCountFromPixelSize(cellSize: number, cellPadding: number, pixelSize: number) {
	return Math.floor((pixelSize + cellPadding) / (cellSize + cellPadding))
}

export function calculatePixelSizeFromCellCount(cellSize: number, cellPadding: number, cellCount: number) {
	return cellCount * cellSize + (cellCount-1) * cellPadding
}