export function remap(oldValue, oldRange, newRange) {
  return (
    ((oldValue - oldRange.min) * (newRange.max - newRange.min)) /
      (oldRange.max - oldRange.min) +
    newRange.min
  )
}

export function calculate1DCellCountFromPixelSize(
  cellSize,
  cellPadding,
  pixelSize
) {
  return Math.floor((pixelSize + cellPadding) / (cellSize + cellPadding))
}

export function calculate1DPixelSizeFromCellCount(
  cellSize,
  cellPadding,
  cellCount
) {
  return cellCount * cellSize + (cellCount - 1) * cellPadding
}

export function lerp(base, target, t) {
  return base + Math.max(Math.min(t, 1), 0) * (target - base)
}
