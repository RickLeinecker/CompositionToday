import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import AdminManager from './AdminAdminManager';
import { useState } from 'react';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { ListItem, ListItemIcon, ListItemText } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import LogoutIcon from '@mui/icons-material/Logout';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AdminLogout from './AdminLogout';
import AdminRelatedProjectsManager from './AdminRelatedProjectsManager';
import AdminTagsManager from './AdminTagsManager';
import AdminUserManager from './AdminUserManager';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState("AdminAdminManager");

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Admin Page
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <ListItem button key={"AdminAdminManager"} onClick={() => setCurrentPage("AdminAdminManager")}>
                    <ListItemIcon>
                        <AdminPanelSettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Admin Manager"} />
                </ListItem>
                <ListItem button key={"AdminUserManager"} onClick={() => setCurrentPage("AdminUserManager")}>
                    <ListItemIcon>
                        <ManageAccountsIcon />
                    </ListItemIcon>
                    <ListItemText primary={"User Manager"} />
                </ListItem>
                <ListItem button key={"AdminTagsManager"} onClick={() => setCurrentPage("AdminTagsManager")}>
                    <ListItemIcon>
                        <LocalOfferIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Tags/Genres Manager"} />
                </ListItem>
                <ListItem button key={"AdminRelatedProjectsManager"} onClick={() => setCurrentPage("AdminRelatedProjectsManager")}>
                    <ListItemIcon>
                        <AccountTreeIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Related Projects Manager"} />
                </ListItem>

                <Divider />
                <ListItem button key={"AdminLogout"} onClick={() => setCurrentPage("AdminLogout")}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Logout"} />
                </ListItem>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {currentPage === "AdminAdminManager" && <AdminManager />}
                {currentPage === "AdminUserManager" && <AdminUserManager />}
                {currentPage === "AdminTagsManager" && <AdminTagsManager />}
                {currentPage === "AdminRelatedProjectsManager" && <AdminRelatedProjectsManager />}
                {currentPage === "AdminLogout" && <AdminLogout />}
                
            </Main>
        </Box>
    );
}
