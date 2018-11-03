import React, { Component } from 'react'
import { IconButton, Dialog, DialogContent, TextField, DialogActions, Button } from '../../node_modules/@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircleOutline'

export default class AddTodo extends Component {
    state={
        open:false,
        title:'',
        contents:'',
        deadline:'',
    }

    handleClickOpen = () =>{
        this.setState({open:true})
    }

    handleClose=()=>{
        this.setState({open:false})
    }

    setTitleValue=(evt)=>{
        this.setState({title:evt.target.value})
    }
    setContentsValue=(evt)=>{
        this.setState({contents:evt.target.value})
    }
    setDeadlineValue=(evt)=>{
        this.setState({deadline:evt.target.value})
    }
    submitData=()=>{
        this.props.onCreate(this.state)
        this.setState({
            open:false,
            title:'',
            contents:'',
            deadline:'',
        })
    }

  render() {
    return (
      <div>
        <IconButton onClick={this.handleClickOpen}>
          <AddIcon/>
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogContent>
              <TextField
                label='Title'
                variant='outlined'
                fullWidth
                margin='dense'
                required
                onChange={this.setTitleValue}
              />
              <TextField
                label='Contents'
                multiline
                rows='4'
                variant='outlined'
                fullWidth
                margin='dense'
                required
                onChange={this.setContentsValue}
              />              
              <TextField
                label='Deadline'                
                type='datetime-local'
                variant='outlined'
                margin='dense'
                defaultValue='2010-01-01T00:00'
                onChange={this.setDeadlineValue}
               />
           </DialogContent>
           <DialogActions>
               <Button onClick={this.handleClose}>
                   Cancel
                </Button>
               <Button onClick={this.submitData}>
                   OK
                </Button>
            </DialogActions>
        </Dialog>
      </div>
    )
  }
}
