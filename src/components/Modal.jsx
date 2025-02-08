import { useDispatch, useSelector } from "react-redux";
import { closeModal, setModalOpen } from "../redux/modalSlice";

export default function Modal({ children }) {
  const isOpen = useSelector((state) => state.modal.modalOpen);

  const dispatch = useDispatch();
  // console.log("Modal user: ", props.user);

  return (
    <>
      {isOpen ? (
        <>
          <div
            id="modalEl"
            tabindex="-1"
            aria-hidden="true"
            className="fixed left-0 right-0 top-0 z-50 h-[calc(100%)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
          >
            <div
              className="fixed left-0 right-0 top-0 h-[calc(100%)] max-h-full w-full bg-[#00000099]"
              onClick={() => dispatch(closeModal(false))}
            ></div>
            <div className="relative max-h-full w-full mx-auto max-w-2xl mb-5">
              {/* <!-- Modal content --> */}
              <div className="relative rounded-lg bg-white shadow-sm dark:bg-gray-700">
                {/* <!-- Modal header --> */}
                <div className="flex items-start justify-between rounded-t p-5 pb-0 dark:border-gray-600">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white lg:text-2xl"></h3>
                  <button
                    type="button"
                    onClick={() => dispatch(closeModal(false))}
                    className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    <svg
                      className="h-3 w-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                {/* <!-- Modal body --> */}
                <div className="space-y-6 p-6 pt-0">{children}</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
