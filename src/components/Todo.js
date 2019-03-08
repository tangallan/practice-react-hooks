import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';
import axios from 'axios';

import List from './List';

const todo = (props) => {
    // const [todoName, setTodoName] = useState('');
    // const [submittedTodo, setSubmittedTodo] = useState(null);
    // const [todoList, setTodoList] = useState([]);
    const [inputIsValid, setInputIsValid] = useState(false);

    const todoListReducer = (state, action) => {
        switch (action.type) {
            case 'SET':
                return action.payload;
            case 'ADD':
                return state.concat(action.payload);
            case 'REMOVE':
                return state.filter(todo => todo.id !== action.payload.id);
            default:
                return state;
        }
    };

    const [todoList, dispatch] = useReducer(todoListReducer, []);

    const todoInputElRef = useRef();

    // hooks with react internals
    // infiite loop? - runs after every render cycle
    useEffect(() => {
        axios.get('https://practice-project-6130e.firebaseio.com/todos.json')
            .then(res => {
                console.log(res);
                const todoData = res.data;
                let todos = [];
                for(const key in todoData) {
                    todos.push({ id: key, name: todoData[key].name });
                }

                // setTodoList(todos);
                dispatch({ type: 'SET', payload: todos});
            });

        // clean up??
        return () => {
            console.log('Cleanup');
        };
    }, []); 
    // if dont have a second argument, it will run everytime the component gets updated
    //if used [todoName], the use effect function will run whenever todoName is changed
    // if provided by [], it runs only once acting like componentDidMount()

    // const mouseMoveHandler = (evt) => {
    //     console.log(evt.clientX, evt.clientY);
    // };
    // useEffect(() => {
    //     document.addEventListener('mousemove', mouseMoveHandler);

    //     // clean up to remove event listener 
    //     return () => {
    //         document.removeEventListener('mousemove', mouseMoveHandler);
    //     };
    // }, []);

    // useEffect(() => {
    //     if (submittedTodo) {
    //         // setTodoList(todoList.concat(submittedTodo));
    //         dispatch({ type: 'ADD', payload: submittedTodo});
    //     }
    // }, [submittedTodo]);

    // NO AUTOMATIC MERGE
    // const [todoState, setTodoState] = useState({
    //     userInput: '',
    //     todoList: []
    // });

    // const onTodoNameHandler = (evt) => {
    //     setTodoName(evt.target.value);
    //     // setTodoState({
    //     //     ...todoState,
    //     //     userInput: evt.target.value
    //     // });
    // };

    const inputValidationHandler = (evt) => {
        if(evt.target.value.trim() === '') {
            setInputIsValid(false);
        } else {
            setInputIsValid(true);
        }
    };

    const todoAddHandler = () => {
        // setTodoState({
        //     ...todoState,
        //     userInput: '',
        // //     todoList: [...todoState.todoList, todoState.userInput]
        // });
        const todoName = todoInputElRef.current.value;
        axios.post('https://practice-project-6130e.firebaseio.com/todos.json', { name: todoName })
            .then(res => {
                // console.log(res);
                const newTodo = {
                    name: todoName,
                    id: res.data.name
                };
                // setTodoList([...todoList, {
                //     name: todoName,
                //     id: res.data.name
                // }]);
                // setTodoName('');

                // helps with mutliple load insert
                // setSubmittedTodo({
                //     name: todoName,
                //     id: res.data.name
                // });

                // using reducers
                dispatch({ type: 'ADD', payload: newTodo });
                // setTodoName('');
                todoInputElRef.current.value = '';
            })
            .catch(err => {
                console.log(err);
            });
    };

    const todoRemoveHandler = (id) => {
        axios.delete(`https://practice-project-6130e.firebaseio.com/todos/${id}.json`)
            .then((res) => {
                dispatch({ type: 'REMOVE', payload: { id: id }});
            })
            .catch(err => {
                console.log('Failed to delete', err);
            });
    }

    return <React.Fragment>
        <input type="text" placeholder="Enter Todo" 
            // onChange={onTodoNameHandler} value={todoName} 
            onChange={inputValidationHandler}
            ref={todoInputElRef}
            style={{backgroundColor: inputIsValid ? 'transparent': 'red'}}
        />
        <button type="button" onClick={todoAddHandler}>Add</button>

        {/* <ul>
            {todoList.map((m,i) => <li key={m.id} onClick={() => todoRemoveHandler(m.id)}>{m.name}</li>)}
        </ul> */}
        
        {/* all about caching values if input does not value */}
        {/* pass in array to tell react which argument to look for */}
        {useMemo(() => <List todoList={todoList} onClick={todoRemoveHandler} />, [todoList])}
    </React.Fragment>
};


export default todo;