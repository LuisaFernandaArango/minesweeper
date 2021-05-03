import React from "react";
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from "prop-types"

import Cell from "./cell"

const useStyles = makeStyles(() => ({
  root: {
    height: 'auto',
  },
}))

const Row = ({maxRows, cells, maxCols, totalMines, table, endGame}) => {
  const classes = useStyles()

  const Cells = cells.map((cell, index) => {
    return(
        <Cell
            cell={cell}
            key={index}
            maxRows={maxRows}
            maxCols={maxCols}
            totalMines={totalMines}
            table={table}
            endGame={endGame}
        />
    );
  });

  return (
    <tr className={classes.root}>
        {Cells}
    </tr>
  )
}

Row.propTypes = {
  maxRows: PropTypes.number.isRequired,
  cells: PropTypes.arrayOf(PropTypes.any).isRequired,
  maxCols: PropTypes.number.isRequired,
  totalMines: PropTypes.number.isRequired,
  table: PropTypes.arrayOf(PropTypes.any).isRequired,
  endGame: PropTypes.func.isRequired,
}

export default Row
