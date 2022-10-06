import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../App";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlockSkeleton";
import Sort from "../components/Sort";
import { useSelector, useDispatch } from "react-redux";
import { setCaregoryId } from "../redux/slices/filterSlice";

const Home = () => {
	const { sort, categoryId } = useSelector((state) => state.filter);

	const dispatch = useDispatch();

	const onChangeCategory = (id) => {
		dispatch(setCaregoryId(id));
	};

	const { searchValue } = useContext(SearchContext);
	const [pizzass, setPizzas] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	const baseurl = "https://6321861e82f8687273b37ba3.mockapi.io/pizzas";
	const sortBy = sort.sortProperty.replace("-", "");
	const order = sort.sortProperty.includes("-") ? "asc" : "desc";
	const category = categoryId > 0 ? categoryId : "";
	const search = searchValue ? searchValue : "";

	useEffect(() => {
		setIsLoading(true);
		fetch(`${baseurl}
		?title=${search}
		&category=${category}
		&sortBy=${sortBy}&order=${order}
    &page=${currentPage}&limit=4  
      `)
			.then((res) => res.json())
			.then((json) => setPizzas(json))
			.catch((err) => alert(err))
			.finally(() => setIsLoading(false));
		window.scrollTo(0, 0);
	}, [categoryId, sort, searchValue, currentPage]);

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
			<Pagination onPageChange={(num) => setCurrentPage(num)} />
		</div>
	);
};

export default Home;
