import React, { FC } from 'react'
import styled  from 'styled-components'

const NavigationContainer = styled.div`
    border-bottom: 2px solid #cccccc;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-family: sans-serif;
    font-weight: 500;
    font-size: 1rem;
    background-color: #343a40;
    color: white;
    padding: 0.75rem 1.625rem;
`

const NavigationContainerLeft = styled.span`
    justify-content: flex-start;
    font-weight: 500;
    font-size: 1.25rem;
    display: flex;
    `
    
const NavigationContainerRight = styled.ul`
    display:contents;
    padding: 0.25rem 0;
    list-style-type: none;
    justify-content: flex-end;
    > li {
        padding: 0.125rem 0;
        margin-left: 0 1.25rem;
    }
`

export const Navigation: FC = () => (
    <NavigationContainer>
        <NavigationContainerLeft>
            craigwright.lol
        </NavigationContainerLeft>
        <NavigationContainerRight>
            {/* <li>About</li> */}
        </NavigationContainerRight>
    </NavigationContainer>
   
)