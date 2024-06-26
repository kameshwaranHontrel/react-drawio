import { RefObject } from 'react';
import { ActionConfigure, ActionDialog, ActionDraft, ActionExport, ActionLayout, ActionLoad, ActionMerge, ActionPrompt, ActionSpinner, ActionStatus, ActionTemplate } from '../types';
type UniqueActionProps<T> = Omit<T, 'action'>;
export declare const useActions: (iframeRef: RefObject<HTMLIFrameElement | null>) => {
    load: (data: UniqueActionProps<ActionLoad>) => void;
    configure: (data: UniqueActionProps<ActionConfigure>) => void;
    merge: (data: UniqueActionProps<ActionMerge>) => void;
    dialog: (data: UniqueActionProps<ActionDialog>) => void;
    prompt: (data: UniqueActionProps<ActionPrompt>) => void;
    template: (data: UniqueActionProps<ActionTemplate>) => void;
    layout: (data: UniqueActionProps<ActionLayout>) => void;
    draft: (data: UniqueActionProps<ActionDraft>) => void;
    status: (data: UniqueActionProps<ActionStatus>) => void;
    spinner: (data: UniqueActionProps<ActionSpinner>) => void;
    exportDiagram: (data: UniqueActionProps<ActionExport>) => void;
};
export {};
//# sourceMappingURL=useActions.d.ts.map