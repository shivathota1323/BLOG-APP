function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 mt-10 bg-gradient-to-b from-blue-200 mask-b-to-indigo-300">
      <div className="max-w-5xl text-center space-y-12">
        
        {/* Hero Section */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Welcome to <span className="text-[#0066cc]">MyBlog</span>
        </h1>
        
        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
          A place where ideas come alive. MyBlog is built to connect readers and writers, 
          inspire creativity, and foster a community of knowledge-sharing.  
          This is our **first capstone project** in the Information Technology course, 
          designed using the MERN stack.
        </p>

        {/* About the App */}
        <div className="mt-16 space-y-8">
          <h2 className="text-3xl font-bold text-[#0066cc]">📖 About the Application</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            MyBlog allows you to explore insightful articles, share your thoughts, and 
            engage with a vibrant community. It’s more than just a blog — it’s a platform 
            to learn, teach, and grow together.
          </p>
        </div>

        {/* Roles Section */}
        <div className="grid md:grid-cols-2 gap-10 mt-12 text-left">
          <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold text-[#0066cc]">👤 Users</h2>
            <p className="mt-4 text-gray-600">
              - Read articles published by authors  
              - Stay updated with the latest posts  
              - Engage with content and expand knowledge  
            </p>
          </div>
          <div className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
            <h2 className="text-2xl font-bold text-[#0066cc]">✍️ Authors</h2>
            <p className="mt-4 text-gray-600">
              - Publish new articles and share ideas  
              - Read and interact with others’ work  
              - Inspire the community with creativity and expertise  
            </p>
          </div>
        </div>

        {/* Course Section */}
        <div className="mt-16 space-y-6">
          <h2 className="text-3xl font-bold text-[#0066cc]">🎓 About the Course</h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto">
            This project is part of our **B.Tech Information Technology program**.  
            It demonstrates our ability to design, develop, and deploy a full-stack application 
            using the MERN stack. MyBlog reflects our journey of learning modern web technologies 
            and applying them to solve real-world problems.
          </p>
        </div>

        {/* Footer Tagline */}
        <p className="mt-20 text-gray-500 italic text-lg">
          Read. Write. Inspire. Connect. ✨
        </p>
      </div>
    </div>
  )
}

export default Home;
