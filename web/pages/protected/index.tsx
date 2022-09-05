import React from 'react'

const Protected = () => {
  return <div>Protected home</div>
}

export async function getStaticProps(context) {
  return {
    props: {
      protected: true,
    },
  }
}

export default Protected
