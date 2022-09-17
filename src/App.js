import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import './scss/app.scss';
import pizzass from './assets/pizzas.json';

function App() {
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
            {pizzass.map((pizza) => (
              <PizzaBlock
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
