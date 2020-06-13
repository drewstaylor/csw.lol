import React, { FC, useCallback, useRef, useState } from "react";
import styled from "styled-components";
import { address } from "bitcoinjs-lib"
// @ts-ignore 
import * as bitcoinMessage from 'bitcoinjs-message'

const Content = styled.div`
    margin: 2rem;
`

const Form = styled.form`
    margin: 4rem 12rem;
    & label {
        font-size: 1.25rem;
    }
`

const TextInput = styled.input`
    font-size: 1.25rem;
    box-shadow: rgba(0, 0, 0, 0.14) 0px 1px 2px 0px inset;
    padding: 0 1.5rem;
    margin-top: 0.25rem;
    height: 4rem;
    width: 100%;
    border: 1px solid #cccccc;
    outline: none;
    border-radius: 0.1875rem;
    ::placeholder,
    ::-webkit-input-placeholder { 
        color: #cccccc;
    }
`

const TextArea = styled(TextInput).attrs(props => ({ as: 'textarea' }))`
    padding-top: 1.25rem;
    height: 12rem;
`

const VerifyButton = styled.button`
    box-sizing: border-box;
    margin-top: 2rem;
    margin-right: 1.5rem;
    padding: 0.75rem;
    font-size: 1.25rem;
    min-width: 6.5rem;
    background-color: #0275d8;
    color: white;
    border-color: rgb(45, 124, 194);
    border-radius: 0.25rem;
    border-style: solid;
    font-weight: 800;
    outline: none;
    :hover {
        background-color: #025aa5
    }
    :active { 
        border-color: #0275d8;
        color: #0275d8;
    }
`

const ClearButton = styled(VerifyButton)`
    color: white;
    border: 2px #6c757d solid;
    background-color: #6c757d;
    :hover {
        background-color: #5a6268
    }
    :active { 
        border-color: #6c757d;
        color: #6c757d;
    }
`

const Validation = styled.div<{ valid?: boolean }>`
    font-size: 1.25rem;
    color: ${props => props.valid ? '#55aa55' : '#ff0000'};
    margin-top: 1rem;
`

const FormElement = styled.div`margin-top: 1rem;`

export interface VerifyProps {
    address?: string
    signature?: string
    message?: string
}

export const Verify: FC<VerifyProps> = (props: VerifyProps) => {

    const addressRef = useRef(null)
    const messageRef = useRef(null)
    const signatureRef = useRef(null)
    const [validationState, setValidationState] = useState<{ valid?: boolean, message?: string }>({})

    const onClear = useCallback((event) => {
        setValidationState({ valid: undefined, message: undefined })
    }, [])

    const onVerify = useCallback((event) => {
        console.log("verifying!")
        const address = (addressRef?.current || { value: '' }).value
        const message = (messageRef?.current || { value: '' }).value
        const signature = (signatureRef?.current || { value: '' }).value
        let valid: boolean
        try {
            valid = bitcoinMessage.verify(message, address, signature)
            setValidationState({ valid, message: valid ? "Valid Signature" : "Invalid signature" })
        }
        catch (error) {
            valid = false;
            setValidationState({ valid, message: error.message })
        }
        return valid
    }, [addressRef, signatureRef, messageRef])

    return (
        <Content>
            <Form >
                <FormElement><label>Bitcoin Address<TextInput ref={addressRef} placeholder="1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF" /></label></FormElement>
                <FormElement><label>Message<TextArea ref={messageRef} as="textarea" placeholder="Craig Steven Wright is a liar and a fraud. He doesn't have the keys used to sign this message." /></label></FormElement>
                <FormElement><label>Signature<TextInput ref={signatureRef} placeholder="signature" /></label></FormElement>
                <VerifyButton type="button" onClick={onVerify}>Verify</VerifyButton>
                <ClearButton type="reset" onClick={onClear} >Clear</ClearButton>
                {validationState.message && <Validation valid={validationState.valid}>{validationState.message}</Validation>}
            </Form>
        </Content >)
}