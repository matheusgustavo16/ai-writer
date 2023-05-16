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

  const submitForm = async() => {
    const resp_login = await login(form?.email, form?.senha)
    if(!resp_login){
        toast.error('⚠️ Email e/ou Senha Incorretos.');
    }else{
        setForm({
            ...form,
            email: '',
            senha: ''
        })
    }
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
        <title>Gerador de Copy</title>
      </Head>
      <Container id="header" fluid className="py-3 bg-dark bg-opacity-10 d-flex">
        <Container style={{ maxWidth: '1100px' }}>
          <Row>
            <Col sm={6} md={6} lg={6} className="d-flex" style={{ alignItems: 'center' }}>
              <strong style={{ fontWeight: 900 }}>CopyOnline</strong>
            </Col>
            <Col sm={6} md={6} lg={6} className="d-flex" style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
              <Button variant="outline-dark" className="mx-3 credits" onClick={()=> setModalPlans(!modalPlans)}>
                <Image src="/images/coin.png" className="img-fluid" />
                <span className="m-0 p-0">{user ? user?.balance : 0}</span>
              </Button>
              {!isAuthenticated ?
                <Image onClick={()=> setShowSideuser(!showSideuser)} className="avatar" src="/images/no-photo.png" />
                : <Image onClick={()=> setShowSideuser(!showSideuser)} className="avatar" src="/images/avatar-logged.png" />}
            </Col>
          </Row>
        </Container>
      </Container>
      <Container className="pt-5 d-flex" style={{ maxWidth: '1100px' }}>
        <Row className="my-5">
            <Col sm={12} md={12} lg={12} style={{ display: 'flex', flexDirection: 'row' }}>
              <div>
                <h1 style={{ fontWeight: 900, fontSize: '31px', letterSpacing: '-1px' }}>Crie copys incríveis em segundos com a nossa ferramenta de geração de texto baseada em IA.</h1>
                <span className="text-muted d-block mb-4">
                  Utilizando o poder da Inteligência Artificial, você pode gerar conteúdo de alta qualidade de forma rápida e eficiente.<br/>
                  Experimente agora e veja como é fácil criar copys de sucesso!
                </span>
                <Button variant="outline-success" className="py-2 px-4">Teste Grátis</Button>
              </div>
              <Image src="/images/copywritter-illustration.png" className="img-fluid" style={{ maxWidth: '400px', marginLeft: '2.5em' }} />
            </Col>
            <Col sm={12} md={12} lg={12} className="text-center py-3">
              <FontAwesomeIcon icon={faChevronDown} style={{ animation: 'jump 1.2s infinite' }} />
            </Col>
        </Row>
      </Container>
      <Container id="form" ref={form_div} fluid className="pb-5" style={{ maxWidth: '650px', textAlign: 'center' }}>
        <Container className="pb-5">
          <Row>
            <Col sm={12} md={12} lg={12} className="d-flex" style={{ flexDirection: 'column' }}>
              <h5 className="mb-4 d-block" style={{ fontWeight: 900, letterSpacing: '-1px' }}>
                Descreva de forma curta e objetiva<br/>
                seu produto e características...
              </h5>
              <Form.Control
                as="textarea"
                placeholder="ex.: O produto x é indicado para uso nos seguintes casos, produzido com os ingredientes x, y e z e para quem deseja tal resultado."
                rows={5}
                className="p-3"
                value={userInput}
                maxLength={250}
                onChange={onUserChangedText}>
              </Form.Control>
              <div className="d-flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginTop: '.25em' }}>
                <strong className="m-0 p-0 text-muted" style={{ fontSize: '13px', fontWeight: 900 }}>{userInput.length||0}/250</strong>
                <Button size="sm" variant="success" className={isGenerating ? 'py-2 px-4 mt-2 loading' : 'py-2 px-4 mt-2'} onClick={callGenerateEndpoint}>
                  {isGenerating ? <span className="loader"></span> : <>Gerar Copy!</>}
                </Button>
              </div>
            </Col>
            {apiOutput && (<>
              <hr className="my-5" />
              <Col sm={12} md={12} lg={12}>
                <h3 style={{ fontWeight: 900, letterSpacing: '-.5px', fontSize: '22px' }}>Resultado:</h3>
                <div className="output-content">
                  <p>{apiOutput}</p>
                </div>
              </Col>
              <Col sm={12} md={12} lg={12} className="mt-4 text-muted">
                <Button size="sm" variant="outline-success" className="px-3" onClick={()=> copyToClipboard()}>
                  <FontAwesomeIcon icon={faCopy} className="mx-1" /> Copiar 
                </Button>{/*&nbsp;&nbsp;&nbsp;
                <Button size="sm" variant="outline-success" className="px-3">
                  <FontAwesomeIcon icon={faShareAlt} className="mx-1" /> Compartilhar 
                </Button>*/}
              </Col>
            </>)}
          </Row>
        </Container>
      </Container>
      {/* SIDE USER */}
      <Offcanvas id="side_user" placement="end" show={showSideuser} onHide={()=> setShowSideuser(!showSideuser)}>
        <Offcanvas.Header className="p-4" closeButton />
        <Offcanvas.Body>
          {!isAuthenticated && <Container>
              <Row className="mt-0">
                  <Col md={12}>
                      <Offcanvas.Title style={{ fontWeight: 700 }}>{!showRegister ? `Faça Login` : `Cadastre-se`}</Offcanvas.Title>
                  </Col>
                  <Col md={12} className="mt-4">
                    {!showRegister && <>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email" name="email" value={form?.email} onChange={(e)=> setForm({ ...form, [e.target.name]: e.target.value })} placeholder="" />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" name="senha" value={form?.senha} onChange={(e)=> setForm({ ...form, [e.target.name]: e.target.value })} placeholder="" />
                      </Form.Group>
                      <div className="d-flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button variant="outline-success" onClick={()=> submitForm()} className="px-4">
                          Entrar
                        </Button>
                        <a href="javascript:;" onClick={()=> setShowRegister(!showRegister)}>Cadastre-se e Teste Grátis</a>
                      </div>
                    </>}
                    {showRegister && <Form onSubmit={submitForm}>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nome Completo</Form.Label>
                        <Form.Control type="text" placeholder="" />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>WhatsApp</Form.Label>
                        <Form.Control type="text" placeholder="" />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>E-mail</Form.Label>
                        <Form.Control type="email" placeholder="" />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Senha</Form.Label>
                        <Form.Control type="password" placeholder="" />
                      </Form.Group>
                      <div className="d-flex" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button variant="outline-success" type="submit" className="px-4">
                          Cadastrar
                        </Button>
                        <a href="javascript:;" onClick={()=> setShowRegister(!showRegister)}>Voltar ao Login</a>
                      </div>
                    </Form>}
                  </Col>
              </Row>
          </Container>}
          {isAuthenticated && <>
            <Container>
                <Row className="mt-0">
                    <Col md={12}>
                        <Offcanvas.Title style={{ fontWeight: 700 }}>Bem-Vindo(a) {user?.nome ? user?.nome.split(' ')[0] : ``}<em style={{ fontWeight: 800, marginLeft: '-2px' }}>!</em></Offcanvas.Title>
                    </Col>
                    <Col md={12} className="mt-2">
                      <hr />
                      <h5 className="my-3">Histórico de Requisições</h5>
                      <ul className="m-0 p-0" style={{ listStyle: 'none', maxHeight: '60vh', overflowY: 'auto' }}>
                      {user?.historico && user?.historico.map((historic, key) => <li key={key} className="d-flex mb-4" style={{ justifyContent: 'space-between', alignItems: 'center', paddingRight: '.5em' }}>
                        <div className="m-0 p-0 text-left" style={{ fontSize: '13px', fontWeight: 600 }}>
                          <small className="m-0 p-0 d-block text-muted" style={{ fontSize: '12px', fontWeight: 600 }}>{new Date(historic?.dt_created).toLocaleString('pt-br')}</small>
                          <span title="Prompt" className="d-block m-0 p-0 text-muted">{historic?.prompt.substring(0,40)}...</span>
                          <span title="Resultado" className="d-block m-0 p-0 text-primary">{historic?.result.substring(0,40)}...</span>
                        </div>
                        <span title="Tokens Descontados" className="m-0 p-0 text-danger" style={{ fontSize: '15px', fontWeight: 800 }}>-{historic?.discounted}</span>
                      </li>)}
                      </ul>
                    </Col>
                </Row>
            </Container>
            <Button variant="outline-danger" onClick={()=> logout()} className="d-block text-center py-2" style={{ position: 'absolute', bottom: '1.5em', width: '90%' }}>
              <FontAwesomeIcon icon={faSignOut} />&nbsp;
              Deslogar
            </Button>
          </>}
        </Offcanvas.Body>
      </Offcanvas>
      <Modal centered size="lg" show={modalPlans} onHide={()=> {
        setStepModal(0)
        setIdPix(null)
        setModalPlans(false)
        setStatusPix(false)
      }}>
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
