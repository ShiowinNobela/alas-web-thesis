import DisplayPicture from '../components/images/bg-1.jpg';
import Product from '../components/images/product1.jpg';
import Cart from '../../bigComponents/Cart.jsx';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function OldJudeUserList() {
  const [data, setData] = useState([]);
  const [limData, setLimData] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    axios
      .get('/api/products')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  // const filteredOrders = statusFilter === "All"
  //   ? data
  //   : data.filter(order => order.role_name.toLowerCase() === statusFilter.toLowerCase());

  // useEffect(() => {
  //   axios.get("/api/limited-offer")
  //   .then((res) => setLimData(res.data))
  //   .catch((err) => console.log(err));
  // })

  return (
    <>
      <section className="h-full max-h-full max-w-screen bg-yellow-100 bg-cover bg-fixed bg-no-repeat">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          <div className="col-span-2 mx-auto py-5 lg:col-span-3">
            <div className="flex flex-col items-center justify-center">
              <img
                src={DisplayPicture}
                alt="/"
                className="mx-auto h-[200px] w-[350px] sm:w-[1225px] lg:h-[200px]"
              />
            </div>

            <div className="mx-auto flex w-7xl flex-col items-center justify-center py-2">
              <ul className="flex w-[300px] items-center justify-between rounded-lg bg-[#EA1A2060] px-4 font-black lg:w-[1225px]">
                <li onClick={() => setStatusFilter('All')}>All</li>
                <li> Sauces </li>
                <li> Chili Oils </li>
                <li> Spices </li>
                <li onClick={() => setStatusFilter('Limited Offers')}>
                  Limited Offers
                </li>
              </ul>

              <div className="grid cursor-pointer grid-cols-2 gap-3 py-5 sm:w-7xl lg:grid-cols-4">
                {data
                  .filter((d) => d.stock_quantity > 0)
                  .map((d) => (
                    <Link to={`/ProductDetailsPage/${d.id}`}>
                      <div className="mx-auto flex h-[200px] w-[200px] flex-col items-center justify-center lg:h-[300px] lg:w-[300px]">
                        <img
                          src={d.image}
                          alt="/"
                          className="h-[150px] w-[150px] pb-3 lg:h-[250px] lg:w-[250px]"
                        />
                        <div className="flex flex-row justify-around gap-8">
                          <p className="font-semibold"> {d.name} </p>
                          <p className="font-bold"> {d.price} </p>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          {window.localStorage.getItem('user') && <Cart />}
        </div>
      </section>
    </>
  );
}

export default OldJudeUserList;
