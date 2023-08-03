import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useMachine } from '@xstate/react'
import { myMachine } from '@/machine/myfistmachine'
import { todoMachine } from '@/machine/mytodomachine'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [state, send] = useMachine(todoMachine, {
    services: {
      loadTodos: async () => {
      //  throw new Error('on ho');
        return ['take','out']
      }
    }
  });
  return (
    <>
      <div><pre>
        {JSON.stringify(state.value)}
      </pre>
      </div> 
      <div><pre>
        {JSON.stringify(state.context)}
      </pre>
      </div> 
      <div>
        {state.matches('Todos Loaded') && (
          <button onClick={() => {
            send({
              type:'Create new'
            })
          }}>
            Create New
          </button>
        )}
        {state.matches('Creating new todo.Showing form input') && (
          <input onChange={e => {
            send({
              type: 'Form input changed',
              value: e.target.value
            })
          }} type='text' />
        )}
      </div>
    </>
  )
} 
