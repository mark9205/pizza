import { useState } from 'react';

function Sort({ selected, setSelected }) {
  const [isVisible, setIsVisible] = useState(false);
  const list = [
    { name: 'по популярности -', sort: 'rating' },
    { name: 'по популярности +', sort: '-rating' },
    { name: 'по цене -', sort: 'price' },
    { name: 'по цене +', sort: '-price' },
    { name: 'по алфавиту -', sort: 'title' },
    { name: 'по алфавиту +', sort: '-title' },
  ];

  const onClickSelected = (sort) => {
    setSelected(sort);
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
                className={selected.sort === item.sort ? 'active' : ''}
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
