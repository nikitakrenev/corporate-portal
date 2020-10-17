import React from "react";
import { AccessAlarm } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import cn from "classnames";
import { Popover } from "@material-ui/core";

interface Props {
    hours: number;
    projects: Array<{
        title: string;
        hours: number;
    }>;
}

const useStyles = makeStyles((theme) => ({
    wrapper: {
        display: "flex",
        alignItems: "center",
    },
    hours: {
        display: "inline-block",
        marginLeft: 5,
    },
    red: {
        color: "#F40909",
    },
    popover: {
        pointerEvents: "none",
    },
    paper: {
        padding: theme.spacing(1),
    },
    row: {
        display: "flex",
    },
}));

export const TrackingHours = (props: Props) => {
    const { hours, projects } = props;
    const styles = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <div
                className={styles.wrapper}
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
            >
                <AccessAlarm className={cn(hours < 0 && styles.red)} />
                <span className={cn(styles.hours, hours < 0 && styles.red)}>{hours}</span>
            </div>
            <Popover
                id="mouse-over-popover"
                className={styles.popover}
                classes={{
                    paper: styles.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                {!projects || projects.length === 0 ? (
                    <div>Нет проектов</div>
                ) : (
                    <table>
                        <tbody>
                            {projects.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.title}</td>
                                    <td className={cn(hours < 0 && styles.red)}>{item.hours}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </Popover>
        </>
    );
};
