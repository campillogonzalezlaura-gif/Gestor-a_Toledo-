import { GoogleGenAI, Type } from "@google/genai";
import { ExtractionResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

const SYSTEM_PROMPT = `Eres un asistente experto en extracción y normalización de datos administrativos en España.
Tu tarea es analizar emails de clientes que solicitan trámites a una gestoría (como alta de autónomo, cambio de domicilio fiscal, solicitud de certificados, etc.) y convertirlos en un JSON estructurado, consistente y validado.

INSTRUCCIONES:
Identifica el tipo de trámite. Usa SOLO una de estas categorías:
"alta_autonomo"
"cambio_domicilio_fiscal"
"certificado"
"otro"

Extrae y normaliza los siguientes campos si aparecen:
nombre_completo
dni_nie
telefono
email
direccion
codigo_postal
ciudad
tipo_tramite
descripcion_libre (resumen claro del email)

Campos específicos según trámite:
Si tipo_tramite = "alta_autonomo":
actividad
fecha_inicio

Si tipo_tramite = "cambio_domicilio_fiscal":
nueva_direccion
fecha_cambio

Si tipo_tramite = "certificado":
tipo_certificado

Normalización:
DNI/NIE en mayúsculas y sin espacios
Teléfono en formato internacional (+34XXXXXXXXX si es España)
Emails en minúsculas
Fechas en formato ISO (YYYY-MM-DD)
Direcciones separadas correctamente si es posible

Validación:
Si falta información importante, inclúyela en un array "faltantes"
Si algún dato es ambiguo o dudoso, inclúyela en "alertas"

Salida:
Devuelve un JSON válido acorde al esquema.`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    tipo_tramite: { type: Type.STRING },
    datos_cliente: {
      type: Type.OBJECT,
      properties: {
        nombre_completo: { type: Type.STRING, nullable: true },
        dni_nie: { type: Type.STRING, nullable: true },
        telefono: { type: Type.STRING, nullable: true },
        email: { type: Type.STRING, nullable: true },
      },
      required: ["nombre_completo", "dni_nie", "telefono", "email"]
    },
    direccion: {
      type: Type.OBJECT,
      properties: {
        direccion: { type: Type.STRING, nullable: true },
        codigo_postal: { type: Type.STRING, nullable: true },
        ciudad: { type: Type.STRING, nullable: true },
      },
      required: ["direccion", "codigo_postal", "ciudad"]
    },
    detalle_tramite: { type: Type.OBJECT },
    descripcion_libre: { type: Type.STRING },
    faltantes: { type: Type.ARRAY, items: { type: Type.STRING } },
    alertas: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ["tipo_tramite", "datos_cliente", "direccion", "detalle_tramite", "descripcion_libre", "faltantes", "alertas"]
};

export async function extractEmailData(emailBody: string): Promise<ExtractionResult> {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: emailBody }] }],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA as any,
      },
    });

    if (!response.text) throw new Error("No response from Gemini");
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Extraction error:", error);
    throw error;
  }
}
