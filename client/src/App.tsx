import { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Navigation } from './components/Layout/Navigation';
import { PropertyTable } from './components/Table/PropertyTable';
import { TableFilters } from './components/Table/TableFilters';
import { PropertyMap } from './components/Map/PropertyMap';
import { PropertyForm } from './components/Forms/PropertyForm';
import { useProperties } from './hooks/useProperties';
import { usePropertyFilters } from './hooks/usePropertyFilters';
import { exportPropertiesToCSV } from './utils/csvExport';
import type { CreatePropertyRequest } from './types/property';

type View = 'map' | 'table' | 'add';

function App() {
  const [currentView, setCurrentView] = useState<View>('map');
  const { properties, loading, error, createProperty } = useProperties();
  const { filters, filteredProperties, clearFilters, updateFilters } =
    usePropertyFilters(properties);

  const handleAddProperty = async (data: CreatePropertyRequest) => {
    try {
      await createProperty(data);
      setCurrentView('table'); // Switch to table view to see the new property
    } catch (error) {
      console.error('Failed to create property:', error);
      // TODO: Show error toast
    }
  };

  const handleExportCSV = () => {
    exportPropertiesToCSV(filteredProperties, 'properties-export.csv');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'map':
        return (
          <div className="space-y-6">
            <PropertyMap properties={properties} />
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Property Summary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {properties.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-600">
                    {
                      properties.filter((p) => p.status === 'Not contacted')
                        .length
                    }
                  </div>
                  <div className="text-sm text-gray-600">Not Contacted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {properties.filter((p) => p.status === 'Contacted').length}
                  </div>
                  <div className="text-sm text-gray-600">Contacted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {
                      properties.filter((p) => p.status === 'Viewing booked')
                        .length
                    }
                  </div>
                  <div className="text-sm text-gray-600">Viewing Booked</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {properties.filter((p) => p.status === 'Viewed').length}
                  </div>
                  <div className="text-sm text-gray-600">Viewed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {properties.filter((p) => p.status === 'Rejected').length}
                  </div>
                  <div className="text-sm text-gray-600">Rejected</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {properties.filter((p) => p.status === 'Sold').length}
                  </div>
                  <div className="text-sm text-gray-600">Sold</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'table':
        return (
          <div className="bg-white shadow rounded-lg">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Properties ({filteredProperties.length} of {properties.length})
              </h2>
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Export CSV
              </button>
            </div>
            <TableFilters
              filters={filters}
              onFiltersChange={updateFilters}
              onClearFilters={clearFilters}
            />
            <PropertyTable
              properties={filteredProperties}
              loading={loading}
              error={error}
            />
          </div>
        );

      case 'add':
        return (
          <PropertyForm
            onSubmit={handleAddProperty}
            onCancel={() => setCurrentView('map')}
            loading={loading}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation currentView={currentView} onViewChange={setCurrentView} />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">{renderCurrentView()}</div>
      </main>
    </div>
  );
}

export default App;
