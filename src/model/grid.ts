import Alive from "./alive";

interface Grid extends Array<Array<Alive>> {
	[index: number]: Alive[];
}

export default Grid;