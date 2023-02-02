import React, { useEffect } from "react";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlockSkeleton";
import Sort, { sortList } from "../components/Sort";
import { useSelector } from "react-redux";
import {
	selectFilter,
	setCaregoryId,
	setCurrentPage,
	setFilters,
} from "../redux/slices/filterSlice";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import { useRef } from "react";
import { fetchPizzas, SearchPizzaParams, selectPizzaData } from "../redux/slices/pizzasSlise";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
	const isSearch = useRef(false);
	const isMounted = useRef(false);
	const { sort, categoryId, currentPage, searchValue } =
		useSelector(selectFilter);
	const { pizzass, status } = useSelector(selectPizzaData);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const onChangeCategory = (id: number) => {
		dispatch(setCaregoryId(id));
	};

	const onChangePage = (num: number) => {
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
    // eslint-disable-next-line
	}, [categoryId, sort, searchValue, currentPage]);

	//если был первый рендер - проверяем url-параметры и сохраняем в редаксе
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
			const sort = sortList.find(
				(obj) => obj.sortProperty === params.sortBy
			);
			dispatch(
				setFilters({
					searchValue: params.title,
    				currentPage: Number(params.currentPage),
    				categoryId: Number(params.category),
					sort,
				})
			);
			isSearch.current = true;
		}
    //eslint-disable-next-line
	}, []);

	//если был первый рендер - запрашиваем пиццы
	useEffect(() => {
		if (!isSearch.current) {
			getPizzas();
		}
		isSearch.current = false;
    //eslint-disable-next-line
	}, [categoryId, sort, searchValue, currentPage]);

	const items = pizzass.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

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
			{status === "error" ? (
				<div className="content__error-info">
					<h2>
						Произошла ошибка загрузки <span>😕</span>
						<p>К сожалению, не удалось получить пиццы..</p>
					</h2>
				</div>
			) : (
				<div className="content__items">
					{status === "loading" ? sleletons : items}
				</div>
			)}
			<Pagination currentPage={currentPage} onPageChange={onChangePage} />
		</div>
	);
};

export default Home;
