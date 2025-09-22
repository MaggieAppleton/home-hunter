import { useState, useCallback } from 'react';
import { Header } from './components/Layout/Header';
import { Navigation } from './components/Layout/Navigation';
import { PropertyTable } from './components/Table/PropertyTable';
import { TableFilters } from './components/Table/TableFilters';
import { PropertyMap } from './components/Map/PropertyMap';
import { AddPropertyModal } from './components/AddPropertyModal';
import { useProperties } from './hooks/useProperties';
import { usePropertyFilters } from './hooks/usePropertyFilters';
import { exportPropertiesToCSV } from './utils/csvExport';
import { api } from './utils/api';
import type {
  CreatePropertyRequest,
  UpdatePropertyRequest,
} from './types/property';

type View = 'map' | 'table';

function App() {
  const [currentView, setCurrentView] = useState<View>('map');
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);
  const {
    properties,
    loading,
    error,
    createProperty,
    updateProperty,
    deleteProperty,
    refetch,
  } = useProperties();
  const { filters, filteredProperties, clearFilters, updateFilters } =
    usePropertyFilters(properties);

  const handleAddProperty = async (
    data: CreatePropertyRequest & { selectedFiles?: File[] }
  ) => {
    try {
      // Create the property first
      const newProperty = await createProperty(data);

      // Upload images if any were selected
      if (data.selectedFiles && data.selectedFiles.length > 0) {
        try {
          await api.images.upload(newProperty.id!, data.selectedFiles);
          // Refresh properties to get updated property with images
          await refetch();
        } catch (imageError) {
          console.error('Failed to upload images:', imageError);
          // TODO: Show error toast for image upload failure
        }
      }

      setCurrentView('table'); // Switch to table view to see the new property
    } catch (error) {
      console.error('Failed to create property:', error);
      // TODO: Show error toast
    }
  };

  const handleExportCSV = () => {
    exportPropertiesToCSV(filteredProperties, 'properties-export.csv');
  };

  const handlePropertyUpdate = updateProperty;
  const handlePropertyDelete = deleteProperty;

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
          <>
            <div className="bg-white shadow rounded-lg">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">
                  Properties ({filteredProperties.length} of {properties.length}
                  )
                </h2>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setIsAddPropertyModalOpen(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Add Property
                  </button>
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
                onPropertyUpdate={handlePropertyUpdate}
                onPropertyDelete={handlePropertyDelete}
              />
            </div>
            <AddPropertyModal
              isOpen={isAddPropertyModalOpen}
              onClose={() => setIsAddPropertyModalOpen(false)}
              onCreate={handleAddProperty}
              loading={loading}
            />
          </>
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
