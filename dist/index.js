import React, { forwardRef, useRef, useState, useImperativeHandle, useEffect } from 'react';

const getEmbedUrl = (baseUrl, urlParameters, addConfiguration)=>{
    const url = new URL("/", baseUrl ?? "https://embed.diagrams.net");
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append("embed", "1");
    urlSearchParams.append("proto", "json");
    if (addConfiguration) {
        urlSearchParams.append("configure", "1");
    }
    if (urlParameters) {
        Object.keys(urlParameters).forEach((key)=>{
            const value = urlParameters[key];
            if (value !== undefined) {
                if (typeof value === "boolean") {
                    urlSearchParams.append(key, value ? "1" : "0");
                } else {
                    urlSearchParams.append(key, value.toString());
                }
            }
        });
    }
    url.search = urlSearchParams.toString();
    return url.toString();
};

function handleEvent(event, handlers, baseUrl) {
    if (!event.origin.includes("embed.diagrams.net") && baseUrl && !event.origin.includes(baseUrl)) {
        return;
    }
    try {
        const data = JSON.parse(event.data);
        if (data.event in handlers) {
            const handler = handlers[data.event];
            if (handler) {
                // @ts-ignore Not sure how to fix for now
                handler(data);
            }
        }
    } catch  {
    //
    }
}

const useActions = (iframeRef)=>{
    const sendAction = (action, data)=>{
        iframeRef.current?.contentWindow?.postMessage(JSON.stringify({
            action,
            ...data
        }), "*");
    };
    /**
   * Load the contents of a diagram
   */ const load = (data)=>{
        sendAction("load", data);
    };
    const configure = (data)=>{
        sendAction("configure", data);
    };
    /**
   * Merge the contents of the given XML into the current file
   */ const merge = (data)=>{
        sendAction("merge", data);
    };
    /**
   * Display a dialog in the editor window
   */ const dialog = (data)=>{
        sendAction("dialog", data);
    };
    /**
   * Display a prompt in the editor window
   */ const prompt = (data)=>{
        sendAction("prompt", data);
    };
    /**
   * Show the template dialog
   */ const template = (data)=>{
        sendAction("template", data);
    };
    /**
   * Runs an array of layouts using the same format as Arrange > Layout > Apply.
   */ const layout = (data)=>{
        sendAction("layout", data);
    };
    /**
   * Show a draft dialog
   */ const draft = (data)=>{
        sendAction("draft", data);
    };
    /**
   * Display a message in the status bar
   */ const status = (data)=>{
        sendAction("status", data);
    };
    /**
   * Display a spinner with a message or hide the current spinner if show is set to false
   */ const spinner = (data)=>{
        sendAction("spinner", data);
    };
    const exportDiagram = (data)=>{
        sendAction("export", data);
    };
    return {
        load,
        configure,
        merge,
        dialog,
        prompt,
        template,
        layout,
        draft,
        status,
        spinner,
        exportDiagram
    };
};

const DrawIoEmbed = /*#__PURE__*/ forwardRef((props, ref)=>{
    const { baseUrl, urlParameters, configuration, xml, exportFormat, onSave, onClose, onLoad, onConfigure, onDraft, onExport, onMerge, onPrompt, onTemplate } = props;
    const iframeRef = useRef(null);
    const action = useActions(iframeRef);
    const iframeUrl = getEmbedUrl(baseUrl, urlParameters, !!configuration);
    const [isInitialized, setIsInitialized] = useState(false);
    const messageHandler = (evt)=>{
        handleEvent(evt, {
            init: ()=>{
                setIsInitialized(true);
            },
            load: (data)=>{
                if (onLoad) {
                    onLoad(data);
                }
            },
            configure: (data)=>{
                if (configuration) {
                    action.configure({
                        config: configuration
                    });
                }
                if (onConfigure) {
                    onConfigure(data);
                }
            },
            save: (data)=>{
                action.exportDiagram({
                    format: exportFormat || "xmlsvg",
                    // @ts-ignore not allowed normally, but only for internal use
                    exit: data.exit,
                    parentEvent: "save"
                });
            },
            exit: (data)=>{
                if (onClose) {
                    onClose(data);
                }
            },
            draft: (data)=>{
                if (onDraft) {
                    onDraft(data);
                }
            },
            export: (data)=>{
                if (onSave) {
                    onSave({
                        event: "save",
                        xml: data.data,
                        parentEvent: data.message.parentEvent || "export"
                    });
                }
                if (onExport) {
                    onExport(data);
                }
                // @ts-ignore not allowed normally, but only for internal use
                if (data.message.exit && onClose) {
                    onClose({
                        event: "exit",
                        modified: true,
                        parentEvent: data.message.parentEvent || "export"
                    });
                }
            },
            merge: (data)=>{
                if (onMerge) {
                    onMerge(data);
                }
            },
            prompt: (data)=>{
                if (onPrompt) {
                    onPrompt(data);
                }
            },
            template: (data)=>{
                if (onTemplate) {
                    onTemplate(data);
                }
            }
        }, baseUrl);
    };
    useImperativeHandle(ref, ()=>({
            ...action
        }), []);
    useEffect(()=>{
        if (isInitialized) {
            if (xml) {
                if (exportFormat === "xmlpng") {
                    action.load({
                        xmlpng: xml
                    });
                } else {
                    action.load({
                        xml
                    });
                }
            } else {
                action.load({
                    xml: ""
                });
            }
        }
    }, [
        isInitialized,
        xml
    ]);
    // Initial load
    useEffect(()=>{
        window.addEventListener("message", messageHandler);
        return ()=>{
            window.removeEventListener("message", messageHandler);
        };
    }, []);
    return /*#__PURE__*/ React.createElement("iframe", {
        className: "diagrams-iframe",
        src: iframeUrl,
        ref: iframeRef,
        title: "Diagrams.net",
        style: {
            width: "100%",
            height: "100%",
            minWidth: "400px",
            minHeight: "400px",
            border: "none"
        }
    });
});

export { DrawIoEmbed };
//# sourceMappingURL=index.js.map
