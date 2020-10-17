import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer, List } from "@material-ui/core";
import { links } from "./links";
import { NavLink } from "react-router-dom";
import { FiberManualRecord } from "@material-ui/icons";
import LOGO from "./logo.svg";

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
    logo: {
        height: 88,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        boxShadow: "2px 0px 8px rgba(130, 132, 150, 0.16)",
        height: "100vh",
    },
    drawerPaper: {
        width: drawerWidth,
    },
    link: {
        textDecoration: "none",
        height: 56,
        display: "flex",
        alignItems: "center",
        color: "#828496",
        padding: "0 24px 0 30px",
    },
    activeLink: {
        borderLeft: "2px solid #0061F3",
        color: "#0061F3",
    },
    circleIcon: {
        marginRight: 26,
    },
}));

export const Sidebar = () => {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={true}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <NavLink to={"/"} className={classes.logo}>
                <img src={LOGO} alt="" />
            </NavLink>
            <List>
                {links.map((item, index) => (
                    <NavLink
                        to={item.link}
                        className={classes.link}
                        key={index}
                        activeClassName={classes.activeLink}
                        exact={item.exact}
                    >
                        <FiberManualRecord className={classes.circleIcon} fontSize={"small"} />
                        {item.title}
                    </NavLink>
                ))}
            </List>
        </Drawer>
    );
};
