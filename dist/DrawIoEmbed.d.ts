import { DrawIoEmbedProps } from './types';
import React from 'react';
export declare const DrawIoEmbed: React.ForwardRefExoticComponent<DrawIoEmbedProps & React.RefAttributes<{
    load: (data: {
        xml?: string | undefined;
        xmlpng?: string | undefined;
    }) => void;
    configure: (data: {
        config: {
            [key: string]: any;
        };
    }) => void;
    merge: (data: {
        xml: string;
    }) => void;
    dialog: (data: {
        title: string;
        message: string;
        button: string;
        modified?: boolean | undefined;
    }) => void;
    prompt: (data: {
        title: string;
        ok: string;
        defaultValue: string;
    }) => void;
    template: (data: {
        callback?: boolean | undefined;
    }) => void;
    layout: (data: {
        layouts: string[];
    }) => void;
    draft: (data: {
        xml: string;
        name: string;
        editKey: string;
        discardKey: string;
        ignore: boolean;
    }) => void;
    status: (data: {
        message: string;
        modified?: boolean | undefined;
    }) => void;
    spinner: (data: {
        message: string;
        show: boolean;
        enabled: boolean;
    }) => void;
    exportDiagram: (data: {
        xml?: string | undefined;
        message?: string | undefined;
        format: "xmlpng" | "html" | "html2" | "svg" | "xmlsvg" | "png";
        data?: string | undefined;
        parentEvent?: string | undefined;
    }) => void;
}>>;
//# sourceMappingURL=DrawIoEmbed.d.ts.map