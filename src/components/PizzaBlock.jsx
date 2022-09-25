import { useState } from 'react';

function PizzaBlock({ title, price, sizes, image, types }) {
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const typeNames = ['тонкое', 'традиционное'];

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={image} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((type, i) => (
              <li
                key={i}
                onClick={() => setActiveType(i)}
                className={activeType === i ? 'active' : ''}
              >
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size, i) => (
              <li
                key={i}
                className={activeSize === i ? 'active' : ''}
                onClick={() => setActiveSize(i)}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <div className="button button--outline button--add">
            <span>Добавить</span>
            <i>2</i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PizzaBlock;
