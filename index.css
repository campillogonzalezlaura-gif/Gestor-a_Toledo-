import { useState } from "react";
import { 
  FileText, 
  Send, 
  AlertCircle, 
  CheckCircle2, 
  Copy, 
  RotateCcw, 
  History,
  Building2,
  ChevronRight,
  User,
  MapPin,
  ClipboardList
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { extractEmailData } from "./services/gemini";
import { ExtractionResult } from "./types";

const EXAMPLE_EMAIL = `Hola, 
Me llamo Juan Pérez García con DNI 12345678X. 
Quisiera solicitar el alta de autónomo para mi nueva actividad de diseño gráfico. 
Mi dirección es Calle Mayor 15, 2ºB, Madrid 28013. 
Mi teléfono es 600123456 y mi correo es juan.perez@email.com. 
Quisiera empezar el próximo día 1 de mayo. 
Gracias.`;

const INCOMPLETE_EXAMPLE = `Hola, 
Me llamo Roberto y quiero solicitar un certificado de empadronamiento. 
No tengo mis datos a mano ahora mismo, pero por favor empezad el trámite.
Atentamente, Roberto.`;

export default function App() {
  const [email, setEmail] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [result, setResult] = useState<ExtractionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"summary" | "json">("summary");
  const [mailSent, setMailSent] = useState(false);

  const handleExtract = async () => {
    if (!email.trim()) return;
    setIsExtracting(true);
    setError(null);
    setMailSent(false);
    try {
      const data = await extractEmailData(email);
      setResult(data);
    } catch (err) {
      setError("Error al procesar el email. Por favor, inténtelo de nuevo.");
      console.error(err);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleSendAutomaticMail = () => {
    if (!result) return;
    
    const mailText = `Hola,

Hemos recibido tu solicitud, pero nos faltan algunos datos necesarios para poder gestionarla correctamente.

Por favor, envíanos la siguiente información:

Nombre completo
NIF
Fecha de inicio de actividad

En cuanto recibamos estos datos, podremos continuar con el trámite.

Gracias.`;

    // Simulating sending mail
    console.log("Enviando mail automático a:", result.datos_cliente.email);
    console.log("Contenido:", mailText);
    
    // In a real app we would use an API, here we simulate and notify the user
    setMailSent(true);
    setTimeout(() => setMailSent(false), 3000);
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    }
  };

  const loadExample = () => setEmail(EXAMPLE_EMAIL);
  const loadIncomplete = () => setEmail(INCOMPLETE_EXAMPLE);

  return (
    <div className="min-h-screen bg-[#E3F2FD] text-[#2D3748] font-sans selection:bg-blue-100 flex flex-col">
      {/* Header */}
      <header className="h-16 bg-[#1A365D] text-white px-8 flex items-center justify-between sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-2">
          <div className="text-xl font-bold tracking-widest flex items-center gap-2">
            GESTORIA<span className="font-light opacity-70">AI</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex gap-3">
            <div className="bg-white/10 px-3 py-1.5 rounded border border-white/20 text-[11px] uppercase tracking-wider font-medium">
              Normalización: ISO-8601
            </div>
            <div className="bg-white/10 px-3 py-1.5 rounded border border-white/20 text-[11px] uppercase tracking-wider font-medium">
              Motor: SPA-ADMIN-v2.1
            </div>
          </div>
          <div className="h-6 w-px bg-white/20 mx-2" />
          <button className="text-white/70 hover:text-white transition-colors">
            <History size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-[1400px] mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 overflow-hidden max-h-[calc(100vh-64px)]">
        {/* Input Section */}
        <section className="flex flex-col gap-4 min-h-0">
          <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm flex flex-col h-full overflow-hidden">
            <div className="bg-[#FAFBFC] border-b border-[#E2E8F0] px-5 py-4 flex items-center justify-between">
              <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#1A202C]">Email del Cliente</h2>
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <button 
                    onClick={loadExample}
                    className="text-[11px] font-bold text-[#3182CE] hover:underline"
                  >
                    EJEMPLO COMPLETO
                  </button>
                  <span className="text-[#E2E8F0]">|</span>
                  <button 
                    onClick={loadIncomplete}
                    className="text-[11px] font-bold text-[#3182CE] hover:underline"
                  >
                    EJEMPLO INCOMPLETO
                  </button>
                </div>
                <div className="w-px h-3 bg-[#E2E8F0]" />
                <button 
                  onClick={() => setEmail("")}
                  className="text-[11px] font-bold text-[#E53E3E] hover:underline"
                >
                  BORRAR TODO
                </button>
              </div>
            </div>
            
            <div className="flex-1 min-h-0 relative">
              <textarea
                className="w-full h-full p-6 resize-none focus:outline-none text-[15px] leading-relaxed font-sans bg-transparent placeholder-[#A0AEC0]"
                placeholder="Pegue aquí el contenido del correo electrónico..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="absolute bottom-4 right-4 flex gap-2">
                <button
                  onClick={() => setEmail("")}
                  className="p-2 text-[#A0AEC0] hover:text-[#EF4444] rounded transition-all"
                  title="Limpiar"
                >
                  <RotateCcw size={18} />
                </button>
                <button
                  onClick={handleExtract}
                  disabled={isExtracting || !email.trim()}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded font-bold text-xs uppercase tracking-widest transition-all ${
                    isExtracting || !email.trim()
                      ? "bg-[#EDF2F7] text-[#A0AEC0]"
                      : "bg-[#3182CE] text-white hover:bg-[#2B6CB0] active:transform active:scale-95 shadow-sm"
                  }`}
                >
                  {isExtracting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    >
                      <RotateCcw size={18} />
                    </motion.div>
                  ) : (
                    <Send size={16} />
                  )}
                  {isExtracting ? "PROCESANDO" : "EXTRAER DATOS"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section className="flex flex-col gap-4 min-h-0">
          <div className="bg-white border border-[#E2E8F0] rounded-lg shadow-sm flex flex-col h-full overflow-hidden">
            <div className="bg-[#FAFBFC] border-b border-[#E2E8F0] px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-[13px] font-bold uppercase tracking-wider text-[#1A202C]">JSON Estructurado</h2>
                {result && (
                  <span className="px-2 py-1 bg-[#C6F6D5] text-[#22543D] text-[10px] font-bold rounded uppercase tracking-tighter">
                    {result.tipo_tramite}
                  </span>
                )}
              </div>
              {result && (
                <div className="bg-[#EDF2F7] p-0.5 rounded flex">
                  <button
                    onClick={() => setViewMode("summary")}
                    className={`px-3 py-1 text-[10px] font-bold uppercase tracking-tighter rounded transition-all ${
                      viewMode === "summary" ? "bg-white text-[#3182CE] shadow-xs" : "text-[#718096]"
                    }`}
                  >
                    Detalles
                  </button>
                  <button
                    onClick={() => setViewMode("json")}
                    className={`px-3 py-1 text-[10px] font-bold uppercase tracking-tighter rounded transition-all ${
                      viewMode === "json" ? "bg-white text-[#3182CE] shadow-xs" : "text-[#718096]"
                    }`}
                  >
                    JSON
                  </button>
                </div>
              )}
            </div>

            <div className="flex-1 min-h-0 flex flex-col relative">
              <AnimatePresence mode="wait">
                {!result && !isExtracting && !error && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center text-[#A0AEC0] p-8 text-center"
                  >
                    <ClipboardList size={40} strokeWidth={1} className="mb-4 opacity-40" />
                    <h3 className="text-sm font-bold uppercase tracking-wider">Esperando Entrada</h3>
                    <p className="text-[13px] mt-2 max-w-xs leading-relaxed">
                      El sistema detectará automáticamente el tipo de trámite y normalizará los campos según normativas vigentes.
                    </p>
                  </motion.div>
                )}

                {isExtracting && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex-1 flex flex-col items-center justify-center text-[#A0AEC0] p-8 text-center"
                  >
                    <div className="w-10 h-10 border-2 border-[#EDF2F7] rounded-full border-t-[#3182CE] animate-spin mb-4" />
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#3182CE]">Extrayendo Tokens</h3>
                    <p className="text-[13px] mt-2">Mapeando esquema administrativo...</p>
                  </motion.div>
                )}

                {error && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 flex flex-col items-center justify-center text-[#E53E3E] p-8 text-center"
                  >
                    <AlertCircle size={40} className="mb-4 opacity-50" />
                    <h3 className="text-sm font-bold uppercase tracking-wider">Error Crítico</h3>
                    <p className="text-[13px] mt-2">{error}</p>
                  </motion.div>
                )}

                {result && viewMode === "summary" && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 p-6 overflow-y-auto space-y-6"
                  >
                    {/* User Data Section Style from Geometric Balance */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-x-8 gap-y-4 p-5 bg-[#F7FAFC] rounded border border-[#E2E8F0]">
                        <DataField label="Nombre Completo" value={result.datos_cliente.nombre_completo} />
                        <DataField label="DNI / NIE" value={result.datos_cliente.dni_nie} isMono />
                        <DataField label="Teléfono" value={result.datos_cliente.telefono} isMono />
                        <DataField label="Email" value={result.datos_cliente.email} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="text-[11px] font-bold uppercase tracking-widest text-[#1A202C] flex items-center gap-2">
                          <MapPin size={12} /> Localización
                        </div>
                        <div className="p-4 bg-white border border-[#E2E8F0] rounded space-y-3">
                          <DataField label="Ciudad" value={result.direccion.ciudad} />
                          <DataField label="Cód. Postal" value={result.direccion.codigo_postal} isMono />
                          <DataField label="Dirección" value={result.direccion.direccion} />
                        </div>
                      </div>

                      {Object.keys(result.detalle_tramite).length > 0 && (
                        <div className="space-y-4">
                          <div className="text-[11px] font-bold uppercase tracking-widest text-[#1A202C] flex items-center gap-2">
                            <CheckCircle2 size={12} /> Atributos Específicos
                          </div>
                          <div className="p-4 bg-[#F0FFF4] border border-[#C6F6D5] rounded space-y-3">
                            {Object.entries(result.detalle_tramite).map(([key, value]) => (
                              <div key={key}>
                                <DataField label={key.replace(/_/g, " ")} value={String(value)} />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="text-[11px] font-bold uppercase tracking-widest text-[#1A202C]">Resumen Proyectado</div>
                      <div className="p-4 bg-[#F7FAFC] border border-[#E2E8F0] rounded text-[13px] leading-relaxed italic text-[#4A5568]">
                        {result.descripcion_libre}
                      </div>
                    </div>

                    {/* Alerts Panel Pattern */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="p-4 border border-[#E2E8F0] rounded bg-white shadow-xs flex flex-col justify-between min-h-[140px]">
                        <div>
                          <div className="inline-block px-2 py-1 bg-[#C6F6D5] text-[#22543D] text-[11px] font-bold rounded mb-3 uppercase tracking-wider">
                            ✓ VALIDACIÓN DE CAMPOS
                          </div>
                          <ul className="space-y-2">
                            <li className="text-[13px] text-[#4A5568] flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#38A169] shrink-0" /> 
                              <span>Estructura de datos segmentada.</span>
                            </li>
                            <li className="text-[13px] text-[#4A5568] flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#38A169] shrink-0" /> 
                              <span>Normalización ISO-8601 aplicada.</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      {(result.faltantes.length > 0 || result.alertas.length > 0) && (
                        <div className="p-4 border border-[#E2E8F0] rounded bg-white shadow-xs flex flex-col justify-between min-h-[140px]">
                          <div>
                            <div className="inline-block px-2 py-1 bg-[#FEEBC8] text-[#744210] text-[11px] font-bold rounded mb-3 uppercase tracking-wider">
                              ! ALERTAS Y FALTANTES
                            </div>
                            <ul className="space-y-2">
                              {result.faltantes.map((f, i) => (
                                <li key={i} className="text-[13px] text-[#4A5568] flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#D69E2E] shrink-0" /> 
                                  <span className="first-letter:uppercase lowercase">{f}</span>
                                </li>
                              ))}
                              {result.alertas.map((a, i) => (
                                <li key={i} className="text-[13px] text-[#4A5568] flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#D69E2E] shrink-0" /> 
                                  <span className="first-letter:uppercase lowercase">{a}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          {result.faltantes.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-[#F3F4F6]">
                              <button
                                onClick={handleSendAutomaticMail}
                                className={`w-full flex items-center justify-center gap-2 py-2 rounded text-[11px] font-bold uppercase tracking-wider transition-all ${
                                  mailSent 
                                    ? "bg-[#C6F6D5] text-[#22543D]" 
                                    : "bg-[#2D3748] text-white hover:bg-[#1A202C]"
                                }`}
                              >
                                {mailSent ? <CheckCircle2 size={14} /> : <Send size={14} />}
                                {mailSent ? "Mail Enviado" : "Enviar Mail de Información Faltante"}
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {result && viewMode === "json" && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex-1 bg-[#1A202C] text-[#A0AEC0] relative group flex flex-col"
                  >
                    <pre className="p-8 h-full overflow-auto font-mono text-[13px] leading-relaxed">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                    <button
                      onClick={copyToClipboard}
                      className="absolute top-4 right-4 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all"
                    >
                      COPIAR JSON
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

interface DataFieldProps {
  label: string;
  value: string | null;
  isMono?: boolean;
}

function DataField({ label, value, isMono }: DataFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-extrabold text-[#1A202C] uppercase tracking-widest leading-none">
        {label}
      </span>
      <span className={`text-[13px] font-medium text-[#2D3748] ${value === null ? "text-[#CBD5E0] italic font-normal" : ""} ${isMono ? "font-mono" : ""}`}>
        {value || "null"}
      </span>
    </div>
  );
}
