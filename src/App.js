import React from 'react';
import HomePage from './pages/homepage/homepage.component'
import Shop from './pages/shop/shop.component';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/header/header.component';
import SignInAndSignOut from './pages/sign-in-and-sing-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';

class App extends React.Component {


  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          }
          )
        });

      }
      else {
        setCurrentUser(userAuth)
      }

    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={Shop} />
          <Route exact path="/signin" render={() => this.props.currentUser ? (<Redirect to="/" />) : (<SignInAndSignOut />)} />
        </Switch>
      </div>
    );
  }

}

const mapStateToProps = ({ user }) => (
  {
    currentUser: user.currentUser
  }
);

const mapDispatchToProp = dispatch => (
  {
    setCurrentUser: user => dispatch(setCurrentUser(user))
  }
)

export default connect(mapStateToProps, mapDispatchToProp)(App);
