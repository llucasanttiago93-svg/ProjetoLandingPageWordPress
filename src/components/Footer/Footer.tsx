import { useEffect, useState } from "react";

import "./Footer.css";

const FOOTER_ENDPOINT = "/wp-json/vanti/v1/footer";

type FooterStyle = {
    handle: string;
    url: string;
};

function Footer() {
    const [footerHtml, setFooterHtml] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const loadFooter = async () => {
            try {
                const response = await fetch(
                    FOOTER_ENDPOINT,
                    {
                        method: "GET",
                        credentials: "same-origin",
                        headers: {
                            Accept: "application/json",
                        },
                        cache: "no-store",
                    }
                );

                if (!response.ok) {
                    throw new Error(
                        `Erro ao carregar footer: ${response.status}`
                    );
                }

                const data = await response.json();

                /*
                 * =====================================================
                 * CARREGAR CSS DINÂMICO DO ELEMENTOR
                 * =====================================================
                 */

                if (Array.isArray(data?.styles)) {
                    data.styles.forEach((style: FooterStyle) => {
                        if (!style?.url) {
                            return;
                        }

                        const existing = document.querySelector(
                            `link[data-vanti-elementor-style="${style.handle}"]`
                        );

                        if (existing) {
                            return;
                        }

                        const link = document.createElement("link");

                        link.rel = "stylesheet";
                        link.href = style.url;
                        link.dataset.vantiElementorStyle =
                            style.handle;

                        document.head.appendChild(link);
                    });
                }

                /*
                 * =====================================================
                 * HTML DO FOOTER
                 * =====================================================
                 */

                if (
                    !cancelled &&
                    data?.success &&
                    typeof data?.html === "string"
                ) {
                    setFooterHtml(data.html);
                }

            } catch (error) {

                console.error(
                    "Não foi possível carregar o footer do Elementor.",
                    error
                );

            } finally {

                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        loadFooter();

        return () => {
            cancelled = true;
        };
    }, []);

    /*
     * =========================================================
     * LOADING
     * =========================================================
     */

    if (loading) {
        return (
            <footer
                className="footer-loading"
                aria-label="Rodapé Vanti Cosméticos"
            />
        );
    }

    /*
     * =========================================================
     * FALLBACK
     * =========================================================
     */

    if (!footerHtml) {
        return null;
    }

    /*
     * =========================================================
     * FOOTER ELEMENTOR
     * =========================================================
     */

    return (
        <div
            className="elementor-footer-wrapper"
            dangerouslySetInnerHTML={{
                __html: footerHtml,
            }}
        />
    );
}

export default Footer;