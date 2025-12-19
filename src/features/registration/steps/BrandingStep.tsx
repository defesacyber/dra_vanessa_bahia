/// <reference lib="dom" />
import React from 'react';
import { useRegistrationStore } from '../store/registrationStore';
import { Upload, Palette } from 'lucide-react';
import { cn } from '../../../components/ui/Stepper';

export const BrandingStep: React.FC = () => {
    const { branding, updateBranding, nextStep, prevStep } = useRegistrationStore();
    // const fileInputRef = useRef<HTMLInputElement>(null); // Removido pois não é utilizado

    const handleColorChange = (e: React.ChangeEvent<any>) => {
        updateBranding({ primaryColor: e.target.value });
    };

    const handleFileUpload = (field: 'photo' | 'logo' | 'watermark') => (e: React.ChangeEvent<any>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Create local URL for preview
            const url = URL.createObjectURL(file);
            updateBranding({ [field]: url });
        }
    };

    // Helper component for file upload box
    const UploadBox = ({ label, field, value }: { label: string, field: 'photo' | 'logo' | 'watermark', value?: string }) => (
        <div className="space-y-2">
            <label className="text-sm font-medium text-stone-600 block">{label}</label>
            <div className="relative group cursor-pointer">
                <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    onChange={handleFileUpload(field)}
                />
                <div className={cn(
                    "h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-all bg-stone-50",
                    value ? "border-emerald-400 bg-emerald-50" : "border-stone-200 group-hover:border-emerald-300"
                )}>
                    {value ? (
                        <div className="relative w-full h-full p-2">
                            <img src={value} alt={label} className="w-full h-full object-contain rounded-lg" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                                <span className="text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">Alterar</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            <Upload className="w-6 h-6 text-stone-400 mb-2 group-hover:text-emerald-500 transition-colors" />
                            <span className="text-xs text-stone-500 font-medium">Clique para upload</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">

            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-800 flex gap-2">
                <SparklesIcon className="w-5 h-5 flex-shrink-0" />
                <p>Essas informações personalizam todo o sistema. Seus pacientes verão sua marca, suas cores e sua foto.</p>
            </div>

            <section className="space-y-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-stone-800 border-b border-stone-100 pb-2">
                    <Palette className="w-5 h-5 text-emerald-500" />
                    Identidade Visual
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <UploadBox label="Sua Foto" field="photo" value={branding.photo} />
                    <UploadBox label="Logo da Clínica" field="logo" value={branding.logo} />
                    <UploadBox label="Marca d'água (Relatórios)" field="watermark" value={branding.watermark} />
                </div>

                <div className="pt-4">
                    <label className="text-sm font-medium text-stone-600 block mb-3">Cor Principal do Sistema</label>
                    <div className="flex items-center gap-4 p-4 border border-stone-200 rounded-xl bg-white">
                        <input
                            type="color"
                            value={branding.primaryColor}
                            onChange={handleColorChange}
                            className="w-12 h-12 rounded cursor-pointer border-0 p-0"
                        />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-stone-900">Cor Selecionada: <span className="uppercase font-mono text-stone-500">{branding.primaryColor}</span></p>
                            <p className="text-xs text-stone-400">Usada em botões, destaques e gráficos.</p>
                        </div>
                        {/* Preview Button */}
                        <div className="px-4 py-2 rounded-lg text-white text-sm font-medium shadow-sm transition-transform hover:scale-105" style={{ backgroundColor: branding.primaryColor }}>
                            Botão Exemplo
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex justify-between pt-6">
                <button
                    onClick={prevStep}
                    className="px-6 py-3 text-stone-600 font-medium hover:bg-stone-100 rounded-xl transition-all"
                >
                    Voltar
                </button>
                <button
                    onClick={nextStep}
                    className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-500/20"
                >
                    Próximo: Pagamento
                </button>
            </div>
        </div>
    );
};

function SparklesIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 3.214L13 21l-2.286-6.857L5 12l5.714-3.214z" />
        </svg>
    );
}

