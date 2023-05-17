import Head from 'next/head'
import {useEffect, useRef, useState} from "react"
import { Button, Col, Container, Form, Row, Image, Offcanvas, Modal, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faChevronDown, faCopy, faChevronRight, faChevronLeft, faSignOut } from '@fortawesome/free-solid-svg-icons'
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/auth'
import axios from 'axios'
import QRCode from "react-qr-code"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Workflow from '../components/Workflow'
import Plans from '../components/Plans'
import Footer from '../components/Footer'

const mercadoPago = axios.create({
  baseURL: "https://api.mercadopago.com"
})

mercadoPago.interceptors.request.use(async config => {
  const token = `APP_USR-1058676353811580-022215-eb9126afb5028e3916701443d38391e6-1315873054`
  config.headers.Authorization = `Bearer ${token}`
  return config
});

const planos = [
  {
    id: 1,
    name: `Starter`,
    tokens: 2000,
    amount: 9.9,
    desc: [
      `2000 Tokens`,
      `Aproximadamente 10 textos de copy`,
      `Pode recarregar quantas vezes quiser`,
      `Histórigo geral`,
    ]
  },{
    id: 2,
    name: `Medium`,
    tokens: 3000,
    amount: 18.9,
    desc: [
      `3000 Tokens`,
      `Aproximadamente 15 textos de copy`,
      `Pode recarregar quantas vezes quiser`,
      `Histórigo geral`,
    ]
  },{
    id: 3,
    name: `Monster`,
    tokens: 4000,
    amount: 49.9,
    desc: [
      `4000 Tokens`,
      `Aproximadamente 20 textos de copy`,
      `Pode recarregar quantas vezes quiser`,
      `Histórigo geral`,
    ]
  },{
    id: 4,
    name: `Alien`,
    tokens: 20000,
    amount: 299.9,
    desc: [
      `20000 Tokens`,
      `Aproximadamente 100 textos de copy`,
      `Pode recarregar quantas vezes quiser`,
      `Histórigo Geral`,
      `Aprimoramento de Copy`,
      `Gerar Mockup de Produto com IA (breve)`,
    ]
  },
]

