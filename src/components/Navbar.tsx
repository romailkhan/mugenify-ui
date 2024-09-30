import React, { MouseEventHandler, ReactNode } from 'react';
import {
	Link,
	Box,
	Flex,
	Text,
	Button,
	Stack,
	Avatar,
	Menu,
	MenuButton,
	MenuList,
	MenuItem as ChakraMenuItem,
	MenuDivider,
} from '@chakra-ui/react';

import Logo from './Logo';

interface NavItemProps {
	children: ReactNode;
	isLast?: boolean;
	to?: string;
	[key: string]: any;
}

interface MenuToggleProps {
	toggle: MouseEventHandler;
	isOpen: boolean;
}

interface MenuLinksProps {
	isOpen: boolean;
}

interface NavBarContainerProps {
	children: ReactNode;
	[key: string]: any;
}

interface NavBarProps {
	avatarUrl: string;
	[key: string]: any;
}

const NavBar: React.FC<NavBarProps> = ({ avatarUrl, ...props }) => {
	const [isOpen, setIsOpen] = React.useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<NavBarContainer {...props}>
			<Flex align="center" flex="1">
				<Logo
					w="100px"
					color={['white', 'white', 'primary.500', 'primary.500']}
				/>
			</Flex>
			<Flex align="center" justify="center" flex="2">
				<MenuLinks isOpen={isOpen} />
			</Flex>
			<Flex align="center" justify="flex-end" flex="1">
				<UserMenu avatarUrl={avatarUrl} />
			</Flex>
			<MenuToggle toggle={toggle} isOpen={isOpen} />
		</NavBarContainer>
	);
};

const CloseIcon = () => (
	<svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
		<title>Close</title>
		<path
			fill="black"
			d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
		/>
	</svg>
);

const MenuIcon = () => (
	<svg
		width="24px"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
		fill="black"
	>
		<title>Menu</title>
		<path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
	</svg>
);

const MenuToggle: React.FC<MenuToggleProps> = ({ toggle, isOpen }) => {
	return (
		<Box display={{ base: 'block', md: 'none' }} onClick={toggle}>
			{isOpen ? <CloseIcon /> : <MenuIcon />}
		</Box>
	);
};

const NavItem: React.FC<NavItemProps> = ({
	children,
	isLast,
	to = '/',
	...rest
}) => {
	return (
		<Link href={to}>
			<Text display="block" color="black" {...rest}>
				{children}
			</Text>
		</Link>
	);
};

const MenuLinks: React.FC<MenuLinksProps> = ({ isOpen }) => {
	return (
		<Box
			display={{ base: isOpen ? 'block' : 'none', md: 'flex' }}
			flexBasis={{ base: '100%', md: 'auto' }}
			flex="1"
			alignItems="center"
			justifyContent="center"
		>
			<Stack
				spacing={8}
				align="center"
				justify="center"
				direction={['column', 'row', 'row', 'row']}
				pt={[4, 4, 0, 0]}
			>
				<NavItem to="/app">Generate</NavItem>
				<NavItem to="/stats">Stats</NavItem>
			</Stack>
		</Box>
	);
};

const NavBarContainer: React.FC<NavBarContainerProps> = ({
	children,
	...props
}) => {
	return (
		<Flex
			as="nav"
			align="center"
			justify="space-between"
			wrap="wrap"
			w="100%"
			mb={8}
			p={8}
			bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
			color={['white', 'white', 'primary.700', 'primary.700']}
			{...props}
		>
			{children}
		</Flex>
	);
};

interface UserMenuProps {
	avatarUrl: string;
}

const UserMenu: React.FC<UserMenuProps> = ({ avatarUrl }) => {
	return (
		<Menu>
			<MenuButton
				as={Button}
				rounded={'full'}
				variant={'link'}
				cursor={'pointer'}
			>
				<Avatar size={'sm'} src={avatarUrl} />
			</MenuButton>
			<MenuList>
				<ChakraMenuItem>Profile</ChakraMenuItem>
				<MenuDivider />
				<ChakraMenuItem>Logout</ChakraMenuItem>
			</MenuList>
		</Menu>
	);
};

export default NavBar;
