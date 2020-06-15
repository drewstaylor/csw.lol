import React, { FC, useCallback, useRef, useState, useEffect } from "react";
import styled from "styled-components";
// @ts-ignore 
import * as bitcoinMessage from 'bitcoinjs-message'

const Content = styled.div`
    margin: 2rem;
`

const FormElement = styled.div`margin-top: 1rem;`

const Form = styled.form`
    margin: auto;
    & label {
        font-size: 1rem;
    }
    display: flex;
    flex-direction: column;
    align-item: center;
    max-width: 48rem;
    ${FormElement}:first-child {
        margin-top: 0;
    }
`

const TextInput = styled.input`
    font-size: 1rem;
    box-shadow: rgba(0, 0, 0, 0.14) 0px 1px 2px 0px inset;
    box-sizing: border-box;
    padding: 0.75rem;
    margin-top: 0.25rem;
    // height: 2.5rem;
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
    box-sizing: border-box;
    padding 0.75rem;
    height: 8rem;
    border-radius: 0.1875rem;
`

const ButtonContainer = styled.div`
    flex-direction: row;
    margin-top: 0.75rem;
    display: flex;
    @media only screen and (max-width: 64rem){
        flex-direction: column;
        & button {
            margin-right: 0;
        }
    }
`

const VerifyButton = styled.button`
    box-sizing: border-box;
    margin-top: 1rem;
    margin-right: 1.5rem;
    padding: 0.625rem;
    font-size: 1rem;
    min-width: 6.5rem;
    background-color: #0275d8;
    color: white;
    border-color: rgb(45, 124, 194);
    border-radius: 0.1875rem;
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
    background-color: ${props => props.valid ? '#d4edda' : '#f8d7da'};
    border: 1px solid ${props => props.valid ? '#c3e6cb' : '#f5c6cb'};
    padding: 0.75rem;
    border-radius: 0.1875rem;
    font-size: 1rem;
    color: ${props => props.valid ? '#155724' : '#721c24'};
`


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

    useEffect(() => {
        console.log("validation: ", validationState.valid)
        if (validationState.valid !== undefined) {
            try {
                window.scroll({ top: 0, left: 0 });
            } catch (error) {
                window.scrollTo(0, 0);
            }
        }
    }, [validationState.valid]);

    const onClear = useCallback((event) => {
        setValidationState({ valid: undefined, message: undefined })
    }, [])

    const onVerify = useCallback((event) => {
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
                {validationState.message && <Validation valid={validationState.valid}>{validationState.message}</Validation>}
                <FormElement><label>Bitcoin Address<TextInput ref={addressRef} placeholder="1FeexV6bAHb8ybZjqQMjJrcCrHGW9sb6uF" /></label></FormElement>
                <FormElement><label>Message<TextArea ref={messageRef} as="textarea" placeholder="Craig Steven Wright is a liar and a fraud. He doesn't have the keys used to sign this message." /></label></FormElement>
                <FormElement><label>Signature<TextInput ref={signatureRef} placeholder="signature" /></label></FormElement>
                <ButtonContainer>
                    <VerifyButton type="button" onClick={onVerify}>Verify</VerifyButton>
                    <ClearButton type="reset" onClick={onClear} >Clear</ClearButton>
                </ButtonContainer>
            </Form>
        </Content >)
}