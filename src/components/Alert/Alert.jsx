import Swal from "sweetalert2";

const SnackBarAlert = Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: 4000,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
    customClass: {
        container: 'alertContainer',
      },
});
export default SnackBarAlert;
