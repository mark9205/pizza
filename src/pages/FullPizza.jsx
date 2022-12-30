import React from 'react';
//import pizza from '../assets/img/pngegg.png';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const FullPizza = () => {
  const [pizza, setPizza] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://6321861e82f8687273b37ba3.mockapi.io/pizzas/' + id
        );
        setPizza(data);
      } catch (error) {
        alert('Ошибка загрузки пиццы, попробуйте повторить запрос');
      }
    }
    fetchPizza();
  }, [id]);

  if (!pizza) {
    return 'загрузка...';
  }

  return (
    <div className="container">
      <h1>Информация о пицце</h1>
      <h2>{pizza.title}</h2>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt unde
        saepe accusantium ipsa ab velit corporis a consequatur eaque iste.
      </p>
      <img src={pizza.imageUrl} alt="Pizza" />
    </div>
  );
};

export default FullPizza;
