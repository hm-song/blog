import React from 'react';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                        <ul className="list-inline text-center">
                            <li className="list-inline-item">
                                <a href="#">
                                        <span className="fa-stack fa-lg">
                                          <i className="fa fa-circle fa-stack-2x" />
                                          <i className="fa fa-twitter fa-stack-1x fa-inverse" />
                                        </span>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#">
                                        <span className="fa-stack fa-lg">
                                          <i className="fa fa-circle fa-stack-2x" />
                                          <i className="fa fa-facebook fa-stack-1x fa-inverse" />
                                        </span>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#">
                                        <span className="fa-stack fa-lg">
                                          <i className="fa fa-circle fa-stack-2x" />
                                          <i className="fa fa-github fa-stack-1x fa-inverse" />
                                        </span>
                                </a>
                            </li>

                            <li className="list-inline-item">
                                <a href="#" data-toggle="modal" data-target="#loginModal">
                                    <span className="fa-stack fa-lg">
                                      <i className="fa fa-circle fa-stack-2x" />
                                      <i className="fa fa-cog fa-stack-1x fa-inverse" />
                                    </span>
                                </a>
                            </li>
                        </ul>
                        <p className="copyright text-muted">Copyright © Your Website 2017</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
