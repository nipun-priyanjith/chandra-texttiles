// Import necessary modules and components
import React, { useContext } from 'react'
import {FaUserTie } from 'react-icons/fa';
import myContext from '../../../context/data/myContext';
import Layout from '../../../components/layout/Layout';
import DashboardTab from './DashboardTab';
// Functional component Dashboard
function Dashboard() {
  // Accessing context data using useContext hook
    const context = useContext(myContext)
    const { mode} = context // Destructuring 'mode' from context
  return (
    // Render the Dashboard within the Layout component
    <Layout>
      {/* Section for displaying Dashboard content */}
        <section className="text-gray-600 body-font mt-10 mb-10">
           {/* Component for Dashboard tabs */}
            <DashboardTab/>
        </section>
    </Layout>
  )
}

export default Dashboard  // Export the Dashboard component



