import React, { Component } from 'react';
import TodoList from '../components/TodoList';
import '../styles/ToDo.css';

class ToDo extends Component {
    constructor(props) {
        super(props);
        this.state = {
           toDoList: [],
           completed: [],
           itemToBeAdded: "",
        }
        this.addItem = this.addItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeFunc = this.removeFunc.bind(this);
    }
    handleChange = (e) => {
            this.setState({
                itemToBeAdded: e.target.value
            })
        e.preventDefault();
    } 
    addItem = (e) =>  {
        e.preventDefault();
        if(this.state.itemToBeAdded.trim() === "" || typeof this.state.itemToBeAdded === 'undefined'){
            alert('Please enter an item to add to ToDo list.');
            this.setState({
                itemToBeAdded: "",
            });
        }else{
            var val = this.state.itemToBeAdded.trim();
            var current = this.state.toDoList;
            current.unshift(val);
            this.setState({
                toDoList: current,
                itemToBeAdded: "",
            });
        }
    }
    removeFunc = (ele, id) => {
        var current = this.state.toDoList;
        var completeItem = current[id];
        var completed = this.state.completed
        current.splice(id, 1);
        completed.unshift(completeItem);
        this.setState({
            toDoList: current,
            completed: completed,
        });
        
    }
  render() {
    var plural = (this.state.toDoList.length === 1) ? false : true;
    return (
      <div>
       <h1>Plan your day!</h1> 
       <form onSubmit={this.addItem}>
           <input type="text" name="itemToBeAdded" className="todoInput" value={this.state.itemToBeAdded} placeholder="Add an item to TODo list" onChange={this.handleChange} autoFocus />
           <input type ="submit" name="Add" className="addItem" />
       </form>
       <h3>Status: <strong>{this.state.toDoList.length}</strong>{(plural) ? " items" : " item" } left!</h3>
       {(this.state.toDoList.length > 0) ? <TodoList list={this.state.toDoList} completed={this.state.completed} removeFunc={this.removeFunc} /> : null}
      </div>
    );
  }
}

export default ToDo;
