import React from 'react';
import { Nav, NavLogo, NavTitle, NavMenu }
	from "./NavbarElements";

const Navbar = () => {
	return (
		<>
			<Nav >
				<NavMenu >
					<NavLogo src="/img/logo.svg" onClick={() => window.location.href = '/'}/>
					<NavTitle activestyle="true" onClick={() => window.location.href = '/'}>
						Archimedes
					</NavTitle>
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;
