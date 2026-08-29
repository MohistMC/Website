import { CustomFlowbiteTheme } from 'flowbite-react'

export const customTheme: CustomFlowbiteTheme = {
    toast: {
        root: {
            base: 'flex w-full max-w-sm md:max-w-2xl items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-dark-100 dark:text-gray-300',
            closed: 'opacity-0 ease-out',
        },
        toggle: {
            base: '-mx-1.5 -my-1.5 ml-auto flex justify-center items-center h-8 w-8 rounded-lg bg-white p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:bg-dark-200 dark:text-gray-500 dark:hover:bg-dark-300 dark:hover:text-white',
            icon: 'h-5 w-5 shrink-0',
        },
    },
    modal: {
        root: {
            base: 'fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full',
            show: {
                on: 'flex bg-gray-900 dark:bg-dark-50 bg-opacity-50 dark:bg-opacity-80',
                off: 'hidden',
            },
            sizes: {
                sm: 'max-w-sm',
                md: 'max-w-md',
                lg: 'max-w-lg',
                xl: 'max-w-xl',
                '2xl': 'max-w-2xl',
                '3xl': 'max-w-3xl',
                '4xl': 'max-w-4xl',
                '5xl': 'max-w-5xl',
                '6xl': 'max-w-6xl',
                '7xl': 'max-w-7xl',
            },
            positions: {
                'top-left': 'items-start justify-start',
                'top-center': 'items-start justify-center',
                'top-right': 'items-start justify-end',
                'center-left': 'items-center justify-start',
                center: 'items-center justify-center',
                'center-right': 'items-center justify-end',
                'bottom-right': 'items-end justify-end',
                'bottom-center': 'items-end justify-center',
                'bottom-left': 'items-end justify-start',
            },
        },
        content: {
            base: 'relative h-full w-full p-4 md:h-auto',
            inner: 'relative rounded-lg bg-white shadow dark:bg-dark-300 flex flex-col max-h-[90vh]',
        },
        body: {
            base: 'p-6 flex-1 overflow-auto',
            popup: 'pt-0',
        },
        header: {
            base: 'flex items-start justify-between rounded-t dark:border-dark-400 border-b p-5',
            popup: 'p-2 border-b-0',
            title: 'text-xl font-medium text-gray-900 dark:text-white',
            close: {
                base: 'ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-dark-300 dark:hover:text-white',
                icon: 'h-5 w-5',
            },
        },
        footer: {
            base: 'flex flex-wrap items-center space-x-2 rounded-b border-gray-200 p-6 dark:border-dark-400',
            popup: 'border-t',
        },
    },
    avatar: {
        root: {
            base: 'flex justify-center items-center space-x-4 rounded ml-3',
            bordered: 'p-1 ring-2',
            rounded: 'rounded-full',
            color: {
                dark: 'ring-gray-800 dark:ring-gray-800',
                failure: 'ring-red-500 dark:ring-red-700',
                gray: 'ring-gray-500 dark:ring-gray-400',
                info: 'ring-cyan-400 dark:ring-cyan-800',
                light: 'ring-gray-300 dark:ring-gray-500',
                purple: 'ring-purple-500 dark:ring-purple-600',
                success: 'ring-green-500 dark:ring-green-500',
                warning: 'ring-yellow-300 dark:ring-yellow-500',
                pink: 'ring-pink-500 dark:ring-pink-500',
            },
            img: {
                off: 'relative overflow-hidden bg-gray-100 dark:bg-gray-600',
                on: '',
                placeholder: 'absolute w-auto h-auto text-gray-400 -bottom-1',
            },
            size: {
                xs: 'w-6 h-6',
                sm: 'w-8 h-8',
                md: 'w-10 h-10',
                lg: 'w-20 h-20',
                xl: 'w-36 h-36',
            },
            stacked: 'ring-2 ring-gray-300 dark:ring-gray-500',
            statusPosition: {
                'bottom-left': '-bottom-1 -left-1',
                'bottom-center': '-bottom-1 center',
                'bottom-right': '-bottom-1 -right-1',
                'top-left': '-top-1 -left-1',
                'top-center': '-top-1 center',
                'top-right': '-top-1 -right-1',
                'center-right': 'center -right-1',
                center: 'center center',
                'center-left': 'center -left-1',
            },
            status: {
                away: 'bg-yellow-400',
                base: 'absolute h-3.5 w-3.5 rounded-full border-2 border-white dark:border-dark-300',
                busy: 'bg-red-400',
                offline: 'bg-gray-400',
                online: 'bg-green-400',
            },
            initials: {
                text: 'font-medium text-gray-600 dark:text-gray-300',
                base: 'inline-flex overflow-hidden relative justify-center items-center bg-gray-100 dark:bg-gray-600',
            },
        },
        group: {
            base: 'flex -space-x-4',
        },
        groupCounter: {
            base: 'relative flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 rounded-full ring-2 ring-gray-300 hover:bg-gray-600 dark:ring-gray-500',
        },
    },
    dropdown: {
        // self-center : le bouton Flowbite est en items-stretch, sans quoi la fleche se cale en haut.
        arrowIcon: 'ml-1 h-4 w-4 self-center dark:text-gray-300',
        content: 'py-1 focus:outline-none',
        floating: {
            animation: 'transition-opacity',
            arrow: {
                base: 'absolute z-10 h-2 w-2 rotate-45',
                style: {
                    dark: 'bg-gray-900 dark:bg-dark-200',
                    light: 'bg-white',
                    auto: 'bg-white dark:bg-dark-200',
                },
                placement: '-4px',
            },
            base: 'z-10 w-fit rounded divide-y divide-gray-100 shadow focus:outline-none',
            content: 'py-1 text-sm text-gray-700 dark:text-gray-200',
            divider: 'my-1 h-px bg-gray-100 dark:bg-gray-600',
            header: 'block py-2 px-4 text-sm text-gray-700 dark:text-gray-200',
            hidden: 'invisible opacity-0',
            item: {
                base: 'flex items-center justify-start py-2 px-4 text-sm text-gray-700 cursor-pointer w-full hover:bg-gray-100 focus:bg-gray-100 dark:text-gray-200 focus:outline-none dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white dark:hover:bg-gray-600',
                icon: 'mr-2 h-4 w-4',
            },
            style: {
                dark: 'border border-gray-600 bg-gray-900 text-white dark:bg-dark-200',
                light: 'border border-gray-200 bg-white text-gray-900',
                auto: 'border border-gray-200 bg-white text-gray-900 dark:border-gray-600 dark:bg-dark-200 dark:text-white',
            },
            target: 'w-fit',
        },
        inlineWrapper: 'flex items-center',
    },
    card: {
        root: {
            base: 'flex rounded-lg border border-gray-200 bg-white shadow-md dark:border-dark-200 dark:bg-dark-100 max-w-sm',
            children: 'flex h-full flex-col justify-center gap-4 p-6',
            horizontal: {
                off: 'flex-col items-center p-2 pt-5',
                on: 'flex-col md:max-w-xl md:flex-row',
            },
            href: 'hover:bg-gray-100 dark:hover:bg-gray-700',
        },
        img: {
            base: '',
            horizontal: {
                off: 'rounded-t-lg object-cover h-auto w-44 md:rounded',
                on: 'h-96 w-full rounded-t-lg object-cover md:h-auto md:w-44 md:rounded-none md:rounded-l-lg',
            },
        },
    },
    checkbox: {
        root: {
            base: 'h-4 w-4 rounded border border-gray-300 bg-gray-100 focus:ring-2 focus:ring-cyan-500 dark:border-gray-600 dark:bg-dark-300 dark:ring-offset-gray-800 dark:focus:ring-cyan-600 text-cyan-600',
        },
    },
    fileInput: {
        root: {
            base: 'flex',
        },
        field: {
            base: 'relative w-full',
            input: {
                base: 'rounded-lg overflow-hidden block w-full border disabled:cursor-not-allowed disabled:opacity-50',
                sizes: {
                    sm: 'sm:text-xs',
                    md: 'text-sm',
                    lg: 'sm:text-md',
                },
                colors: {
                    gray: 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-dark-300 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500',
                    info: 'border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500',
                    failure:
                        'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500',
                    warning:
                        'border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500',
                    success:
                        'border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500',
                },
            },
        },
    },
    label: {
        root: {
            base: 'text-sm font-medium',
            disabled: 'opacity-50',
            colors: {
                default: 'text-gray-900 dark:text-white',
                info: 'text-cyan-500 dark:text-cyan-600',
                failure: 'text-red-700 dark:text-red-500',
                warning: 'text-yellow-500 dark:text-yellow-600',
                success: 'text-green-700 dark:text-green-500',
            },
        },
    },
    radio: {
        root: {
            base: 'h-4 w-4 border border-gray-300 focus:ring-2 focus:ring-cyan-500 dark:border-gray-600 dark:bg-dark-300 dark:focus:bg-cyan-600 dark:focus:ring-cyan-600 text-cyan-600',
        },
    },
    rangeSlider: {
        root: {
            base: 'flex',
        },
        field: {
            base: 'relative w-full',
            input: {
                base: 'w-full bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-dark-300',
                sizes: {
                    sm: 'h-1 range-sm',
                    md: 'h-2',
                    lg: 'h-3 range-lg',
                },
            },
        },
    },
    textInput: {
        base: 'flex',
        addon: 'inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-200 px-3 text-sm text-gray-900 dark:border-gray-600 dark:bg-dark-300 dark:text-gray-300',
        field: {
            base: 'relative w-full',
            icon: {
                base: 'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3',
                svg: 'h-5 w-5 text-gray-500 dark:text-gray-300',
            },
            rightIcon: {
                base: 'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3',
                svg: 'h-5 w-5 text-gray-500 dark:text-gray-300',
            },
            input: {
                base: 'block w-full border disabled:cursor-not-allowed disabled:opacity-50',
                sizes: {
                    sm: 'p-2 sm:text-xs',
                    md: 'p-2.5 text-sm',
                    lg: 'sm:text-md p-4',
                },
                colors: {
                    gray: 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-dark-400 dark:bg-dark-300 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500',
                    info: 'border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500',
                    failure:
                        'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500',
                    warning:
                        'border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500',
                    success:
                        'border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500',
                },
                withRightIcon: {
                    on: 'pr-10',
                    off: '',
                },
                withIcon: {
                    on: 'pl-10',
                    off: '',
                },
                withAddon: {
                    on: 'rounded-r-lg',
                    off: 'rounded-lg',
                },
                withShadow: {
                    on: 'shadow-sm dark:shadow-sm-light',
                    off: '',
                },
            },
        },
    },
    textarea: {
        base: 'block w-full rounded-lg border disabled:cursor-not-allowed disabled:opacity-50 text-sm',
        colors: {
            gray: 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-dark-300 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500',
            info: 'border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500',
            failure:
                'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500',
            warning:
                'border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500',
            success:
                'border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500',
        },
        withShadow: {
            on: 'shadow-sm dark:shadow-sm-light',
            off: '',
        },
    },
    toggleSwitch: {
        root: {
            base: 'group relative flex items-center rounded-lg focus:outline-none',
            active: {
                on: 'cursor-pointer',
                off: 'cursor-not-allowed opacity-50',
            },
            label: 'ml-3 text-sm font-medium text-gray-900 dark:text-gray-300',
        },
        toggle: {
            base: 'toggle-bg h-6 w-11 rounded-full border group-focus:ring-4 group-focus:ring-cyan-500/25',
            checked: {
                on: 'after:translate-x-full after:border-white',
                off: 'border-gray-200 bg-gray-200 dark:border-gray-600 dark:bg-dark-300',
                color: {
                    blue: ' bg-cyan-700 border-cyan-700',
                    dark: 'bg-dark-700 border-dark-900',
                    failure: 'bg-red-700 border-red-900',
                    gray: 'bg-gray-500 border-gray-600',
                    green: 'bg-green-600 border-green-700',
                    light: 'bg-light-700 border-light-900',
                    red: 'bg-red-700 border-red-900',
                    purple: 'bg-purple-700 border-purple-900',
                    success: 'bg-green-500 border-green-500',
                    yellow: 'bg-yellow-400 border-yellow-400',
                    warning: 'bg-yellow-600 border-yellow-600',
                    cyan: 'bg-cyan-500 border-cyan-500',
                    lime: 'bg-lime-400 border-lime-400',
                    indigo: 'bg-indigo-400 border-indigo-400',
                    teal: 'bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4',
                    info: 'bg-cyan-600 border-cyan-600',
                    pink: 'bg-pink-600 border-pink-600',
                },
            },
        },
    },
    select: {
        base: 'relative w-full',
        field: {
            base: 'relative w-full',
            select: {
                base: 'block w-full rounded-lg border disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-dark-300 dark:text-white dark:placeholder-gray-400',
                colors: {
                    gray: 'bg-gray-50 border-gray-300 text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 dark:focus:border-cyan-500 dark:focus:ring-cyan-500',
                    info: 'border-cyan-500 bg-cyan-50 text-cyan-900 placeholder-cyan-700 focus:border-cyan-500 focus:ring-cyan-500 dark:border-cyan-400 dark:bg-cyan-100 dark:focus:border-cyan-500 dark:focus:ring-cyan-500',
                    failure:
                        'border-red-500 bg-red-50 text-red-900 placeholder-red-700 focus:border-red-500 focus:ring-red-500 dark:border-red-400 dark:bg-red-100 dark:focus:border-red-500 dark:focus:ring-red-500',
                    warning:
                        'border-yellow-500 bg-yellow-50 text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500',
                    success:
                        'border-green-500 bg-green-50 text-green-900 placeholder-green-700 focus:border-green-500 focus:ring-green-500 dark:border-green-400 dark:bg-green-100 dark:focus:border-green-500 dark:focus:ring-green-500',
                },
            },
        },
    },
    carousel: {
        root: {
            base: 'relative h-36 md:h-56 w-full mb-10',
            leftControl:
                'absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none',
            rightControl:
                'absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none',
        },
        indicators: {
            active: {
                off: 'bg-gray-300 hover:bg-gray-200 dark:bg-dark-100 dark:hover:bg-gray-800',
                on: 'bg-gray-200 dark:bg-dark-400',
            },
            base: 'h-3 w-3 rounded-full',
            wrapper:
                'absolute bottom-6 left-1/2 flex -translate-x-1/2 space-x-3',
        },
        item: {
            base: 'absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center',
            wrapper: {
                off: 'w-full flex-shrink-0 transform cursor-default snap-center',
                on: 'w-full flex-shrink-0 transform cursor-grab snap-center',
            },
        },
        control: {
            base: 'inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 group-hover:bg-gray-400 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-dark-200 dark:group-hover:dark:bg-dark-100 dark:group-focus:dark:bg-dark-100 sm:h-10 sm:w-10',
            icon: 'h-5 w-5 text-white dark:text-gray-500 sm:h-6 sm:w-6',
        },
        scrollContainer: {
            base: 'flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg',
            snap: 'snap-x',
        },
    },
}
