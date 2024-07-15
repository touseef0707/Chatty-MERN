import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import toast from 'react-hot-toast';
import useLogout from '../../hooks/useLogout';

Modal.setAppElement('#root');

// LogoutDiv: A sub-component of sidebar to logout user
const LogoutDiv = () => {

  // Get Logout method and loading state from useLogout hook
  const { Logout, loading } = useLogout();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  }

  const closeModal = () => {
    setModalIsOpen(false);
  }

  const handleLogout = async () => {
    await Logout();
    closeModal();
  }

  return (
    <div>
      <button
        className="bottomBar bottom-3 right-3 absolute flex justify-end items-end"
        onClick={openModal}
      >
        <img src="svg/logout.svg" className="mt-5 p-2 rounded-full border-none bg-red-600 hover:bg-red-800" alt="logout" />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Logout Confirmation"
        className="flex justify-center items-center inset-0 fixed bg-black bg-opacity-50"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
      >
        <div className="bg-black p-5 rounded-lg shadow-lg text-center">
          <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
          <p className="mb-4">Are you sure you want to log out?</p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800"
            >
              Yes
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LogoutDiv;
