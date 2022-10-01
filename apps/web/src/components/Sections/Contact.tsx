import { Background, Heading } from "@components/index";
import { Button, FormField, Wrapper } from "@dmrk/ui";
import clsx from "clsx";
import React, { FC, FormEvent } from "react";

interface ContactProps {}

const __DEFAULT_FORM_DATA__ = {
  email: "",
  name: "",
  message: "",
};

const emailValidation = (email: string) => {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return pattern.test(email);
};

const Contact: FC<ContactProps> = ({}) => {
  const [formData, setFormData] = React.useState(__DEFAULT_FORM_DATA__);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = React.useCallback(
    async (e: FormEvent) => {
      setError(null);
      e.preventDefault();

      if (!formData.name) {
        setError(`Please fill your name`);
        return;
      }

      if (!formData.email || !emailValidation(formData.email)) {
        setError(`Email seems incorrect... :(`);
        return;
      }

      if (!formData.message) {
        setError(`Looks like your forgot to leave me a message :(`);
        return;
      }

      await fetch(`https://formspree.io/f/xjvzwdjj`, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(formData),
      });
      setError(null);
      setFormData(__DEFAULT_FORM_DATA__);
    },
    [formData]
  );
  return (
    <section id="contact-me" className="">
      <Wrapper className="text-primary-superlight text-left md:text-center my-40 relative">
        <Heading
          className=""
          subheading="contact"
          heading="Always ready to talk."
          highlight="talk."
        />
        <form
          className="p-10 bg-primary-darkest gradient-box w-auto max-w-xl rounded-lg mx-auto mt-20  space-y-4 shadow-primary/5 shadow-xl "
          onSubmit={handleSubmit}
        >
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
              "ring-rose-600 ring-1 animate-pulse":
                !emailValidation(formData.email) && formData.email,
              "ring-emerald-600 focus:ring-emerald-600 ring-1": emailValidation(
                formData.email
              ),
            })}
            type="text"
            name="email"
            placeholder="Contact Email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            value={formData.email}
          />
          <FormField
            as="textarea"
            name="message"
            className={clsx({
              "ring-emerald-600 focus:ring-emerald-600 ring-1":
                formData.message,
            })}
            placeholder="Message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
          />
          {error && error}

          <Button className="w-full hover:-translate-y-px ">Send</Button>
        </form>
        <Background className="absolute top-20 left-1/5 w-full h-full -z-10" />
        <div className="w-40 h-40 absolute bottom-5 left-1/2 bg-indigo-700 rounded-full blur-[90px] -z-10"></div>
        <div className="w-40 h-40 absolute bottom-10 left-1/4 bg-primary rounded-full blur-[90px] -z-10"></div>
      </Wrapper>
    </section>
  );
};

export default Contact;
