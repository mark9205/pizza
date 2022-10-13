import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../App";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlockSkeleton";
import Sort from "../components/Sort";
import { useSelector, useDispatch } from "react-redux";
import { setCaregoryId, setCurrentPage } from "../redux/slices/filterSlice";
import axios from "axios";

const Home = () => {
	const { sort, categoryId, currentPage } = useSelector(
		(state) => state.filter
	);

	const dispatch = useDispatch();

	const onChangeCategory = (id) => {
		dispatch(setCaregoryId(id));
	};

	const onChangePage = (num) => {
		dispatch(setCurrentPage(num));
	};

	const { searchValue } = useContext(SearchContext);
	const [pizzass, setPizzas] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const baseurl = "https://6321861e82f8687273b37ba3.mockapi.io/pizzas";
	const sortBy = sort.sortProperty.replace("-", "");
	const order = sort.sortProperty.includes("-") ? "asc" : "desc";
	const category = categoryId > 0 ? `category=${categoryId}` : "";
	const title = searchValue ? `title=${searchValue}` : "";

	useEffect(() => {
		setIsLoading(true);
		axios
			.get(
				`${baseurl}?page=${currentPage}&limit=4&${category}&${title}&sortBy=${sortBy}&order=${order}`
			)
			.then((res) => setPizzas(res.data))
			.catch((err) => alert(err))
			.finally(setIsLoading(false));
		window.scrollTo(0, 0);
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	const items = pizzass.map((pizza) => (
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
					activeCategory={categoryId}
					setActiveCategory={onChangeCategory}
				/>
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading ? sleletons : items}
			</div>
			<Pagination currentPage={currentPage} onPageChange={onChangePage} />
		</div>
	);
};

export default Home;
