import { Component } from "react";
import "./SingleElement.css";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@material-ui/core";

interface SingleElementProps {
  image: string;
  name: string;
}
class SingleElement extends Component<SingleElementProps> {
  constructor(props: SingleElementProps) {
    super(props);
    this.state = {};
  }
  public render(): JSX.Element {
    return (
      <Grid item xs={6} md={2} lg={3} xl={2}>
        <Card className="SingleElement">
          <CardMedia
            className="media"
            height={"130px"}
            component="img"
            image={this.props.image}
            title="image"
          />
          <CardContent>
            <Typography variant="h5">{this.props.name}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default SingleElement;
