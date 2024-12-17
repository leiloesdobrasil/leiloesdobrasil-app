'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "Eu dou o lance no site Leilões do Brasil?",
    answer: "Não. O site Leilões do Brasil apenas é um buscador que centraliza todas essas oportunidades em um só lugar, facilitando sua pesquisa. Quando você encontra o bem de interesse, você será redirecionado para o site do leiloeiro oficial responsável, onde fará o cadastro e participará do leilão."
  },
  {
    question: "O Leilões do Brasil é um site de leilão?",
    answer: "Não! Somos uma plataforma 'agregadora' dos bens de leilão, direcionando você para o site do leiloeiro que fará o leilão."
  },
  {
    question: "Por que assinar o Leilões do Brasil?",
    answer: "Atualmente temos o maior banco de dados de leilões do Brasil, sendo atualizada diariamente com novos leilões. Oferecemos segurança na escolha dos leilões, além de oferecer ferramentas para encontrar o que você quer."
  },
  {
    question: "Todos os bens que estão cadastrados no Leilões do Brasil são de leiloeiros oficiais?",
    answer: "SIM. Todos os sites de leilão e leiloeiros são verificados antes de entrar em nossa lista e cadastrar em nosso banco de dados. Pode ter certeza que se está em nosso site, é de confiança."
  },
  {
    question: "Tenho que pagar para utilizar a plataforma do Leilões do Brasil?",
    answer: "Sim. Você pode escolher pagar semestralmente ou anualmente nossa plataforma. Você será de um grupo seleto de arrematantes com o privilégio de saber onde acontecerão os melhores bens em leilão em todo o Brasil."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#17181c]">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Perguntas Frequentes
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-800 pb-4">
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
                    activeIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="mt-2 text-gray-600 dark:text-gray-400">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

