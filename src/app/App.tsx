import { CssBaseline } from "@material-ui/core";
import { Clients } from "pages/clients";
import { EditEmployee } from "pages/eidit-employee";
import { Modules } from "pages/modules";
import { ProjectDetail } from "pages/project-detail";
import { ProjectPlanning } from "pages/project-planning";
import { Projects } from "pages/projects";
import { ResourcePlanning } from "pages/resource-planning";
import { Staff } from "pages/staff";
import React from "react";
import { Route, Router, Switch } from "react-router";
import { AppContext } from "context";
import { EmployeeProfile } from "pages/employee-profile";
import { transport } from "services/transport";
import { IConfig } from "entities";
import { PageRoot } from "widgets/page-root";
import { ProjectEdit } from "../widgets/project-edit";

const config: IConfig = require("../config/config.json");

transport.init(config.serverUrl);

function App() {
    return (
        <Router history={AppContext.getHistory()}>
            <PageRoot>
                <CssBaseline />
                <Switch>
                    <Route path={"/projects"} exact>
                        <Projects />
                    </Route>
                    <Route path={"/projects/:projectId"} exact>
                        <ProjectDetail />
                    </Route>
                    <Route path={"/projects/:projectId/edit"} exact>
                        <ProjectEdit />
                    </Route>
                    <Route path={"/staff"} exact>
                        <Staff />
                    </Route>
                    <Route path={"/staff/:id"} exact>
                        <EmployeeProfile />
                    </Route>
                    <Route path={"/staff/:id/edit/:type"} exact>
                        <EditEmployee />
                    </Route>
                    <Route path={"/clients"} exact>
                        <Clients />
                    </Route>
                    <Route path={"/modules"} exact>
                        <Modules />
                    </Route>
                    <Route path={"/resource-planning"} exact>
                        <ResourcePlanning />
                    </Route>
                    <Route path={"/"} exact>
                        <ProjectPlanning />
                    </Route>
                </Switch>
            </PageRoot>
        </Router>
    );
}

export default App;
