interface HeaderProps {
  title?: string;
}

export function Header({
  title = 'South London Property Tracker',
}: HeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <p className="mt-1 text-sm text-gray-600">
              Track properties during your house hunting journey in South London
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Future: Add user menu, settings, etc. */}
            <div className="text-sm text-gray-500">Local Property Tracker</div>
          </div>
        </div>
      </div>
    </header>
  );
}
