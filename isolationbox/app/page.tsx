import { APIStatusIndicator } from "@/components/api-status-indicator"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="text-center py-8">
          <h1 className="text-4xl font-bold text-cyan-400 mb-2">
            CyberWatch Vault
          </h1>
          <p className="text-slate-400 text-lg">
            Advanced Threat Intelligence Platform
          </p>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <APIStatusIndicator />
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-slate-900/40 border border-slate-700/50 backdrop-blur-xl rounded-lg p-6">
              <h2 className="text-xl font-semibold text-cyan-400 mb-4">
                Welcome to the Enhanced API Dashboard
              </h2>
              <p className="text-slate-300 mb-4">
                The API status dashboard now features clickable individual API status cards. 
                Click on any API card to recheck its status independently.
              </p>
              <ul className="text-slate-400 space-y-2">
                <li>• Click any API card to refresh just that API's status</li>
                <li>• Watch for loading spinners during individual checks</li>
                <li>• Error messages appear if an API check fails</li>
                <li>• Overall status count updates automatically</li>
                <li>• Keyboard accessible with proper focus states</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}