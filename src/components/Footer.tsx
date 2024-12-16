import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="dark:bg-[#17181c] py-12 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Leilões do Brasil</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Transformando o mercado de leilões online com inovação e segurança.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Links Rápidos</h4>
          <ul className="space-y-2">
            {['Sobre Nós', 'Como Funciona', 'Leilões Ativos', 'Contato'].map((item) => (
              <li key={item}>
                <Link href="#" className="text-sm text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors duration-200">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Suporte</h4>
          <ul className="space-y-2">
            {['FAQ', 'Política de Privacidade', 'Termos de Serviço', 'Ajuda'].map((item) => (
              <li key={item}>
                <Link href="#" className="text-sm text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors duration-200">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Siga-nos</h4>
          <div className="flex space-x-4">
            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
              <a key={index} href="#" className="text-gray-600 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition-colors duration-200">
                <Icon className="w-6 h-6" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          © 2024 Leilões do Brasil. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}


