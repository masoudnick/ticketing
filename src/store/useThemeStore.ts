import { create } from 'zustand'




interface themeState {
    theme: string;
    setTheme: (theme: string) => void
}


const setInitialTheme = () => {
    const theme = localStorage.getItem("theme");
    return theme ? theme : 
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light";
}


const useThemeStore = create<themeState>()((set) => ({
    theme: setInitialTheme(),
    setTheme: (theme) => {
        localStorage.setItem('theme', theme);
        set({ theme: theme })
    }

}));


export default useThemeStore;