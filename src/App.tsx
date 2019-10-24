import React, {createRef} from 'react';
import NavBar from "./NavBar";
import Grid from "./Grid";
import {ControlEvent} from "./model/controlEvent";

interface ComponentsProps { }
interface ComponentsState { }

class App extends React.Component<ComponentsProps, ComponentsState> {
    private gridRef = createRef<Grid>();

    constructor(props: ComponentsProps) {
        super(props);

        this.state = { }
    }

    messageToGrid(event: ControlEvent) {
        if (this.gridRef.current) this.gridRef.current.handleControlEvent(event);
    }

    render () {
        return (
            <div className="App flex flex-col">
              <NavBar actionCallBack={this.messageToGrid.bind(this)} />
              <Grid ref={this.gridRef} />
            </div>
        )
    }
}

export default App;
