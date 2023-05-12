import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import  axios  from 'axios';

interface Todo {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

interface TodoState {
    todos: Todo[];
    status: string | null;
    error: string | null;
}

export interface TodoReqest {
    userId: number,
    title: string,
    completed: boolean
}

export const fetchTodos = createAsyncThunk(
    'todo/fetchTodos',
    async function() {
        const response = await axios.get('http://localhost:3004/todos')
        const data = await response.data;
        return data;
    }
)

export const removeTodosThunk = createAsyncThunk<Todo[], number>(
    'todo/fetchTodos',
    async function(id) {
        const {data} = await axios.delete('http://localhost:3004/todos/' + id.toString())
        return data;
    }
)

export const addTodosThunk = createAsyncThunk<Todo, TodoReqest>(
    'todo/addTODO',
    async function(body) {
        const response = await axios.post('http://localhost:3004/todos/', body);
        const { data } = response;
        return data;
    }
)


const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null,
    } as TodoState,
    reducers: {
        addTodo: (state, {payload}: { payload: Todo }) => {
            state.todos.push(payload);
        },
        toggleComplete: (state, action: PayloadAction<{id: number}>) => {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload.id);
            if (toggledTodo) {
                toggledTodo.completed = !toggledTodo.completed;
            }
        },
        removeTodo: (state, action: PayloadAction<{id: number}>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(fetchTodos.fulfilled, (state, action) => {
            state.status = 'resolved';
            state.todos = action.payload;
        })
        .addCase(addTodosThunk.fulfilled, (state, { payload } : { payload: Todo }) => {
            console.log(payload);
            state.todos.push(payload);
          })
        .addCase(fetchTodos.rejected, (state, action) => {
            state.status = 'rejected';
        });
    }
});

export const { addTodo, toggleComplete, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;