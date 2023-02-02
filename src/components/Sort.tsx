import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	selectSort,
	setSort,
	SortPropEnum,
	SortType,
} from "../redux/slices/filterSlice";

type SortItem = {
	name: string;
	sortProperty: SortPropEnum;
};

type PopupClick = MouseEvent & { path: Node[] };

export const sortList: SortItem[] = [
	{ name: "по популярности ↓", sortProperty: SortPropEnum.RATING_DESC },
	{ name: "по популярности ↑", sortProperty: SortPropEnum.RATING_ASC },
	{ name: "по цене ↓", sortProperty: SortPropEnum.PRICE_DESC },
	{ name: "по цене ↑", sortProperty: SortPropEnum.PRICE_ASC },
	{ name: "по алфавиту ↓", sortProperty: SortPropEnum.TITLE_DESC },
	{ name: "по алфавиту ↑", sortProperty: SortPropEnum.TITLE_ASC },
];

const SortPopup: React.FC = () => {
	const selected = useSelector(selectSort);
	const dispatch = useDispatch();
	const sortRef = useRef<HTMLDivElement>(null);

	const [isVisible, setIsVisible] = useState(false);

	const onClickSelected = (item: SortType) => {
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

export default SortPopup;
