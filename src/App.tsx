import React, { useMemo, useReducer, useEffect, FC } from 'react';
import { Navigation } from './components/navigation';
import { data } from './components/signature/data'
import styled from 'styled-components';
// @ts-ignore 
import * as bitcoinMessage from 'bitcoinjs-message'


interface ValidatorProps {
  address: string
  signature: string
  validationState: string
}


interface WorkQueueItem {
  id: number
  address: string
  signature: string
  validationState: ValidationState
}

const ValidatorLine = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-left: 2rem;

  @media only screen and (max-width: 1024px) {
      margin-bottom: 1rem;
      display: block;
  }
`

const ValidatorContent = styled.div`
  margin-right: 1rem;
  @media only screen and (max-width: 1024px) {
      overflow-wrap:break-word;
      word-break: break-word;
      display: block;
      margin-bottom: 0.25rem;
  }
`

const ValidIndicator = styled.div<{ validationState: string }>`
  color: ${props => props.validationState === 'valid sig' ? "green" : props.validationState === 'invalid' ? "red" : "grey"};

`

const Content = styled.div`
  font-family: monospace;
  font-size: 0.75rem;
  max-width: 1024px;
`

const PreimageContent = styled.div`
  white-space: pre-line;
  margin: 2rem 0 2rem 2rem;
`

const AppContainer = styled.div`
  margin-bottom: 2rem;
`

const M = `Craig Steven Wright is a liar and a fraud. He doesn't have the keys used to sign this message.

The Lightning Network is a significant achievement. However, we need to continue work on improving on-chain capacity.

Unfortunately, the solution is not to just change a constant in the code or to allow powerful participants to force out others.

We are all Satoshi`

const validate = async (message:string, item: WorkQueueItem) => new Promise((resolve) => {
  setTimeout(() => resolve(bitcoinMessage.verify(message, item.address, item.signature)), 250)
})

const shuffle = (data: any[]) => {
  const work = Array.from(Array(data.length).keys())
  for(let i = work.length-1; i>=0; i--){
    const j = Math.floor(Math.random() * i)
    const temp = work[i]
    work[i] = work[j]
    work[j] = temp
  }
  return work
}

type ValidationState = 'invalid'| 'waiting' | 'validating' | 'valid sig'

const reducer = (state:Array<WorkQueueItem>, {type, payload}: {type: string, payload: number}): Array<WorkQueueItem> => {
  const left = state.slice(0, payload)
  const right = state.slice(payload+1)
  const item: WorkQueueItem = { ...state[payload], validationState: type === 'queue' ? 'validating' : type === 'success' ? 'valid sig' : 'invalid' }
  return [...left, item, ...right]
}

const Validator: FC<ValidatorProps> = ({address, signature, validationState="validating"}) => {
  return (<ValidatorLine>
      <ValidatorContent>{address}</ValidatorContent>
      <ValidatorContent>{signature}</ValidatorContent>
      <ValidIndicator validationState={validationState}>{validationState}</ValidIndicator>
  </ValidatorLine>)
}

export const App = () => {
 
  const initialState = useMemo(() => data.map((d, i) => ({
    id: i,
    address: d[0],
    signature: d[1],
    validationState: 'waiting' as ValidationState
  })), [])

  const [state, dispatch] = useReducer(reducer, initialState)
  const workOrder = useMemo( () => shuffle(data), [] )
  
  useEffect( () => {
    (async function anyNameFunction() {
      workOrder.forEach(async (i) => {
        dispatch({type: 'queue', payload: i})
        const isValid = await validate(M, state[i])
        dispatch({type: isValid ? 'success': 'error', payload: i})
      })
    })();
  }, [])

  return (
    <AppContainer >
      <Navigation />
      <Content>
        <PreimageContent>{M}</PreimageContent>
        {state.map( ({address, signature, validationState}, i) => {
          return (<Validator key={i} address={address} signature={signature} validationState={validationState} />)
        })}
      </Content>
    </AppContainer>
  );
}

export default App;
