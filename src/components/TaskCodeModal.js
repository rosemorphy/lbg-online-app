import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Spinner } from 'react-bootstrap'
import Modal from './Modal'
import Button from './Button'
import { useRouter } from 'next/router'
import SupportModal from './SupportModal'

const TaskCodeModal = ({show, onClose, data, setShowIsTaxCode, setShowModal, setShowVoucherModal }) => {
  const [isLoading, setIsLoding] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [supportModal, setSupportModal] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  
  const router = useRouter()

  const taskCode = data?.taskCode

  const handleTaskCode = (data) => {
    setIsLoding(true)
    if(taskCode === data.taskCode) {
      setTimeout(() => {
        setIsSuccess(true)
        setIsLoding(false)
        setShowModal(false)
        setShowVoucherModal(true)
      }, 2000)
      setShowIsTaxCode(true)
      console.log('Successful...')
    } else {
      setIsLoding(false)
      setIsError(true)
      setTimeout(() => {
          setIsError(false)
        }, 3000)
    }
  }

  const handleSupport = () => {
    setSupportModal(true)
  }

  return (
    <Modal show={show} onClose={onClose}>
      <div className='modalForm'>
        <h4 className='modalTitle'>Enter VAT code to proceed...</h4>
        {isError ? <p className="errAlert">Incorrect VAT Code!</p> : null}
        {isSuccess ? <p className="successAlert">Awesome your VAT code is correct!! Redirecting...</p> : null}
        <form onSubmit={handleSubmit(handleTaskCode)}>
          <div className='formControl'>
            <label htmlFor='name'>VAT CODE</label>
            <input type='text' placeholder="VAT Code" {...register('taskCode', { required: true })} />
            {errors.taskCode && <small>VAT Code is required</small>}
          </div>
          <div className='formBtn'>
            <button className="paymentBtn">
              {isLoading ? (
                <>
                  <Spinner
                    as='span'
                    animation='grow'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />{' '}
                  Verifying...
                </>
              ) : (
                'PROCEED'
              )}
            </button>
          </div>
          <div className='support'>
            <SupportModal show={supportModal} onClose={() => setSupportModal(false)} />
            <p>Don&lsquo;t have a VAT code?</p>
            <a className='taskBtn' onClick={handleSupport}>Request for VAT code!</a>
          </div>
        </form>
      </div>
    </Modal>
  )
}

export default TaskCodeModal
