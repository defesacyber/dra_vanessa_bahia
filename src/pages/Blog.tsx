import React from 'react';
import { Container, Section } from '../components/ui/Layout';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { MainLayout } from '../components/Layout/MainLayout';
import { Link } from 'react-router-dom';
import { Calendar, ChevronRight } from 'lucide-react';

const posts = [
    {
        slug: 'dietas-restritivas-e-estoicismo',
        title: 'Dietas restritivas e estoicismo: o que os clássicos nos ensinam sobre fome',
        excerpt: 'Como a filosofia estoica pode ajudar a modular nossa percepção de saciedade e desejo alimentar no mundo moderno.',
        date: '12 Out, 2025',
        image: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?auto=format&fit=crop&q=80&w=600',
        category: 'Filosofia'
    },
    {
        slug: 'bio-hacking-nutricionismo-integrativo',
        title: 'Bio-hacking e Nutricionismo: Além das calorias',
        excerpt: 'Exploramos como otimizar marcadores bioquímicos fundamentais para longevidade e clareza mental.',
        date: '08 Out, 2025',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600',
        category: 'Ciência'
    },
    {
        slug: 'importancia-da-temperanca',
        title: 'A importância da Têmpera na rotina de executivos de alto impacto',
        excerpt: 'Estratégias nutricionais para manter a performance sob pressão sem comprometer a saúde a longo prazo.',
        date: '05 Out, 2025',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600',
        category: 'Performance'
    }
];

const Blog: React.FC = () => {
    return (
        <MainLayout>
            <Section className="bg-neutral-100/50 pt-24 pb-16">
                <Container className="text-center max-w-4xl space-y-6">
                    <h1 className="text-4xl md:text-6xl font-serif">Conteúdos & Reflexões</h1>
                    <p className="text-xl text-brand-900/60 font-sans leading-relaxed">
                        Explorações sobre saúde, biologia e a arte de viver bem.
                    </p>
                </Container>
            </Section>

            <Section className="bg-white">
                <Container>
                    {/* FEATURED POST */}
                    <Link to={`/conteudos/${posts[0].slug}`} className="group mb-20 block">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="aspect-[16/9] rounded-[2.5rem] bg-neutral-200 overflow-hidden relative">
                                <img
                                    src={posts[0].image}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    alt={posts[0].title}
                                />
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
                                    <span className="text-brand-600">{posts[0].category}</span>
                                    <span className="text-brand-900/30 flex items-center gap-2"><Calendar size={14} /> {posts[0].date}</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-serif leading-tight group-hover:text-brand-600 transition-colors">
                                    {posts[0].title}
                                </h2>
                                <p className="text-brand-900/60 text-lg leading-relaxed line-clamp-3">
                                    {posts[0].excerpt}
                                </p>
                                <div className="inline-flex items-center gap-2 text-brand-900 font-bold tracking-widest uppercase text-xs">
                                    Ler artigo <ChevronRight size={16} />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-neutral-100">
                        {posts.slice(1).map((post) => (
                            <Link key={post.slug} to={`/conteudos/${post.slug}`} className="group">
                                <Card className="p-0 overflow-hidden bg-transparent border-none shadow-none space-y-6">
                                    <div className="aspect-[16/9] rounded-[2rem] bg-neutral-100 overflow-hidden">
                                        <img
                                            src={post.image}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            alt={post.title}
                                        />
                                    </div>
                                    <div className="space-y-4 px-2">
                                        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-900/50">
                                            <span className="text-brand-600">{post.category}</span>
                                            <span className="flex items-center gap-2"><Calendar size={12} /> {post.date}</span>
                                        </div>
                                        <h3 className="text-2xl font-serif leading-snug group-hover:text-brand-600 transition-colors">
                                            {post.title}
                                        </h3>
                                        <p className="text-brand-900/60 text-sm leading-relaxed line-clamp-2">
                                            {post.excerpt}
                                        </p>
                                    </div>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <Button variant="outline" size="lg">Carregar mais artigos</Button>
                    </div>
                </Container>
            </Section>
        </MainLayout>
    );
};

export default Blog;
