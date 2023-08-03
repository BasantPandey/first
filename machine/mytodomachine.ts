import { Content } from "next/font/google";
import { type } from "os";
import { actions, assign, createMachine } from "xstate";
export const todoMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FUDoAyqCGEAlgHZQAEAKuqrAMQbFiYkBuqA1k2hjvkaZWqwErVAGM8yQqmIBtAAwBdBYsSgADjUJSZakAA9EAWgCMAZgBsmACwXrJi2YDsATifWArJ48AaEAE9jEw9MAA4XO3cXa3kPFxN7UIBfJL9uLFwCEnIqDDowACcC1ALMdQAbSQAzEoBbTHTeLIFcmhFiNgkdOSUVPU1YbWliPUMEM1CAJkx3MxN4+Qt5YOsnP0CEI0mnExsl5bMXDw8LJ3lrFLTqTFbYMkyISFoAYQKwSTAyRgB3PqQQAZDXT-MbHTAmWKTRbRDwmbYWXwBRDmJyYDyTaLLDxOVxODxmS4gRqvd5SAQ-MiNADKAAtUN9smQagVamQSOoAK7IWgAMTqZAAksROcgyGIaXhSJA-hotN1RogzJ5MAjJnCMWZJpNDmskQhPC4VRNYi4XPJ5HjrJMUqkQMR0HA9Ol+nLhgrNvNdi4zNjLKaXKF5AHJutjD7QpgYRYphYjqdNYTGg9GbcXYN5SCgtYzJGfU4-abA8HQ5tJhYrO4odrJrYPPJAxdbY1bvc+JA00CRpmPbFMDXbBbsaFQuqS+YrJNQtjlo4ESZK4nrsmBOk7gBRIoldv-QEZ0BjGKGqFTSfnc3oxYlow+zBmesj+bRHFQhKLngkySMinOneu4H7xAMVRVV1W9LUdRLaMbAiWJzimNxY2SJtrg-MlyG-a5aXpRlmVZdkuQ7PcDEQaMc1NK0pwcLx6zHLxI1CJU6zNKYrXka0bSAA */
    id: "todo",
    tsTypes: {} as import("./mytodomachine.typegen").Typegen0,
    schema: {
      services: {} as {
        loadTodos: {
          data: string[];
        };
        },
        events: {} as {
            type: 'Create new';
        } | {
            type: 'Form input changed';
            value: string;
        }
    },
    context: {
      todos: [] as string[],
      createNewTodoFormInput: "",
      errorMessage: undefined as string | undefined,
    },
    initial: "Loading Todos",
    states: {
      "Loading Todos": {
        invoke: {
          src: "loadTodos",
          onDone: [
            {
              target: "Todos Loaded",
              actions: "assigntodosToContext",
            },
          ],
          onError: [
            {
              target: "Loading todos Errored",
              actions: "assignErrorToContext",
            },
          ],
        },
      },

      "Todos Loaded": {
        on: {
          "Create new": "Creating new todo",
        },
      },

      "Loading todos Errored": {},
      "Creating new todo": {
        initial: "Showing form input",
        states: {
          "Showing form input": {
            on: {
              "Form input changed": {
                actions: "assignFromInputToContext",
              },
            },
          },
        },
      },
    },
  },
  {
    actions: {
      assigntodosToContext: assign((context, event) => {
        return {
          todos: event.data,
        };
      }),
      assignErrorToContext: assign((context, event) => {
        return {
          errorMessage: (event.data as Error).message,
        };
      }),
          assignFromInputToContext: assign((context, event) => {
              return {
                  createNewTodoFormInput: event.value
              };
      })
    },
  }
);
