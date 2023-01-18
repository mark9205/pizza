import React from 'react';
//import pizza from '../assets/img/pngegg.png';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{ title: string, imageUrl: string }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://6321861e82f8687273b37ba3.mockapi.io/pizzas/' + id
        );
        setPizza(data);
      } catch (error) {
        alert('Ошибка загрузки пиццы, попробуйте повторить запрос');
        navigate('/');
      }
    }
    fetchPizza();
  }, [id]);

  if (!pizza) {
    return <>'загрузка...'</>;
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
