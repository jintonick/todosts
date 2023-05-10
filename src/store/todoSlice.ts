import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[];
    status: string | null;
    error: string | null;
}

export const fetchTodos = createAsyncThunk(
    'todo/fetchTodos',
    async function() {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
        const data = await response.json();
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
        addTodo: (state, action: PayloadAction<{text: string}>) => {
            state.todos.push({
              id: new Date().toISOString(),
              text: action.payload.text,
              completed: false,
            });
        },
        toggleComplete: (state, action: PayloadAction<{id: string}>) => {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload.id);
            if (toggledTodo) {
                toggledTodo.completed = !toggledTodo.completed;
            }
        },
        removeTodo: (state, action: PayloadAction<{id: string}>) => {
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
        .addCase(fetchTodos.rejected, (state, action) => {
            state.status = 'rejected';
        });
    }
});

export const { addTodo, toggleComplete, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;