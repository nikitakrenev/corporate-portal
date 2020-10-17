import { Grid } from "@material-ui/core";
import { FileField } from "components/form-fields/file-field";
import { useState } from "react";
import * as React from "react";
import { makeStyles } from "@material-ui/core/styles";

interface IProjectGalleryProps {
    projectId: string;
}
const useStyles = makeStyles((theme) => ({
    projectGalleryTitle: {
        textTransform: "uppercase",
        color: theme.palette.primary.main,
        marginBottom: 24,
    },
}));

export const ProjectGallery: React.FC<IProjectGalleryProps> = ({ children }) => {
    const styles = useStyles();
    const [cover, setCover] = useState<File>();
    const [presentation, setPresentation] = useState<File>();

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <div className={styles.projectGalleryTitle}>Обложка проекта</div>
                <FileField
                    accept="image/png"
                    description="Загрузите изображение в формате PNG. Размер: 1192 x 477"
                    onChange={setCover}
                    value={cover}
                    sizes={{
                        width: 1192,
                        height: 477,
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <div className={styles.projectGalleryTitle}>
                    Графические изображения для презентации
                </div>
                <FileField
                    accept="image/png"
                    description="Загрузите изображение в формате PNG. Размер: 2043 х 1209."
                    onChange={setPresentation}
                    value={presentation}
                    sizes={{
                        width: 2043,
                        height: 1209,
                    }}
                />
            </Grid>
        </Grid>
    );
};
