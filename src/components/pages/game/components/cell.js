import React, { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { connect } from "react-redux";
import PropTypes from "prop-types"
import clsx from "clsx"

//actions
import { generalActions } from "../../../../store/game/gameSlice"

//material ui components
import { Typography } from "@material-ui/core";
import FlagIcon from '@material-ui/icons/Flag';
import BugReportIcon from '@material-ui/icons/BugReport';


const useStyles = makeStyles(() => ({
  root: {
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  cell: {
    border: "1px solid #a7a8c9",
    cursor: "pointer",
    "&.cellOpen .cellText":{
      visibility: "visible",
      background: "white",
      textAlign: "center",
    },
    "&.withMine":{
      background : "#eee71b",
      position: "relative"
    },
    "&.flag": {
      background : "#b5b5d1",
      position: "relative"
    },
  },
  cellText:{
    visibility: "hidden",
    width: 35,
    height: 38,
    fontSize: 22,
  },
  flagIcon: {
    position: "absolute",
    top: 6,
    left: 6,
  },
  mine: {
    position: "absolute",
    top: 6,
    left: 6,
  }
}))

const Cell = ({maxRows, cell, maxCols, totalMines, table, endGame, setNumFlags, flags, mines, createNewGame }) => {
  const classes = useStyles()
  const [withDecorator, setWithDecorator] = useState(cell.withDecorator)
  const [opened,  setOpened] = useState(false)
  const [cellsOpened, setCellsOpened] = useState(0)
  const [withMine, setWithMine] = useState(false)
  const [near, setNear] = useState(cell.near)
  const [totalCellsWithoutMines] = useState(maxRows * maxCols - totalMines)
  const [cellClasses, setConstante] = useState()
 
 
  useEffect(() => {  
      setOpened(false)
      setWithMine(false)
      setWithDecorator(0)
  }, [mines, createNewGame])

  const addClassesName = () => setConstante ( opened && withMine ? "withMine" : opened ? "cellOpen" : withDecorator === 1 ? "flag" : "")
 
  useEffect(() =>{
    addClassesName()
  },[withMine, opened, withDecorator])

  const setDecorator = (event) => { 
    event.preventDefault();
    if (!opened && flags>0) {
      setWithDecorator(1)
      setNumFlags(flags-1)
    }
  }

  const getNearMines = () => {
    const theCell = cell;
    const totalRows = maxRows;
    const totalCols = maxCols;
    const theTable = table;
    let nearMines = 0;
    for(let row = -1; row <= 1; row++){
      for(let col = -1; col <= 1; col++){    
        if (!(row === 0 && col === 0)) {     
          if(theCell.y + row >= 0 && theCell.x + col >= 0 && theCell.y + row < totalRows && theCell.x + col < totalCols && theTable[theCell.y + row][theCell.x + col].withMine){
            nearMines ++;
          }
        }
      }
    }
    setNear(nearMines)
  }

  const revealCell =(event) => {
    if (!opened) {
        setOpened(true)
        setCellsOpened(cellsOpened + 1)
      if (cell.withMine) {
        setWithMine(true)
        endGame('gameOver')
        return;
      }
      if (cellsOpened === totalCellsWithoutMines) {
        endGame('youWin')
        return;
      }
      getNearMines();
      if(withDecorator === 1 && flags >= 0){
        setNumFlags(flags+1)
      }
      if (withDecorator > 0) {
        setWithDecorator(0);
      }
    }
  }
  
  return (
    <td className={clsx(classes.cell, cellClasses)}  onClick={revealCell} onContextMenu={setDecorator}>
        <Typography className={clsx(classes.cellText, 'cellText')}>{near}</Typography>
        {withDecorator === 1 && <FlagIcon className={classes.flagIcon} color="primary"/>}
        {withMine && <BugReportIcon className={classes.mine} color="secondary" />}
    </td>
  )
}

Cell.propTypes = {
  maxRows: PropTypes.number.isRequired,
  cell: PropTypes.objectOf(PropTypes.any).isRequired,
  maxCols: PropTypes.number.isRequired,
  totalMines: PropTypes.number.isRequired,
  table: PropTypes.arrayOf(PropTypes.any).isRequired,
  endGame: PropTypes.func.isRequired,
  setNumFlags: PropTypes.func.isRequired,
  flags: PropTypes.number.isRequired,
  mines: PropTypes.number.isRequired,
  createNewGame: PropTypes.bool.isRequired,  
}
  
const mapStateToProps = ({game}) => ({
  flags : game.numFlags,
  mines: game.mines,
  createNewGame: game.createNewGame
})

const mapDispatchToProps = (dispatch) => ({
  setNumFlags: (payload) =>
    dispatch(generalActions.setNumFlags(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Cell)