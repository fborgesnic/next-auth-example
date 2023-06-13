import React from 'react'
import { getProviders, signIn, getSession } from "next-auth/react"
import styles from "./login.module.css"

function Login({ providers }: {providers: any}) {
  return (
    <div className={styles.login}>
      {Object.values(providers).map((provider:any) => {
          return (<div className="mt-3" key={provider.name}>
              <button onClick={() => signIn(provider.id)}>
                  Sign in with {provider.name}
              </button>
          </div>)
      })}
    </div>
  )
}

export async function getServerSideProps(context:any) {
    const { req } = context;
    const providers = await getProviders();
    const session = await getSession({ req });

    if (session) {
      return {
        redirect: { destination: "/" },
      };
    }

    return {
        props: { providers },
    }
}

export default Login