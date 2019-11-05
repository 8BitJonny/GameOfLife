import React, {createRef} from 'react';
import NavBar from "./NavBar";
import Grid from "./GridComponent";
import {ControlEvent} from "./model/controlEvent";
import {State} from "./model/state";

interface ComponentsProps { }
interface ComponentsState { gridControlState: State }

class App extends React.Component<ComponentsProps, ComponentsState> {
    private gridRef = createRef<Grid>();

    constructor(props: ComponentsProps) {
        super(props);

        this.state = { gridControlState: "PAUSE" }
    }

    messageToGrid(event: ControlEvent) {
        if (this.gridRef.current) {
            this.gridRef.current.handleControlEvent(event, (state: ControlEvent) => {
                if (state === "PLAY" || state === "PAUSE" || state === "EDIT") this.setState({ gridControlState: state });
            })
        }
    }

    render () {
        return (
            <div className="App flex flex-col">
              <NavBar gridControlState={this.state.gridControlState} actionCallBack={this.messageToGrid.bind(this)} />
              <Grid ref={this.gridRef} />
            </div>
        )
    }
}

export default App;
