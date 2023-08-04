import { Content } from "next/font/google";
import { type } from "os";
import { actions, assign, createMachine } from "xstate";
import { Itodos } from "./todoItems";
import { Guid } from "guid-typescript";
export const todoMachine = 
     /** @xstate-layout N4IgpgJg5mDOIC5QBUD2FUAIC2BDAxgBYCWAdmAHQAyquEZUmaGsAxBuRWQG6oDWlZljxEylGnQZN0qWAh6p8uAC7FUpANoAGALradiUAAdZxVesMgAHogBMW2wDYKAFgCMADg8BOFwHY3LXc3AFYAGhAAT0QAWkDHZ1sPNxctAGZ-b3StNwBfXIihHAISTgl6UkYhNg5KBQEKIpFS8VoKqpk5BSVzTV0NNwMkEBNYMzVSSxsELMT-ELSPEK1vWzTvcKjY0Mc0ii0PIJCkkMd-UPzCmWLRMrapatYwACdn1GeKIwAbFQAzd+wjWuzTE1HulWkLHkpF4PQm+n0llG4wsw2mXhCFCSfkc9jStn8tm8Hgi0QQcUc3mcLg2KRpuJci1slxATRKoOqmHKkFYAGFnmAVGBMOQAO6I4bI3pTRCzLHzRbLVbrTZkuKnPYHI4nM4BEIstm3QSdLltHkAETAXzAyjAEuMpmlaNlWjmfgWSxWaw2pO2Gv2hxcxyWuouBVZwPZnH5gtUELFmGUMgoAGVCKhRVJ-s9sJgyEYAK7KVgAMQBedIheUmCIuEqkHtI0dExl5O87v2aWWSXcOK0K195JCfi0FA8fhpSxCIRSfgJBsjRooMZUUgTSYwqfTmYh2dz+aLrBTBYARtgzI2pS3neTbJ59lllviR0S-N5BzFDqOgm4RxsXJ6NILhgNwtMuAqrvGYCiomyYprg3BSBuqDsOodQwvwxogSC0YQXGjDrnBCFITI0Kwqu6gIroSLNqioDTHKBLuoqXoqh+OyaoGwanOc+rhoaYErvhIrQbBm7wYhELIU8rzvJ8PzKHuQLYVGlBCWuonIamxFSaR3QUX0ejUZKtGTDeMQuESFBuJ4vbTm4RLeO+Wzkm4jiYv+Hh3hkOQ0l2wHCKpFCWtawnSbUXAYQ0AmgiFNokRgZGKAZVFDA6YxOvRLpuh6Sreqqfq7AG2ohrxAWgbFVrxbpGAyW8HzfH8ALKYFS5xWFekYXClH9MZ6UomZWUIKEaR7L+XYOB4uoHGk7GUn4rjeD5WS+E4QblThlDtQlWAvPVPIpkYYCQJgBZGJepmtoxCqesqPoueqRVakGOplfxi5gdtNW7bJAoQKwViwMoQoULgvy2s8AAUtjLFoACUrAxZwX2MMhmB7e8DZ9U2GXXkNjILbY7pJI4KRuf4JIPcqFAJOTMMjVSLj5OGpDoHAlhI2ANG43R1jbL2D7tozSxpA5BWuX4HguBQxJE0cTnEu6G1BeUDydNzA2tmsosyxOLiOHO9i-n47EuPrFCS24aTuaN9jDnxVwqUunLchAGuZXzrkpBQKrJDkUuOActi2OxMM06sSypGsXkrGkytLqr32wOjv2QO7eOe8Obg+44hxeatHi2x+7bWUEgdeDi+LLH48eCXhGkwch6e89McTW94gtvmcItix+FcUAsgRaMsISWUT3i16C6lQY3cHblm5YHsozeDZ7MS21ivihA4qxEybD1pJLWIZABg+i-2NfvU7dexg3YmoNpkmozIK+tm3d6d8Lg8w3NHj7CExIQiHCYm5Nyk9kZVQ6hgV+N5tajilktFIuxg5TQ-F2Wwx9-CS3SKPSkTMr6tU+pAnaKd9puxMjzVe0xfxOQHk5UmxItQG33mqQB+wcFLTWABHIfF8hAA */
  createMachine(
    {
      context: {
        todos: [] as Itodos[],
        errorMessage: undefined as string | undefined,
        createNewTodoFormInput: "",
      },
      tsTypes: {} as import("./mytodomachine.typegen").Typegen0,
      schema: {
        services: {} as {
          loadTodos: {
            data: Itodos[];
          };
          saveTodo: {
            data: void;
          };
          deleteTodo: {
            data: void;
          };
        },
        events: {} as
          | {
              type: "Create new";
            }
          | {
              type: "Form input changed";
              value: string;
            }
          | {
              type: "Submit";
            }
          | {
              type: "Delete";
              id: string;
            }
          | {
              type: "Speed up";
            },
      },
      id: "Todo machine",
      initial: "Loading Todos",
      states: {
        "Loading Todos": {
          invoke: {
            src: "loadTodos",
            onDone: [
              {
                actions: "assignTodosToContext",
                cond: "Has todos",
                target: "Todos Loaded",
              },
              {
                target: "Creating new todo",
              },
            ],
            onError: [
              {
                actions: "assignErrorToContext",
                target: "Loading todos errored",
              },
            ],
          },
        },
        "Todos Loaded": {
          on: {
            "Create new": {
              target: "Creating new todo",
            },
            Delete: {
              target: "Deleting todo",
            },
          },
        },
        "Loading todos errored": {},
        "Creating new todo": {
          initial: "Showing form input",
          states: {
            "Showing form input": {
              on: {
                "Form input changed": {
                  actions: "assignFormInputToContext",
                },
                Submit: {
                  target: "Saving todo",
                },
              },
            },
            "Saving todo": {
              invoke: {
                src: "saveTodo",
                onDone: [
                  {
                    target: "#Todo machine.Loading Todos",
                  },
                ],
                onError: [
                  {
                    actions: "assignErrorToContext",
                    target: "Showing form input",
                  },
                ],
              },
            },
          },
        },
        "Deleting todo": {
          invoke: {
            src: "deleteTodo",
            onDone: [
              {
                target: "Loading Todos",
              },
            ],
            onError: [
              {
                actions: "assignErrorToContext",
                target: "Deleting todo errored",
              },
            ],
          },
        },
        "Deleting todo errored": {
          after: {
            "2500": {
              target: "Todos Loaded",
            },
          },
          on: {
            "Speed up": {
              target: "Todos Loaded",
            },
          },
        },
      },
    },
    {
      guards: {
        "Has todos": (context, event) => {
          return event.data.length > 0;
        },
      },
      actions: {
        assignTodosToContext: assign((context, event) => {
          return {
            todos: event.data,
          };
        }),
        assignErrorToContext: assign((context, event) => {
          return {
            errorMessage: (event.data as Error).message,
          };
        }),
        assignFormInputToContext: assign((context, event) => {
          return {
            createNewTodoFormInput: event.value,
          };
        }),
      },
    },
  );