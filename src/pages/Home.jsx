import React, { useEffect, useState } from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlockSkeleton";
import Sort from "../components/Sort";

const Home = () => {
	const [pizzass, setPizzas] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [activeCategory, setActiveCategory] = useState(0);
	const [selectedSort, setSelectedSort] = useState(0);

	const sorting = ["rating", "price", "title"];
  const sortingBy = sorting[selectedSort]
	const baseurl = "https://6321861e82f8687273b37ba3.mockapi.io/pizzas";

	useEffect(() => {
    setIsLoading(true)
		fetch(
			`${baseurl}?category=${activeCategory? activeCategory: ''}&sortBy=${sortingBy}`
		)
			.then((res) => res.json())
			.then((json) => setPizzas(json))
			.catch((err) => alert(err))
			.finally(() => setIsLoading(false));
		window.scrollTo(0, 0);
	}, [activeCategory, selectedSort, sortingBy]);

	return (
		<div className="container">
			<div className="content__top">
				<Categories
					activeCategory={activeCategory}
					setActiveCategory={setActiveCategory}
				/>
				<Sort selected={selectedSort} setSelected={setSelectedSort} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading
					? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
					: pizzass.map((pizza) => (
							<PizzaBlock
								types={pizza.types}
								image={pizza.imageUrl}
								key={pizza.id}
								sizes={pizza.sizes}
								title={pizza.title}
								price={pizza.price}
							/>
					  ))}
			</div>
		</div>
	);
};

export default Home;
