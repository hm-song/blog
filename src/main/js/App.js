import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Menu, Header, Footer, WritePost } from './components/index';
import PostListContainer from './containers/PostListContainer';



class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Menu/>
                    <Header/>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-10 mx-auto">
                                <Switch>
                                    <Route exact path="/" component={PostListContainer}/>
                                    <Route path="/write" component={WritePost}/>
                                </Switch>
                            </div>
                        </div>
                    </div>

                    <hr/>

                    <Footer/>
                </div>
            </Router>
        );
    }
}

export default App;