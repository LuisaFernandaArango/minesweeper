import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from "prop-types"
import { Container } from "@material-ui/core"

//components
import Game from "./components/pages/game/game"

class App extends Component {
   
  render() {
    return (
      <Container>
        <Game stateGeneral={this.props.generalState}/>
      </Container>
    );
  }
}

App.propTypes = {
  generalState: PropTypes.objectOf(PropTypes.any).isRequired,
}

const mapStateToProps = ({ game }) => ({
  generalState : game
})

export default connect(mapStateToProps)(App)
