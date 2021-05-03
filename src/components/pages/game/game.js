import React, { useEffect, useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Container } from "@material-ui/core"
import { connect } from "react-redux";
import PropTypes from "prop-types"

//components
import Modal from "../../commons/modal/modal"
import Scoreboard from "./components/scoreboard"
import Table from "./components/table"

//actions
import { generalActions } from "../../../store/game/gameSlice"

const useStyles = makeStyles(() => ({
  root: {
   
  },
}))

const Game = ({stateGeneral, resetGame}) => {
  const classes = useStyles()
  const [openModal, setopenModal] = useState(false)
  const [endGame, setEndGame] = useState(false);

  const updateGame = stateGame => setEndGame(stateGame);

  useEffect(() => {
    if(endGame === 'gameOver' || endGame === 'youWin'){    
      setopenModal(true)
    }
  }, [endGame])

  const handleCloseModal = () =>  { 
    setopenModal(false);
    window.location.reload();
  }

  return (
    <Container className={classes.root}>
       <Container>
          <Scoreboard />
          <Table
            tableRows={stateGeneral.rows}
            tableCols={stateGeneral.cols}
            totalMines={stateGeneral.mines}
            endGame={updateGame}
          />     
          <Modal open={openModal} handleClose={handleCloseModal} title={endGame === 'gameOver'? "Game Over": "Congratulations"} description={endGame === 'gameOver'? "Try again": "You win the game"}/> 
      </Container>
    </Container>
  )
}

Game.propTypes = {
  resetGame: PropTypes.func.isRequired,
}

const mapStateToProps = ({ game }) => ({
  flags : game.numFlags
})

const mapDispatchToProps = (dispatch) => ({
  resetGame : () =>
    dispatch(generalActions.resetGame()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Game)
