import { useState, useContext } from 'react'
import Layout from '../components/Layout'
import Link from 'next/link'
import { AuthContext } from '../context/Authcontext'
import { useForm } from 'react-hook-form'
import logo from '../public/img/logo.jpeg'
import Image from 'next/image'
import Loader from '../components/Loader'
import { BsEye, BsEyeSlash } from 'react-icons/bs'
import { BiLockAlt, BiLockOpenAlt } from 'react-icons/bi'
import Spinner from 'react-bootstrap/Spinner';

const LoginPage = () => {
  const { login, isLoading, isError } = useContext(AuthContext)
  const [showPassword, setShowPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const handleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = async (data) => {
    login(data)
  }

  // if (isLoading) {
  //   return <Loader />
  // }

  return (
    <main className='display-container'>
      <div className='imageSection'>
        <div className="content">
          <h1 className="title">Internet Banking at your fingertips</h1>
          <p>Managing your money through Internet Banking is quick and secure - and it only take a few simple steps to register. You can do things like pay people, check your balance and manage bills, standing orders and direct debits.</p>
        </div>
      </div>
      <div className='form-container'>
        <div className='formLogo'>
          <Link href='/'>
            <a>
              <Image src={logo} alt='logo' height='80' width='80' />
            </a>
          </Link>
        </div>
        <p className='signout-title'>Internet Banking</p>
        <div className='form'>
          {isError ? (
            <div className='errorBadge'>Incorrect User ID: or password</div>
          ) : null}
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='email'>User ID:</label>
            <div className='input-group'>
              <div className='inputControllers'>
                <BiLockAlt className='iconLock' />
                <input
                  type='email'
                  {...register('email', { required: true })}
                  placeholder='Your User ID:'
                />
                {errors.email && <span>User ID: field is required</span>}
              </div>
            </div>

            <div className='input-group'>
              <label htmlFor='password'>Password</label>
              <div className='inputControllers'>
                <BiLockOpenAlt className='iconLock' />
                <div className='password'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', { required: true })}
                    placeholder='Your password'
                  />
                  <span onClick={handleShowPassword}>
                    {showPassword ? (
                      <BsEye className='icon' />
                    ) : (
                      <BsEyeSlash className='icon' />
                    )}
                  </span>
                </div>
              </div>
              {errors.email && <span>Email field is required</span>}
            </div>
            <button className='login-btn'>
              {isLoading ? <><Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                /> <span>Loging in...</span></> : 'Login'}
            </button>
            <p>
              <a className='forgetPassword' href='#'>
                Forget password?
              </a>
            </p>
          </form>
          <div className='signup'>
            <small>If you don&apos;t already use Internet Banking</small>

            <Link href='/register' passHref>
              <a className='btn-signup'>Register online</a>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage
