import { useState } from 'react';
import { Header } from './components/Layout/Header';
import { Navigation } from './components/Layout/Navigation';
import { PropertyTable } from './components/Table/PropertyTable';
import { PropertyMap } from './components/Map/PropertyMap';
import { PropertyForm } from './components/Forms/PropertyForm';
import { useProperties } from './hooks/useProperties';
import type { CreatePropertyRequest } from './types/property';

type View = 'map' | 'table' | 'add';

function App() {
  const [currentView, setCurrentView] = useState<View>('map');
  const { properties, loading, error, createProperty } = useProperties();

  const handleAddProperty = async (data: CreatePropertyRequest) => {
    try {
      await createProperty(data);
      setCurrentView('table'); // Switch to table view to see the new property
    } catch (error) {
      console.error('Failed to create property:', error);
      // TODO: Show error toast
    }
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {properties.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {properties.filter((p) => p.status === 'Contacted').length}
                  </div>
                  <div className="text-sm text-gray-600">Contacted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {properties.filter((p) => p.status === 'Viewed').length}
                  </div>
                  <div className="text-sm text-gray-600">Viewed</div>
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
            <PropertyTable
              properties={properties}
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
