function FormWrapper({children}) {
  return (
    <div className={`grid gap-y-4 w-full text-card-foreground rounded-md border-none mx-auto`}>
        {children}
    </div>
  )
}

export default FormWrapper