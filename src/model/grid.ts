import CanvasCell from "../CanvasCell";

interface Grid extends Array<Array<CanvasCell>> {
	[index: number]: CanvasCell[];
}

export default Grid;