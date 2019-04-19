import React, { Component } from 'react';
import PropTypes from 'prop-types';
import "../styles/ToDoList.css";

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle: []
        }
        this.showBtn = this.showBtn.bind(this);
        this.hideBtn = this.hideBtn.bind(this);
    }

componentWillMount(){
    var list= this.props.list;
    var toggle = [];
    list.forEach(function(i){
        toggle.push("hide");
    })
    this.setState({toggle});
}

    showBtn(e, index){
        e.preventDefault();
        var toggle = this.state.toggle;
        toggle[index] = "show";
        this.setState({toggle});
    }

    hideBtn(e, index){
        e.preventDefault();
        var toggle = this.state.toggle;
        toggle[index] = "hide";
        this.setState({toggle});
    }

  render() {
      const {list, removeFunc, completed} = this.props;
      const { showBtn, hideBtn} = this;
      const { toggle } = this.state;
    return (
      <div>
       <h3>Your ToDo List</h3> 
       <div className="todoList_container">
        <ul>
                {
                (list).map(function(item, i){
                    return <li key={i} className="listRow" onMouseEnter={(e) => {showBtn(e, i)}} onMouseLeave={(e) => {hideBtn(e, i)}}>
                        <p>{item}</p>
                        <input style={{display: toggle[i] === "show" ? 'block': 'none'}} className="removeItemBtn" type="submit" name="done" value="X" onClick={(e) => {removeFunc(e, i)}}/>
                    </li>
                })
                }
                {
                (completed.length > 0) ?
                    (completed).map(function(item, i){
                        return <li key={i} className="listRowComplete">
                            <p>{item}</p>
                        </li>
                    })
                    : null
                }
            </ul>
       </div>
      </div>
    );
  }
}

TodoList.propTypes = {
    list: PropTypes.arrayOf(PropTypes.string),
    completed: PropTypes.arrayOf(PropTypes.string),
    removeFunc: PropTypes.func
};

export default TodoList;
