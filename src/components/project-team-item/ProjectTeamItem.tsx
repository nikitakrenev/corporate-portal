import { Avatar } from "@material-ui/core";
import { useCallback } from "react";
import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CloseIcon from "@material-ui/icons/Close";

interface IProjectTeamItem {
    name: string;
    position: string;
    avatar: string;
}
interface IProjectTeamItemProps {
    item: IProjectTeamItem;
    showExpandedIcon?: boolean;

    onDelete?(): void;
}
const useStyles = makeStyles(() => ({
    projectTeamItem: {
        display: "flex",
    },
    projectTeamItemAvatar: {
        marginRight: 8,
    },
    projectTeamItemInfo: {
        flex: 1,
    },
    projectTeamItemName: {
        color: "#000",
        fontSize: 14,
    },
    projectTeamItemPosition: {
        color: "#7187A6",
        fontSize: 12,
    },
    projectTeamItemActions: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        width: 20,
    },
    projectTeamItemToggleIcon: {
        fontSize: 20,
        color: "rgba(0, 0, 0, 0.54)",
    },
    projectTeamItemDeleteIcon: {
        fontSize: 14,
        color: "rgba(0, 0, 0, 0.54)",
    },
}));

export const ProjectTeamItem: React.FC<IProjectTeamItemProps> = ({
    item,
    onDelete,
    showExpandedIcon,
}) => {
    const styles = useStyles();
    const doAction = useCallback(() => {
        if (onDelete) {
            onDelete();
        }
    }, [onDelete]);

    return (
        <div className={styles.projectTeamItem}>
            <Avatar src={item.avatar} title={item.name} className={styles.projectTeamItemAvatar} />
            <div className={styles.projectTeamItemInfo}>
                <div className={styles.projectTeamItemName}>{item.name}</div>
                <div className={styles.projectTeamItemPosition}>{item.position}</div>
            </div>
            <div className={styles.projectTeamItemActions} onClick={doAction}>
                {showExpandedIcon && (
                    <ExpandMoreIcon className={styles.projectTeamItemToggleIcon} />
                )}
                {onDelete && <CloseIcon className={styles.projectTeamItemDeleteIcon} />}
            </div>
        </div>
    );
};
