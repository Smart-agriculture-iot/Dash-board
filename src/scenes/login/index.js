// import AdminScaffold from "../../layouts/AdminScaffold";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import joi from 'joi';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const fields = {
  username: joi.string().required(),
  password: joi.string().required(),
};

const schema = joi.object(fields);
const LoginActivity = () => {
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://rwandasmartagro.rw:8080/api/userss/login", {
        username: data.username,
        password: data.password,
      });

      if (response.data && response.data.Token) {
        const access_token = response.data.Token;
        localStorage.setItem("access_token", access_token);
    
        localStorage.setItem('userId', response.data.Id);
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('userName', data.username);
        navigate("/dashboard");
      } else {
        console.error("Login failed: Invalid response");
        swal('Login fail!', 'Incorrect username or password', 'error');
      }
    } catch (error) {
      console.error("Login failed:", error);
      swal('Login fail!', error.response?.data?.message || 'An error occurred', 'error');
    }
  };

  const {
    register,
    handleSubmit,
  } = useForm({
    resolver: joiResolver(schema),
  });

    return (
        // <AdminScaffold>
        
<div className="mt-8 h-[600px] mx-auto flex flex-col items-center rounded-lg  justify-center bg-gray-100">
  <div className="p-10 xs:p-0 mx-auto md:w-full rounded-lg  md:max-w-md">
  <center><img src="https://static.vecteezy.com/system/resources/thumbnails/004/882/989/small/agriculture-farm-logo-vector.jpg" width="100px" height="100px"  className="mt-4 rounded-lg" alt="Agriculture Logo"></img></center>
    <h1 className="font-bold text-center text-2xl mb-5 text-black">HINGA WIZEYE </h1>  
    <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
      <form className="px-5 py-7" onSubmit={event => {
          handleSubmit(onSubmit)(event);
      }}
      >
        <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
        <input {...register("username")}
            type="text" className="border text-black rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
        <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
        <input {...register("password")}
            type="password" className="border text-black rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full" />
          <button type="submit" className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block" >
              <span className="inline-block mr-2 " >Login</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
          </button>
      </form>
      {/* <div className="p-5">
          <div className="grid grid-cols-3 gap-1">
              <button type="button" className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">MailUp</button>
              <button type="button" className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">Google</button>
              <button type="button" className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block">Github</button>
          </div>
      </div> */}
        <div className="py-5">
        <div className="grid grid-cols-2 gap-1">
          <div className="text-center sm:text-left whitespace-nowrap">
            <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                </svg>
                <span className="inline-block ml-1 text-black">Forgot Password</span>
            </button>
          </div>
          <div className="text-center sm:text-right whitespace-nowrap">
            <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-bottom	">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span className="inline-block ml-1 text-black">Help</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="py-5">
        <div className="grid grid-cols-2 gap-1">
          <div className="text-center sm:text-left whitespace-nowrap">
            <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {/* <span className="inline-block ml-1 text-black ">New user,Register here</span> */}
            </button>
          </div>
        </div>
      </div>
  </div>
</div>
        // </AdminScaffold>
    )
}
export default LoginActivity;














// <!-- component -->

// 	</footer>

// <svg className="absolute bottom-0 left-0 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
// <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.js"></script>
