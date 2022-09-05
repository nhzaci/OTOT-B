import React from 'react'

const Admin = () => {
  return <div>Admin page</div>
}

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
      roles: ['admin'],
    },
  }
}

export default Admin
