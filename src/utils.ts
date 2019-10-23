export default function remap(oldValue: number, oldRange:{min: number, max: number}, newRange:{min: number, max: number}) {
	return (((oldValue - oldRange.min) * (newRange.max - newRange.min)) / (oldRange.max - oldRange.min)) + newRange.min;
}