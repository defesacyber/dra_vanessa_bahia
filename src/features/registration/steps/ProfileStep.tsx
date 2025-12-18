import React from 'react';
import { useRegistrationStore } from '../store/registrationStore';
import { User, MapPin, Briefcase, Heart, Sparkles } from 'lucide-react';


export const ProfileStep: React.FC = () => {
    const { profile, behavior, updateProfile, updateBehavior, nextStep } = useRegistrationStore();

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        updateProfile({ [e.target.name]: e.target.value });
    };

    const handleBehaviorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        // Handle number inputs specifically if needed, but here simple casting or loose types work for basic forms
        updateBehavior({ [name]: value });
    };

    const isValid =
        profile.name &&
        profile.crn &&
        profile.addressZip &&
        profile.clinicName &&
        profile.cnpj;

    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-8">

            {/* --- Section 1: Perfil --- */}
            <section className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-stone-800 border-b border-stone-100 pb-2">
                    <User className="w-5 h-5 text-emerald-500" />
                    Seu Perfil
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-stone-600">Nome completo</label>
                        <input
                            name="name"
                            value={profile.name}
                            onChange={handleProfileChange}
                            className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                            placeholder="Ex: Dra. Ana Souza"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-stone-600">CRN</label>
                        <input
                            name="crn"
                            value={profile.crn}
                            onChange={handleProfileChange}
                            className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                            placeholder="Ex: 12345"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-stone-600">CPF</label>
                        <input
                            name="cpf"
                            value={profile.cpf}
                            onChange={handleProfileChange}
                            className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                            placeholder="000.000.000-00"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-stone-600">Sexo</label>
                        <select
                            name="sex"
                            value={profile.sex}
                            onChange={handleProfileChange}
                            className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-white"
                        >
                            <option value="">Selecione</option>
                            <option value="female">Feminino</option>
                            <option value="male">Masculino</option>
                            <option value="other">Outro</option>
                        </select>
                    </div>

                    <div className="col-span-1 md:col-span-2 space-y-1">
                        <label className="text-sm font-medium text-stone-600">Endereço (CEP)</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <input
                                name="addressZip"
                                value={profile.addressZip}
                                onChange={handleProfileChange}
                                className="w-full pl-9 p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                                placeholder="00000-000"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Section 2: Clínica --- */}
            <section className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-stone-800 border-b border-stone-100 pb-2">
                    <Briefcase className="w-5 h-5 text-emerald-500" />
                    Sua Clínica
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-stone-600">Nome da Clínica</label>
                        <input
                            name="clinicName"
                            value={profile.clinicName}
                            onChange={handleProfileChange}
                            className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                            placeholder="Ex: Clínica Bem Estar"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-stone-600">CNPJ</label>
                        <input
                            name="cnpj"
                            value={profile.cnpj}
                            onChange={handleProfileChange}
                            className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                            placeholder="00.000.000/0000-00"
                        />
                    </div>

                    <div className="col-span-1 md:col-span-2 space-y-1">
                        <label className="text-sm font-medium text-stone-600">Endereço da Clínica (CEP)</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <input
                                name="clinicZip"
                                value={profile.clinicZip}
                                onChange={handleProfileChange}
                                className="w-full pl-9 p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                                placeholder="00000-000"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Section 3: Comportamental --- */}
            <section className="space-y-4">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-stone-800 border-b border-stone-100 pb-2">
                    <Heart className="w-5 h-5 text-emerald-500" />
                    Estilo de Atendimento
                    <span className="text-xs font-normal text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full ml-auto">
                        Personalização do sistema
                    </span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-stone-600">Perfil</label>
                        <select
                            name="tone"
                            value={behavior.tone}
                            onChange={handleBehaviorChange}
                            className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-white"
                        >
                            <option value="neutral">Neutro</option>
                            <option value="serious">Sério</option>
                            <option value="loving">Carinhoso</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-stone-600">Estilo</label>
                        <select
                            name="style"
                            value={behavior.style}
                            onChange={handleBehaviorChange}
                            className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all bg-white"
                        >
                            <option value="objective">Objetivo</option>
                            <option value="motivational">Motivacional</option>
                            <option value="delicate">Delicado</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-stone-600">Intensidade (1-3)</label>
                        <input
                            name="intensity"
                            type="number"
                            min="1"
                            max="3"
                            value={behavior.intensity}
                            onChange={handleBehaviorChange}
                            className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-1">
                        <label className="flex items-center gap-2 text-sm font-medium text-stone-600">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            Frases que você gosta
                        </label>
                        <textarea
                            name="phrasesLiked"
                            value={behavior.phrasesLiked}
                            onChange={handleBehaviorChange}
                            className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all h-20 resize-none"
                            placeholder="Ex: 'Foco no progresso', 'Coma comida de verdade'..."
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-stone-600">Frases que evita</label>
                        <textarea
                            name="phrasesAvoided"
                            value={behavior.phrasesAvoided}
                            onChange={handleBehaviorChange}
                            className="w-full p-2.5 rounded-lg border border-stone-200 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all h-20 resize-none"
                            placeholder="Ex: 'Dia do lixo', 'Pecado'..."
                        />
                    </div>
                </div>
            </section>

            <div className="flex justify-end pt-6">
                <button
                    onClick={nextStep}
                    disabled={!isValid}
                    className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-emerald-500/20"
                >
                    Próximo: Marca
                </button>
            </div>
        </div>
    );
};
