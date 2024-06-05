import { useRouter } from 'next/router'
import React from 'react'
import Layout from '../components/Layout'

export default function Unauthorized() {

    const router = useRouter();
    const {message} = router.query;
    
  return (
    <Layout title='Unauthorized page'>
    <h1>Access Denied...!</h1>
    {message && <div className='mb-4 text-red-700'>{message}</div>}
    </Layout>
  )
}
