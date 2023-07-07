import React from 'react'
import Header from '../../Components/Header';
import Buscador from './Buscador';
import Categories from "./Categories";
import RecomendationList from "./RecomendationList";
import "../../styles/Home.css";


export default function Home() {
  return (
    <>
        <Buscador/>
        <Categories/>
        <RecomendationList/>
    </>
  )
}
