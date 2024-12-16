'use client'

import { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    name: 'Roberto Silva',
    role: 'Empresário',
    content: 'Já participei de diversos leilões e a plataforma é simplesmente excepcional!',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    name: 'Ana Santos',
    role: 'Investidora',
    content: 'Os alertas em tempo real me ajudaram a conseguir ótimas oportunidades.',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    name: 'Carlos Lima',
    role: 'Colecionador',
    content: 'A melhor plataforma de leilões que já utilizei. Totalmente recomendo!',
    avatar: '/placeholder.svg?height=40&width=40',
  },
  {
    name: 'Mariana Costa',
    role: 'Antiquária',
    content: 'A comunidade ativa e as ferramentas de análise são um diferencial incrível.',
    avatar: '/placeholder.svg?height=40&width=40',
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }
 
  return (
    <section id="depoimentos" className="py-40 px-16 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white via-teal-200 to-teal-50 from-teal-200 to-teal-400 dark:bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-white via-teal-700 to-[#17181c] from-teal-600 to-teal-400 ">
      <div className="container mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-12 m- text-white">
          O Que Nossos Clientes Dizem
        </h2>
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white dark:bg-[#17181c] border-teal-200 dark:border-teal-800 shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar>
                      <AvatarImage src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].name} />
                      <AvatarFallback>{testimonials[currentIndex].name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-[#17181c] dark:text-white">{testimonials[currentIndex].name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{testimonials[currentIndex].role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic">&ldquo;{testimonials[currentIndex].content}&rdquo;</p>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full bg-white dark:bg-[#17181c] rounded-full p-2 shadow-md hover:bg-teal-100 dark:hover:bg-teal-900 transition-colors duration-200"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full bg-white dark:bg-[#17181c] rounded-full p-2 shadow-md hover:bg-teal-100 dark:hover:bg-teal-900 transition-colors duration-200"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </button>
        </div>
      </div>
    </section>
  )
}

