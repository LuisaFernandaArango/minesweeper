import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles'
import { connect } from "react-redux"
import PropTypes from "prop-types"

// material ui components
import FlagIcon from '@material-ui/icons/Flag'
import ReplayIcon from '@material-ui/icons/Replay'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Container } from "@material-ui/core"

//actions
import { generalActions } from "../../../../store/game/gameSlice"

//utils
import config from "../../../../utils/config"

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection:"column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 20
  },
  container: {
    width: "40%",
    display: 'flex',
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginTop: 10
  },
  flagContainer: {
    display: "flex",
    alignItems:"center",
  },
  iconFlag: {
    marginRight: 5
  },
}))

const Scoreboard = ({changeLevel, flags, resetGame}) => {
  const classes = useStyles()
  const [level, setLevel] = useState("2")
  const handleChangeLevel = (event) => {
    setLevel(event.target.value);
  };

  const restoreGame = () => {
    resetGame()    
  }
  
  useEffect(()=>{
    changeLevel(level === "1" ? config.level1 : level === "2" ? config.level2 : config.level3)
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level])
   return (
    <Container className={classes.root}>
      <Typography variant="h4"color="primary">Challenge Minesweeper</Typography>
      <div className={classes.container}>
        <FormControl  className={classes.formControl}>
            <InputLabel>Level</InputLabel>
            <Select
                native
                value={level}
                onChange={handleChangeLevel}
                inputProps={{
                    name: 'Level',
                    id: 'select-level',
                }}
            >                
                <option value={1}>Easy</option>
                <option value={2}>Medium</option>
                <option value={3}>Hard</option>
            </Select>
        </FormControl> 
        <div className={classes.flagContainer}>
            <FlagIcon className={classes.iconFlag} color="primary"/> <Typography variant="h6" color="textPrimary" >{flags}</Typography> 
        </div>
        <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<ReplayIcon />}
            onClick={restoreGame}
        >     
            Reset
        </Button>
      </div>        
    </Container>
  )
}
Scoreboard.propTypes = {
    flags: PropTypes.number.isRequired,
    resetGame: PropTypes.func.isRequired,
    changeLevel: PropTypes.func.isRequired,
}
  
const mapStateToProps = ({ game }) => ({
    flags : game.numFlags
})

const mapDispatchToProps = (dispatch) => ({
    changeLevel: (payload) =>
      dispatch(generalActions.changeLevelGame(payload)),
    resetGame : () =>
      dispatch(generalActions.resetGame()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard)
