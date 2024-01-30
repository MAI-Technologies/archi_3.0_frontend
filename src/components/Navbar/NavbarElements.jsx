import React from 'react';
import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
background: #FFFFFF;
position: fixed;
top: 0;
left: 0;
right: 0;
height: 48px;
width: 100%;
display: flex;
justify-content: space-between;
padding: 0;
z-index: 2147483647;
`;

export const NavLogo = styled.img`
padding: 0 1rem;
width: 30px:
height: auto;
`;

export const NavTitle = styled.h1`
color: #C06041;
display: flex;
justify-content: center;
align-items: center;
text-decoration: none;
padding-top: 5px;
height: 100%;
cursor: pointer;
font-size: 17px;
position: absolute;
left: 50%;
transform: translateX(-50%);
`;
export const NavLink = styled(Link)`
color: #808080;
display: flex;
align-items: center;
text-decoration: none;
padding: 0 1rem;
height: 100%;
cursor: pointer;
&.active {
	color: #4D4DFF;
}
`;

export const Bars = styled(FaBars)`
display: none;
color: #808080;
@media screen and (max-width: 768px) {
	display: block;
	position: absolute;
	top: 0;
	right: 0;
	transform: translate(-100%, 75%);
	font-size: 1.8rem;
	cursor: pointer;
}
`;

export const NavMenu = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: auto; 
// margin-right: -24px;
/* Second Nav */
/* margin-right: 24px; */
/* Third Nav */
/* width: 100vw;
white-space: nowrap; */
@media screen and (max-width: 768px) {
	body {
		width: 100%;
	}
	// display: none;
}
`;

/* Add a content wrapper for the rest of your page content */
export const ContentWrapper = styled.div`
  padding-top: 51px; /* Add padding to account for the fixed navbar height */
`;
