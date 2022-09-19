import { useEffect, useState } from "react";
import Categories from "./components/Categories";
import Header from "./components/Header";
import PizzaBlock from "./components/PizzaBlock";
import Skeleton from "./components/PizzaBlockSkeleton";
import Sort from "./components/Sort";
import "./scss/app.scss";

function App() {
	const [pizzass, setPizzas] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch("https://6321861e82f8687273b37ba3.mockapi.io/pizzas")
			.then((res) => res.json())
			.then((json) => setPizzas(json))
			.catch((err) => alert(err))
			.finally(() => setIsLoading(false));
	}, []);

	return (
		<div className="wrapper">
			<Header />
			<div className="content">
				<div className="container">
					<div className="content__top">
						<Categories />
						<Sort />
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
			</div>
		</div>
	);
}

export default App;
