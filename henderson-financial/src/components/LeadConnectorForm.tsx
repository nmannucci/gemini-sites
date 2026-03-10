import { useEffect, useRef } from 'react';

interface LeadConnectorFormProps {
  formId?: string;
  height?: string;
  className?: string;
}

export default function LeadConnectorForm({ 
  formId = "G39HasZvXOK2YRmJBIBo", 
  height = "625",
  className = ""
}: LeadConnectorFormProps) {
  // Use a ref to ensure the ID remains constant across re-renders
  const iframeId = useRef(`inline-${formId}-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const scriptId = 'msgsndr-form-embed-js';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    
    if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.src = "https://link.msgsndr.com/js/form_embed.js";
        script.async = true;
        document.body.appendChild(script);
    }
  }, []);

  return (
    <div className={`w-full h-full bg-slate-50 p-4 rounded-sm border border-gray-100 shadow-xl ${className}`}>
      <iframe
        src={`https://api.leadconnectorhq.com/widget/form/${formId}`}
        style={{ width: '100%', height: '100%', border: 'none', borderRadius: '16px' }}
        id={iframeId.current}
        data-layout="{'id':'INLINE'}"
        data-trigger-type="alwaysShow"
        data-trigger-value=""
        data-activation-type="alwaysActivated"
        data-activation-value=""
        data-deactivation-type="neverDeactivate"
        data-deactivation-value=""
        data-form-name="Web Form"
        data-height={height}
        data-layout-iframe-id={iframeId.current}
        data-form-id={formId}
        title="Web Form"
      >
      </iframe>
    </div>
  );
}
