import { create } from "zustand";
import { Eliminar_productos, Mostrar_productos,Insertar_productos } from "src/supabase/crudProducts";

export const useProductsStore = create((set, get) => ({
  dataProducts: [],
  parametros: {},
  showProducts: async (p) => {
    const response = await Mostrar_productos(p);
     set({ dataProducts: response });
     set({ parametros: p });

    return response;
  },

  insertProducts: async (p) => {
    await Insertar_productos(p);
    const { showProducts } = get();

    const {parametros}=get();
     set(showProducts(parametros));
     
  },

  deleteProduct: async (p) => {
    await Eliminar_productos(p);
    const { showProducts } = get();
    const {parametros}=get();
     set(showProducts(parametros));
  },


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
