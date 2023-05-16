import { useRouter } from "next/router"


export default function Custom404() {
  const router = useRouter()

  return (<>
    <div className="w-full max-w-7xl m-auto pt-24 flex justify-between items-center">
      ERRO 404
    </div>
  </>)
}