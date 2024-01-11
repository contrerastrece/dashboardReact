import { create } from "zustand";

// import {
//   Editar_categorias,
//   Eliminar_categorias,
//   Insertar_categorias,
//   Mostrar_categorias,
//   Reset_categorias,
// } from "../../../supabase/crudCategories";
import { Mostrar_productos } from "src/supabase/crudProducts";
import { Insertar_productos } from "src/supabase/crudProducts";

export const useProductsStore = create((set, get) => ({
  dataProducts: [],
  categoryItemSelect:[],
  parametros: {},
  showProducts: async (p) => {
    const response = await Mostrar_productos(p);
    set({ parametros: p });
    set({ dataProducts: response });
    set({ categoryItemSelect: response[0] });


    return response;
  },

  insertProducts: async (p) => {
    await Insertar_productos(p);
    const { showProducts } = get();
    const {parametros}=get()
    set(showProducts(parametros));
  },
  
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
