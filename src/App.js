import {Route, Routes} from "react-router-dom";

import {AuthRequireLayout, MainLayouts} from "./layouts";
import {
    ActivateUserPage, AutoParkCarsPage,
    AutoParksPage,
    CarsPage,
    HomePage,
    LoginPage,
    PageNotFound,
    RegisterPage,
    UserProfilePage
} from "./pages";
import {RouterEndpoints} from "./routes";
import css from './app.module.css';
import {AutoParkDetail, CarDetail, EmailMsg} from "./components";

function App() {
    return (<div className={css.App}>
        <Routes>
            <Route path={RouterEndpoints.index} element={<MainLayouts/>}>
                <Route path={RouterEndpoints.index} index element={<HomePage/>}/>

                <Route element={<AuthRequireLayout/>}>
                    {/*<Route path={RouterEndpoints.cars} element={<CarsPage/>}/>*/}
                    <Route path={`${RouterEndpoints.cars}/detail/:id`} element={<CarDetail/>}/>
                    <Route path={`${RouterEndpoints.profile}`} element={<UserProfilePage/>}>
                    </Route>

                    <Route path={RouterEndpoints.autoParks} element={<AutoParksPage/>}>
                        <Route index element={<CarsPage/>}/>
                        <Route path={`:id`} element={<AutoParkCarsPage/>}/>
                    </Route>

                </Route>
                <Route path={RouterEndpoints.login} element={<LoginPage/>}/>
                <Route path={`${RouterEndpoints.login}/msg`} element={<EmailMsg/>}/>
                <Route path={RouterEndpoints.register} element={<RegisterPage/>}/>

                <Route path={`${RouterEndpoints.activate}/:token`} element={<ActivateUserPage/>}/>
                <Route path={RouterEndpoints.notFound} element={<PageNotFound/>}/>

            </Route>
        </Routes>

    </div>);
}

export default App;