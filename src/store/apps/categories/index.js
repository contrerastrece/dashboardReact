import { create } from "zustand";

// import {
//   Editar_categorias,
//   Eliminar_categorias,
//   Insertar_categorias,
//   Mostrar_categorias,
//   Reset_categorias,
// } from "../../../supabase/crudCategories";
import { Mostrar_categorias } from "src/supabase/crudCategories";

export const useCategoriesStore = create((set, get) => ({
  dataCategories: [],
  categoryItemSelect:[],
  parametros: {},
  showCategories: async (p) => {
    const response = await Mostrar_categorias(p);
    set({ parametros: p });
    set({ dataCategories: response });
    set({ categoryItemSelect: response[0] });

    return response;
  },

  // insertCategories: async (p) => {
  //   await Insertar_categorias(p);
  //   const { showCategories } = get();
  //   const {parametros}=get()
  //   set(showCategories(parametros));
  // },
  // deleteCategories: async (p) => {
  //   await Eliminar_categorias(p);
  //   const {parametros}=get();
  //   const { showCategories } = get();
  //   set(showCategories(parametros));
  // },
  // resetCategories: async (p) => {
  //   await Reset_categorias(p);
  //   const {parametros}=get();
  //   const { showCategories } = get();
  //   set(showCategories(parametros));
  // },
  // updateCategories: async (p) => {
  //   await Editar_categorias(p);
  //   const { showCategories } = get();
  //   set(showCategories(p));
  // },
  // selectCategory: async(p)=>{
  //   set({categoryItemSelect:p})
  // }
}));
