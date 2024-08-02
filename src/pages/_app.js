import React, { useState, useEffect } from "react";
import "@/styles/globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useRouter } from "next/router";
import LoadingBar from "react-top-loading-bar";
import { Provider } from "react-redux";
import { store } from "../app/store.js";

// ** Emotion Imports
import { CacheProvider } from "@emotion/react";

// ** Config Imports
import themeConfig from "/src/configs/themeConfig";

// ** Component Imports
import UserLayout from "/src/layouts/UserLayout";
import ThemeComponent from "/src/@core/theme/ThemeComponent";

// ** Contexts
import {
  SettingsConsumer,
  SettingsProvider,
} from "/src/@core/context/settingsContext";

// ** Utils Imports
import { createEmotionCache } from "/src/@core/utils/create-emotion-cache";

// ** React Perfect Scrollbar Style
import "react-perfect-scrollbar/dist/css/styles.css";

// ** Global css styles
// import "../../styles/globals.css";

const clientSideEmotionCache = createEmotionCache();

// export default function App({ Component, pageProps }) {
export default function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Variables
  const getLayout =
    Component.getLayout ?? ((page) => <UserLayout>{page}</UserLayout>);

  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState();
  const [progress, setProgress] = useState(0);
  const [clientMode, setclientMode] = useState('light')
  const router = useRouter();

  const [showAdmin, setShowAdmin] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [showFooter, setShowFooter] = useState(true);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
    try {
      let exemptedForShowAdmin = [
        "/admin",
        "/account-settings",
        "/pages/login",
        "/pages/register",
        "/pages/error",
        "/typography",
        "/icons",
        "/cards",
        "/tables",
        "/form-layouts",
        "/admin/addProduct",
        "/admin/viewProducts",
        "/admin/viewOrders",
        "/admin/updateProduct"
      ];
      if (exemptedForShowAdmin.includes(router.pathname)) {
        setShowNavbar(false);
        setShowAdmin(true);
      } else {
        setShowNavbar(true);
        setShowAdmin(false);
      }

      let exemptedForLoginSignup = ["/signup", "/login"]
      if (exemptedForLoginSignup.includes(router.pathname)) {
        setShowFooter(false)
      }
      else{
        setShowFooter(true)
      }
    } catch (error) {
      console.error(error);
      // localStorage.clear();
    }

    const token = localStorage.getItem("token");
    if (token) {
      setUser({ value: token });
    }
    setKey(Math.random());
  }, [router.query]);

  const logout = () => {
    localStorage.removeItem("token");
    setUser({ value: null });
    setKey(Math.random());
    localStorage.setItem("cart", JSON.stringify({}));
    // router.push('/')
  };

  const ToggleClientMode = ()=>{
    if(clientMode === 'light'){
      setclientMode('dark')
    }
    else if(clientMode === 'dark'){
      setclientMode('light')
    }
  }

  return (
    <>
      <Provider store={store}>
        <CacheProvider value={emotionCache}>
          <LoadingBar
            color="#ff2d55"
            progress={progress}
            waitingTime={400}
            onLoaderFinished={() => setProgress(0)}
          />
          {showNavbar && showFooter && key && (
            <Navbar key={key} logout={logout} user={user} ToggleClientMode={ToggleClientMode} clientMode={clientMode} />
          )}
          {showAdmin && (
            <SettingsProvider>
              <SettingsConsumer>
                {({ settings }) => {
                  return (
                    <ThemeComponent settings={settings}>
                      {getLayout(<Component {...pageProps} />)}
                    </ThemeComponent>
                  );
                }}
              </SettingsConsumer>
            </SettingsProvider>
          )}
          {showNavbar && <Component user={user} ToggleClientMode={ToggleClientMode} clientMode={clientMode} {...pageProps} />}
          {showNavbar && showFooter && <Footer ToggleClientMode={ToggleClientMode} clientMode={clientMode} />}
        </CacheProvider>
      </Provider>
    </>
  );
}
