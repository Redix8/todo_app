import React, { Component } from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid'

import Typography from '@material-ui/core/Typography'
import { Paper } from '../node_modules/@material-ui/core';
import TodoCard from './components/TodoCard'
import DoneCard from './components/DoneCard'
import AddTodo from './components/AddTodo'

class App extends Component {
  id = 0
  state ={
    todoInfo:[],
    doneInfo:[],
  }
  componentDidMount=()=>{
    if(localStorage.state){
      this.setState(JSON.parse(localStorage.state))
    }

    this.setState({time:Date.now()})
    setInterval(()=>{
      this.setState({
        time: Date.now()
      })
    },60000)    
  }
  componentDidUpdate=()=>{
    localStorage.state = JSON.stringify(this.state)    
  }

  handleCreate =(data)=>{
    const {todoInfo} = this.state
    this.setState({
      todoInfo: todoInfo.concat({id: this.id++, ...data})
    })    
  }
  handleRemove=(id, key)=>{
    const info = this.state[key]
    this.setState({
      [key]: info.filter(info=> info.id !== id)
    })
  }
  handleUpdate=(id, data)=>{
    const {todoInfo} = this.state
    this.setState({
      todoInfo: todoInfo.map(
        info => id === info.id
        ?{ ...info, ...data}
        : info
      )
    })
  }
  handleDone=(id)=>{
    const {todoInfo, doneInfo} = this.state
    this.setState({
      todoInfo: todoInfo.filter(info=> info.id !== id),
      doneInfo: doneInfo.concat(todoInfo.filter(info=> info.id === id))
    })
  }
  handleMove=(id, key)=>{
    let {todoInfo} = this.state
    let idx = todoInfo.findIndex(info=>id===info.id)
    let tmp = todoInfo[idx]
    
    if (key==='Up'){
      if (0<idx){
        todoInfo[idx]=todoInfo[idx-1]
        todoInfo[idx-1]=tmp
      }
    }else{
      if(idx+1<todoInfo.length){
        todoInfo[idx]=todoInfo[idx+1]
        todoInfo[idx+1]=tmp
      }        
    }
    this.setState({todoInfo})    
  }

  render() {
    const todoData=this.state.todoInfo    
    const listTodo = todoData.map((data, idx)=>{
      let color = 'default'
      const deadline = new Date(data.deadline).getTime()

      if (deadline < this.state.time){
        color='#FF8A80'        
      }
      return(
        <TodoCard 
          key={data.id} 
          info={data}
          idx={idx}
          color={color}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
          onDone={this.handleDone}
          onMove={this.handleMove}          
          />
      )
    })
  
    const doneData=this.state.doneInfo
    const listDone = doneData.map(data=>(
      <DoneCard 
        key={data.id}
        info={data}
        onRemove={this.handleRemove}
      />
    ))
    

    return (
      <Grid container direction='column' spacing={24}>
        <Grid item>        
          <Typography variant="h1" align="center">
            To Do List
          </Typography>
        </Grid>        

        <Grid container item spacing={16} xs={12} alignItems='flex-start'>
          <Grid container item xs={7} spacing={16}>
            <Grid item xs={12}>
              <Paper>
                <Grid container>
                  <Grid item xs={11}>
                    <Typography align='center' variant='h3'>                
                        TODO
                    </Typography>
                  </Grid>
                  <Grid item>
                    <AddTodo onCreate={this.handleCreate}/>
                  </Grid>
                </Grid>
              </Paper>
              
            </Grid>
            {listTodo}
                        
          </Grid>
  
          <Grid container item xs={5} spacing={16}>
            <Grid item xs={12}>
              <Paper>
                <Typography align='center' variant='h3'>
                  DONE
                </Typography>
              </Paper>
            </Grid>
            {listDone}
          </Grid>

        </Grid>
      </Grid>
    );
  }
}

export default App;
