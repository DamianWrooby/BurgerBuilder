import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component {
	state = {
		name: '',
		email: '',
		adress: {
			street: '',
			postalCode: ''
		},
		loading: false
	};

	orderHandler = (event) => {
		event.preventDefault();
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customer: {
				name: 'Damian',
				address: {
					city: 'Bydgoszcz',
					street: 'Toruńska',
					zipCode: '85-023'
				}
			},
			deliveryTime: 'asap'
		}
		axios.post('/orders.json', order)
			.then((response) => {
				console.log(response);
				this.setState({ loading: false });
				this.props.history.push('/');
			}).catch((error) => {
				this.setState({ loading: false });
				console.log(error);
			});
	}

	render() {
		let classList = [classes.ContactData];
		classList = this.props.showContact ? [classes.ContactData, classes.Apear] : [classes.ContactData];

		let form = (
			<form>
				<input type="text" name="name" placeholder="Your name" />
				<input type="email" name="email" placeholder="Your email address" />
				<input type="text" name="street" placeholder="Street" />
				<input type="text" name="postal" placeholder="Postal code" />
				<Button btnType="Success" clicked={this.orderHandler} >ORDER</Button>
			</form>
		);
		if (this.state.loading) {
			form = <Spinner />;
		}
		return (

			<div className={classList.join(' ')}>
				<h4>Enter your contact data</h4>
				{form}
			</div>

		)
	};
}

export default ContactData;
