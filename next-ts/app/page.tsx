"use client";
import {
  useStudentActions,
  useStudentState,
} from "@/src/providers/student-provider";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  const studentActions = useStudentActions();
  const studentState = useStudentState();

  useEffect(() => {
    studentActions.getAllStudents();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-science.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Moipone Academy Science Centre
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl">
            Inspiring young minds with hands-on science, robotics, and digital
            skills for a brighter future in South Africa.
          </p>
          <Link href="#about">
            <button className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded">
              Learn More
            </button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-6">About Us</h2>
        <p className="max-w-3xl mx-auto text-center text-lg leading-relaxed">
          Moipone Academy is a community-driven science and skills development
          centre committed to empowering youth through real-world education. We
          focus on computer literacy, robotics, and life skills to help learners
          prepare for employment and self-sufficiency in a rapidly changing
          digital economy.
        </p>
      </section>

      <section>
        {studentState?.students?.map((student) => (
          <div key={student.id}>
            <h3>
              {student.name} {student.surname}
            </h3>
            <p>{student.emailAddress}</p>
          </div>
        ))}
      </section>

      {/* Programs */}
      <section className="bg-white py-16 px-6 md:px-16">
        <h2 className="text-3xl font-bold text-center mb-8">Our Programmes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-gray-100 rounded">
            <h3 className="text-2xl font-semibold mb-3">Computer Literacy</h3>
            <p>
              Foundational digital skills for learners of all ages, building
              confidence and capability.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded">
            <h3 className="text-2xl font-semibold mb-3">Robotics & Coding</h3>
            <p>
              Hands-on workshops teaching robotics fundamentals, problem
              solving, and creative thinking.
            </p>
          </div>
          <div className="p-6 bg-gray-100 rounded">
            <h3 className="text-2xl font-semibold mb-3">
              Life Skills & Career Guidance
            </h3>
            <p>
              Supporting youth with practical life tools, career talks, and
              pathways to employment.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 text-center bg-blue-600 text-white">
        <h2 className="text-3xl font-bold mb-4">Join Us</h2>
        <p className="text-lg mb-6">
          Whether you’re a learner, volunteer, or partner organisation, be part
          of building the next generation of innovators.
        </p>
        <Link href="/contact">
          <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded hover:bg-gray-100">
            Contact Us
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-8 px-6 text-center text-sm">
        <p>
          Moipone Academy • A registered South African nonprofit science centre
          (est. 2005)
        </p>
        <p>
          Email:{" "}
          <a href="mailto:moiponesciencecentre@gmail.com" className="underline">
            moiponesciencecentre@gmail.com
          </a>
        </p>
        <p>&copy; {new Date().getFullYear()} Moipone Academy</p>
      </footer>
    </main>
  );
}
