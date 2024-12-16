'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import Image from 'next/image'
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
    <section className="pt-28 md:pt-36 2xl:pt-52 pb-24 px-2 md:px-3 text-center dark:bg-[#17181c]">
      {/* Background Decoration */}
      <div className="absolute inset-0 z-0 opacity-10">
        <Gavel
          size={800}
          className="text-teal-600 dark:text-neutral-500 block mx-auto"
        />
      </div>

      <div className="container mx-auto relative z-10 flex flex-col items-center text-center">
        {/* Logo */}
        <div className="mb-6">
          <Image
            src={IconLogoLight}
            alt="Logo Light"
            className="block dark:hidden"
            width={200}
            height={50}
          />
          <Image
            src={IconLogoDark}
            alt="Logo Dark"
            className="hidden dark:block"
            width={200}
            height={50}
          />
        </div>

        {/* Headline */}
        <motion.h1
          className="mx-auto max-w-4xl font-display text-4xl font-semibold dark:text-white text-slate-900 sm:text-6xl xl:text-7xl mb-5"
          {...animationProps}
        >
          Lugar ideal para aproveitar<br />
          <span>
            o melhor<span className="bg-gradient-to-r from-emerald-600 to-teal-400 bg-clip-text text-transparent"> do leilão</span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-300 mb-8"
          {...animationProps}
          transition={{ delay: 0.2 }}
        >
          Aproveite{' '}
          <span className="font-semibold text-gray-900 dark:text-white">
            50% de desconto
          </span>{' '}
          nos 3 primeiros meses de assinatura!
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mb-8"
          {...animationProps}
          transition={{ delay: 0.4 }}
        >
          <Button
            size="lg"
            className="bg-teal-600 button-text shadow-xl hover:bg-white hover:text-teal-700 transition-all duration-300 transform hover:scale-105"
          >
            Assinar
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="shadow-xl border-teal-500 text-teal-700 hover:bg-teal-600 hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            Saber mais
          </Button>
        </motion.div>

        {/* Horizontal Pattern abaixo dos botões */}
        {/* <div className="w-full h-[150px] mt-4 hidden md:block">
          <Image
            src={HorizontalPattern}
            alt="Horizontal Pattern"
            layout="responsive"
            width={100}
            height={10}
            className="object-cover"
          />
        </div> */}
      </div>
    </section>
  )
}
