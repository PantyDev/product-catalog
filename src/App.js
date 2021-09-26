import { BrowserRouter, Route } from "react-router-dom"
import Main from "./components/main/Main"
import Login from "./components/auth/Login"
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './Auth';

function App() {
    return (
    <AuthProvider>
        <BrowserRouter>
            <div>
                <PrivateRoute exact path="/" component={Main}/>
                <Route path="/login" component={Login}/>
            </div>
        </BrowserRouter>
    </AuthProvider>
    )

    
}

export default App;
