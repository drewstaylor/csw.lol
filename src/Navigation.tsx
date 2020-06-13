import React, { FC } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const NavigationContainer = styled.div`
    border-bottom: 2px solid #cccccc;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-weight: 500;
    font-size: 1rem;
    background-color: #343a40;
    color: white;
    padding: 0.75rem 1.625rem;
    a {
        font-size: 0.85rem;
        color: white;
        text-decoration: none;
        &:hover {
            text-decoration: underline;
        }
        &:active {
            text-decoration: underline;
        }
    }
`

const NavigationContainerLeft = styled.span`
    justify-content: flex-start;
    font-weight: 500;
    font-size: 1.25rem;
    display: flex;
    a { 
        font-size: 1.25rem;
    }
    `

const NavigationContainerRight = styled.div`
    
    padding: 0.25rem 0 0 0;
    justify-content: flex-end;
    
    > ul {
        list-style-type: none;
        display: contents;
        > li {
            display: inline-flex;
            margin-left: 1.25rem;
            // padding-top: 0.25rem;

        }
    }
    
`

export const Navigation: FC = () => (
    <NavigationContainer>
        <NavigationContainerLeft>
            <Link to="/">craigwright.lol</Link>
        </NavigationContainerLeft>
        <div>
            <NavigationContainerRight>
                <ul>
                    <li><Link to="/verify">Verify a Signature</Link></li>
                    <li><a href="https://www.github.com/initfortherekt/csw.lol">GitHub</a></li>
                    {/* <li><Link to="/about">About</Link></li> */}
                </ul>
            </NavigationContainerRight>
        </div>
    </NavigationContainer>

)