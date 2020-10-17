import { useEffect, useState } from "react";
import { isString } from "lodash";

// @return `src` - base64 encoded file | file path on server | undefined
export const useFileDataUrl = (file?: File): string | undefined => {
    const [src, setSrc] = useState<string>();
    useEffect(() => {
        const reader = new FileReader();
        if (file) {
            reader.onload = () => {
                setSrc(isString(reader.result) ? reader.result : undefined);
            };
            reader.readAsDataURL(file);
        } else {
            setSrc(undefined);
        }
        return () => {
            // need to abort onload for prevent updating unmounted component
            reader.abort();
        };
    }, [file]);
    return src;
};
