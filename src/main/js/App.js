import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Menu, Footer } from './components/index';
import { PostList, PostDetail } from './pages';



class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Menu/>
                    <Switch>
                        <Route exact path="/" component={PostList}/>

                        {/* path="/url/:pathVariable 형태로 변수 전달 가능 */}
                        <Route path="/posts/:id" component={PostDetail}/>
                    </Switch>

                    <hr/>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

export default App;