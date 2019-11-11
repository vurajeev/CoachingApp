import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import { Button, Card, Grid } from '@material-ui/core';
import TransitionTimeIcon from "../assets/icons/TransitionTime.svg"
import ClassroomClimateIcon from "../assets/icons/ClassroomClimate.svg"
import MathIcon from "../assets/icons/MathInstruction.svg"
import EngagementIcon from "../assets/icons/StudentEngagement.svg"
import InstructionIcon from "../assets/icons/LevelofInstruction.svg"
import ListeningIcon from "../assets/icons/ListeningtoChildren.svg"
import SequentialIcon from "../assets/icons/SequentialActivities.svg"
import AssocCoopIcon from "../assets/icons/AssocCoopInteractions.svg"
import TransitionTimeNotes from "../assets/icons/NotesTT.svg"
import ClassroomClimateNotes from "../assets/icons/NotesCC.svg"
import MathNotes from "../assets/icons/NotesMath.svg"
import EngagementNotes from "../assets/icons/NotesEngagement.svg"
import InstructionNotes from "../assets/icons/NotesInstruction.svg"
import ListeningNotes from "../assets/icons/NotesListening.svg"
import SequentialNotes from "../assets/icons/NotesSequential.svg"
import AssocCoopNotes from "../assets/icons/NotesAssocCoop.svg"
import TransitionTimeLookFors from "../assets/icons/LookForsTT.svg"
import ClassroomClimateLookFors from "../assets/icons/LookForsCC.svg"
import MathLookFors from "../assets/icons/LookForsMath.svg"
import EngagementLookFors from "../assets/icons/LookForsEngagement.svg"
import InstructionLookFors from "../assets/icons/LookForsInstruction.svg"
import ListeningLookFors from "../assets/icons/LookForsListening.svg"
import SequentialLookFors from "../assets/icons/LookForsSequential.svg"
import AssocCoopLookFors from "../assets/icons/LookForsAssocCoop.svg"
import Notes from "./Notes";
import FirebaseContext from "./Firebase/context";
import { ClickAwayListener } from '@material-ui/core/es';
import TransitionTimeHelp from "../views/protected/TransitionViews/TransitionTimeHelp";
import ClassroomClimateHelp from "./ClassroomClimateComponent/ClassroomClimateHelp";
import IncompleteObservation from "./IncompleteObservation.js";
import TextField from '@material-ui/core/TextField';
import MenuItem from "@material-ui/core/MenuItem";
import moment from 'moment';


const styles = {
  card: {
    border: "3px solid #d9d9d9",
    borderRadius: 10,
    backgroundColor: "#fff",
    height: "100%",
    boxShadow: "5px",
    width: "100%",
    marginRight: "5%",
    flexDirection: "column",
    alignItems: "center",
    justify: "space-evenly",
    display: "flex",
    flex: "1",
    flexWrap: "nowrap"
  },
  iconGrid: {
    marginTop:"10px",
    marginBottom:"5px"
  },
  icon: {
    width: "100px",
    height: "100px"
  },
  infoDisplayGrid: {
    height: "41vh",
    width:"90%",
    marginLeft:"5px",
    marginRight:"5px",
    marginTop:"5px",
    marginBottom:"5px",
    display: "flex",
    justifyItems: "center"
  },
  helpIcon: {
    width: "60px"
  },
  completeGrid: {
    marginTop: "5px",
    marginBottom: "10px",
    marginLeft: "10px",
    marginRight: "10px",
    alignContent: "flex-end",
    display: "flex"
  },
  completeButton: {
    color: "#d9d9d9",
    borderColor: "#d9d9d9",
    borderWidth: "2px",
    fontSize: "15px",
    alignSelf: "flex-end",
    marginTop: "auto"
  },
  gridTopMargin: {
    marginTop: "5px"
  },
  resultsButtons: {
    marginTop: "2vh"
  },
  viewButtons: {
    minWidth: 150,
    textAlign: "center",
    color: "#094492",
    borderColor: "#094492",
  },
  viewButtonsSelected: {
    minWidth: 150,
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#094492"
  },
};

class ResultsDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: false,
      help: false,
      auth: true,
      time: new Date().toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true
      }),
      submitFunc: null,
      alignFormat: "center",
      incomplete: false, 
      icon: null,
      lookForsIcon: null,
      notesIcon: null
    }
  }

  componentDidMount = () => {
    this.props.magic8 === "Transition Time" ? this.setState({
      icon: TransitionTimeIcon,
      lookForsIcon: TransitionTimeLookFors,
      notesIcon: TransitionTimeNotes})
    : this.props.magic8 === "Classroom Climate" ? this.setState({
      icon: ClassroomClimateIcon,
      lookForsIcon: ClassroomClimateLookFors,
      notesIcon: ClassroomClimateNotes})
    : this.props.magic8 === "Math" ? this.setState({
      icon: MathIcon,
      lookForsIcon: MathLookFors,
      notesIcon: MathNotes})
    : this.props.magic8 === "Level of Engagement" ? this.setState({
      icon: EngagementIcon,
      lookForsIcon: EngagementLookFors,
      notesIcon: EngagementNotes})
    : this.props.magic8 === "Level of Instruction" ? this.setState({
      icon: InstructionIcon,
      lookForsIcon: InstructionLookFors,
      notesIcon: InstructionNotes})
    : this.props.magic8 === "Listening to Children" ? this.setState({
      icon: ListeningIcon,
      lookForsIcon: ListeningLookFors,
      notesIcon: ListeningNotes})
    : this.props.magic8 === "Sequential Activities" ? this.setState({
      icon: SequentialIcon,
      lookForsIcon: SequentialLookFors,
      notesIcon: SequentialNotes})
    : this.setState({
      icon: AssocCoopIcon,
      lookForsIcon: AssocCoopLookFors,
      notesIcon: AssocCoopNotes})
  };

  handleHelpModal = () => {
    this.setState({ help: true });
  };

  handleClickAwayHelp = () => {
    this.setState({ help: false });
  };

  handleNotes = open => {
    if (open) {
      this.setState({ notes: true });
    } else {
      this.setState({ notes: false });
    }
  };

  handleIncomplete = () => {
    this.setState({ incomplete: true });
  };

  handleClickAwayIncomplete = () => {
    this.setState({ incomplete: false });
  }

  render(){
    const { classes } = this.props;
    const magic8 = this.props.magic8;
    return(
      <div>
        <Card className={classes.card}>
          <Grid
            container
            flexGrow={1}
            padding={12}
            spacing={0}
            direction="column"
            justify="center"
            alignItems="center"
            style={{marginRight: 20, marginLeft: 20}}
          >
            <Grid item className={classes.iconGrid}>
              <img src={this.state.icon} alt="Magic 8 Icon" className={classes.icon}/>
            </Grid>
            <Grid item className={classes.resultsButtons}>
              <TextField
                select
                className={classes.viewButtons}
                label="Date"
                value={this.props.sessionId}
                onChange={this.props.changeSessionId}
                InputLabelProps={{ shrink: true }}>
                {this.props.sessionDates.map(date=> {return <MenuItem id={date.id} value={date.id}>
                  <em>{moment(date.sessionStart.value).format("MMM Do YY hh:mm A")}</em>
                  </MenuItem>})}
              </TextField>
            </Grid>

            <Grid item className={classes.resultsButtons}>
              <Button
                size="large"
                color={"#094492"}
                variant={
                  this.props.view === this.props.viewEnum.SUMMARY
                    ? "contained"
                    : "outlined"
                }
                className={this.props.view === this.props.viewEnum.SUMMARY ? classes.viewButtonsSelected : classes.viewButtons}
                onClick={this.props.summaryClick}
              >
                Summary
              </Button>
            </Grid>
            <Grid item className={classes.resultsButtons}>
              <Button
                size="large"
                color={"#094492"}
                variant={
                  this.props.view === this.props.viewEnum.DETAILS
                    ? "contained"
                    : "outlined"
                }
                className={this.props.view === this.props.viewEnum.DETAILS ? classes.viewButtonsSelected : classes.viewButtons}
                onClick={this.props.detailsClick}
              >
                Details
              </Button>
            </Grid>
            <Grid item className={classes.resultsButtons}>
              <Button
                size="large"
                color={"#094492"}
                variant={
                  this.props.view === this.props.viewEnum.TRENDS
                    ? "contained"
                    : "outlined"
                }
                className={this.props.view === this.props.viewEnum.TRENDS ? classes.viewButtonsSelected : classes.viewButtons}
                onClick={this.props.trendsClick}
              >
                Trends
              </Button>
            </Grid>
            <Grid item className={classes.resultsButtons}>
              <Button
                size="large"
                color={"#094492"}
                variant={
                  this.props.view === this.props.viewEnum.COACH_PREP
                    ? "contained"
                    : "outlined"
                }
                className={this.props.view === this.props.viewEnum.COACH_PREP ? classes.viewButtonsSelected : classes.viewButtons}
                onClick={this.props.coachPrepClick}
              >
                Coach Prep
              </Button>
            </Grid>
            <Grid item className={classes.resultsButtons}>
              <Button
                size="large"
                color={"#094492"}
                variant={
                  this.props.view === this.props.viewEnum.ACTION_PLAN
                    ? "contained"
                    : "outlined"
                }
                className={this.props.view === this.props.viewEnum.ACTION_PLAN ? classes.viewButtonsSelected : classes.viewButtons}
                onClick={this.props.actionPlanClick}
              >
                Action Plan
              </Button>
            </Grid>
            <Grid item style={{marginTop: "7vh", marginBottom: "2vh"}}>
              <Button
                size="large"
                color={"#094492"}
                variant={
                  this.props.view === this.props.viewEnum.NOTES
                    ? "contained"
                    : "outlined"
                }
                className={this.props.view === this.props.viewEnum.NOTES ? classes.viewButtonsSelected : classes.viewButtons}
                onClick={this.props.notesClick}
              >
                Notes
              </Button>
            </Grid>
            {/* <Grid item className={classes.infoDisplayGrid} style={{alignItems: this.props.infoPlacement}}>
              {this.props.infoDisplay}
            </Grid>
            <Grid
              container
              className={classes.gridTopMargin}
              direction="row"
              spacing={16}
              alignItems="center"
              alignContent="center"
              justify="center"
            >
              <Button className="lookFor" onClick={this.handleHelpModal}>
                <img src={this.state.lookForsIcon} alt="Look-Fors" className={classes.helpIcon}/>
              </Button>
              <Button className="notes" onClick={this.handleNotes}>
                <img src={this.state.notesIcon} alt="Notes" className={classes.helpIcon}/>
              </Button>
            </Grid>
            <Grid item className={classes.gridTopMargin}>
              Start Time: {this.state.time}
            </Grid>
            {this.props.completeObservation ? (
              <Grid item className={classes.completeGrid}>
                <FirebaseContext.Consumer>
                  {firebase => (
                    <YesNoDialog
                      buttonText={<b>COMPLETE OBSERVATION</b>}
                      buttonVariant={"outlined"}
                      buttonColor={this.props.color}
                      buttonStyle={{ margin: 10 }}
                      dialogTitle={"Are you sure you want to complete this observation?"}
                      shouldOpen={true}
                      onAccept={() => {
                        magic8 === "Classroom Climate" ? this.props.emptyClimateStack()
                        : magic8 === "Transition Time" ? this.props.resetTransitionTime()
                        : magic8 === "Sequential Activities" ? this.props.deleteAllCenters()
                        : this.props.deleteAllCenters();
                        this.props.history.push({
                          pathname: "/Home",
                          state: this.props.history.state
                        });
                        firebase.endSession();
                      }}
                    />
                  )}
                </FirebaseContext.Consumer>
              </Grid> 
            ) : (
              <Grid item className={classes.completeGrid}>
                <Button variant="outlined" onClick={this.handleIncomplete} className={classes.completeButton}>
                  <b>COMPLETE OBSERVATION</b>
                </Button>
              </Grid>
            )} */}
          </Grid>
        </Card>
      </div>
    );
  }
}

ResultsDashboard.propTypes = {
  //magic8: PropTypes.string.isRequired,
  //color: PropTypes.string.isRequired,
  //infoDisplay: PropTypes.object.isRequired,
};

//const DashboardWithRouter = withRouter(connect(null, {resetTransitionTime, emptyClimateStack, deleteAllCenters})(Dashboard));
export default withStyles(styles)(ResultsDashboard);