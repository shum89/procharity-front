/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import React, { useEffect } from 'react';
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  Divider,
  List,
  Hidden,
  Popover,
  Paper,
  Typography,
  Badge,
  Button,
} from '@material-ui/core';
import clsx from 'clsx';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import MenuIcon from '@material-ui/icons/Menu';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { MainListItems, SecondaryListItems } from '../NavigationItems/NavigationItems';
import { useAsync } from '../../hooks/useAsync';
import { HealthCheck } from '../../App';
import BotStatus from '../BotStatus/BotStatus';
import useStyles from './Header.styles';


interface HeaderProps {
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  handleSetTheme: () => void;
  removeToken: () => void;
  isDark: boolean;
  isMenuOpen: boolean;
  handleCloseError: () => void;
  getHealthCheck: () => Promise<HealthCheck>;
}

const Header: React.FC<HeaderProps> = ({
  handleDrawerOpen,
  handleDrawerClose,
  isMenuOpen,
  handleSetTheme,
  isDark,
  removeToken,
  handleCloseError,
  getHealthCheck,
}) => {
  const classes = useStyles();
  const history = useHistory();

  const matchLogin = useRouteMatch('/')?.isExact ?? false;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const matchRegister = useRouteMatch('/register/:id')?.isExact ?? false;
  const matchReset = useRouteMatch('/reset_password')?.isExact ?? false;

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const handleLogout = () => {
    removeToken();
    history.push('/');
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { run, data } = useAsync({ status: 'idle', data: null, error: null });
   const options: any = { day: 'numeric', month: 'numeric', year: 'numeric' };
  const update = data?.db.last_update ?? '1-11-1111';
   const lastUpdateDate = new Date(update.replace(/-/g, '/'));
  const dateLocalized = new Intl.DateTimeFormat('ru-Ru', options).format(lastUpdateDate);
 

  useEffect(() => {
    run(getHealthCheck());
  }, []);
  const open = Boolean(anchorEl);

  return (
    <>
      {!(matchLogin || matchRegister || matchReset) ? (
        <>
          <AppBar
            position="absolute"
            className={clsx(classes.appBar, isMenuOpen && !mobileOpen && classes.appBarShift)}>
            <Toolbar className={classes.toolbar}>
              <Hidden xsDown implementation="css">
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="isMenuOpen drawer"
                  onClick={handleDrawerOpen}
                  className={clsx(classes.menuButton, isMenuOpen && classes.menuButtonHidden)}>
                  <MenuIcon />
                </IconButton>
              </Hidden>
              <Hidden smUp implementation="css">
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="isMenuOpen drawer"
                  onClick={handleDrawerToggle}
                  className={clsx(classes.menuButton)}>
                  <MenuIcon />
                </IconButton>
              </Hidden>
              <div className={classes.appBarSpacer} />
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}>
                <Paper className={classes.paper}>
                  <div className={classes.statusContainer}>
                    <Typography>Статус бота</Typography>
                    {data?.bot.status ? (
                      <CheckIcon fontSize="small" className={classes.iconCheckMark} />
                    ) : (
                      <ClearIcon fontSize="small" className={classes.iconCross} />
                    )}
                    {!data?.bot.status && <Typography>{data?.bot.error}</Typography>}
                  </div>
                  <div className={classes.statusContainer}>
                    <Typography>Метод бота</Typography>
                    <Typography>{data?.bot.method}</Typography>
                  </div>
                  <div className={classes.statusContainer}>
                    <Typography>Статус сервера</Typography>
                    {data?.db.status ? (
                      <CheckIcon fontSize="small" className={classes.iconCheckMark} />
                    ) : (
                      <ClearIcon fontSize="small" className={classes.iconCross} />
                    )}
                    {!data?.db.status && <Typography>{data?.db.error}</Typography>}
                  </div>
                  <div className={classes.statusContainer}>
                    <Typography>Активных задач</Typography>
                    <Typography>{data?.db.active_tasks}</Typography>
                  </div>
                  <div className={classes.statusContainer}>
                    <Typography>Последнее обновление</Typography>
                    <Typography>{dateLocalized}</Typography>
                  </div>
                </Paper>
              </Popover>
              <IconButton onClick={handleClick}>
                <BotStatus status={data?.bot.status && data?.db.status} />
              </IconButton>

              <IconButton onClick={handleSetTheme}>{isDark ? <Brightness4Icon /> : <Brightness7Icon />}</IconButton>
            </Toolbar>
          </AppBar>
          <Hidden xsDown implementation="css">
            <Drawer
              variant="permanent"
              classes={{
                paper: clsx(classes.drawerPaper, !isMenuOpen && classes.drawerPaperClose),
                root: classes.drawerPosition,
              }}
              open={isMenuOpen}>
              <div className={classes.toolbarIcon}>
                <IconButton onClick={handleDrawerClose}>
                  <ChevronLeftIcon />
                </IconButton>
              </div>
              <Divider />
              <List>
                <MainListItems handleCloseError={handleCloseError} />
              </List>
              <Divider className={classes.divider} />

              <List>
                <SecondaryListItems handleLogout={handleLogout} />
              </List>
            </Drawer>
          </Hidden>
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}>
              <List>
                <MainListItems handleCloseError={handleCloseError} />
              </List>
              <Divider />

              <List>
                <SecondaryListItems handleLogout={handleLogout} />
              </List>
            </Drawer>
          </Hidden>
        </>
      ) : (
        <div className={classes.headerContainer}>
          <h1 className={classes.authFormTitle}>ProCharity</h1>
          <div className={classes.buttonThemeContainer}>
            <IconButton onClick={handleSetTheme}>{isDark ? <Brightness4Icon /> : <Brightness7Icon />}</IconButton>

            <Button onClick={handleClick}>
              <BotStatus status={data?.bot.status && data?.db.status} />
            </Button>

            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}>
              <Paper className={classes.paper}>
                <div className={classes.statusContainer}>
                  <Typography>Статус бота</Typography>
                  {data?.bot.status ? (
                    <CheckIcon fontSize="small" className={classes.iconCheckMark} />
                  ) : (
                    <ClearIcon fontSize="small" className={classes.iconCross} />
                  )}
                  {!data?.bot.status && <Typography>{data?.bot.error}</Typography>}
                </div>
                <div className={classes.statusContainer}>
                  <Typography>Метод бота</Typography>
                  <Typography>{data?.bot.method}</Typography>
                </div>
                <div className={classes.statusContainer}>
                  <Typography>Статус сервера</Typography>
                  {data?.db.status ? (
                    <CheckIcon fontSize="small" className={classes.iconCheckMark} />
                  ) : (
                    <ClearIcon fontSize="small" className={classes.iconCross} />
                  )}
                  {!data?.db.status && <Typography>{data?.db.error}</Typography>}
                </div>
                <div className={classes.statusContainer}>
                  <Typography>Активных задач</Typography>
                  <Typography>{data?.db.active_tasks}</Typography>
                </div>
                <div className={classes.statusContainer}>
                  <Typography>Последнее обновление</Typography>
                  <Typography>{dateLocalized}</Typography>
                </div>
              </Paper>
            </Popover>
          </div>
        </div>
      )}
    </>
  );
};
export default Header;
