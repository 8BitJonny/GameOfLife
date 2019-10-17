import React from "react";
import SlowDown from "./static/SlowDown.svg";
import Play from "./static/Play.svg";
import Faster from "./static/Faster.svg";
import Randomize from "./static/Randomize.svg";
import Pause from "./static/Pause.svg";
import Edit from "./static/Edit.svg";

const controlClassname = "h-full -mt-10 ml-8 inline-block";

const NavBar: React.FC = () => {
	return (
		<div className="flex items-center justify-between flex-wrap h-20 bg-black px-6 py-1 text-white font-extrabold text-5xl">
			<div>
				<span>Game of Life</span>
			</div>
			<div id="controls" className="h-10">
				<img className={controlClassname} src={SlowDown} alt=""/>
				<img className={controlClassname} src={Play} alt=""/>
				<img className={controlClassname} src={Faster} alt=""/>
				<img className={controlClassname} src={Randomize} alt=""/>
				<img className={controlClassname} src={Pause} alt=""/>
				<img className={controlClassname} src={Edit} alt=""/>
			</div>
		</div>
	);
};

export default NavBar;
