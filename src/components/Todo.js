import React, { useState, useEffect } from 'react';
import axios from 'axios';

const todo = (props) => {
    const [todoName, setTodoName] = useState('');
    const [todoList, setTodoList] = useState([]);

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

                setTodoList(todos);
            });

        // clean up??
        return () => {
            console.log('Cleanup');
        };
    }, []); 
    // if dont have a second argument, it will run everytime the component gets updated
    //if used [todoName], the use effect function will run whenever todoName is changed
    // if provided by [], it runs only once acting like componentDidMount()

    const mouseMoveHandler = (evt) => {
        console.log(evt.clientX, evt.clientY);
    };

    useEffect(() => {
        document.addEventListener('mousemove', mouseMoveHandler);

        // clean up to remove event listener 
        return () => {
            document.removeEventListener('mousemove', mouseMoveHandler);
        };
    }, []);

    // NO AUTOMATIC MERGE
    // const [todoState, setTodoState] = useState({
    //     userInput: '',
    //     todoList: []
    // });

    const onTodoNameHandler = (evt) => {
        setTodoName(evt.target.value);
        // setTodoState({
        //     ...todoState,
        //     userInput: evt.target.value
        // });
    };

    const todoAddHandler = () => {
        setTodoList([...todoList, todoName]);
        setTodoName('');
        // setTodoState({
        //     ...todoState,
        //     userInput: '',
        // //     todoList: [...todoState.todoList, todoState.userInput]
        // });
        axios.post('https://practice-project-6130e.firebaseio.com/todos.json', { name: todoName })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };

    return <React.Fragment>
        <input type="text" placeholder="Enter Todo" onChange={onTodoNameHandler} value={todoName} />
        <button type="button" onClick={todoAddHandler}>Add</button>

        <ul>
            {todoList.map((m,i) => <li key={m.id}>{m.name}</li>)}
        </ul>
    </React.Fragment>
};


export default todo;