import axios from "axios";
import { getToken } from "../shared/utils/tokenStorage";
// =================================================================================

const baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

if (!baseURL) throw new Error("Base URL is not defined");

// axios instance
const axiosInstance = axios.create({
  baseURL,
  timeout: 10000, // در صورت جواب ندادن سرور بعد از ده ثانیه درخواست را قطع میکند تا از بروز هنگ کردن اپ جلوگیری کند.
  headers: {
    "Content-Type": "application/json",
  },
});

let isLoggingOut = false;

// request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      // کانفیگ همان درخواستی است که قرار است به سرور ارسال شود.
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
    // چون اکسیوس پرامیس بیس است، موقع گرفتن خطا باید آنرا ریجت کرد
  },
);

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
    // چون در این مرحله قرار است ارور آثورایزیشن هندل شود، پس در صورت نداشتن ارور آن را کاری نداریم
  },
  async (error) => {
    const isLoginRequest = error.config?.url?.includes("/users/login");
    if (error.response?.status === 401 && !isLoggingOut && !isLoginRequest) {
      isLoggingOut = true;

      try {
        const { store } = await import("../app/store");
        const { logoutThunk } = await import("../features/auth/authThunks");
        await store.dispatch(logoutThunk());

        // redirect به login - بدون نیاز به react-router
        window.location.href = "/login";
      } finally {
        isLoggingOut = false;
      }
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;

// در اینجا یک نمونه شخصی سازی شده از اکسیوس میسازیم تا در آینده از نوشتن آدرس سرور یا ست کردن هدر های تکراری جلوگیری شود.

// اینترسپتورها اجازه میدهند تا قبل از ارسال درخواست به سرور یا قبل از ارسال ریسپانس به کامپوننت ها، عملیاتی انجام دهند و کار های عمومی را بجای انجام در هر درخواست، یکبار به صورت عمومی انجام دهیم.

// هنگام ارسال درخواست، نیاز داریم توکن را داخل هدر درخواست ها ست کنیم و بجای انچام این کار در هر درخواست، یکبار در اینترسپتور ریکوئست انجام میدهیم

// هنگام گرفتن ریسپانس اگر خطای ۴۰۱ یا همان خطای آثورایزیشن داشته باشیم، به جای هندل کردن این خطا در هر درخواست، یکبار در اینترسپتور ریسپانس آن را به صورت عمومی هندل میکنیم.
