import React from "react"
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from "prop-types"

import Row from './row'

const useStyles = makeStyles(() => ({
  root: {
    background: '#F1F1F1',
    margin: "0 auto",
  },
}))

const Table = ({tableRows, tableCols, totalMines, endGame}) => {
  const classes = useStyles()  

  const createTable = (propRow, propCol) => {
      let gameTable = [];
      for(let rowNumber = 0; rowNumber < propRow; rowNumber++){
          gameTable.push([]);
          for(let colNumber = 0; colNumber < propCol; colNumber++){
              gameTable[rowNumber].push({
                  x : colNumber,
                  y : rowNumber,
                  near : 0,
                  opened : false,
                  withMine : false,
                  withDecorator : 0,
              });
          }
      }
      return gameTable;
  }

  const generateMines = (gameTable, propRow, propCol, propMine) => {
    for(let mine = 0; mine < propMine; mine++){
      let cell = gameTable[Math.floor(Math.random()*propRow)][Math.floor(Math.random()*propCol)];
      if(cell.withMine){
        mine--;
      } else {
        cell.withMine = true;
      }
    }
    return gameTable
  }  

  const  generateTable = (propRow, propCol, propMine) => {
      let gameTable = createTable(propRow, propCol);
      const gameTableWithMines = generateMines(gameTable, propRow, propCol, propMine);
      return gameTableWithMines;
  }

  const generatedTable = generateTable(tableRows, tableCols, totalMines);

  const Rows = generatedTable.map((row, index) => {
      return(
        <Row
          cells={row}
          key={index}
          maxRows={tableRows}
          maxCols={tableCols}
          totalMines={totalMines}
          table={generatedTable}
          endGame={endGame}
        />
      );
  });

  return (
      <table className={classes.root}>
        <tbody> 
          {Rows}
        </tbody>
      </table>
  )
}

Table.propTypes = {
  tableRows: PropTypes.number.isRequired,
  tableCols: PropTypes.number.isRequired,
  totalMines: PropTypes.number.isRequired,
  endGame: PropTypes.func.isRequired
}

export default Table
