import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import React from "react";
import { BsChatDotsFill, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { GiMoneyStack, GiNewspaper } from "react-icons/gi";
import { HiMenu } from "react-icons/hi";
import { RiDashboardFill, RiSettings2Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// internal imports
import { logOutHandler } from "../../actions/authAction";

const drawerWidth = 240;
// styles
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  iconFontSize: {
    fontSize: "2rem",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <HiMenu />
          </IconButton>
          <Typography variant="h5" noWrap>
            Admin Panel
          </Typography>
          <Box ml={3}>
            <Button
              variant="contained"
              onClick={async () => {
                await dispatch(logOutHandler());
              }}
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <BsChevronRight /> : <BsChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key="Dashboard" onClick={() => history.push("/admin")}>
            <ListItemIcon className={classes.iconFontSize}>
              <RiDashboardFill />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button key="Chats" onClick={() => history.push("/admin/chats")}>
            <ListItemIcon className={classes.iconFontSize}>
              <BsChatDotsFill />
            </ListItemIcon>
            <ListItemText primary="Chats" />
          </ListItem>

          <ListItem button key="Payments" onClick={() => history.push("/admin/payments")}>
            <ListItemIcon className={classes.iconFontSize}>
              <GiMoneyStack />
            </ListItemIcon>
            <ListItemText primary="Payments" />
          </ListItem>

          <ListItem button key="Skill Tests" onClick={() => history.push("/admin/skill-test")}>
            <ListItemIcon className={classes.iconFontSize}>
              <GiNewspaper />
            </ListItemIcon>
            <ListItemText primary="Skill Tests" />
          </ListItem>

          <ListItem button key="Site Settings" onClick={() => history.push("/admin/site-settings")}>
            <ListItemIcon className={classes.iconFontSize}>
              <RiSettings2Line />
            </ListItemIcon>
            <ListItemText primary="Site Settings" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </Container>
  );
};

export default AdminLayout;
