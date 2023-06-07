import Head from "next/head";
import LayoutDash from "../../components/LayoutDash";
import { useAuth } from "../../context/auth";
import Drawer from "../../components/Drawer";
import {
  Bot,
  Command,
  Edit,
  Edit2,
  Edit3,
  ExternalLink,
  Info,
  Link,
  Pen,
  Trash,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { fetchDataFromApi, updateDataFromApi } from "../../utils/api";
import DrawerPrompt from "../../components/DrawerPrompt";
import GPT3Tokenizer from 'gpt3-tokenizer';
import { Loader } from "../../components/Loader";
import { Trash2 } from "lucide-react";
const tokenizer = new GPT3Tokenizer({ type: 'gpt3' });

const PromptsPage = () => {
  const router = useRouter()
  const { loading, user } = useAuth();
  const [formEdit, setFormEdit] = useState(null);
  const [formAdd, setFormAdd] = useState({
    title: ``,
    prompt: ``,
    prompt_tokens: 0,
    privacy: 'public'
  });
  const [showDelete, setShowDelete] = useState(false)
  const [modalEditPrompt, setModalEditPrompt] = useState(false);
  const [modalAddPrompt, setModalAddPrompt] = useState(false);
  const [loadingCopys, setLoadingCopys] = useState(true);
  const [list, setList] = useState([]);

  useEffect(()=>{
    setFormAdd({...formAdd, prompt_tokens: tokenizer.encode(formAdd?.prompt).bpe.length })
  }, [formAdd?.prompt])

  useEffect(() => {
    if (!loading && user) {
      getPrompts();
    }
  }, [loading, user]);

  const getPrompts = async () => {
    try {
      setLoadingCopys(true);
      const _copys = await fetchDataFromApi(`get_prompts/${user?.id}`);
      if (_copys) {
        setList(_copys);
      }
      setLoadingCopys(false);
    } catch (err) {
      setLoadingCopys(false);
      console.log("falhafaturar", err);
      toast.error(`Falha ao resgatar seus prompts.`);
    }
  };

  const uniqueId = () => {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substring(2);
    return dateString + randomness;
  };

  const handleSavePrompt = async () => {
    try{
        const new_prompt = await updateDataFromApi(`add_prompt`, {
            id_user: user?.id,
            share_link: uniqueId(),
            ...formAdd
        })
        setModalAddPrompt(false);
        getPrompts()
        toast.success(`O seu prompt foi adicionado com sucesso.`)
        //console.log('newpromptpp', new_prompt)
    }catch(err){
        console.log('falhafaturar', err)
        toast.error(`Falha ao salvar o seu prompt, tente novamente mais tarde.`)
    }
  };

  const handleEditPrompt = async() => {
    try{
        const new_prompt = await updateDataFromApi(`edit_prompt`, {
            ...formEdit
        })
        //setModalEditPrompt(false);
        getPrompts()
        toast.success(`O seu prompt foi atualizado com sucesso.`)
        //console.log('newpromptpp', new_prompt)
    }catch(err){
        console.log('falhafaturar', err)
        toast.error(`Falha ao salvar o seu prompt, tente novamente mais tarde.`)
    }
  };

  const handleSharePrompt = async() => {
    navigator.clipboard.writeText(`${window.location.origin}/app/prompt/${formEdit?.share_link}`)
    toast.success(`O link de compartilhamento foi copiado para área de transferência`)
  };

  const handleDeletePrompt = async() => {
    try{
        const new_prompt = await updateDataFromApi(`delete_prompt`, {
            ...formEdit
        })
        setModalEditPrompt(false);
        getPrompts()
        toast.success(`O seu prompt foi deletado com sucesso.`)
        //console.log('newpromptpp', new_prompt)
    }catch(err){
        console.log('falhafaturar', err)
        toast.error(`Falha ao deletar o seu prompt, tente novamente mais tarde.`)
    }
  }

  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <LayoutDash>
          <Head>
            <title>Prompts | Copy Online</title>
          </Head>
          <div className="w-full flex flex-col text-left">
            <h2 className="mb-5 font-semibold text-xl">Meus Prompts</h2>
          </div>
          <div className="w-full text-left grid grid-cols-3">
            <button
              disabled={!user?.pro || list.length >= 10}
              title={
                list.length >= 10
                  ? `Nosso limite por enquanto é de 10 prompts.`
                  : `Adicionar Prompt`
              }
              onClick={() => setModalAddPrompt(true)}
              class="block max-w-sm p-6 mb-6 bg-gray-100 border border-gray-200 rounded-lg shadow disabled:opacity-25 disabled:cursor-not-allowed hover:bg-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Criar Prompt
              </h5>
              <p class="font-normal text-sm text-gray-700 dark:text-gray-400">
                Crie o seu próprio prompt de comandos para alcançar resultados
                ainda melhores em suas copys e textos diversos.
              </p>
            </button>
            {list.map((prompt) => (
              <button class="block relative max-w-sm p-6 mb-6 pt-10 pb-6 bg-white border border-gray-200 rounded-lg shadow disabled:opacity-25 disabled:cursor-not-allowed hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="absolute top-0 right-0 text-white">
                  <button
                    disabled
                    onClick={() =>
                      router.push(`/app/prompt/${prompt?.share_link}`)
                    }
                    title="Ver página do prompt"
                    className="bg-green-500 hover:bg-green-400 p-1.5 rounded-bl disabled:cursor-not-allowed disabled:opacity-75"
                  >
                    <ExternalLink size={15} />
                  </button>
                  <button
                    title="Usar Prompt"
                    className="bg-orange-500 hover:bg-orange-400 p-1.5"
                    onClick={() => {
                        router.push(`/app/generate?prompt=${prompt?.share_link}`)
                    }}
                  >
                    <Bot size={15} />
                  </button>
                  <button
                    title="Edição Rápida"
                    className="bg-purple-500 hover:bg-purple-400 p-1.5 rounded-tr"
                    onClick={() => {
                      setFormEdit(prompt);
                      setModalEditPrompt(true);
                    }}
                  >
                    <Edit2 size={15} />
                  </button>
                </div>
                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white flex justify-center items-center gap-2">
                  {prompt?.title}
                </h5>
                <p class="font-normal text-sm text-gray-700 dark:text-gray-400">
                  {prompt?.prompt.substring(0, 100)}
                  {prompt?.prompt.length > 100 && `...`}
                </p>
              </button>
            ))}
          </div>
        </LayoutDash>
      )}
      {user?.pro && (
        <>
          <DrawerPrompt
            visible={modalAddPrompt}
            title={`Adicionar Prompt`}
            description={`Você pode criar o seu prompt personalizado, e compartilhar com o seu time.`}
            onHide={() => setModalAddPrompt(false)}
            onSave={handleSavePrompt}
          >
            <div className="divide-y divide-gray-200 px-4 sm:px-6">
              <div className="space-y-6 pb-5 pt-6">
                <div>
                  <label
                    htmlFor="project-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Título
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="project-name"
                      id="project-name"
                      placeholder="ex.: [INFANTIL] 3 Anos"
                      onChange={(e) =>
                        setFormAdd({ ...formAdd, title: e?.target?.value })
                      }
                      maxLength={50}
                      className="block w-full outline-none rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Prompt
                  </label>
                  <div className="mt-2">
                    <textarea
                      id="description"
                      name="description"
                      rows={4}
                      className="block w-full outline-none rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                      defaultValue={""}
                      onChange={(e) =>
                        setFormAdd({ ...formAdd, prompt: e?.target?.value })
                      }
                      maxLength={200}
                      placeholder="ex.: Crie um texto como se estivesse explicando para uma criança de 3 anos"
                    />
                    <div className="flex justify-between items-center mt-1 text-gray-400">
                      <small>
                        <strong>{formAdd.prompt_tokens}</strong> tokens
                      </small>
                      <small>
                        <strong>{formAdd?.prompt.length}</strong>/200
                      </small>
                    </div>
                  </div>
                </div>
                {/*<div>
                        <h3 className="text-sm font-medium leading-6 text-gray-900">Team Members</h3>
                        <div className="mt-2">
                            <div className="flex space-x-2">
                                {team.map((person) => (
                                <a key={person.email} href={person.href} className="rounded-full hover:opacity-75">
                                    <img
                                    className="inline-block h-8 w-8 rounded-full"
                                    src={person.imageUrl}
                                    alt={person.name}
                                    />
                                </a>
                                ))}
                                <button
                                type="button"
                                className="inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-200 bg-white text-gray-400 hover:border-gray-300 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                >
                                <span className="sr-only">Add team member</span>
                                <Plus className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                    </div>*/}
                <fieldset>
                  <legend className="text-sm font-medium leading-6 text-gray-900">
                    Visibilidade
                  </legend>
                  <div className="mt-2 space-y-4">
                    <div className="relative flex items-start">
                      <div className="absolute flex h-6 items-center">
                        <input
                          id="privacy-public"
                          name="privacy"
                          aria-describedby="privacy-public-description"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                          onChange={() =>
                            setFormAdd({ ...formAdd, privacy: "public" })
                          }
                          checked={formAdd?.privacy === "public"}
                        />
                      </div>
                      <div className="pl-7 text-sm leading-6">
                        <label
                          htmlFor="privacy-public"
                          className="font-medium text-gray-900"
                        >
                          Público
                        </label>
                        <p
                          id="privacy-public-description"
                          className="text-gray-500 text-xs"
                        >
                          O prompt ficará visível e disponível para outros
                          usuários.
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="relative flex items-start">
                        <div className="absolute flex h-6 items-center">
                          <input
                            id="privacy-private-to-project"
                            name="privacy"
                            aria-describedby="privacy-private-to-project-description"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                            onChange={() =>
                              setFormAdd({ ...formAdd, privacy: "shared" })
                            }
                            checked={formAdd?.privacy === "shared"}
                          />
                        </div>
                        <div className="pl-7 text-sm leading-6">
                          <label
                            htmlFor="privacy-private-to-project"
                            className="font-medium text-gray-900"
                          >
                            Privado para membros
                          </label>
                          <p
                            id="privacy-private-to-project-description"
                            className="text-gray-500 text-xs"
                          >
                            Somente membros do time e através do link de acesso.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="relative flex items-start">
                        <div className="absolute flex h-6 items-center">
                          <input
                            id="privacy-private"
                            name="privacy"
                            aria-describedby="privacy-private-to-project-description"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                            onChange={() =>
                              setFormAdd({ ...formAdd, privacy: "private" })
                            }
                            checked={formAdd?.privacy === "private"}
                          />
                        </div>
                        <div className="pl-7 text-sm leading-6">
                          <label
                            htmlFor="privacy-private"
                            className="font-medium text-gray-900"
                          >
                            Privado
                          </label>
                          <p
                            id="privacy-private-description"
                            className="text-gray-500 text-xs"
                          >
                            Visível somente para mim.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
              <div className="pb-6 pt-4">
                <div className="flex text-sm">
                  <button
                    href="#"
                    disabled={formAdd.privacy === "private"}
                    className="group inline-flex items-center font-medium text-green-600 hover:text-green-900 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Link
                      className="h-5 w-5 text-green-500 group-hover:text-green-900"
                      aria-hidden="true"
                    />
                    <span className="ml-2">Compartilhar link</span>
                  </button>
                </div>
                {/*<div className="mt-4 flex text-sm">
                    <a
                    href="#"
                    className="group inline-flex items-center text-gray-500 hover:text-gray-900"
                    >
                    <Info
                        className="h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                    <span className="ml-2">O que são os Prompts?</span>
                    </a>
                </div>*/}
              </div>
            </div>
          </DrawerPrompt>
          {formEdit && (
            <DrawerPrompt
              visible={modalEditPrompt}
              title={`Editar Prompt`}
              description={`Você pode editar o seu prompt personalizado, e compartilhar com o seu time.`}
              onHide={() => setModalEditPrompt(false)}
              onSave={handleEditPrompt}
            >
              <div className="divide-y divide-gray-200 px-4 sm:px-6">
                <div className="space-y-6 pb-5 pt-6">
                  <div>
                    <label
                      htmlFor="project-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Título
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="project-name"
                        placeholder="ex.: [INFANTIL] 3 Anos"
                        value={formEdit?.title}
                        onChange={(e) =>
                          setFormEdit({ ...formEdit, title: e?.target?.value })
                        }
                        maxLength={50}
                        className="block w-full outline-none rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Prompt
                    </label>
                    <div className="mt-2">
                      <textarea
                        name="description"
                        rows={4}
                        className="block w-full outline-none rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6"
                        defaultValue={""}
                        value={formEdit?.prompt}
                        onChange={(e) =>
                          setFormEdit({ ...formEdit, prompt: e?.target?.value })
                        }
                        maxLength={200}
                        placeholder="ex.: Crie um texto como se estivesse explicando para uma criança de 3 anos"
                      />
                      <div className="flex justify-between items-center mt-1 text-gray-400">
                        <small>
                          <strong>{formEdit?.prompt_tokens}</strong> tokens
                        </small>
                        <small>
                          <strong>{formEdit?.prompt.length}</strong>/200
                        </small>
                      </div>
                    </div>
                  </div>
                  <fieldset>
                    <legend className="text-sm font-medium leading-6 text-gray-900">
                      Visibilidade
                    </legend>
                    <div className="mt-2 space-y-4">
                      <div className="relative flex items-start">
                        <div className="absolute flex h-6 items-center">
                          <input
                            id="privacy-public"
                            name="privacy"
                            aria-describedby="privacy-public-description"
                            type="radio"
                            className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                            onChange={() =>
                              setFormEdit({ ...formEdit, privacy: "public" })
                            }
                            checked={formEdit?.privacy === "public"}
                          />
                        </div>
                        <div className="pl-7 text-sm leading-6">
                          <label
                            htmlFor="privacy-public"
                            className="font-medium text-gray-900"
                          >
                            Público
                          </label>
                          <p
                            id="privacy-public-description"
                            className="text-gray-500 text-xs"
                          >
                            O prompt ficará visível e disponível para outros
                            usuários.
                          </p>
                        </div>
                      </div>
                      <div>
                        <div className="relative flex items-start">
                          <div className="absolute flex h-6 items-center">
                            <input
                              id="privacy-private-to-project"
                              name="privacy"
                              aria-describedby="privacy-private-to-project-description"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                              onChange={() =>
                                setFormEdit({ ...formEdit, privacy: "shared" })
                              }
                              checked={formEdit?.privacy === "shared"}
                            />
                          </div>
                          <div className="pl-7 text-sm leading-6">
                            <label
                              htmlFor="privacy-private-to-project"
                              className="font-medium text-gray-900"
                            >
                              Privado para membros
                            </label>
                            <p
                              id="privacy-private-to-project-description"
                              className="text-gray-500 text-xs"
                            >
                              Somente membros do time e através do link de
                              acesso.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="relative flex items-start">
                          <div className="absolute flex h-6 items-center">
                            <input
                              id="privacy-private"
                              name="privacy"
                              aria-describedby="privacy-private-to-project-description"
                              type="radio"
                              className="h-4 w-4 border-gray-300 text-green-600 focus:ring-green-600"
                              onChange={() =>
                                setFormEdit({ ...formEdit, privacy: "private" })
                              }
                              checked={formEdit?.privacy === "private"}
                            />
                          </div>
                          <div className="pl-7 text-sm leading-6">
                            <label
                              htmlFor="privacy-private"
                              className="font-medium text-gray-900"
                            >
                              Privado
                            </label>
                            <p
                              id="privacy-private-description"
                              className="text-gray-500 text-xs"
                            >
                              Visível somente para mim.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <div className="pb-6 pt-4">
                  <div className="flex text-sm">
                    <button
                      disabled={formEdit.privacy === "private"}
                      onClick={() => handleSharePrompt()}
                      className="group inline-flex items-center font-medium text-green-600 hover:text-green-900 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Link
                        className="h-5 w-5 text-green-500 group-hover:text-green-900"
                        aria-hidden="true"
                      />
                      <span className="ml-2">Compartilhar link</span>
                    </button>
                  </div>
                    {showDelete && <div className="w-full bg-red-100 text-xs text-red-700 border border-red-300 p-3 text-center mt-4 my-2 py-2 flex justify-between items-center rounded-md">
                        <span className="text-left">
                            Confirmar Exclusão do Prompt ?<br/>
                            <button className="hover:underline" onClick={()=> setShowDelete(false)}>cancelar</button>
                        </span>
                        <button className="bg-red-500 text-white p-2 rounded-md border border-red-300 hover:bg-red-400" onClick={()=> handleDeletePrompt()}>CONFIRMAR</button>
                    </div>}
                  <div className="flex text-sm mt-3">
                    <button
                      onClick={() => setShowDelete(true)}
                      className="group inline-flex items-center font-medium text-red-600 hover:text-red-900 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <Trash2
                        className="h-5 w-5 text-red-500 group-hover:text-red-900"
                        aria-hidden="true"
                      />
                      <span className="ml-2">Excluir Prompt</span>
                    </button>
                  </div>
                </div>
              </div>
            </DrawerPrompt>
          )}
        </>
      )}
    </>
  );
};

export default PromptsPage;
