import React, {Component} from 'react'
import Grid from '@material-ui/core/Grid'
import {Card, CardContent, CardHeader, CardActions} from '../../node_modules/@material-ui/core';
import IconButton from '@material-ui/core/IconButton'
import {Delete, Done, KeyboardArrowUp, KeyboardArrowDown} from '@material-ui/icons'
import Typography from '@material-ui/core/Typography'
import EditTodo from './EditTodo'

export default class TodoCard extends Component {
    static defaultProps ={
        info:{
            id:0,
            title:'',
            contents:'',
            deadline:'',
        }
    }
    handleRemove=()=>{
        const {info, onRemove} = this.props
        onRemove(info.id, "todoInfo")
    }
    handleUpdate=(data)=>{
        const {info, onUpdate} = this.props
        onUpdate(info.id, data)
    }
    handleDone=()=>{
        const {info, onDone} = this.props
        onDone(info.id)
    }
    handleMoveUP=()=>{
        const {info, onMove} = this.props
        onMove(info.id, 'Up')
    }
    handleMoveDown=()=>{
        const {info, onMove} = this.props
        onMove(info.id, 'Down')
    }
    render() {        
        const {title, contents, deadline} = this.props.info
        return (
            <Grid item xs={12}>
                <Card style={{backgroundColor:this.props.color}}>
                    <Grid container>
                        <Grid container item xs={4} alignItems='center'>

                            <Grid item>
                                <Grid container item direction={"column"}>
                                    <Grid item>
                                        <IconButton onClick={this.handleMoveUP}>
                                            <KeyboardArrowUp/>
                                        </IconButton>
                                    </Grid>
                                    <Grid item>
                                        <IconButton onClick={this.handleMoveDown}>
                                            <KeyboardArrowDown/>
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item>
                                <CardContent>                                    
                                    <Typography align='center' variant='h5'>
                                        {this.props.idx+1}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <EditTodo onUpdate={this.handleUpdate} data={this.props.info}/>
                                    <IconButton onClick={this.handleDone}>
                                        <Done fontSize='small'/>
                                    </IconButton>
                                    <IconButton onClick={this.handleRemove}>
                                        <Delete fontSize='small'/>
                                    </IconButton>
                                </CardActions>
                            </Grid>

                        </Grid>
                        <Grid item xs={8}>
                            <CardHeader title={title}/>
                            <CardContent>
                                <Typography>
                                    {contents.split('\n').map(txt => <>{txt}<br/></>)}                               
                                </Typography>
                                <Typography>
                                    Deadline : {deadline}
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
        )
    }
}