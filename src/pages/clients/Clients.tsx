import React from "react";
import { PageContainer } from "../../widgets/page-container";
import { PageHeader } from "../../components/page-header";

export const Clients = () => {
    return (
        <PageContainer>
            <PageHeader title={"Клиенты"} buttonType={"add"} />
        </PageContainer>
    );
};
