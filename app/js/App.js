'use strict';

import React              from 'react/addons';
import {Navbar}           from 'react-bootstrap';
import {NavItem}          from 'react-bootstrap';
import {MenuItem}         from 'react-bootstrap';
import {NavDropdown}      from 'react-bootstrap';
import {Nav}              from 'react-bootstrap';
import {ListenerMixin}    from 'reflux';
import {RouteHandler}     from 'react-router';

import CurrentUserActions from './actions/CurrentUserActions';
import CurrentUserStore   from './stores/CurrentUserStore';
import Header             from './components/Header';
import Footer             from './components/Footer';

var App = React.createClass({

  mixins: [ListenerMixin],

  getInitialState() {
    return {
      currentUser: {}
    };
  },

  _onUserChange(err, user) {
    if ( err ) {
      this.setState({ error: err });
    } else {
      this.setState({ currentUser: user || {}, error: null });
    }
  },

  componentWillMount() {
    console.log('Mounting App');
  },

  componentDidMount() {
    this.listenTo(CurrentUserStore, this._onUserChange);
    CurrentUserActions.checkLoginStatus();
  },

  render() {
    return (
      <div>

		<Navbar brand={<a href="/">Registry</a>} inverse>
			<Nav right>
			<NavItem eventKey={1} href='/repositories'>Repositories</NavItem>
			<NavDropdown eventKey={2} title='Dropdown' id='basic-nav-dropdown'>
				<MenuItem eventKey='1'>Action</MenuItem>
				<MenuItem eventKey='2'>Another action</MenuItem>
				<MenuItem eventKey='3'>Something else here</MenuItem>
				<MenuItem divider />
				<MenuItem eventKey='4'>Separated link</MenuItem>
			</NavDropdown>
			</Nav>
		</Navbar>
        <Header />

        <RouteHandler params={this.props.params}
                      query={this.props.query}
                      currentUser={this.state.currentUser} />

        <Footer />

      </div>
    );
  }

});

export default App;
