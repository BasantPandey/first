import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useMachine } from '@xstate/react'
import { myMachine } from '@/machine/myfistmachine'
import { todoMachine } from '@/machine/mytodomachine'
import { Itodos } from '@/machine/todoItems'
import { Guid } from 'guid-typescript'
const inter = Inter({ subsets: ['latin'] })

const apiBaseUrl = 'https://hungry-ray-pinafore.cyclic.cloud';

// Make the `request` function generic
// to specify the return data type:
function request<TResponse>(
  url: string,
  // `RequestInit` is a type for configuring 
  // a `fetch` request. By default, an empty object.
  config: RequestInit = {}
   
// This function is async, it will return a Promise:
): Promise<TResponse> {
    
  // Inside, we call the `fetch` function with 
  // a URL and config given:
  return fetch(url, config)
    // When got a response call a `json` method on it
    .then((response) => response.json())
    // and return the result data.
    .then((data) => data as TResponse);
    
    // We also can use some post-response
    // data-transformations in the last `then` clause.
}


export default function Home() {
   const [state, send] = useMachine(todoMachine, {
    services: {
      loadTodos: async () => {
       return await request<Itodos[]>(`${apiBaseUrl}/posts`);
      },
       saveTodo: async (context, event) => { 
         await request<void>(`${apiBaseUrl}/posts`, {
           method: 'POST',
           body: JSON.stringify(
             { 
             id:  Guid.create().toString(), 
             title: context.createNewTodoFormInput,
             completed:true
           }),
           headers: {
             'Content-type': 'application/json; charset=UTF-8',
           }
         }
      );
       // todos.add(context.createNewTodoFormInput);
      },
       deleteTodo: async (context, event) => {
         const delUrl = `${apiBaseUrl}/posts/${event.id}`;
         await request<void>(delUrl, {
           method: 'DELETE',
           headers: {
             "Access-Control-Allow-Origin":"*"
           }
         });
       }
    },
  });

  return (
    <div>
      <pre>{JSON.stringify(state.value)}</pre>
      <pre>{JSON.stringify(state.context)}</pre>
      <div>
        {state.matches("Todos Loaded") && (
          <>
            {state.context.todos.map((todo) => (
              <div
                key={todo.id.toString()}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <p>{todo.title}</p>
                <button
                  onClick={() => {
                    send({
                      type: "Delete",
                      id:todo.id,
                    });
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </>
        )}
        {state.matches("Todos Loaded") && (
          <button
            onClick={() => {
              send({
                type: "Create new",
              });
            }}
          >
            Create new
          </button>
        )}
        {state.matches("Deleting todo errored") && (
          <>
            <p>Something went wrong: {state.context.errorMessage}</p>
            <button
              onClick={() => {
                send({
                  type: "Speed up",
                });
              }}
            >
              Go back to list
            </button>
          </>
        )}
        {state.matches("Creating new todo.Showing form input") && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send({
                type: "Submit",
              });
            }}
          >
            <input
              onChange={(e) => {
                send({
                  type: "Form input changed",
                  value: e.target.value,
                });
              }}
            ></input>
          </form>
        )}
      </div>
    </div>
  );
} 
