import React, { Component } from 'react'
import { IconButton, Dialog, DialogContent, TextField, DialogActions, Button } from '../../node_modules/@material-ui/core';
import EditIcon from '@material-ui/icons/Edit'


export default class EditTodo extends Component {
    state={
        open: false,
        title: '',
        contents:'',
        deadline:'',
    }
    componentDidMount(){
        const {title, contents, deadline} = this.props.data
        this.setState({title, contents, deadline})
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
        this.props.onUpdate(this.state)
        this.setState({
            open:false            
        })
    }

  render() {
      const {title, contents, deadline} = this.props.data      
    return (
      <div>
        <IconButton onClick={this.handleClickOpen}>
            <EditIcon fontSize='small'/>
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
                defaultValue = {title}
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
                defaultValue={contents}
              />              
              <TextField
                label='Deadline'                
                type='datetime-local'
                variant='outlined'
                margin='dense'
                defaultValue= {deadline||'2010-01-01T00:00'}
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
