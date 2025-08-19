import { useEffect, useState } from 'react';

interface Visit {
  id: number;
  visitedAt: Date;
  userAgent: string | null;
  ipAddress: string | null;
}

export default function AnalyticsPage() {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const response = await fetch('/api/visits');
        const data = await response.json();
        setVisits(data);
      } catch (error) {
        console.error('Error fetching visits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisits();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stitch-blue to-stitch-purple flex items-center justify-center">
        <div className="text-white text-2xl">Cargando visits...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stitch-blue to-stitch-purple py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="font-pacifico text-4xl text-stitch-purple text-center mb-8">
            Analytics del Sitio Web 📊
          </h1>
          
          <div className="mb-6">
            <div className="bg-stitch-blue text-white p-4 rounded-lg text-center">
              <h2 className="text-2xl font-bold">Total de Visitas: {visits.length}</h2>
            </div>
          </div>

          {visits.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">Aún no hay visitas registradas</p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Historial de Visitas:</h3>
              {visits.map((visit, index) => (
                <div key={visit.id} className="bg-gray-50 p-4 rounded-lg border">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <strong className="text-stitch-purple">Visita #{visits.length - index}</strong>
                    </div>
                    <div>
                      <strong>Fecha:</strong><br />
                      {new Date(visit.visitedAt).toLocaleDateString('es-ES')} <br />
                      {new Date(visit.visitedAt).toLocaleTimeString('es-ES')}
                    </div>
                    <div>
                      <strong>Dispositivo:</strong><br />
                      <span className="text-sm text-gray-600">
                        {visit.userAgent?.includes('Mobile') ? '📱 Móvil' : 
                         visit.userAgent?.includes('Tablet') ? '📱 Tablet' : '💻 Escritorio'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 text-center">
            <a 
              href="/"
              className="bg-stitch-pink hover:bg-pink-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105"
            >
              Volver al Sitio de Cumpleaños
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}