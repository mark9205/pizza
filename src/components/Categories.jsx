import { useState } from 'react';

function Categories() {
  const [activeCategory, setActiveCategory] = useState(0);
  const categories = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((cat, index) => (
          <li
            className={index === activeCategory ? 'active' : ''}
            key={index}
            onClick={() => setActiveCategory(index)}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
