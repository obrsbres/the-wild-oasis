import { useState } from 'react';

import styled from 'styled-components';

import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import CabinTable from './CabinTable';

import useEscForClose from '../../hooks/useEscForClose';
import Modal from '../../ui/Modal';
import Compound from '../../ui/Compaund';

const StyledH2 = styled.h2`
  font-size: 2.4rem;
  color: var(--color-grey-700);
`;

function MyH2({ showCounter }) {
  return (
    <span>
      <StyledH2>{showCounter}</StyledH2>
    </span>
  );
}

function AddCabin() {
  return (
    <>
      <Modal id='modal-root'>
        <Modal.Open opens='cabin-form'>
          <Button variation='secondary'>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name='cabin-form'>
          <CreateCabinForm />
        </Modal.Window>

        <Modal.Open opens='table'>
          <Button>Show table</Button>
        </Modal.Open>
        <Modal.Window name='table'>
          <CabinTable />
        </Modal.Window>
      </Modal>
      <Compound>
        <Compound.PlusButton>
          <Button>Add to counter</Button>
        </Compound.PlusButton>
        <Compound.DisplayCounter>
          <MyH2 />
        </Compound.DisplayCounter>
        <Compound.MinusButton>
          <Button>Remove from counter</Button>
        </Compound.MinusButton>
      </Compound>
    </>
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
