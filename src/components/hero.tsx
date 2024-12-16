'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Image from 'next/image'

import VerticalPattern from '../assets/verticalpattern.svg'
import IconLogoDark from '../assets/logolight.svg'
import IconLogoLight from '../assets/logodark.svg'
import { Gavel } from 'lucide-react'

const animationProps = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

export default function Hero() {
  return (
    <section className="relative py-16 px-6 sm:px-8 lg:px-12 overflow-hidden bg-gray-100 dark:bg-[#17181c] transition-all duration-300">
      <div className="absolute inset-0 z-0 opacity-50">
        <Gavel
          size={800}
          className="text-teal-600 dark:text-teal-500 block mx-auto opacity-30"
        />
      </div>

      <div className="container mx-auto relative z-10 flex items-center justify-center">
        <div className="hidden lg:block mr-10">
          <Image
            src={VerticalPattern}
            alt="Pattern Light"
            className="block dark:hidden"
            width={200}
            height={500}
          />
          <Image
            src={VerticalPattern}
            alt="Pattern Dark"
            className="hidden dark:block"
            width={200}
            height={500}
          />
        </div>
        <div className="max-w-2xl lg:max-w-3xl mx-auto">
        <div className='hidden md:block'>
          <Image
            src={IconLogoLight}
            alt="Logo Light"
            className="block dark:hidden object-cover mb-6"
            width={300}
          />
          <Image
            src={IconLogoDark}
            alt="Logo Dark"
            className="hidden dark:block object-cover mb-6"
            width={300}
          />
        </div>
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
            {...animationProps}
          >
            Lugar ideal para aproveitar o melhor do leilão
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl mb-8 text-gray-700 dark:text-gray-300"
            {...animationProps}
            transition={{ delay: 0.2 }}
          >
            Aproveite{' '}
            <span className="font-semibold text-gray-900 dark:text-white">
              50% de desconto
            </span>{' '}
            nos 3 primeiros meses de assinatura!
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            {...animationProps}
            transition={{ delay: 0.4 }}
          >
            <Button
              size="lg"
              className="bg-teal-600 hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"
            >
              Assinar
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-gray-700 border-gray-400 hover:bg-gray-200 dark:bg-[#17181c] dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800 dark:hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Saber mais
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
