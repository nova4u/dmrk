import { Background, Heading } from "@components/index"
import { Button, FormField, Wrapper } from "@dmrk/ui"
import clsx from "clsx"
import { AnimatePresence, m, useAnimationControls, useInView } from "framer-motion"
import React, { FC, FormEvent, useEffect } from "react"

interface ContactProps {}

const __DEFAULT_FORM_DATA__ = {
  email: "",
  name: "",
  message: "",
}

const emailValidation = (email: string) => {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
  return pattern.test(email)
}

const Contact: FC<ContactProps> = () => {
  const [formData, setFormData] = React.useState(__DEFAULT_FORM_DATA__)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)
  const controls = useAnimationControls()
  const textRef = React.useRef(null)
  const isInView = useInView(textRef, {
    amount: 1,
    once: true,
  })

  useEffect(() => {
    if (!isInView) return
    controls.start("animate")
  }, [isInView, controls])

  const handleSubmit = async (e: FormEvent) => {
    setError(null)
    setSuccess(false)
    e.preventDefault()

    if (!formData.name) {
      setError(`Please don't forget to fill out your name`)
      return
    }

    if (!formData.email || !emailValidation(formData.email)) {
      setError(`Email seems incorrect... :(`)
      return
    }

    if (!formData.message) {
      setError(`Looks like your forgot to leave me a message :(`)
      return
    }

    try {
      await fetch(
        `https://api-ems-pub-eu10.erply.com/api/v1/form/d309d42d-244f-4752-968c-c1a2b19ab330`,
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify({ ...formData, targetAddress: "denismar322@gmail.com" }),
        }
      )
      setError(null)
      setSuccess(true)
      setTimeout(() => {
        setSuccess(false)
      }, 30000)
    } catch (error) {
      setError(`Oops, something went wrong! Please send me an email me on denismar322@gmail.com`)
      setTimeout(() => {
        setError(null)
      }, 40000)
    }

    setFormData(__DEFAULT_FORM_DATA__)
  }

  return (
    <Wrapper className="text-primary-superlight text-left md:text-center  relative" id="contact">
      <Heading
        ref={textRef}
        controls={controls}
        className=""
        subheading="contact"
        heading={
          <>
            Always ready to <span className="highlight-text">talk.</span>
          </>
        }
        body={`The form is highly interactive, I do suggest you fill it out!`}
      />

      <div className="max-w-xl mt-20 mx-auto relative">
        <div className="gradient-box">
          <form
            className="p-10 bg-primary-darkest  w-auto  rounded-[inherit]"
            onSubmit={handleSubmit}
          >
            <div className="space-y-8">
              <FormField
                as="input"
                type="text"
                name="name"
                placeholder="Name"
                className={clsx({
                  "ring-emerald-600 focus:ring-emerald-600 ring-1": formData.name,
                })}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <FormField
                as="input"
                className={clsx({
                  "ring-rose-600 focus:ring-rose-600 ring-1 animate-pulse":
                    !emailValidation(formData.email) && formData.email,
                  "ring-emerald-600 focus:ring-emerald-600 ring-1": emailValidation(formData.email),
                })}
                type="text"
                name="email"
                placeholder="Contact Email"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                value={formData.email}
              />
              <FormField
                as="textarea"
                name="message"
                className={clsx("mb-4", {
                  "ring-emerald-600 focus:ring-emerald-600 ring-1": formData.message,
                })}
                placeholder="Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <AnimatePresence initial={false}>
              {error !== null && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{
                    type: "spring",
                    duration: 0.6,
                  }}
                  key={error}
                  className="font-medium rounded-md bg-rose-900/30 border border-rose-600/20 text-rose-400 overflow-hidden "
                >
                  <div className="p-2.5">{error}</div>
                </m.div>
              )}
            </AnimatePresence>
            <AnimatePresence initial={false}>
              {success && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{
                    type: "spring",
                    duration: 0.6,
                  }}
                  key={error}
                  className="font-medium rounded-md bg-emerald-900/30 border border-emerald-600/20 text-emerald-400 overflow-hidden "
                >
                  <div className="p-2.5">
                    Thanks! Your message has been delivered. I will reply ASAP.
                  </div>
                </m.div>
              )}
            </AnimatePresence>

            <Button className="w-full hover:-translate-y-px mt-4 ">Send</Button>
          </form>
        </div>

        <m.div
          animate={{
            opacity: formData.email ? 1 : 0,
            y: formData.email ? 0 : -40,
            scale: formData.email ? 1 : 0,
          }}
          className={clsx(
            "h-20 w-20 md:w-40 md:h-40 absolute top-0 left-0   rounded-full blur-[50px] md:blur-[90px] transition -z-10",
            {
              "bg-rose-700": !emailValidation(formData.email),
              "bg-emerald-600": emailValidation(formData.email),
            }
          )}
        ></m.div>
        <m.div
          animate={{
            opacity: formData.message ? 1 : 0.3,
            y: formData.message ? 0 : -40,
            scale: formData.message ? 1 : 0.5,
          }}
          className="h-20 w-20 md:w-40 md:h-40 absolute  bottom-0 right-1/2 bg-blue-600 rounded-full blur-[50px] md:blur-[90px] -z-10"
        ></m.div>
        <m.div
          animate={{
            opacity: formData.name ? 1 : 0.3,
            y: formData.name ? 0 : 50,
            scale: formData.name ? 1 : 0.8,
          }}
          className="h-20 w-20 md:w-40 md:h-40 absolute  md:bottom-20 top-0 right-0 bg-indigo-500 rounded-full blur-[50px] md:blur-[90px] -z-10"
        ></m.div>
      </div>
      <m.div
        className="absolute top-20 left-1/5 w-full h-full -z-10"
        // whileInView={{ x: -90 }}
        // initial={{ x: 0 }}
        // transition={{
        //   // @ts-ignore Wrong Types on framer motion
        //   repeat: "Infinity" as number,
        //   repeatType: "reverse",
        //   duration: 20,
        // }}
      >
        <Background />
      </m.div>
    </Wrapper>
  )
}

export default Contact
