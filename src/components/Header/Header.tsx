import { useEffect, useRef, useState } from "react";
import "./Header.css";

const HEADER_ENDPOINT =
    "https://www.vanticosmeticos.com.br/wp-json/vanti/v1/header";

type ElementorStyle = {
    handle?: string;
    url?: string;
};

type ElementorScript = {
    handle?: string;
    src?: string;
    url?: string;
    deps?: string[];

    /*
     * Configurações que o WordPress/Elementor
     * precisa executar ANTES do JS principal.
     */
    inline_before?: string[];

    /*
     * Scripts que precisam executar DEPOIS
     * do JS principal.
     */
    inline_after?: string[];
};

type HeaderResponse = {
    success: boolean;
    header_id?: number;
    kit_id?: number;

    styles?: ElementorStyle[] | string[];

    scripts?: ElementorScript[];

    /*
     * Mantido para compatibilidade com o endpoint.
     */
    inline_scripts?: string | string[];

    font_links?: string | string[];

    html?: string;
};


/*
 * =========================================================
 * CSS
 * =========================================================
 */

function loadStyles(
    styles: ElementorStyle[] | string[] = []
) {
    styles.forEach((style) => {
        const url =
            typeof style === "string"
                ? style
                : style?.url;

        if (!url) return;

        const normalizedUrl = new URL(
            url,
            window.location.origin
        ).href;

        const exists = Array.from(
            document.querySelectorAll<HTMLLinkElement>(
                'link[rel="stylesheet"]'
            )
        ).some(
            (link) =>
                link.href === normalizedUrl
        );

        if (exists) return;

        const link =
            document.createElement("link");

        link.rel = "stylesheet";
        link.href = url;

        link.dataset.vantiElementorHeader =
            "true";

        document.head.appendChild(link);
    });
}


/*
 * =========================================================
 * FONTES
 * =========================================================
 */

function loadFontLinks(
    fonts: string | string[] | undefined
) {
    if (!fonts) return;

    const urls = Array.isArray(fonts)
        ? fonts
        : [fonts];

    urls.forEach((url) => {
        if (!url) return;

        const normalizedUrl = new URL(
            url,
            window.location.origin
        ).href;

        const exists = Array.from(
            document.querySelectorAll<HTMLLinkElement>(
                'link[rel="stylesheet"]'
            )
        ).some(
            (link) =>
                link.href === normalizedUrl
        );

        if (exists) return;

        const link =
            document.createElement("link");

        link.rel = "stylesheet";
        link.href = url;

        link.dataset.vantiElementorHeaderFont =
            "true";

        document.head.appendChild(link);
    });
}


/*
 * =========================================================
 * EXECUTAR SCRIPT INLINE
 * =========================================================
 */

function executeInlineScript(
    content: string
) {
    if (!content?.trim()) return;

    const script =
        document.createElement("script");

    script.type = "text/javascript";

    script.text = content;

    script.dataset
        .vantiElementorHeaderInline =
        "true";

    document.body.appendChild(script);
}


/*
 * =========================================================
 * CARREGAR SCRIPT EXTERNO
 * =========================================================
 */

function loadScript(
    src: string
): Promise<void> {
    return new Promise(
        (resolve, reject) => {

            if (!src) {
                resolve();
                return;
            }

            const normalizedSrc =
                new URL(
                    src,
                    window.location.origin
                ).href;


            /*
             * Verifica se o script já existe.
             */

            const existing =
                Array.from(
                    document.scripts
                ).find(
                    (script) =>
                        script.src ===
                        normalizedSrc
                );


            if (existing) {

                /*
                 * Já terminou de carregar.
                 */

                if (
                    existing.dataset
                        .vantiScriptLoaded ===
                    "true"
                ) {
                    resolve();
                    return;
                }


                /*
                 * Ainda carregando.
                 */

                existing.addEventListener(
                    "load",
                    () => resolve(),
                    { once: true }
                );

                existing.addEventListener(
                    "error",
                    () =>
                        reject(
                            new Error(
                                `Erro ao carregar ${src}`
                            )
                        ),
                    { once: true }
                );

                return;
            }


            /*
             * Cria novo script.
             */

            const script =
                document.createElement(
                    "script"
                );

            script.src = src;

            /*
             * Não deixar o navegador
             * embaralhar a ordem.
             */
            script.async = false;

            script.dataset
                .vantiElementorHeader =
                "true";


            script.addEventListener(
                "load",
                () => {

                    script.dataset
                        .vantiScriptLoaded =
                        "true";

                    resolve();

                },
                { once: true }
            );


            script.addEventListener(
                "error",
                () =>
                    reject(
                        new Error(
                            `Erro ao carregar ${src}`
                        )
                    ),
                { once: true }
            );


            document.body.appendChild(
                script
            );
        }
    );
}


/*
 * =========================================================
 * ELEMENTOR
 * =========================================================
 */

async function initializeElementor() {

    const win =
        window as Window & {
            elementorFrontend?: {
                init?: () => void;
            };
        };


    /*
     * Inicializa o Elementor.
     */

    if (
        win.elementorFrontend?.init
    ) {

        try {

            win.elementorFrontend.init();

        } catch (error) {

            console.warn(
                "Vanti Header: erro ao inicializar Elementor.",
                error
            );

        }

    }


    /*
     * Dispara o evento esperado
     * pelos widgets.
     */

    window.dispatchEvent(
        new Event(
            "elementor/frontend/init"
        )
    );
}


