export function remap(oldValue, oldRange, newRange) {
  return (
    ((oldValue - oldRange.min) * (newRange.max - newRange.min)) /
      (oldRange.max - oldRange.min) +
    newRange.min
  )
}

export function calculateCellCountFromPixelSize(
  cellSize,
  cellPadding,
  pixelSize
) {
  return Math.floor((pixelSize + cellPadding) / (cellSize + cellPadding))
}

export function calculatePixelSizeFromCellCount(
  cellSize,
  cellPadding,
  cellCount
) {
  return cellCount * cellSize + (cellCount - 1) * cellPadding
}
