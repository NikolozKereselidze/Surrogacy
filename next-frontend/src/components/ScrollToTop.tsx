"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
const LOCALES = ["en", "he", "zh", "ru", "es", "ka"];
function pathWithoutLocale(pathname: string): string {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && LOCALES.includes(segments[0])) {
        return "/" + segments.slice(1).join("/");
    }
    return pathname || "/";
}
const ScrollToTop = () => {
    const pathname = usePathname();
    const prevPathRef = useRef(pathWithoutLocale(pathname));
    useEffect(() => {
        const currentPath = pathWithoutLocale(pathname);
        const prevPath = prevPathRef.current;
        if (currentPath !== prevPath) {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
        prevPathRef.current = currentPath;
    }, [pathname]);
    return null;
};
export default ScrollToTop;
