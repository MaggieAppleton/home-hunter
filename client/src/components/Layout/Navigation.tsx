interface NavigationProps {
  currentView: 'map' | 'table' | 'add';
  onViewChange: (view: 'map' | 'table' | 'add') => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: 'map' as const, label: 'Map View', icon: '🗺️' },
    { id: 'table' as const, label: 'Table View', icon: '📋' },
    { id: 'add' as const, label: 'Add Property', icon: '➕' },
  ];

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`${
                currentView === item.id
                  ? 'border-blue-500 text-white'
                  : 'border-transparent text-gray-300 hover:text-white hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
            >
              <span className="mr-2">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
