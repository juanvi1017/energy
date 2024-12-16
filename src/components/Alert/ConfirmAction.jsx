import Swal from "sweetalert2";

const ConfirmAction = (callback, message) => {
  Swal.fire({
    title: "¿Estas seguro?",
    text: message,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, continuar",
    cancelButtonText: "No, Cerrar",
    backdrop: false,
  }).then((result) => {
    if (result.isConfirmed) {
      callback();
    }
  });
};
export default ConfirmAction;