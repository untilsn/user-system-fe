# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh




  // const handleLogginUser = async (values) => {
  //   try {
  //     const { data } = await axios.post(`${backendUrl}/api/auth/login`,
  //       {
  //         email: values.email,
  //         password: values.password,
  //       }, { withCredentials: true })

  //     if (data.success) {
  //       toast.success("login user success")

  //       if (data.access_token) {
  //         localStorage.setItem("access_token", JSON.stringify(data.access_token))
  //         const decoded = jwtDecode(data.access_token)

  //         if (decoded.id) {
  //           handleGetUserDetails(decoded.id, data.access_token)
  //         }
  //       }
  //       navigate("/")
  //     }
  //   } catch (error) {
  //     console.log(error.message)
  //     toast.error(error.response.data.message)
  //   }
  // }

  // const handleGetUserDetails = async (userId, token) => {
  //   try {
  //     const url = `${backendUrl}/api/user/get-details/${userId}`
  //     const { data } = await axios.get(url, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     })
  //     if (data.success) {
  //       dispath(updateUserDetails({ ...data.userData }))
  //     }
  //     console.log(data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
