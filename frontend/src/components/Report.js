import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, CartesianGrid } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css';  // Ensure Bootstrap is imported
import '../styles/style.css';  // Import your custom styles

const Report = ({ totalIncome, totalExpenses, netBalance }) => {
  // Data for Pie Chart (Total Income, Total Expenses, Net Balance)
  const pieData = [
    { name: 'Total Income', value: totalIncome },
    { name: 'Total Expenses', value: totalExpenses },
    { name: 'Net Balance', value: netBalance },
  ];

  const COLORS = ['#00C49F', '#FF8042', '#0088FE']; // Colors for Pie and Bar Charts

  // Data for Bar and Line Charts
  const barLineData = [
    { name: 'Total Income', totalIncome, totalExpenses, netBalance },
  ];

  return (
    <div>
      {/* Report Title */}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h2 className="h2">Reports</h2>
      </div>

      {/* Legends for Pie, Bar, and Line Charts */}
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
        {/* Pie Chart */}
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

        {/* Bar Chart */}
        <div className="col-md-6">
          <h4>Income vs Expenses vs Balance - Bar Chart</h4>
          <BarChart width={500} height={300} data={barLineData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalIncome" fill="#00C49F" />
            <Bar dataKey="totalExpenses" fill="#FF8042" />
            <Bar dataKey="netBalance" fill="#0088FE" />
          </BarChart>
        </div>
      </div>

      {/* Line Chart positioned below Pie and Bar Charts */}
      <div className="row mt-5">
        <div className="col-md-12">
          <h4 className="text-center">Income vs Expenses vs Balance - Line Chart</h4>
          <LineChart width={1000} height={400} data={barLineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="totalIncome" stroke="#00C49F" strokeWidth={3} />
            <Line type="monotone" dataKey="totalExpenses" stroke="#FF8042" strokeWidth={3} />
            <Line type="monotone" dataKey="netBalance" stroke="#0088FE" strokeWidth={3} />
          </LineChart>
        </div>
      </div>
    </div>
  );
};

export default Report;
