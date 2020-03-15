import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';
import Aux from '../../hoc/Aux/Aux';

const burger = (props) => {
	let transformedIngredients = Object.keys(props.ingredients)
		.map((igKey) => {
			return [
				...Array(props.ingredients[igKey])
			].map((_, i) => {
				return <BurgerIngredient key={igKey + i} type={igKey} />;
			});
		})
		.flat();
	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Add some ingredients.</p>;
	}

	return (
		<Aux>
			<div className={classes.BackgroundImage} />
			<div className={classes.Burger}>
				<BurgerIngredient type="bread-top" />
				{transformedIngredients}
				<BurgerIngredient type="bread-bottom" />
			</div>
		</Aux>
	);
};
export default burger;
