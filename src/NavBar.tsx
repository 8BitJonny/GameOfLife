import React from "react";
import SlowDown from "./static/SlowDown.svg";
import Play from "./static/Play.svg";
import Faster from "./static/Faster.svg";
import Randomize from "./static/Randomize.svg";
import Pause from "./static/Pause.svg";
import Edit from "./static/Edit.svg";
import {ControlEvent} from "./model/controlEvent";

const controlClassname = "h-full -mt-10 ml-8 inline-block cursor-pointer";

interface ComponentsProps { actionCallBack: (event: ControlEvent) => void }
interface ComponentsState { }

class NavBar extends React.Component<ComponentsProps, ComponentsState> {
	constructor(props: ComponentsProps) {
		super(props);

		this.state = { }
	}

	render () {
		return (
			<div className="absolute flex items-center justify-between flex-wrap w-full h-20 bg-black px-6 py-1 text-white font-extrabold text-5xl">
				<div>
					<span>Game of Life</span>
				</div>
				<div id="controls" className="h-10">
					<img className={controlClassname} onClick={this.props.actionCallBack.bind(this,"SLOW")} src={SlowDown} alt=""/>
					<img className={controlClassname} onClick={this.props.actionCallBack.bind(this,"PLAY")} src={Play} alt=""/>
					<img className={controlClassname} onClick={this.props.actionCallBack.bind(this,"FAST")} src={Faster} alt=""/>
					<img className={controlClassname} onClick={this.props.actionCallBack.bind(this,"RAND")} src={Randomize} alt=""/>
					<img className={controlClassname} onClick={this.props.actionCallBack.bind(this,"PAUSE")} src={Pause} alt=""/>
					<img className={controlClassname} onClick={this.props.actionCallBack.bind(this,"EDIT")} src={Edit} alt=""/>
				</div>
			</div>
		);
	}
}

export default NavBar;
