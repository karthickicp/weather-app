import { Dialog } from "@headlessui/react";

export const AlertModal = ({
  isOpen,
  handleModalClose,
}: {
  isOpen: boolean;
  handleModalClose: () => void;
}) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

      <div className="modal-container bg-white p-6 w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto relative">
        <button
          onClick={handleModalClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <h2 className="text-lg font-bold mb-4">Location Access</h2>
        {/* <div className="modal-content py-4 text-left px-6">Hi Luca</div> */}
        <p className="modal-content text-gray-700 text-md leading-6 mb-6">To retrieve weather details, you must grant permission to access your location.</p>
      </div>
    </div>
  );
};
