import React, { useContext, useEffect, useState } from "react";
import { SearchContext } from "../App";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlockSkeleton";
import Sort, { sortList } from "../components/Sort";
import { useSelector, useDispatch } from "react-redux";
import {
	setCaregoryId,
	setCurrentPage,
	setFilters,
} from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import { useRef } from "react";
import { fetchPizzas } from "../redux/slices/pizzasSlise";

const Home = () => {
	const { searchValue } = useContext(SearchContext);
	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const { sort, categoryId, currentPage } = useSelector(
		(state) => state.filter
	);

	const { pizzass, status } = useSelector((state) => state.pizza);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onChangeCategory = (id) => {
		dispatch(setCaregoryId(id));
	};

	const onChangePage = (num) => {
		dispatch(setCurrentPage(num));
	};

	const getPizzas = async () => {
		const baseurl = "https://6321861e82f8687273b37ba3.mockapi.io/pizzas";
		const sortBy = sort.sortProperty.replace("-", "");
		const order = sort.sortProperty.includes("-") ? "asc" : "desc";
		const category = categoryId > 0 ? `category=${categoryId}` : "";
		const title = searchValue ? `title=${searchValue}` : "";

		dispatch(
			fetchPizzas({
				baseurl,
				sortBy,
				order,
				category,
				title,
				currentPage,
			})
		);
		window.scrollTo(0, 0);
	};

	//если изменили параметры и был первый рендер - вшиваем параметры в адресную строку
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify(
				{
					sortProperty: sort.sortProperty,
					categoryId,
					currentPage,
				},
				{ addQueryPrefix: true }
			);

			navigate(queryString);
		}
		isMounted.current = true;
    // if (!window.location.search) {
    //   fetchPizzas()
    // }
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	//если был первый рендер - проверяем url-параметры и сохраняем в редаксе
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = sortList.find(
				(obj) => obj.sortProperty === params.sortProperty
			);
			dispatch(
				setFilters({
					...params,
					sort,
				})
			);
			isSearch.current = true;
		}
	}, []);

	//если был первый рендер - запрашиваем пиццы
	useEffect(() => {
		if (!isSearch.current) {
			getPizzas();
		}
		isSearch.current = false;
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	const items = pizzass.map((pizza) => (
		<PizzaBlock
			id={pizza.id}
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
				{status === "loading" ? sleletons : items}
			</div>
			<Pagination currentPage={currentPage} onPageChange={onChangePage} />
		</div>
	);
};

export default Home;
