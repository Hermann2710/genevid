"use client"
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      Page d'accueil
      {session?.user ? <div>
        <img src={session?.user?.image as string} />
        <div>
          <h1>{session?.user?.name}</h1>
          <p>{session?.user?.email}</p>
        </div>
        <button onClick={() => signOut()}>Se deconnecter</button>
      </div>
        : <button onClick={async () => await signIn("google")}>Continuer avec google</button>}
    </div>
  )
}
