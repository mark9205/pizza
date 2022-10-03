import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../App";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlockSkeleton";
import Sort from "../components/Sort";

const Home = () => {
	const { searchValue } = useContext(SearchContext);

	const [pizzass, setPizzas] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [activeCategory, setActiveCategory] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedSort, setSelectedSort] = useState({
		name: "по популярности",
		sort: "rating",
	});

	const baseurl = "https://6321861e82f8687273b37ba3.mockapi.io/pizzas";
	console.log(searchValue);

	useEffect(() => {
		setIsLoading(true);
		fetch(`${baseurl}
		?title=${searchValue ? searchValue : ""}
		&category=${activeCategory ? activeCategory : ""}
		&sortBy=${selectedSort.sort.replace("-", "")}&order=${
			selectedSort.sort.includes("-") ? "asc" : "desc"
		}
    &page=${currentPage}&limit=4  
      `)
			.then((res) => res.json())
			.then((json) => setPizzas(json))
			.catch((err) => alert(err))
			.finally(() => setIsLoading(false));
		window.scrollTo(0, 0);
	}, [activeCategory, selectedSort, searchValue, currentPage]);

	const items = pizzass
		// .filter((item) =>
		// 	item.title.toLowerCase().includes(searchValue.toLowerCase())
		// )
		.map((pizza) => (
			<PizzaBlock
				types={pizza.types}
				image={pizza.imageUrl}
				key={pizza.id}
				sizes={pizza.sizes}
				title={pizza.title}
				price={pizza.price}
			/>
		));

	const sleletons = [...new Array(4)].map((_, i) => <Skeleton key={i} />);

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
				{isLoading ? sleletons : items}
			</div>
			<Pagination onPageChange={(num) => setCurrentPage(num)} />
		</div>
	);
};

export default Home;
