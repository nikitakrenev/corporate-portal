import React, { FC, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import cn from "classnames";

interface Props {
    skills: string[];
    departments: string[];
}

const useStyles = makeStyles({
    wrapper: {
        marginLeft: 40,
        backgroundColor: "rgba(206, 206, 209, 0.15)",
        borderRadius: 4,
        fontFamily: "Roboto, sans-serif",
        color: "#828496",
        fontSize: 12,
        lineHeight: "16px",
    },
    title: {
        marginBottom: 19,
        fontSize: 16,
        lineHeight: "20px",
        color: "#000000",
    },
    departments: {
        marginLeft: 6,
        listStyleType: "none",
        fontSize: 14,
        lineHeight: "18px",
    },
    department: {
        marginBottom: 20,
        cursor: "pointer",
    },
    skills: {
        maxHeight: 224,
        overflow: "hidden",
        marginLeft: 6,
        display: "flex",
        flexWrap: "wrap",
        "&._expanded": {
            maxHeight: 352,
            overflow: "auto",
        },
    },
    chip: {
        height: 24,
        margin: "0 8px 8px 0",
        padding: "4px 7px",
        display: "flex",
        boxSizing: "border-box",
        border: "1px solid #CECED1",
        borderRadius: 4,
        cursor: "pointer",
    },
    button: {
        margin: "4px 0 16px 6px",
        cursor: "pointer",
        outline: "none",
        border: 0,
        backgroundColor: "rgba(206, 206, 209, 0)",
        fontFamily: "Roboto, sans-serif",
        color: "#828496",
        fontSize: 12,
        lineHeight: "16px",
    },
    filter: {
        margin: 28,
        width: 210,
    },
});

export const Filter: FC<Props> = (props) => {
    const styles = useStyles();
    const { skills, departments } = props;
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleSkills = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.filter}>
                <p className={styles.title}>Отделы</p>
                <ul className={styles.departments}>
                    {departments.map((item, index) => (
                        <li className={styles.department} key={index}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.filter}>
                <p className={styles.title}>Навыки</p>
                <div className={cn(styles.skills, { _expanded: isExpanded })}>
                    {skills.map((item, index) => (
                        <div className={styles.chip} key={index}>
                            {item}
                        </div>
                    ))}
                </div>
                <button className={styles.button} type={"button"} onClick={() => toggleSkills()}>
                    {isExpanded ? "Свернуть" : "Показать все"}
                </button>
            </div>
        </div>
    );
};
