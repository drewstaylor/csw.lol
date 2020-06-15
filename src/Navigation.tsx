import React, { FC, useState, useCallback, useEffect, useLayoutEffect } from 'react'
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

    @media only screen and (max-width: 40rem) {
        display: block;
    }
`

const NavigationContainerLeft = styled.span`
    justify-content: flex-start;
    @media only screen and (max-width: 40rem) {
        justify-content: space-between;
    }
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
    @media only screen and (max-width: 40rem) {
        margin-top: 0.5rem;
    }
    > ul {
        list-style-type: none;
        display: contents;
        @media only screen and (max-width: 40rem) {
            li:first-child { 
                border-top: 1px #666666 solid; 
                margin-top: 0.5rem; 
            } 
        }
        > li {
            display: inline-flex;
            @media only screen and (max-width: 40rem) {
                display: block;
                margin-left: 0;
                padding-top: 1rem;
                a {
                    color: #dfdfdf;
                    font-size: 1.125rem;
                    margin-top: 0.5rem;
                }
            }
            margin-left: 1.25rem;
        }
    }
`

const Menu = styled.i`
    display: none;
    @media only screen and (max-width: 40rem) {
        display: inline-block;
    } 
`

export const Navigation: FC = () => {

    const [menuExpanded, setMenuExpanded] = useState(false)
    const onMenuToggle = useCallback((event) => {
        setMenuExpanded(!menuExpanded)
    }, [menuExpanded])

    const [isSmallScreen, setIsSmallScreen] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 40rem)")
        const listener = (ev: Pick<MediaQueryListEvent, "matches">) => {
            if (!ev.matches) {
                setMenuExpanded(false)
            }
            setIsSmallScreen(ev.matches);
        }
        if (mediaQuery["addEventListener"]) {
            mediaQuery.addEventListener("change", listener)
        }
        else {
            mediaQuery.addListener(listener)
        }
        listener(mediaQuery)
        return () => {
            if (mediaQuery["removeEventListener"]) {
                mediaQuery.removeEventListener("change", listener)
            }
            else {
                mediaQuery.removeListener(listener)
            }
        }
    })

    return (
        < NavigationContainer >
            <NavigationContainerLeft>
                <Link to="/">craigwright.lol</Link>
                <Menu onClick={onMenuToggle} className="fa fa-bars"></Menu>
            </NavigationContainerLeft>
            {((isSmallScreen && menuExpanded) || !isSmallScreen) && <NavigationContainerRight>
                <ul>
                    <li><Link to="/verify">Verify a Signature</Link></li>
                    <li><a href="https://www.github.com/initfortherekt/csw.lol">GitHub</a></li>
                    {/* <li><Link to="/about">About</Link></li> */}
                    <li></li>
                </ul>
            </NavigationContainerRight>}

        </NavigationContainer >
    )
}