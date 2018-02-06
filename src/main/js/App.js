import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Footer } from './components/index';
import { PostList, PostDetail, WritePost } from './pages';
import { MenuContainer, LoginContainer } from './containers';

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <MenuContainer/>
                    <Switch>
                        <Route exact path="/" component={PostList}/>
                        {/* path="/url/:pathVariable 형태로 변수 전달 가능 */}
                        <Route path="/posts/:id" component={PostDetail}/>
                        <Route path="/admin/write" component={WritePost}/>
                    </Switch>

                    <hr/>
                    <Footer/>
                    <LoginContainer/>
                </div>
            </Router>
        );
    }
}

export default App;