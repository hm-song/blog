import React, {Component} from 'react';
import {Menu, Header, PostList, Footer} from './components/index';
import PostListContainer from './containers/PostListContainer';

class App extends Component {
    render() {
        return (
            <div>
                <Menu/>
                <Header/>

                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-10 mx-auto">
                            <PostListContainer/>
                        </div>
                    </div>
                </div>

                <hr/>

                <Footer/>
            </div>
        );
    }
}

export default App;