import type { ComponentType } from "react";
import Act01Apertura from "./Act01Apertura";
import Act02Mapa from "./Act02Mapa";
import Act03Caida from "./Act03Caida";
import Act04Catalogo from "./Act04Catalogo";
import Act05Clientes from "./Act05Clientes";
import Act06Matriz from "./Act06Matriz";
import Act07Modelo from "./Act07Modelo";
import Act08Dato from "./Act08Dato";
import Act09Ruta from "./Act09Ruta";
import Act10Cierre from "./Act10Cierre";

// El guion de la defensa: un acto, una evidencia.
export const ACTS: { id: string; label: string; Comp: ComponentType }[] = [
  { id: "apertura", label: "«Somos exportadores»", Comp: Act01Apertura },
  { id: "mapa", label: "El mapa del dinero", Comp: Act02Mapa },
  { id: "caida", label: "La caída (-18,3%)", Comp: Act03Caida },
  { id: "catalogo", label: "99.985 títulos", Comp: Act04Catalogo },
  { id: "clientes", label: "722 estrellas", Comp: Act05Clientes },
  { id: "matriz", label: "La matriz (108 cruces)", Comp: Act06Matriz },
  { id: "modelo", label: "El modelo que decide", Comp: Act07Modelo },
  { id: "dato", label: "El dato a oscuras (75%)", Comp: Act08Dato },
  { id: "ruta", label: "La hoja de ruta", Comp: Act09Ruta },
  { id: "cierre", label: "La tesis", Comp: Act10Cierre },
];
