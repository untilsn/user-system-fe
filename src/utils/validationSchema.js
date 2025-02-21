import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string()
    .email("Email không hợp lệ")
    .required("Email là bắt buộc"),
  
  password: yup.string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(32, "Mật khẩu không được vượt quá 32 ký tự")
    .required("Mật khẩu là bắt buộc"),

  // rememberMe: yup.boolean(), // Checkbox 'Ghi nhớ đăng nhập'
  
  // captcha: yup.string().required("Vui lòng xác nhận captcha") // Nếu dùng captcha
});


export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, "Tên phải có ít nhất 3 ký tự")
    .max(50, "Tên không được quá 50 ký tự")
    .required("Username là bắt buộc"),

  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Email là bắt buộc"),

  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .max(20, "Mật khẩu không được quá 20 ký tự")
    .required("Mật khẩu là bắt buộc"),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu xác nhận không khớp")
    .required("Xác nhận mật khẩu là bắt buộc"),
});
