import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, MenuList, Typography, Avatar, Tooltip} from "@material-ui/core";
import * as ROUTES from '../constants/routes';
import { HookTheme } from '../constants/theme';
import { withRouter } from 'react-router-dom';
import { MenuOutlined, Home, Notes, HowToReg, MeetingRoom, LibraryBooks, ExitToApp } from '@material-ui/icons';
import { MenuNavButton } from './MenuNavButton';
import { withFirebase } from '../provider/Firebase';
import { withAuthContext } from '../provider/Authentication';

const TopAppBarBase = (props) => {
    
    const Theme = HookTheme();
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const toggleDrawer = () => {
      setDrawerIsOpen(!drawerIsOpen);
    }
    const avatarClickHandler = () => {
        props.history.push(ROUTES.PROFILE);
    }

    const logout = () => {
        props.firebase.signOut().then(
            () => props.history.push(ROUTES.SIGN_IN)
            
        )
        setDrawerIsOpen(false);
    }

    const handleClose = () => {
        setDrawerIsOpen(false);
    }
    return(
        <AppBar position="relative">
            <div className="flex-container row">
                <Toolbar> 
                    <React.Fragment key="HomeDrawer">
                        <IconButton edge="start" className={`${Theme.menuButton}`} color="inherit" children={<MenuOutlined/>} onClick={toggleDrawer}/>
                            <Drawer anchor="left" open={drawerIsOpen} onClose={toggleDrawer} classes={{paper: Theme.drawerPaper}} className={`${Theme.drawer}`}>
                                <div className="drawer-container column">
                                    <h1 className="drawer-title unselectable"> Firekeep </h1>
                                    <MenuList>
                                        <MenuNavButton to={ROUTES.LANDING} onClick={handleClose} first><Home/> &nbsp;  <p className="drawer-item"> HOME</p>  </MenuNavButton>
                                        {props.firebase.auth.currentUser !== null
                                            ?   <div>
                                                    <MenuNavButton to={ROUTES.HOME} onClick={handleClose}> <Notes/> &nbsp; <p className="drawer-item"> MY NOTES</p> </MenuNavButton> 
                                                    <MenuNavButton to={ROUTES.SIGN_IN} onClick={logout}> <ExitToApp/> &nbsp; <p className="drawer-item">LOG OUT</p> </MenuNavButton>
                                                </div>
                                            : null
                                        }
                                        {props.firebase.auth.currentUser === null
                                            ? <MenuNavButton to={ROUTES.SIGN_IN} onClick={handleClose}> <MeetingRoom/> &nbsp; <p className="drawer-item"> LOG IN</p> </MenuNavButton>
                                            : null
                                        }
                                        <MenuNavButton to={ROUTES.SIGN_UP} onClick={handleClose}> <HowToReg/> &nbsp; <p className="drawer-item"> SIGN UP</p> </MenuNavButton>
                                        <MenuNavButton to={ROUTES.CREDITS} onClick={handleClose}> <LibraryBooks/> &nbsp; <p className="drawer-item"> USED LIBRARIES</p> </MenuNavButton>
                                    </MenuList>
                                </div>
                            </Drawer>
                    </React.Fragment>
                    <img className="logo" alt="firebase-logo" src={process.env.PUBLIC_URL + "/firebase.png"}></img>
                    <Typography variant="h6" className="unselectable">FireKeep</Typography>
                </Toolbar>
                {props.authUser != null && props.firebase.auth.currentUser != null
                    ?   <div className="column bfc avatar-container">
                            <div className=" row flex-container end">
                                <Tooltip title="Profile">
                                    <Avatar 
                                    className="avatar" 
                                    alt={props.firebase.auth.currentUser.displayName}
                                    onClick={avatarClickHandler}>
                                        {props.firebase.auth.currentUser.displayName !== "" && props.firebase.auth.currentUser.displayName !== null
                                            ? props.firebase.auth.currentUser.displayName.match(/\b[a-zA-Z]/gm).map(letter => letter)
                                            : "E"
                                        }
                                    </Avatar>
                                </Tooltip>
                            </div>
                        </div>
                    : null
                }
                
            </div>
        </AppBar>
    );
}

export const TopAppBar = withRouter(withFirebase(withAuthContext(TopAppBarBase)));