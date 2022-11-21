import { useEffect, useState } from 'react'
import Layout from '../../components/AccountLayout'
import Link from 'next/link'
import { parseCookies } from '../../config/parseCookies'
import { Col, Container, Row, Form, Spinner } from 'react-bootstrap'
import { API_URL, IMG_URL } from '../../config/index'
import Image from 'next/image'
import transImg from '../../public/transaction.png'
import { formatToCurrency } from '../../helpers'
import { IoWalletSharp } from 'react-icons/io5'
import { FaMoneyBillAlt, FaRegUser } from 'react-icons/fa'
import { MdDoubleArrow } from 'react-icons/md'
import TransactionsTable from '../../components/TransactionsTable'
import AdvancedChart from '../../components/AdvancedChart'
import { useRouter } from 'next/router'
import { FaWhatsappSquare } from 'react-icons/fa'
import TradingWiget from '../../components/TradingWiget'
import { useForm, Controller } from 'react-hook-form'

const Dashboard = ({ user, token }) => {
  const [isTransaction, setIsTransaction] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [isFund, setIsFund] = useState(false)
  const data = user
  const { control } = useForm({
    defaultValues: {
      phone: user?.phone,
      currency: user?.currency,
      email: user?.email,
      accountType: `${user?.accountType} Account`,
    },
  })

  const router = useRouter()


  useEffect(() => fetchTransactions(), [])

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`${API_URL}/users/${user._id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      if (res.ok) {
        setIsTransaction(true)
        setTransactions(data?.transactions)
      }
    } catch (error) {}
  }

  const handleTransfer = () => {
    // console.log(data)
    if (data?.amount <= 0 || data?.amount == undefined) {
      setIsFund(true)
      setTimeout(() => {
        setIsFund(false)
      }, 3000)
      
    } else {
      router.push('/account/payment')
    }
  }

  return (
    <Layout data={user}>

      <header className='account-header'>
        <div className='container'>

          <div className="userProfile">
            <div className="imageBox">
              <img src={`${IMG_URL}${data.passport}`} className="logoImg" alt="Profile Image" />
            </div>
            <div className="userName">
              <h4 className="welcome">
                Welcome back, <span>{`${data?.firstname}  ${data?.lastname}`}</span>
              </h4>
              <small>Managing your money through Internet Banking is quick and secure</small>
            </div>
          </div>

          <div className="balanceSheet">
            <div className="sheetBox">
              <p><IoWalletSharp className='balanceIcon' /> Total Balance</p>
              <h3 className='balance'>
                <span className='currency'>{data?.currency} </span>
                {!data?.amount ? '0.00' : formatToCurrency(data?.amount)}
                <p className={isFund ? 'alert' : 'hide'}>Insuficent Balance!!</p>
                <p>Acc: 0979366728</p>
                <p>{data?.accountType} Account</p>
              </h3>
            </div>
          </div>
        </div>
      </header>

      <section className='accSection'>
        <div className="buttonRow">
          <div className='transBtnContainer'>
            <div>
              <button className='transBtn' onClick={handleTransfer}>
                <a>
                  {/* <MdDoubleArrow className='icon' /> */}
                  Transfer
                </a>
              </button>
            </div>
            <div>
              <button className='withdrawBtn'>
                <Link href='/account/payment'>
                  <a>
                    {/* <FaMoneyBillAlt className='icon' /> */}
                    Withdraw
                  </a>
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className="col-lg-8">
            <div className='transactionCard'>
              <div className='dashBoardHeader'>
                <p className="title"> <FaRegUser className="userIcon" /> Transaction History</p>
              </div>
              <TransactionsTable data={transactions} />
            </div>  
          </div>
          <div className='col-lg-4'>
            <div className='charts'>
              <TradingWiget />
              <TradingWiget />
            </div>
          </div>
          <div className='col-lg-12 mx-auto'>
            <div className='balanceCard'>
              <div className='dashBoardHeader'>
                <p className="title"> <FaRegUser className="userIcon" /> My Account Info</p>
              </div>
              <div className='dashBoard'>
                <form>
                  <Row>
                    <Col xl='3'>
                      <div className='formControl'>
                        <label htmlFor='currency'>Currency</label>
                        <Controller
                          name='currency'
                          control={control}
                          render={({ field }) => <input disabled {...field} />}
                        />
                      </div>
                    </Col>
                    <Col xl='3'>
                      <div className='formControl'>
                        <label htmlFor='account Type'>Account Type</label>
                        <Controller
                          name='accountType'
                          control={control}
                          render={({ field }) => <input disabled {...field} />}
                        />
                      </div>
                    </Col>
                    <Col xl='3'>
                      <div className='formControl'>
                        <label htmlFor='email'>Email Address</label>
                        <Controller
                          name='email'
                          control={control}
                          render={({ field }) => <input disabled {...field} />}
                        />
                      </div>
                    </Col>
                    <Col xl='3'>
                      <div className='formControl'>
                        <label htmlFor='phone'>Phone</label>
                        <Controller
                          name='phone'
                          control={control}
                          render={({ field }) => <input disabled {...field} />}
                        />
                      </div>
                    </Col>
                  </Row>
                </form>
              </div>
            </div>
          </div>
          
        </div>
      </section>


      <Link href='https://wa.link/7q2lll'>
        <a target='_blank' className='liveChatBtn'>
          <FaWhatsappSquare className='icon' />
          Live Chat
        </a>
      </Link>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req)

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  // console.log(req.headers)

  const resUser = await fetch(`${API_URL}/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const user = await resUser.json()

  return {
    props: {
      user: user,
      token: token,
    },
  }
}

export default Dashboard
