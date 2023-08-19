import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import HomePage from './Pages/homepage/Homepage.component';
import ShopPage from './Pages/shop/Shop.component';
import SignInAndSignUpPage from './Pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './Pages/checkout/checkout.component';

import Header from './components/header/header.component';

import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.utils'; //EDITED

import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';
import { selectCollectionsForPreview } from './redux/shop/shop.selector'; //EDITED
class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        const { setCurrentUser, collectionsArray } = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);

                userRef.onSnapshot(snapShot => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    });
                });
            }

            setCurrentUser(userAuth);
            addCollectionAndDocuments('collections', collectionsArray.map(({ title, items }) => ({ title, items }))); //EDITED -> main line
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return ( <div>
            <Header/>
            <
            Switch >
            <
            Route exact path = '/'
            component = { HomePage }
            /> 
            <Route path = '/shop'
            component = { ShopPage }/> 
            <Route exact path = '/checkout'
            component = { CheckoutPage }/> 

            <Route exact path = '/signin'
            render = {() =>
                this.props.currentUser ? ( 
                    <Redirect to = '/'/>
                ) : ( <
                    SignInAndSignUpPage / >
                )
            }/> 
            </Switch> 
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    collectionsArray: selectCollectionsForPreview //EDITED
});

function mapDispatchToProps(dispatch) {
    return ({
        setCurrentUser: user => dispatch(setCurrentUser(user))
    });
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);