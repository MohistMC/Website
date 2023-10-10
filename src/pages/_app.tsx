import {Poppins} from "next/font/google";
import {AppProps} from "next/app";
import "../app/globals.scss";
import '../app/nextra-custom.scss'
import 'flowbite-react'
import 'flowbite'
import React, {useEffect} from "react";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {Provider} from "react-redux";
import {wrapper} from "@/util/redux/Store";
import {hackNextra} from "@/util/Nextra";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {ToastLogger} from "@/util/Logger";
import {getAPIEndpoint} from "@/util/Environment";
import {loginUserAsync} from "@/features/user/UserSlice";
import {useAppSelector} from "@/util/redux/Hooks";
import {selectTranslations} from "@/features/i18n/TranslatorSlice";
import {GoogleReCaptchaProvider} from "react-google-recaptcha-v3";

const poppins = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
})

export default function App({Component, pageProps}: AppProps) {
    const {store, props} = wrapper.useWrappedStore(pageProps)

    useEffect(() => {
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
            document.documentElement.classList.add('dark');
        else
            document.documentElement.classList.remove('dark')

        // Hack the Nextra docs appearance
        if (window.location.pathname.startsWith('/docs') || window.location.pathname.startsWith('/blog'))
            hackNextra()
    })

    useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            ToastLogger.info('You are running MohistMC in development mode.')

            fetch(`${getAPIEndpoint()}/ping`).then(res => {
                if (res.status === 200)
                    ToastLogger.info('The backend server is running')
                else
                    ToastLogger.error('The backend server is not responding. If you plan on working with it, make sure to start it. If the port has been changed (default is 2024), make sure to change it in the src/util/Environment.ts file.', 30000)
            }).catch(err => {
                ToastLogger.error('The backend server is not responding. If you plan on working with it, make sure to start it. If the port has been changed (default is 2024), make sure to change it in the src/util/Environment.ts file.', 30000)
            })
        }

        loginUserAsync().catch()
    }, []);

    return (
        <>
            <Head>
                <html lang={"en"}/>
                <title>MohistMC</title>
            </Head>
            <style jsx global>{`
              html {
                font-family: ${poppins.style.fontFamily};
              }
            `}</style>
            <Provider store={store}>
                <GoogleReCaptchaProvider
                    reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTHA_SITE_KEY as string}
                    scriptProps={{
                        async: false,
                        defer: true,
                        nonce: undefined,
                    }}>
                    <ToastContainer/>
                    <Header/>
                    <Component {...pageProps} />
                    <Footer/>
                </GoogleReCaptchaProvider>
            </Provider>
        </>
    );
}

