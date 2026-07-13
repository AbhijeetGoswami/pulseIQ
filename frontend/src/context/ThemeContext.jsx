import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

const ThemeContext = createContext(null);

const STORAGE_KEY = "attenbase-theme";

const DEFAULT_THEME = "light";

/*
|--------------------------------------------------------------------------
| Theme Provider
|--------------------------------------------------------------------------
*/

export function ThemeProvider({ children }) {

    const [theme, setTheme] = useState(() => {

        const stored =
            localStorage.getItem(STORAGE_KEY);

        return stored || DEFAULT_THEME;

    });

    /*
    |--------------------------------------------------------------------------
    | Apply theme globally
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        document.body.classList.remove(
            "light-theme",
            "midnight-theme"
        );

        document.body.classList.add(
            `${theme}-theme`
        );

        localStorage.setItem(
            STORAGE_KEY,
            theme
        );

    }, [theme]);

    /*
    |--------------------------------------------------------------------------
    | Actions
    |--------------------------------------------------------------------------
    */

    function toggleTheme() {

        setTheme(current =>

            current === "light"
                ? "midnight"
                : "light"

        );

    }

    function setLightTheme() {

        setTheme("light");

    }

    function setMidnightTheme() {

        setTheme("midnight");

    }

    /*
    |--------------------------------------------------------------------------
    | Context Value
    |--------------------------------------------------------------------------
    */

    const value = useMemo(() => ({

        theme,

        toggleTheme,

        setLightTheme,

        setMidnightTheme,

        isLight: theme === "light",

        isMidnight: theme === "midnight"

    }), [theme]);

    return (

        <ThemeContext.Provider value={value}>

            {children}

        </ThemeContext.Provider>

    );

}

/*
|--------------------------------------------------------------------------
| Hook
|--------------------------------------------------------------------------
*/

export function useTheme() {

    const context = useContext(ThemeContext);

    if (!context) {

        throw new Error(

            "useTheme must be used inside ThemeProvider"

        );

    }

    return context;

}