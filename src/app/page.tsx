"use client"
// import Header from '@/components/header'
import Hero from '@/components/hero'
import Features from '@/components/features'
import Testimonials from '@/components/testimonials'
import FAQ from '@/components/faq'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BillingPlans from '@/components/BillingPlans'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col dark:bg-[#17181c]">
      <Header />
      <main className='mt-10'>
        <Hero />
        <Features />
        <BillingPlans />
        <div className='p-4 rounded-md'>
        <Testimonials />
        </div>
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}

