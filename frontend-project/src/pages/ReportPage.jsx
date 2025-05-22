import React, { useState, useEffect } from 'react';
import { getReport } from '../services/reportService';

const ReportDashboardPage = () => {
  const [reportData, setReportData] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const data = await getReport();
      setReportData(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch report');
    } finally {
      setLoading(false);
    }
  };

  // Group Spare Parts by Category
  const groupedByCategory = reportData.reduce((acc, sparePart) => {
    const category = sparePart.Category || 'Uncategorized';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(sparePart);
    return acc;
  }, {});

  // Calculate Summary Metrics
  const totalSpareParts = reportData.length;
  const totalStockInQuantity = reportData.reduce(
    (sum, sparePart) =>
      sum +
      (sparePart.StockIns?.reduce((s, si) => s + si.StockInQuantity, 0) || 0),
    0
  );
  const totalStockOutValue = reportData.reduce(
    (sum, sparePart) =>
      sum +
      (sparePart.StockOuts?.reduce((s, so) => s + Number(so.StockOutTotalPrice), 0) || 0),
    0
  );

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-textPrimary mb-6">Inventory  Report</h1>

      {error && <p className="text-danger mb-4">{error}</p>}
      {loading ? (
        <p className="text-textPrimary mb-4">Loading report...</p>
      ) : reportData.length === 0 ? (
        <p className="text-textPrimary mb-4">No data available.</p>
      ) : (
        <>
          {/* Enhanced Summary Cards with Icons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center space-x-4">
              <svg
                className="w-10 h-10 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7l-2-4H6L4 7m16 0v12a2 2 0 01-2 2H6a2 2 0 01-2-2V7m16 0H4m2 0h12"
                />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-textPrimary">Total Spare Parts</h3>
                <p className="text-2xl font-bold text-primary mt-1">{totalSpareParts}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center space-x-4">
              <svg
                className="w-10 h-10 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 10h18M3 6h18M3 14h18M3 18h18"
                />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-textPrimary">Total Stock In Quantity</h3>
                <p className="text-2xl font-bold text-accent mt-1">{totalStockInQuantity}</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center space-x-4">
              <svg
                className="w-10 h-10 text-danger"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 1.343-3 3v2h6v-2c0-1.657-1.343-3-3-3zm0-4c3.314 0 6 2.686 6 6v2h2v-2c0-4.418-3.582-8-8-8S4 5.582 4 10v2h2v-2c0-3.314 2.686-6 6-6z"
                />
              </svg>
              <div>
                <h3 className="text-lg font-semibold text-textPrimary">Total Stock Out Value</h3>
                <p className="text-2xl font-bold text-danger mt-1">
                  ${totalStockOutValue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Grouped List by Category with Card-Based Spare Parts */}
          <div className="space-y-4">
            {Object.keys(groupedByCategory).map((category) => (
              <div key={category} className="bg-white rounded-lg shadow-md">
                <button
                  onClick={() => toggleCategory(category)}
                  className="w-full flex justify-between items-center p-4 text-left bg-primary text-white rounded-t-lg focus:outline-none"
                >
                  <h2 className="text-xl font-semibold">{category}</h2>
                  <span>
                    {expandedCategories[category] ? (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </span>
                </button>

                {expandedCategories[category] && (
                  <div className="p-4 space-y-4">
                    {groupedByCategory[category].map((sparePart) => (
                      <div
                        key={sparePart.Name}
                        className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200"
                      >
                        <h3 className="text-lg font-semibold text-textPrimary mb-3">
                          {sparePart.Name}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-textSecondary text-sm">Quantity</p>
                            <p className="text-textPrimary font-medium">{sparePart.Quantity}</p>
                          </div>
                          <div>
                            <p className="text-textSecondary text-sm">Unit Price</p>
                            <p className="text-textPrimary font-medium">
                              ${Number(sparePart.UnitPrice).toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-textSecondary text-sm">Total Price</p>
                            <p className="text-textPrimary font-medium">
                              ${Number(sparePart.TotalPrice).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* Stock In Entries */}
                        <div className="mb-4">
                          <h4 className="text-md font-medium text-textPrimary mb-2">
                            Stock In Entries
                          </h4>
                          {sparePart.StockIns.length === 0 ? (
                            <p className="text-textSecondary text-sm">No Stock In entries.</p>
                          ) : (
                            <div className="space-y-2">
                              {sparePart.StockIns.map((stockIn) => (
                                <div
                                  key={stockIn.id}
                                  className="bg-secondary p-3 rounded-md shadow-sm border border-gray-200 flex justify-between items-center hover:bg-gray-200 transition-colors duration-200"
                                >
                                  <div className="text-textPrimary text-sm">
                                    <span className="font-medium">ID: {stockIn.id}</span> | Quantity:{' '}
                                    {stockIn.StockInQuantity}
                                  </div>
                                  <div className="text-textSecondary text-sm">
                                    {new Date(stockIn.StockInDate).toLocaleDateString()}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Stock Out Entries */}
                        <div>
                          <h4 className="text-md font-medium text-textPrimary mb-2">
                            Stock Out Entries
                          </h4>
                          {sparePart.StockOuts.length === 0 ? (
                            <p className="text-textSecondary text-sm">No Stock Out entries.</p>
                          ) : (
                            <div className="space-y-2">
                              {sparePart.StockOuts.map((stockOut) => (
                                <div
                                  key={stockOut.id}
                                  className="bg-secondary p-3 rounded-md shadow-sm border border-gray-200 flex justify-between items-center hover:bg-gray-200 transition-colors duration-200"
                                >
                                  <div className="text-textPrimary text-sm">
                                    <span className="font-medium">ID: {stockOut.id}</span> | Quantity:{' '}
                                    {stockOut.StockOutQuantity} | Total: $
                                    {Number(stockOut.StockOutTotalPrice).toFixed(2)}
                                  </div>
                                  <div className="text-textSecondary text-sm">
                                    {new Date(stockOut.StockOutDate).toLocaleDateString()}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ReportDashboardPage;