'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: "Como faço para participar de um leilão online?",
    answer: "Para participar, primeiro você precisa se cadastrar em nossa plataforma. Após a aprovação do cadastro, você pode navegar pelos leilões ativos, escolher os itens de interesse e fazer seus lances. Recomendamos que você leia atentamente as regras de cada leilão antes de participar."
  },
  {
    question: "Quais são as formas de pagamento aceitas?",
    answer: "Aceitamos diversas formas de pagamento, incluindo cartão de crédito, transferência bancária e boleto. As opções disponíveis serão apresentadas após o término do leilão para o vencedor."
  },
  {
    question: "Como funciona o processo de entrega dos itens arrematados?",
    answer: "Após a confirmação do pagamento, o vendedor tem um prazo estipulado para enviar o item. Você pode acompanhar o status da entrega através da sua conta na plataforma. Para itens de grande porte, pode ser necessário combinar a retirada diretamente com o vendedor."
  },
  {
    question: "E se eu ganhar um leilão mas mudar de ideia?",
    answer: "Ao ganhar um leilão, você está se comprometendo a comprar o item. Cancelamentos podem resultar em penalidades, como suspensão da conta. Por isso, recomendamos que você tenha certeza antes de dar um lance."
  },
  {
    question: "Como posso saber se um item é autêntico?",
    answer: "Todos os itens em nossa plataforma passam por uma verificação prévia. Para itens de alto valor, oferecemos certificados de autenticidade. Além disso, você pode solicitar fotos adicionais ou informações ao vendedor antes de dar um lance."
  }
]

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

