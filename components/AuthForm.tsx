"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "@/components/FormField";
import { useRouter } from "next/navigation"

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) :z.string().optional(),
    email: z.string().email(),
    password: z.string().min(6),
  })
}


const AuthForm = ({ type }: {type: FormType}) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
    })
   
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      try{
        if (type == 'sign-in'){
          toast.success("Sign in successfully.");
          router.push("/");
        } else {
          toast.success("Account created successfully. Please sign in");
          router.push("/sign-in");
        }
      } catch (error) {
        console.log(error);
        toast.error("An error has occured: ${errior}")
      }
    }

    const isSignIn = type === "sign-in";
  return (
    <div className="card-border lg:min-w-[566px]">
        <div className="flex flex-col gap-6 card py-14 px-10">
          <div className="flex flex-row gap-2 justify-center">
            <Image
              src="/logo.svg"
              alt="logo"
              width={38}
              height={36}
            />
            <h2 className="text-primary-100 text-2xl">
              rkeleven Interview Platform
            </h2>
          </div>
          <h3 className="text-sm">Let AI prepare you for job interviews</h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full mt-4 form">
            {!isSignIn && (
              <FormField 
                  control={form.control}
                  name="name"
                  placeholder="Your name"
                  label="Name"
                />
            )}
              <FormField 
                  control={form.control}
                  name="email"
                  placeholder="Your Email"
                  label="Email"
                  type="email"
                />
                <FormField 
                  control={form.control}
                  name="password"
                  placeholder="Enter Password"
                  label="Password"
                  type="password"
                />
            <p>Password</p>
            <Button 
              type="submit"
              className="btn"
              >
              {isSignIn ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <Link 
            href={!isSignIn ? '/sign-in' : 'sign-up'}
            className="font-bold tezt-user-primary ml-1"
          >
            {!isSignIn ? "Sign in" : "Sign up now"}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthForm