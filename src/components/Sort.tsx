import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSort, setSort } from "../redux/slices/filterSlice";

type sortItem = {
	name: string;
	sortProperty: string;
};

type PopupClick = MouseEvent & { path: Node[] };

export const sortList: sortItem[] = [
	{ name: "по популярности ↓", sortProperty: "rating" },
	{ name: "по популярности ↑", sortProperty: "-rating" },
	{ name: "по цене ↓", sortProperty: "price" },
	{ name: "по цене ↑", sortProperty: "-price" },
	{ name: "по алфавиту ↓", sortProperty: "title" },
	{ name: "по алфавиту ↑", sortProperty: "-title" },
];

const Sort: React.FC = () => {
	const selected = useSelector(selectSort);
	const dispatch = useDispatch();
	const sortRef = useRef<HTMLDivElement>(null);

	const [isVisible, setIsVisible] = useState(false);

	const onClickSelected = (item: sortItem) => {
		dispatch(setSort(item));
		setIsVisible(false);
	};

	useEffect(() => {
		const clickOutside = (event: any) => {
			const _event = event as PopupClick;
			var path = _event.composedPath ? event.composedPath() : event.path;
			if (!path.includes(sortRef.current)) {
				setIsVisible(false);
			}
		};
		document.body.addEventListener("click", clickOutside);

		return () => {
			document.body.removeEventListener("click", clickOutside);
		};
	}, []);

	return (
		<div ref={sortRef} className="sort">
			<div className="sort__label">
				<span onClick={() => setIsVisible((prev) => !prev)}>
					{selected.name}
				</span>
			</div>
			{isVisible && (
				<div className="sort__popup">
					<ul>
						{sortList.map((item, i) => (
							<li
								className={
									selected.sortProperty === item.sortProperty
										? "active"
										: ""
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
};

export default Sort;