const Home = () => {

  const { isAuthenticated, login, logout, loading, setLoading, updateBalance, addBalance, user, setUser } = useAuth()
  const form_div = useRef()
  const [userInput, setUserInput] = useState('')
  const [apiOutput, setApiOutput] = useState('')
  const [form, setForm] = useState({
    email: '',
    senha: '',
    nome: '',
    whatsapp: ''
  })

  const [isGenerating, setIsGenerating] = useState(false)
  const [showSideuser, setShowSideuser] = useState(false)
  const [showRegister, setShowRegister] = useState(false)

  const [stepModal, setStepModal] = useState(0)
  const [modalPlans, setModalPlans] = useState(false)
  const [selPlan, setSelPlan] = useState(1)
  const [balance, setBalance] = useState(0)

  const data_plan = planos.filter((plan) => plan?.id === selPlan)||[{}]

  useEffect(()=> {
    if(!showSideuser){
      setShowRegister(false)
    }
  }, [showSideuser])

  useEffect(()=> {
    if(stepModal==0){
      setCodigoPix(null)
      setLoading(false)
    }
  }, [stepModal])

  const callGenerateEndpoint = async () => {
    if(!user){
      toast.error(`Faça login ou cadastre-se!`)
      setShowSideuser(true)
    }else if(user?.balance <= 0){
      toast.error(`Compre créditos e crie suas copys à vontade!`)
      setModalPlans(true)
    }else{
      if(userInput.trim().length === 0){
        toast.error(`Descreva de forma curta e objetiva seu produto e características na caixa de texto acima...`)
        return 
      }
      setIsGenerating(true);

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: userInput.trim() }),
      })

      const data = await response.json()
      const { output, usage } = data

      // set apiOutput 
      // desconta os tokens = usage.completion_tokens
      setApiOutput(`${output.text}`)
      setIsGenerating(false)
      
      discountBalance(usage.completion_tokens, output.text, usage.completion_tokens)
      setTimeout(()=>{
        toast.success(`Sua copy foi gerada com sucesso! Você já pode copiar e usar onde quiser.`, { duration: 5000 })
        form_div.current?.scrollIntoView({ bottom:0, behavior: "smooth" })
      }, 500)

    }
  }

  const discountBalance = async(tokens_to_discount, result_output, completion_tokens) => {
    const discount_balance = user?.balance-parseInt(tokens_to_discount)
    updateBalance(discount_balance, user?.id, userInput, result_output, completion_tokens)
  }

  const incrementBalance = async(tokens_to_increment) => {
    addBalance(tokens_to_increment, user?.id, idPix)
  }

  const onUserChangedText = (e) => {
    setUserInput(e.target.value);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiOutput)
    toast.success(`O texto gerado foi copiado para o seu CTRL+V`)
  }

  const getInitials = function (string) {
    var names = string.split(' '),
        initials = names[0].substring(0, 1).toUpperCase()
    if (names.length > 1) {
        initials += names[names.length - 1].substring(0, 1).toUpperCase()
    }
    return initials
  }

  const [idPix, setIdPix] = useState(null)
  const [codigoPix, setCodigoPix] = useState(null)
  const [statusPix, setStatusPix] = useState(false)

  useEffect(()=>{
    if(codigoPix && idPix){
      if(!statusPix){
        let i=0
        //checkPixStatus(idPix)
        //chechFakeStatusPix(idPix)
        setInterval(() => {
          i++;
          //checkPixStatus(idPix)
        }, 10000)
      }
    }
  }, [codigoPix,idPix,statusPix])

  const chechFakeStatusPix = async(id_transaction) => {
    const response = { status: true, description: `CopyOnline | Plano Alien | 20000` }
    setTimeout(()=> {
      console.log('checkPixStatus_', response)
      setStatusPix(true)
      
      incrementBalance(response?.description.split('|')[2].trim())
      setTimeout(()=>{
        toast.success(`${response?.description.split('|')[2].trim()} foram adicionados à sua carteira!`, { duration: 5000 })
      }, 500)

    }, 5000)
  }

  const checkPixStatus = async(id_transaction) => {
    mercadoPago
    .get(`v1/payments/${id_transaction}`)
    .then(response => {
      console.log('checkPixStatus_', response)
      if (response.data.status === "approved") {
        setStatusPix(true)
      }
    })
  }

  const nextStep = () => {
    if(stepModal===0){
      setStepModal(stepModal+1)
    }
    if(stepModal===1){
      if(data_plan){
        setLoading(true)
        mercadoPago.post("v1/payments", {
          "transaction_amount": data_plan && data_plan[0]?.amount,
          "description": `CopyOnline | Plano ${data_plan && data_plan[0]?.name} | ${data_plan && data_plan[0]?.tokens}`,
          "payment_method_id": "pix",
          "payer": {
            "email": user?.email,
            "first_name": user?.nome.split(' ')[0],
            "last_name": user?.nome.split(' ')[1],
            "identification": {
              "type": "CPF",
              "number": ""
            }
          },
          "notification_url": "https://api.copyonline.com.br/callback_pix"
        }).then(response => {
          console.log('mercadoopago_pedido', response)
          setCodigoPix(response.data.point_of_interaction.transaction_data.qr_code)
          setIdPix(response.data.id)
          setLoading(false)
          //setResponsePayment(response)
          //setLinkBuyMercadoPago(response.data.point_of_interaction.transaction_data.ticket_url)
        }).catch(err => {
          console.log('mercadoopago_errorrr', err)
        })
      }
    }
  }

  return (
    <div className="root">
      <Head>
        <title>Copy Online - Crie copys incríveis em segundos</title>
        <meta name="description" content="Utilizando o poder da Inteligência Artificial, você pode gerar conteúdo de alta qualidade de forma rápida e eficiente." />
      </Head>
      <Header />
      <Hero />
      <Workflow />
      <Plans />
      <Footer />
      {/* SIDE USER */}
      <Modal centered size="lg" show={modalPlans} onHide={()=> {
          setStepModal(0)
          setIdPix(null)
          setModalPlans(false)
          setStatusPix(false)
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Adquirir Créditos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid className="m-0 p-0 px-1">
            {stepModal===0 && <Row>
              <Col sm={6} md={6} lg={6} className="d-flex" style={{ flexDirection: 'column', justifyContent:'center' }}>
                <h3 className="m-0 p-0 mb-4" style={{ fontWeight: 800 }}>Pacote {data_plan[0]?.name}</h3>
                <div>
                  {data_plan[0]?.desc.map((desc)=> <div className="d-flex mb-2" style={{ justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', fontWeight: 600 }}>
                    {desc}
                    <FontAwesomeIcon icon={faCheckCircle} className="text-success" />
                  </div>)}
                </div>
              </Col>
              <Col sm={6} md={6} lg={6}>
                <ul className="modal_plans m-0 p-2">
                  {planos.map((plan, i)=> <>
                    <li key={i} className={selPlan === plan.id ? `selected` : ``} onClick={()=> setSelPlan(plan?.id)}>
                      <h5 className="m-0 p-0">{plan?.name}</h5>
                      <span className="m-0 p-0">R$ {parseFloat(plan?.amount).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</span>
                    </li>
                  </>)}
                </ul>
              </Col>
            </Row>}
            {stepModal===1 && <Row>
              {!isAuthenticated && <Col sm={12} md={12} lg={12} className="text-center py-4">
                <Image src="/images/sad-icon.png" />
                <small className="m-0 p-0 d-block text-muted mt-2 mb-3">Você precisar logar ou se cadastrar para comprar créditos.</small>
                <Button size="sm" variant="outline-success" className="px-4" onClick={()=> {
                  setShowSideuser(true)
                  setModalPlans(false)
                }}>Fazer Login</Button>
                <Button size="sm" variant="outline-success" className="px-4" style={{ marginLeft: '.5em' }} onClick={()=> {
                  setShowSideuser(true)
                  setShowRegister(true)
                  setModalPlans(false)
                }}>Cadastrar</Button>
              </Col>}
              {isAuthenticated && <>
                <Col sm={6} md={6} lg={6} className="d-flex py-4" style={{ flexDirection: 'column', justifyContent:'center' }}>
                  <h3 className="m-0 p-0" style={{ fontWeight: 800 }}>Pacote {data_plan[0]?.name}</h3>
                  <h4 className="m-0 p-0" style={{ fontWeight: 800 }}>R$ {parseFloat(data_plan[0]?.amount).toLocaleString('pt-br', { minimumFractionDigits: 2 })}</h4>
                  <hr/>
                  <small className="m-0 p-0 mb-3">
                    1. Entre no app ou site do seu banco e escolha a opção de pagamento via Pix.<br/>
                    2. Escaneie o código QR ou copie e cole o código de pagamento.<br/>
                    3. Pronto! O pagamento será creditado na hora!
                  </small>
                  {codigoPix && <CountdownCircleTimer
                    isPlaying
                    size={90}
                    strokeWidth={5}
                    duration={60}
                    colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                    colorsTime={[60, 40, 20, 0]}
                    onComplete={()=> {
                      if(!statusPix){
                        setCodigoPix(null)
                        setIdPix(null)
                      }
                    }}
                  >
                    {({ remainingTime }) => `${remainingTime} seg.`}
                  </CountdownCircleTimer>}
                </Col>
                <Col sm={6} md={6} lg={6} className="py-4">
                  <ul className="modal_plans m-0 p-2">
                      <li className="selected" onClick={()=> {}}>
                        <h5 className="m-0 p-0">Pix</h5>
                      </li>
                  </ul>
                  {loading && <Spinner className="m-auto d-block" />}
                  {(!codigoPix && !loading) && <div className="text-center">
                    <Image src="/images/waiting-pix.png" className="img-fluid m-auto w-75" />
                    <small className="d-block w-100 m-0 p-0 text-center">Clique em <strong>Gerar QRCode</strong> abaixo.</small>
                  </div>}
                  {codigoPix && <div className="text-center">
                    <QRCode size={180} value={codigoPix} />
                    <Form.Control size="sm" disabled className="mt-3 w-50 m-auto" readOnly value={codigoPix} />
                  </div>}
                </Col>
              </>}
            </Row>}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          {stepModal>=1 && <Button variant="outline-danger" onClick={()=> setStepModal(0)}><FontAwesomeIcon icon={faChevronLeft} /> Voltar</Button>}
          <Button variant="outline-success" className="px-4" onClick={()=> nextStep()}>
            {stepModal==0 && <>Ir Para Pagamento <FontAwesomeIcon icon={faChevronRight} /></>}
            {stepModal>0 && <>Gerar QRCode <FontAwesomeIcon icon={faChevronRight} /></>}
          </Button>
        </Modal.Footer>
      </Modal>
      {/*<Offcanvas placement='end' show={showSideuser} onHide={()=> setShowSideuser(!showSideuser)}>
        <Offcanvas.Header className="p-4" closeButton />
        <Offcanvas.Body>
          <Container>
              <Row className="mt-0">
                  <Col md={12}>
                      <Offcanvas.Title style={{ fontWeight: 700 }}>Faça Login ou Cadastre-se</Offcanvas.Title>
                  </Col>
                  <Col md={12} className="mt-5 text-center text-muted">
                      <Image src="/images/sad-icon.png" className="img-fluid" />
                      <small className="d-block mt-4 px-4">
                          Nada foi encontrado por aqui.<br/>
                          Nenhuma notificação foi enviada para você ainda.
                      </small>
                  </Col>
                  <Col md={12} className="mt-5 text-center text-muted">
                      <Image src="/images/sad-icon.png" className="img-fluid" />
                      <small className="d-block mt-4 px-4">
                          Nada foi encontrado por aqui.<br/>
                          Nenhuma notificação foi enviada para você ainda.
                      </small>
                  </Col>
              </Row>
          </Container>
        </Offcanvas.Body>
      </Offcanvas>*/}
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Home;
