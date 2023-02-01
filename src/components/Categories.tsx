import React from "react";

type CategoriesProps = {
	activeCategory: number;
	setActiveCategory: (index: number) => void;
};

const categories = [
	"Все",
	"Мясные",
	"Вегетарианская",
	"Гриль",
	"Острые",
	"Закрытые",
];

const Categories: React.FC<CategoriesProps> = ({
	activeCategory,
	setActiveCategory,
}) => {
	return (
		<div className="categories">
			<ul>
				{categories.map((cat, index) => (
					<li
						className={index === activeCategory ? "active" : ""}
						key={index}
						onClick={() => setActiveCategory(index)}
					>
						{cat}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Categories;
