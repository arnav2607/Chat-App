import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
function SignUpPage() {
    const{authUser}=useAuthStore
  return (
    <div>SignUpPage</div>
  )
}

export default SignUpPage