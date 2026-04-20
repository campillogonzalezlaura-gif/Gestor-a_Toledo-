export type TramiteType = "alta_autonomo" | "cambio_domicilio_fiscal" | "certificado" | "otro";

export interface ClienteData {
  nombre_completo: string | null;
  dni_nie: string | null;
  telefono: string | null;
  email: string | null;
}

export interface DireccionData {
  direccion: string | null;
  codigo_postal: string | null;
  ciudad: string | null;
}

export interface ExtractionResult {
  tipo_tramite: TramiteType;
  datos_cliente: ClienteData;
  direccion: DireccionData;
  detalle_tramite: Record<string, any>;
  descripcion_libre: string;
  faltantes: string[];
  alertas: string[];
}
