import Head from "next/head";
import LayoutDash from "../../../components/LayoutDash";
import { useAuth } from "../../../context/auth";
import { Loader } from "../../../components/Loader";

export default function PromptPage(){

    const { loading, user } = useAuth();

    return (<>
        {loading && <Loader />}
        {!loading && (
            <LayoutDash>
                <Head>
                    <title>Prompts | Copy Online</title>
                </Head>
                <div className="w-full flex flex-col text-left">
                    <h2 className="mb-5 font-semibold text-xl">Visualizar Prompt</h2>
                </div>
            </LayoutDash>
        )}
    </>)
}