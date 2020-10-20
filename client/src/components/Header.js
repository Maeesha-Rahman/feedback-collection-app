import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
    renderContent() {
        switch (this.props.auth) {
            case null:
                // still deciding
                return
            case false:
                // logged out
                return (
                    <li><a href="/auth/google">Login with Google</a></li>
                )
            // if logged in (not null or false)
            default:
                return (
                    <li><a href="/api/logout">Logout</a></li>
                )
        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link
                        to={this.props.auth ? '/surveys' : '/'}
                        className="left brand-logo">
                        Emaily
                    </Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return { auth };
}

export default connect(mapStateToProps)(Header);