import { Content } from 'next/font/google';
import { type } from 'os';
import { actions, assign, createMachine } from 'xstate';
export const todoMachine = createMachine({
    /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUDoAyqCGEAlgHZQAEAKuqrAMQbFiYkBuqA1k2hjvkaZWqwErVAGM8yQqmIBtAAwBdBYsSgADjUJSZakAA9EAWgCMAZgBsmACwXrJi2YDsATifWArJ48AaEAE9jEw9MAA4XO3cXa3kPFxN7UIBfJL9uLFwCEnIqDDowACcC1ALMdQAbSQAzEoBbTHTeLIFcmhFiNgkdOSUVPU1YbWliPUMEM1CAJkx3MxN4+Qt5YOsnP0CEI0mnExsl5bMXDw8LJ3lrFNSQYnQ4PXT+rW7RoPjMFzMPJ0sXX9D5FxTdbGT6hd6eCzxOahJweMy2FJpahNfg5ISPQbPJAGILWMzvT7fSF-AFAgLGSYWKzuSbySZmSa2Dzyf4XK6NVqwMiZCCQDFDXTYsamcyYelTRxOWmLc7WYHjDzTNy0hmhRwOBKIkCNHnZMjpLkAUSKJT52IGApGQsQMRcYpZk0mrPksVpFnlRk+mDMLNCJnm0ScUuWbJSQA */
    id: 'todo',
    tsTypes: {} as import("./mytodomachine.typegen").Typegen0,
    schema: {
        services: {} as {
            loadTodos: {
                data: string[];
            }
        } 
    },
    context: {
        todos: [] as string[],
        errorMessage: undefined as string | undefined,
    },
    initial: "Loading Todos",
    states: {
        "Loading Todos": {
            invoke: {
                src: "loadTodos",
                onDone: [{
                    target: 'Todos Loaded',
                    actions:'assigntodosToContext',
                }
                ],
                onError: [{
                    target: 'Loading todos Errored',
                    actions:'assignErrorToContext',
                }]
                 
            }
        },
        "Todos Loaded": {},
       "Loading todos Errored":{}
    }
},
    {
        actions: {
            assigntodosToContext: assign((context, event) => {
                return {
                    todos: event.data
                }
            }),
            assignErrorToContext: assign((context, event) => {
                return {
                    errorMessage:(event.data as Error).message
                }
            })
        }
    }
);

