"use client"

import styles from './admin.module.css'
import AdminPrizeList from '../components/AdminPrizeList'
import Link from 'next/link'

const Admin = () => {

  return (
    <>
        <Link href='/' className='main-menu-link'>На главную</Link>
        <AdminPrizeList/>
    </>
  )
}

export default Admin