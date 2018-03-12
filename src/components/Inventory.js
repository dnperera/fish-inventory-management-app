import React from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import PropTypes from 'prop-types';
import base, { firebaseApp } from '../base';
import firebase from 'firebase';

class Inventory extends React.Component {
	static propTypes = {
		fishes: PropTypes.object,
		updateFish: PropTypes.func,
		deleteFish: PropTypes.func,
		loadInventory: PropTypes.func,
	};

	state = {
		uid: null,
		owener: null,
	};

	authHandler = async authData => {
		//lookup the current store in the firebase db
		const store = await base.fetch(this.props.storeID, { context: this });
		console.log(authData);
		console.log(store);
		//claim it if there is no owner
		if (!store.owner) {
			//save login user as new owener
			await base.post(`${this.props.storeID}/owner`, {
				data: authData.user.uid,
			});
		}
		//Set the state of the inventory component to reflect current user
		this.setState({
			uid: authData.user.uid,
			owener: store.owner || authData.user.uid,
		});
	};

	authenticate = provider => {
		const authProvider = new firebase.auth[`${provider}AuthProvider`]();
		firebaseApp
			.auth()
			.signInWithPopup(authProvider)
			.then(this.authHandler);
	};
	render() {
		//check if the user logged in
		if (!this.state.uid) {
			return <Login authenticate={this.authenticate} />;
		}
		//check the current loged user  own the store
		if (this.state.uid !== this.state.owener) {
			<div>
				<p>Sorry. you are not the owener!.</p>
			</div>;
		}
		return (
			<div className="inventory">
				<h3>Inventory!!!</h3>
				{Object.keys(this.props.fishes).map(key => {
					return (
						<EditFishForm
							key={key}
							fish={this.props.fishes[key]}
							index={key}
							updateFish={this.props.updateFish}
							deleteFish={this.props.deleteFish}
						/>
					);
				})}
				<AddFishForm addFish={this.props.addFish} />
				<button onClick={this.props.loadInventory}> Load Inventory</button>
			</div>
		);
	}
}

export default Inventory;