/*
 * =========================================================
 * COMPONENTE
 * =========================================================
 */

export default function Header() {

    const hostRef =
        useRef<HTMLDivElement | null>(
            null
        );


    const [header, setHeader] =
        useState<HeaderResponse | null>(
            null
        );


    /*
     * =====================================================
     * BUSCAR HEADER
     * =====================================================
     */

    useEffect(() => {

        let cancelled = false;


        async function fetchHeader() {

            try {

                const response =
                    await fetch(
                        HEADER_ENDPOINT,
                        {
                            method: "GET",

                            credentials:
                                "include",

                            cache:
                                "no-store",

                            headers: {
                                Accept:
                                    "application/json",
                            },
                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        `HTTP ${response.status}`
                    );

                }


                const data:
                    HeaderResponse =
                    await response.json();


                if (
                    !data.success ||
                    !data.html
                ) {

                    throw new Error(
                        "Endpoint não retornou um Header válido."
                    );

                }


                if (cancelled) return;


                /*
                 * CSS real do Elementor.
                 */

                loadStyles(
                    data.styles ?? []
                );


                /*
                 * Fontes reais.
                 */

                loadFontLinks(
                    data.font_links
                );


                setHeader(data);

            } catch (error) {

                console.error(
                    "Vanti Header: erro ao carregar Header do Elementor.",
                    error
                );

            }

        }


        fetchHeader();


        return () => {

            cancelled = true;

        };

    }, []);


    /*
     * =====================================================
     * RENDERIZAR HEADER
     * =====================================================
     */

    useEffect(() => {

        if (!header?.html) return;


        const currentHeader =
            header;


        const headerHtml =
            currentHeader.html;


        if (!headerHtml) return;


        /*
         * Remove qualquer Header anterior
         * criado por esta integração.
         */

        document
            .querySelectorAll<HTMLElement>(
                '[data-vanti-elementor-header-host="true"]'
            )
            .forEach((element) => {

                element.remove();

            });


        /*
         * Cria o container.
         */

        const host =
            document.createElement(
                "div"
            );


        host.className =
            "elementor-header-wrapper";


        host.dataset
            .vantiElementorHeaderHost =
            "true";


        /*
         * HTML EXATO do Elementor.
         */

        host.innerHTML =
            headerHtml;


        /*
         * Coloca diretamente no BODY.
         */

        document.body.prepend(
            host
        );


        hostRef.current =
            host;


        let active = true;


        /*
         * =================================================
         * INICIALIZAR HEADER
         * =================================================
         */

        async function initializeHeader() {

            try {

                /*
                 * IMPORTANTE:
                 *
                 * Agora cada configuração
                 * inline_before é executada
                 * ANTES do respectivo JS.
                 *
                 * Exemplo:
                 *
                 * elementorFrontendConfig
                 *       ↓
                 * elementor-frontend.js
                 *
                 * ElementorProFrontendConfig
                 *       ↓
                 * elementor-pro-frontend.js
                 */

                for (
                    const script of
                    currentHeader.scripts ?? []
                ) {

                    if (!active) return;


                    /*
                     * -------------------------------------
                     * 1. INLINE BEFORE
                     * -------------------------------------
                     */

                    const inlineBefore =
                        script.inline_before ??
                        [];


                    for (
                        const inlineScript of
                        inlineBefore
                    ) {

                        if (!active) return;

                        executeInlineScript(
                            inlineScript
                        );

                    }


                    /*
                     * -------------------------------------
                     * 2. SCRIPT PRINCIPAL
                     * -------------------------------------
                     */

                    const src =
                        script.src ??
                        script.url;


                    if (src) {

                        await loadScript(
                            src
                        );

                    }


                    /*
                     * -------------------------------------
                     * 3. INLINE AFTER
                     * -------------------------------------
                     */

                    const inlineAfter =
                        script.inline_after ??
                        [];


                    for (
                        const inlineScript of
                        inlineAfter
                    ) {

                        if (!active) return;

                        executeInlineScript(
                            inlineScript
                        );

                    }

                }


                if (!active) return;


                /*
                 * Mantém compatibilidade caso
                 * ainda exista algum script
                 * no campo antigo.
                 */

                if (
                    currentHeader.inline_scripts
                ) {

                    const legacyScripts =
                        Array.isArray(
                            currentHeader.inline_scripts
                        )
                            ? currentHeader.inline_scripts
                            : [
                                currentHeader.inline_scripts
                            ];


                    legacyScripts.forEach(
                        (script) => {

                            if (!active) return;

                            executeInlineScript(
                                script
                            );

                        }
                    );

                }


                /*
                 * Aguarda o navegador processar
                 * o DOM e os scripts.
                 */

                await new Promise<void>(
                    (resolve) => {

                        requestAnimationFrame(
                            () => {

                                resolve();

                            }
                        );

                    }
                );


                if (!active) return;


                /*
                 * Inicializa Elementor.
                 */

                await initializeElementor();


            } catch (error) {

                console.error(
                    "Vanti Header: erro ao inicializar scripts do Elementor.",
                    error
                );

            }

        }


        initializeHeader();


        /*
         * =================================================
         * LIMPEZA
         * =================================================
         */

        return () => {

            active = false;


            if (
                hostRef.current ===
                host
            ) {

                host.remove();

                hostRef.current =
                    null;

            }

        };

    }, [header]);


    /*
     * O Header fica diretamente no BODY.
     */

    return null;
}