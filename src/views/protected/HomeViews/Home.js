import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "../../../components/AppBar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { ReactComponent as CalendarSvg } from "../../../assets/icons/calendar.svg";
import { ReactComponent as ObserveSvg } from "../../../assets/icons/observe.svg";
import { ReactComponent as ResultSvg } from "../../../assets/icons/results.svg";
import { ReactComponent as MessageSvg } from "../../../assets/icons/messages.svg";
import TeacherModal from "./TeacherModal";
import FirebaseContext from "../../../components/Firebase/context";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  card: {
    maxHeight: "90%",
    flex: 1,
    maxWidth: "40%"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  image: {
    height: "15vh",
    width: "15vw"
  },
  buttonGrid: {
    padding: 40
  }
};

class Welcome extends React.Component {
  state = {
    teacherModal: false,
    type: "",
    coachName: ""
  };

  showTeacherModal = (type) => {
    this.setState({ teacherModal: true, type: type});
  };

  handleClose = event => {
    this.setState({
      teacherModal: false,
      type: ""
    });
  };

  componentDidMount (){
    let firebase = this.context;
    firebase.getCoachFirstName().then(name=>{
      this.setState({ coachName: name});
    })
    firebase.handleFetchTrainingStatus();
    firebase.handleFetchQuestions('transition')
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase} />}
        </FirebaseContext.Consumer>
        <Grid
          container
          alignItems="center"
          direction="column"
          justify="space-between"
          style={{ padding: 40 }}
        >
          <Typography
            component={"h3"}
            variant={"h3"}
            align={"center"}
          >
            Welcome, {this.state.coachName}!
          </Typography>
          <Grid
            container
            alignItems="center"
            direction="row"
            justify="space-around"
            className={classes.buttonGrid}
          >
            <Card className={classes.card}>
              <CardContent>
                <Grid
                  container
                  alignItems="center"
                  direction="column"
                  justify="flex-start"
                >
                  <Grid item>
                    <CalendarSvg className={classes.image}/>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h2">
                      Schedules & Calendar
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card
              className={classes.card}
              onClick={() => this.showTeacherModal("Observe")}
            >
              <CardContent>
                <Grid
                  container
                  alignItems="center"
                  direction="column"
                  justify="flex-start"
                >
                  <Grid item>
                    <ObserveSvg className={classes.image}/>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h2">
                      Observe
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            container
            alignItems="center"
            direction="row"
            justify="space-around"
            className={classes.buttonGrid}
          >
            <Card className={classes.card} onClick={() => this.showTeacherModal("Results")}>
              <CardContent>
                <Grid
                  container
                  alignItems="center"
                  direction="column"
                  justify="flex-start"
                >
                  <Grid item>
                    <ResultSvg className={classes.image}/>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h2">
                      Results
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Card className={classes.card}>
              <CardContent>
                <Grid
                  container
                  alignItems="center"
                  direction="column"
                  justify="flex-start"
                >
                  <Grid item>
                    <MessageSvg className={classes.image}/>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5" component="h2">
                      Messages
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {this.state.teacherModal ? (
          <FirebaseContext.Consumer>
            {firebase => (
              <TeacherModal
                handleClose={this.handleClose}
                firebase={firebase}
                type={this.state.type}
              />
            )}
          </FirebaseContext.Consumer>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

Welcome.propTypes = {
    classes: PropTypes.object.isRequired
};

Welcome.contextType = FirebaseContext;
export default withStyles(styles)(Welcome);
