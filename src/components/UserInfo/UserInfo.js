import React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Logout from '@mui/icons-material/Logout';
import {Settings} from "@mui/icons-material";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";

import {RouterEndpoints} from "../../routes";
import {userActions} from "../../redux";
import css from './userInfo.module.css';

const UserInfo = () => {
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            <Box sx={{
                display: 'flex', alignItems: 'center', textAlign: 'center'
            }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onMouseUp={handleClick}
                        size="small"
                        sx={{ml: 2}}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <MenuItem onMouseUp={handleClose}>
                            <Avatar sx={{background: '#738d75', color: '#f6f304',margin: '2px 12px 2px 0'}}/>
                        </MenuItem>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onMouseUp={handleClose}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <NavLink to={'profile'} className={css.favorite}>
                    <MenuItem onMouseUp={handleClose}>
                        <Avatar
                            sx={{
                                width: '24px',
                                height: '24px',
                                background: '#81cc30',
                                margin: '2px 12px 2px 0'
                            }}/> Profile
                    </MenuItem>
                </NavLink>

                <Divider/>
                <NavLink to={'favorites'} className={css.favorite}>
                    <MenuItem onMouseUp={handleClose}>
                        <FavoriteIcon sx={{color: '#cc3030', margin: '2px 12px 2px 0'}}/>
                        Favorite
                    </MenuItem>
                </NavLink>
                <MenuItem onMouseUp={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small"/>
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onMouseUp={handleClose}>
                    <ListItemIcon>
                        <Logout fontSize="small"/>
                    </ListItemIcon>
                    <NavLink to={RouterEndpoints.login} onClick={() => {
                        dispatch(userActions.logOut())
                    }}>LogOut</NavLink>
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
};

export {UserInfo};