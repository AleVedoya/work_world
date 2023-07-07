/* eslint-disable react/prop-types */
import { useState } from 'react';
import '../../styles/ImagenesGrid.css';
import Modal from '../ui/Modal.jsx';
import ImageSlider from './ImageSlider';

export default function ImagenesGrid() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const imagenes = [
    '/images/oficina2.jpg',
    '/images/oficina3.jpg',
    '/images/oficina4.jpg',
    '/images/oficina5.jpg'
  ]

  return (
    <>
      <div className='display-container'>
        <img className='grid-span-2' src="/images/oficina1.jpg" alt="" />
        {imagenes.map((img,index) => <img key={index} className='img-component' src={img} alt="" />)}
        <a className='verMas' onClick={openModal} href="#">Ver más</a>
      </div>
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <ImageSlider />
        </Modal>
      )}
    </>
  );
}