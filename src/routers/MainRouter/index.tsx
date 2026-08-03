import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { NotFound } from "../../pages/NotFound";
import { AboutPomodoro } from "../../pages/AboutPomodoro";
import { Home } from "../../pages/Home";    
import { useEffect } from "react";

// Componente que não retorna nada, mas responsável por rolar página para o topo e utilizando hooks
function ScrollToTop() {
    const { pathname } = useLocation();
    
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);

    return null
}

export function MainRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about-pomodoro/' element={<AboutPomodoro />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
            <ScrollToTop />
        </BrowserRouter>
    )
}