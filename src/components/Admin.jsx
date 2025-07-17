import React from 'react';
import { Link } from 'react-router-dom';

function Admin() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-white px-5 sm:px-6 lg:px-8 mt-20">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-xl text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Admin Dashboard
        </h1>
        <p className="text-black text-lg sm:text-xl mb-8">
          Manage your quizzes effortlessly from here!
        </p>

        <div className="flex justify-center mb-10">
          <hr className="w-24 border-t-4 border-gray-300 rounded-full" />
        </div>

        <div className="flex flex-col items-center gap-6">
          <Link
            to="/create-quiz"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-medium px-6 py-5 rounded-2xl shadow-lg w-full transition-transform transform hover:-translate-y-1 hover:scale-105"
          >
            ➕ Create New Quiz
          </Link>
          <Link
            to="/all-quizzes"
            className="bg-emerald-500 hover:bg-emerald-600 text-white text-lg font-medium px-6 py-5 rounded-2xl shadow-lg w-full transition-transform transform hover:-translate-y-1 hover:scale-105"
          >
            🛠️ Manage Quizzes
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Admin;
