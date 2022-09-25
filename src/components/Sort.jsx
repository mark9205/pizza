import { useState } from 'react';

function Sort() {
  const [isVisible, setIsVisible] = useState(false);
  const list = ['по популярности', 'по цене', 'по алфавиту'];
  const [selected, setSelected] = useState(0);

  const onClickSelected = (i) => {
    setSelected(i);
    setIsVisible(false);
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <span onClick={() => setIsVisible((prev) => !prev)}>
          {list[selected]}
        </span>
      </div>
      {isVisible && (
        <div className="sort__popup">
          <ul>
            {list.map((item, i) => (
              <li
                className={selected === i ? 'active' : ''}
                onClick={() => onClickSelected(i)}
                key={i}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Sort;
