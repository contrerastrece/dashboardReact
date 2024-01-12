import { supabase } from "./client";

export const Insertar_productos = async (p) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert(p)
      .select();

      if(error){
        alert('No se ingresó',error)
      }

    // if (error) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Opps...",
    //     text: "Ya existe un registro con " + p.description,
    //     footer: '<a href="">Agregue una nueva descripcion</a>',
    //   });
    // }
    // if (data) {
    //   Swal.fire({
    //     icon: "success",
    //     title: "Categoria Ingresado",
    //     showConfirmButton: false,
    //     timer: 1500,
    //   });
    // }

    return data;
  } catch (error) {
    alert(error.error_description || error.message + " insertar producto");
  }
};

export const Mostrar_productos = async (p) => {
  try {


    const { data, error} = await supabase
      .from("vista_productos_con_categorias")
      .select()
      .order("id", { ascending: false })


    const searchTerm = p.q.toLowerCase();
    console.log(data)

    // Filtra los productos según el término de búsqueda
    const filteredData = data.filter(producto => (
      producto.product.toLowerCase().includes(searchTerm) ||
      producto.category.toLowerCase().includes(searchTerm)
    ));

    return filteredData;

  } catch (error) {
    // console.error("MostrarUsuarios:", error);
    // throw new Error(error.error_description || error.message || "Error al mostrar usuarios");
  }
};

// export const Eliminar_categorias = async (p) => {
//   try {
//     const { data, error } = await supabase
//       .from("categories")
//       .delete()
//       .eq("id_user", p.id_user)
//       .eq("id", p.id);
//     if (error) {
//       alert("Error al eliminar", error.message);
//     } else {
//       console.log("Eliminado con exito", "✔");
//     }
//   } catch (error) {
//     console.error("Eliminar Categorias:", error);
//     throw new Error(
//       error.error_description || error.message || "Error al mostrar usuarios"
//     );
//   }
// };

// export const Editar_categorias = async (p) => {
//   try {
//     const { error } = await supabase
//       .from("categories")
//       .update(p)
//       .eq("id_user", p.id_user)
//       .eq("id", p.id);
//     if (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Opps...",
//         text: "Ya existe un registro con " + p.description,
//         footer: '<a href="">Agregue una nueva descripcion</a>',
//       });
//       console.log(error, "👀");
//     }
//   } catch (error) {
//     console.error("Editar Categorias:", error);
//     throw new Error(
//       error.error_description || error.message || "Error a editar categorias"
//     );
//   }
// };

// export const Reset_categorias = async (p) => {
//   try {
//     const { data, error } = await supabase
//       .from("categories")
//       .delete()
//       .eq("id_user", p.id_user);
//     if (error) {
//       alert("Error al eliminar", error.message);
//     }
//     Swal.fire({
//       icon: "success",
//       text: "¡Datos eliminados correctamente!",
//       showConfirmButton: false,
//       timer: 1000,
//     });
//   } catch (error) {
//     console.error("Eliminar Categorias:", error);
//     throw new Error(
//       error.error_description || error.message || "Error al mostrar usuarios"
//     );
//   }
// };
