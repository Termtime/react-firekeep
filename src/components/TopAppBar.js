import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, MenuList, MenuItem, Typography, Avatar } from "@material-ui/core";
import * as ROUTES from '../constants/routes';
import { HookTheme } from '../constants/theme';
import { Link, withRouter } from 'react-router-dom';
import { MenuOutlined } from '@material-ui/icons';
import { withFirebase } from '../provider/Firebase';
import { withAuthContext } from '../provider/Authentication';

const TopAppBarBase = (props) => {
    const Theme = HookTheme();

    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const toggleDrawer = () => {
      setDrawerIsOpen(!drawerIsOpen);
    }

    const logout = () => {
        props.firebase.signOut().then(
            () => props.history.push(ROUTES.SIGN_IN)
        )
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
                                <h1 className="title unselectable"> Firekeep </h1>
                                <MenuList>
                                    <Link className="no-style" to={ROUTES.LANDING} onClick={handleClose}><MenuItem className={`${Theme.firstMenuItem}`}> <p>HOME</p> </MenuItem></Link>
                                    <Link className="no-style" to={ROUTES.HOME} onClick={handleClose}><MenuItem className={`${Theme.consecutiveMenuItem}`}> <p>MY NOTES</p> </MenuItem></Link>
                                    <Link className="no-style" to={ROUTES.SIGN_UP} onClick={handleClose}><MenuItem className={`${Theme.consecutiveMenuItem}`}><p>SIGN UP</p></MenuItem></Link> 
                                    <Link className="no-style" to={ROUTES.SIGN_IN} onClick={handleClose}><MenuItem className={`${Theme.consecutiveMenuItem}`}> <p>LOG IN</p></MenuItem></Link> 
                                    <Link className="no-style" to={ROUTES.CREDITS} onClick={handleClose}><MenuItem className={`${Theme.consecutiveMenuItem}`} ><p>USED LIBRARIES</p></MenuItem></Link> 
                                </MenuList>
                            </Drawer>
                    </React.Fragment>
                    <img className="logo" alt="firebase-logo" src={process.env.PUBLIC_URL + "/firebase.png"}></img>
                    <Typography variant="h6" className="unselectable">FireKeep</Typography>
                </Toolbar>
                {props.authUser != null && props.firebase.auth.currentUser != null
                    ?   <div className="column bfc avatar-container">
                            <div className=" row flex-container end">
                                <Avatar className="avatar" alt ={props.firebase.auth.displayName} onClick={() => logout()}>DN</Avatar>
                            </div>
                        </div>
                    : null
                }
                
            </div>
        </AppBar>
    );
}

export const TopAppBar = withRouter(withFirebase(withAuthContext(TopAppBarBase)));