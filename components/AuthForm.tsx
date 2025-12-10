"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { auth } from "@/firebase/client";
import { signIn, signUp } from "@/lib/actions/auth.action";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import FormField from "./FormField";

const authFormSchema = (type: FormType) => {
  return z.object({
    name:
      type === "sign-up"
        ? z.string().min(2, "Name must be at least 2 characters")
        : z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(5, "Password must be at least 6 characters"),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();

  const formSchema = authFormSchema(type);

  // 1. Initialize the form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    try {
      if (type === "sign-up") {
        const { name, email, password } = values;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        const { email, password } = values;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Sign in Failed. Please try again.");
          return;
        }

        await signIn({
          email,
          idToken,
        });

        toast.success("Signed in successfully.");
        router.push("/home");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        `Something went wrong. Please try again. there was an error: ${error}`
      );
    }
  }

  const isSignin: boolean = type === "sign-in";

  return (
    <div className="flex flex-col gap-6 card py-14 px-10">
      <div className="flex flex-row gap-2 justify-center">
        <Image src="/favicon-dark.png" alt="logo" height={32} width={38} />
        <h2 className="text-primary-200">Ray</h2>
      </div>
      <h3>Practice job interviews with AI</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {!isSignin && (
            <FormField
              control={form.control}
              name="name"
              label="Name"
              placeholder="Your Name"
              type="text"
            />
          )}
          <FormField
            control={form.control}
            name="email"
            label="Email"
            placeholder="Your email address"
            type="email"
          />

          <FormField
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
          />

          <Button 
            type="submit" 
            className="btn w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="size-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                {isSignin ? "Signing in..." : "Creating account..."}
              </span>
            ) : (
              isSignin ? "Sign In" : "Create an Account"
            )}
          </Button>
        </form>
      </Form>

      <p className="text-center">
        {!isSignin
          ? "Don't have an account yet?  "
          : "Have an Account already? "}{" "}
        <Link
          href={!isSignin ? "sign-in" : "sign-up"}
          className="font-bold text-user-primary ml-1"
        >
          {!isSignin ? "Sign In" : "Sign Up"}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
