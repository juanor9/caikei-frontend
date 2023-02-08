/* eslint-disable no-unused-vars */
import './Movements.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../feature/users/services/users';
import TopNav from '../../components/TopNav/TopNav';
import { getLibrariesByPublisher } from '../../feature/libraries/services/libraries';
import LibraryCard from '../../feature/libraries/components/LibraryCard/LibraryCard';

const MovementsPage = () => {
  const userToken = localStorage.getItem('login-token');
  return (
    <div className="libraries">
      <TopNav />
      <main>
        <h2>Movimientos de ejemplares</h2>
        <Link to="/movement/register" className="movements__add-button">Crear nuevo movimiento</Link>
      </main>
    </div>
  );
};

export default MovementsPage;
