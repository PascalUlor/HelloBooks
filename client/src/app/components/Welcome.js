import React from 'react'
import css from '../css/style.scss'
import {Row, Col} from 'react-materialize'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Button} from 'react-materialize'
import {Link} from 'react-router-dom'
import {logout} from '../actions/auth'

// const name='Guest' componentWillMount() {     {this.props.name} }

const Welcome = ({isAuthenticated, logout}) => {
    const username = localStorage.getItem('username');
    if (!isAuthenticated) {
        return (
            <div className='welcome'>
                <Col s={12} m={6} l={4}>
                    <div className='head'>
                        <h1>Welcome Guest</h1>
                        <h3>Hello Books</h3>
                        <p>by Benny Ogidan</p>

                    </div>
                </Col>
            </div>
        );
    } else {
        return (
            <div className='welcome'>
                <Col s={8} m={10} l={4}>
                    <h4>Hello {username}</h4>
                    <Button
                        style={{
                        'marginBottom': '3em'
                    }}
                        onClick={() => logout()}>Logout</Button>
                </Col>
            </div>
        );
    }

}
Welcome.propTypes = {
    name: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    logout: PropTypes.func

};

const mapStateToProps = (state) => {
    // if (!state.user.user.token || state.user.user.token === "" ) { //if there is
    // no token, dont bother     return state.user.user.token = ''; } else {

    return {
        isAuthenticated: !!state.user.user,
        name: state.user.user
    };
    // }
}

export default connect(mapStateToProps, {logout})(Welcome);
