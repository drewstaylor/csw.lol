import React, { useMemo, useEffect, FC, useState } from 'react';
import { Navigation } from './Navigation';
import { Verify } from './Verify'
import { data } from './data'
import styled from 'styled-components';
import {
  Switch,
  Route,
} from "react-router-dom";
// @ts-ignore 
import * as bitcoinMessage from 'bitcoinjs-message'

type ValidationState = 'invalid' | 'waiting' | 'validating' | 'valid'

interface ValidatorProps {
  address: string
  signature: string
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

  @media only screen and (max-width: 64rem) {
      margin-bottom: 1rem;
      display: block;
  }
`

const ValidatorContent = styled.div`
  
  min-width: 15.75rem;
  @media only screen and (max-width: 64rem) {
      overflow-wrap:break-word;
      word-break: break-word;
      display: block;
      margin-bottom: 0.25rem;
      min-width: 100%;
  }
`

const Signature = styled(ValidatorContent)`min-width: 40.25rem;

@media only screen and (max-width: 64rem) {
  overflow-wrap:break-word;
  word-break: break-word;
  display: block;
  margin-bottom: 0.25rem;
  min-width: 100%;
}`

const ValidIndicator = styled.div<{ validationState: string }>`
  color: ${props => props.validationState === 'valid' ? "green" : props.validationState === 'invalid' ? "red" : "grey"};
`

const Content = styled.div`
  font-family: monospace;
  font-size: 0.75rem;
  max-width: 1024px;
  margin: auto;
  padding: 1rem;
  margin-top: 1.625rem;
  margin-bottom: 1.625rem;
  @media only screen and (max-width: 67.5rem) {
    margin: 1.625rem;
  }
`

const PreimageContent = styled.div`
  white-space: pre-line;
  margin-bottom: 2rem;
`

const AppContainer = styled.div`
  margin-bottom: 2rem;
`

const M = `Craig Steven Wright is a liar and a fraud. He doesn't have the keys used to sign this message.

The Lightning Network is a significant achievement. However, we need to continue work on improving on-chain capacity.

Unfortunately, the solution is not to just change a constant in the code or to allow powerful participants to force out others.

We are all Satoshi`

const validate = async (message: string, address: string, signature: string,) => new Promise((resolve) => {
  setTimeout(() => resolve(bitcoinMessage.verify(message, address, signature)), Math.floor(Math.random() * 50) + 100)
})

const Validator: FC<ValidatorProps> = ({ address, signature }) => {

  const [validationState, setValidationState] = useState("verifying")

  useEffect(() => {
    (async () => {
      const isValid = await validate(M, address, signature)
      setValidationState(isValid ? 'valid' : 'invalid')
    })();
  }, [address, signature])

  return (<ValidatorLine key={address}>
    <ValidatorContent>{address}</ValidatorContent>
    <Signature>{signature}</Signature>
    <ValidIndicator validationState={validationState}>{validationState}</ValidIndicator>
  </ValidatorLine>)
}

export const App = () => {
  const initialState = useMemo(() => {
    console.log('useMemo initialState');
    return data.map((d, i) => ({
      id: i,
      address: d[0],
      signature: d[1],
      validationState: 'waiting' as ValidationState
    }))
  }, [])

  return (
    <AppContainer >

      <Navigation />
      <Switch>
        <Route path="/verify">
          <Verify />
        </Route>
        <Route path="/">
          <Content>
            <PreimageContent>{M}</PreimageContent>
            {initialState.map(({ address, signature, validationState }, i) => {
              return (<Validator key={address} address={address} signature={signature} />)
            })}
          </Content>
        </Route>

      </Switch>
    </AppContainer >
  );
}

export default App;
