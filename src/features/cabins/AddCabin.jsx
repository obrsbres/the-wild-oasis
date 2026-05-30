import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';
import Compaund from '../../ui/Compaund';

import { HiXMark } from 'react-icons/hi2';

function AddCabin() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '2rem',
        flexWrap: 'wrap',
        flexDirection: 'column',
      }}
    >
      <div>
        <Modal>
          <Modal.Open opens='cabin-form'>
            <Button variation='primary'>Add new cabin</Button>
          </Modal.Open>
          <Modal.Window name='cabin-form'>
            <CreateCabinForm />
          </Modal.Window>
        </Modal>
      </div>
      <div>
        <Compaund>
          <Compaund.Open>
            <Button variation='primary'>Show counter</Button>
          </Compaund.Open>
          <Compaund.Window>
            <Compaund.Close>
              <Button>
                <HiXMark />
              </Button>
            </Compaund.Close>
            <Compaund.MinusButton>
              <Button>Drop down</Button>
            </Compaund.MinusButton>
            <Compaund.DisplayCounter />
            <Compaund.PlusButton>
              <Button>Rise up</Button>
            </Compaund.PlusButton>
          </Compaund.Window>
        </Compaund>
      </div>
    </div>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   useEscForClose('Escape', setIsOpenModal);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((isOpen) => !isOpen)}>
//         Add new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
