import React, {FC} from 'react'
import styled from 'styled-components'

export interface ValidatorProps {
    address: string
    signature: string
    validationState: string
}

export const ValidatorLine = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: 2rem;

    @media only screen and (max-width: 1024px) {
        margin-bottom: 1rem;
        display: block;
    }
`

export const ValidatorContent = styled.div`
    margin-right: 1rem;
    @media only screen and (max-width: 1024px) {
        overflow-wrap:break-word;
        word-break: break-word;
        display: block;
        margin-bottom: 0.25rem;
    }
`


export const ValidIndicator = styled.div<{ validationState: string }>`
    color: ${props => props.validationState === 'valid sig' ? "green" : props.validationState === 'invalid' ? "red" : "grey"};

`
export const Validator: FC<ValidatorProps> = ({address, signature, validationState="validating"}) => {
    return (<ValidatorLine>
        <ValidatorContent>{address}</ValidatorContent>
        <ValidatorContent>{signature}</ValidatorContent>
        <ValidIndicator validationState={validationState}>{validationState}</ValidIndicator>
    </ValidatorLine>)
}