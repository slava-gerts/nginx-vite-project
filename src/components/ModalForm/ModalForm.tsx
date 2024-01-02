import {ReactNode, useRef} from 'react'

import 'styles/modalForm.scss'

interface ModalFormProps {
  isOpen: boolean
  onClose?: () => void
  children: ReactNode
}

const ModalForm = ({isOpen, onClose, children}: ModalFormProps) => {
  const modalRef = useRef<HTMLDialogElement | null>(null)

  const onCloseHandler = () => {
    modalRef.current?.close()
    onClose?.()
  }

  return (
    <dialog className='modal' ref={modalRef} open={isOpen}>
      {children}
      <button className='closeButton' onClick={onCloseHandler}>&#10005;</button>
    </dialog>
  );
};

export default ModalForm