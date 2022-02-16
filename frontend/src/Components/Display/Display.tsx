import { Component } from "react";
import "./Display.css";
import axios from "axios";
import { Grid } from "@material-ui/core";
import SingelElementModel from "../../models/Single-Element-Model";
import SingleElement from "../SingleElement/SingleElement";
interface DisplayState {
  allElements: SingelElementModel[];
}
class Display extends Component<{}, DisplayState> {
  constructor(props: {}) {
    super(props);
    this.state = { allElements: [] };
  }
  public render(): JSX.Element {
    return (
      <div className="Display">
        <h1>ELEMENTS</h1>
        <Grid container spacing={2}>
          {this.state.allElements.map((e, i) => (
            <SingleElement key={i} image={e.download_url} name={e.author} />
          ))}
        </Grid>
      </div>
    );
  }
  componentDidMount = async () => {
    try {
      const response = await axios.get<SingelElementModel[]>(
        `https://picsum.photos/v2/list?page=1&limit=${20}`
      );
      this.setState({ allElements: response.data });
    } catch (error: any) {
      alert(error);
    }
  };
}

export default Display;
