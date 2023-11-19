import { useState } from 'react';
import NavBar from './elements/navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import LogoGamer from './media/logo_gamer.png'
import LogoStream from './media/logo_stream.png'
import LogoFamilia from './media/logo_familia.png'
import LogoCorporativo from './media/logo_corporativo.jpg'


export default function Home() {
  const [getToken, setToken] = useState(sessionStorage.getItem('token'));
  const site_desc = `A Alfa Service oferece soluções inovadoras e confiáveis para conectar você ao mundo digital. Com tecnologia avançada, atendimento excepcional e preços competitivos, a Alfa Service é a escolha certa para quem busca segurança, confiabilidade e inovação na internet.`

  const cards = [
    { "logo": LogoGamer, "name": "Gamer", "price": "R$ 129,00", "desc": "Internet com incrivel velocidade e latência baixa para jogos" },
    { "logo": LogoStream, "name": "Stream", "price": "R$ 149,00", "desc": "Ideal para stream com alta qualidade sem se preocupar com loads" },
    { "logo": LogoFamilia, "name": "Familia", "price": "R$ 199,00", "desc": "Pacote completo para familia que assiste, joga e curte redes socias" },
    { "logo": LogoCorporativo, "name": "Corporativo", "price": "R$ 199,00", "desc": "Ideal para pequenas e medias empresas" }
  ]

  const faq = [
    {
      'question': ' O que é a Alfa Service?',
      'answer': 'Somos uma empresa de internet que oferece soluções inovadoras e confiáveis para ajudar seus clientes a aproveitar ao máximo a tecnologia.'
    },
    {
      'question': ' Quais são os serviços oferecidos pela Alfa Service?',
      'answer': 'oferecemos uma ampla variedade de planos de internet dapatados todos os publicos e planos customizados'
    },
    {
      'question': 'A Alfa Service oferece suporte técnico aos clientes?',
      'answer': 'oferecemos suporte técnico de alta qualidade e profissionais bem treinados para oferecer o melhor aos nossos clientes.'
    },
    {
      'question': 'A Alfa Service oferece serviços personalizados para atender às necessidades de cada cliente?',
      'answer': 'Sim, Oferecemos planos adapatados as suas necessidades, para detalhes consulte nossa equipe pelo whatsapp'
    }
  ]

  const ProductsCards = () => {
    return (
      cards.map((data) => (
        <div className='product-card'>
          <img className='product-card-img' src={data.logo}></img>
          <div className='product-card-title-div'>
            <a className='product-card-title'> {data.name}</a>
          </div>
          <a className='product-card-price'> {data.price} </a>
          <a className='product-card-desc'> {data.desc} </a>
        </div>
      ))
    )
  }

  const FaqCards = () => {
    return (
      faq.map((data) => (
        <details className='faq-question'>
          <summary>
            {data.question}
          </summary>
          <p className='home-answer'> {data.answer} </p>
        </details>
      ))
    )
  }

  function go_login() {
    location.href = "/alfa/login/clientes/"
  }

  function go_whatsapp() {
    location.href = `https://api.whatsapp.com/send?phone=555100000000`
  }

  return (
    <>
      <NavBar></NavBar>
      <div className='page-home banner' id='Home'>
        <div className='brand-home'>
          <a className='brand-home-title'> @lfa service</a>
          <div className='brand-home-slogan'>
            Conectando você ao mundo digital
          </div>
        </div>

        <div className='div-contact'>
          <button className='btn-home' onClick={go_whatsapp}> Whatsapp <FontAwesomeIcon icon={faWhatsapp} /></button>
          <button className='btn-home-b' onClick={go_login}> Cadastrar <FontAwesomeIcon icon={faUser} /></button>
        </div>
      </div>

      <div className='page-home' id='About'>
        <h2 className='title'> Sobre: </h2>
        <p className='home-text'> {site_desc} </p>
        <div className='div-about-desc'>
          <div className='div-about-contrast'>
            <a className='text-about-contrast'> Fibra optica de alta qualidade para garantir a maior velociade e estabilidade </a>
          </div>
          <div className='div-about-contrast' style={{ backgroundColor: 'white' }}>
            <a className='text-about-contrast' style={{ color: 'black' }}> O Melhor custo benefício do mercado para garantir uma ultra experiencia </a>
          </div>
        </div>
      </div>

      <div className='page-home' id='Products'>
        <h2 className='title'> Nossos produtos: </h2>
        <div className='cards'>
          {ProductsCards()}
        </div>
      </div>

      <div className='page-home' id='Faq'>
        <h2 className='title'> Duvidas frequentes: </h2>
        {FaqCards()}
      </div>

      <footer>
        <a href='https://www.github.com/plotzzzky'> Plotzky <FontAwesomeIcon icon={faGithub} /></a>
      </footer>
    </>
  )
}
