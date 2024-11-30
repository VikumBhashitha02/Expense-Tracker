import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { FaMoneyBillWave, FaMoneyCheckAlt, FaWallet } from 'react-icons/fa'; // Import icons
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap is imported
import '../styles/style.css';  // Import your custom styles

const Dashboard = ({ totalIncome, totalExpenses, netBalance }) => {
  // Data for Pie Chart (Total Income, Total Expenses, Net Balance)
  const pieData = [
    { name: 'Total Income', value: totalIncome },
    { name: 'Total Expenses', value: totalExpenses },
    { name: 'Net Balance', value: netBalance },
  ];

  const COLORS = ['#00C49F', '#FF8042', '#0088FE']; // Colors for the Pie Chart and Bar Chart

  // Data for Bar Chart
  const barData = [
    { name: 'Total Income', amount: totalIncome, fill: COLORS[0] },
    { name: 'Total Expenses', amount: totalExpenses, fill: COLORS[1] },
    { name: 'Net Balance', amount: netBalance, fill: COLORS[2] },
  ];

  return (
    <div>
      {/* Dashboard title */}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Dashboard</h1>
      </div>

      {/* Dashboard cards for Total Income, Total Expenses, and Net Balance */}
      <div className="row mb-4">
        {/* Total Income Card */}
        <div className="col-md-4 mb-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <FaMoneyBillWave size={30} className="text-success mb-2" />
              <h5 className="card-title">Total Income</h5>
              <h3 className="card-text">${totalIncome.toFixed(2)}</h3>
            </div>
          </div>
        </div>

        {/* Total Expenses Card */}
        <div className="col-md-4 mb-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <FaMoneyCheckAlt size={30} className="text-danger mb-2" />
              <h5 className="card-title">Total Expenses</h5>
              <h3 className="card-text">${totalExpenses.toFixed(2)}</h3>
            </div>
          </div>
        </div>

        {/* Net Balance Card */}
        <div className="col-md-4 mb-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <FaWallet size={30} className="text-info mb-2" />
              <h5 className="card-title">Net Balance</h5>
              <h3 className="card-text">${netBalance.toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Legends for Pie and Bar Charts */}
      <div className="row mb-4">
        <div className="col-md-12 text-center">
          <h4>Data Legend:</h4>
          <p>
            <span style={{ color: '#00C49F' }}>● Total Income</span> &nbsp;
            <span style={{ color: '#FF8042' }}>● Total Expenses</span> &nbsp;
            <span style={{ color: '#0088FE' }}>● Net Balance</span>
          </p>
        </div>
      </div>

      {/* Row for Pie Chart and Bar Chart */}
      <div className="row">
        {/* Pie Chart on the Left */}
        <div className="col-md-6">
          <h4>Income vs Expenses vs Balance - Pie Chart</h4>
          <PieChart width={400} height={400}>
            <Pie
              data={pieData}
              cx={200}
              cy={200}
              labelLine={false}
              outerRadius={150}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>

        {/* Bar Chart on the Right */}
        <div className="col-md-6">
          <h4>Income vs Expenses vs Balance - Bar Chart</h4>
          <BarChart width={500} height={300} data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="amount" fill="#8884d8">
              {barData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
