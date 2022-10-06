import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSort } from "../redux/slices/filterSlice";

function Sort() {
	const selected = useSelector((state) => state.filter.sort);
	const dispatch = useDispatch();

	const [isVisible, setIsVisible] = useState(false);
	const list = [
		{ name: "по популярности -", sortProperty: "rating" },
		{ name: "по популярности +", sortProperty: "-rating" },
		{ name: "по цене -", sortProperty: "price" },
		{ name: "по цене +", sortProperty: "-price" },
		{ name: "по алфавиту -", sortProperty: "title" },
		{ name: "по алфавиту +", sortProperty: "-title" },
	];

	const onClickSelected = (item) => {
		dispatch(setSort(item));
		setIsVisible(false);
	};

	return (
		<div className="sort">
			<div className="sort__label">
				<span onClick={() => setIsVisible((prev) => !prev)}>
					{selected.name}
				</span>
			</div>
			{isVisible && (
				<div className="sort__popup">
					<ul>
						{list.map((item, i) => (
							<li
								className={
									selected.sortProperty === item.sortProperty ? "active" : ""
								}
								onClick={() => onClickSelected(item)}
								key={i}
							>
								{item.name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default Sort;
