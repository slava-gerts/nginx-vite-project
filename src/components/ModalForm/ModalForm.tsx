import {ReactNode, useEffect, useRef} from 'react'
import classNames from 'classnames'

import 'styles/modalForm.scss'

interface ModalFormProps {
  className?: string
  show: boolean
  onClose?: () => void
  children: ReactNode
}

const ModalForm = ({className, show, onClose, children}: ModalFormProps) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (show) {
      modalRef.current?.showModal()
    } else {
      onCloseHandler()
    }
  }, [show])

  const onCloseHandler = () => {
    modalRef.current?.close()
    onClose?.()
  }

  return (
    <dialog className={classNames('modal', className)} ref={modalRef}>
      {children}
      <button className='closeButton' onClick={onCloseHandler}>&#10005;</button>
    </dialog>
  );
};

export default ModalForm