import React from 'react'


function Home() {
  return (
    <div className='p-5 m-4 bg-blue-400'>
      <div className='p-3 m-3 bg-emerald-300'>
      <h2 className=''> Welcome to BlogApp – Your Space for Ideas and Stories....!  </h2><br />
      <p>Discover insightful articles, share knowledge, and connect with a community of readers and writers. Whether you’re here to explore or to create, BlogApp is designed for you.
      </p>
      </div><br /><br />
      <div className='p-3 m-3 bg-fuchsia-300'>
        <h2>Registration & Login :</h2><br />
        <p>New here? Register now to join our community.</p>
<p>
Already a member? Log in to continue your journey.
Secure access ensures that only verified users can participate.</p>
      </div><br /><br />
      <div className='p-3 m-3 bg-emerald-400'>
        <h1>User Roles & Access</h1><br />
        <h2>👤 Users :</h2><br />
        <p>Read all published articles.

Engage with content through comments and discussions.

Stay updated with the latest posts from authors.</p><br />
<h2>✍️ Authors :</h2><br />
<p>Read all articles.

Create and publish new articles.

Share your voice, ideas, and expertise with the community.</p>
      </div><br /><br />
      <div className='p-3 m-3 bg-lime-300
      '>
        <h2>Why BlogApp?</h2><br />
        <ul>A safe and structured space for both readers and writers.

Clear role-based access ensures quality contributions.

Easy-to-use interface for reading and publishing.</ul>
      </div><br /><br />
      <div className='p-3 m-3 bg-pink-400'>
        <h2>Call to Action</h2>
        <p>👉 Join BlogApp today — Register as a user or author and be part of a growing knowledge-sharing community.</p>
      </div>
    </div>

  )
}

export default Home