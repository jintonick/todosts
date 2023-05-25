import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Todo {
    userId: number,
    id: number,
    title: string,
    completed: boolean
}

export const todoApi = createApi({
  reducerPath: 'todoApi',
  tagTypes: ['TodosItems'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3004/' }),
  endpoints: (builder) => ({
    fetchTodos: builder.query<Todo[], void>({
      query: () => 'todos',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'TodosItems' as const, id })),
              { type: 'TodosItems', id: 'LIST' },
            ]
          : [{ type: 'TodosItems', id: 'LIST' }],
      }),
    addTodo: builder.mutation<Todo, Partial<Todo>>({
      query: (newTodo) => ({
        url: 'todos',
        method: 'POST',
        body: newTodo,
      }),
      invalidatesTags: [{type: 'TodosItems', id: 'LIST'}]
    }),
    removeTodo: builder.mutation<void, number>({
      query: (todoId) => ({
        url: `todos/${todoId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{type: 'TodosItems', id: 'LIST'}]
    }),
  }),
});

export const {
  useFetchTodosQuery,
  useAddTodoMutation,
  useRemoveTodoMutation,
} = todoApi;