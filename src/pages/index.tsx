import { selectTranslations } from '@/features/i18n/TranslatorSlice'
import { useAppSelector } from '@/util/redux/Hooks'
import { getLocaleStringAsArgs } from '@/util/LocaleHelper'
import Link from 'next/link'
import StatisticsElement from '@/components/index/StatisticsElement'
import DefaultCarousel from '@/components/index/Carousel'
import Head from 'next/head'
import { getCopyrightText } from '@/util/String'
import { useRouter } from 'next/router'
import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import ChoiceIssueModal from '@/components/modals/ChoiceIssueModal'
import { useDispatch } from 'react-redux'
import { loginUserAsync, selectUser, setState } from '@/features/user/UserSlice'
import FeatureCard from '@/components/index/FeatureCardProps'
import { FaArrowRight } from 'react-icons/fa'
import { Flowbite, Toast } from 'flowbite-react'
import { HiExclamation } from 'react-icons/hi'
import { customTheme } from '@/util/Theme'
import { selectTheme } from '@/features/theme/ThemeSlice'

const Home = () => {
    // React redux
    const dispatch = useDispatch()
    const strings = useAppSelector(selectTranslations)
    const user = useAppSelector(selectUser)
    const mode = useAppSelector(selectTheme)
    const router = useRouter()

    // React states
    const [openChoiceIssueModal, setOpenChoiceIssueModal] = useState<
        string | undefined
    >()

    useEffect(() => {
        if (!router.isReady) return

        const { auth } = router.query as { auth: string }

        // Store auth token in cookie and remove from url
        const handleLogin = async () => {
            if (auth && auth.length) {
                setCookie('auth', auth, { path: '/', maxAge: 21600 })
                await loginUserAsync(true)
                router.replace(
                    getCookie('redirect') || router.pathname,
                    undefined,
                    { shallow: true },
                )
                deleteCookie('redirect')
            }
        }
        handleLogin().catch()
    }, [router])

    useEffect(() => {
        if (user.isFirstLogin && user.isLogged) {
            setOpenChoiceIssueModal('dismissible')
            dispatch(
                setState({
                    isFirstLogin: false,
                }),
            )
        }
    }, [user, dispatch])

    return (
        <section className="bg-white dark:bg-dark-25 pt-12">
            <Head>
                <title>{strings['index.page.title']}</title>
                <meta name="title" content="MohistMC - Home" />
                <meta
                    name="description"
                    content={`Explore Minecraft innovation with MohistMC. Discover our hybrid servers software, mods, plugins, and vibrant community. Unleash new gaming dimensions. ${getCopyrightText()} MohistMC.`}
                />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://mohistmc.com/" />
                <meta property="og:title" content="MohistMC - Home" />
                <meta
                    property="og:description"
                    content={`Explore Minecraft innovation with MohistMC. Discover our hybrid servers software, mods, plugins, and vibrant community. Unleash new gaming dimensions. ${getCopyrightText()} MohistMC.`}
                />
                <meta
                    property="og:image"
                    content="https://mohistmc.com/mohistLogo.png"
                />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="100" />
                <meta property="og:image:height" content="100" />

                <meta property="twitter:url" content="https://mohistmc.com/" />
                <meta property="twitter:title" content="MohistMC - Home" />
                <meta
                    property="twitter:description"
                    content={`Explore Minecraft innovation with MohistMC. Discover our hybrid servers software, mods, plugins, and vibrant community. Unleash new gaming dimensions. ${getCopyrightText()} MohistMC.`}
                />
            </Head>
            <ChoiceIssueModal
                openIssueModal={openChoiceIssueModal}
                setOpenIssueModal={setOpenChoiceIssueModal}
            />
            <section className="bg-white dark:bg-dark-25 pt-10">
                <div className="pt-5 md:pt-10 md:pb-0 pb-6 px-4 mx-auto max-w-screen-xl text-center">
                    <h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                        {strings['index.head.title']}
                    </h1>
                    <p className="mb-12 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
                        {strings['index.head.subtitle']}
                    </p>

                    <div className="pt-5 mb-12 flex justify-center">
                        <Flowbite theme={{ theme: customTheme, mode }}>
                            <Toast className="items-start border-t-4 border-red-600 p-5 md:max-w-3xl">
                                <div className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-600 dark:text-white">
                                    <HiExclamation className="h-6 w-6" />
                                </div>
                                <div className="ml-4 text-left text-base font-normal">
                                    <span className="font-bold">
                                        About Mohist
                                    </span>
                                    <ul className="mt-2 space-y-1 list-disc list-inside">
                                        <li>
                                            Ownership and copyright were sold in
                                            January 2025 (Buyer: @TT)
                                        </li>
                                        <li>
                                            The code repository has been
                                            transferred to{' '}
                                            <Link
                                                href="https://github.com/Rz-C/Mohist"
                                                target="_blank"
                                                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                                            >
                                                https://github.com/Rz-C/Mohist
                                            </Link>
                                        </li>
                                        <li>
                                            Updates have been paused, but
                                            downloads remain available on the
                                            official website.
                                        </li>
                                        <li>
                                            We currently do not accept or
                                            process any feedback regarding the
                                            Mohist core
                                        </li>
                                    </ul>
                                </div>
                            </Toast>
                        </Flowbite>
                    </div>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <Link
                            href="/downloads"
                            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
                        >
                            {strings['button.downloads']}
                            <FaArrowRight className="ml-2" />
                        </Link>
                        <Link
                            href="/docs"
                            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                        >
                            {strings['button.documentations']}
                        </Link>
                    </div>
                </div>
            </section>
            <div className="w-full">
                <svg
                    className={`h-20 w-full`}
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M741,116.23C291,117.43,0,27.57,0,6V120H1200V6C1200,27.93,1186.4,119.83,741,116.23Z"
                        className="shadow fill-gray-100 dark:fill-dark-50"
                    ></path>
                </svg>
            </div>
            <section className="pt-20 pb-10 md:pb-20 bg-gray-100 dark:bg-dark-50 py-10 flex flex-col flex-wrap justify-center items-center">
                <h2 className="text-center mb-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
                    {getLocaleStringAsArgs(strings['index.cards.title'])[0]}
                    <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
                        {getLocaleStringAsArgs(strings['index.cards.title'])[1]}
                    </span>
                    {getLocaleStringAsArgs(strings['index.cards.title'])[2]}
                </h2>
                <div
                    className={`flex flex-row flex-wrap items-center justify-center max-w-screen-xl gap-6`}
                >
                    <FeatureCard
                        imageSrc="/img/res/youer.png"
                        title="Youer"
                        subtitle=""
                        description={strings['index.cards.youer.description']}
                        buttonLink="/software/youer"
                    />
                    <FeatureCard
                        imageSrc="/img/res/asyncyouer.webp"
                        title="AsyncYouer"
                        subtitle=""
                        description={strings['index.cards.asyncyouer.description']}
                        buttonLink="/software/asyncyouer"
                    />
                    <FeatureCard
                        imageSrc="/img/res/mohist.png"
                        title="Mohist"
                        subtitle="EOL"
                        description={strings['index.cards.mohist.description']}
                        buttonLink="/software/mohist"
                    />
                </div>
            </section>
            <StatisticsElement />
            <section
                className={`bg-gray-50 dark:bg-dark-25 flex justify-center flex-col items-center pt-12`}
            >
                <h2 className="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-4xl dark:text-white">
                    {getLocaleStringAsArgs(strings['index.partner.title'])[0]}
                    <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">
                        {
                            getLocaleStringAsArgs(
                                strings['index.partner.title'],
                            )[1]
                        }
                    </span>
                    {getLocaleStringAsArgs(strings['index.partner.title'])[2]}
                </h2>
                <DefaultCarousel />
            </section>
        </section>
    )
}

export default Home
