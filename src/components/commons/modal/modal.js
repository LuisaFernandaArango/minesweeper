import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types"

//components material ui
import { Container, Typography } from "@material-ui/core"
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      textAlign: "center",
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const ModalComponent = ({open, handleClose, title, description}) => {
    const classes = useStyles();
   
    return (
    <Container className={classes.root}>
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Typography variant="h3" color="primary" >{title}</Typography> 
            <Typography variant="body1" color="textPrimary">{description}</Typography>
          </div>
        </Fade>
      </Modal>
    </Container>
  )
}

ModalComponent.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    title : PropTypes.string.isRequired,
    description : PropTypes.string.isRequired,
}

export default ModalComponent
