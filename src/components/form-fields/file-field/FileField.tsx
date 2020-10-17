import { useFileDataUrl } from "hooks/form-fields";
import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

interface IFileFieldProps {
    accept?: string;
    description?: string;
    value?: File;
    sizes?: {
        width: number;
        height: number;
    };

    onChange(file?: File): void;
}
const useStyles = makeStyles((theme) => ({
    fileField: {},
    fileFieldDragArea: {
        display: "block",
        border: "1px dashed #1D1F32",
        position: "relative",
        cursor: "pointer",
    },
    fileFieldInput: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        width: "100%",
        opacity: 0,
        cursor: "pointer",
    },
    fileFieldValue: {
        position: "absolute",
        objectFit: "contain",
        width: "100%",
        height: "100%",
    },
    fileFieldDescription: {
        marginTop: 16,
        color: theme.palette.text.secondary,
        fontSize: 14,
    },
}));

export const FileField: React.FC<IFileFieldProps> = ({
    description,
    accept,
    value,
    sizes,
    onChange,
}) => {
    const styles = useStyles();
    const src = useFileDataUrl(value);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.files ? event.target.files[0] : undefined);
    };

    return (
        <div className={styles.fileField}>
            <div
                className={styles.fileFieldDragArea}
                style={{
                    paddingBottom: sizes ? `${(sizes.height / sizes.width) * 100}%` : "56.25%",
                }}
            >
                {src && <img key={src} src={src} className={styles.fileFieldValue} alt="" />}
                <input
                    className={styles.fileFieldInput}
                    type="file"
                    onChange={handleChange}
                    accept={accept}
                />
            </div>
            {description && <div className={styles.fileFieldDescription}>{description}</div>}
        </div>
    );
};
