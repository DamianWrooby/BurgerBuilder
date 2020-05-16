import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
/* import Spinner from '../../components/UI/Spinner/Spinner'; */

class Orders extends Component {
	state = {
		orders: [],
		loading: true
	};
	componentDidMount() {
		axios
			.get('/orders.json')
			.then((response) => {
				const fetchedOrders = [];
				console.log(response.data);
				for (let key in response.data) {
					fetchedOrders.push({
						...response.data[key],
						id: key
					});
				}

				this.setState({ orders: fetchedOrders, loading: false });
			})
			.catch((err) => {
				this.setState({ loading: false });
				console.log(err);
			});
	}
	render() {
		return (
			<div>
				{this.state.orders.map((order) => (
					<Order key={order.id} ingredients={order.ingredients} price={order.price} />
				))}
			</div>
		);
	}
}

export default withErrorHandler(Orders, axios);