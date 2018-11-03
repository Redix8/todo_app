import React, { Component } from 'react'
import { Grid, Card, CardHeader, CardContent, Typography, IconButton } from '../../node_modules/@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete'
export default class DoneCard extends Component {
    static defaultProps={
        info:{
            title:'',
            contents:''
        }
    }
    handleRemove=()=>{
        const {info, onRemove} = this.props
        onRemove(info.id, "doneInfo")
    }
  render() {
      const {title, contents} = this.props.info
    return (
        <Grid item xs={12}>        
            <Card>
                <CardHeader 
                    title = {title}
                    action = {
                        <IconButton onClick={this.handleRemove}>
                            <DeleteIcon/>
                        </IconButton>                                                    
                    }
                />
                <CardContent>
                    <Typography>
                        {contents}
                    </Typography>
                </CardContent>
            </Card>
      
        </Grid>
    )
  }
}
