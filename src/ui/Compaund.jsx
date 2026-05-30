import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';

import styled from 'styled-components';

import useCloseOutsideClick from '../hooks/useCloseOutsideClick';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;
const StyledCloseButton = styled.button`
  background: none;
  position: fixed;
  top: 2%;
  right: 2%;
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

// const Button = styled.button`
//   background: none;
//   border: none;
//   padding: 0.4rem;
//   border-radius: var(--border-radius-sm);
//   transform: translateX(0.8rem);
//   transition: all 0.2s;
//   position: absolute;
//   top: 1.2rem;
//   right: 1.9rem;

//   &:hover {
//     background-color: var(--color-grey-100);
//   }

//   & svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     /* Sometimes we need both */
//     /* fill: var(--color-grey-500);
//     stroke: var(--color-grey-500); */
//     color: var(--color-grey-500);
//   }
// `;
const CompaundContext = createContext();

function Compaund({ children }) {
  const [showCounter, setShowCounter] = useState(false);

  const [counter, setCounter] = useState(0);
  const rise = () => setCounter((c) => c + 1);
  const drop = () => setCounter((c) => c - 1);

  return (
    <CompaundContext.Provider
      value={{ counter, rise, drop, showCounter, setShowCounter }}
    >
      {children}
    </CompaundContext.Provider>
  );
}

function Open({ children }) {
  const { setShowCounter } = useContext(CompaundContext);
  return cloneElement(children, { onClick: () => setShowCounter(true) });
}
function Close({ children }) {
  const { setShowCounter } = useContext(CompaundContext);
  return (
    <StyledCloseButton>
      {cloneElement(children, { onClick: () => setShowCounter(false) })}
    </StyledCloseButton>
  );
}
function PlusButton({ children }) {
  const { rise } = useContext(CompaundContext);
  return cloneElement(children, {
    onClick: () => rise(),
    variation: 'primary',
  });
}

function MinusButton({ children }) {
  const { drop } = useContext(CompaundContext);

  return cloneElement(children, {
    onClick: () => drop(),
    variation: 'secondary',
  });
}

function DisplayCounter() {
  const { counter } = useContext(CompaundContext);
  return (
    <span style={{ fontSize: '2.4rem', margin: '0 1.6rem' }}>{counter}</span>
  );
}

function Window({ children }) {
  const { showCounter, setShowCounter } = useContext(CompaundContext);

  const ref = useCloseOutsideClick(() => setShowCounter(false)); //because of using useEffect we cant conditionally call the hook which means taht line '

  if (!showCounter) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <div>{children}</div>
      </StyledModal>
    </Overlay>,
    document.body,
  );
}
Compaund.PlusButton = PlusButton;
Compaund.MinusButton = MinusButton;
Compaund.DisplayCounter = DisplayCounter;
Compaund.Window = Window;
Compaund.Open = Open;
Compaund.Close = Close;

export default Compaund;
