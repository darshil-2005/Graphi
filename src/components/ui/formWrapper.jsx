import React from 'react'

function FormWrapper({children}) {
  return (
    <div className='grid gap-y-4 w-[20rem] border text-card-foreground bg-card p-4 mt-4 rounded-md border-border mx-auto'>
        {children}
    </div>
  )
}

export default FormWrapper